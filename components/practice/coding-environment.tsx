"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RotateCcw,
  Play,
  Share,
  Maximize,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
  GripVertical,
  Minimize,
} from "lucide-react";

const languages = [
  {
    id: "c",
    name: "C",
    icon: "🔧",
    template:
      '#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}',
  },
  {
    id: "cpp",
    name: "C++",
    icon: "⚡",
    template:
      '#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!" << endl;\n    return 0;\n}',
  },
  {
    id: "java",
    name: "Java",
    icon: "☕",
    template:
      'public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
  },
  {
    id: "python",
    name: "Python",
    icon: "🐍",
    template: '# Python program\nprint("Hello, World!")',
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "📜",
    template: '// JavaScript program\nconsole.log("Hello, World!");',
  },
  {
    id: "csharp",
    name: "C#",
    icon: "#️⃣",
    template:
      'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}',
  },
  {
    id: "go",
    name: "Go",
    icon: "🔷",
    template:
      'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}',
  },
  {
    id: "php",
    name: "PHP",
    icon: "🌐",
    template: '<?php\necho "Hello, World!";\n?>',
  },
  {
    id: "kotlin",
    name: "Kotlin",
    icon: "🔶",
    template: 'fun main() {\n    println("Hello, World!")\n}',
  },
  {
    id: "rust",
    name: "Rust",
    icon: "⚙️",
    template: 'fn main() {\n    println!("Hello, World!");\n}',
  },
  {
    id: "swift",
    name: "Swift",
    icon: "🍎",
    template: 'import Foundation\n\nprint("Hello, World!")',
  },
  {
    id: "ruby",
    name: "Ruby",
    icon: "💎",
    template: '# Ruby program\nputs "Hello, World!"',
  },
  {
    id: "scala",
    name: "Scala",
    icon: "🔴",
    template:
      'object Main {\n  def main(args: Array[String]): Unit = {\n    println("Hello, World!")\n  }\n}',
  },
  {
    id: "dart",
    name: "Dart",
    icon: "🎯",
    template: 'void main() {\n  print("Hello, World!");\n}',
  },
  {
    id: "typescript",
    name: "TypeScript",
    icon: "📘",
    template: '// TypeScript program\nconsole.log("Hello, World!");',
  },
  {
    id: "r",
    name: "R",
    icon: "📊",
    template: '# R program\nprint("Hello, World!")',
  },
  {
    id: "perl",
    name: "Perl",
    icon: "🐪",
    template: '#!/usr/bin/perl\nprint "Hello, World!\\n";',
  },
  {
    id: "lua",
    name: "Lua",
    icon: "🌙",
    template: '-- Lua program\nprint("Hello, World!")',
  },
  {
    id: "haskell",
    name: "Haskell",
    icon: "λ",
    template: 'main :: IO ()\nmain = putStrLn "Hello, World!"',
  },
];

interface CodingEnvironmentProps {
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

export function CodingEnvironment({
  onFullscreenChange,
}: CodingEnvironmentProps = {}) {
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(languages[0].template);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [middlePanelWidth, setMiddlePanelWidth] = useState(400);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("input");
  const [cursorLine, setCursorLine] = useState(1);
  const { theme: globalTheme } = useTheme();
  const [localTheme, setLocalTheme] = useState("light");

  useEffect(() => {
    if (globalTheme) {
      setLocalTheme(globalTheme);
    }
  }, [globalTheme]);
  const [mounted, setMounted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setMiddlePanelWidth(window.innerWidth * 0.5);
    setMounted(true);
  }, []);

