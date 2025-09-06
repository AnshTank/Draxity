"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function ArrayVisualization() {
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [comparing, setComparing] = useState<number[]>([])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Array Sorting Visualization</h3>
        <p className="text-muted-foreground">Watch how bubble sort works step by step</p>
      </div>

      {/* Array Visualization */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {array.map((num, index) => (
            <div
              key={index}
              className={`w-12 h-16 flex items-end justify-center rounded-t-lg border-2 font-semibold transition-all duration-300 ${
                comparing.includes(index)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-card-foreground border-border"
              }`}
              style={{ height: `${(num / 90) * 64 + 16}px` }}
            >
              <span className="text-xs mb-1">{num}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-3">
        <Button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? "Pause" : "Play"}
        </Button>
        <Button variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  )
}
