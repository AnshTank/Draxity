"use client";

import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { ScratchToReveal } from "@/components/magicui/scratch-to-reveal";
import { ArrowLeft, Code, Trophy, Star } from "lucide-react";
import Link from "next/link";

interface CodingChallenge {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  description: string;
  example: string;
  constraints: string[];
}

const codingChallenges: CodingChallenge[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    example: "Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].",
    constraints: ["2 ≤ nums.length ≤ 10⁴", "-10⁹ ≤ nums[i] ≤ 10⁹", "-10⁹ ≤ target ≤ 10⁹"]
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    example: "Input: s = \"()[]{}\"\nOutput: true\nExplanation: All brackets are properly matched.",
    constraints: ["1 ≤ s.length ≤ 10⁴", "s consists of parentheses only '()[]{}'"]
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description: "Given a string s, find the length of the longest substring without repeating characters.",
    example: "Input: s = \"abcabcbb\"\nOutput: 3\nExplanation: The answer is \"abc\", with the length of 3.",
    constraints: ["0 ≤ s.length ≤ 5 * 10⁴", "s consists of English letters, digits, symbols and spaces"]
  }
];

export default function ScratchCardPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<CodingChallenge | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * codingChallenges.length);
    setSelectedChallenge(codingChallenges[randomIndex]);
  }, []);

  const handleReveal = () => {
    setIsRevealed(true);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-green-600 bg-green-100";
      case "Medium": return "text-yellow-600 bg-yellow-100";
      case "Hard": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-purple-950 dark:to-indigo-950 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 flex items-center justify-between">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent">
                Scratch & Code
              </h1>
              <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
                Scratch the card to reveal your coding challenge!
              </p>
            </div>
            <Link href="/quiz">
              <Button variant="outline" size="lg" className="px-8 py-3 text-base">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Quiz
              </Button>
            </Link>
          </div>

          <div className="flex justify-center">
            {!isRevealed ? (
              <div className="relative">
                <ScratchToReveal 
                  width={400} 
                  height={400} 
                  minScratchPercentage={50}
                  className="rounded-3xl shadow-2xl"
                  onReveal={handleReveal}
                >
                  <div className="w-full h-full bg-gradient-to-br from-purple-600 to-indigo-600 rounded-3xl flex items-center justify-center">
                    <div className="text-center text-white">
                      <Trophy className="h-16 w-16 mx-auto mb-4" />
                      <h2 className="text-2xl font-bold mb-2">Coding Challenge</h2>
                      <p className="text-purple-100">Scratch to reveal!</p>
                    </div>
                  </div>
                </ScratchToReveal>
              </div>
            ) : (
              selectedChallenge && (
                <div className="w-full max-w-3xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
                  <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Code className="h-8 w-8" />
                        <h2 className="text-2xl font-bold">{selectedChallenge.title}</h2>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedChallenge.difficulty)}`}>
                        {selectedChallenge.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-300" />
                      <span className="text-purple-100">Challenge #{selectedChallenge.id}</span>
                    </div>
                  </div>

                  <div className="p-8 space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">Problem Description</h3>
                      <p className="text-muted-foreground leading-relaxed">{selectedChallenge.description}</p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">Example</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-2xl border">
                        <pre className="text-sm text-foreground whitespace-pre-wrap">{selectedChallenge.example}</pre>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-foreground">Constraints</h3>
                      <ul className="space-y-2">
                        {selectedChallenge.constraints.map((constraint, index) => (
                          <li key={index} className="flex items-center gap-2 text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div>
                            {constraint}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 flex gap-4 justify-center">
                      <Link href="/assessment">
                        <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 px-8 py-3 text-base">
                          Start Coding
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        onClick={() => {
                          setIsRevealed(false);
                          const randomIndex = Math.floor(Math.random() * codingChallenges.length);
                          setSelectedChallenge(codingChallenges[randomIndex]);
                        }}
                        className="px-8 py-3 text-base"
                      >
                        New Challenge
                      </Button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
  );
}