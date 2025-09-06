"use client";

import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Send, ChevronUp, ChevronDown, Clock, CheckCircle, XCircle } from "lucide-react";

export default function AssessmentPage() {
  const [activeTab, setActiveTab] = useState("question");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(`def twoSum(nums, target):
    # Write your solution here
    pass`);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [testResults, setTestResults] = useState([]);

  const languages = {
    python: { name: "Python3", starter: `def twoSum(nums, target):
    # Write your solution here
    pass` },
    javascript: { name: "JavaScript", starter: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    // Write your solution here
};` },
    java: { name: "Java", starter: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}` },
    cpp: { name: "C++", starter: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};` }
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCode(languages[lang].starter);
  };

  const handleRun = async () => {
    setIsRunning(true);
    setIsConsoleOpen(true);
    setConsoleOutput("Running code...\n");
    
    // Simulate API call
    setTimeout(() => {
      setConsoleOutput(`Input: nums = [2,7,11,15], target = 9
Output: [0,1]

Execution time: 0.5s
Memory usage: 14.2 MB`);
      setIsRunning(false);
    }, 2000);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setIsConsoleOpen(true);
    setConsoleOutput("Running test cases...\n");
    
    // Simulate test cases
    setTimeout(() => {
      const results = [
        { case: "Test Case 1", passed: true, input: "nums = [2,7,11,15], target = 9", expected: "[0,1]", actual: "[0,1]" },
        { case: "Test Case 2", passed: true, input: "nums = [3,2,4], target = 6", expected: "[1,2]", actual: "[1,2]" },
        { case: "Test Case 3", passed: false, input: "nums = [3,3], target = 6", expected: "[0,1]", actual: "[]" }
      ];
      setTestResults(results);
      const passed = results.filter(r => r.passed).length;
      setConsoleOutput(`Test Results: ${passed}/${results.length} test cases passed

${results.map((r, i) => 
  `${r.case}: ${r.passed ? '✓ PASSED' : '✗ FAILED'}
  Input: ${r.input}
  Expected: ${r.expected}
  ${r.passed ? '' : `Actual: ${r.actual}`}`
).join('\n\n')}

${passed === results.length ? '🎉 All test cases passed!' : '❌ Some test cases failed'}`);
      setIsSubmitting(false);
    }, 3000);
  };

  return (
    <>
      <Navigation />
      <div className="h-screen bg-gray-900 flex flex-col">
        <div className="flex-1 flex">
          {/* Left Panel */}
          <div className="w-1/2 bg-gray-800 border-r border-gray-700 flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="bg-gray-700 border-b border-gray-600 rounded-none justify-start p-0">
                <TabsTrigger value="question" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white rounded-none px-4 py-3">
                  Question
                </TabsTrigger>
                <TabsTrigger value="solution" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white rounded-none px-4 py-3">
                  Solution
                </TabsTrigger>
                <TabsTrigger value="submissions" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white rounded-none px-4 py-3">
                  Submissions
                </TabsTrigger>
                <TabsTrigger value="notes" className="data-[state=active]:bg-gray-600 data-[state=active]:text-white rounded-none px-4 py-3">
                  Notes
                </TabsTrigger>
              </TabsList>
              
              <div className="flex-1 overflow-auto">
                <TabsContent value="question" className="p-6 text-white space-y-6 m-0">
                  <div className="flex items-center gap-3 mb-4">
                    <h1 className="text-2xl font-bold">1. Two Sum</h1>
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Easy</span>
                  </div>
                  
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      Given an array of integers <code className="bg-gray-700 text-orange-400 px-2 py-1 rounded">nums</code> and an integer <code className="bg-gray-700 text-orange-400 px-2 py-1 rounded">target</code>, 
                      return <em>indices of the two numbers such that they add up to target</em>.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.
                    </p>
                    <p className="text-gray-300 leading-relaxed">
                      You can return the answer in any order.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="text-sm font-medium mb-3">Example 1:</div>
                      <div className="font-mono text-sm space-y-1">
                        <div><span className="text-gray-400">Input:</span> nums = [2,7,11,15], target = 9</div>
                        <div><span className="text-gray-400">Output:</span> [0,1]</div>
                        <div className="text-gray-400 text-xs mt-2">Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <div className="text-sm font-medium mb-3">Example 2:</div>
                      <div className="font-mono text-sm space-y-1">
                        <div><span className="text-gray-400">Input:</span> nums = [3,2,4], target = 6</div>
                        <div><span className="text-gray-400">Output:</span> [1,2]</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-medium mb-3">Constraints:</div>
                    <ul className="text-gray-300 space-y-1 text-sm">
                      <li>• 2 ≤ nums.length ≤ 10⁴</li>
                      <li>• -10⁹ ≤ nums[i] ≤ 10⁹</li>
                      <li>• -10⁹ ≤ target ≤ 10⁹</li>
                      <li>• Only one valid answer exists.</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="solution" className="p-6 text-white m-0">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Solution Approach</h2>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Hash Map Approach</h3>
                      <p className="text-gray-300 text-sm">
                        Use a hash map to store the complement of each number and its index. 
                        For each number, check if its complement exists in the hash map.
                      </p>
                    </div>
                    <div className="text-sm text-gray-400">
                      Time Complexity: O(n) | Space Complexity: O(n)
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="submissions" className="p-6 text-white m-0">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Your Submissions</h2>
                    <div className="text-gray-400">No submissions yet. Submit your solution to see history.</div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="p-6 text-white m-0">
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold">Personal Notes</h2>
                    <textarea 
                      className="w-full h-64 bg-gray-700 text-white p-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Write your notes here..."
                    />
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Panel */}
          <div className="w-1/2 bg-gray-900 flex flex-col">
            {/* Editor Header */}
            <div className="bg-gray-800 border-b border-gray-700 p-4 flex items-center justify-between">
              <select 
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="bg-gray-700 text-white px-3 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(languages).map(([key, lang]) => (
                  <option key={key} value={key}>{lang.name}</option>
                ))}
              </select>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleRun}
                  disabled={isRunning}
                  variant="outline"
                  size="sm"
                  className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  <Play className="h-4 w-4 mr-2" />
                  {isRunning ? "Running..." : "Run"}
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </div>
            </div>

            {/* Code Editor */}
            <div className="flex-1 relative">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none"
                style={{ fontFamily: 'Monaco, Menlo, Ubuntu Mono, monospace' }}
                spellCheck={false}
              />
            </div>

            {/* Console Panel */}
            <div className={`bg-gray-800 border-t border-gray-700 transition-all duration-300 ${isConsoleOpen ? 'h-64' : 'h-12'}`}>
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-700"
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
              >
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">Console</span>
                  {testResults.length > 0 && (
                    <span className={`text-xs px-2 py-1 rounded ${
                      testResults.every(r => r.passed) ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {testResults.filter(r => r.passed).length}/{testResults.length} Passed
                    </span>
                  )}
                </div>
                {isConsoleOpen ? <ChevronDown className="h-4 w-4 text-gray-400" /> : <ChevronUp className="h-4 w-4 text-gray-400" />}
              </div>
              
              {isConsoleOpen && (
                <div className="p-4 h-52 overflow-auto">
                  <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono">
                    {consoleOutput || "Click 'Run' to execute your code or 'Submit' to run test cases."}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}