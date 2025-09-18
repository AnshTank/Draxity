import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const execAsync = promisify(exec);

// Create temp directory if it doesn't exist
const TEMP_DIR = path.join(process.cwd(), 'temp');
if (!existsSync(TEMP_DIR)) {
  mkdir(TEMP_DIR, { recursive: true });
}

async function executeCppCode(code: string, input?: string) {
  const timestamp = Date.now();
  const filename = `code_${timestamp}`;
  const cppFile = path.join(TEMP_DIR, `${filename}.cpp`);
  const exeFile = path.join(TEMP_DIR, `${filename}.exe`);
  const inputFile = path.join(TEMP_DIR, `${filename}_input.txt`);

  try {
    // Write C++ code to file
    await writeFile(cppFile, code);
    
    // Write input to file if provided
    if (input) {
      await writeFile(inputFile, input);
    }

    // Compile C++ code
    const compileCommand = `g++ -o "${exeFile}" "${cppFile}" -std=c++17 -O2 -mconsole`;
    const compileStart = Date.now();
    
    let compileWarnings = '';
    try {
      const compileResult = await execAsync(compileCommand, { timeout: 10000 });
      compileWarnings = compileResult.stderr || '';
      console.log('Compile success, stderr:', compileWarnings);
    } catch (compileError: any) {
      compileWarnings = compileError.stderr || '';
      console.log('Compile error/warning, stderr:', compileWarnings);
      console.log('Executable exists:', existsSync(exeFile));
      // Check if executable was created (compilation succeeded with warnings)
      if (!existsSync(exeFile)) {
        // Real compilation error - no executable created
        return {
          success: false,
          error: compileError.stderr || compileError.message,
          type: 'compilation_error'
        };
      }
    }

    // Execute compiled program
    const executeCommand = input 
      ? `"${exeFile}" < "${inputFile}"`
      : `"${exeFile}"`;
    
    const executeStart = Date.now();
    
    try {
      const { stdout, stderr } = await execAsync(executeCommand, { 
        timeout: 5000,
        maxBuffer: 1024 * 1024 // 1MB buffer
      });
      
      const executionTime = Date.now() - executeStart;
      
      let fullOutput = '';
      if (compileWarnings.trim()) {
        fullOutput += compileWarnings.trim() + '\n';
      }
      if (stdout.trim()) {
        fullOutput += stdout.trim() + '\n';
      }
      fullOutput += '\n=== Code Execution Successful ===';
      
      return {
        success: true,
        output: fullOutput,
        error: stderr || null,
        executionTime: `${executionTime}ms`,
        memoryUsed: 'N/A'
      };
    } catch (executeError: any) {
      if (executeError.code === 'TIMEOUT') {
        return {
          success: false,
          error: 'Time Limit Exceeded (5s)',
          type: 'timeout_error'
        };
      }
      return {
        success: false,
        error: executeError.stderr || executeError.message,
        type: 'runtime_error'
      };
    }
  } finally {
    // Cleanup files
    try {
      await unlink(cppFile);
      if (existsSync(exeFile)) await unlink(exeFile);
      if (input && existsSync(inputFile)) await unlink(inputFile);
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
  }
}

function wrapCppCodeForTesting(userCode: string, testCases: any[]): string {
  // Extract user's main function content
  let userMainContent = '';
  const mainMatch = userCode.match(/int\s+main\s*\([^)]*\)\s*\{([\s\S]*?)return\s+\d+;/)?.[1];
  if (mainMatch) {
    userMainContent = mainMatch.trim();
  }
  
  // Remove existing main function from user code
  let cleanUserCode = userCode;
  
  // Fix incomplete functions by adding default return statements
  if (cleanUserCode.includes('twoSum') && !cleanUserCode.includes('return')) {
    cleanUserCode = cleanUserCode.replace(
      /(vector<int>\s+twoSum\s*\([^)]*\)\s*\{[\s\S]*?)\}/g,
      '$1\n        return {};\n    }'
    );
  }
  
  // More robust main function removal
  const mainFunctionRegex = /int\s+main\s*\([^)]*\)\s*\{[\s\S]*?\n\s*return\s+\d+;\s*\n\s*\}/g;
  cleanUserCode = cleanUserCode.replace(mainFunctionRegex, '').trim();
  
  // Fallback: simple main function removal
  if (cleanUserCode.includes('int main(')) {
    const lines = cleanUserCode.split('\n');
    const filteredLines = [];
    let insideMain = false;
    let braceCount = 0;
    
    for (const line of lines) {
      if (line.trim().startsWith('int main(')) {
        insideMain = true;
        continue;
      }
      
      if (insideMain) {
        braceCount += (line.match(/\{/g) || []).length;
        braceCount -= (line.match(/\}/g) || []).length;
        
        if (braceCount <= 0) {
          insideMain = false;
        }
        continue;
      }
      
      filteredLines.push(line);
    }
    
    cleanUserCode = filteredLines.join('\n').trim();
  }
  
  const hasExtraCase = testCases && testCases.length > 3;
  
  if (hasExtraCase) {
    return `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

${cleanUserCode}

int main() {
    ${userMainContent ? userMainContent + '\n' : ''}
    Solution solution;
    
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> result1 = solution.twoSum(nums1, 9);
    bool passed1 = (result1.size() == 2 && ((result1[0] == 0 && result1[1] == 1) || (result1[0] == 1 && result1[1] == 0)));
    
    vector<int> nums2 = {3, 2, 4};
    vector<int> result2 = solution.twoSum(nums2, 6);
    bool passed2 = (result2.size() == 2 && ((result2[0] == 1 && result2[1] == 2) || (result2[0] == 2 && result2[1] == 1)));
    
    vector<int> nums3 = {3, 3};
    vector<int> result3 = solution.twoSum(nums3, 6);
    bool passed3 = (result3.size() == 2 && ((result3[0] == 0 && result3[1] == 1) || (result3[0] == 1 && result3[1] == 0)));
    
    vector<int> nums4 = {1, 2, 3, 4, 5};
    vector<int> result4 = solution.twoSum(nums4, 8);
    bool passed4 = (result4.size() == 2 && ((result4[0] == 2 && result4[1] == 4) || (result4[0] == 4 && result4[1] == 2)));
    
    cout << "[{\\"case\\":\\"nums=[2,7,11,15], target=9\\",\\"passed\\":" << (passed1 ? "true" : "false") << ",\\"actual\\":[";
    if (result1.size() >= 2) cout << result1[0] << "," << result1[1];
    cout << "],\\"expected\\":[0,1]}";
    
    cout << ",{\\"case\\":\\"nums=[3,2,4], target=6\\",\\"passed\\":" << (passed2 ? "true" : "false") << ",\\"actual\\":[";
    if (result2.size() >= 2) cout << result2[0] << "," << result2[1];
    cout << "],\\"expected\\":[1,2]}";
    
    cout << ",{\\"case\\":\\"nums=[3,3], target=6\\",\\"passed\\":" << (passed3 ? "true" : "false") << ",\\"actual\\":[";
    if (result3.size() >= 2) cout << result3[0] << "," << result3[1];
    cout << "],\\"expected\\":[0,1]}";
    
    cout << ",{\\"case\\":\\"nums=[1,2,3,4,5], target=8\\",\\"passed\\":" << (passed4 ? "true" : "false") << ",\\"actual\\":[";
    if (result4.size() >= 2) cout << result4[0] << "," << result4[1];
    cout << "],\\"expected\\":[2,4]}]" << endl;
    
    return 0;
}
`;
  } else {
    return `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

${cleanUserCode}

int main() {
    ${userMainContent ? userMainContent + '\n' : ''}
    Solution solution;
    
    vector<int> nums1 = {2, 7, 11, 15};
    vector<int> result1 = solution.twoSum(nums1, 9);
    bool passed1 = (result1.size() == 2 && ((result1[0] == 0 && result1[1] == 1) || (result1[0] == 1 && result1[1] == 0)));
    
    vector<int> nums2 = {3, 2, 4};
    vector<int> result2 = solution.twoSum(nums2, 6);
    bool passed2 = (result2.size() == 2 && ((result2[0] == 1 && result2[1] == 2) || (result2[0] == 2 && result2[1] == 1)));
    
    vector<int> nums3 = {3, 3};
    vector<int> result3 = solution.twoSum(nums3, 6);
    bool passed3 = (result3.size() == 2 && ((result3[0] == 0 && result3[1] == 1) || (result3[0] == 1 && result3[1] == 0)));
    
    cout << "[{\\"case\\":\\"nums=[2,7,11,15], target=9\\",\\"passed\\":" << (passed1 ? "true" : "false") << ",\\"actual\\":[";
    if (result1.size() >= 2) cout << result1[0] << "," << result1[1];
    cout << "],\\"expected\\":[0,1]}";
    
    cout << ",{\\"case\\":\\"nums=[3,2,4], target=6\\",\\"passed\\":" << (passed2 ? "true" : "false") << ",\\"actual\\":[";
    if (result2.size() >= 2) cout << result2[0] << "," << result2[1];
    cout << "],\\"expected\\":[1,2]}";
    
    cout << ",{\\"case\\":\\"nums=[3,3], target=6\\",\\"passed\\":" << (passed3 ? "true" : "false") << ",\\"actual\\":[";
    if (result3.size() >= 2) cout << result3[0] << "," << result3[1];
    cout << "],\\"expected\\":[0,1]}]" << endl;
    
    return 0;
}
`;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { mode, language, code, input, testCases } = body;

    if (!mode || !language || !code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Only support C++ for now
    if (language !== 'cpp') {
      return NextResponse.json({ error: 'Only C++ is supported currently' }, { status: 400 });
    }

    if (code.length > 10000) {
      return NextResponse.json({ error: 'Code too long (max 10KB)' }, { status: 400 });
    }

    if (mode === 'practice') {
      const result = await executeCppCode(code, input);
      
      if (result.success) {
        return NextResponse.json({
          output: result.output,
          error: result.error,
          executionTime: result.executionTime,
          memoryUsed: result.memoryUsed
        });
      } else {
        return NextResponse.json({
          output: '',
          error: result.error,
          executionTime: '0ms',
          memoryUsed: 'N/A'
        });
      }
    } 
    
    if (mode === 'assessment') {
      const wrappedCode = wrapCppCodeForTesting(code, testCases || []);
      const result = await executeCppCode(wrappedCode);
      
      if (result.success && result.output) {
        try {
          const lines = result.output.trim().split('\n');
          // Find the JSON line (should be before the success message)
          let testResultsLine = '';
          let consoleLines = [];
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.startsWith('[{') && line.includes('"case"')) {
              testResultsLine = line;
            } else if (!line.includes('=== Code Execution Successful ===')) {
              consoleLines.push(line);
            }
          }
          
          if (testResultsLine) {
            const testResults = JSON.parse(testResultsLine);
            return NextResponse.json({ 
              testResults, 
              executionTime: result.executionTime,
              consoleOutput: consoleLines.join('\n') || null
            });
          } else {
            return NextResponse.json({ 
              error: 'No test results found in output',
              rawOutput: result.output
            });
          }
        } catch (parseError) {
          return NextResponse.json({ 
            error: 'Failed to parse test results: ' + parseError.message,
            rawOutput: result.output
          });
        }
      } else {
        return NextResponse.json({ 
          error: result.error || 'Execution failed'
        });
      }
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 });

  } catch (error: any) {
    console.error('Execution error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'OK', message: 'Draxity Compiler API' });
}