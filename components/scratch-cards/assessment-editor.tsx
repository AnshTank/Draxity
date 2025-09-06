"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Play, RotateCcw, Send, Clock, CheckCircle, XCircle, Trophy, Star, ArrowLeft, Maximize2, Settings } from "lucide-react"

interface AssessmentEditorProps {
  onBack?: () => void
}

export function AssessmentEditor({ onBack }: AssessmentEditorProps = {}) {
  const [code, setCode] = useState(`def twoSum(nums, target):
    # Write your solution here
    pass`)
  const [output, setOutput] = useState("")
  const [isRunning, setIsRunning] = useState(false)
  const [testResults, setTestResults] = useState<Array<{case: string, passed: boolean, expected: string, actual: string}>>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState("python")
  const [fontSize, setFontSize] = useState(14)

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
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 p-4 md:p-6 flex items-center justify-center">
        <Card className="w-full max-w-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800 shadow-xl">
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
              {onBack && (
                <Button onClick={onBack} variant="outline" className="px-6">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Challenge
                </Button>
              )}
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
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-foreground">Two Sum</h1>
              <p className="text-sm text-muted-foreground">LeetCode-style Coding Challenge</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Easy
            </Badge>
            <div className="flex items-center text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">30:00</span>
            </div>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)]">
        {/* Left Panel - Problem Statement */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
          <div className="h-full bg-card border-r border-border flex flex-col">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">Problem Description</h2>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    Given an array of integers <code className="bg-muted px-2 py-1 rounded text-foreground">nums</code> and an integer <code className="bg-muted px-2 py-1 rounded text-foreground">target</code>, 
                    return <em>indices of the two numbers such that they add up to target</em>.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You may assume that each input would have <strong className="text-foreground">exactly one solution</strong>, and you may not use the same element twice.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-3">
                    You can return the answer in any order.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Examples</h3>
                  <div className="space-y-4">
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">Example 1:</strong></div>
                        <div className="font-mono text-sm space-y-1">
                          <div><strong className="text-foreground">Input:</strong> nums = [2,7,11,15], target = 9</div>
                          <div><strong className="text-foreground">Output:</strong> [0,1]</div>
                          <div className="text-muted-foreground mt-2"><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/50">
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-2"><strong className="text-foreground">Example 2:</strong></div>
                        <div className="font-mono text-sm space-y-1">
                          <div><strong className="text-foreground">Input:</strong> nums = [3,2,4], target = 6</div>
                          <div><strong className="text-foreground">Output:</strong> [1,2]</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-3">Constraints</h3>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li className="flex items-center"><span className="text-primary mr-2">•</span>2 ≤ nums.length ≤ 10⁴</li>
                        <li className="flex items-center"><span className="text-primary mr-2">•</span>-10⁹ ≤ nums[i] ≤ 10⁹</li>
                        <li className="flex items-center"><span className="text-primary mr-2">•</span>-10⁹ ≤ target ≤ 10⁹</li>
                        <li className="flex items-center"><span className="text-primary mr-2">•</span><strong className="text-foreground">Only one valid answer exists.</strong></li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Right Panel - Code Editor */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            {/* Editor Header */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Tabs value={selectedLanguage} onValueChange={setSelectedLanguage} className="w-auto">
                    <TabsList className="bg-muted">
                      <TabsTrigger value="python" className="text-muted-foreground data-[state=active]:text-foreground">Python</TabsTrigger>
                      <TabsTrigger value="javascript" className="text-muted-foreground data-[state=active]:text-foreground">JavaScript</TabsTrigger>
                      <TabsTrigger value="java" className="text-muted-foreground data-[state=active]:text-foreground">Java</TabsTrigger>
                      <TabsTrigger value="cpp" className="text-muted-foreground data-[state=active]:text-foreground">C++</TabsTrigger>
                    </TabsList>
                  </Tabs>
                  <Separator orientation="vertical" className="h-6" />
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>Font Size:</span>
                    <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.max(12, fontSize - 2))} className="h-6 w-6 p-0">
                      -
                    </Button>
                    <span className="w-8 text-center">{fontSize}</span>
                    <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.min(20, fontSize + 2))} className="h-6 w-6 p-0">
                      +
                    </Button>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleReset} className="text-muted-foreground hover:text-foreground">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                  <Button size="sm" onClick={handleRun} disabled={isRunning} variant="secondary">
                    <Play className="h-4 w-4 mr-2" />
                    {isRunning ? "Running..." : "Run"}
                  </Button>
                  <Button size="sm" onClick={handleSubmit} className="bg-green-600 hover:bg-green-700 text-white">
                    <Send className="h-4 w-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <ResizablePanelGroup direction="vertical" className="flex-1">
              <ResizablePanel defaultSize={60} minSize={30}>
                <div className="h-full flex flex-col">
                  <div className="flex-1 relative">
                    <textarea
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="absolute inset-0 w-full h-full p-4 bg-background text-foreground font-mono resize-none focus:outline-none border-0 focus:ring-2 focus:ring-ring rounded-none"
                      style={{ 
                        fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                        fontSize: `${fontSize}px`,
                        lineHeight: 1.5
                      }}
                      placeholder="# Write your solution here..."
                      spellCheck={false}
                    />
                  </div>
                </div>
              </ResizablePanel>
              
              <ResizableHandle withHandle />

              {/* Test Results */}
              <ResizablePanel defaultSize={40} minSize={20}>
                <div className="h-full bg-card border-t border-border flex flex-col">
                  <div className="p-3 border-b border-border flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-foreground">Test Results</span>
                      {testResults.length > 0 && (
                        <Badge variant={passedTests === totalTests ? "default" : "destructive"} className="text-xs">
                          {passedTests}/{totalTests} Passed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 p-4 overflow-auto">
                    {testResults.length > 0 ? (
                      <div className="space-y-3">
                        {testResults.map((result, index) => (
                          <Card key={index} className={`p-3 ${result.passed ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'}`}>
                            <div className="flex items-start space-x-3">
                              {result.passed ? (
                                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
                              )}
                              <div className="flex-1 text-sm min-w-0">
                                <div className="font-medium mb-1 text-foreground">Test Case {index + 1}</div>
                                <div className="text-muted-foreground mb-2 font-mono text-xs break-all">{result.case}</div>
                                <div className="space-y-1">
                                  <div className="text-muted-foreground">
                                    <span className="font-medium">Expected:</span> <span className="text-green-600 dark:text-green-400 font-mono text-xs">{result.expected}</span>
                                  </div>
                                  <div className="text-muted-foreground">
                                    <span className="font-medium">Actual:</span> <span className={`font-mono text-xs ${result.passed ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{result.actual}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : output ? (
                      <Card className="p-4 bg-muted/50">
                        <pre className="text-sm font-mono text-foreground whitespace-pre-wrap overflow-auto">{output}</pre>
                      </Card>
                    ) : (
                      <div className="flex items-center justify-center h-full text-center">
                        <div className="text-muted-foreground">
                          <Play className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Run your code to see test results...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}