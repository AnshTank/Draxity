"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Star, Sparkles, Gift } from "lucide-react"
import { ScratchCard } from "@/components/scratch-cards/scratch-card"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    explanation: "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
  },
  {
    id: 2,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    correctAnswer: 2,
    explanation: "Stack follows the LIFO principle where the last element added is the first one to be removed.",
  },
  {
    id: 3,
    question: "What is the worst-case time complexity of quicksort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: 1,
    explanation: "In the worst case, quicksort has O(n²) time complexity when the pivot is always the smallest or largest element.",
  },
  {
    id: 4,
    question: "What is a hash table?",
    options: ["A sorted array", "A key-value data structure", "A binary tree", "A linked list"],
    correctAnswer: 1,
    explanation: "A hash table is a data structure that stores key-value pairs and uses a hash function to compute an index.",
  },
  {
    id: 5,
    question: "Which algorithm is used for finding the shortest path in a graph?",
    options: ["DFS", "BFS", "Dijkstra's", "Binary Search"],
    correctAnswer: 2,
    explanation: "Dijkstra's algorithm is used to find the shortest path between nodes in a weighted graph.",
  },
  {
    id: 6,
    question: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation: "Merge sort requires O(n) additional space for the temporary arrays used during merging.",
  },
  {
    id: 7,
    question: "Which data structure is best for implementing a priority queue?",
    options: ["Array", "Linked List", "Heap", "Stack"],
    correctAnswer: 2,
    explanation: "A heap is the most efficient data structure for implementing a priority queue with O(log n) operations.",
  },
  {
    id: 8,
    question: "What is the average time complexity of hash table operations?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 0,
    explanation: "Hash tables provide O(1) average time complexity for insert, delete, and search operations.",
  },
  {
    id: 9,
    question: "Which traversal visits nodes level by level?",
    options: ["Inorder", "Preorder", "Postorder", "Level-order"],
    correctAnswer: 3,
    explanation: "Level-order traversal (BFS) visits all nodes at the current depth before moving to nodes at the next depth.",
  },
  {
    id: 10,
    question: "What is the main advantage of a balanced binary search tree?",
    options: ["Uses less memory", "Guarantees O(log n) operations", "Easier to implement", "Supports duplicate values"],
    correctAnswer: 1,
    explanation: "Balanced BSTs guarantee O(log n) time complexity for search, insert, and delete operations.",
  },
]

export function QuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([])
  const [showResults, setShowResults] = useState(false)
  const [showScratchCard, setShowScratchCard] = useState(false)
  const [score, setScore] = useState(0)

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestion] = answerIndex
    setSelectedAnswers(newAnswers)
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Calculate score
      const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
        return answer === sampleQuestions[index].correctAnswer ? acc + 1 : acc
      }, 0)
      setScore(correctAnswers)
      setShowResults(true)
    }
  }

  const handleContinueToScratchCard = () => {
    setShowScratchCard(true)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswers([])
    setShowResults(false)
    setShowScratchCard(false)
    setScore(0)
  }

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100
  const passingScore = Math.ceil(sampleQuestions.length * 0.7) // 70% to pass

  if (showScratchCard) {
    return <ScratchCard />
  }

  if (showResults) {
    const passed = score >= passingScore
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 p-6 flex items-center justify-center">
        <Card className="w-full max-w-3xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="text-center pb-4">
            <div className="mb-6">
              {passed ? (
                <div className="animate-bounce">
                  <Trophy className="h-20 w-20 text-yellow-500 mx-auto mb-4" />
                  <div className="flex justify-center space-x-2 mb-4">
                    <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
                    <Star className="h-6 w-6 text-yellow-500 animate-pulse" />
                    <Sparkles className="h-6 w-6 text-purple-500 animate-pulse" />
                  </div>
                </div>
              ) : (
                <div className="text-6xl mb-4">📚</div>
              )}
            </div>
            <CardTitle className="text-4xl mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {passed ? "Congratulations!" : "Keep Learning!"}
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              {passed ? "You've mastered this lesson!" : "Review the concepts and try again."}
            </p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 p-6 rounded-xl">
              <div className="text-5xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {score}/{sampleQuestions.length}
              </div>
              <p className="text-muted-foreground">
                You scored {Math.round((score / sampleQuestions.length) * 100)}%
              </p>
              <div className="mt-4">
                <Progress value={(score / sampleQuestions.length) * 100} className="h-3" />
              </div>
            </div>

            {passed && (
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-6 rounded-xl border-2 border-green-200 dark:border-green-800">
                <Gift className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-green-700 dark:text-green-300 mb-2">Unlock Bonus Challenge!</h3>
                <p className="text-green-600 dark:text-green-400 mb-4">
                  You've earned a scratch card with a hidden coding challenge!
                </p>
                <Button 
                  onClick={handleContinueToScratchCard}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-8 py-3"
                >
                  <Sparkles className="h-5 w-5 mr-2" />
                  Reveal Challenge
                </Button>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <Button onClick={handleRestart} variant="outline" className="px-6">
                <RotateCcw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
              {!passed && (
                <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6">
                  Review Lesson
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Arrays & Strings Quiz
              </h1>
              <p className="text-muted-foreground">Test your knowledge to unlock the next challenge</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Need {passingScore}/{sampleQuestions.length} to pass</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-purple-100 dark:bg-purple-900" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        <Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-2 border-purple-200 dark:border-purple-800 shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <CardTitle className="text-2xl text-foreground flex-1">
                {sampleQuestions[currentQuestion].question}
              </CardTitle>
              <div className="ml-4 text-right">
                <div className="text-sm text-muted-foreground">Points</div>
                <div className="text-lg font-bold text-purple-600">+10</div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup
              value={selectedAnswers[currentQuestion]?.toString()}
              onValueChange={(value) => handleAnswerSelect(parseInt(value))}
            >
              {sampleQuestions[currentQuestion].options.map((option, index) => (
                <div key={index} className="group">
                  <div className="flex items-center space-x-3 p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30 transition-all cursor-pointer">
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} className="border-2" />
                    <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                      {option}
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                disabled={currentQuestion === 0}
                className="px-6"
              >
                Previous
              </Button>
              <Button 
                onClick={handleNext} 
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6"
              >
                {currentQuestion === sampleQuestions.length - 1 ? "Finish Quiz" : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}