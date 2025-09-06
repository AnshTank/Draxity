import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, CheckCircle, Target, AlertCircle } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { QuizInterface } from "@/components/quiz/quiz-interface"

// Mock quiz data
const quizData = {
  "dsa-fundamentals": {
    "1": {
      "8": {
        id: 8,
        title: "Arrays & Strings Quiz",
        description: "Test your understanding before moving to practice problems",
        passingScore: 70,
        timeLimit: 20, // minutes
        questions: {
          mcq: [
            {
              id: 1,
              question: "What is the time complexity of accessing an element in an array by index?",
              options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
              correct: 0,
              explanation:
                "Array access by index is constant time O(1) because arrays store elements in contiguous memory locations.",
            },
            {
              id: 2,
              question: "Which of the following is NOT a valid approach for the two-pointer technique?",
              options: [
                "Starting from opposite ends",
                "Starting from the same position",
                "Using three pointers simultaneously",
                "Moving pointers in the same direction",
              ],
              correct: 2,
              explanation:
                "The two-pointer technique specifically uses two pointers, not three. Using three pointers would be a different algorithmic approach.",
            },
            {
              id: 3,
              question:
                "What is the space complexity of the sliding window technique for finding maximum sum subarray?",
              options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
              correct: 0,
              explanation:
                "Sliding window technique uses constant extra space O(1) as it only maintains window boundaries and current sum.",
            },
            {
              id: 4,
              question: "In string pattern matching, what is the main advantage of the KMP algorithm over brute force?",
              options: [
                "Uses less memory",
                "Avoids unnecessary character comparisons",
                "Works only with sorted strings",
                "Requires preprocessing the text",
              ],
              correct: 1,
              explanation:
                "KMP algorithm avoids unnecessary character comparisons by using information from previous matches to skip characters.",
            },
            {
              id: 5,
              question: "When should you prefer the two-pointer technique over nested loops?",
              options: [
                "When working with unsorted arrays",
                "When the array is sorted or you need to find pairs",
                "When you need to modify the array",
                "When working with strings only",
              ],
              correct: 1,
              explanation:
                "Two-pointer technique is most effective with sorted arrays or when finding pairs/subarrays that meet certain criteria.",
            },
          ],
          coding: {
            id: 1,
            title: "Remove Duplicates from Sorted Array",
            description:
              "Given a sorted array nums, remove the duplicates in-place such that each element appears only once and returns the new length.",
            difficulty: "Easy",
            examples: [
              {
                input: "nums = [1,1,2]",
                output: "2, nums = [1,2,_]",
                explanation:
                  "Your function should return k = 2, with the first two elements of nums being 1 and 2 respectively.",
              },
              {
                input: "nums = [0,0,1,1,1,2,2,3,3,4]",
                output: "5, nums = [0,1,2,3,4,_,_,_,_,_]",
                explanation: "Your function should return k = 5, with the first five elements being 0, 1, 2, 3, and 4.",
              },
            ],
            constraints: [
              "1 <= nums.length <= 3 * 10^4",
              "-100 <= nums[i] <= 100",
              "nums is sorted in non-decreasing order",
            ],
            starterCode: `def removeDuplicates(nums):
    """
    :type nums: List[int]
    :rtype: int
    """
    # Write your solution here
    pass`,
            solution: `def removeDuplicates(nums):
    if not nums:
        return 0
    
    # Two pointer approach
    slow = 0
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1`,
            testCases: [
              {
                input: "[1,1,2]",
                expected: "2",
              },
              {
                input: "[0,0,1,1,1,2,2,3,3,4]",
                expected: "5",
              },
            ],
          },
        },
      },
    },
  },
}

export default function QuizPage({
  params,
}: {
  params: { courseId: string; moduleId: string; lessonId: string }
}) {
  const quiz =
    quizData[params.courseId as keyof typeof quizData]?.[
      params.moduleId as keyof (typeof quizData)[keyof typeof quizData]
    ]?.[
      params.lessonId as keyof (typeof quizData)[keyof typeof quizData][keyof (typeof quizData)[keyof typeof quizData]]
    ]

  if (!quiz) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Link href="/courses" className="hover:text-foreground">
              Courses
            </Link>
            <span>/</span>
            <Link href={`/courses/${params.courseId}`} className="hover:text-foreground">
              DSA Fundamentals
            </Link>
            <span>/</span>
            <Link href={`/courses/${params.courseId}/modules/${params.moduleId}`} className="hover:text-foreground">
              Arrays & Strings
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{quiz.title}</span>
          </div>
        </div>
      </div>

      {/* Quiz Header */}
      <section className="py-6 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{quiz.title}</h1>
              <p className="text-muted-foreground">{quiz.description}</p>
            </div>
            <Badge variant="outline" className="text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {quiz.timeLimit} min
            </Badge>
          </div>

          {/* Quiz Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{quiz.questions.mcq.length}</div>
                <div className="text-sm text-muted-foreground">Multiple Choice</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-accent">1</div>
                <div className="text-sm text-muted-foreground">Coding Problem</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{quiz.passingScore}%</div>
                <div className="text-sm text-muted-foreground">Passing Score</div>
              </CardContent>
            </Card>
          </div>

          {/* Requirements */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <Target className="w-5 h-5 mr-2" />
                Requirements to Pass
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm">Score at least {quiz.passingScore}% on multiple choice questions</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-accent" />
                <span className="text-sm">Successfully solve the coding problem</span>
              </div>
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm">Complete within {quiz.timeLimit} minutes</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quiz Interface */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <QuizInterface quiz={quiz} courseId={params.courseId} moduleId={params.moduleId} lessonId={params.lessonId} />
        </div>
      </section>
    </div>
  )
}
