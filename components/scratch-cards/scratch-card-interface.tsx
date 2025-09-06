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
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          {allCompleted ? "Challenge Complete!" : "Scratch & Solve Challenge"}
        </h2>

        <div className="max-w-md mx-auto mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {solvedProblems.length}/{problems.length} completed
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        <div className="flex justify-center space-x-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{totalPoints}</div>
            <div className="text-sm text-muted-foreground">Points Earned</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">{scratchedCards.length}</div>
            <div className="text-sm text-muted-foreground">Cards Scratched</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{solvedProblems.length}</div>
            <div className="text-sm text-muted-foreground">Problems Solved</div>
          </div>
        </div>
      </div>

      {/* Scratch Cards Grid */}
      <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {problems.map((problem, index) => {
          const status = getCardStatus(index)

          return (
            <div key={index} className="relative">
              <ScratchCard
                index={index}
                problem={problem}
                status={status}
                onScratched={() => handleCardScratched(index)}
                onSolve={() => setCurrentProblem(problem)}
              />

              {/* Card Number Badge */}
              <div className="absolute -top-3 -left-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm z-10">
                {index + 1}
              </div>

              {/* Status Badge */}
              {status === "solved" && (
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-accent rounded-full flex items-center justify-center z-10">
                  <CheckCircle className="w-5 h-5 text-accent-foreground" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Completion Celebration */}
      {allCompleted && (
        <Card className="max-w-2xl mx-auto border-accent/40 bg-accent/5">
          <CardContent className="p-8 text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Congratulations!</h3>
            <p className="text-muted-foreground mb-4">
              You've completed all scratch card challenges and earned {totalPoints} points!
            </p>

            <div className="flex justify-center space-x-4 mb-6">
              <Badge className="bg-accent/10 text-accent border-accent/20">
                <Star className="w-4 h-4 mr-1" />
                Challenge Master
              </Badge>
              <Badge className="bg-primary/10 text-primary border-primary/20">
                <Trophy className="w-4 h-4 mr-1" />
                Problem Solver
              </Badge>
            </div>

            <div className="space-y-2 text-sm">
              <p className="text-muted-foreground">Next Module Unlocked:</p>
              <p className="font-semibold text-foreground">Recursion & Backtracking</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      {!allCompleted && scratchedCards.length === 0 && (
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-6 text-center">
            <h3 className="font-semibold text-foreground mb-2">Ready to Start?</h3>
            <p className="text-muted-foreground text-sm">
              Click on the first scratch card to reveal your mystery coding challenge. You must solve each problem to
              unlock the next card!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
