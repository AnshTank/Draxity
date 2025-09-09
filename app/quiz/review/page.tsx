"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/navigation";
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

export default function QuizReviewPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<
    (number | undefined)[]
  >([]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("quizSelectedAnswers");
    const savedScore = localStorage.getItem("quizScore");

    if (savedAnswers) {
      setSelectedAnswers(JSON.parse(savedAnswers));
    }
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  }, []);

  return (
    <>
      {/* <Navigation /> */}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 p-8 pt-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Quiz Review
              </h1>
              <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
                Analyze your performance and learn from detailed explanations
              </p>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Correct Answer</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Your Wrong Answer</span>
                </div>
              </div>
            </div>
            <Link href="/quiz">
              <Button
                variant="outline"
                size="lg"
                className="px-8 py-3 text-base"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Quiz
              </Button>
            </Link>
          </div>

          <div className="mb-10 p-8 bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Your Score: {score}/{sampleQuestions.length}
              </div>
              <div className="text-lg text-muted-foreground">
                {Math.round((score / sampleQuestions.length) * 100)}% Correct
              </div>
            </div>
          </div>

          <div className="space-y-10">
            {sampleQuestions.map((question, index) => {
              const userAnswer = selectedAnswers[index];
              const isCorrect = userAnswer === question.correctAnswer;

              return (
                <div
                  key={index}
                  className="relative bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div
                    className={`h-1 w-full ${
                      isCorrect
                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                        : "bg-gradient-to-r from-red-400 to-pink-500"
                    }`}
                  ></div>

                  <div className="p-8">
                    <div className="flex items-start gap-6">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                          isCorrect
                            ? "bg-gradient-to-br from-green-500 to-emerald-600"
                            : "bg-gradient-to-br from-red-500 to-pink-600"
                        }`}
                      >
                        {index + 1}
                      </div>

                      <div className="flex-1 space-y-6">
                        <h3 className="text-xl font-semibold text-foreground leading-relaxed">
                          {question.question}
                        </h3>

                        <div className="space-y-4">
                          {question.options.map((option, optIndex) => {
                            const isUserAnswer = userAnswer === optIndex;
                            const isCorrectAnswer =
                              question.correctAnswer === optIndex;

                            return (
                              <div
                                key={optIndex}
                                className={`p-4 rounded-2xl border-2 transition-all ${
                                  isCorrectAnswer
                                    ? "border-green-300 bg-green-50 dark:bg-green-950/30"
                                    : isUserAnswer
                                    ? "border-red-300 bg-red-50 dark:bg-red-950/30"
                                    : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                                }`}
                              >
                                <div className="flex items-center gap-3">
                                  {isCorrectAnswer && (
                                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <XCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                                  )}
                                  <span
                                    className={`text-base flex-1 ${
                                      isCorrectAnswer
                                        ? "text-green-800 dark:text-green-200 font-medium"
                                        : isUserAnswer
                                        ? "text-red-800 dark:text-red-200 font-medium"
                                        : "text-foreground"
                                    }`}
                                  >
                                    {option}
                                  </span>
                                  {isCorrectAnswer && (
                                    <span className="text-sm font-semibold text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/50 px-3 py-1 rounded-full">
                                      Correct
                                    </span>
                                  )}
                                  {isUserAnswer && !isCorrectAnswer && (
                                    <span className="text-sm font-semibold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-900/50 px-3 py-1 rounded-full">
                                      Your Choice
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {!isCorrect && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                            <div className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-white text-sm font-bold">
                                  !
                                </span>
                              </div>
                              <div>
                                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                  Explanation
                                </h4>
                                <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                                  {question.explanation}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <Link href="/quiz">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-3 text-base"
              >
                Take Quiz Again
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
