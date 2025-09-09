import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import { writeFile, unlink, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const execAsync = promisify(exec);

const TEMP_DIR = path.join(process.cwd(), 'temp');
if (!existsSync(TEMP_DIR)) {
  mkdir(TEMP_DIR, { recursive: true });
}

function parseGccErrors(stderr: string) {
  const errors = [];
  const lines = stderr.split('\n');
  
  for (const line of lines) {
    const match = line.match(/.*?:(\d+):(\d+):\s*(error|warning):\s*(.+)/);
    if (match) {
      const [, lineNum, colNum, severity, message] = match;
      errors.push({
        line: parseInt(lineNum),
        column: parseInt(colNum),
        severity: severity === 'error' ? 'error' : 'warning',
        message: message.trim()
      });
    }
  }
  
  return errors;
}

async function validateCppSyntax(code: string) {
  const timestamp = Date.now();
  const filename = `validate_${timestamp}`;
  const cppFile = path.join(TEMP_DIR, `${filename}.cpp`);

  try {
    await writeFile(cppFile, code);
    
    const compileCommand = `g++ -fsyntax-only -Wall -Wextra "${cppFile}"`;
    
    try {
      await execAsync(compileCommand, { timeout: 5000 });
      return { errors: [] };
    } catch (compileError: any) {
      const errors = parseGccErrors(compileError.stderr || '');
      return { errors };
    }
  } finally {
    try {
      if (existsSync(cppFile)) await unlink(cppFile);
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError);
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const { code, language } = await request.json();

    if (!code || !language) {
      return NextResponse.json({ error: 'Missing code or language' }, { status: 400 });
    }

    if (language !== 'cpp') {
      return NextResponse.json({ error: 'Only C++ validation supported' }, { status: 400 });
    }

    const validation = await validateCppSyntax(code);
    return NextResponse.json(validation);

  } catch (error: any) {
    console.error('Validation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'C++ Syntax Validation API',
    supportedLanguages: ['cpp']
  });
}