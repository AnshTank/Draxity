import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Code, Clock, CheckCircle, ArrowRight, ArrowLeft, Target, Lightbulb, Brain } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { TwoPointerDemo } from "@/components/lessons/two-pointer-demo"
import { CodeExample } from "@/components/lessons/code-example"

// Mock lesson data
const lessonData = {
  "dsa-fundamentals": {
    "1": {
      "3": {
        id: 3,
        title: "Two Pointer Technique",
        description: "Master the two-pointer approach for array problems",
        type: "visualization",
        duration: "25 min",
        progress: 0,
        sections: [
          {
            id: 1,
            title: "What is Two Pointer Technique?",
            type: "concept",
            content: {
              text: "The two-pointer technique is a powerful algorithmic approach used to solve array and string problems efficiently. Instead of using nested loops, we use two pointers that move through the data structure in a coordinated manner.",
              keyPoints: [
                "Reduces time complexity from O(n²) to O(n) in many cases",
                "Commonly used for sorted arrays and strings",
                "Two main patterns: opposite ends and same direction",
              ],
            },
          },
          {
            id: 2,
            title: "Visual Demonstration",
            type: "visualization",
            content: {
              component: "TwoPointerDemo",
            },
          },
          {
            id: 3,
            title: "Implementation Example",
            type: "code",
            content: {
              component: "CodeExample",
              problem: "Two Sum in Sorted Array",
              code: `def two_sum_sorted(nums, target):
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return []  # No solution found`,
              explanation:
                "This implementation uses two pointers starting from opposite ends of a sorted array. We move the pointers based on whether we need a larger or smaller sum.",
            },
          },
          {
            id: 4,
            title: "Practice Problems",
            type: "practice",
            content: {
              problems: ["Container With Most Water", "Valid Palindrome", "Remove Duplicates from Sorted Array"],
            },
          },
        ],
      },
    },
  },
}

export default function LessonPage({
  params,
}: {
  params: { courseId: string; moduleId: string; lessonId: string }
}) {
  const lesson =
    lessonData[params.courseId as keyof typeof lessonData]?.[
      params.moduleId as keyof (typeof lessonData)[keyof typeof lessonData]
    ]?.[
      params.lessonId as keyof (typeof lessonData)[keyof typeof lessonData][keyof (typeof lessonData)[keyof typeof lessonData]]
    ]

  if (!lesson) {
    notFound()
  }

  const renderSection = (section: any) => {
    switch (section.type) {
      case "concept":
        return (
          <Card key={section.id} className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Lightbulb className="w-4 h-4 text-primary" />
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">{section.content.text}</p>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Key Points:</h4>
                <ul className="space-y-2">
                  {section.content.keyPoints.map((point: string, index: number) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        )

      case "visualization":
        return (
          <Card key={section.id} className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-accent" />
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <TwoPointerDemo />
            </CardContent>
          </Card>
        )

      case "code":
        return (
          <Card key={section.id} className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-primary" />
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CodeExample
                problem={section.content.problem}
                code={section.content.code}
                explanation={section.content.explanation}
              />
            </CardContent>
          </Card>
        )

      case "practice":
        return (
          <Card key={section.id} className="mb-8">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Brain className="w-4 h-4 text-accent" />
                </div>
                <CardTitle className="text-xl">{section.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Try these problems to practice the two-pointer technique:</p>
              <div className="space-y-3">
                {section.content.problems.map((problem: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <span className="font-medium text-foreground">{problem}</span>
                    <Button size="sm" variant="outline">
                      Solve <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )

      default:
        return null
    }
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
            <span className="text-foreground font-medium">{lesson.title}</span>
          </div>
        </div>
      </div>

      {/* Lesson Header */}
      <section className="py-6 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Lesson {lesson.id}: {lesson.title}
              </h1>
              <p className="text-muted-foreground">{lesson.description}</p>
            </div>
            <Badge variant="outline" className="text-sm">
              <Clock className="w-4 h-4 mr-1" />
              {lesson.duration}
            </Badge>
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Lesson Progress</span>
              <span className="font-medium">{lesson.progress}%</span>
            </div>
            <Progress value={lesson.progress} className="h-2" />
          </div>
        </div>
      </section>

      {/* Lesson Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">{lesson.sections.map(renderSection)}</div>
      </section>

      {/* Navigation */}
      <section className="py-6 px-4 border-t border-border bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <Link href={`/courses/${params.courseId}/modules/${params.moduleId}`}>
              <Button variant="outline">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Module
              </Button>
            </Link>

            <div className="flex space-x-3">
              <Button variant="outline">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Previous Lesson
              </Button>
              <Button>
                Next Lesson
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
