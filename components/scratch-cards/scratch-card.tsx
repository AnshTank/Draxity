"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Gift, ArrowRight, Code, Trophy, Star } from "lucide-react"
import { AssessmentEditor } from "./assessment-editor"

export function ScratchCard() {
  const [isScratched, setIsScratched] = useState(false)
  const [showEditor, setShowEditor] = useState(false)
  const [scratchProgress, setScratchProgress] = useState(0)

  const handleScratch = () => {
    if (scratchProgress < 100) {
      setScratchProgress(prev => Math.min(prev + 10, 100))
      if (scratchProgress >= 90) {
        setTimeout(() => setIsScratched(true), 500)
      }
    }
  }

  const handleRevealChallenge = () => {
    setShowEditor(true)
  }

  if (showEditor) {
    return <AssessmentEditor onBack={() => setShowEditor(false)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-orange-950 dark:to-red-950 p-6 flex items-center justify-center">
      <div className="max-w-2xl mx-auto">
        {!isScratched ? (
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-4 border-yellow-300 dark:border-yellow-600 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <Gift className="h-20 w-20 text-yellow-500 animate-bounce" />
                  <Sparkles className="h-8 w-8 text-orange-500 absolute -top-2 -right-2 animate-pulse" />
                </div>
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                🎉 Congratulations! 🎉
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                You've earned a special scratch card!
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="relative">
                <div 
                  className="w-80 h-48 mx-auto bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl cursor-pointer relative overflow-hidden"
                  onClick={handleScratch}
                >
                  {/* Scratch overlay */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-400 to-gray-600 transition-opacity duration-300"
                    style={{ opacity: (100 - scratchProgress) / 100 }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Sparkles className="h-12 w-12 mx-auto mb-2 animate-pulse" />
                        <p className="text-lg font-bold">Scratch to Reveal!</p>
                        <p className="text-sm opacity-80">Click anywhere</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hidden content */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <Code className="h-16 w-16 mx-auto mb-3" />
                      <h3 className="text-xl font-bold mb-2">Coding Challenge</h3>
                      <p className="text-sm">Two Sum Problem</p>
                    </div>
                  </div>
                </div>
                
                {scratchProgress > 0 && (
                  <div className="mt-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${scratchProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {scratchProgress}% revealed
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900 dark:to-orange-900 p-4 rounded-xl">
                <h4 className="font-bold text-yellow-800 dark:text-yellow-200 mb-2">
                  🏆 Bonus Rewards
                </h4>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
                    <p className="text-yellow-700 dark:text-yellow-300">+50 XP</p>
                  </div>
                  <div className="text-center">
                    <Trophy className="h-6 w-6 text-orange-500 mx-auto mb-1" />
                    <p className="text-orange-700 dark:text-orange-300">Badge</p>
                  </div>
                  <div className="text-center">
                    <Code className="h-6 w-6 text-purple-500 mx-auto mb-1" />
                    <p className="text-purple-700 dark:text-purple-300">Challenge</p>
                  </div>
                </div>
              </div>

              {scratchProgress < 100 && (
                <p className="text-muted-foreground text-sm">
                  Keep scratching to reveal your coding challenge!
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-4 border-purple-300 dark:border-purple-600 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="relative animate-pulse">
                  <Code className="h-20 w-20 text-purple-500" />
                  <Sparkles className="h-8 w-8 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
                </div>
              </div>
              <CardTitle className="text-3xl bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                🎯 Challenge Revealed!
              </CardTitle>
              <p className="text-lg text-muted-foreground">
                Time to put your skills to the test!
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900 dark:to-indigo-900 p-6 rounded-xl">
                <h3 className="text-2xl font-bold text-purple-700 dark:text-purple-300 mb-3">
                  Two Sum Problem
                </h3>
                <p className="text-purple-600 dark:text-purple-400 mb-4">
                  Given an array of integers and a target sum, return the indices of two numbers that add up to the target.
                </p>
                <div className="flex justify-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-bold text-purple-700 dark:text-purple-300">Difficulty</div>
                    <div className="text-green-600">Easy</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-700 dark:text-purple-300">Points</div>
                    <div className="text-yellow-600">100 XP</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-700 dark:text-purple-300">Time</div>
                    <div className="text-blue-600">30 min</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 p-4 rounded-xl">
                <h4 className="font-bold text-green-800 dark:text-green-200 mb-2">
                  🎁 Complete this challenge to unlock:
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-green-700 dark:text-green-300">✓ Next practice set</div>
                  <div className="text-green-700 dark:text-green-300">✓ Problem Solver badge</div>
                  <div className="text-green-700 dark:text-green-300">✓ 100 bonus XP</div>
                  <div className="text-green-700 dark:text-green-300">✓ Leaderboard points</div>
                </div>
              </div>

              <Button 
                onClick={handleRevealChallenge}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold px-8 py-4 text-lg"
              >
                <Code className="h-5 w-5 mr-2" />
                Start Challenge
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}