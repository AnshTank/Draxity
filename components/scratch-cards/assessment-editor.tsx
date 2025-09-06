"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Play, RotateCcw, Send, Clock, CheckCircle, XCircle, Trophy, Star } from "lucide-react"

export function AssessmentEditor() {
  const [code, setCode] = useState(`def twoSum(nums, target):
    # Write your solution here
    pass`)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{case: string, passed: boolean, expected: string, actual: string}>>([])
  const [showResults, setShowResults] = useState(false)

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      const results = [
        { case: "nums = [2,7,11,15], target = 9", passed: true, expected: "[0,1]", actual: "[0,1]" },
        { case: "nums = [3,2,4], target = 6", passed: true, expected: "[1,2]", actual: "[1,2]" },
        { case: "nums = [3,3], target = 6", passed: false, expected: "[0,1]", actual: "None" },
      ]
      setTestResults(results)
      setOutput("Test Results:\n\n" + results.map((r, i) => 
        `Test Case ${i + 1}: ${r.passed ? "PASSED ✓" : "FAILED ✗"}\nInput: ${r.case}\nExpected: ${r.expected}\nActual: ${r.actual}`
      ).join("\n\n"))
      setIsRunning(false)
    }, 2000)
  }

  const handleSubmit = () => {
    setShowResults(true)
  }

  const handleReset = () => {
    setCode(`def twoSum(nums, target):
    # Write your solution here
    pass`)
    setOutput("")
    setTestResults([])
    setShowResults(false)
  }

  const passedTests = testResults.filter(t => t.passed).length
  const totalTests = testResults.length

  if (showResults) {
    const allPassed = passedTests === totalTests && totalTests > 0
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="text-center pb-4">
            <div className="mb-6">
              {allPassed ? (
                <div className="animate-bounce">
                  <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
                  <div className="flex justify-center space-x-2">
                    <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
                    <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
                    <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="text-6xl mb-4">💪</div>
              )}
            </div>
            <CardTitle className="text-4xl mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {allPassed ? "Challenge Complete!" : "Keep Trying!"}
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              {allPassed ? "Excellent work! You've unlocked new content." : "You're on the right track. Review and try again."}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 p-6 rounded-xl">
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {passedTests}/{totalTests}
              </div>
              <p className="text-muted-foreground mb-4">Test Cases Passed</p>
              
              {allPassed && (
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+100</div>
                    <div className="text-sm text-green-600">XP Earned</div>
                  </div>
                  <div className="text-center">
                    <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-1" />
                    <div className="text-sm text-yellow-600">Badge Unlocked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">🔓</div>
                    <div className="text-sm text-blue-600">Next Level</div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button onClick={handleReset} variant="outline" className="px-6">
                <RotateCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
              {allPassed && (
                <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6">
                  Continue Learning
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="h-screen bg-gray-900 text-white flex">
      {/* Left Panel - Problem Statement */}
      <div className="w-1/2 bg-gray-800 border-r border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Two Sum</h1>
            <div className="flex items-center space-x-2">
              <Badge className="bg-green-600">Easy</Badge>
              <div className="flex items-center text-yellow-500">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">30:00</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Problem Description</h3>
              <p className="text-gray-300 leading-relaxed">
                Given an array of integers <code className="bg-gray-700 px-2 py-1 rounded">nums</code> and an integer <code className="bg-gray-700 px-2 py-1 rounded">target</code>, 
                return <em>indices of the two numbers such that they add up to target</em>.
              </p>
              <p className="text-gray-300 leading-relaxed mt-3">
                You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
              </p>
              <p className="text-gray-300 leading-relaxed mt-3">
                You can return the answer in any order.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Examples</h3>
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-300 mb-2"><strong>Example 1:</strong></div>
                  <div className="font-mono text-sm">
                    <div><strong className="text-white">Input:</strong> nums = [2,7,11,15], target = 9</div>
                    <div><strong className="text-white">Output:</strong> [0,1]</div>
                    <div className="text-gray-400 mt-2"><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                  </div>
                </div>
                
                <div className="bg-gray-700 p-4 rounded-lg">
                  <div className="text-sm text-gray-300 mb-2"><strong>Example 2:</strong></div>
                  <div className="font-mono text-sm">
                    <div><strong className="text-white">Input:</strong> nums = [3,2,4], target = 6</div>
                    <div><strong className="text-white">Output:</strong> [1,2]</div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Constraints</h3>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• 2 ≤ nums.length ≤ 10⁴</li>
                <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                <li>• -10⁹ ≤ target ≤ 10⁹</li>
                <li>• <strong>Only one valid answer exists.</strong></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Code Editor */}
      <div className="w-1/2 flex flex-col">
        {/* Editor Header */}
        <div className="bg-gray-800 border-b border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <Tabs defaultValue="python" className="w-auto">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="python" className="text-gray-300 data-[state=active]:text-white">Python</TabsTrigger>
                <TabsTrigger value="javascript" className="text-gray-300 data-[state=active]:text-white">JavaScript</TabsTrigger>
                <TabsTrigger value="java" className="text-gray-300 data-[state=active]:text-white">Java</TabsTrigger>
              </TabsList>
            </Tabs>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={handleReset} className="text-gray-300 hover:text-white">
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button size="sm" onClick={handleRun} disabled={isRunning} className="bg-blue-600 hover:bg-blue-700">
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run"}
              </Button>
              <Button size="sm" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-1 p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none border-0"
            style={{ fontFamily: 'JetBrains Mono, Consolas, monospace' }}
            placeholder="# Write your solution here..."
          />
        </div>

        {/* Test Results */}
        <div className="h-64 bg-gray-800 border-t border-gray-700">
          <div className="p-3 border-b border-gray-700 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">Test Results</span>
              {testResults.length > 0 && (
                <Badge variant={passedTests === totalTests ? "default" : "destructive"}>
                  {passedTests}/{totalTests} Passed
                </Badge>
              )}
            </div>
          </div>
          <div className="p-4 h-full overflow-auto">
            {testResults.length > 0 ? (
              <div className="space-y-3">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-gray-700 rounded">
                    {result.passed ? (
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    )}
                    <div className="flex-1 text-sm">
                      <div className="text-white font-medium mb-1">Test Case {index + 1}</div>
                      <div className="text-gray-300 mb-1">{result.case}</div>
                      <div className="text-gray-400">
                        Expected: <span className="text-green-400">{result.expected}</span>
                      </div>
                      <div className="text-gray-400">
                        Actual: <span className={result.passed ? "text-green-400" : "text-red-400"}>{result.actual}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : output ? (
              <pre className="text-sm font-mono text-gray-300 whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-gray-500 text-sm">Run your code to see test results...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}