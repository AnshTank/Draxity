// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import {
//   Play,
//   RotateCcw,
//   CheckCircle,
//   XCircle,
//   Send,
//   Sun,
//   Moon,
//   GripVertical,
//   ChevronDown,
//   ChevronUp,
//   BookOpen,
//   FileText,
//   StickyNote,
//   ArrowLeft,
//   Clock,
//   Maximize,
//   Minimize,
//   Pause,
// } from "lucide-react";
// import { useTheme } from "next-themes";

// const languages = [
//   {
//     id: "python",
//     name: "Python3",
//     template:
//       "def twoSum(nums, target):\n    # Write your solution here\n    pass",
//   },
//   {
//     id: "javascript",
//     name: "JavaScript",
//     template:
//       "function twoSum(nums, target) {\n    // Write your solution here\n}",
//   },
//   {
//     id: "java",
//     name: "Java",
//     template:
//       "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}",
//   },
//   {
//     id: "cpp",
//     name: "C++",
//     template:
//       "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};",
//   },
// ];

// export function EnhancedCompiler() {
//   const [selectedLanguage, setSelectedLanguage] = useState("python");
//   const [code, setCode] = useState(languages[0].template);
//   const [isRunning, setIsRunning] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [testResults, setTestResults] = useState<
//     Array<{ case: string; passed: boolean; expected: string; actual: string }>
//   >([]);
//   const [leftPanelWidth, setLeftPanelWidth] = useState(50);
//   const [testResultsHeight, setTestResultsHeight] = useState(25);
//   const [isTestResultsCollapsed, setIsTestResultsCollapsed] = useState(true);
//   const [cursorLine, setCursorLine] = useState(1);
//   const [activeTab, setActiveTab] = useState("description");
//   const [notes, setNotes] = useState("");
//   const [timeLeft, setTimeLeft] = useState(3600);
//   const [isFullscreen, setIsFullscreen] = useState(false);
//   const { theme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (seconds: number) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleBackToHome = () => {
//     window.location.href = '/';
//   };

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//       setIsFullscreen(true);
//     } else {
//       document.exitFullscreen();
//       setIsFullscreen(false);
//     }
//   };

//   const handleLanguageChange = (langId: string) => {
//     const lang = languages.find((l) => l.id === langId);
//     if (lang) {
//       setSelectedLanguage(langId);
//       setCode(lang.template);
//       setTestResults([]);
//     }
//   };

//   const handleRun = () => {
//     setIsRunning(true);
//     setTimeout(() => {
//       const results = [
//         {
//           case: "nums = [2,7,11,15], target = 9",
//           passed: true,
//           expected: "[0,1]",
//           actual: "[0,1]",
//         },
//         {
//           case: "nums = [3,2,4], target = 6",
//           passed: true,
//           expected: "[1,2]",
//           actual: "[1,2]",
//         },
//         {
//           case: "nums = [3,3], target = 6",
//           passed: false,
//           expected: "[0,1]",
//           actual: "None",
//         },
//       ];
//       setTestResults(results);
//       setIsRunning(false);
//       setIsTestResultsCollapsed(false);
//     }, 2000);
//   };

//   const handleSubmit = () => {
//     setIsSubmitting(true);
//     setTimeout(() => {
//       console.log("Solution submitted successfully!");
//       setIsSubmitting(false);
//     }, 1500);
//   };

//   const handleReset = () => {
//     const lang = languages.find((l) => l.id === selectedLanguage);
//     if (lang) {
//       setCode(lang.template);
//       setTestResults([]);
//     }
//   };

//   const handleVerticalResize = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const startX = e.clientX;
//     const startWidth = leftPanelWidth;

