import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Code,
  Clock,
  Users,
  Star,
  Lock,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Play,
  Trophy,
  Target,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/navigation";

// This would typically come from a database or API
const courseData = {
  "dsa-fundamentals": {
    id: "dsa-fundamentals",
    title: "Data Structures & Algorithms",
    description:
      "Master the fundamentals of DSA through structured learning and practice",
    level: "Beginner to Advanced",
    duration: "8-12 weeks",
    students: "2,847",
    rating: 4.9,
    progress: 15,
    totalModules: 8,
    completedModules: 1,
    totalProblems: 300,
    solvedProblems: 12,
    modules: [
      {
        id: 1,
        title: "Arrays & Strings",
        description:
          "Learn fundamental array operations and string manipulation techniques",
        lessons: 8,
        problems: 45,
        duration: "1-2 weeks",
        status: "available",
        progress: 75,
        topics: [
          "Array Basics",
          "Two Pointers",
          "Sliding Window",
          "String Algorithms",
        ],
      },
      {
        id: 2,
        title: "Recursion & Backtracking",
        description:
          "Master recursive thinking and backtracking problem-solving patterns",
        lessons: 6,
        problems: 38,
        duration: "1-2 weeks",
        status: "locked",
        progress: 0,
        topics: [
          "Recursion Basics",
          "Tree Recursion",
          "Backtracking",
          "Memoization",
        ],
      },
      {
        id: 3,
        title: "Linked Lists",
        description:
          "Understand pointer manipulation and linked list operations",
        lessons: 5,
        problems: 32,
        duration: "1 week",
        status: "locked",
        progress: 0,
        topics: [
          "Singly Linked Lists",
          "Doubly Linked Lists",
          "Circular Lists",
          "Advanced Operations",
        ],
      },
      {
        id: 4,
        title: "Stacks & Queues",
        description:
          "Learn LIFO and FIFO data structures and their applications",
        lessons: 4,
        problems: 28,
        duration: "1 week",
        status: "locked",
        progress: 0,
        topics: [
          "Stack Operations",
          "Queue Operations",
          "Deque",
          "Priority Queues",
        ],
      },
      {
        id: 5,
        title: "Trees & Binary Search Trees",
        description:
          "Explore tree structures and binary search tree operations",
        lessons: 7,
        problems: 42,
        duration: "2 weeks",
        status: "locked",
        progress: 0,
        topics: [
          "Tree Traversals",
          "BST Operations",
          "Tree Construction",
          "Tree Algorithms",
        ],
      },
      {
        id: 6,
        title: "Graphs",
        description: "Master graph algorithms and traversal techniques",
        lessons: 8,
        problems: 48,
        duration: "2-3 weeks",
        status: "locked",
        progress: 0,
        topics: [
          "Graph Representation",
          "DFS & BFS",
          "Shortest Paths",
          "Minimum Spanning Trees",
        ],
      },
      {
        id: 7,
        title: "Dynamic Programming",
        description:
          "Learn optimization techniques and dynamic programming patterns",
        lessons: 9,
        problems: 41,
        duration: "2-3 weeks",
        status: "locked",
        progress: 0,
        topics: ["DP Fundamentals", "1D DP", "2D DP", "Advanced DP Patterns"],
      },
      {
        id: 8,
        title: "Advanced Algorithms",
        description:
          "Explore advanced algorithmic techniques and optimizations",
        lessons: 6,
        problems: 26,
        duration: "1-2 weeks",
        status: "locked",
        progress: 0,
        topics: [
          "Greedy Algorithms",
          "Divide & Conquer",
          "Advanced Data Structures",
          "Algorithm Analysis",
        ],
      },
    ],
  },
};

export default function CoursePage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = courseData[params.courseId as keyof typeof courseData];

  if (!course) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Back Navigation */}
      <div className="px-4 pt-4">
        <div className="container mx-auto max-w-6xl">
          <Link
            href="/courses"
            className="inline-flex items-center p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2 text-muted-foreground hover:text-foreground" />
            <span className="text-sm text-muted-foreground hover:text-foreground">
              Back to Courses
            </span>
          </Link>
        </div>
      </div>
      {/* Course Header */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <Badge className="mb-4">{course.level}</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-4">
                  {course.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {course.duration}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2" />
                    {course.students} students
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 mr-2 text-yellow-500" />
                    {course.rating} rating
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {course.totalModules} modules
                  </div>
                  <div className="flex items-center">
                    <Code className="w-4 h-4 mr-2" />
                    {course.totalProblems} problems
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Your Progress
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {course.progress}%
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Complete
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-accent">
                        {course.completedModules}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Modules Done
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-primary">
                        {course.solvedProblems}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Problems Solved
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-accent">3</div>
                      <div className="text-sm text-muted-foreground">
                        Badges Earned
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Course Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span className="font-medium">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-3" />
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Modules Completed
                      </span>
                      <span>
                        {course.completedModules}/{course.totalModules}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Problems Solved
                      </span>
                      <span>
                        {course.solvedProblems}/{course.totalProblems}
                      </span>
                    </div>
                  </div>

                  <Link href={`/courses/${course.id}/modules/1`}>
                    <Button className="w-full mt-4">
                      Continue Learning
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                    Recent Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Target className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Array Master</div>
                      <div className="text-xs text-muted-foreground">
                        Completed Arrays module
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                      <Code className="w-4 h-4 text-accent" />
                    </div>
                    <div>
                      <div className="font-medium text-sm">Problem Solver</div>
                      <div className="text-xs text-muted-foreground">
                        Solved 10 problems
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Course Modules
          </h2>

          <div className="space-y-4">
            {course.modules.map((module, index) => (
              <Card
                key={module.id}
                className={`${
                  module.status === "available"
                    ? "border-primary/40 bg-primary/5"
                    : "border-border"
                }`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            module.status === "available"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {module.status === "available" ? (
                            module.progress > 0 ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <Play className="w-5 h-5" />
                            )
                          ) : (
                            <Lock className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">
                            Module {module.id}: {module.title}
                          </h3>
                          <p className="text-muted-foreground text-sm">
                            {module.description}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {module.lessons} lessons
                        </div>
                        <div className="flex items-center">
                          <Code className="w-4 h-4 mr-1" />
                          {module.problems} problems
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {module.duration}
                        </div>
                        <div className="flex items-center">
                          <Target className="w-4 h-4 mr-1" />
                          {module.topics.length} topics
                        </div>
                      </div>

                      {module.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-muted-foreground">
                              Progress
                            </span>
                            <span className="font-medium">
                              {module.progress}%
                            </span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                        </div>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {module.topics.map((topic, topicIndex) => (
                          <Badge
                            key={topicIndex}
                            variant="outline"
                            className="text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4">
                      {module.status === "available" ? (
                        <Link
                          href={`/courses/${course.id}/modules/${module.id}`}
                        >
                          <Button>
                            {module.progress > 0 ? "Continue" : "Start"}
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Button disabled>
                          <Lock className="mr-2 w-4 h-4" />
                          Locked
                        </Button>
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
  );
}