  const handleLanguageChange = (langId: string) => {
    const lang = languages.find((l) => l.id === langId);
    if (lang) {
      setSelectedLanguage(langId);
      setCode(lang.template);
      setOutput("");
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setActiveTab("output");
    setTimeout(() => {
      setOutput(
        `Compiling and running ${
          languages.find((l) => l.id === selectedLanguage)?.name
        }...\n\nHello, World!\n\nProcess finished with exit code 0\nExecution time: 0.15s\nMemory used: 1.2 MB`
      );
      setIsRunning(false);
    }, 2000);
  };

  const handleReset = () => {
    const lang = languages.find((l) => l.id === selectedLanguage);
    if (lang) {
      setCode(lang.template);
      setOutput("");
    }
  };

  const togglePanel = () => {
    setIsPanelCollapsed(!isPanelCollapsed);
  };

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (err) {
        console.error("Error attempting to exit fullscreen:", err);
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(code);
    alert("Code copied to clipboard!");
  };

  const positionCursorAtEnd = () => {
    setTimeout(() => {
      const textarea = document.querySelector(
        "textarea"
      ) as HTMLTextAreaElement;
      if (textarea) {
        const lines = code.split("\n");
        textarea.focus();
        textarea.setSelectionRange(code.length, code.length);
        setCursorLine(lines.length);
      }
    }, 0);
  };

  useEffect(() => {
    positionCursorAtEnd();
  }, [selectedLanguage]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const newFullscreenState = !!document.fullscreenElement;
      setIsFullscreen(newFullscreenState);
      onFullscreenChange?.(newFullscreenState);
    };

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        e.preventDefault();
        e.stopPropagation();
        toggleFullscreen();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("keydown", handleEscKey, { capture: true });

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("keydown", handleEscKey, { capture: true });
    };
  }, [isFullscreen, onFullscreenChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = middlePanelWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = startWidth - (e.clientX - startX);
      setMiddlePanelWidth(
        Math.max(200, Math.min(window.innerWidth * 0.5, newWidth))
      );
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Common line height and font size for perfect alignment
  const lineHeight = 1.5;
  const fontSize = 14;
  const paddingTop = 16;

  return (
    <div
      className={`flex flex-col ${
        localTheme === "dark" ? "bg-black" : "bg-white"
      }`}
      style={{ height: isFullscreen ? "100vh" : "calc(100vh - 65px)" }}
    >
      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Language Selector */}
        <div
          className={`w-28 border-r flex flex-col flex-shrink-0 overflow-y-auto scrollbar-hide ${
            localTheme === "dark"
              ? "bg-gray-950 border-gray-800"
              : "bg-gray-50 border-gray-200"
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <div className="py-4 space-y-4 px-2">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => handleLanguageChange(lang.id)}
                className={`w-24 h-20 flex flex-col items-center justify-center text-xs font-medium transition-all duration-200 rounded-lg ${
                  selectedLanguage === lang.id
                    ? "text-emerald-700 border-2 border-emerald-200 bg-emerald-50 shadow-lg"
                    : localTheme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-gray-800"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
                title={lang.name}
              >
                <span className="text-2xl mb-1 filter grayscale">
                  {lang.icon}
                </span>
                <span className="text-xs leading-tight">{lang.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Code Editor */}
        <div
          className={`flex-1 relative flex flex-col overflow-hidden ${
            localTheme === "dark" ? "bg-black" : "bg-white"
          }`}
        >
          {/* Code Editor Header */}
          <div
            className={`h-16 border-b flex items-center justify-between px-4 flex-shrink-0 ${
              localTheme === "dark"
                ? "bg-gray-950 border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-center space-x-2">
              <span
                className={`text-base ${
                  localTheme === "dark"
                    ? "text-white font-semibold"
                    : "text-gray-800 font-medium"
                }`}
              >
                {languages.find((l) => l.id === selectedLanguage)?.name} Online
                Compiler
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                title="Reset Code"
                className={`${
                  localTheme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                title="Toggle Fullscreen"
                className={`${
                  localTheme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                {isFullscreen ? (
                  <Minimize className="h-4 w-4" />
                ) : (
                  <Maximize className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setLocalTheme(localTheme === "dark" ? "light" : "dark")
                }
                title="Toggle Theme"
                className={`${
                  localTheme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                {localTheme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                title="Share Code"
                className={`${
                  localTheme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <Share className="h-4 w-4" />
              </Button>
              <div
                className={`h-6 w-px ${
                  localTheme === "dark" ? "bg-gray-700" : "bg-gray-300"
                }`}
              ></div>
              <Button
                onClick={handleRun}
                disabled={isRunning}
                className="px-6 py-2 font-semibold shadow-md transition-all duration-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200"
              >
                <Play className="h-4 w-4 mr-2" />
                {isRunning ? "Running..." : "Run Code"}
              </Button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Line Numbers */}
            <div
              className={`w-12 flex flex-col font-mono select-none border-r ${
                localTheme === "dark"
                  ? "bg-gray-950 border-gray-800 text-gray-500"
                  : "bg-gray-50 border-gray-200 text-gray-400"
              }`}
              style={{
                paddingTop: `${paddingTop}px`,
                fontSize: `${fontSize}px`,
                lineHeight: lineHeight,
              }}
            >
              {code.split("\n").map((_, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-end pr-3 ${
                    index + 1 === cursorLine
                      ? localTheme === "dark"
                        ? "bg-gray-700 text-orange-400 font-semibold"
                        : "bg-orange-100 text-orange-600 font-semibold"
                      : localTheme === "dark"
                      ? "hover:bg-gray-800"
                      : "hover:bg-gray-100"
                  }`}
                  style={{
                    height: `${fontSize * lineHeight}px`,
                    lineHeight: `${fontSize * lineHeight}px`,
                  }}
                >
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
                  const target = e.target as HTMLTextAreaElement;
                  const cursorPos = target.selectionStart;
                  const textBeforeCursor = code.substring(0, cursorPos);
                  const lineNumber = textBeforeCursor.split("\n").length;
                  setCursorLine(lineNumber);
                }}
                onKeyUp={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  const cursorPos = target.selectionStart;
                  const textBeforeCursor = code.substring(0, cursorPos);
                  const lineNumber = textBeforeCursor.split("\n").length;
                  setCursorLine(lineNumber);
                }}
                className={`w-full h-full resize-none focus:outline-none border-0 ${
                  localTheme === "dark"
                    ? "bg-black text-white placeholder-gray-500"
                    : "bg-gray-50 text-gray-800 placeholder-gray-400"
                }`}
                style={{
                  fontFamily:
                    'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
                  tabSize: 4,
                  fontSize: `${fontSize}px`,
                  lineHeight: lineHeight,
                  padding: `${paddingTop}px 16px 16px 16px`,
                }}
                spellCheck={false}
                placeholder="Start coding here..."
              />
            </div>
          </div>
        </div>

        {/* Vertical Resizer */}
        <div
          className={`w-1 cursor-col-resize flex items-center justify-center group ${
            localTheme === "dark"
              ? "bg-gray-700 hover:bg-orange-500"
              : "bg-gray-300 hover:bg-orange-500"
          }`}
          onMouseDown={handleMouseDown}
        >
          <GripVertical
            className={`h-4 w-4 ${
              localTheme === "dark"
                ? "text-gray-400 group-hover:text-orange-300"
                : "text-gray-500 group-hover:text-orange-600"
            }`}
          />
        </div>

        {/* Right Panel - Input/Output */}
        {!isPanelCollapsed && (
          <div
            className={`flex flex-col relative border-l overflow-hidden ${
              localTheme === "dark"
                ? "bg-black border-gray-800"
                : "bg-gray-50 border-gray-200"
            }`}
            style={{ width: `${middlePanelWidth}px` }}
          >
            <div
              className={`h-16 flex items-center justify-between px-4 border-b flex-shrink-0 ${
                localTheme === "dark"
                  ? "bg-gray-950 border-gray-800"
                  : "bg-gray-100 border-gray-200"
              }`}
            >
              <div className="flex items-center space-x-10">
                <button
                  onClick={() => setActiveTab("input")}
                  className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${
                    activeTab === "input"
                      ? localTheme === "dark"
                        ? "text-white font-medium border-white"
                        : "text-gray-800 font-normal border-gray-800"
                      : localTheme === "dark"
                      ? "text-gray-400 font-normal border-transparent hover:text-gray-200"
                      : "text-gray-600 font-normal border-transparent hover:text-gray-800"
                  }`}
                >
                  <Upload className="h-4 w-4" />
                  <span>Input</span>
                </button>
                <div
                  className={`h-6 w-px ${
                    localTheme === "dark" ? "bg-gray-700" : "bg-gray-300"
                  }`}
                ></div>
                <button
                  onClick={() => setActiveTab("output")}
                  className={`flex items-center space-x-2 pb-2 border-b-2 transition-all ${
                    activeTab === "output"
                      ? localTheme === "dark"
                        ? "text-white font-medium border-white"
                        : "text-gray-800 font-normal border-gray-800"
                      : localTheme === "dark"
                      ? "text-gray-400 font-normal border-transparent hover:text-gray-200"
                      : "text-gray-600 font-normal border-transparent hover:text-gray-800"
                  }`}
                >
                  <Download className="h-4 w-4" />
                  <span>Output</span>
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePanel}
                className={`${
                  localTheme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div
              className={`flex-1 p-4 overflow-hidden ${
                localTheme === "dark" ? "bg-black" : "bg-white"
              }`}
            >
              {activeTab === "input" ? (
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className={`w-full h-full p-3 text-sm resize-none focus:outline-none border-0 font-mono rounded-md ${
                    localTheme === "dark"
                      ? "bg-black text-white placeholder-gray-500"
                      : "bg-gray-50 text-gray-800 placeholder-gray-400"
                  }`}
                  placeholder="Enter input for your program..."
                />
              ) : (
                <div
                  className={`w-full h-full p-3 rounded-md overflow-auto ${
                    localTheme === "dark"
                      ? "bg-black text-white"
                      : "bg-gray-50 text-gray-800"
                  }`}
                >
                  {output ? (
                    <pre className="text-sm font-mono whitespace-pre-wrap">
                      {output}
                    </pre>
                  ) : (
                    <p
                      className={`text-sm ${
                        localTheme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                      }`}
                    >
                      Output will appear here...
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Collapsed Panel Toggle */}
        {isPanelCollapsed && (
          <div
            className={`w-12 flex items-center justify-center ${
              localTheme === "dark" ? "bg-black" : "bg-gray-50"
            }`}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={togglePanel}
              className={`h-8 w-8 p-0 ${
                localTheme === "dark"
                  ? "hover:bg-gray-700 text-gray-300"
                  : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
              }`}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Border Line */}
      <div
        className={`h-px w-full ${
          localTheme === "dark" ? "bg-gray-700" : "bg-gray-200"
        }`}
      ></div>
    </div>
  );
}