//     const handleMouseMove = (e: MouseEvent) => {
//       const containerWidth = window.innerWidth;
//       const newWidth =
//         startWidth + ((e.clientX - startX) / containerWidth) * 100;
//       setLeftPanelWidth(Math.max(40, Math.min(60, newWidth)));
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   const handleHorizontalResize = (e: React.MouseEvent) => {
//     e.preventDefault();
//     const startY = e.clientY;
//     const startHeight = testResultsHeight;

//     const handleMouseMove = (e: MouseEvent) => {
//       const containerHeight = window.innerHeight;
//       const deltaY = e.clientY - startY;
//       const deltaPercent = (deltaY / containerHeight) * 100;
//       const newHeight = startHeight - deltaPercent;
//       setTestResultsHeight(Math.max(24, Math.min(36, newHeight)));
//     };

//     const handleMouseUp = () => {
//       document.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseup", handleMouseUp);
//     };

//     document.addEventListener("mousemove", handleMouseMove);
//     document.addEventListener("mouseup", handleMouseUp);
//   };

//   const passedTests = testResults.filter((t) => t.passed).length;
//   const totalTests = testResults.length;
//   const lineHeight = 24;
//   const codeLines = code.split("\n");

//   return (
//     <div className="h-screen bg-background flex flex-col overflow-hidden">
//       {/* Top Header with Back to Home, Timer, and Pause */}
//       <div className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
//         <Button variant="ghost" size="sm" onClick={handleBackToHome}>
//           <ArrowLeft className="h-4 w-4 mr-2" />
//           Back to Home
//         </Button>

//         <div className="flex items-center space-x-4">
//           <div className="flex items-center space-x-2 text-sm">
//             <Clock className="h-4 w-4 text-muted-foreground" />
//             <span className={`font-mono ${timeLeft < 300 ? 'text-red-500' : 'text-foreground'}`}>
//               {formatTime(timeLeft)}
//             </span>
//           </div>
//           <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300 dark:hover:bg-orange-900/20 dark:hover:text-orange-300 dark:hover:border-orange-700">
//             <Pause className="h-4 w-4 mr-2" />
//             Pause Test
//           </Button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex">
//         {/* Left Panel */}
//         <div
//           className="bg-background border-r border-border flex flex-col"
//           style={{ width: `${leftPanelWidth}%` }}
//         >
//           {/* Left Panel Header */}
//           <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
//             <div className="flex items-center space-x-4">
//               <h1 className="text-lg font-bold text-foreground">1. Two Sum</h1>
//               <Badge className="bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs px-2 py-1">
//                 Easy
//               </Badge>
//             </div>
//           </div>

//           {/* Tab Navigation */}
//           <div className="flex border-b border-border bg-muted/20">
//             <button
//               onClick={() => setActiveTab("description")}
//               className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === "description"
//                   ? "border-primary text-primary bg-background"
//                   : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
//               }`}
//             >
//               <BookOpen className="h-4 w-4 mr-2 inline" />
//               Description
//             </button>
//             <button
//               onClick={() => setActiveTab("solution")}
//               className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === "solution"
//                   ? "border-primary text-primary bg-background"
//                   : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
//               }`}
//             >
//               <FileText className="h-4 w-4 mr-2 inline" />
//               Solution
//             </button>
//             <button
//               onClick={() => setActiveTab("notes")}
//               className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
//                 activeTab === "notes"
//                   ? "border-primary text-primary bg-background"
//                   : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"
//               }`}
//             >
//               <StickyNote className="h-4 w-4 mr-2 inline" />
//               Notes
//             </button>
//           </div>

//           {/* Tab Content */}
//           <div className="flex-1 overflow-auto">
//             {activeTab === "description" && (
//               <div className="p-6">
//                 <div className="space-y-4 text-sm text-muted-foreground">
//               <p>
//                 Given an array of integers{" "}
//                 <code className="bg-muted/50 px-1.5 py-0.5 rounded text-foreground font-medium">
//                   nums
//                 </code>{" "}
//                 and an integer{" "}
//                 <code className="bg-muted/50 px-1.5 py-0.5 rounded text-foreground font-medium">
//                   target
//                 </code>
//                 , return{" "}
//                 <em className="text-foreground font-medium">
//                   indices of the two numbers such that they add up to target
//                 </em>
//                 .
//               </p>
//               <p>
//                 You may assume that each input would have{" "}
//                 <strong className="text-foreground font-semibold">
//                   exactly one solution
//                 </strong>
//                 , and you may not use the same element twice.
//               </p>

//               <div className="space-y-4">
//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-border">
//                   <div className="text-sm text-foreground font-semibold mb-3">
//                     Example 1:
//                   </div>
//                   <div className="font-mono text-sm space-y-1">
//                     <div>
//                       <span className="text-foreground font-semibold">
//                         Input:
//                       </span>{" "}
//                       <span className="text-foreground/80">
//                         nums = [2,7,11,15], target = 9
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-foreground font-semibold">
//                         Output:
//                       </span>{" "}
//                       <span className="text-foreground/80">[0,1]</span>
//                     </div>
//                     <div>
//                       <span className="text-foreground font-semibold">
//                         Explanation:
//                       </span>{" "}
//                       <span className="text-foreground/80">
//                         Because nums[0] + nums[1] == 9, we return [0, 1].
//                       </span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-border">
//                   <div className="text-sm text-foreground font-semibold mb-3">
//                     Example 2:
//                   </div>
//                   <div className="font-mono text-sm space-y-1">
//                     <div>
//                       <span className="text-foreground font-semibold">
//                         Input:
//                       </span>{" "}
//                       <span className="text-foreground/80">
//                         nums = [3,2,4], target = 6
//                       </span>
//                     </div>
//                     <div>
//                       <span className="text-foreground font-semibold">
//                         Output:
//                       </span>{" "}
//                       <span className="text-foreground/80">[1,2]</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <div className="text-sm font-semibold text-foreground mb-3">
//                   Constraints:
//                 </div>
//                 <ul className="text-foreground/80 space-y-1 text-sm">
//                   <li>
//                     •{" "}
//                     <code className="text-foreground font-medium bg-muted/50 px-1 py-0.5 rounded">
//                       2 ≤ nums.length ≤ 10⁴
//                     </code>
//                   </li>
//                   <li>
//                     •{" "}
//                     <code className="text-foreground font-medium bg-muted/50 px-1 py-0.5 rounded">
//                       -10⁹ ≤ nums[i] ≤ 10⁹
//                     </code>
//                   </li>
//                   <li>
//                     •{" "}
//                     <strong className="text-foreground font-semibold">
//                       Only one valid answer exists.
//                     </strong>
//                   </li>
//                 </ul>
//               </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "solution" && (
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold mb-4 text-foreground">Solution Approach</h3>
//                 <div className="space-y-4 text-sm text-foreground/80">
//                   <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-border">
//                     <h4 className="font-semibold text-foreground mb-2">Hash Map Approach</h4>
//                     <p className="mb-3">
//                       Use a hash map to store the complement of each number as we iterate through the array.
//                     </p>
//                     <div className="space-y-2">
//                       <p><strong className="text-foreground font-semibold">Time Complexity:</strong> O(n)</p>
//                       <p><strong className="text-foreground font-semibold">Space Complexity:</strong> O(n)</p>
//                     </div>
//                   </div>

//                   <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg border border-border">
//                     <h4 className="font-semibold text-foreground mb-2">Algorithm Steps</h4>
//                     <ol className="list-decimal list-inside space-y-1 text-foreground/80">
//                       <li>Create an empty hash map</li>
//                       <li>For each number, calculate its complement (target - current number)</li>
//                       <li>Check if complement exists in hash map</li>
//                       <li>If yes, return indices; if no, store current number and index</li>
//                     </ol>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {activeTab === "notes" && (
//               <div className="p-6">
//                 <h3 className="text-lg font-semibold mb-4 text-foreground">Personal Notes</h3>
//                 <textarea
//                   value={notes}
//                   onChange={(e) => setNotes(e.target.value)}
//                   placeholder="Write your notes, observations, or alternative approaches here..."
//                   className="w-full h-64 p-3 bg-background border border-border rounded-lg text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
//                 />
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Vertical Resizer */}
//         <div
//           className="w-1 bg-border hover:bg-primary cursor-col-resize flex items-center justify-center group"
//           onMouseDown={handleVerticalResize}
//         >
//           <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
//         </div>

