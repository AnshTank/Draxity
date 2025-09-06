import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle, ArrowRight, Play, Lock, Star, Target } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

// Mock data - would come from database/API
const moduleData = {
  "dsa-fundamentals": {
    "1": {
      id: 1,
      title: "Arrays & Strings",
      description: "Learn fundamental array operations and string manipulation techniques",
      progress: 75,
      totalLessons: 8,
      completedLessons: 6,
      estimatedTime: "1-2 weeks",
      lessons: [
        {
          id: 1,
          title: "Introduction to Arrays",
          description: "Understanding array data structure and basic operations",
          type: "concept",
          duration: "15 min",
          status: "completed",
          topics: ["Array Basics", "Memory Layout", "Time Complexity"],
        },
        {
          id: 2,
          title: "Array Traversal Techniques",
          description: "Different ways to iterate through arrays efficiently",
          type: "interactive",
          duration: "20 min",
          status: "completed",
          topics: ["For Loops", "While Loops", "Enhanced For Loop"],
        },
        {
          id: 3,
          title: "Two Pointer Technique",
          description: "Master the two-pointer approach for array problems",
          type: "visualization",
          duration: "25 min",
          status: "completed",
          topics: ["Two Pointers", "Left-Right Approach", "Fast-Slow Pointers"],
        },
        {
          id: 4,
          title: "Sliding Window Pattern",
          description: "Learn the sliding window technique for subarray problems",
          type: "interactive",
          duration: "30 min",
          status: "completed",
          topics: ["Fixed Window", "Variable Window", "Window Optimization"],
        },
        {
          id: 5,
          title: "String Fundamentals",
          description: "Understanding strings and character manipulation",
          type: "concept",
          duration: "18 min",
          status: "completed",
          topics: ["String Basics", "Character Arrays", "String Methods"],
        },
        {
          id: 6,
          title: "String Pattern Matching",
          description: "Algorithms for finding patterns in strings",
          type: "visualization",
          duration: "35 min",
          status: "completed",
          topics: ["Brute Force", "KMP Algorithm", "Pattern Recognition"],
        },
        {
          id: 7,
          title: "Advanced Array Operations",
          description: "Complex array manipulations and optimizations",
          type: "interactive",
          duration: "28 min",
          status: "current",
          topics: ["In-place Operations", "Array Rotation", "Merge Operations"],
        },
        {
          id: 8,
          title: "Arrays & Strings Quiz",
          description: "Test your understanding before moving to practice problems",
          type: "quiz",
          duration: "20 min",
          status: "locked",
          topics: ["Comprehensive Review", "Problem Solving", "Concept Application"],
        },
      ],
    },
  },
}

export default function ModulePage({
  params,
}: {
  params: { courseId: string; moduleId: string }
}) {
  const module =
    moduleData[params.courseId as keyof typeof moduleData]?.[
      params.moduleId as keyof (typeof moduleData)[keyof typeof moduleData]
    ]

  if (!module) {
    notFound()
  }

  const getStatusIcon = (status: string, type: string) => {
    if (status === "completed") return <CheckCircle className="w-5 h-5 text-accent" />
    if (status === "current") return <Play className="w-5 h-5 text-primary" />
    if (status === "locked") return <Lock className="w-5 h-5 text-muted-foreground" />
    return <BookOpen className="w-5 h-5 text-muted-foreground" />
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "concept":
        return <BookOpen className="w-4 h-4" />
      case "interactive":
        return <Play className="w-4 h-4" />
      case "visualization":
        return <Target className="w-4 h-4" />
      case "quiz":
        return <Star className="w-4 h-4" />
      default:
        return <BookOpen className="w-4 h-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const variants = {
      concept: "default",
      interactive: "secondary",
      visualization: "outline",
      quiz: "destructive",
    } as const

    return variants[type as keyof typeof variants] || "default"
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
            <span className="text-foreground font-medium">{module.title}</span>
          </div>
        </div>
      </div>

      {/* Module Header */}
      <section className="py-8 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Module {module.id}: {module.title}
              </h1>
              <p className="text-muted-foreground mb-4">{module.description}</p>

              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {module.estimatedTime}
                </div>
                <div className="flex items-center">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {module.totalLessons} lessons
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {module.completedLessons}/{module.totalLessons} completed
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="text-2xl font-bold text-primary mb-1">{module.progress}%</div>
              <div className="text-sm text-muted-foreground">Complete</div>
            </div>
          </div>

          <div className="mb-6">
            <Progress value={module.progress} className="h-3" />
          </div>
        </div>
      </section>

      {/* Lessons List */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-foreground mb-6">Lessons</h2>

          <div className="space-y-4">
            {module.lessons.map((lesson, index) => (
              <Card
                key={lesson.id}
                className={`${
                  lesson.status === "current"
                    ? "border-primary/40 bg-primary/5"
                    : lesson.status === "completed"
                      ? "border-accent/40 bg-accent/5"
                      : "border-border"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          lesson.status === "completed"
                            ? "bg-accent text-accent-foreground"
                            : lesson.status === "current"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {getStatusIcon(lesson.status, lesson.type)}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-foreground">
                            Lesson {lesson.id}: {lesson.title}
                          </h3>
                          <Badge variant={getTypeBadge(lesson.type)} className="text-xs">
                            <span className="mr-1">{getTypeIcon(lesson.type)}</span>
                            {lesson.type}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground text-sm mb-3">{lesson.description}</p>

                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {lesson.duration}
                          </div>
                          <div>{lesson.topics.length} topics</div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {lesson.topics.map((topic, topicIndex) => (
                            <Badge key={topicIndex} variant="outline" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="ml-4">
                      {lesson.status === "locked" ? (
                        <Button disabled size="sm">
                          <Lock className="mr-2 w-4 h-4" />
                          Locked
                        </Button>
                      ) : (
                        <Link href={`/courses/${params.courseId}/modules/${params.moduleId}/lessons/${lesson.id}`}>
                          <Button size="sm" variant={lesson.status === "completed" ? "outline" : "default"}>
                            {lesson.status === "completed"
                              ? "Review"
                              : lesson.status === "current"
                                ? "Continue"
                                : "Start"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
