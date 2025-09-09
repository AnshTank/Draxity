"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Trophy, Lock, ArrowRight, RotateCcw, Star, ArrowLeft, Pause } from "lucide-react"
import Link from "next/link"

interface QuizResultsProps {
  mcqScore: number
  codingAnswer: string
  quiz: any
  courseId: string
  moduleId: string
  lessonId: string
}

export function QuizResults({ mcqScore, codingAnswer, quiz, courseId, moduleId, lessonId }: QuizResultsProps) {
  const codingPassed = codingAnswer.trim() !== quiz.questions.coding.starterCode.trim()
  const overallPassed = mcqScore >= quiz.passingScore && codingPassed

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-accent"
    if (score >= quiz.passingScore) return "text-primary"
    return "text-destructive"
  }

  const getScoreBadge = (score: number) => {
    if (score >= 90) return "Excellent"
    if (score >= quiz.passingScore) return "Passed"
    return "Failed"
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div
          className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            overallPassed ? "bg-accent/10" : "bg-destructive/10"
          }`}
        >
          {overallPassed ? (
            <Trophy className="w-8 h-8 text-accent" />
          ) : (
            <XCircle className="w-8 h-8 text-destructive" />
          )}
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          {overallPassed ? "Congratulations!" : "Keep Trying!"}
        </h2>
        <p className="text-muted-foreground">
          {overallPassed
            ? "You've successfully completed the quiz and unlocked the next section."
            : "You need to meet all requirements to proceed to practice problems."}
        </p>
      </div>

      {/* Overall Score */}
      <Card className={`${overallPassed ? "border-accent/40 bg-accent/5" : "border-destructive/40 bg-destructive/5"}`}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Quiz Results</span>
            <Badge variant={overallPassed ? "default" : "destructive"}>{overallPassed ? "PASSED" : "FAILED"}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* MCQ Score */}
            <div className="text-center p-4 border border-border rounded-lg">
              <div className={`text-3xl font-bold ${getScoreColor(mcqScore)}`}>{mcqScore}%</div>
              <div className="text-sm text-muted-foreground mb-2">Multiple Choice</div>
              <Badge variant={mcqScore >= quiz.passingScore ? "default" : "destructive"}>
                {getScoreBadge(mcqScore)}
              </Badge>
            </div>

            {/* Coding Score */}
            <div className="text-center p-4 border border-border rounded-lg">
              <div className={`text-3xl font-bold ${codingPassed ? "text-accent" : "text-destructive"}`}>
                {codingPassed ? <CheckCircle className="w-8 h-8 mx-auto" /> : <XCircle className="w-8 h-8 mx-auto" />}
              </div>
              <div className="text-sm text-muted-foreground mb-2">Coding Challenge</div>
              <Badge variant={codingPassed ? "default" : "destructive"}>
                {codingPassed ? "Completed" : "Incomplete"}
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Overall Progress</span>
              <span className="font-medium">{overallPassed ? "100%" : "Incomplete"}</span>
            </div>
            <Progress value={overallPassed ? 100 : 50} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Requirements Check */}
      <Card>
        <CardHeader>
          <CardTitle>Requirements Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center space-x-3">
            {mcqScore >= quiz.passingScore ? (
              <CheckCircle className="w-5 h-5 text-accent" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            <span className="flex-1">Score at least {quiz.passingScore}% on multiple choice questions</span>
            <Badge variant={mcqScore >= quiz.passingScore ? "default" : "destructive"}>{mcqScore}%</Badge>
          </div>

          <div className="flex items-center space-x-3">
            {codingPassed ? (
              <CheckCircle className="w-5 h-5 text-accent" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
            <span className="flex-1">Successfully solve the coding problem</span>
            <Badge variant={codingPassed ? "default" : "destructive"}>{codingPassed ? "Complete" : "Incomplete"}</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          {overallPassed ? (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-accent/10 rounded-lg">
                <Star className="w-6 h-6 text-accent" />
                <div>
                  <div className="font-semibold text-foreground">Practice Problems Unlocked!</div>
                  <div className="text-sm text-muted-foreground">
                    You can now access 45 practice problems for Arrays & Strings
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link href={`/courses/${courseId}/modules/${moduleId}/practice`}>
                  <Button>
                    Start Practice Problems
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href={`/courses/${courseId}/modules/${Number.parseInt(moduleId) + 1}`}>
                  <Button variant="outline">
                    Next Module: Recursion & Backtracking
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-destructive/10 rounded-lg">
                <Lock className="w-6 h-6 text-destructive" />
                <div>
                  <div className="font-semibold text-foreground">Practice Problems Locked</div>
                  <div className="text-sm text-muted-foreground">
                    Complete all requirements to unlock practice problems
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <p className="text-muted-foreground">To improve your score:</p>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                  <li>Review the lesson materials again</li>
                  <li>Focus on concepts you got wrong</li>
                  <li>Practice the coding problem step by step</li>
                  <li>Use the two-pointer technique for the coding challenge</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <Button onClick={() => window.location.reload()}>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Retake Quiz
                </Button>
                <Link href={`/courses/${courseId}/modules/${moduleId}/lessons/${lessonId}`}>
                  <Button variant="outline">Review Lesson</Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
