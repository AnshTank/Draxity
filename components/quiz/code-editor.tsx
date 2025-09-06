"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Play, CheckCircle, XCircle, Code } from "lucide-react"

interface CodeEditorProps {
  initialCode: string
  onChange: (code: string) => void
  testCases: Array<{ input: string; expected: string }>
}

export function CodeEditor({ initialCode, onChange, testCases }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode)
  const [testResults, setTestResults] = useState<Array<{ passed: boolean; output: string }>>([])
  const [isRunning, setIsRunning] = useState(false)

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
    onChange(newCode)
  }

  const runTests = async () => {
    setIsRunning(true)

    // Simulate test execution
    setTimeout(() => {
      const results = testCases.map((testCase, index) => {
        // Simple simulation - in real implementation, this would execute the code
        const passed = code.includes("slow") && code.includes("fast") // Basic check for two-pointer approach
        return {
          passed,
          output: passed ? testCase.expected : "Wrong Answer",
        }
      })

      setTestResults(results)
      setIsRunning(false)
    }, 2000)
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Code Editor
            </CardTitle>
            <div className="flex space-x-2">
              <Badge variant="outline">Python</Badge>
              <Button onClick={runTests} disabled={isRunning} size="sm">
                <Play className="w-4 h-4 mr-1" />
                {isRunning ? "Running..." : "Run Tests"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="font-mono text-sm min-h-[300px] resize-none"
            placeholder="Write your solution here..."
          />
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Test Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {testResults.map((result, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  result.passed ? "bg-accent/10 border-accent/20" : "bg-destructive/10 border-destructive/20"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Test Case {index + 1}</span>
                  <div className="flex items-center space-x-2">
                    {result.passed ? (
                      <CheckCircle className="w-4 h-4 text-accent" />
                    ) : (
                      <XCircle className="w-4 h-4 text-destructive" />
                    )}
                    <Badge variant={result.passed ? "default" : "destructive"}>
                      {result.passed ? "Passed" : "Failed"}
                    </Badge>
                  </div>
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    <strong>Input:</strong> <code>{testCases[index].input}</code>
                  </div>
                  <div>
                    <strong>Expected:</strong> <code>{testCases[index].expected}</code>
                  </div>
                  <div>
                    <strong>Output:</strong> <code>{result.output}</code>
                  </div>
                </div>
              </div>
            ))}

            <div className="pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <span className="font-medium">
                  {testResults.filter((r) => r.passed).length} / {testResults.length} tests passed
                </span>
                <Badge variant={testResults.every((r) => r.passed) ? "default" : "destructive"}>
                  {testResults.every((r) => r.passed) ? "All Tests Passed" : "Some Tests Failed"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
