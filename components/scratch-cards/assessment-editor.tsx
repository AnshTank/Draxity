"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, RotateCcw, CheckCircle, XCircle, ChevronLeft, Settings, Maximize } from "lucide-react";

export function AssessmentEditor() {
  const [code, setCode] = useState(`def twoSum(nums, target):
    # Write your solution here
    pass`);
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<Array<{case: string, passed: boolean, expected: string, actual: string}>>([]);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      const results = [
        { case: "nums = [2,7,11,15], target = 9", passed: true, expected: "[0,1]", actual: "[0,1]" },
        { case: "nums = [3,2,4], target = 6", passed: true, expected: "[1,2]", actual: "[1,2]" },
        { case: "nums = [3,3], target = 6", passed: false, expected: "[0,1]", actual: "None" },
      ];
      setTestResults(results);
      setIsRunning(false);
    }, 2000);
  };

  const passedTests = testResults.filter(t => t.passed).length;
  const totalTests = testResults.length;

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="text-lg font-medium text-white">1. Two Sum</div>
          <Badge className="bg-emerald-600 text-white text-xs px-2 py-1 rounded-full">Easy</Badge>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
            <Maximize className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-1/2 bg-slate-900 border-r border-slate-700 flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="p-6 space-y-6">
              <div>
                <p className="text-slate-300 leading-relaxed text-sm">
                  Given an array of integers <code className="bg-slate-700 text-orange-400 px-1.5 py-0.5 rounded text-sm">nums</code> and an integer <code className="bg-slate-700 text-orange-400 px-1.5 py-0.5 rounded text-sm">target</code>, 
                  return <em>indices of the two numbers such that they add up to target</em>.
                </p>
                <p className="text-slate-300 leading-relaxed mt-4 text-sm">
                  You may assume that each input would have <strong className="text-white">exactly one solution</strong>, and you may not use the same element twice.
                </p>
              </div>

              <div>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm text-white font-medium mb-3">Example 1:</div>
                    <div className="font-mono text-sm space-y-1">
                      <div><span className="text-white font-medium">Input:</span> <span className="text-slate-300">nums = [2,7,11,15], target = 9</span></div>
                      <div><span className="text-white font-medium">Output:</span> <span className="text-slate-300">[0,1]</span></div>
                    </div>
                  </div>
                  
                  <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <div className="text-sm text-white font-medium mb-3">Example 2:</div>
                    <div className="font-mono text-sm space-y-1">
                      <div><span className="text-white font-medium">Input:</span> <span className="text-slate-300">nums = [3,2,4], target = 6</span></div>
                      <div><span className="text-white font-medium">Output:</span> <span className="text-slate-300">[1,2]</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-sm font-medium text-white mb-3">Constraints:</div>
                <ul className="text-slate-300 space-y-1 text-sm">
                  <li>• <code className="text-orange-400">2 &lt;= nums.length &lt;= 10^4</code></li>
                  <li>• <code className="text-orange-400">-10^9 &lt;= nums[i] &lt;= 10^9</code></li>
                  <li>• <strong className="text-white">Only one valid answer exists.</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col bg-slate-900">
          <div className="bg-slate-800 border-b border-slate-700 px-4 py-3">
            <div className="flex items-center justify-between">
              <select className="bg-slate-700 text-white text-sm px-3 py-1.5 rounded border border-slate-600 focus:outline-none focus:border-emerald-500">
                <option>Python3</option>
                <option>JavaScript</option>
                <option>Java</option>
              </select>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-700 text-xs px-3 py-1.5">
                  Reset
                </Button>
                <Button size="sm" onClick={handleRun} disabled={isRunning} className="bg-slate-700 hover:bg-slate-600 text-white text-xs px-3 py-1.5 border border-slate-600">
                  <Play className="h-3 w-3 mr-1" />
                  {isRunning ? "Running..." : "Run"}
                </Button>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs px-3 py-1.5">
                  Submit
                </Button>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col">
            <div className="bg-slate-800 px-4 py-2 border-b border-slate-700">
              <div className="text-xs text-slate-400">Code</div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 p-4 bg-slate-900 text-white font-mono text-sm resize-none focus:outline-none border-0 leading-6"
              style={{ fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace' }}
              placeholder="# Write your solution here..."
            />
          </div>

          <div className="h-64 bg-slate-800 border-t border-slate-700">
            <div className="px-4 py-3 border-b border-slate-700">
              <div className="flex items-center space-x-3">
                <div className="text-xs text-slate-400">Testcase</div>
                {testResults.length > 0 && (
                  <div className={`text-xs px-2 py-1 rounded ${
                    passedTests === totalTests ? "bg-emerald-600 text-white" : "bg-red-600 text-white"
                  }`}>
                    {passedTests}/{totalTests} Passed
                  </div>
                )}
              </div>
            </div>
            <div className="p-4 h-full overflow-auto">
              {testResults.length > 0 ? (
                <div className="space-y-3">
                  {testResults.map((result, index) => (
                    <div key={index} className="bg-slate-900 border border-slate-700 rounded p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        {result.passed ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                        <span className="text-white text-sm font-medium">Case {index + 1}</span>
                      </div>
                      <div className="text-xs font-mono space-y-1">
                        <div className="text-slate-300">{result.case}</div>
                        <div className="text-slate-400">
                          Expected: <span className="text-emerald-400">{result.expected}</span>
                        </div>
                        <div className="text-slate-400">
                          Output: <span className={result.passed ? "text-emerald-400" : "text-red-400"}>{result.actual}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-slate-400 text-sm">You must run your code first.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}