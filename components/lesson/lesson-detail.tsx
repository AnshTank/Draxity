"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowRight, BookOpen, Code, Clock, Lightbulb, ExternalLink, Youtube } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"

interface LessonData {
  id: string
  title: string
  overview: string
  theory: {
    sections: {
      heading: string
      content: string
    }[]
  }
  diagram: {
    title: string
    content: string
  }
  codeExamples: {
    cpp: string
    python: string
    java: string
  }
  timeComplexity: {
    operation: string
    complexity: string
  }[]
  analogy: {
    title: string
    content: string
  }
  references?: {
    articles: { title: string; url: string }[]
    videos: { title: string; url: string }[]
  }
  nextLesson?: string
}

interface LessonDetailProps {
  lessonData: LessonData
}

export function LessonDetail({ lessonData }: LessonDetailProps) {
  const [isCompleted, setIsCompleted] = useState(false)

  useEffect(() => {
    // Check if lesson is already completed
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '{}')
    const lessonKey = `${window.location.pathname}`
    setIsCompleted(completedLessons[lessonKey] || false)
  }, [])

  const handleFinishLesson = () => {
    // Mark lesson as completed
    const completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '{}')
    const lessonKey = `${window.location.pathname}`
    completedLessons[lessonKey] = true
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons))
    
    // Update module progress
    const moduleProgress = JSON.parse(localStorage.getItem('moduleProgress') || '{}')
    const pathParts = window.location.pathname.split('/')
    const courseId = pathParts[2]
    const moduleId = pathParts[4]
    const lessonId = pathParts[6]
    
    if (!moduleProgress[courseId]) moduleProgress[courseId] = {}
    if (!moduleProgress[courseId][moduleId]) moduleProgress[courseId][moduleId] = { completedLessons: [] }
    
    if (!moduleProgress[courseId][moduleId].completedLessons.includes(lessonId)) {
      moduleProgress[courseId][moduleId].completedLessons.push(lessonId)
    }
    
    localStorage.setItem('moduleProgress', JSON.stringify(moduleProgress))
    
    // Always go back to module
    window.history.back()
  }
  
  const isLastLesson = () => {
    const pathParts = window.location.pathname.split('/')
    const lessonId = pathParts[6]
    return lessonId === '8'
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-blue-950">
        <div className="container mx-auto px-6 py-8 max-w-5xl">
          {/* Header */}
          <div className="mb-8">
            <Button variant="ghost" className="mb-4" onClick={() => window.history.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Module
            </Button>
            
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground mb-3">{lessonData.title}</h1>
              <p className="text-xl text-muted-foreground">{lessonData.overview}</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            {/* Theory Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Theory Explanation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {lessonData.theory.sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold mb-3">{section.heading}</h3>
                    <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Visual Diagram */}
            <Card>
              <CardHeader>
                <CardTitle>{lessonData.diagram.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 p-6 rounded-lg">
                  <pre className="text-sm font-mono whitespace-pre-wrap">{lessonData.diagram.content}</pre>
                </div>
              </CardContent>
            </Card>

            {/* Code Examples */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-green-600" />
                  Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cpp" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="cpp">C++</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                    <TabsTrigger value="java">Java</TabsTrigger>
                  </TabsList>
                  <TabsContent value="cpp">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre><code>{lessonData.codeExamples.cpp}</code></pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="python">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre><code>{lessonData.codeExamples.python}</code></pre>
                    </div>
                  </TabsContent>
                  <TabsContent value="java">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                      <pre><code>{lessonData.codeExamples.java}</code></pre>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Two Column Layout for Complexity & Analogy */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Time Complexity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-orange-600" />
                    Time Complexity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lessonData.timeComplexity.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="font-medium">{item.operation}</span>
                        <Badge variant="secondary">{item.complexity}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Real-world Analogy */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-yellow-600" />
                    {lessonData.analogy.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{lessonData.analogy.content}</p>
                </CardContent>
              </Card>
            </div>

            {/* References Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="h-5 w-5 text-purple-600" />
                  Additional Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    Articles & Documentation
                  </h3>
                  <div className="space-y-2">
                    {lessonData.references?.articles?.map((article, index) => (
                      <a key={index} href={article.url} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{article.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Youtube className="h-4 w-4" />
                    Video Tutorials
                  </h3>
                  <div className="space-y-2">
                    {lessonData.references?.videos?.map((video, index) => (
                      <a key={index} href={video.url} target="_blank" rel="noopener noreferrer" 
                         className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                        <Youtube className="h-4 w-4 text-red-600" />
                        <span className="text-sm">{video.title}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex justify-center pt-6">
              <Button onClick={handleFinishLesson}>
                Finish Lesson
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}