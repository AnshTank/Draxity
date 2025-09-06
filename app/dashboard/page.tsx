import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Target,
  Flame,
  Calendar,
  Clock,
  Star,
  Award,
  TrendingUp,
  Users,
  BookOpen,
  Code,
  CheckCircle,
} from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

export default function DashboardPage() {
  const userStats = {
    name: "Alex Chen",
    level: 12,
    xp: 2450,
    xpToNext: 550,
    streak: 7,
    totalProblems: 45,
    solvedProblems: 32,
    coursesEnrolled: 3,
    coursesCompleted: 1,
    totalStudyTime: 28, // hours
    rank: 156,
    totalUsers: 12500,
  }

  const achievements = [
    {
      id: "first-solve",
      title: "First Steps",
      description: "Solved your first coding problem",
      icon: "🎯",
      earned: true,
      earnedDate: "2024-01-15",
    },
    {
      id: "week-streak",
      title: "Week Warrior",
      description: "Maintained a 7-day learning streak",
      icon: "🔥",
      earned: true,
      earnedDate: "2024-01-20",
    },
    {
      id: "quiz-master",
      title: "Quiz Master",
      description: "Scored 100% on 5 consecutive quizzes",
      icon: "🧠",
      earned: true,
      earnedDate: "2024-01-18",
    },
    {
      id: "speed-demon",
      title: "Speed Demon",
      description: "Solved a problem in under 5 minutes",
      icon: "⚡",
      earned: false,
    },
    {
      id: "perfectionist",
      title: "Perfectionist",
      description: "Complete a module with 100% accuracy",
      icon: "💎",
      earned: false,
    },
    {
      id: "night-owl",
      title: "Night Owl",
      description: "Study for 3 consecutive nights after 10 PM",
      icon: "🦉",
      earned: false,
    },
  ]

  const recentActivity = [
    {
      type: "problem",
      title: "Completed Two Sum",
      time: "2 hours ago",
      points: 100,
    },
    {
      type: "quiz",
      title: "Arrays & Strings Quiz",
      time: "1 day ago",
      points: 150,
    },
    {
      type: "lesson",
      title: "Binary Search Fundamentals",
      time: "2 days ago",
      points: 50,
    },
    {
      type: "achievement",
      title: "Earned Week Warrior badge",
      time: "3 days ago",
      points: 200,
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Sarah Kim", points: 4250, avatar: "SK" },
    { rank: 2, name: "Mike Johnson", points: 3890, avatar: "MJ" },
    { rank: 3, name: "Emma Davis", points: 3650, avatar: "ED" },
    { rank: 4, name: "You", points: 2450, avatar: "AC", isCurrentUser: true },
    { rank: 5, name: "David Wilson", points: 2380, avatar: "DW" },
  ]

  const progressPercentage = (userStats.solvedProblems / userStats.totalProblems) * 100
  const xpPercentage = (userStats.xp / (userStats.xp + userStats.xpToNext)) * 100

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back, {userStats.name}!</h1>
          <p className="text-lg text-muted-foreground">Ready to continue your learning journey?</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 text-sm">Current Level</p>
                  <p className="text-3xl font-bold">{userStats.level}</p>
                </div>
                <Trophy className="h-8 w-8 text-emerald-200" />
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm text-emerald-100 mb-1">
                  <span>{userStats.xp} XP</span>
                  <span>{userStats.xp + userStats.xpToNext} XP</span>
                </div>
                <Progress value={xpPercentage} className="bg-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Current Streak</p>
                  <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">{userStats.streak}</p>
                  <p className="text-sm text-muted-foreground">days</p>
                </div>
                <Flame className="h-8 w-8 text-orange-500 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Problems Solved</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{userStats.solvedProblems}</p>
                  <p className="text-sm text-muted-foreground">of {userStats.totalProblems}</p>
                </div>
                <Target className="h-8 w-8 text-blue-500 dark:text-blue-400" />
              </div>
              <Progress value={progressPercentage} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Global Rank</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">#{userStats.rank}</p>
                  <p className="text-sm text-muted-foreground">of {userStats.totalUsers.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-500 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Course Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-emerald-50 dark:bg-emerald-950 rounded-lg border border-emerald-200 dark:border-emerald-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-600 rounded-lg flex items-center justify-center">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">DSA Fundamentals</h3>
                        <p className="text-sm text-muted-foreground">Arrays, Strings, and Basic Algorithms</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={75} className="w-32" />
                          <span className="text-sm text-muted-foreground">75% Complete</span>
                        </div>
                      </div>
                    </div>
                    <Link href="/courses/dsa-fundamentals">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">Continue</Button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted-foreground rounded-lg flex items-center justify-center">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Advanced Algorithms</h3>
                        <p className="text-sm text-muted-foreground">Dynamic Programming, Graph Theory</p>
                        <Badge variant="outline" className="mt-1">
                          Locked
                        </Badge>
                      </div>
                    </div>
                    <Button disabled variant="outline">
                      Locked
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg">
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center">
                        {activity.type === "problem" && <Target className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />}
                        {activity.type === "quiz" && <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />}
                        {activity.type === "lesson" && <BookOpen className="h-5 w-5 text-purple-600 dark:text-purple-400" />}
                        {activity.type === "achievement" && <Award className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.time}</p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                        <Star className="h-4 w-4" />
                        <span className="font-medium">+{activity.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  {achievements.filter((a) => a.earned).length} of {achievements.length} earned
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`p-3 rounded-lg text-center transition-all ${
                        achievement.earned
                          ? "bg-yellow-50 dark:bg-yellow-950 border-2 border-yellow-200 dark:border-yellow-800 hover:scale-105"
                          : "bg-muted border-2 border-border opacity-60"
                      }`}
                      title={achievement.description}
                    >
                      <div className="text-2xl mb-1">{achievement.icon}</div>
                      <div className="text-xs font-medium text-foreground">{achievement.title}</div>
                    </div>
                  ))}
                </div>
                <Link href="/achievements">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View All Achievements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Leaderboard
                </CardTitle>
                <CardDescription>Top learners this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-3 p-2 rounded-lg ${
                        user.isCurrentUser ? "bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800" : "hover:bg-muted/50"
                      }`}
                    >
                      <div className="flex items-center justify-center w-6 h-6 text-sm font-bold text-muted-foreground">
                        {user.rank}
                      </div>
                      <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-medium">
                        {user.avatar}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${user.isCurrentUser ? "text-emerald-700 dark:text-emerald-300" : "text-foreground"}`}>
                          {user.name}
                        </p>
                        <p className="text-xs text-muted-foreground">{user.points} pts</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/leaderboard">
                  <Button variant="outline" className="w-full mt-4 bg-transparent">
                    View Full Leaderboard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Study Streak */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Study Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">{userStats.streak}</div>
                  <div className="text-sm text-muted-foreground">days in a row</div>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {Array.from({ length: 7 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-8 h-8 rounded-sm ${i < userStats.streak ? "bg-orange-500" : "bg-muted"}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground text-center">Keep it up! Study today to maintain your streak.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
