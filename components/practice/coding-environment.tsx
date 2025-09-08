"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RotateCcw, Play, Share, Maximize, Sun, Moon, ChevronLeft, ChevronRight, Download, Upload } from "lucide-react"
import { useTheme } from "next-themes"

const languages = [
  { id: 'cpp', name: 'C++', icon: 'C++', template: '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}' },
  { id: 'java', name: 'Java', icon: 'Java', template: 'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}' },
  { id: 'python', name: 'Python', icon: 'Py', template: '# Python program\nprint("Hello, World!")' },
  { id: 'javascript', name: 'JavaScript', icon: 'JS', template: '// JavaScript program\nconsole.log("Hello, World!");' },
  { id: 'csharp', name: 'C#', icon: 'C#', template: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}' },
  { id: 'go', name: 'Go', icon: 'Go', template: 'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}' },
  { id: 'php', name: 'PHP', icon: 'PHP', template: '<?php\necho "Hello, World!";\n?>' },
  { id: 'kotlin', name: 'Kotlin', icon: 'Kt', template: 'fun main() {\n    println("Hello, World!")\n}' }
]

export function CodingEnvironment() {
  const [selectedLanguage, setSelectedLanguage] = useState('cpp')
  const [code, setCode] = useState(languages[0].template)
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [middlePanelWidth, setMiddlePanelWidth] = useState(400)
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false)
  const [activeTab, setActiveTab] = useState('output')
  const [cursorLine, setCursorLine] = useState(1)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMiddlePanelWidth(window.innerWidth * 0.5)
    setMounted(true)
  }, [])

  const handleLanguageChange = (langId: string) => {
    const lang = languages.find(l => l.id === langId)
    if (lang) {
      setSelectedLanguage(langId)
      setCode(lang.template)
      setOutput('')
    }
  }

  const handleRun = () => {
    setIsRunning(true)
    setTimeout(() => {
      setOutput(`Compiling and running ${languages.find(l => l.id === selectedLanguage)?.name}...\n\nHello, World!\n\nProcess finished with exit code 0\nExecution time: 0.15s\nMemory used: 1.2 MB`)
      setActiveTab('output')
      setIsRunning(false)
    }, 2000)
  }

  const handleReset = () => {
    const lang = languages.find(l => l.id === selectedLanguage)
    if (lang) {
      setCode(lang.template)
      setOutput('')
    }
  }

  const togglePanel = () => {
    setIsPanelCollapsed(!isPanelCollapsed)
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const startX = e.clientX
    const startWidth = middlePanelWidth

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth + (e.clientX - startX)
      setMiddlePanelWidth(Math.max(200, Math.min(window.innerWidth * 0.5, newWidth)))
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Main Editor Area */}
      <div className="flex-1 flex max-h-[calc(100vh-6rem)]">
        {/* Left Sidebar - Language Selector */}
        <div className="w-24 bg-card border-r border-border flex flex-col items-center py-4 space-y-3">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => handleLanguageChange(lang.id)}
              className={`w-20 h-20 flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 rounded-md ${
                selectedLanguage === lang.id 
                  ? 'text-primary border-2 border-primary bg-green-100 dark:bg-green-900/40' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/20'
              }`}
              title={lang.name}
            >
              <span className="text-lg font-bold mb-1">{lang.icon}</span>
              <span className="text-xs">{lang.name}</span>
            </button>
          ))}
        </div>
          {/* Code Editor */}
          <div className="flex-1 relative bg-background flex flex-col">
            {/* Code Editor Header */}
            <div className="h-16 bg-card border-b border-border flex items-center justify-between px-4">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-foreground text-base">
                  {languages.find(l => l.id === selectedLanguage)?.name} Online Compiler
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm" onClick={handleReset} className="hover:bg-muted">
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Maximize className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:bg-muted">
                  {mounted && (theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />)}
                </Button>
                <Button variant="ghost" size="sm" className="hover:bg-muted">
                  <Share className="h-4 w-4" />
                </Button>
                <div className="h-6 w-px bg-border"></div>
                <Button 
                  onClick={handleRun} 
                  disabled={isRunning}
                  className="bg-black hover:bg-gray-800 text-white px-6 py-2 font-semibold shadow-md"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
              </div>
            </div>
            <div className="flex-1 flex min-h-0">
              {/* Line Numbers */}
              <div className="w-12 bg-background flex flex-col text-muted-foreground font-mono select-none" style={{ paddingTop: 'calc(1rem + 6px)' }}>
                {code.split('\n').map((_, index) => (
                  <div key={index} className={`flex items-center justify-end pr-3 text-sm ${
                    index + 1 === cursorLine 
                      ? 'bg-primary/20 text-primary font-semibold' 
                      : 'hover:bg-muted/30'
                  }`} style={{ height: '1.5rem', lineHeight: '1.5rem', fontSize: '0.875rem', zoom: '1.3' }}>
                    {index + 1}
                  </div>
                ))}
              </div>
              {/* Code Area */}
              <div className="flex-1 relative">
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onSelect={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    const cursorPos = target.selectionStart
                    const textBeforeCursor = code.substring(0, cursorPos)
                    const lineNumber = textBeforeCursor.split('\n').length
                    setCursorLine(lineNumber)
                  }}
                  onKeyUp={(e) => {
                    const target = e.target as HTMLTextAreaElement
                    const cursorPos = target.selectionStart
                    const textBeforeCursor = code.substring(0, cursorPos)
                    const lineNumber = textBeforeCursor.split('\n').length
                    setCursorLine(lineNumber)
                  }}
                  className="w-full h-full pl-4 pr-4 pt-4 pb-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none border-0"
                  style={{ 
                    fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
                    tabSize: 4,
                    zoom: '1.3',
                    lineHeight: '1.5rem',
                    fontSize: '0.875rem'
                  }}
                  spellCheck={false}
                  placeholder="Start coding here..."
                />
              </div>
            </div>
          </div>

          {/* Separation Line */}
          <div className="w-px bg-border"></div>

          {/* Right Panel - Input/Output */}
          {!isPanelCollapsed && (
            <div 
              className="bg-card flex flex-col relative"
              style={{ width: `${middlePanelWidth}px` }}
            >
              <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => setActiveTab('input')}
                    className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${
                      activeTab === 'input'
                        ? 'text-foreground font-bold border-foreground'
                        : 'text-muted-foreground font-normal border-transparent hover:text-foreground/80'
                    }`}
                  >
                    <Upload className="h-4 w-4" />
                    <span>Input</span>
                  </button>
                  <div className="h-6 w-px bg-border"></div>
                  <button
                    onClick={() => setActiveTab('output')}
                    className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${
                      activeTab === 'output'
                        ? 'text-foreground font-bold border-foreground'
                        : 'text-muted-foreground font-normal border-transparent hover:text-foreground/80'
                    }`}
                  >
                    <Download className="h-4 w-4" />
                    <span>Output</span>
                  </button>
                </div>
                <Button variant="ghost" size="sm" onClick={togglePanel}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="w-full h-px bg-border"></div>
              
              <div className="flex-1 p-4 min-h-0">
                {activeTab === 'input' ? (
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-full p-3 bg-background text-foreground text-sm resize-none focus:outline-none border-0 font-mono"
                    placeholder="Enter input for your program..."
                  />
                ) : (
                  <div className="w-full h-full p-3 bg-muted/30 border border-border rounded-md overflow-auto">
                    {output ? (
                      <pre className="text-sm font-mono text-foreground whitespace-pre-wrap">{output}</pre>
                    ) : (
                      <p className="text-muted-foreground text-sm">Output will appear here...</p>
                    )}
                  </div>
                )}
              </div>
              
              {/* Resize Handle */}
              <div 
                className="absolute left-0 top-0 w-1 h-full bg-border hover:bg-primary cursor-col-resize transition-colors"
                onMouseDown={handleMouseDown}
              ></div>
            </div>
          )}

          {/* Collapsed Panel Toggle */}
          {isPanelCollapsed && (
            <div className="w-12 bg-card flex items-center justify-center">
              <Button variant="ghost" size="sm" onClick={togglePanel} className="h-8 w-8 p-0">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </div>
          )}
      </div>
      
      {/* Bottom Separation Line */}
      <div className="h-px bg-border w-full"></div>
    </div>
  )
}