//         {/* Code Editor Section */}
//         <div className="flex-1 bg-background flex flex-col">
//           {/* Code Editor Header */}
//           <div className="h-12 bg-card border-b border-border flex items-center justify-between px-4">
//             <select
//               value={selectedLanguage}
//               onChange={(e) => handleLanguageChange(e.target.value)}
//               className="bg-background border border-border text-foreground text-sm px-3 py-1.5 rounded focus:outline-none focus:ring-2 focus:ring-primary"
//             >
//               {languages.map((lang) => (
//                 <option key={lang.id} value={lang.id}>
//                   {lang.name}
//                 </option>
//               ))}
//             </select>

//             <div className="flex items-center space-x-3">
//               <Button variant="ghost" size="sm" onClick={handleReset}>
//                 <RotateCcw className="h-4 w-4" />
//               </Button>
//               <Button variant="ghost" size="sm" onClick={toggleFullscreen}>
//                 {isFullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
//               >
//                 {mounted &&
//                   (theme === "dark" ? (
//                     <Sun className="h-4 w-4" />
//                   ) : (
//                     <Moon className="h-4 w-4" />
//                   ))}
//               </Button>
//               <div className="h-6 w-px bg-border"></div>
//               <Button
//                 onClick={handleRun}
//                 disabled={isRunning}
//                 className="bg-green-600 hover:bg-green-700 text-white"
//               >
//                 <Play className="h-4 w-4 mr-2" />
//                 {isRunning ? "Running..." : "Run"}
//               </Button>
//               <Button
//                 onClick={handleSubmit}
//                 disabled={isSubmitting}
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 <Send className="h-4 w-4 mr-2" />
//                 {isSubmitting ? "Submitting..." : "Submit"}
//               </Button>
//             </div>
//           </div>

