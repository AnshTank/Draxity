"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Clock, Lightbulb, Play, CheckCircle, Trophy } from "lucide-react"

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Cards
        </Button>

        <div className="flex items-center space-x-4">
          <Badge variant="outline" className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
          <Badge variant="outline">
            <Clock className="w-4 h-4 mr-1" />
            {formatTime(timeLeft)}
          </Badge>
        </div>
      </div>

      {/* Problem Description */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{problem.title}</CardTitle>
            <Badge className="bg-primary/10 text-primary border-primary/20">{problem.points} points</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">{problem.description}</p>

          <div className="space-y-4">
            <h4 className="font-semibold">Examples:</h4>
            {problem.examples.map((example: any, index: number) => (
              <div key={index} className="bg-muted p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Input:</strong> <code>{example.input}</code>
                  </div>
                  <div>
                    <strong>Output:</strong> <code>{example.output}</code>
                  </div>
                  <div>
                    <strong>Explanation:</strong> {example.explanation}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h4 className="font-semibold mb-2">Constraints:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              {problem.constraints.map((constraint: string, index: number) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {problem.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Code Editor */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Solution</CardTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setShowHints(!showHints)}>
                <Lightbulb className="w-4 h-4 mr-1" />
                Hints ({problem.hints.length})
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitted} size="sm">
                <Play className="w-4 h-4 mr-1" />
                {isSubmitted ? "Running..." : "Submit"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm min-h-[300px] resize-none"
            placeholder="Write your solution here..."
          />

          {/* Hints */}
          {showHints && (
            <Card className="bg-accent/5 border-accent/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-accent">Hints</h4>
                  <div className="flex space-x-1">
                    {problem.hints.map((_: any, index: number) => (
                      <Button
                        key={index}
                        variant={currentHint === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentHint(index)}
                        className="w-8 h-8 p-0"
                      >
                        {index + 1}
                      </Button>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{problem.hints[currentHint]}</p>
              </CardContent>
            </Card>
          )}

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card
              className={allTestsPassed ? "border-accent/40 bg-accent/5" : "border-destructive/40 bg-destructive/5"}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold">Test Results</h4>
                  {allTestsPassed && (
                    <div className="flex items-center space-x-2 text-accent">
                      <Trophy className="w-4 h-4" />
                      <span className="font-semibold">+{problem.points} points</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {testResults.map((result, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-background rounded">
                      <span className="text-sm">{result.input}</span>
                      <div className="flex items-center space-x-2">
                        {result.passed ? (
                          <CheckCircle className="w-4 h-4 text-accent" />
                        ) : (
                          <span className="text-destructive text-sm">{result.output}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {allTestsPassed && (
                  <div className="mt-4 p-3 bg-accent/10 rounded-lg text-center">
                    <p className="text-sm font-medium text-accent">Congratulations! You solved the challenge!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
