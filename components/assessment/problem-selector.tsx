"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DUMMY_PROBLEMS, Problem } from "@/lib/dummy-problems";
import { ChevronLeft, ChevronRight, Filter, Star, ThumbsUp, Users } from "lucide-react";

interface ProblemSelectorProps {
  currentProblem: Problem;
  onProblemChange: (problem: Problem) => void;
}

export function ProblemSelector({ currentProblem, onProblemChange }: ProblemSelectorProps) {
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showSelector, setShowSelector] = useState(false);

  const filteredProblems = DUMMY_PROBLEMS.filter(problem => {
    const difficultyMatch = filterDifficulty === "all" || problem.difficulty === filterDifficulty;
    const categoryMatch = filterCategory === "all" || problem.category === filterCategory;
    return difficultyMatch && categoryMatch;
  });

  const currentIndex = DUMMY_PROBLEMS.findIndex(p => p.id === currentProblem.id);
  const canGoPrevious = currentIndex > 0;
  const canGoNext = currentIndex < DUMMY_PROBLEMS.length - 1;

  const goToPrevious = () => {
    if (canGoPrevious) {
      onProblemChange(DUMMY_PROBLEMS[currentIndex - 1]);
    }
  };

  const goToNext = () => {
    if (canGoNext) {
      onProblemChange(DUMMY_PROBLEMS[currentIndex + 1]);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-600";
      case "Medium": return "bg-yellow-600";
      case "Hard": return "bg-red-600";
      default: return "bg-gray-600";
    }
  };

  const categories = [...new Set(DUMMY_PROBLEMS.map(p => p.category))];

  if (showSelector) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Select Problem</h2>
            <Button 
              variant="ghost" 
              onClick={() => setShowSelector(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">Filters:</span>
            </div>
            
            <Select value={filterDifficulty} onValueChange={setFilterDifficulty}>
              <SelectTrigger className="w-32 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Easy">Easy</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Hard">Hard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-40 bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="text-sm text-gray-400">
              {filteredProblems.length} problems
            </div>
          </div>

          {/* Problem Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredProblems.map((problem) => (
              <Card 
                key={problem.id} 
                className={`bg-gray-700 border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors ${
                  problem.id === currentProblem.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => {
                  onProblemChange(problem);
                  setShowSelector(false);
                }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white text-lg">
                      {problem.id}. {problem.title}
                    </CardTitle>
                    <Badge className={`${getDifficultyColor(problem.difficulty)} text-white text-xs`}>
                      {problem.difficulty}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="bg-gray-600 px-2 py-1 rounded text-xs">
                      {problem.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{problem.likes}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{problem.acceptanceRate}%</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {problem.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {problem.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="bg-blue-900/30 text-blue-300 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-gray-800 border-b border-gray-700 px-4 py-2">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={goToPrevious}
          disabled={!canGoPrevious}
          className="text-gray-400 hover:text-white disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          onClick={() => setShowSelector(true)}
          className="text-white hover:bg-gray-700 flex items-center space-x-2"
        >
          <span className="font-medium">
            {currentProblem.id}. {currentProblem.title}
          </span>
          <Badge className={`${getDifficultyColor(currentProblem.difficulty)} text-white text-xs ml-2`}>
            {currentProblem.difficulty}
          </Badge>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={goToNext}
          disabled={!canGoNext}
          className="text-gray-400 hover:text-white disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center space-x-4 text-sm text-gray-400">
        <div className="flex items-center space-x-1">
          <ThumbsUp className="h-4 w-4" />
          <span>{currentProblem.likes}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users className="h-4 w-4" />
          <span>{currentProblem.acceptanceRate}%</span>
        </div>
        <span className="bg-gray-700 px-2 py-1 rounded text-xs">
          {currentProblem.category}
        </span>
      </div>
    </div>
  );
}