//           {/* Code Editor Area */}
//           <div
//             className="flex flex-col flex-1"
//             style={{
//               height: isTestResultsCollapsed
//                 ? "calc(100% - 48px - 48px)" // header + collapsed test results
//                 : `calc(100% - 48px - ${testResultsHeight}vh)`, // header + expanded test results
//             }}
//           >
//             <div className="flex-1 flex overflow-hidden">
//               {/* Line Numbers */}
//               <div className="w-12 bg-background border-r border-border flex flex-col text-muted-foreground font-mono select-none overflow-hidden">
//                 <div
//                   className="flex-1 overflow-y-auto scrollbar-hide"
//                   style={{
//                     paddingTop: "1rem",
//                     paddingBottom: "1rem",
//                   }}
//                 >
//                   {codeLines.map((_, index) => (
//                     <div
//                       key={index}
//                       className={`flex items-center justify-end px-2 text-sm leading-6 ${
//                         index + 1 === cursorLine
//                           ? "bg-primary/20 text-primary font-semibold"
//                           : "hover:bg-muted/30"
//                       }`}
//                       style={{ minHeight: "1.5rem" }}
//                     >
//                       {index + 1}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//               {/* Code Area */}
//               <div className="flex-1 relative overflow-hidden">
//                 <textarea
//                   value={code}
//                   onChange={(e) => setCode(e.target.value)}
//                   onSelect={(e) => {
//                     const target = e.target as HTMLTextAreaElement;
//                     const cursorPos = target.selectionStart;
//                     const textBeforeCursor = code.substring(0, cursorPos);
//                     const lineNumber = textBeforeCursor.split("\n").length;
//                     setCursorLine(lineNumber);
//                   }}
//                   onKeyUp={(e) => {
//                     const target = e.target as HTMLTextAreaElement;
//                     const cursorPos = target.selectionStart;
//                     const textBeforeCursor = code.substring(0, cursorPos);
//                     const lineNumber = textBeforeCursor.split("\n").length;
//                     setCursorLine(lineNumber);
//                   }}
//                   onScroll={(e) => {
//                     const target = e.target as HTMLTextAreaElement;
//                     const lineNumbersDiv = target.parentElement?.previousElementSibling?.firstElementChild as HTMLElement;
//                     if (lineNumbersDiv) {
//                       lineNumbersDiv.scrollTop = target.scrollTop;
//                     }
//                   }}
//                   className="w-full h-full px-4 py-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none border-0 leading-6 scrollbar-hide"
//                   style={{
//                     fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
//                     tabSize: 4,
//                   }}
//                   spellCheck={false}
//                   placeholder="Write your solution here..."
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Test Results Section */}
//           <div
//             className="bg-card border-t border-border flex flex-col"
//             style={{
//               height: isTestResultsCollapsed
//                 ? "48px"
//                 : `${testResultsHeight}vh`,
//             }}
//           >
//             {/* Horizontal Resizer - Only show when not collapsed */}
//             {!isTestResultsCollapsed && (
//               <div
//                 className="h-1 bg-border hover:bg-primary cursor-row-resize flex items-center justify-center group"
//                 onMouseDown={handleHorizontalResize}
//               >
//                 <GripVertical className="h-4 w-4 text-muted-foreground group-hover:text-primary rotate-90" />
//               </div>
//             )}

//             <div className="h-12 flex items-center justify-between px-4 bg-muted/20 flex-shrink-0">
//               <div className="flex items-center space-x-3">
//                 <span className="font-medium text-sm text-foreground">
//                   Test Results
//                 </span>
//                 {testResults.length > 0 && (
//                   <Badge
//                     className={`text-xs ${
//                       passedTests === totalTests
//                         ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
//                         : "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300"
//                     }`}
//                   >
//                     {passedTests}/{totalTests} Passed
//                   </Badge>
//                 )}
//               </div>
//               <button
//                 onClick={() =>
//                   setIsTestResultsCollapsed(!isTestResultsCollapsed)
//                 }
//                 className="p-3 hover:bg-muted/50 rounded transition-colors -m-2"
//               >
//                 {isTestResultsCollapsed ? (
//                   <ChevronDown className="h-4 w-4 text-muted-foreground hover:text-foreground" />
//                 ) : (
//                   <ChevronUp className="h-4 w-4 text-muted-foreground hover:text-foreground" />
//                 )}
//               </button>
//             </div>
//             {!isTestResultsCollapsed && (
//               <div className="flex-1 p-4 overflow-auto">
//                 {testResults.length > 0 ? (
//                   <div className="space-y-3">
//                     {testResults.map((result, index) => (
//                       <div
//                         key={index}
//                         className="bg-background border border-border rounded-lg p-3"
//                       >
//                         <div className="flex items-center space-x-2 mb-2">
//                           {result.passed ? (
//                             <CheckCircle className="h-4 w-4 text-green-500" />
//                           ) : (
//                             <XCircle className="h-4 w-4 text-red-500" />
//                           )}
//                           <span className="text-foreground text-sm font-medium">
//                             Test Case {index + 1}
//                           </span>
//                         </div>
//                         <div className="text-xs font-mono space-y-1">
//                           <div className="text-muted-foreground">
//                             {result.case}
//                           </div>
//                           <div className="text-muted-foreground">
//                             Expected:{" "}
//                             <span className="text-green-600 dark:text-green-400">
//                               {result.expected}
//                             </span>
//                           </div>
//                           <div className="text-muted-foreground">
//                             Output:{" "}
//                             <span
//                               className={
//                                 result.passed
//                                   ? "text-green-600 dark:text-green-400"
//                                   : "text-red-600 dark:text-red-400"
//                               }
//                             >
//                               {result.actual}
//                             </span>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-muted-foreground text-sm">
//                     Run your code to see test results...
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Bottom Border Line */}
//       <div className="h-0.5 bg-border w-full"></div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";

