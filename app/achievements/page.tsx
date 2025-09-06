import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Trophy, Star, Lock, Calendar, Target, Award, CheckCircle } from "lucide-react"

export default function AchievementsPage() {
  const achievementCategories = [
    {
      name: "Learning Milestones",
      achievements: [
        {
          id: "first-steps",
          title: "First Steps",
          description: "Complete your first lesson",
          icon: "🎯",
          points: 50,
          earned: true,
          earnedDate: "2024-01-15",
          rarity: "common",
        },
        {
          id: "problem-solver",
          title: "Problem Solver",
          description: "Solve your first coding problem",
          icon: "💡",
          points: 100,
          earned: true,
          earnedDate: "2024-01-16",
          rarity: "common",
        },
        {
          id: "quiz-master",
          title: "Quiz Master",
          description: "Score 100% on your first quiz",
          icon: "🧠",
          points: 150,
          earned: true,
          earnedDate: "2024-01-18",
          rarity: "uncommon",
        },
        {
          id: "module-complete",
          title: "Module Master",
          description: "Complete your first module",
          icon: "📚",
          points: 200,
          earned: false,
          rarity: "uncommon",
        },
      ],
    },
    {
      name: "Consistency",
      achievements: [
        {
          id: "daily-learner",
          title: "Daily Learner",
          description: "Study for 3 consecutive days",
          icon: "📅",
          points: 100,
          earned: true,
          earnedDate: "2024-01-17",
          rarity: "common",
        },
        {
          id: "week-warrior",
          title: "Week Warrior",
          description: "Maintain a 7-day learning streak",
          icon: "🔥",
          points: 300,
          earned: true,
          earnedDate: "2024-01-20",
          rarity: "rare",
        },
        {
          id: "month-master",
          title: "Month Master",
          description: "Study every day for a month",
          icon: "🏆",
          points: 1000,
          earned: false,
          rarity: "legendary",
        },
      ],
    },
    {
      name: "Performance",
      achievements: [
        {
          id: "speed-demon",
          title: "Speed Demon",
          description: "Solve a problem in under 5 minutes",
          icon: "⚡",
          points: 200,
          earned: false,
          rarity: "uncommon",
        },
        {
          id: "perfectionist",
          title: "Perfectionist",
          description: "Complete a module with 100% accuracy",
          icon: "💎",
          points: 500,
          earned: false,
          rarity: "rare",
        },
        {
          id: "efficiency-expert",
          title: "Efficiency Expert",
          description: "Solve 10 problems with optimal solutions",
          icon: "🎖️",
          points: 750,
          earned: false,
          rarity: "epic",
        },
      ],
    },
    {
      name: "Social",
      achievements: [
        {
          id: "top-10",
          title: "Top 10",
          description: "Reach top 10 on the leaderboard",
          icon: "🥇",
          points: 500,
          earned: false,
          rarity: "rare",
        },
        {
          id: "helpful-peer",
          title: "Helpful Peer",
          description: "Help 5 other students in discussions",
          icon: "🤝",
          points: 300,
          earned: false,
          rarity: "uncommon",
        },
      ],
    },
  ]

  const totalAchievements = achievementCategories.reduce((sum, cat) => sum + cat.achievements.length, 0)
  const earnedAchievements = achievementCategories.reduce(
    (sum, cat) => sum + cat.achievements.filter((a) => a.earned).length,
    0,
  )
  const totalPoints = achievementCategories.reduce(
    (sum, cat) => sum + cat.achievements.filter((a) => a.earned).reduce((pts, a) => pts + a.points, 0),
    0,
  )

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-300"
      case "uncommon":
        return "bg-green-100 text-green-700 border-green-300"
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-700 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-300"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Achievements</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Track your learning milestones and unlock rewards as you progress through your DSA journey.
          </p>

          {/* Progress Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{earnedAchievements}</div>
                <div className="text-sm text-muted-foreground">of {totalAchievements} earned</div>
                <Progress value={(earnedAchievements / totalAchievements) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">{totalPoints}</div>
                <div className="text-sm text-muted-foreground">achievement points</div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-foreground">
                  {achievementCategories.reduce(
                    (sum, cat) => sum + cat.achievements.filter((a) => a.earned && a.rarity === "rare").length,
                    0,
                  )}
                </div>
                <div className="text-sm text-muted-foreground">rare achievements</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Achievement Categories */}
        <div className="space-y-8">
          {achievementCategories.map((category) => (
            <Card key={category.name}>
              <CardHeader>
                <CardTitle className="text-xl">{category.name}</CardTitle>
                <CardDescription>
                  {category.achievements.filter((a) => a.earned).length} of {category.achievements.length} completed
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.achievements.map((achievement) => (
                    <div
                      key={achievement.id}
                      className={`relative p-4 rounded-lg border-2 transition-all ${
                        achievement.earned
                          ? "bg-card border-emerald-200 dark:border-emerald-800 hover:shadow-md"
                          : "bg-muted/50 border-border opacity-75"
                      }`}
                    >
                      {achievement.earned && (
                        <div className="absolute -top-2 -right-2">
                          <CheckCircle className="h-6 w-6 text-emerald-500 bg-white rounded-full" />
                        </div>
                      )}

                      <div className="flex items-start gap-3">
                        <div className="text-3xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                            {!achievement.earned && <Lock className="h-4 w-4 text-muted-foreground" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>

                          <div className="flex items-center justify-between">
                            <Badge className={`text-xs ${getRarityColor(achievement.rarity)}`}>
                              {achievement.rarity}
                            </Badge>
                            <div className="flex items-center gap-1 text-emerald-600">
                              <Star className="h-3 w-3" />
                              <span className="text-sm font-medium">{achievement.points}</span>
                            </div>
                          </div>

                          {achievement.earned && achievement.earnedDate && (
                            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              Earned {new Date(achievement.earnedDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tips */}
        <Card className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-blue-200 dark:border-blue-800">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Target className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Achievement Tips</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Study consistently to unlock streak-based achievements</li>
                  <li>• Focus on accuracy to earn performance badges</li>
                  <li>• Complete entire modules for milestone rewards</li>
                  <li>• Participate in community discussions for social achievements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
