import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, Lock, Play, Star, Target, Trophy } from "lucide-react"
import Link from "next/link"

export default function PracticeArenaPage({ params }: { params: { courseId: string; moduleId: string } }) {
  const practiceProblems = [
    {
      id: "two-sum",
      title: "Two Sum",
      difficulty: "Easy",
      description: "Find two numbers in an array that add up to a target sum",
      timeEstimate: "15 min",
      points: 100,
      status: "unlocked",
      completed: true,
      tags: ["Array", "Hash Table"],
    },
    {
      id: "valid-parentheses",
      title: "Valid Parentheses",
      difficulty: "Easy",
      description: "Check if a string of parentheses is valid",
      timeEstimate: "20 min",
      points: 120,
      status: "unlocked",
      completed: false,
      tags: ["Stack", "String"],
    },
    {
      id: "merge-intervals",
      title: "Merge Intervals",
      difficulty: "Medium",
      description: "Merge overlapping intervals in an array",
      timeEstimate: "30 min",
      points: 200,
      status: "locked",
      completed: false,
      tags: ["Array", "Sorting"],
    },
    {
      id: "binary-tree-traversal",
      title: "Binary Tree Traversal",
      difficulty: "Medium",
      description: "Implement inorder, preorder, and postorder traversal",
      timeEstimate: "25 min",
      points: 180,
      status: "locked",
      completed: false,
      tags: ["Tree", "DFS"],
    },
  ]

  const completedProblems = practiceProblems.filter((p) => p.completed).length
  const totalProblems = practiceProblems.length
  const progressPercentage = (completedProblems / totalProblems) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-sm text-emerald-600 mb-2">
            <span>DSA Fundamentals</span>
            <span>→</span>
            <span>Arrays & Strings</span>
            <span>→</span>
            <span className="font-medium">Practice Arena</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Arena</h1>
          <p className="text-lg text-gray-600 mb-6">
            Apply your knowledge with hands-on coding challenges. Each problem builds on the concepts you've learned.
          </p>

          {/* Progress Overview */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Your Progress</h2>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="font-medium text-gray-900">
                  {completedProblems}/{totalProblems} Complete
                </span>
              </div>
            </div>
            <Progress value={progressPercentage} className="mb-4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{completedProblems}</div>
                <div className="text-sm text-gray-600">Problems Solved</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {practiceProblems.filter((p) => p.completed).reduce((sum, p) => sum + p.points, 0)}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    practiceProblems
                      .filter((p) => p.completed)
                      .reduce((sum, p) => sum + Number.parseInt(p.timeEstimate), 0) / 60,
                  )}
                  h
                </div>
                <div className="text-sm text-gray-600">Time Invested</div>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Grid */}
        <div className="grid gap-6">
          {practiceProblems.map((problem) => (
            <Card
              key={problem.id}
              className={`transition-all duration-200 ${
                problem.status === "locked" ? "opacity-60 bg-gray-50" : "hover:shadow-lg hover:scale-[1.02] bg-white"
              }`}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CardTitle className="text-xl">{problem.title}</CardTitle>
                      <Badge
                        variant={
                          problem.difficulty === "Easy"
                            ? "secondary"
                            : problem.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {problem.difficulty}
                      </Badge>
                      {problem.completed && <CheckCircle className="h-5 w-5 text-emerald-500" />}
                      {problem.status === "locked" && <Lock className="h-5 w-5 text-gray-400" />}
                    </div>
                    <CardDescription className="text-base mb-3">{problem.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {problem.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-sm text-gray-600 mb-1">
                      <Clock className="h-4 w-4" />
                      {problem.timeEstimate}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600">
                      <Star className="h-4 w-4" />
                      {problem.points} pts
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {problem.completed && (
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        ✓ Completed
                      </Badge>
                    )}
                    {problem.status === "locked" && (
                      <Badge variant="outline" className="text-gray-500">
                        🔒 Complete previous problems to unlock
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {problem.status === "unlocked" && (
                      <Link href={`/courses/${params.courseId}/modules/${params.moduleId}/practice/${problem.id}`}>
                        <Button className="bg-emerald-600 hover:bg-emerald-700">
                          <Play className="h-4 w-4 mr-2" />
                          {problem.completed ? "Review Solution" : "Start Problem"}
                        </Button>
                      </Link>
                    )}
                    {problem.status === "locked" && (
                      <Button disabled variant="outline">
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

        {/* Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
          <div className="flex items-start gap-4">
            <Target className="h-6 w-6 text-blue-600 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Practice Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Start with easier problems to build confidence</li>
                <li>• Read the problem statement carefully and understand the constraints</li>
                <li>• Think about the approach before coding - draw diagrams if needed</li>
                <li>• Test your solution with the provided examples</li>
                <li>• Don't hesitate to use hints if you're stuck for more than 15 minutes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