// Simple icon components to replace lucide-react
const PlayIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const ResetIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
    />
  </svg>
);

const MaximizeIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
    />
  </svg>
);

const MinimizeIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 9l6 6m0-6l-6 6m12-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const XCircleIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const SendIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
    />
  </svg>
);

const SunIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
);

const MoonIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
    />
  </svg>
);

const GripVerticalIcon = () => (
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="9" cy="12" r="1" />
    <circle cx="9" cy="5" r="1" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="15" cy="12" r="1" />
    <circle cx="15" cy="5" r="1" />
    <circle cx="15" cy="19" r="1" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 15l7-7 7 7"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 19l-7-7m0 0l7-7m-7 7h18"
    />
  </svg>
);

const ClockIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PauseIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
  </svg>
);

const BookOpenIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const FileTextIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const StickyNoteIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
    />
  </svg>
);

// Badge component
const Badge = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

const languages = [
  { id: "c", name: "C", template: '#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your solution here\n    *returnSize = 0;\n    return NULL;\n}' },
  { id: "cpp", name: "C++", template: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};' },
  { id: "java", name: "Java", template: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}' },
  { id: "python", name: "Python", template: 'def twoSum(nums, target):\n    # Write your solution here\n    pass' },
  { id: "javascript", name: "JavaScript", template: 'function twoSum(nums, target) {\n    // Write your solution here\n}' },
  { id: "csharp", name: "C#", template: 'public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}' },
  { id: "go", name: "Go", template: 'func twoSum(nums []int, target int) []int {\n    // Write your solution here\n    return []int{}\n}' },
  { id: "php", name: "PHP", template: '<?php\nclass Solution {\n    function twoSum($nums, $target) {\n        // Write your solution here\n        return [];\n    }\n}\n?>' },
  { id: "kotlin", name: "Kotlin", template: 'class Solution {\n    fun twoSum(nums: IntArray, target: Int): IntArray {\n        // Write your solution here\n        return intArrayOf()\n    }\n}' },
  { id: "rust", name: "Rust", template: 'impl Solution {\n    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {\n        // Write your solution here\n        vec![]\n    }\n}' },
  { id: "swift", name: "Swift", template: 'class Solution {\n    func twoSum(_ nums: [Int], _ target: Int) -> [Int] {\n        // Write your solution here\n        return []\n    }\n}' },
  { id: "ruby", name: "Ruby", template: 'def two_sum(nums, target)\n    # Write your solution here\nend' },
  { id: "scala", name: "Scala", template: 'object Solution {\n    def twoSum(nums: Array[Int], target: Int): Array[Int] = {\n        // Write your solution here\n        Array()\n    }\n}' },
  { id: "dart", name: "Dart", template: 'class Solution {\n  List<int> twoSum(List<int> nums, int target) {\n    // Write your solution here\n    return [];\n  }\n}' },
  { id: "typescript", name: "TypeScript", template: 'function twoSum(nums: number[], target: number): number[] {\n    // Write your solution here\n    return [];\n}' },
  { id: "r", name: "R", template: 'twoSum <- function(nums, target) {\n    # Write your solution here\n    return(c())\n}' },
  { id: "perl", name: "Perl", template: 'sub twoSum {\n    my ($nums, $target) = @_;\n    # Write your solution here\n    return [];\n}' },
  { id: "lua", name: "Lua", template: 'function twoSum(nums, target)\n    -- Write your solution here\n    return {}\nend' },
  { id: "haskell", name: "Haskell", template: 'twoSum :: [Int] -> Int -> [Int]\ntwoSum nums target = []\n    -- Write your solution here' }
];

