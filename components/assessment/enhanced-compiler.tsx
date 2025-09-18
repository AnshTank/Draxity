"use client";

import { useState, useEffect } from "react";
import { getProblemById } from "@/lib/assessment-problems";
import Editor from '@monaco-editor/react';

// Simple icon components
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
  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
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

// Console Panel Component
const ConsolePanel = ({
  theme,
  consoleOutput,
  error,
}: {
  theme: string;
  consoleOutput: string;
  error?: string;
}) => {
  return (
    <div
      className={`p-4 rounded border ${
        theme === "dark"
          ? "bg-gray-800 border-gray-600"
          : "bg-white border-gray-300"
      }`}
    >
      {error ? (
        <div>
          <label
            className={`block text-xs font-medium mb-2 ${
              theme === "dark" ? "text-red-400" : "text-red-600"
            }`}
          >
            Error:
          </label>
          <pre
            className={`text-xs font-mono whitespace-pre-wrap p-2 rounded ${
              theme === "dark"
                ? "bg-red-900/20 text-red-400"
                : "bg-red-50 text-red-600"
            }`}
          >
            {error}
          </pre>
        </div>
      ) : consoleOutput ? (
        <div>
          <label
            className={`block text-xs font-medium mb-2 ${
              theme === "dark" ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Output:
          </label>
          <pre
            className={`text-xs font-mono whitespace-pre-wrap p-2 rounded ${
              theme === "dark"
                ? "bg-gray-800 text-gray-300"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {consoleOutput}
          </pre>
        </div>
      ) : (
        <p
          className={`text-xs text-center py-8 ${
            theme === "dark" ? "text-gray-400" : "text-gray-500"
          }`}
        >
          Output will appear here...
        </p>
      )}
    </div>
  );
};

// Test Cases Panel Component
const TestCasesPanel = ({
  theme,
  testCases,
  setTestCases,
  activeTestCase,
  setActiveTestCase,
}: {
  theme: string;
  testCases: Array<{ id: number; input: string }>;
  setTestCases: React.Dispatch<
    React.SetStateAction<Array<{ id: number; input: string }>>
  >;
  activeTestCase: number;
  setActiveTestCase: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const addTestCase = () => {
    const newId = Math.max(...testCases.map((tc) => tc.id)) + 1;
    const currentActiveCase = testCases.find((tc) => tc.id === activeTestCase);
    const inputToCopy =
      currentActiveCase?.input || testCases[testCases.length - 1]?.input || "";
    setTestCases([...testCases, { id: newId, input: inputToCopy }]);
    setActiveTestCase(newId);
  };

  const updateTestCase = (id: number, value: string) => {
    setTestCases(
      testCases.map((tc) => (tc.id === id ? { ...tc, input: value } : tc))
    );
  };

  const removeTestCase = (id: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter((tc) => tc.id !== id));
      if (activeTestCase === id) {
        setActiveTestCase(testCases[0].id);
      }
    }
  };

  const activeCase =
    testCases.find((tc) => tc.id === activeTestCase) || testCases[0];

  return (
    <div className="space-y-4">
      {/* Horizontal Case Tabs */}
      <div className="flex items-center space-x-2">
        {testCases.map((testCase, index) => (
          <button
            key={testCase.id}
            onClick={() => setActiveTestCase(testCase.id)}
            className={`px-4 py-2 text-xs rounded-lg transition-all duration-300 transform hover:scale-105 font-medium cursor-pointer ${
              activeTestCase === testCase.id
                ? theme === "dark"
                  ? "bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg shadow-orange-500/25"
                  : "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/25"
                : theme === "dark"
                ? "bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600 hover:border-gray-500"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400"
            }`}
          >
            Case {index + 1}
          </button>
        ))}
        <button
          onClick={addTestCase}
          className={`px-4 py-2 text-xs rounded-lg border transition-all duration-300 transform hover:scale-105 font-medium cursor-pointer ${
            theme === "dark"
              ? "bg-gradient-to-r from-gray-700 to-gray-600 border-gray-500 text-gray-300 hover:from-gray-600 hover:to-gray-500 shadow-md"
              : "bg-gradient-to-r from-white to-gray-50 border-gray-300 text-gray-700 hover:from-gray-50 hover:to-gray-100 shadow-md"
          }`}
        >
          +
        </button>
      </div>

      {/* Active Case Input */}
      {activeCase && (
        <div
          className={`p-4 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 hover:border-orange-500/50"
              : "bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:border-orange-500/50 hover:shadow-orange-500/10"
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <span
              className={`text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Case {testCases.findIndex((tc) => tc.id === activeTestCase) + 1}
            </span>
            {testCases.length > 1 && (
              <button
                onClick={() => removeTestCase(activeCase.id)}
                className={`text-xs px-2 py-1 rounded transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "text-red-400 hover:bg-red-900/20"
                    : "text-red-600 hover:bg-red-50"
                }`}
              >
                Remove
              </button>
            )}
          </div>

          <textarea
            value={activeCase.input}
            onChange={(e) => updateTestCase(activeCase.id, e.target.value)}
            placeholder="nums = [2,7,11,15]\ntarget = 9\nexpected = [0,1]"
            rows={3}
            className={`w-full px-3 py-2 text-sm font-mono rounded border focus:outline-none focus:ring-1 focus:ring-orange-500 resize-none ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />
        </div>
      )}
    </div>
  );
};

// Results Panel Component
const ResultsPanel = ({
  theme,
  testResults,
  activeResultCase,
  setActiveResultCase,
}: {
  theme: string;
  testResults: Array<{
    case: string;
    passed: boolean;
    expected: string;
    actual: string;
  }>;
  activeResultCase: number;
  setActiveResultCase: React.Dispatch<React.SetStateAction<number>>;
}) => {
  if (testResults.length === 0) {
    return (
      <div
        className={`text-center py-8 ${
          theme === "dark" ? "text-gray-400" : "text-gray-500"
        }`}
      >
        <p className="text-sm">Run your code to see test results...</p>
      </div>
    );
  }

  const activeResult = testResults[activeResultCase - 1] || testResults[0];

  return (
    <div className="space-y-4">
      {/* Horizontal Case Tabs */}
      <div className="flex items-center space-x-2">
        {testResults.map((result, index) => (
          <button
            key={index}
            onClick={() => setActiveResultCase(index + 1)}
            className={`px-3 py-1 text-xs rounded transition-colors flex items-center space-x-1 cursor-pointer ${
              activeResultCase === index + 1
                ? result.passed
                  ? theme === "dark"
                    ? "bg-green-600 text-white"
                    : "bg-green-500 text-white"
                  : theme === "dark"
                  ? "bg-red-600 text-white"
                  : "bg-red-500 text-white"
                : theme === "dark"
                ? "bg-gray-700 border border-gray-600 text-gray-300 hover:bg-gray-600"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {result.passed ? (
              <CheckCircleIcon className="text-green-500" />
            ) : (
              <XCircleIcon className="text-red-400" />
            )}
            <span>Case {index + 1}</span>
          </button>
        ))}
      </div>

      {/* Active Result Details */}
      {activeResult && (
        <div
          className={`p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 to-gray-700 border-gray-600 hover:border-green-500/50"
              : "bg-gradient-to-br from-white to-gray-50 border-gray-300 hover:border-green-500/50 hover:shadow-green-500/10"
          }`}
        >
          <div className="flex items-center space-x-2 mb-3">
            {activeResult.passed ? (
              <CheckCircleIcon className="text-green-500" />
            ) : (
              <XCircleIcon className="text-red-500" />
            )}
            <span
              className={`text-sm font-medium ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              {activeResult.passed ? "Passed" : "Failed"}
            </span>
          </div>

          <div className="space-y-3 text-sm">
            <div>
              <label
                className={`block text-xs font-medium mb-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Input:
              </label>
              <div
                className={`p-3 rounded-lg font-mono text-xs border ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-300 border-gray-700"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                {activeResult.case}
              </div>
            </div>

            <div>
              <label
                className={`block text-xs font-medium mb-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Expected:
              </label>
              <div
                className={`p-3 rounded-lg font-mono text-xs border ${
                  theme === "dark"
                    ? "bg-green-900/20 text-green-400 border-green-700/50"
                    : "bg-green-50 text-green-600 border-green-200"
                }`}
              >
                {activeResult.expected}
              </div>
            </div>

            <div>
              <label
                className={`block text-xs font-medium mb-1 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Output:
              </label>
              <div
                className={`p-3 rounded-lg font-mono text-xs border ${
                  activeResult.passed
                    ? theme === "dark"
                      ? "bg-green-900/20 text-green-400 border-green-700/50"
                      : "bg-green-50 text-green-600 border-green-200"
                    : theme === "dark"
                    ? "bg-red-900/20 text-red-400 border-red-700/50"
                    : "bg-red-50 text-red-600 border-red-200"
                }`}
              >
                {activeResult.actual || "(no output)"}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const languages = [
  {
    id: "c",
    name: "C",
    template:
      "#include <stdio.h>\n#include <stdlib.h>\n\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    // Write your solution here\n    *returnSize = 0;\n    return NULL;\n}",
  },
  {
    id: "cpp",
    name: "C++",
    template:
      "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};",
  },
  {
    id: "java",
    name: "Java",
    template:
      "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}",
  },
  {
    id: "python",
    name: "Python",
    template:
      "def twoSum(nums, target):\n    # Write your solution here\n    pass",
  },
  {
    id: "javascript",
    name: "JavaScript",
    template:
      "function twoSum(nums, target) {\n    // Write your solution here\n}",
  },
];

interface EnhancedCompilerProps {
  problemId?: string | null;
}

export function EnhancedCompiler({
  problemId = null,
}: EnhancedCompilerProps = {}) {
  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(languages[1].template);
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
  const [activeConsoleTab, setActiveConsoleTab] = useState("testcases");
  const [testCases, setTestCases] = useState([
    { id: 1, input: "nums = [2,7,11,15]\ntarget = 9\nexpected = [0,1]" },
    { id: 2, input: "nums = [3,2,4]\ntarget = 6\nexpected = [1,2]" },
    { id: 3, input: "nums = [3,3]\ntarget = 6\nexpected = [0,1]" },
  ]);
  const [consoleOutput, setConsoleOutput] = useState("");
  const [activeTestCase, setActiveTestCase] = useState(1);
  const [activeResultCase, setActiveResultCase] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [showTimeOverModal, setShowTimeOverModal] = useState(false);
  const [currentProblem, setCurrentProblem] = useState<any>(null);
  const [editorInstance, setEditorInstance] = useState<any>(null);
  const [submissions, setSubmissions] = useState<Array<{id: number, code: string, timestamp: string, status: string, language: string, runtime: string, memory: string, notes: string}>>([]);
  const [expandedSubmission, setExpandedSubmission] = useState<number | null>(null);

  useEffect(() => {
    if (problemId) {
      const problem = getProblemById(problemId);
      setCurrentProblem(problem);
      if (problem && problem.id === "two-sum") {
        setCode(`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`);
        setSelectedLanguage("cpp");
      }
    } else {
      // Default to Two Sum problem if no problemId
      const twoSumProblem = getProblemById("two-sum");
      setCurrentProblem(twoSumProblem);
      setCode(`#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`);
      setSelectedLanguage("cpp");
    }
  }, [problemId]);

  useEffect(() => {
    setMounted(true);

    // Restore paused assessment state if exists
    const savedState = localStorage.getItem("pausedAssessment");
    if (savedState) {
      try {
        const assessmentState = JSON.parse(savedState);
        setTimeLeft(assessmentState.timeLeft || 3600);
        setCode(assessmentState.code || languages[3].template);
        setSelectedLanguage(assessmentState.selectedLanguage || "cpp");
        setTestCases(
          assessmentState.testCases || [
            { id: 1, input: "nums = [2,7,11,15]\ntarget = 9" },
            { id: 2, input: "nums = [3,2,4]\ntarget = 6" },
            { id: 3, input: "nums = [3,3]\ntarget = 6" },
          ]
        );
        setActiveTestCase(assessmentState.activeTestCase || 1);
        setActiveTab(assessmentState.activeTab || "description");
        setNotes(assessmentState.notes || "");
        setTestResults(assessmentState.testResults || []);
        setIsPaused(false); // Resume the assessment
        // Clear the saved state after restoration
        localStorage.removeItem("pausedAssessment");
      } catch (error) {
        console.error("Failed to restore assessment state:", error);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setShowTimeOverModal(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleBackToHome = () => {
    if (
      window.confirm(
        "Are you sure you want to leave? Your progress will be lost."
      )
    ) {
      window.location.href = "/";
    }
  };

  const handlePauseTest = () => {
    if (!isPaused) {
      if (
        window.confirm(
          "Do you want to pause the test? You will be redirected to the module page."
        )
      ) {
        setIsPaused(true);
        // Save current state to localStorage
        const assessmentState = {
          timeLeft,
          code,
          selectedLanguage,
          testCases,
          activeTestCase,
          activeTab,
          notes,
          testResults,
          timestamp: Date.now(),
        };
        localStorage.setItem(
          "pausedAssessment",
          JSON.stringify(assessmentState)
        );

        // Navigate to module page when paused
        setTimeout(() => {
          window.location.href = "/courses/dsa-fundamentals/modules/1";
        }, 500);
      }
    } else {
      setIsPaused(false);
    }
  };

  const handleRetakeAssessment = () => {
    setTimeLeft(3600);
    setShowTimeOverModal(false);
    setCode(
      languages.find((l) => l.id === selectedLanguage)?.template ||
        languages[3].template
    );
    setTestResults([]);
    setConsoleOutput("");
    localStorage.removeItem("pausedAssessment");
  };

  const handleReviewConcepts = () => {
    setTimeLeft(3600);
    localStorage.removeItem("pausedAssessment");
    window.location.href = "/courses/dsa-fundamentals/modules/1";
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

      let template = lang.template;
      if (langId === "cpp") {
        template = `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`;;
      }

      setCode(template);
      setTestResults([]);

      if (editorInstance) {
        const monaco = (window as any).monaco;
        if (monaco) {
          monaco.editor.setModelLanguage(editorInstance.getModel(), langId);
        }
        editorInstance.setValue(template);
        const codeLines = template.split('\n');
        editorInstance.setPosition({ lineNumber: codeLines.length, column: 1 });
      }
    }
  };

  const handleRun = async () => {
    setIsRunning(true);
    setConsoleOutput("Compiling and running C++...\n");
    setIsTestResultsCollapsed(false);
    setActiveConsoleTab("console");

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "practice",
          language: "cpp",
          code: code,
          input: ""
        }),
      });

      const result = await response.json();

      if (response.ok) {
        if (result.error) {
          setConsoleOutput(`❌ Compilation/Runtime Error:\n${result.error}`);
        } else {
          setConsoleOutput(`✅ Code executed successfully!\n\nOutput:\n${result.output || '(no output)'}\n\nExecution time: ${result.executionTime || 'N/A'}\nMemory used: ${result.memoryUsed || 'N/A'}`);
        }
      } else {
        setConsoleOutput(`❌ Error: ${result.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setConsoleOutput(`🌐 Network Error: ${error instanceof Error ? error.message : 'Failed to connect to compiler'}`);
    }

    setIsRunning(false);
  };

  const handleRunTests = async () => {
    setIsRunning(true);
    setConsoleOutput("Compiling and running test cases...\n");
    setIsTestResultsCollapsed(false);
    setActiveConsoleTab("console");

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "assessment",
          language: "cpp",
          code: code,
          testCases: testCases,
        }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setConsoleOutput(`❌ Compilation/Test execution failed:\n${result.error || result.message || 'Unknown error'}`);
        setTestResults([]);
        setActiveConsoleTab("console");
      } else if (result.testResults && Array.isArray(result.testResults)) {
        const formattedResults = result.testResults.map((tr: any) => ({
          case: tr.case,
          passed: tr.passed,
          expected: tr.expected,
          actual: tr.actual,
        }));
        setTestResults(formattedResults);
        
        const passedCount = formattedResults.filter(r => r.passed).length;
        const totalCount = formattedResults.length;
        
        const userOutput = result.consoleOutput ? `\nProgram Output:\n${result.consoleOutput}\n` : '';
        
        setConsoleOutput(
          `✅ Code compiled and executed successfully!${userOutput}\n` +
          `📊 Test Results: ${passedCount}/${totalCount} passed\n` +
          `⚡ Execution time: ${result.executionTime || 'N/A'}\n` +
          `💾 Memory usage: N/A\n\n` +
          `${passedCount === totalCount ? '🎉 All test cases passed!' : '⚠️ Some test cases failed. Check Results tab for details.'}`
        );
        
        // Show results tab if there are test results, but keep console output visible
        setActiveConsoleTab("console");
      } else {
        setConsoleOutput("❌ Test execution completed but no results received");
        setTestResults([]);
      }
    } catch (error) {
      setConsoleOutput(`🌐 Network error: ${error instanceof Error ? error.message : 'Failed to connect to compiler'}`);
      setTestResults([]);
    }

    setIsRunning(false);
  };

  const handleSubmit = () => {
    // Check if all test cases pass
    const passedTests = testResults.filter((t) => t.passed).length;
    const totalTests = testResults.length;
    
    if (totalTests === 0) {
      alert("⚠️ Please run test cases first before submitting!");
      return;
    }
    
    if (passedTests !== totalTests) {
      alert(`❌ ${passedTests}/${totalTests} test cases passed. All test cases must pass to submit!`);
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      // Add submission to history
      const newSubmission = {
        id: submissions.length + 1,
        code: code,
        timestamp: new Date().toLocaleString(),
        status: "Accepted",
        language: "C++",
        runtime: "12 ms",
        memory: "8.2 MB",
        notes: notes.trim()
      };
      setSubmissions([...submissions, newSubmission]);
      
      setIsSubmitting(false);
      
      // Show success alert
      alert("🎉 You did great! Just checkout the optimal solution from solution tab.");
      
      // Switch to solution tab
      setActiveTab("solution");
    }, 1500);
  };

  const handleReset = () => {
    const lang = languages.find((l) => l.id === selectedLanguage);
    if (lang) {
      setCode(lang.template);
      setTestResults([]);
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

  return (
    <div
      className={`h-screen flex flex-col overflow-hidden ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Assessment Header */}
      <div
        className={`h-16 border-b flex items-center justify-between px-6 flex-shrink-0 ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-gray-200"
        }`}
      >
        {/* Left Section - Back to Home */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBackToHome}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            <ArrowLeftIcon />
            <span className="font-medium">Back to Home</span>
          </button>
        </div>

        {/* Center Section - Assessment Title */}
        <div className="flex items-center space-x-3">
          <h1
            className={`text-xl font-bold ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            DSA Assessment
          </h1>
          <Badge
            className={`px-3 py-1 text-sm font-medium ${
              theme === "dark"
                ? "bg-blue-600 text-white"
                : "bg-blue-500 text-white"
            }`}
          >
            In Progress
          </Badge>
        </div>

        {/* Right Section - Timer and Controls */}
        <div className="flex items-center space-x-4">
          {/* Timer */}
          <div
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-md border text-sm ${
              timeLeft <= 300
                ? theme === "dark"
                  ? "bg-red-900/20 border-red-600 text-red-400"
                  : "bg-red-50 border-red-300 text-red-600"
                : theme === "dark"
                ? "bg-gray-700 border-gray-600 text-gray-300"
                : "bg-gray-50 border-gray-300 text-gray-700"
            }`}
          >
            <ClockIcon />
            <span className="font-mono font-semibold">
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Pause/Resume Button */}
          <button
            onClick={handlePauseTest}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md border transition-colors cursor-pointer text-sm ${
              isPaused
                ? theme === "dark"
                  ? "border-green-500 text-green-400 hover:bg-green-500/10"
                  : "border-green-500 text-green-600 hover:bg-green-50"
                : theme === "dark"
                ? "border-yellow-500 text-yellow-400 hover:bg-yellow-500/10"
                : "border-yellow-500 text-yellow-600 hover:bg-yellow-50"
            }`}
          >
            {isPaused ? <PlayIcon /> : <PauseIcon />}
            <span className="font-medium">{isPaused ? "Resume" : "Pause"}</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className={`p-2 rounded-lg transition-colors cursor-pointer ${
              theme === "dark"
                ? "text-gray-300 hover:bg-gray-700 hover:text-white"
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            }`}
          >
            {isFullscreen ? <MinimizeIcon /> : <MaximizeIcon />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel */}
        <div
          className={`border-r flex flex-col ${
            theme === "dark"
              ? "bg-gray-800 border-gray-600"
              : "bg-white border-gray-200"
          }`}
          style={{ width: `${leftPanelWidth}%` }}
        >
          <div
            className={`h-12 border-b flex items-center justify-between px-4 relative ${
              theme === "dark"
                ? "bg-gradient-to-r from-gray-800 to-gray-700 border-gray-600"
                : "bg-gradient-to-r from-gray-50 to-blue-50 border-gray-200"
            }`}
          >
            {/* Subtle glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent"></div>
            <div className="flex items-center space-x-4">
              <h1
                className={`text-lg font-bold ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {currentProblem ? currentProblem.title : "1. Two Sum"}
              </h1>
              <Badge
                className={`text-xs px-3 py-1 rounded-full font-medium shadow-sm ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                    : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                }`}
              >
                {currentProblem ? currentProblem.difficulty : "Easy"}
              </Badge>
            </div>
          </div>

          <div
            className={`flex border-b ${
              theme === "dark"
                ? "border-gray-600 bg-gray-750"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <button
              onClick={() => setActiveTab("description")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center cursor-pointer ${
                activeTab === "description"
                  ? "border-orange-500 text-orange-400" +
                    (theme === "dark" ? " bg-gray-800" : " bg-white")
                  : "border-transparent" +
                    (theme === "dark"
                      ? " text-gray-400 hover:text-gray-300"
                      : " text-gray-600 hover:text-gray-900")
              }`}
            >
              <BookOpenIcon />
              <span className="ml-2">Description</span>
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center cursor-pointer ${
                activeTab === "solution"
                  ? "border-orange-500 text-orange-400" +
                    (theme === "dark" ? " bg-gray-800" : " bg-white")
                  : "border-transparent" +
                    (theme === "dark"
                      ? " text-gray-400 hover:text-gray-300"
                      : " text-gray-600 hover:text-gray-900")
              }`}
            >
              <FileTextIcon />
              <span className="ml-2">Solution</span>
            </button>
            <button
              onClick={() => setActiveTab("submissions")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center cursor-pointer ${
                activeTab === "submissions"
                  ? "border-orange-500 text-orange-400" +
                    (theme === "dark" ? " bg-gray-800" : " bg-white")
                  : "border-transparent" +
                    (theme === "dark"
                      ? " text-gray-400 hover:text-gray-300"
                      : " text-gray-600 hover:text-gray-900")
              }`}
            >
              <SendIcon />
              <span className="ml-2">Submissions</span>
            </button>
            <button
              onClick={() => setActiveTab("notes")}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center cursor-pointer ${
                activeTab === "notes"
                  ? "border-orange-500 text-orange-400" +
                    (theme === "dark" ? " bg-gray-800" : " bg-white")
                  : "border-transparent" +
                    (theme === "dark"
                      ? " text-gray-400 hover:text-gray-300"
                      : " text-gray-600 hover:text-gray-900")
              }`}
            >
              <StickyNoteIcon />
              <span className="ml-2">Notes</span>
            </button>
          </div>

          <div className="flex-1 overflow-auto">
            {activeTab === "description" && (
              <div
                className="p-6"
                style={{
                  fontSize: "18px",
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                {currentProblem ? (
                  <div
                    className={`space-y-8 ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                    style={{
                      fontSize: "18px",
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Description
                      </h3>
                      <div className="whitespace-pre-wrap leading-relaxed text-lg">
                        {currentProblem.description}
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Input Format
                      </h3>
                      <div
                        className={`p-4 rounded-lg text-base ${
                          theme === "dark"
                            ? "bg-blue-900/20 border border-blue-700/50 text-blue-200"
                            : "bg-blue-50 border border-blue-200 text-blue-800"
                        }`}
                      >
                        {currentProblem.inputFormat}
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Output Format
                      </h3>
                      <div
                        className={`p-4 rounded-lg text-base ${
                          theme === "dark"
                            ? "bg-green-900/20 border border-green-700/50 text-green-200"
                            : "bg-green-50 border border-green-200 text-green-800"
                        }`}
                      >
                        {currentProblem.outputFormat}
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Examples
                      </h3>
                      {currentProblem.examples.map(
                        (example: any, idx: number) => (
                          <div key={idx} className="mb-6">
                            <p className="font-semibold mb-3 text-lg">
                              Example {idx + 1}:
                            </p>
                            <div
                              className={`p-4 rounded-lg font-mono text-base ${
                                theme === "dark"
                                  ? "bg-gray-800 border border-gray-700"
                                  : "bg-gray-50 border border-gray-200"
                              }`}
                            >
                              <div className="mb-2">
                                <strong>Input:</strong>{" "}
                                {example.input.replace(/\\n/g, "\n")}
                              </div>
                              <div>
                                <strong>Output:</strong> {example.output}
                              </div>
                            </div>
                            <p className="text-base mt-3 text-gray-500">
                              <strong>Explanation:</strong>{" "}
                              {example.explanation}
                            </p>
                          </div>
                        )
                      )}
                    </div>

                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Constraints
                      </h3>
                      <ul className="list-disc list-inside space-y-2">
                        {currentProblem.constraints.map(
                          (constraint: string, idx: number) => (
                            <li key={idx} className="text-base">
                              {constraint}
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Complexity Requirements
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className={`p-4 rounded-lg ${
                            theme === "dark"
                              ? "bg-purple-900/20 border border-purple-700/50"
                              : "bg-purple-50 border border-purple-200"
                          }`}
                        >
                          <div
                            className={`font-semibold mb-2 ${
                              theme === "dark"
                                ? "text-purple-300"
                                : "text-purple-700"
                            }`}
                          >
                            Time Complexity
                          </div>
                          <div
                            className={`text-lg font-mono ${
                              theme === "dark"
                                ? "text-purple-200"
                                : "text-purple-800"
                            }`}
                          >
                            {currentProblem.timeComplexity}
                          </div>
                        </div>
                        <div
                          className={`p-4 rounded-lg ${
                            theme === "dark"
                              ? "bg-orange-900/20 border border-orange-700/50"
                              : "bg-orange-50 border border-orange-200"
                          }`}
                        >
                          <div
                            className={`font-semibold mb-2 ${
                              theme === "dark"
                                ? "text-orange-300"
                                : "text-orange-700"
                            }`}
                          >
                            Space Complexity
                          </div>
                          <div
                            className={`text-lg font-mono ${
                              theme === "dark"
                                ? "text-orange-200"
                                : "text-orange-800"
                            }`}
                          >
                            {currentProblem.spaceComplexity}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Hints
                      </h3>
                      <div className="space-y-3">
                        {currentProblem.hints.map(
                          (hint: string, idx: number) => (
                            <div
                              key={idx}
                              className={`p-4 rounded-lg border-l-4 ${
                                theme === "dark"
                                  ? "bg-yellow-900/20 border-l-yellow-500 text-yellow-200"
                                  : "bg-yellow-50 border-l-yellow-500 text-yellow-800"
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <span
                                  className={`font-semibold text-sm px-2 py-1 rounded ${
                                    theme === "dark"
                                      ? "bg-yellow-700 text-yellow-100"
                                      : "bg-yellow-200 text-yellow-800"
                                  }`}
                                >
                                  Hint {idx + 1}
                                </span>
                                <p className="text-base flex-1">{hint}</p>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div>
                      <h3
                        className={`font-bold mb-4 text-xl ${
                          theme === "dark" ? "text-white" : "text-gray-900"
                        }`}
                      >
                        Topics
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {(
                          currentProblem.topics || [
                            "Array",
                            "Hash Table",
                            "Two Pointers",
                          ]
                        ).map((topic: string, idx: number) => (
                          <span
                            key={idx}
                            className={`px-3 py-2 rounded-lg font-medium ${
                              theme === "dark"
                                ? "bg-blue-900/30 text-blue-300 border border-blue-700/50"
                                : "bg-blue-100 text-blue-700 border border-blue-300"
                            }`}
                            style={{ fontSize: "18px" }}
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`text-center py-8 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <p>No problem selected</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "solution" && (
              <div className="p-6">
                {submissions.length > 0 ? (
                  <div className={`space-y-8 ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}>
                    <div>
                      <h3 className={`font-bold mb-4 text-xl ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Optimal Solution</h3>
                      
                      <div className={`p-4 rounded-lg border mb-6 ${theme === "dark" ? "bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-700/50" : "bg-gradient-to-r from-orange-50 to-red-50 border-orange-200"}`}>
                        <div className="flex justify-between items-center mb-3">
                          <span className={`font-medium text-lg ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Hash Map Approach - O(n) Solution</span>
                          <Badge className="bg-orange-100 text-orange-700">Optimal</Badge>
                        </div>
                        <pre className={`text-sm font-mono p-4 rounded overflow-x-auto mb-3 ${theme === "dark" ? "bg-gray-900 text-gray-300" : "bg-white text-gray-700"}`}>{`#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> pairIdx;
        
        for (int i = 0; i < nums.size(); ++i) {
            int num = nums[i];
            if (pairIdx.find(target - num) != pairIdx.end()) {
                return {i, pairIdx[target - num]};
            }
            pairIdx[num] = i;
        }
        
        return {};
    }
};`}</pre>
                        <p className={`text-base ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>⏱️ Time: O(n) | 💾 Space: O(n) | Single pass with hash map lookup</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    <p>Complete the assessment to unlock the solution</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "submissions" && (
              <div className="p-6">
                <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Submissions</h3>
                
                {submissions.length > 0 ? (
                  <div className="space-y-4">
                    {submissions.map((submission) => (
                      <div key={submission.id} className={`rounded-lg border mb-3 overflow-hidden ${theme === "dark" ? "bg-gray-800 border-gray-600" : "bg-gray-50 border-gray-200"}`}>
                        <div className={`p-4 cursor-pointer hover:bg-opacity-80 transition-colors ${theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"}`} onClick={() => setExpandedSubmission(expandedSubmission === submission.id ? null : submission.id)}>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                              <Badge className="bg-green-100 text-green-700">{submission.status}</Badge>
                              <span className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{submission.language}</span>
                              <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Runtime: {submission.runtime}</span>
                              <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Memory: {submission.memory}</span>
                              {submission.notes && (
                                <button onClick={(e) => { e.stopPropagation(); alert(submission.notes); }} className={`text-xs px-2 py-1 rounded border ${theme === "dark" ? "border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white" : "border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"}`}>
                                  Notes
                                </button>
                              )}
                            </div>
                            <span className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{submission.timestamp}</span>
                          </div>
                        </div>
                        
                        {expandedSubmission === submission.id && (
                          <div className={`border-t p-4 ${theme === "dark" ? "border-gray-600 bg-gray-900" : "border-gray-200 bg-white"}`}>
                            <h5 className={`font-medium mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Submission #{submission.id} Code:</h5>
                            <pre className={`text-xs font-mono p-3 rounded overflow-x-auto ${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-gray-50 text-gray-700"}`}>{submission.code}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={`text-center py-8 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    <p className="text-sm">No submissions yet. Submit your solution to see history.</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "notes" && (
              <div className="p-6">
                <h3
                  className={`text-lg font-semibold mb-4 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
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

        {/* Right Panel */}
        <div
          className={`flex-1 flex flex-col h-full ${
            theme === "dark" ? "bg-gray-900" : "bg-white"
          }`}
        >
          {/* Code Editor Header */}
          <div
            className={`h-12 border-b flex items-center justify-between px-4 flex-shrink-0 ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className={`text-sm px-3 py-1.5 rounded border focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer ${
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
                className={`p-2 rounded transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={handleReset}
              >
                <ResetIcon />
              </button>
              <button
                className={`p-2 rounded transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
                onClick={() => {
                  const newTheme = theme === "dark" ? "light" : "dark";
                  setTheme(newTheme);
                  if (editorInstance) {
                    editorInstance.updateOptions({
                      theme:
                        newTheme === "dark" ? "draxity-dark" : "draxity-light",
                    });
                  }
                }}
              >
                {mounted && (theme === "dark" ? <SunIcon /> : <MoonIcon />)}
              </button>
              <div
                className={`h-6 w-px ${
                  theme === "dark" ? "bg-gray-600" : "bg-gray-300"
                }`}
              ></div>
              <button
                onClick={handleRun}
                disabled={isRunning}
                className={`px-4 py-2 border text-sm font-medium rounded-lg flex items-center space-x-2 disabled:opacity-50 transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "border-green-600 text-green-400 hover:bg-green-600 hover:text-white"
                    : "border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                }`}
              >
                <PlayIcon />
                <span>{isRunning ? "Running..." : "Run"}</span>
              </button>
              <button
                onClick={handleRunTests}
                disabled={isRunning}
                className={`px-4 py-2 border text-sm font-medium rounded-lg flex items-center space-x-2 disabled:opacity-50 transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "border-orange-600 text-orange-400 hover:bg-orange-600 hover:text-white"
                    : "border-orange-500 text-orange-600 hover:bg-orange-500 hover:text-white"
                }`}
              >
                <CheckCircleIcon />
<span>{isRunning ? "Testing..." : "Test Cases"}</span>
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || (testResults.length > 0 && testResults.filter(t => t.passed).length !== testResults.length)}
                className={`px-4 py-2 border text-sm font-medium rounded-lg flex items-center space-x-2 disabled:opacity-50 transition-colors cursor-pointer ${
                  theme === "dark"
                    ? "border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white"
                    : "border-blue-500 text-blue-600 hover:bg-blue-500 hover:text-white"
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
                ? "calc(100% - 48px)"
                : `calc(100% - 48px - ${testResultsHeight}vh)`,
            }}
          >
            {/* Line Numbers */}
            <div
              className={`w-16 flex flex-col font-mono select-none ${
                theme === "dark"
                  ? "bg-gray-900 text-gray-500"
                  : "bg-gray-50 text-gray-400"
              }`}
              style={{ paddingTop: "16px", paddingLeft: "8px", paddingRight: "8px" }}
            >
              <div className="flex-1 overflow-hidden">
                {codeLines.map((_, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-end px-3 text-sm ${
                      index + 1 === cursorLine
                        ? theme === "dark"
                          ? "bg-gray-700 text-orange-400 font-semibold"
                          : "bg-orange-100 text-orange-600 font-semibold"
                        : theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-gray-100"
                    }`}
                    style={{
                      height: "22px",
                      lineHeight: "22px",
                      fontSize: "18px",
                    }}
                  >
                    {index + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1">
              <Editor
                height="100%"
                language="cpp"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme={theme === 'dark' ? 'draxity-dark' : 'draxity-light'}
                options={{
                  fontSize: 18,
                  lineHeight: 22,
                  fontFamily: 'JetBrains Mono, Consolas, Monaco, "Courier New", monospace',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                  insertSpaces: true,
                  wordWrap: 'off',
                  lineNumbers: 'off',
                  glyphMargin: false,
                  folding: false,
                  lineDecorationsWidth: 0,
                  renderLineHighlight: 'line',
                  selectOnLineNumbers: false,
                  roundedSelection: false,
                  readOnly: false,
                  cursorStyle: 'line',
                  padding: { top: 16, bottom: 0, left: 0, right: 0 },
                  contextmenu: true,
                  mouseWheelZoom: false,
                  quickSuggestions: true,
                  acceptSuggestionOnCommitCharacter: true,
                  acceptSuggestionOnEnter: 'on',
                  accessibilitySupport: 'auto'
                }}
                onMount={(editor, monaco) => {
                  setEditorInstance(editor);
                  
                  // Make monaco globally accessible
                  (window as any).monaco = monaco;
                  
                  // Define custom themes to match line numbers background
                  monaco.editor.defineTheme("draxity-dark", {
                    base: "vs-dark",
                    inherit: true,
                    rules: [],
                    colors: {
                      "editor.background": "#111827", // bg-gray-900 to match line numbers
                      "editor.foreground": "#ffffff",
                    },
                  });

                  monaco.editor.defineTheme("draxity-light", {
                    base: "vs",
                    inherit: true,
                    rules: [],
                    colors: {
                      "editor.background": "#f9fafb", // bg-gray-50 to match line numbers
                      "editor.foreground": "#1f2937",
                    },
                  });
                  
                  // Apply the custom theme immediately
                  monaco.editor.setTheme(theme === "dark" ? "draxity-dark" : "draxity-light");
                  
                  editor.onDidChangeCursorPosition((e) => {
                    setCursorLine(e.position.lineNumber);
                  });
                  
                  // Focus editor immediately
                  editor.focus();
                }}
              />
            </div>
          </div>

          {/* Test Cases & Results Panel */}
          <div
            className={`border-t flex flex-col ${
              theme === "dark"
                ? "bg-gray-800 border-gray-600"
                : "bg-gray-50 border-gray-200"
            }`}
            style={{
              height: isTestResultsCollapsed
                ? "48px"
                : `${testResultsHeight}vh`,
            }}
          >
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

            {/* Panel Header */}
            <div
              className={`h-12 flex items-center justify-between px-4 flex-shrink-0 ${
                theme === "dark" ? "bg-gray-750" : "bg-gray-100"
              }`}
            >
              {isTestResultsCollapsed ? (
                <span
                  className={`text-sm font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Console
                </span>
              ) : (
                <div className="flex items-center space-x-6">
                  <button
                    onClick={() => setActiveConsoleTab("testcases")}
                    className={`text-sm font-medium pb-1 border-b-2 transition-colors cursor-pointer ${
                      activeConsoleTab === "testcases"
                        ? "border-orange-500 text-orange-400"
                        : "border-transparent" +
                          (theme === "dark"
                            ? " text-gray-400 hover:text-gray-300"
                            : " text-gray-600 hover:text-gray-900")
                    }`}
                  >
                    Test Case
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("console")}
                    className={`text-sm font-medium pb-1 border-b-2 transition-colors cursor-pointer ${
                      activeConsoleTab === "console"
                        ? "border-orange-500 text-orange-400"
                        : "border-transparent" +
                          (theme === "dark"
                            ? " text-gray-400 hover:text-gray-300"
                            : " text-gray-600 hover:text-gray-900")
                    }`}
                  >
                    Output
                  </button>
                  <button
                    onClick={() => setActiveConsoleTab("results")}
                    className={`text-sm font-medium pb-1 border-b-2 transition-colors flex items-center space-x-2 cursor-pointer ${
                      activeConsoleTab === "results"
                        ? "border-orange-500 text-orange-400"
                        : "border-transparent" +
                          (theme === "dark"
                            ? " text-gray-400 hover:text-gray-300"
                            : " text-gray-600 hover:text-gray-900")
                    }`}
                  >
                    <span>Results</span>
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
                        {passedTests}/{totalTests}
                      </Badge>
                    )}
                  </button>
                </div>
              )}
              <button
                onClick={() =>
                  setIsTestResultsCollapsed(!isTestResultsCollapsed)
                }
                className={`p-2 rounded transition-colors cursor-pointer ${
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

            {/* Panel Content */}
            {!isTestResultsCollapsed && (
              <div className="flex-1 overflow-auto">
                {activeConsoleTab === "testcases" && (
                  <div className="p-4">
                    <TestCasesPanel
                      theme={theme}
                      testCases={testCases}
                      setTestCases={setTestCases}
                      activeTestCase={activeTestCase}
                      setActiveTestCase={setActiveTestCase}
                    />
                  </div>
                )}
                {activeConsoleTab === "console" && (
                  <div className="p-4">
                    <ConsolePanel theme={theme} consoleOutput={consoleOutput} />
                  </div>
                )}
                {activeConsoleTab === "results" && (
                  <div className="p-4">
                    <ResultsPanel
                      theme={theme}
                      testResults={testResults}
                      activeResultCase={activeResultCase}
                      setActiveResultCase={setActiveResultCase}
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Time Over Modal */}
      {showTimeOverModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg p-6 max-w-md w-full mx-4 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-600"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="text-center">
              <div
                className={`text-6xl mb-4 ${
                  theme === "dark" ? "text-red-400" : "text-red-500"
                }`}
              >
                ⏰
              </div>
              <h2
                className={`text-2xl font-bold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                Time's Up!
              </h2>
              <p
                className={`mb-6 ${
                  theme === "dark" ? "text-gray-300" : "text-gray-600"
                }`}
              >
                Your assessment time has ended. What would you like to do?
              </p>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleRetakeAssessment}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    theme === "dark"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  Retake Assessment
                </button>
                <button
                  onClick={handleReviewConcepts}
                  className={`px-6 py-3 rounded-lg font-medium border transition-colors ${
                    theme === "dark"
                      ? "border-gray-600 text-gray-300 hover:bg-gray-700"
                      : "border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  Review Concepts
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
