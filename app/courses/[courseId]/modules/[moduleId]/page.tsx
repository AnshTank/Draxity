"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, CheckCircle, ArrowRight, Play, Lock, Star, Target, ArrowLeft, Sun, Moon, RotateCcw } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { useTheme } from "next-themes"

// Mock data - would come from database/API
const initialModuleData = {
  "dsa-fundamentals": {
    "1": {
      id: 1,
      title: "Arrays & Strings",
      description: "Learn fundamental array operations and string manipulation techniques",
      progress: 0,
      totalLessons: 9,
      completedLessons: 0,
      estimatedTime: "1-2 weeks",
      lessons: [
        {
          id: 1,
          title: "Introduction to Arrays",
          description: "Understanding array data structure and basic operations",
          type: "concept",
          duration: "15 min",
          status: "available",
          topics: ["Array Basics", "Memory Layout", "Time Complexity"],
        },
        {
          id: 2,
          title: "Array Traversal Techniques",
          description: "Different ways to iterate through arrays efficiently",
          type: "interactive",
          duration: "20 min",
          status: "locked",
          topics: ["For Loops", "While Loops", "Enhanced For Loop"],
        },
        {
          id: 3,
          title: "Two Pointer Technique",
          description: "Master the two-pointer approach for array problems",
          type: "visualization",
          duration: "25 min",
          status: "locked",
          topics: ["Two Pointers", "Left-Right Approach", "Fast-Slow Pointers"],
        },
        {
          id: 4,
          title: "Sliding Window Pattern",
          description: "Learn the sliding window technique for subarray problems",
          type: "interactive",
          duration: "30 min",
          status: "locked",
          topics: ["Fixed Window", "Variable Window", "Window Optimization"],
        },
        {
          id: 5,
          title: "String Fundamentals",
          description: "Understanding strings and character manipulation",
          type: "concept",
          duration: "18 min",
          status: "locked",
          topics: ["String Basics", "Character Arrays", "String Methods"],
        },
        {
          id: 6,
          title: "String Pattern Matching",
          description: "Algorithms for finding patterns in strings",
          type: "visualization",
          duration: "35 min",
          status: "locked",
          topics: ["Brute Force", "KMP Algorithm", "Pattern Recognition"],
        },
        {
          id: 7,
          title: "Advanced Array Operations",
          description: "Complex array manipulations and optimizations",
          type: "interactive",
          duration: "28 min",
          status: "locked",
          topics: ["In-place Operations", "Array Rotation", "Merge Operations"],
        },
        {
          id: 8,
          title: "Module Review & Preparation",
          description: "Comprehensive review of all array and string concepts before taking the final quiz",
          type: "concept",
          duration: "20 min",
          status: "locked",
          topics: ["Key Concepts Review", "Problem-Solving Strategies", "Common Pitfalls"],
        },
        {
          id: 9,
          title: "Arrays & Strings Quiz",
          description: "Test your understanding before moving to practice problems",
          type: "quiz",
          duration: "30 min",
          status: "locked",
          topics: ["10 MCQs", "1 Coding Problem", "70% Pass Required"],
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
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [completedLessons, setCompletedLessons] = useState<string[]>([])
  const [moduleData, setModuleData] = useState(initialModuleData)

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress for this module? This action cannot be undone.')) {
      // Clear localStorage for this module
      const moduleProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}')
      const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '{}')
      
      // Remove module progress
      if (moduleProgress[params.courseId]?.[params.moduleId]) {
        delete moduleProgress[params.courseId][params.moduleId]
        localStorage.setItem('moduleProgress', JSON.stringify(moduleProgress))
      }
      
      // Remove completed lessons for this module
      Object.keys(completedLessons).forEach(key => {
        if (key.includes(`/courses/${params.courseId}/modules/${params.moduleId}/lessons/`)) {
          delete completedLessons[key]
        }
      })
      localStorage.setItem('completedLessons', JSON.stringify(completedLessons))
      
      // Refresh the page to show reset state
      window.location.reload()
    }
  }

  useEffect(() => {
    setMounted(true)
    
    // Load progress from localStorage
    const progress = JSON.parse(localStorage.getItem('moduleProgress') || '{}')
    const completed = progress[params.courseId]?.[params.moduleId]?.completedLessons || []
    setCompletedLessons(completed)
    
    // Update module data with progress
    const updatedModule = { ...initialModuleData[params.courseId as keyof typeof initialModuleData]?.[params.moduleId] }
    if (updatedModule) {
      updatedModule.completedLessons = completed.length
      updatedModule.progress = Math.round((completed.length / 9) * 100)
      
      // Update lesson statuses
      updatedModule.lessons = updatedModule.lessons.map((lesson, index) => {
        if (completed.includes(lesson.id.toString())) {
          return { ...lesson, status: 'completed' }
        } else if (index === 0 || completed.includes((lesson.id - 1).toString())) {
          return { ...lesson, status: 'available' }
        } else {
          return { ...lesson, status: 'locked' }
        }
      })
      
      // Special handling for quiz (lesson 9) - unlock when lesson 8 is completed
      if (completed.includes('8')) {
        updatedModule.lessons[8].status = 'available'
      }
    }
    
    setModuleData({
      ...initialModuleData,
      [params.courseId]: {
        ...initialModuleData[params.courseId as keyof typeof initialModuleData],
        [params.moduleId]: updatedModule
      }
    })
  }, [params.courseId, params.moduleId])

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
      {/* Header with Back Button and Theme Toggle */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href={`/courses/${params.courseId}`}>
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Course
                </Button>
              </Link>
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
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleResetProgress}
                className="text-destructive hover:text-destructive"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Progress
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {mounted && (theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
              </Button>
            </div>
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
                        <Link href={lesson.type === "quiz" ? `/courses/${params.courseId}/modules/${params.moduleId}/quiz` : `/courses/${params.courseId}/modules/${params.moduleId}/lessons/${lesson.id}`}>
                          <Button size="sm" variant={lesson.status === "completed" ? "outline" : "default"}>
                            {lesson.status === "completed"
                              ? "Review"
                              : lesson.status === "current"
                                ? "Continue"
                                : lesson.type === "quiz" && lesson.status === "available"
                                  ? "Take Quiz"
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
