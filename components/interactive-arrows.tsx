"use client"

import { ArrowDown, ArrowRight, MousePointer2, Zap } from "lucide-react"

export function InteractiveArrows() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Arrow pointing to hero CTA */}
      <div className="absolute top-1/2 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-bounce">
        <div className="flex items-center gap-2 text-blue-500 dark:text-blue-400">
          <ArrowDown className="h-6 w-6" />
          <span className="text-sm font-medium bg-white dark:bg-gray-900 px-2 py-1 rounded-full shadow-sm border">
            Start Here!
          </span>
        </div>
      </div>

      {/* Arrow pointing to courses */}
      <div className="absolute top-3/4 right-1/4 transform translate-x-1/2 animate-pulse">
        <div className="flex items-center gap-2 text-purple-500 dark:text-purple-400">
          <span className="text-sm font-medium bg-white dark:bg-gray-900 px-2 py-1 rounded-full shadow-sm border">
            Explore Courses
          </span>
          <ArrowRight className="h-5 w-5" />
        </div>
      </div>



      {/* Energy indicator */}
      <div className="absolute bottom-1/4 left-1/3 animate-ping">
        <div className="flex items-center gap-2 text-orange-500 dark:text-orange-400">
          <Zap className="h-4 w-4" />
          <span className="text-xs bg-white dark:bg-gray-900 px-2 py-1 rounded-full shadow-sm border">
            Interactive!
          </span>
        </div>
      </div>
    </div>
  )
}
