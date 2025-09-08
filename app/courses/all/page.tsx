import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Code,
  Clock,
  Users,
  Star,
  Lock,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { Navigation } from "@/components/navigation";

export default function AllCoursesPage() {
  const allCourses = [
    {
      id: "dsa-fundamentals",
      title: "Data Structures & Algorithms",
      description:
        "Master the fundamentals of DSA through structured learning and practice",
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
      description:
        "Learn OOP principles and design patterns with hands-on practice",
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
    {
      id: "web-development",
      title: "Full Stack Web Development",
      description: "Build modern web applications with React, Node.js, and databases",
      level: "Intermediate",
      duration: "10-14 weeks",
      students: "3,245",
      rating: 4.9,
      progress: 0,
      modules: 12,
      problems: 200,
      status: "coming-soon",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=225&fit=crop",
    },
    {
      id: "machine-learning",
      title: "Machine Learning Fundamentals",
      description: "Learn ML algorithms, data preprocessing, and model evaluation",
      level: "Advanced",
      duration: "12-16 weeks",
      students: "1,876",
      rating: 4.8,
      progress: 0,
      modules: 10,
      problems: 180,
      status: "coming-soon",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=225&fit=crop",
    },
    {
      id: "system-design",
      title: "System Design & Architecture",
      description: "Design scalable systems and understand distributed architectures",
      level: "Advanced",
      duration: "8-10 weeks",
      students: "1,234",
      rating: 4.7,
      progress: 0,
      modules: 8,
      problems: 100,
      status: "coming-soon",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=225&fit=crop",
    },
  ];

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="py-16 px-4 bg-card">
          <div className="container mx-auto max-w-6xl">
            <Link href="/courses" className="inline-flex items-center mb-6 p-2 hover:bg-muted rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 mr-2 text-muted-foreground hover:text-foreground" />
              <span className="text-sm text-muted-foreground hover:text-foreground">
                Back to Featured Courses
              </span>
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              All Courses
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Explore our complete catalog of programming and computer science courses.
              From beginner-friendly introductions to advanced topics.
            </p>
          </div>
        </section>

        {/* All Courses Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCourses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
                  style={{ minHeight: "500px" }}
                >
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

                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg flex-1">
                        {course.title}
                      </CardTitle>
                      <Badge
                        variant={
                          course.status === "available"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {course.level}
                      </Badge>
                    </div>
                    <CardDescription className="text-sm h-10 flex items-start">
                      {course.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 flex-1 flex flex-col pt-0">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="font-medium">{course.rating}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {course.students} students
                      </div>
                      <div>
                        {course.modules} modules • {course.problems} problems
                      </div>
                    </div>

                    <div className="h-12 flex items-start">
                      {course.progress > 0 && (
                        <div className="space-y-2 w-full">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-medium">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} className="h-2" />
                        </div>
                      )}
                    </div>

                    <div className="mt-auto">
                      {course.status === "available" ? (
                        <Link href={`/courses/${course.id}`}>
                          <Button className="w-full">
                            {course.progress > 0
                              ? "Continue Learning"
                              : "Start Course"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
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
      </div>
    </>
  );
}