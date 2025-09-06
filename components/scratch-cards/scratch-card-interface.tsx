"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, CheckCircle } from "lucide-react"
import { ScratchCard } from "./scratch-card"
import { ProblemSolver } from "./problem-solver"

interface ScratchCardInterfaceProps {
  problems: any[]
  courseId: string
  moduleId: string
}

export function ScratchCardInterface({ problems, courseId, moduleId }: ScratchCardInterfaceProps) {
  const [scratchedCards, setScratchedCards] = useState<number[]>([])
  const [solvedProblems, setSolvedProblems] = useState<number[]>([])
  const [currentProblem, setCurrentProblem] = useState<any>(null)
  const [totalPoints, setTotalPoints] = useState(0)

  const handleCardScratched = (cardIndex: number) => {
    if (!scratchedCards.includes(cardIndex)) {
      setScratchedCards([...scratchedCards, cardIndex])
      setCurrentProblem(problems[cardIndex])
    }
  }

  const handleProblemSolved = (problemId: number, points: number) => {
    if (!solvedProblems.includes(problemId)) {
      setSolvedProblems([...solvedProblems, problemId])
      setTotalPoints(totalPoints + points)
    }
    setCurrentProblem(null)
  }

  const getCardStatus = (index: number) => {
    if (solvedProblems.includes(problems[index].id)) return "solved"
    if (scratchedCards.includes(index)) return "revealed"
    if (index === 0 || solvedProblems.includes(problems[index - 1]?.id)) return "available"
    return "locked"
  }

  const progress = (solvedProblems.length / problems.length) * 100
  const allCompleted = solvedProblems.length === problems.length

  if (currentProblem) {
    return (
      <ProblemSolver
        problem={currentProblem}
        onSolved={(points) => handleProblemSolved(currentProblem.id, points)}
        onBack={() => setCurrentProblem(null)}
      />
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          {allCompleted ? "🎉 Challenge Complete!" : "🎯 Scratch & Solve Challenge"}
        </h2>

        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">
              {solvedProblems.length}/{problems.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-3 bg-muted" />
          <div className="text-center mt-2">
            <span className="text-xs text-muted-foreground">{Math.round(progress)}% Complete</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          <div className="text-center p-3 bg-primary/5 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">{totalPoints}</div>
            <div className="text-xs text-muted-foreground">Points Earned</div>
          </div>
          <div className="text-center p-3 bg-accent/5 rounded-lg border border-accent/20">
            <div className="text-2xl font-bold text-accent">{scratchedCards.length}</div>
            <div className="text-xs text-muted-foreground">Cards Scratched</div>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{solvedProblems.length}</div>
            <div className="text-xs text-muted-foreground">Problems Solved</div>
          </div>
        </div>
      </div>

      {/* Scratch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {problems.map((problem, index) => {
          const status = getCardStatus(index)

          return (
            <div key={index} className="relative group">
              <ScratchCard
                index={index}
                problem={problem}
                status={status}
                onScratched={() => handleCardScratched(index)}
                onSolve={() => setCurrentProblem(problem)}
              />

              {/* Card Number Badge */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm z-10 shadow-lg">
                {index + 1}
              </div>

              {/* Status Badge */}
              {status === "solved" && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-lg animate-pulse">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              )}
              
              {/* Difficulty Badge */}
              <div className="absolute top-2 right-2 z-10">
                <Badge variant="secondary" className={`text-xs ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                  'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                }`}>
                  {problem.difficulty}
                </Badge>
              </div>
            </div>
          )
        })}
      </div>

      {/* Completion Celebration */}
      {allCompleted && (
        <Card className="max-w-2xl mx-auto border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Trophy className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-2">🎉 Congratulations! 🎉</h3>
            <p className="text-muted-foreground mb-6 text-lg">
              You've mastered all scratch card challenges and earned <span className="font-bold text-primary">{totalPoints} points</span>!
            </p>

            <div className="flex justify-center flex-wrap gap-3 mb-6">
              <Badge className="bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-800 border-yellow-300 dark:from-yellow-900 dark:to-orange-900 dark:text-yellow-200 dark:border-yellow-700 px-4 py-2">
                <Star className="w-4 h-4 mr-2" />
                Challenge Master
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 border-purple-300 dark:from-purple-900 dark:to-indigo-900 dark:text-purple-200 dark:border-purple-700 px-4 py-2">
                <Trophy className="w-4 h-4 mr-2" />
                Problem Solver
              </Badge>
              <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300 dark:from-green-900 dark:to-emerald-900 dark:text-green-200 dark:border-green-700 px-4 py-2">
                <CheckCircle className="w-4 h-4 mr-2" />
                All Complete
              </Badge>
            </div>

            <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4">
                <div className="text-sm">
                  <p className="text-muted-foreground mb-2">🔓 Next Module Unlocked:</p>
                  <p className="font-bold text-lg text-blue-600 dark:text-blue-400">Recursion & Backtracking</p>
                  <p className="text-xs text-muted-foreground mt-1">Continue your learning journey!</p>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {!allCompleted && scratchedCards.length === 0 && (
        <Card className="max-w-2xl mx-auto border-dashed border-2 border-muted-foreground/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-primary animate-pulse" />
            </div>
            <h3 className="font-semibold text-foreground mb-3">🚀 Ready to Start?</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Click on the first scratch card to reveal your mystery coding challenge. You must solve each problem to unlock the next card!
            </p>
            <div className="mt-4 text-xs text-muted-foreground">
              💡 <strong>Tip:</strong> Each solved challenge earns you points and unlocks the next card!
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}