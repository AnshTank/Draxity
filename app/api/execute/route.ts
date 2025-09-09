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
    const compileCommand = `g++ -o "${exeFile}" "${cppFile}" -std=c++17 -O2`;
    const compileStart = Date.now();
    
    try {
      await execAsync(compileCommand, { timeout: 10000 });
    } catch (compileError: any) {
      return {
        success: false,
        error: compileError.stderr || compileError.message,
        type: 'compilation_error'
      };
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
      
      return {
        success: true,
        output: stdout,
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
  return `
#include <iostream>
#include <vector>
#include <string>
#include <sstream>
#include <algorithm>
using namespace std;

${userCode}

int main() {
    vector<string> results;
    
    // Test Case 1: [2,7,11,15], target = 9
    vector<int> nums1 = {2, 7, 11, 15};
    int target1 = 9;
    vector<int> result1 = twoSum(nums1, target1);
    vector<int> expected1 = {0, 1};
    bool passed1 = (result1 == expected1);
    
    // Test Case 2: [3,2,4], target = 6
    vector<int> nums2 = {3, 2, 4};
    int target2 = 6;
    vector<int> result2 = twoSum(nums2, target2);
    vector<int> expected2 = {1, 2};
    bool passed2 = (result2 == expected2);
    
    // Test Case 3: [3,3], target = 6
    vector<int> nums3 = {3, 3};
    int target3 = 6;
    vector<int> result3 = twoSum(nums3, target3);
    vector<int> expected3 = {0, 1};
    bool passed3 = (result3 == expected3);
    
    // Output results in JSON format
    cout << "[";
    cout << "{\"case\":1,\"passed\":" << (passed1 ? "true" : "false") << ",\"actual\":[" << result1[0] << "," << result1[1] << "],\"expected\":[0,1]}"; 
    cout << ",{\"case\":2,\"passed\":" << (passed2 ? "true" : "false") << ",\"actual\":[" << result2[0] << "," << result2[1] << "],\"expected\":[1,2]}";
    cout << ",{\"case\":3,\"passed\":" << (passed3 ? "true" : "false") << ",\"actual\":[" << result3[0] << "," << result3[1] << "],\"expected\":[0,1]}";
    cout << "]" << endl;
    
    return 0;
}
`;
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
          const testResults = JSON.parse(result.output.trim());
          return NextResponse.json({ 
            testResults, 
            executionTime: result.executionTime 
          });
        } catch (parseError) {
          return NextResponse.json({ 
            error: 'Failed to parse test results',
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