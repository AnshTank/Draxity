import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Code,
  Trophy,
  Zap,
  Users,
  Target,
  ArrowRight,
  Play,
  GraduationCap,
  Brain,
  Rocket,
} from "lucide-react"
import Link from "next/link"
import { FloatingElements } from "@/components/floating-elements"
import { InteractiveArrows } from "@/components/interactive-arrows"
import { Navigation } from "@/components/navigation"

export default function HomePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 relative overflow-hidden">
      <FloatingElements />
      <InteractiveArrows />

      {/* Hero Section */}
      <section className="py-32 px-4 relative z-10">
        <div className="container mx-auto text-center max-w-5xl">
          <Badge className="mb-8 bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800 hover:from-blue-200 hover:to-indigo-200 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all text-base px-6 py-2">
            Next-Generation Learning Platform
          </Badge>
          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-8 text-balance leading-tight">
            Master Programming with <span className="text-blue-600 dark:text-blue-400 font-bold">Draxity</span>
          </h1>
          <p className="text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto leading-relaxed">
            The intelligent learning platform that guides you through structured pathways in Data Structures,
            Algorithms, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/courses">
              <Button
                size="lg"
                className="text-xl px-10 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-xl hover:shadow-2xl transition-all relative z-20"
              >
                Start Learning <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="text-xl px-10 py-6 border-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950 hover:border-blue-300 dark:hover:border-blue-700 transition-all bg-transparent"
            >
              <Play className="mr-3 w-6 h-6" />
              Try Demo Problem
            </Button>
          </div>
        </div>
      </section>

      {/* Algorithm Image Section */}
      <section className="py-20 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-white dark:bg-gray-900 p-8">
            <img
              src="/algorithm-hero.png"
              alt="Algorithm: A word used by programmers when they don't want to explain what they did"
              className="w-full h-auto object-contain"
            />
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-5xl font-bold text-center mb-6 text-foreground">
            Why Students Struggle with Programming
          </h2>
          <p className="text-xl text-muted-foreground text-center mb-20 max-w-3xl mx-auto leading-relaxed">
            Traditional learning approaches create confusion and frustration across all programming domains
          </p>
          <div className="grid md:grid-cols-3 gap-10">
            <Card className="bg-card shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Target className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground text-xl font-semibold mb-3">Random Learning</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Jump between random platforms without structure or clear progression
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <BookOpen className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground text-xl font-semibold mb-3">Missing Foundation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Solve problems without mastering underlying concepts first
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card shadow-xl hover:shadow-2xl transition-all">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Zap className="w-6 h-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground text-xl font-semibold mb-3">Lost Motivation</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Boring lessons and unstructured progress kill learning momentum
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-4 bg-background relative z-10">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-6xl font-bold text-center mb-8 text-foreground">Why Draxity is Unique</h2>
          <p className="text-2xl text-muted-foreground text-center mb-24 max-w-3xl mx-auto leading-relaxed">
            Not just a problem bank - it's a guided pathway with gamified learning that makes programming mastery
            inevitable.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Card className="border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700 transition-all bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 shadow-xl hover:shadow-2xl p-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-3">Interactive Lessons</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                  Graphical, animated lessons with visualizations - no boring text dumps
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700 transition-all bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 shadow-xl hover:shadow-2xl p-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-3">Scratch-Card Challenges</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                  Gamified coding challenges that prevent selective skipping and encourage structured practice
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700 transition-all bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 shadow-xl hover:shadow-2xl p-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-3">Unlock System</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                  Pass quizzes to unlock next topics - ensures discipline and concept mastery
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-orange-200 dark:border-orange-800 hover:border-orange-300 dark:hover:border-orange-700 transition-all bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950 dark:to-amber-950 shadow-xl hover:shadow-2xl p-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-3">Integrated Compiler</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                  Built-in coding environment with multiple languages and real-time feedback
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-cyan-200 dark:border-cyan-800 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-950 dark:to-teal-950 shadow-xl hover:shadow-2xl p-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-3">Progress Tracking</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                  Badges, leaderboards, and visual progress indicators keep you motivated
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 transition-all bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 shadow-xl hover:shadow-2xl p-2">
              <CardHeader className="pb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl text-foreground mb-3">One-Stop Solution</CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed text-lg">
                  No more switching between multiple platforms - everything you need in one place
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Preview */}
      <section
        id="courses"
        className="py-32 px-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950 relative z-10"
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-6xl font-bold text-center mb-8 text-foreground">Learning Pathways</h2>
          <p className="text-2xl text-muted-foreground text-center mb-24 leading-relaxed">
            Choose your journey and master programming through our carefully crafted learning paths
          </p>

          <div className="space-y-8">
            {[
              {
                pathway: "Pathway 1",
                title: "Data Structures & Algorithms",
                description: "Master the fundamentals of computer science",
                status: "available",
                icon: <Brain className="w-8 h-8" />,
              },
              {
                pathway: "Pathway 2",
                title: "Web Development Mastery",
                description: "Full-stack development from basics to advanced",
                status: "locked",
                icon: <Code className="w-8 h-8" />,
              },
              {
                pathway: "Pathway 3",
                title: "System Design & Architecture",
                description: "Learn to build scalable systems",
                status: "locked",
                icon: <Rocket className="w-8 h-8" />,
              },
              {
                pathway: "Pathway 4",
                title: "Machine Learning Fundamentals",
                description: "Dive into AI and machine learning",
                status: "locked",
                icon: <GraduationCap className="w-8 h-8" />,
              },
              {
                pathway: "Pathway 5",
                title: "Competitive Programming",
                description: "Excel in coding competitions and interviews",
                status: "locked",
                icon: <Trophy className="w-8 h-8" />,
              },
            ].map((course, index) => (
              <Card
                key={index}
                className={`${
                  course.status === "available"
                    ? "border-blue-300 dark:border-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 shadow-xl"
                    : "border-border bg-card shadow-lg"
                } hover:shadow-2xl transition-all p-2`}
              >
                <CardContent className="flex items-center justify-between p-10">
                  <div className="flex items-center space-x-8">
                    <div
                      className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-xl ${
                        course.status === "available"
                          ? "bg-gradient-to-br from-blue-500 to-indigo-500 text-white"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {course.status === "available" ? course.icon : <BookOpen className="w-8 h-8" />}
                    </div>
                    <div>
                      <h3 className="font-bold text-2xl text-foreground mb-2">
                        {course.pathway}: {course.title}
                      </h3>
                      <p className="text-muted-foreground text-lg leading-relaxed">{course.description}</p>
                    </div>
                  </div>
                  {course.status === "available" ? (
                    <div className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 text-lg font-semibold rounded-xl transition-all cursor-pointer shadow-lg">
                      Start Learning
                    </div>
                  ) : (
                    <Badge
                      variant="secondary"
                      className="bg-muted hover:bg-muted/80 text-muted-foreground px-8 py-3 text-lg font-semibold border-0 rounded-xl"
                    >
                      Coming Soon
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 relative z-10">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-2xl p-12 shadow-lg relative overflow-hidden border border-blue-200 dark:border-blue-800">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-15">
              <div className="absolute top-8 left-8 w-20 h-20 bg-blue-300 rounded-full blur-lg"></div>
              <div className="absolute bottom-8 right-8 w-24 h-24 bg-indigo-300 rounded-full blur-lg"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-300 rounded-full blur-md"></div>
            </div>
            
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900 dark:text-blue-100">Ready to Transform Your Skills?</h2>
              <p className="text-lg text-blue-700 dark:text-blue-200 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join thousands of students mastering programming with our structured approach
              </p>
              
              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">2,847+</div>
                  <div className="text-blue-600 dark:text-blue-300 text-xs">Students</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">300+</div>
                  <div className="text-blue-600 dark:text-blue-300 text-xs">Problems</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">4.9★</div>
                  <div className="text-blue-600 dark:text-blue-300 text-xs">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-800 dark:text-blue-200 mb-1">8-12</div>
                  <div className="text-blue-600 dark:text-blue-300 text-xs">Weeks</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/courses">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all font-semibold"
                  >
                    Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button
                    variant="outline"
                    size="lg"
                    className="text-lg px-8 py-4 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all font-semibold bg-transparent"
                  >
                    Try Quiz Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 bg-background relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo and description */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold text-foreground">Draxity</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Master programming through structured learning.
              </p>
            </div>
            
            {/* Platform links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Learning Pathways</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Practice Arena</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Progress Tracking</a></li>
              </ul>
            </div>
            
            {/* Resources links */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Community</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Support</a></li>
              </ul>
            </div>
            
            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-blue-600 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-6 text-center text-muted-foreground text-sm">
            <p>&copy; 2024 Draxity. All rights reserved.</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  )
}