export function EnhancedCompiler() {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(languages[0].template);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testResults, setTestResults] = useState<
    Array<{ case: string; passed: boolean; expected: string; actual: string }>
  >([]);
  const [leftPanelWidth, setLeftPanelWidth] = useState(50);
  const [testResultsHeight, setTestResultsHeight] = useState(30);
  const [isTestResultsCollapsed, setIsTestResultsCollapsed] = useState(true);
  const [cursorLine, setCursorLine] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [notes, setNotes] = useState("");
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Set cursor to last line on initial load
    const lines = languages[0].template.split("\n");
    setCursorLine(lines.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleBackToHome = () => {
    window.location.href = '/';
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleLanguageChange = (langId: string) => {
    const lang = languages.find((l) => l.id === langId);
    if (lang) {
      setSelectedLanguage(langId);
      setCode(lang.template);
      setTestResults([]);
      // Set cursor to last line
      const lines = lang.template.split("\n");
      setCursorLine(lines.length);
    }
  };

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const results = [
        {
          case: "nums = [2,7,11,15], target = 9",
          passed: true,
          expected: "[0,1]",
          actual: "[0,1]",
        },
        {
          case: "nums = [3,2,4], target = 6",
          passed: true,
          expected: "[1,2]",
          actual: "[1,2]",
        },
        {
          case: "nums = [3,3], target = 6",
          passed: false,
          expected: "[0,1]",
          actual: "None",
        },
      ];
      setTestResults(results);
      setIsRunning(false);
      setIsTestResultsCollapsed(false);
    }, 2000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Solution submitted successfully!");
      setIsSubmitting(false);
    }, 1500);
  };

  const handleReset = () => {
    const lang = languages.find((l) => l.id === selectedLanguage);
    if (lang) {
      setCode(lang.template);
      setTestResults([]);
      // Set cursor to last line after reset
      const lines = lang.template.split("\n");
      setCursorLine(lines.length);
    }
  };

  const handleVerticalResize = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = leftPanelWidth;

    const handleMouseMove = (e: MouseEvent) => {
      const containerWidth = window.innerWidth;
      const newWidth =
        startWidth + ((e.clientX - startX) / containerWidth) * 100;
      setLeftPanelWidth(Math.max(30, Math.min(70, newWidth)));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleHorizontalResize = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = testResultsHeight;

    const handleMouseMove = (e: MouseEvent) => {
      const containerHeight = window.innerHeight;
      const deltaY = e.clientY - startY;
      const deltaPercent = (deltaY / containerHeight) * 100;
      const newHeight = startHeight - deltaPercent;
      setTestResultsHeight(Math.max(20, Math.min(60, newHeight)));
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const passedTests = testResults.filter((t) => t.passed).length;
  const totalTests = testResults.length;
  const codeLines = code.split("\n");

  // Calculate heights for proper layout
  const consoleHeight = isTestResultsCollapsed ? 48 : testResultsHeight;
  const mainContentHeight = `calc(100vh - ${consoleHeight}${
    isTestResultsCollapsed ? "px" : "vh"
  })`;

  return (
    <div className={`h-screen flex flex-col overflow-hidden ${
      theme === "dark" 
        ? "bg-gray-900 text-white" 
        : "bg-white text-gray-900"
    }`}>
      {/* Top Header with Back to Home, Timer, and Pause */}
      <div className={`h-16 border-b flex items-center justify-between px-6 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-600"
          : "bg-gray-50 border-gray-200"
      }`}>
        <button
          onClick={handleBackToHome}
          className={`flex items-center space-x-2 px-3 py-2 rounded transition-colors ${
            theme === "dark"
              ? "text-gray-300 hover:text-white hover:bg-gray-700"
              : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          }`}
        >
          <ArrowLeftIcon />
          <span>Back to Home</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <ClockIcon className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
            <span className={`font-mono ${
              timeLeft < 300 
                ? "text-red-500" 
                : theme === "dark" ? "text-white" : "text-gray-900"
            }`}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <button className={`flex items-center space-x-2 px-3 py-2 border rounded transition-colors ${
            theme === "dark"
              ? "border-gray-600 text-gray-300 hover:bg-orange-900/20 hover:text-orange-300 hover:border-orange-700"
              : "border-gray-300 text-gray-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300"
          }`}>
            <PauseIcon />
            <span>Pause Test</span>
          </button>
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
        {/* Left Panel - Problem Description */}
        <div
          className={`border-r flex flex-col ${
            theme === "dark"
              ? "bg-gray-800 border-gray-600"
              : "bg-white border-gray-200"
          }`}
          style={{ width: `${leftPanelWidth}%` }}
        >
          {/* Left Panel Header */}
          <div className={`h-12 border-b flex items-center justify-between px-4 ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}>
            <div className="flex items-center space-x-4">
              <h1 className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}>1. Two Sum</h1>
              <Badge className={`text-xs px-2 py-1 ${
                theme === "dark"
                  ? "bg-green-900/40 text-green-300"
                  : "bg-green-100 text-green-700"
              }`}>
                Easy
              </Badge>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className={`flex border-b ${
            theme === "dark"
              ? "border-gray-600 bg-gray-750"
              : "border-gray-200 bg-gray-50"
          }`}>
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center ${
                activeTab === "description"
                  ? "border-orange-500 text-orange-400" + (theme === "dark" ? " bg-gray-800" : " bg-white")
                  : "border-transparent" + (theme === "dark" ? " text-gray-400 hover:text-gray-300" : " text-gray-600 hover:text-gray-900")
              }`}
            >
              <BookOpenIcon />
              <span className="ml-2">Description</span>
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center ${
                activeTab === "solution"
                  ? "border-orange-500 text-orange-400" + (theme === "dark" ? " bg-gray-800" : " bg-white")
                  : "border-transparent" + (theme === "dark" ? " text-gray-400 hover:text-gray-300" : " text-gray-600 hover:text-gray-900")
              }`}
            >
              <FileTextIcon />
              <span className="ml-2">Solution</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center ${
                activeTab === "notes"
                  ? "border-orange-500 text-orange-400" + (theme === "dark" ? " bg-gray-800" : " bg-white")
                  : "border-transparent" + (theme === "dark" ? " text-gray-400 hover:text-gray-300" : " text-gray-600 hover:text-gray-900")
              }`}
            >
              <StickyNoteIcon />
              <span className="ml-2">Notes</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-auto">
            {activeTab === "description" && (
              <div className="p-6">
                <div className={`space-y-4 text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  <p>
                    Given an array of integers{" "}
                    <code className={`px-1.5 py-0.5 rounded ${
                      theme === "dark"
                        ? "bg-gray-700 text-orange-400"
                        : "bg-gray-100 text-orange-600"
                    }`}>
                      nums
                    </code>{" "}
                    and an integer{" "}
                    <code className={`px-1.5 py-0.5 rounded ${
                      theme === "dark"
                        ? "bg-gray-700 text-orange-400"
                        : "bg-gray-100 text-orange-600"
                    }`}>
                      target
                    </code>
                    , return{" "}
                    <em className={theme === "dark" ? "text-gray-200" : "text-gray-800"}>
                      indices of the two numbers such that they add up to target
                    </em>
                    .
                  </p>
                  <p>
                    You may assume that each input would have{" "}
                    <strong className={theme === "dark" ? "text-white" : "text-gray-900"}>
                      exactly one solution
                    </strong>
                    , and you may not use the same element twice.
                  </p>

                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      theme === "dark"
                        ? "bg-gray-750 border-gray-600"
                        : "bg-gray-50 border-gray-200"
                    }`}>
                      <div className={`text-sm font-medium mb-3 ${
                        theme === "dark" ? "text-white" : "text-gray-900"
                      }`}>
                        Example 1:
                      </div>
                      <div className="font-mono text-sm space-y-1">
                        <div>
                          <span className={`font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}>Input:</span>{" "}
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                            nums = [2,7,11,15], target = 9
                          </span>
                        </div>
                        <div>
                          <span className={`font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}>
                            Output:
                          </span>{" "}
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>[0,1]</span>
                        </div>
                        <div>
                          <span className={`font-medium ${
                            theme === "dark" ? "text-white" : "text-gray-900"
                          }`}>
                            Explanation:
                          </span>{" "}
                          <span className={theme === "dark" ? "text-gray-300" : "text-gray-600"}>
                            Because nums[0] + nums[1] == 9, we return [0, 1].
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "solution" && (
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  Solution Approach
                </h3>
                <div className={`space-y-4 text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}>
                  <div className={`p-4 rounded-lg border ${
                    theme === "dark"
                      ? "bg-gray-750 border-gray-600"
                      : "bg-gray-50 border-gray-200"
                  }`}>
                    <h4 className={`font-medium mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}>
                      Hash Map Approach
                    </h4>
                    <p className="mb-3">
                      Use a hash map to store the complement of each number as
                      we iterate through the array.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>
                  Personal Notes
                </h3>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Write your notes here..."
                  className={`w-full h-64 p-3 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    theme === "dark"
                      ? "bg-gray-800 border-gray-600 text-white"
                      : "bg-white border-gray-300 text-gray-900"
                  }`}
                />
              </div>
            )}
          </div>
        </div>

        {/* Vertical Resizer */}
        <div
          className={`w-1 hover:bg-orange-500 cursor-col-resize flex items-center justify-center group ${
            theme === "dark" 
              ? "bg-gray-600 text-gray-400" 
              : "bg-gray-300 text-gray-500"
          }`}
          onMouseDown={handleVerticalResize}
        >
          <GripVerticalIcon />
        </div>

        {/* Right Panel - Code Editor with Console at Bottom */}
        <div className={`flex-1 flex flex-col h-full ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}>
          {/* Code Editor Header */}
          <div className={`h-12 border-b flex items-center justify-between px-4 flex-shrink-0 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className={`text-sm px-3 py-1.5 rounded border focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.name}
                </option>
              ))}
            </select>

            <div className="flex items-center space-x-3">
              <button
                className={`p-2 rounded transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={handleReset}
                title="Reset Code"
              >
                <ResetIcon />
              </button>
              <button
                className={`p-2 rounded transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={toggleFullscreen}
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
              </button>
              <button
                className={`p-2 rounded transition-colors ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                title="Toggle Theme"
              >
                {mounted && (theme === "dark" ? <SunIcon /> : <MoonIcon />)}
              </button>
              <div className={`h-6 w-px ${
                theme === "dark" ? "bg-gray-600" : "bg-gray-300"
              }`}></div>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className={`px-4 py-2.5 text-white text-sm font-medium rounded-lg flex items-center space-x-2 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 border border-gray-500"
                    : "bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 border border-gray-400"
                }`}
              >
                <PlayIcon />
                <span>{isRunning ? "Running..." : "Run"}</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-4 py-2.5 text-white text-sm font-medium rounded-lg flex items-center space-x-2 disabled:opacity-50 transition-all duration-200 shadow-md hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-400 hover:to-indigo-300 border border-indigo-300"
                    : "bg-gradient-to-r from-indigo-400 to-indigo-500 hover:from-indigo-500 hover:to-indigo-600 border border-indigo-300"
                }`}
              >
                <SendIcon />
                <span>{isSubmitting ? "Submitting..." : "Submit"}</span>
              </button>
            </div>
          </div>

          {/* Code Editor Area */}
          <div
            className="flex overflow-hidden"
            style={{
              height: isTestResultsCollapsed
                ? "calc(100% - 48px - 48px)" // header + collapsed console
                : `calc(100% - 48px - ${testResultsHeight}vh)`, // header + expanded console
            }}
          >
            {/* Line Numbers */}
            <div className={`w-16 border-r flex flex-col font-mono select-none ${
              theme === "dark"
                ? "bg-gray-850 border-gray-600 text-gray-500"
                : "bg-gray-50 border-gray-200 text-gray-400"
            }`}>
              <div className="flex-1 overflow-y-auto pt-4 pb-4">
                {codeLines.map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-end px-3 text-sm leading-6 ${
                      index + 1 === cursorLine
                        ? theme === "dark"
                          ? "bg-gray-700 text-orange-400 font-semibold"
                          : "bg-orange-100 text-orange-600 font-semibold"
                        : theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    }`}
                    style={{ minHeight: "1.5rem" }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Code Textarea */}
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
                onScroll={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  const lineNumbersDiv = document.querySelector(
                    ".w-16.bg-gray-850 .overflow-y-auto"
                  ) as HTMLElement;
                  if (lineNumbersDiv) {
                    lineNumbersDiv.scrollTop = target.scrollTop;
                  }
                }}
                className={`w-full h-full px-4 py-4 font-mono text-sm resize-none focus:outline-none border-0 leading-6 ${
                  theme === "dark"
                    ? "bg-gray-900 text-white"
                    : "bg-white text-gray-900"
                }`}
                style={{
                  fontFamily:
                    'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
                  tabSize: 4,
                }}
                spellCheck={false}
                placeholder="Write your solution here..."
              />
            </div>
          </div>

          {/* Console/Test Results - Only on Right Side */}
          <div className={`border-t-2 flex flex-col flex-shrink-0 h-12 min-h-12 ${
            theme === "dark"
              ? "bg-gray-800 border-gray-600"
              : "bg-gray-50 border-gray-200"
          }`}>
            {/* Horizontal Resizer */}
            {!isTestResultsCollapsed && (
              <div
                className={`h-1 hover:bg-orange-500 cursor-row-resize flex items-center justify-center group ${
                  theme === "dark" 
                    ? "bg-gray-600 text-gray-400" 
                    : "bg-gray-300 text-gray-500"
                }`}
                onMouseDown={handleHorizontalResize}
              >
                <div className="rotate-90">
                  <GripVerticalIcon />
                </div>
              </div>
            )}

            {/* Console Header */}
            <div className={`h-full flex items-center justify-between px-4 flex-shrink-0 ${
              theme === "dark" ? "bg-gray-750" : "bg-gray-100"
            }`}>
              <div className="flex items-center space-x-3">
                <span className={`font-medium text-sm ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}>Console</span>
                {testResults.length > 0 && (
                  <Badge
                    className={`text-xs ${
                      passedTests === totalTests
                        ? theme === "dark"
                          ? "bg-green-900/40 text-green-300"
                          : "bg-green-100 text-green-700"
                        : theme === "dark"
                        ? "bg-red-900/40 text-red-300"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {passedTests}/{totalTests} Passed
                  </Badge>
                )}
              </div>
              <button
                onClick={() =>
                  setIsTestResultsCollapsed(!isTestResultsCollapsed)
                }
                className={`p-2 rounded transition-colors ${
                  theme === "dark" 
                    ? "hover:bg-gray-700 text-gray-300" 
                    : "hover:bg-gray-200 text-gray-600"
                }`}
              >
                {isTestResultsCollapsed ? (
                  <ChevronUpIcon />
                ) : (
                  <ChevronDownIcon />
                )}
              </button>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
