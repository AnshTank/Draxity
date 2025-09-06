"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight } from "lucide-react"

export function TwoPointerDemo() {
  const [array] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9])
  const [target] = useState(10)
  const [leftPointer, setLeftPointer] = useState(0)
  const [rightPointer, setRightPointer] = useState(8)
  const [isPlaying, setIsPlaying] = useState(false)
  const [step, setStep] = useState(0)
  const [found, setFound] = useState(false)
  const [currentSum, setCurrentSum] = useState(0)

  const steps = [
    { left: 0, right: 8, sum: 10, action: "Found target sum!", found: true },
    { left: 0, right: 7, sum: 9, action: "Sum too small, move left pointer right" },
    { left: 1, right: 7, sum: 9, action: "Sum still too small, move left pointer right" },
    { left: 2, right: 7, sum: 10, action: "Found target sum!", found: true },
  ]

  useEffect(() => {
    if (isPlaying && step < steps.length) {
      const timer = setTimeout(() => {
        const currentStep = steps[step]
        setLeftPointer(currentStep.left)
        setRightPointer(currentStep.right)
        setCurrentSum(currentStep.sum)
        setFound(currentStep.found || false)
        setStep(step + 1)

        if (step === steps.length - 1) {
          setIsPlaying(false)
        }
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isPlaying, step])

  const handlePlay = () => {
    if (step >= steps.length) {
      reset()
    }
    setIsPlaying(!isPlaying)
  }

  const reset = () => {
    setLeftPointer(0)
    setRightPointer(8)
    setStep(0)
    setFound(false)
    setCurrentSum(array[0] + array[8])
    setIsPlaying(false)
  }

  useEffect(() => {
    setCurrentSum(array[leftPointer] + array[rightPointer])
  }, [leftPointer, rightPointer, array])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Find Two Numbers that Sum to {target}</h3>
        <p className="text-muted-foreground">Watch how the two pointers move to find the target sum</p>
      </div>

      {/* Array Visualization */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {array.map((num, index) => (
            <div
              key={index}
              className={`w-12 h-12 flex items-center justify-center rounded-lg border-2 font-semibold transition-all duration-300 ${
                index === leftPointer && index === rightPointer
                  ? "bg-primary text-primary-foreground border-primary"
                  : index === leftPointer
                    ? "bg-accent text-accent-foreground border-accent"
                    : index === rightPointer
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "bg-card text-card-foreground border-border"
              }`}
            >
              {num}
            </div>
          ))}
        </div>
      </div>

      {/* Pointer Labels */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          {array.map((_, index) => (
            <div key={index} className="w-12 h-6 flex items-center justify-center text-xs">
              {index === leftPointer && (
                <div className="flex items-center text-accent">
                  <ArrowLeft className="w-3 h-3" />
                  <span className="ml-1">L</span>
                </div>
              )}
              {index === rightPointer && (
                <div className="flex items-center text-secondary">
                  <span className="mr-1">R</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Current State */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-sm text-muted-foreground">Left Pointer</div>
              <div className="text-lg font-semibold text-accent">
                Index {leftPointer}: {array[leftPointer]}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Current Sum</div>
              <div className={`text-lg font-semibold ${found ? "text-primary" : "text-foreground"}`}>
                {currentSum} {found && "✓"}
              </div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Right Pointer</div>
              <div className="text-lg font-semibold text-secondary">
                Index {rightPointer}: {array[rightPointer]}
              </div>
            </div>
          </div>

          {step > 0 && step <= steps.length && (
            <div className="mt-4 p-3 bg-muted rounded-lg text-center">
              <p className="text-sm font-medium">{steps[step - 1]?.action}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Controls */}
      <div className="flex justify-center space-x-3">
        <Button onClick={handlePlay} variant={isPlaying ? "secondary" : "default"}>
          {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isPlaying ? "Pause" : step >= steps.length ? "Restart" : "Play"}
        </Button>
        <Button onClick={reset} variant="outline">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Algorithm Explanation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">How it Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <p>
            <strong>1.</strong> Start with pointers at both ends of the sorted array
          </p>
          <p>
            <strong>2.</strong> Calculate the sum of elements at both pointers
          </p>
          <p>
            <strong>3.</strong> If sum equals target, we found the answer!
          </p>
          <p>
            <strong>4.</strong> If sum is less than target, move left pointer right (increase sum)
          </p>
          <p>
            <strong>5.</strong> If sum is greater than target, move right pointer left (decrease sum)
          </p>
          <p>
            <strong>6.</strong> Repeat until pointers meet or target is found
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
