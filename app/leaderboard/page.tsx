import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, TrendingUp, Calendar, Users, Star, Crown, Flame } from "lucide-react"

export default function LeaderboardPage() {
  const weeklyLeaderboard = [
    {
      rank: 1,
      name: "Sarah Kim",
      avatar: "SK",
      points: 4250,
      problemsSolved: 67,
      streak: 14,
      level: 18,
      change: "+2",
    },
    {
      rank: 2,
      name: "Mike Johnson",
      avatar: "MJ",
      points: 3890,
      problemsSolved: 58,
      streak: 9,
      level: 16,
      change: "-1",
    },
    {
      rank: 3,
      name: "Emma Davis",
      avatar: "ED",
      points: 3650,
      problemsSolved: 52,
      streak: 12,
      level: 15,
      change: "+1",
    },
    {
      rank: 4,
      name: "Alex Chen",
      avatar: "AC",
      points: 2450,
      problemsSolved: 32,
      streak: 7,
      level: 12,
      change: "0",
      isCurrentUser: true,
    },
    {
      rank: 5,
      name: "David Wilson",
      avatar: "DW",
      points: 2380,
      problemsSolved: 31,
      streak: 5,
      level: 11,
      change: "-2",
    },
    {
      rank: 6,
      name: "Lisa Zhang",
      avatar: "LZ",
      points: 2200,
      problemsSolved: 29,
      streak: 8,
      level: 11,
      change: "+3",
    },
    {
      rank: 7,
      name: "James Brown",
      avatar: "JB",
      points: 2150,
      problemsSolved: 28,
      streak: 4,
      level: 10,
      change: "-1",
    },
    {
      rank: 8,
      name: "Anna Martinez",
      avatar: "AM",
      points: 2050,
      problemsSolved: 27,
      streak: 6,
      level: 10,
      change: "+1",
    },
  ]

  const monthlyLeaderboard = [
    {
      rank: 1,
      name: "Sarah Kim",
      avatar: "SK",
      points: 12750,
      problemsSolved: 189,
      streak: 28,
      level: 18,
    },
    {
      rank: 2,
      name: "Emma Davis",
      avatar: "ED",
      points: 11200,
      problemsSolved: 156,
      streak: 25,
      level: 15,
    },
    {
      rank: 3,
      name: "Mike Johnson",
      avatar: "MJ",
      points: 10890,
      problemsSolved: 148,
      streak: 22,
      level: 16,
    },
    {
      rank: 4,
      name: "Alex Chen",
      avatar: "AC",
      points: 8450,
      problemsSolved: 98,
      streak: 18,
      level: 12,
      isCurrentUser: true,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return <span className="text-sm font-bold text-gray-600">#{rank}</span>
    }
  }

  const getChangeColor = (change: string) => {
    if (change.startsWith("+")) return "text-green-600 bg-green-50"
    if (change.startsWith("-")) return "text-red-600 bg-red-50"
    return "text-gray-600 bg-gray-50"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Leaderboard</h1>
          <p className="text-lg text-muted-foreground mb-6">
            See how you stack up against other learners in the Heurix community.
          </p>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">12,500</div>
                <div className="text-sm text-muted-foreground">total learners</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">#156</div>
                <div className="text-sm text-muted-foreground">your global rank</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">2,450</div>
                <div className="text-sm text-muted-foreground">your total XP</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Flame className="h-8 w-8 text-orange-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">7</div>
                <div className="text-sm text-muted-foreground">day streak</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="weekly" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="weekly" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Week
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              This Month
            </TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Weekly Leaderboard
                </CardTitle>
                <CardDescription>Rankings based on XP earned this week (Jan 15-21, 2024)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {weeklyLeaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        user.isCurrentUser
                          ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 shadow-sm"
                          : "bg-card border-border hover:shadow-sm"
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                        {user.avatar}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${user.isCurrentUser ? "text-emerald-700 dark:text-emerald-300" : "text-foreground"}`}>
                            {user.name}
                          </h3>
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Level {user.level}</span>
                          <span>{user.problemsSolved} problems</span>
                          <div className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-orange-500" />
                            <span>{user.streak} days</span>
                          </div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">XP</div>
                      </div>

                      {/* Change */}
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getChangeColor(user.change)}`}>
                        {user.change !== "0" ? user.change : "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Monthly Leaderboard
                </CardTitle>
                <CardDescription>Rankings based on total XP earned this month (January 2024)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {monthlyLeaderboard.map((user) => (
                    <div
                      key={user.rank}
                      className={`flex items-center gap-4 p-4 rounded-lg border transition-all ${
                        user.isCurrentUser
                          ? "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 shadow-sm"
                          : "bg-card border-border hover:shadow-sm"
                      }`}
                    >
                      {/* Rank */}
                      <div className="flex items-center justify-center w-8">{getRankIcon(user.rank)}</div>

                      {/* Avatar */}
                      <div className="w-12 h-12 rounded-full bg-emerald-600 flex items-center justify-center text-white font-medium">
                        {user.avatar}
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-semibold ${user.isCurrentUser ? "text-emerald-700 dark:text-emerald-300" : "text-foreground"}`}>
                            {user.name}
                          </h3>
                          {user.isCurrentUser && (
                            <Badge variant="secondary" className="bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                              You
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>Level {user.level}</span>
                          <span>{user.problemsSolved} problems</span>
                          <div className="flex items-center gap-1">
                            <Flame className="h-3 w-3 text-orange-500" />
                            <span>{user.streak} days</span>
                          </div>
                        </div>
                      </div>

                      {/* Points */}
                      <div className="text-right">
                        <div className="text-lg font-bold text-foreground">{user.points.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">XP</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Competition Info */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 border-purple-200 dark:border-purple-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Trophy className="h-6 w-6 text-purple-600 dark:text-purple-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Weekly Competition</h3>
                <p className="text-muted-foreground mb-3">
                  Compete with other learners and climb the leaderboard! Top performers earn special badges and bonus
                  XP.
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>• Top 3 get exclusive badges</span>
                  <span>• Weekly winners get 500 bonus XP</span>
                  <span>• Resets every Monday</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
