"use client"

import { useEffect, useState } from "react"
import { ArrowRight, Code, Zap, Target, Star, Lightbulb } from "lucide-react"

export function FloatingElements() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const elements = [
    { icon: Code, delay: 0, x: "10%", y: "20%" },
    { icon: Zap, delay: 1, x: "85%", y: "15%" },
    { icon: Target, delay: 2, x: "15%", y: "70%" },
    { icon: Star, delay: 0.5, x: "90%", y: "60%" },
    { icon: Lightbulb, delay: 1.5, x: "5%", y: "45%" },
    { icon: ArrowRight, delay: 2.5, x: "80%", y: "80%" },
  ]

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((Element, index) => (
        <div
          key={index}
          className="absolute animate-float opacity-10 dark:opacity-5"
          style={{
            left: Element.x,
            top: Element.y,
            animationDelay: `${Element.delay}s`,
            animationDuration: `${4 + index * 0.5}s`,
          }}
        >
          <Element.icon className="w-8 h-8 text-blue-500" />
        </div>
      ))}

      {/* Floating arrows */}
      <div
        className="absolute top-1/4 left-1/3 animate-bounce opacity-20 dark:opacity-10"
        style={{ animationDelay: "1s" }}
      >
        <ArrowRight className="w-6 h-6 text-indigo-500 rotate-45" />
      </div>
      <div
        className="absolute top-3/4 right-1/4 animate-bounce opacity-20 dark:opacity-10"
        style={{ animationDelay: "2s" }}
      >
        <ArrowRight className="w-6 h-6 text-purple-500 -rotate-45" />
      </div>
      <div
        className="absolute top-1/2 left-1/4 animate-pulse opacity-15 dark:opacity-8"
        style={{ animationDelay: "0.5s" }}
      >
        <ArrowRight className="w-5 h-5 text-blue-400 rotate-90" />
      </div>
    </div>
  )
}
