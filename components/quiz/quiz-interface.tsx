"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  XCircle,
  ArrowRight,
  RotateCcw,
  Trophy,
  Star,
  Sparkles,
  Gift,
  Pause,
  ArrowLeft,
} from "lucide-react";

import Link from "next/link";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
    correctAnswer: 1,
    explanation:
      "Binary search divides the search space in half with each comparison, resulting in O(log n) time complexity.",
  },
  {
    id: 2,
    question: "Which data structure uses LIFO (Last In, First Out) principle?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    correctAnswer: 2,
    explanation:
      "Stack follows the LIFO principle where the last element added is the first one to be removed.",
  },
  {
    id: 3,
    question: "What is the worst-case time complexity of quicksort?",
    options: ["O(n log n)", "O(n²)", "O(n)", "O(log n)"],
    correctAnswer: 1,
    explanation:
      "In the worst case, quicksort has O(n²) time complexity when the pivot is always the smallest or largest element.",
  },
  {
    id: 4,
    question: "What is a hash table?",
    options: [
      "A sorted array",
      "A key-value data structure",
      "A binary tree",
      "A linked list",
    ],
    correctAnswer: 1,
    explanation:
      "A hash table is a data structure that stores key-value pairs and uses a hash function to compute an index.",
  },
  {
    id: 5,
    question:
      "Which algorithm is used for finding the shortest path in a graph?",
    options: ["DFS", "BFS", "Dijkstra's", "Binary Search"],
    correctAnswer: 2,
    explanation:
      "Dijkstra's algorithm is used to find the shortest path between nodes in a weighted graph.",
  },
  {
    id: 6,
    question: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correctAnswer: 2,
    explanation:
      "Merge sort requires O(n) additional space for the temporary arrays used during merging.",
  },
  {
    id: 7,
    question: "Which data structure is best for implementing a priority queue?",
    options: ["Array", "Linked List", "Heap", "Stack"],
    correctAnswer: 2,
    explanation:
      "A heap is the most efficient data structure for implementing a priority queue with O(log n) operations.",
  },
  {
    id: 8,
    question: "What is the average time complexity of hash table operations?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correctAnswer: 0,
    explanation:
      "Hash tables provide O(1) average time complexity for insert, delete, and search operations.",
  },
  {
    id: 9,
    question: "Which traversal visits nodes level by level?",
    options: ["Inorder", "Preorder", "Postorder", "Level-order"],
    correctAnswer: 3,
    explanation:
      "Level-order traversal (BFS) visits all nodes at the current depth before moving to nodes at the next depth.",
  },
  {
    id: 10,
    question: "What is the main advantage of a balanced binary search tree?",
    options: [
      "Uses less memory",
      "Guarantees O(log n) operations",
      "Easier to implement",
      "Supports duplicate values",
    ],
    correctAnswer: 1,
    explanation:
      "Balanced BSTs guarantee O(log n) time complexity for search, insert, and delete operations.",
  },
];

