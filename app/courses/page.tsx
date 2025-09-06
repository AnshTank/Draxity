import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Code, Clock, Users, Star, Lock, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CoursesPage() {
  const courses = [
    {
      id: "dsa-fundamentals",
      title: "Data Structures & Algorithms",
      description: "Master the fundamentals of DSA through structured learning and practice",
      level: "Beginner to Advanced",
      duration: "8-12 weeks",
      students: "2,847",
      rating: 4.9,
      progress: 0,
      modules: 8,
      problems: 300,
      status: "available",
      image: "/data-structures-algorithms-visualization.png",
    },
    {
      id: "oop-concepts",
      title: "Object-Oriented Programming",
      description: "Learn OOP principles and design patterns with hands-on practice",
      level: "Intermediate",
      duration: "6-8 weeks",
      students: "1,523",
      rating: 4.8,
      progress: 0,
      modules: 6,
      problems: 150,
      status: "coming-soon",
      image: "/object-oriented-programming-concepts.jpg",
    },
    {
      id: "database-systems",
      title: "Database Management Systems",
      description: "Understand database design, SQL, and database optimization",
      level: "Intermediate",
      duration: "5-7 weeks",
      students: "892",
      rating: 4.7,
      progress: 0,
      modules: 5,
      problems: 120,
      status: "coming-soon",
      image: "/database-management-systems.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Choose Your Learning Path</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start with our flagship DSA course or explore other computer science fundamentals. Each course follows our
            proven structured learning methodology.
          </p>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  <img
                    src={course.image || "/placeholder.svg"}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.status === "coming-soon" && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Badge variant="secondary" className="text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        Coming Soon
                      </Badge>
                    </div>
                  )}
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-2">{course.title}</CardTitle>
                      <CardDescription className="text-sm">{course.description}</CardDescription>
                    </div>
                    <Badge variant={course.status === "available" ? "default" : "secondary"}>{course.level}</Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {course.students} students
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-medium">{course.rating}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {course.modules} modules • {course.problems} problems
                    </div>
                  </div>

                  {course.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-2" />
                    </div>
                  )}

                  <div className="pt-2">
                    {course.status === "available" ? (
                      <div className="space-y-2">
                        <Link href={`/courses/${course.id}`}>
                          <Button className="w-full">
                            {course.progress > 0 ? "Continue Learning" : "Start Course"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                        <div className="flex gap-2">
                          <Link href="/practice" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Practice Editor
                            </Button>
                          </Link>
                          <Link href="/quiz" className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              Quiz Demo
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <Button disabled className="w-full">
                        <Lock className="mr-2 w-4 h-4" />
                        Coming Soon
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6 text-foreground">Why Choose Heurix Courses?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Structured Learning</h3>
              <p className="text-muted-foreground text-sm">
                Follow a carefully designed curriculum that builds knowledge progressively
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold text-foreground">Unlock System</h3>
              <p className="text-muted-foreground text-sm">
                Master each concept before moving forward with our quiz-based progression
              </p>
            </div>
            <div className="space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                <Code className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Hands-on Practice</h3>
              <p className="text-muted-foreground text-sm">
                Apply what you learn with integrated coding challenges and projects
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
