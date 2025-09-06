import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Code, Trophy, Target, Zap, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ScratchCardInterface } from "@/components/scratch-cards/scratch-card-interface"

// Mock scratch card data
const scratchCardData = {
  "dsa-fundamentals": {
    "1": {
      id: 1,
      title: "Arrays & Strings Scratch Challenge",
      description: "Scratch 3 mystery cards to reveal coding challenges. Solve each one to unlock the next!",
      totalCards: 3,
      problems: [
        {
          id: 1,
          title: "Two Sum",
          difficulty: "Easy",
          description:
            "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
          examples: [
            {
              input: "nums = [2,7,11,15], target = 9",
              output: "[0,1]",
              explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
            },
          ],
          constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists.",
          ],
          starterCode: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your solution here
    pass`,
          hints: [
            "Try using a hash map to store numbers you've seen",
            "For each number, check if target - number exists in your hash map",
            "Remember to return the indices, not the values",
          ],
          tags: ["Array", "Hash Table"],
          timeLimit: 30,
          points: 100,
        },
        {
          id: 2,
          title: "Valid Palindrome",
          difficulty: "Easy",
          description:
            "A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.",
          examples: [
            {
              input: 's = "A man, a plan, a canal: Panama"',
              output: "true",
              explanation: '"amanaplanacanalpanama" is a palindrome.',
            },
          ],
          constraints: ["1 <= s.length <= 2 * 10^5", "s consists only of printable ASCII characters."],
          starterCode: `def isPalindrome(s):
    """
    :type s: str
    :rtype: bool
    """
    # Write your solution here
    pass`,
          hints: [
            "Use two pointers from both ends",
            "Skip non-alphanumeric characters",
            "Convert to lowercase for comparison",
          ],
          tags: ["Two Pointers", "String"],
          timeLimit: 25,
          points: 120,
        },
        {
          id: 3,
          title: "Container With Most Water",
          difficulty: "Medium",
          description:
            "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]). Find two lines that together with the x-axis form a container that can hold the most water.",
          examples: [
            {
              input: "height = [1,8,6,2,5,4,8,3,7]",
              output: "49",
              explanation:
                "The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water the container can contain is 49.",
            },
          ],
          constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
          starterCode: `def maxArea(height):
    """
    :type height: List[int]
    :rtype: int
    """
    # Write your solution here
    pass`,
          hints: [
            "Use two pointers at the beginning and end",
            "Move the pointer with smaller height",
            "Keep track of maximum area seen so far",
          ],
          tags: ["Array", "Two Pointers", "Greedy"],
          timeLimit: 35,
          points: 150,
        },
      ],
    },
  },
}

export default function ScratchCardsPage({
  params,
}: {
  params: { courseId: string; moduleId: string }
}) {
  const scratchCards =
    scratchCardData[params.courseId as keyof typeof scratchCardData]?.[
      params.moduleId as keyof (typeof scratchCardData)[keyof typeof scratchCardData]
    ]

  if (!scratchCards) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Breadcrumb Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm">
              <Link href="/courses" className="text-muted-foreground hover:text-foreground transition-colors">
                Courses
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href={`/courses/${params.courseId}`} className="text-muted-foreground hover:text-foreground transition-colors">
                DSA Fundamentals
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link href={`/courses/${params.courseId}/modules/${params.moduleId}`} className="text-muted-foreground hover:text-foreground transition-colors">
                Arrays & Strings
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">Scratch Challenge</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                <Trophy className="w-3 h-3 mr-1" />
                Interactive
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge Header */}
      <section className="py-8 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">{scratchCards.title}</h1>
          <p className="text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">{scratchCards.description}</p>

          <div className="flex justify-center space-x-8 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{scratchCards.totalCards}</div>
              <div className="text-sm text-muted-foreground">Mystery Cards</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent">370</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">90</div>
              <div className="text-sm text-muted-foreground">Time Limit (min)</div>
            </div>
          </div>

          <Link href={`/courses/${params.courseId}/modules/${params.moduleId}`}>
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module
            </Button>
          </Link>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-8 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-8 text-foreground">How Scratch Cards Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">1. Scratch to Reveal</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a mystery card to scratch and reveal a random coding problem
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">2. Solve the Problem</h3>
                <p className="text-sm text-muted-foreground">
                  Use the built-in code editor to solve the revealed problem within the time limit
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">3. Earn Points & Progress</h3>
                <p className="text-sm text-muted-foreground">
                  Complete all 3 cards to unlock the next module and earn achievement badges
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scratch Card Interface */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <ScratchCardInterface
            problems={scratchCards.problems}
            courseId={params.courseId}
            moduleId={params.moduleId}
          />
        </div>
      </section>
    </div>
  )
}
