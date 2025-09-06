"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ArrowLeft, Clock, Lightbulb, Play, CheckCircle, Trophy, Settings, Maximize2, RotateCcw } from "lucide-react"

interface ProblemSolverProps {
  problem: any
  onSolved: (points: number) => void
  onBack: () => void
}

export function ProblemSolver({ problem, onSolved, onBack }: ProblemSolverProps) {
  const [code, setCode] = useState(problem.starterCode)
  const [timeLeft, setTimeLeft] = useState(problem.timeLimit * 60) // Convert to seconds
  const [showHints, setShowHints] = useState(false)
  const [currentHint, setCurrentHint] = useState(0)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [testResults, setTestResults] = useState<any[]>([])

  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isSubmitted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmit = () => {
    setIsSubmitted(true)

    // Simulate test execution
    setTimeout(() => {
      const passed = code.length > problem.starterCode.length + 50 // Simple check
      setTestResults([
        { passed: true, input: "Test 1", output: "Correct" },
        { passed, input: "Test 2", output: passed ? "Correct" : "Wrong Answer" },
      ])

      if (passed) {
        setTimeout(() => {
          onSolved(problem.points)
        }, 2000)
      }
    }, 1500)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-accent"
      case "medium":
        return "text-yellow-500"
      case "hard":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  const allTestsPassed = testResults.length > 0 && testResults.every((t) => t.passed)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Cards
            </Button>
            <Separator orientation="vertical" className="h-6" />
            <div>
              <h1 className="text-xl font-bold text-foreground">{problem.title}</h1>
              <p className="text-sm text-muted-foreground">Scratch Card Challenge</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
              {problem.difficulty}
            </Badge>
            <div className="flex items-center text-orange-600 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{formatTime(timeLeft)}</span>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {problem.points} pts
            </Badge>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[calc(100vh-8rem)]">
        {/* Problem Description Panel */}
        <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
          <div className="h-full bg-card border-r border-border flex flex-col">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">Problem Description</h2>
                <Button variant="ghost" size="sm">
                  <Maximize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <div className="space-y-6">
                <div>
                  <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Examples:</h4>
                  <div className="space-y-4">
                    {problem.examples.map((example: any, index: number) => (
                      <Card key={index} className="bg-muted/50">
                        <CardContent className="p-4">
                          <div className="space-y-2 text-sm">
                            <div className="font-mono">
                              <strong className="text-foreground">Input:</strong> <code className="bg-muted px-2 py-1 rounded">{example.input}</code>
                            </div>
                            <div className="font-mono">
                              <strong className="text-foreground">Output:</strong> <code className="bg-muted px-2 py-1 rounded">{example.output}</code>
                            </div>
                            <div className="text-muted-foreground">
                              <strong>Explanation:</strong> {example.explanation}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Constraints:</h4>
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        {problem.constraints.map((constraint: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2 mt-0.5">•</span>
                            <span>{constraint}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {problem.tags.map((tag: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-primary/10 text-primary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Code Editor Panel */}
        <ResizablePanel defaultSize={50} minSize={30}>
          <div className="h-full flex flex-col">
            {/* Editor Header */}
            <div className="bg-card border-b border-border p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h3 className="font-semibold text-foreground">Solution</h3>
                  <Separator orientation="vertical" className="h-6" />
                  <Badge variant="outline" className="text-xs">
                    Python
                  </Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setCode(problem.starterCode)}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    Reset
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowHints(!showHints)}>
                    <Lightbulb className="w-4 h-4 mr-1" />
                    Hints ({problem.hints.length})
                  </Button>
                  <Button onClick={handleSubmit} disabled={isSubmitted} size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                    <Play className="w-4 h-4 mr-1" />
                    {isSubmitted ? "Running..." : "Submit"}
                  </Button>
                </div>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="absolute inset-0 w-full h-full font-mono text-sm resize-none border-0 focus:ring-2 focus:ring-ring rounded-none"
                  style={{ 
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
                    fontSize: '14px',
                    lineHeight: 1.5
                  }}
                  placeholder="# Write your solution here..."
                  spellCheck={false}
                />
              </div>
            </div>

            {/* Hints Panel */}
            {showHints && (
              <div className="border-t border-border bg-accent/5">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-accent">💡 Hints</h4>
                    <div className="flex space-x-1">
                      {problem.hints.map((_: any, index: number) => (
                        <Button
                          key={index}
                          variant={currentHint === index ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentHint(index)}
                          className="w-8 h-8 p-0 text-xs"
                        >
                          {index + 1}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <Card className="bg-background/50">
                    <CardContent className="p-3">
                      <p className="text-sm text-muted-foreground">{problem.hints[currentHint]}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Test Results Panel */}
            {testResults.length > 0 && (
              <div className={`border-t border-border ${allTestsPassed ? 'bg-green-50 dark:bg-green-950' : 'bg-red-50 dark:bg-red-950'}`}>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-foreground">🧪 Test Results</h4>
                    {allTestsPassed && (
                      <div className="flex items-center space-x-2 text-green-600 dark:text-green-400">
                        <Trophy className="w-4 h-4" />
                        <span className="font-semibold">+{problem.points} points</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    {testResults.map((result, index) => (
                      <Card key={index} className={`p-3 ${result.passed ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900' : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900'}`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono">{result.input}</span>
                          <div className="flex items-center space-x-2">
                            {result.passed ? (
                              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                            ) : (
                              <span className="text-red-600 dark:text-red-400 text-sm font-medium">{result.output}</span>
                            )}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  {allTestsPassed && (
                    <Card className="mt-4 border-green-200 bg-green-100 dark:border-green-800 dark:bg-green-900">
                      <CardContent className="p-4 text-center">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <Trophy className="w-5 h-5 text-yellow-500" />
                          <span className="font-bold text-green-700 dark:text-green-300">Challenge Completed!</span>
                        </div>
                        <p className="text-sm text-green-600 dark:text-green-400">Congratulations! You solved the challenge and earned {problem.points} points!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}