export function QuizInterface() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    (number | undefined)[]
  >([]);
  const [showResults, setShowResults] = useState(false);

  const [score, setScore] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    const savedQuestion = localStorage.getItem("quizCurrentQuestion");
    const savedAnswers = localStorage.getItem("quizSelectedAnswers");
    const savedResults = localStorage.getItem("quizShowResults");
    const savedScore = localStorage.getItem("quizScore");

    if (savedQuestion) {
      setCurrentQuestion(parseInt(savedQuestion));
    }
    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
    if (savedResults === "true") {
      setShowResults(true);
      if (savedScore) {
        setScore(parseInt(savedScore));
      }
    }
    setIsLoaded(true);
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("quizCurrentQuestion", currentQuestion.toString());
    }
  }, [currentQuestion, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        "quizSelectedAnswers",
        JSON.stringify(selectedAnswers)
      );
    }
  }, [selectedAnswers, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("quizShowResults", showResults.toString());
      localStorage.setItem("quizScore", score.toString());
    }
  }, [showResults, score, isLoaded]);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    if (newAnswers[currentQuestion] === answerIndex) {
      newAnswers[currentQuestion] = undefined;
    } else {
      newAnswers[currentQuestion] = answerIndex;
    }
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
        return answer === sampleQuestions[index].correctAnswer ? acc + 1 : acc;
      }, 0);
      setScore(correctAnswers ?? 0);
      setShowResults(true);
    }
  };



  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);

    setScore(0);
    localStorage.removeItem("quizCurrentQuestion");
    localStorage.removeItem("quizSelectedAnswers");
    localStorage.removeItem("quizShowResults");
    localStorage.removeItem("quizScore");
  };

  useEffect(() => {
    if (isLoaded) {
      window.scrollTo(0, 0);
    }
  }, [isLoaded]);

  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100;
  const passingScore = Math.ceil(sampleQuestions.length * 0.7); // 70% to pass



  if (showResults) {
    const passed = score >= passingScore;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 px-6 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module
          </Button>
          <div className="text-sm text-muted-foreground">
            Quiz Completed
          </div>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            {/* Floating decorative elements */}
            <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-400/20 rounded-full blur-sm"></div>
            <div className="absolute -top-2 -right-6 w-6 h-6 bg-indigo-400/20 rounded-full blur-sm"></div>
            <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-pink-400/20 rounded-full blur-sm"></div>
            
            {/* Main card with unique design */}
            <div className="relative bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-[2rem] overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-[2rem] p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 animate-pulse">
                <div className="h-full w-full bg-white dark:bg-gray-900 rounded-[calc(2rem-2px)]"></div>
              </div>
              
              {/* Glass morphism overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-purple-500/5 to-indigo-500/10 dark:from-gray-800/10 dark:via-purple-400/5 dark:to-indigo-400/10"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center p-8">
              <div className="mb-4">
                {passed ? (
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <Trophy className="h-10 w-10 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 animate-bounce">
                      <Star className="h-6 w-6 text-yellow-400" />
                    </div>
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-3xl">📚</span>
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {passed ? "Congratulations!" : "Keep Learning!"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {passed
                  ? "You've mastered this lesson!"
                  : "Review the concepts and try again."}
              </p>
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 p-4 rounded-xl mb-4">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {score}/{sampleQuestions.length}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  You scored{" "}
                  {Math.round((score / sampleQuestions.length) * 100)}%
                </p>
                <Progress
                  value={(score / sampleQuestions.length) * 100}
                  className="h-2"
                />
              </div>
              {passed && (
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-xl border border-green-200 dark:border-green-800 mb-4">
                  <Gift className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <h3 className="text-lg font-bold text-green-700 dark:text-green-300 mb-2">
                    Unlock Bonus Challenge!
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-3">
                    You've earned a scratch card with a hidden coding challenge!
                  </p>
                  <Link href="/scratch-card">
                    <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-6 py-2">
                      <Sparkles className="h-4 w-4 mr-2" />
                      Reveal Challenge
                    </Button>
                  </Link>
                </div>
              )}
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={handleRestart}
                  variant="outline"
                  className="px-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/20 dark:border-gray-600/20"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Retake Quiz
                </Button>
                <Link href="/quiz/review">
                  <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-6">
                    Review Answers
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showReview) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 px-6 pt-4 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Quiz Review
            </h1>
            <Button onClick={() => setShowReview(false)} variant="outline">
              Back to Results
            </Button>
          </div>
          
          <div className="space-y-6">
            {sampleQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;
              
              return (
                <div key={index} className={`relative p-6 rounded-2xl border-2 shadow-lg ${
                  isCorrect 
                    ? 'border-green-300 bg-gradient-to-r from-green-50 to-emerald-50' 
                    : 'border-red-300 bg-gradient-to-r from-red-50 to-pink-50'
                } hover:shadow-xl transition-all duration-300`}>
                  <div className={`absolute top-0 left-0 w-full h-1 rounded-t-2xl ${
                    isCorrect ? 'bg-gradient-to-r from-green-400 to-emerald-400' : 'bg-gradient-to-r from-red-400 to-pink-400'
                  }`}></div>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-3">{question.question}</h3>
                      
                      <div className="space-y-2 mb-4">
                        {question.options.map((option, optIndex) => {
                          const isUserAnswer = userAnswer === optIndex;
                          const isCorrectAnswer = question.correctAnswer === optIndex;
                          
                          return (
                            <div key={optIndex} className={`p-3 rounded-xl border-2 ${
                              isCorrectAnswer 
                                ? 'border-green-400 bg-green-100 text-green-800'
                                : isUserAnswer 
                                ? 'border-red-400 bg-red-100 text-red-800'
                                : 'border-gray-300 bg-white'
                            }`}>
                              <div className="flex items-center gap-2">
                                {isCorrectAnswer && <CheckCircle className="h-4 w-4 text-green-600" />}
                                {isUserAnswer && !isCorrectAnswer && <XCircle className="h-4 w-4 text-red-600" />}
                                <span>{option}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {!isCorrect && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border-2 border-blue-300">
                          <p className="text-sm text-blue-800">
                            <strong>Explanation:</strong> {question.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (!isHydrated) {
    return (
      <div className="h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 px-6 pt-2 overflow-hidden">
        <div className="max-w-4xl mx-auto h-full overflow-y-auto">
          <div className="mb-6 mt-4">
            <div className="h-16 bg-gradient-to-r from-purple-200 to-indigo-200 dark:from-purple-800 dark:to-indigo-800 rounded-lg animate-pulse mb-4"></div>
            <div className="h-3 bg-purple-100 dark:bg-purple-900 rounded-full animate-pulse"></div>
          </div>
          <div className="h-96 bg-white/50 dark:bg-gray-900/50 rounded-2xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 px-6 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header with Pause Button */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Module
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Pause className="h-4 w-4" />
            Pause Quiz
          </Button>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                Arrays & Strings Quiz
              </h1>
              <p className="text-muted-foreground">
                Test your knowledge to unlock the next challenge
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">
                Question {currentQuestion + 1} of {sampleQuestions.length}
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">
                  Need {passingScore}/{sampleQuestions.length} to pass
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Progress
              value={progress}
              className="h-3 bg-purple-100 dark:bg-purple-900"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl mb-8">
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
            <div className="space-y-3">
              {sampleQuestions[currentQuestion].options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`flex items-center space-x-3 p-4 border-2 rounded-xl transition-all cursor-pointer ${
                    selectedAnswers[currentQuestion] === index
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/50"
                      : "border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/30"
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-purple-500 bg-purple-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                  <span className="flex-1 text-lg">{option}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outline"
                onClick={() =>
                  setCurrentQuestion(Math.max(0, currentQuestion - 1))
                }
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
                {currentQuestion === sampleQuestions.length - 1
                  ? "Finish Quiz"
                  : "Next"}
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
