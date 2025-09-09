import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, BookOpen, Clock, CheckCircle, Lock, Play } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function DSAFundamentalsPage() {
  const modules = [
    {
      id: "arrays-strings",
      title: "Arrays & Strings",
      description: "Master the fundamentals of arrays and string manipulation",
      duration: "2-3 hours",
      lessons: 4,
      status: "available",
      completed: false
    },
    {
      id: "linked-lists",
      title: "Linked Lists",
      description: "Learn about dynamic data structures and pointer manipulation",
      duration: "3-4 hours", 
      lessons: 5,
      status: "locked",
      completed: false
    },
    {
      id: "stacks-queues",
      title: "Stacks & Queues",
      description: "Understand LIFO and FIFO data structures",
      duration: "2-3 hours",
      lessons: 4,
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
                <h1 className="text-4xl font-bold text-foreground mb-2">Data Structures & Algorithms</h1>
                <p className="text-xl text-muted-foreground mb-4">Master the fundamentals through structured learning</p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    8-12 weeks
                  </Badge>
                  <Badge variant="outline">Beginner to Advanced</Badge>
                </div>
              </div>
            </div>
            
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Course Progress</span>
                <span className="font-medium">0% Complete</span>
              </div>
              <Progress value={0} className="h-2" />
            </div>
          </div>

          {/* Modules */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-4">Course Modules</h2>
            {modules.map((module, index) => (
              <Card key={module.id} className={`transition-all hover:shadow-md ${
                module.status === 'locked' ? 'opacity-60' : ''
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        module.completed 
                          ? 'bg-green-100 text-green-600' 
                          : module.status === 'available'
                          ? 'bg-blue-100 text-blue-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}>
                        {module.completed ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : module.status === 'available' ? (
                          <BookOpen className="h-5 w-5" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
                        <p className="text-muted-foreground text-sm">{module.description}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{module.duration}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{module.lessons} lessons</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {module.status === 'available' ? (
                        <Link href={`/courses/dsa-fundamentals/${module.id}`}>
                          <Button>
                            <Play className="h-4 w-4 mr-2" />
                            Start Module
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

          {/* Course Info */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Master fundamental data structures</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Learn essential algorithms and their complexities</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Solve real-world programming problems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span>Prepare for technical interviews</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Course Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Modules</span>
                    <span className="font-medium">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Lessons</span>
                    <span className="font-medium">30+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Practice Problems</span>
                    <span className="font-medium">300+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Estimated Time</span>
                    <span className="font-medium">8-12 weeks</span>
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