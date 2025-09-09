import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkCompilerStatus() {
  try {
    const { stdout } = await execAsync('g++ --version');
    return {
      available: true,
      version: stdout.split('\n')[0],
      message: 'C++ compiler is ready'
    };
  } catch (error) {
    return {
      available: false,
      version: null,
      message: 'C++ compiler not found. Please install MinGW-w64 or GCC'
    };
  }
}

export async function GET() {
  const status = await checkCompilerStatus();
  
  return NextResponse.json({
    compiler: 'g++',
    ...status,
    supportedLanguages: ['cpp'],
    features: {
      practiceMode: true,
      assessmentMode: true,
      syntaxHighlighting: true,
      realTimeExecution: true,
      testCaseValidation: true
    },
    limits: {
      codeSize: '10KB',
      executionTime: '5s',
      memoryLimit: '256MB'
    }
  });
}