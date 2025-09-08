import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Clock, CheckCircle, Lock, Play } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function ArraysStringsModule() {
  const lessons = [
    {
      id: "1",
      title: "Introduction to Arrays",
      description: "Learn the basics of arrays and how they work in memory",
      duration: "15 min",
      status: "available",
      completed: false
    },
    {
      id: "2", 
      title: "Array Operations",
      description: "Master insertion, deletion, and searching in arrays",
      duration: "20 min",
      status: "locked",
      completed: false
    },
    {
      id: "3",
      title: "Introduction to Strings", 
      description: "Understanding strings as character arrays",
      duration: "18 min",
      status: "locked",
      completed: false
    },
    {
      id: "4",
      title: "String Operations",
      description: "Common string manipulation techniques",
      duration: "25 min", 
      status: "locked",
      completed: false
    }
  ]

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
        <div className="container mx-auto px-6 py-8 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <Link href="/courses">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Courses
              </Button>
            </Link>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">Arrays & Strings</h1>
                <p className="text-xl text-muted-foreground mb-4">Master the fundamentals of arrays and string manipulation</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    2-3 hours
                  </Badge>
                  <Badge variant="outline">Beginner</Badge>
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Module Progress</span>
                <span className="font-medium">0% Complete</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>

          {/* Lessons */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Lessons</h2>
            {lessons.map((lesson, index) => (
              <Card key={lesson.id} className={`transition-all hover:shadow-md ${
                lesson.status === 'locked' ? 'opacity-60' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        lesson.completed 
                          ? 'bg-green-100 text-green-600' 
                          : lesson.status === 'available'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {lesson.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : lesson.status === 'available' ? (
                          <BookOpen className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Lesson {lesson.id}: {lesson.title}</h3>
                        <p className="text-muted-foreground text-sm">{lesson.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {lesson.status === 'available' ? (
                        <Link href={`/courses/dsa-fundamentals/arrays-strings/lesson/${lesson.id}`}>
                          <Button>
                            <Play className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled>
                          <Lock className="h-4 w-4 mr-2" />
                          Locked
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Module Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Understand array data structure and memory layout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Master array operations and algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Learn string manipulation techniques</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Analyze time and space complexity</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Module Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Lessons</span>
                    <span className="font-medium">4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span className="font-medium">2-3 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Practice Problems</span>
                    <span className="font-medium">10+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Difficulty</span>
                    <span className="font-medium">Beginner</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}