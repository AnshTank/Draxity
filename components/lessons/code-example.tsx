"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, Play } from "lucide-react"

interface CodeExampleProps {
  problem: string
  code: string
  explanation: string
}

export function CodeExample({ problem, code, explanation }: CodeExampleProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-foreground">{problem}</h4>
        <Badge variant="outline">Python</Badge>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">Implementation</CardTitle>
            <div className="flex space-x-2">
              <Button size="sm" variant="outline" onClick={handleCopy}>
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button size="sm" variant="outline">
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm">
            <code className="text-foreground">{code}</code>
          </pre>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">Explanation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm leading-relaxed">{explanation}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-lg font-semibold text-primary">O(n)</div>
            <div className="text-muted-foreground">Time Complexity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-lg font-semibold text-accent">O(1)</div>
            <div className="text-muted-foreground">Space Complexity</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-lg font-semibold text-primary">Easy</div>
            <div className="text-muted-foreground">Difficulty</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
