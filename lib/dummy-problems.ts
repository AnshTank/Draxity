export interface Problem {
  id: number;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  hints: string[];
  testCases: Array<{
    id: number;
    input: string;
    expected: string;
    hidden?: boolean;
  }>;
  starterCode: {
    python: string;
    javascript: string;
    java: string;
    cpp: string;
  };
  tags: string[];
  acceptanceRate: number;
  likes: number;
  dislikes: number;
}

export const DUMMY_PROBLEMS: Problem[] = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6", 
        output: "[1,2]"
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]"
      }
    ],
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹", 
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists."
    ],
    hints: [
      "A brute force approach would be to check all possible pairs.",
      "Use a hash table to store the complement of each number.",
      "The complement of a number x is target - x."
    ],
    testCases: [
      { id: 1, input: "nums = [2,7,11,15], target = 9", expected: "[0,1]" },
      { id: 2, input: "nums = [3,2,4], target = 6", expected: "[1,2]" },
      { id: 3, input: "nums = [3,3], target = 6", expected: "[0,1]" },
      { id: 4, input: "nums = [1,2,3,4], target = 7", expected: "[2,3]", hidden: true },
      { id: 5, input: "nums = [-1,-2,-3,-4,-5], target = -8", expected: "[2,4]", hidden: true }
    ],
    starterCode: {
      python: `def twoSum(nums, target):
    # Write your solution here
    pass`,
      javascript: `var twoSum = function(nums, target) {
    // Write your solution here
};`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Write your solution here
        return new int[0];
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Write your solution here
        return {};
    }
};`
    },
    tags: ["Array", "Hash Table"],
    acceptanceRate: 49.2,
    likes: 42156,
    dislikes: 1342
  },
  {
    id: 2,
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: Open brackets must be closed by the same type of brackets and in the correct order.",
    examples: [
      {
        input: 's = "()"',
        output: "true"
      },
      {
        input: 's = "()[]{}"',
        output: "true"
      },
      {
        input: 's = "(]"',
        output: "false"
      }
    ],
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only '()[]{}'."
    ],
    hints: [
      "Use a stack to keep track of opening brackets.",
      "When you encounter a closing bracket, check if it matches the most recent opening bracket.",
      "The string is valid if the stack is empty at the end."
    ],
    testCases: [
      { id: 1, input: 's = "()"', expected: "true" },
      { id: 2, input: 's = "()[]{}"', expected: "true" },
      { id: 3, input: 's = "(]"', expected: "false" },
      { id: 4, input: 's = "([)]"', expected: "false", hidden: true },
      { id: 5, input: 's = "{[]}"', expected: "true", hidden: true }
    ],
    starterCode: {
      python: `def isValid(s):
    # Write your solution here
    pass`,
      javascript: `var isValid = function(s) {
    // Write your solution here
};`,
      java: `class Solution {
    public boolean isValid(String s) {
        // Write your solution here
        return false;
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        // Write your solution here
        return false;
    }
};`
    },
    tags: ["String", "Stack"],
    acceptanceRate: 40.1,
    likes: 18234,
    dislikes: 1123
  },
  {
    id: 3,
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    description: "You are given the heads of two sorted linked lists list1 and list2. Merge the two lists in a one sorted list. The list should be made by splicing together the nodes of the first two lists.",
    examples: [
      {
        input: "list1 = [1,2,4], list2 = [1,3,4]",
        output: "[1,1,2,3,4,4]"
      },
      {
        input: "list1 = [], list2 = []",
        output: "[]"
      },
      {
        input: "list1 = [], list2 = [0]",
        output: "[0]"
      }
    ],
    constraints: [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 ≤ Node.val ≤ 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    hints: [
      "Use a dummy node to simplify the merging process.",
      "Compare the values of the current nodes and choose the smaller one.",
      "Don't forget to handle the case where one list is exhausted."
    ],
    testCases: [
      { id: 1, input: "list1 = [1,2,4], list2 = [1,3,4]", expected: "[1,1,2,3,4,4]" },
      { id: 2, input: "list1 = [], list2 = []", expected: "[]" },
      { id: 3, input: "list1 = [], list2 = [0]", expected: "[0]" },
      { id: 4, input: "list1 = [5], list2 = [1,2,4]", expected: "[1,2,4,5]", hidden: true }
    ],
    starterCode: {
      python: `def mergeTwoLists(list1, list2):
    # Write your solution here
    pass`,
      javascript: `var mergeTwoLists = function(list1, list2) {
    // Write your solution here
};`,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        // Write your solution here
        return null;
    }
}`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        // Write your solution here
        return nullptr;
    }
};`
    },
    tags: ["Linked List", "Recursion"],
    acceptanceRate: 61.8,
    likes: 15234,
    dislikes: 1456
  },
  {
    id: 4,
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "Dynamic Programming",
    description: "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. A subarray is a contiguous part of an array.",
    examples: [
      {
        input: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        output: "6",
        explanation: "[4,-1,2,1] has the largest sum = 6."
      },
      {
        input: "nums = [1]",
        output: "1"
      },
      {
        input: "nums = [5,4,-1,7,8]",
        output: "23"
      }
    ],
    constraints: [
      "1 ≤ nums.length ≤ 10⁵",
      "-10⁴ ≤ nums[i] ≤ 10⁴"
    ],
    hints: [
      "Try using Kadane's algorithm.",
      "Keep track of the maximum sum ending at each position.",
      "The answer is the maximum of all these values."
    ],
    testCases: [
      { id: 1, input: "nums = [-2,1,-3,4,-1,2,1,-5,4]", expected: "6" },
      { id: 2, input: "nums = [1]", expected: "1" },
      { id: 3, input: "nums = [5,4,-1,7,8]", expected: "23" },
      { id: 4, input: "nums = [-1]", expected: "-1", hidden: true },
      { id: 5, input: "nums = [-2,-1]", expected: "-1", hidden: true }
    ],
    starterCode: {
      python: `def maxSubArray(nums):
    # Write your solution here
    pass`,
      javascript: `var maxSubArray = function(nums) {
    // Write your solution here
};`,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        // Write your solution here
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // Write your solution here
        return 0;
    }
};`
    },
    tags: ["Array", "Dynamic Programming", "Divide and Conquer"],
    acceptanceRate: 49.7,
    likes: 25678,
    dislikes: 1234
  },
  {
    id: 5,
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "Dynamic Programming",
    description: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    examples: [
      {
        input: "n = 2",
        output: "2",
        explanation: "There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps"
      },
      {
        input: "n = 3",
        output: "3",
        explanation: "There are three ways: 1. 1 step + 1 step + 1 step, 2. 1 step + 2 steps, 3. 2 steps + 1 step"
      }
    ],
    constraints: [
      "1 ≤ n ≤ 45"
    ],
    hints: [
      "This is a classic Fibonacci problem.",
      "The number of ways to reach step n is the sum of ways to reach step n-1 and n-2.",
      "You can solve this iteratively to avoid stack overflow."
    ],
    testCases: [
      { id: 1, input: "n = 2", expected: "2" },
      { id: 2, input: "n = 3", expected: "3" },
      { id: 3, input: "n = 1", expected: "1" },
      { id: 4, input: "n = 5", expected: "8", hidden: true },
      { id: 5, input: "n = 10", expected: "89", hidden: true }
    ],
    starterCode: {
      python: `def climbStairs(n):
    # Write your solution here
    pass`,
      javascript: `var climbStairs = function(n) {
    // Write your solution here
};`,
      java: `class Solution {
    public int climbStairs(int n) {
        // Write your solution here
        return 0;
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        // Write your solution here
        return 0;
    }
};`
    },
    tags: ["Math", "Dynamic Programming", "Memoization"],
    acceptanceRate: 51.2,
    likes: 18456,
    dislikes: 567
  }
];

export const getProblemById = (id: number): Problem | undefined => {
  return DUMMY_PROBLEMS.find(problem => problem.id === id);
};

export const getProblemsByDifficulty = (difficulty: "Easy" | "Medium" | "Hard"): Problem[] => {
  return DUMMY_PROBLEMS.filter(problem => problem.difficulty === difficulty);
};

export const getProblemsByCategory = (category: string): Problem[] => {
  return DUMMY_PROBLEMS.filter(problem => problem.category === category);
};