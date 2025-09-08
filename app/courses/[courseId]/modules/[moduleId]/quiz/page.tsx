import { QuizInterface } from "@/components/quiz/quiz-interface";
import { notFound } from "next/navigation";

// Quiz data for different modules
const quizData = {
  "dsa-fundamentals": {
    "1": {
      id: "1",
      title: "Arrays & Strings Quiz",
      description: "Test your understanding of arrays, strings, and related algorithms",
      timeLimit: 30, // minutes
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: "What is the time complexity of accessing an element in an array by index?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correctAnswer: 0,
          explanation: "Array elements can be accessed directly using their index, which takes constant time O(1)."
        },
        {
          id: 2,
          question: "Which technique is best for finding a pair of numbers that sum to a target in a sorted array?",
          options: ["Brute Force", "Two Pointers", "Binary Search", "Hash Map"],
          correctAnswer: 1,
          explanation: "Two pointers technique is optimal for sorted arrays, providing O(n) time complexity."
        },
        {
          id: 3,
          question: "What is the space complexity of the sliding window technique?",
          options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
          correctAnswer: 0,
          explanation: "Sliding window typically uses constant extra space O(1) regardless of input size."
        },
        {
          id: 4,
          question: "In string pattern matching, what is the time complexity of the brute force approach?",
          options: ["O(n)", "O(m)", "O(n + m)", "O(n × m)"],
          correctAnswer: 3,
          explanation: "Brute force checks every position in text (n) against pattern (m), giving O(n × m)."
        },
        {
          id: 5,
          question: "Which operation is most efficient at the end of a dynamic array?",
          options: ["Insert", "Delete", "Search", "Both Insert and Delete"],
          correctAnswer: 3,
          explanation: "Both insertion and deletion at the end of a dynamic array are O(1) operations."
        },
        {
          id: 6,
          question: "What happens when you rotate an array [1,2,3,4,5] to the right by 2 positions?",
          options: ["[3,4,5,1,2]", "[4,5,1,2,3]", "[5,1,2,3,4]", "[2,3,4,5,1]"],
          correctAnswer: 1,
          explanation: "Right rotation by 2 moves last 2 elements to front: [4,5,1,2,3]."
        },
        {
          id: 7,
          question: "In the two pointers technique, when do you move the left pointer?",
          options: ["Always", "When sum is too small", "When sum is too large", "Never"],
          correctAnswer: 1,
          explanation: "Move left pointer when current sum is smaller than target to increase the sum."
        },
        {
          id: 8,
          question: "What is the maximum number of elements you need to check in binary search?",
          options: ["n", "n/2", "log n", "√n"],
          correctAnswer: 2,
          explanation: "Binary search eliminates half the elements each step, requiring at most log n comparisons."
        },
        {
          id: 9,
          question: "Which string operation typically creates a new string object in most languages?",
          options: ["Access character", "Get length", "Concatenation", "Comparison"],
          correctAnswer: 2,
          explanation: "String concatenation often creates new string objects due to immutability in many languages."
        },
        {
          id: 10,
          question: "What is the key advantage of the sliding window technique over brute force?",
          options: ["Uses less memory", "Reduces time complexity", "Easier to implement", "Works with any data type"],
          correctAnswer: 1,
          explanation: "Sliding window reduces time complexity from O(n²) to O(n) by avoiding redundant calculations."
        }
      ],
      codingProblem: {
        title: "Two Sum Problem",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
        examples: [
          {
            input: "nums = [2,7,11,15], target = 9",
            output: "[0,1]",
            explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
          },
          {
            input: "nums = [3,2,4], target = 6", 
            output: "[1,2]",
            explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
          }
        ],
        constraints: [
          "2 ≤ nums.length ≤ 10⁴",
          "-10⁹ ≤ nums[i] ≤ 10⁹", 
          "-10⁹ ≤ target ≤ 10⁹",
          "Only one valid answer exists."
        ],
        starterCode: {
          python: "def twoSum(nums, target):\n    # Write your solution here\n    pass",
          javascript: "function twoSum(nums, target) {\n    // Write your solution here\n}",
          java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your solution here\n        return new int[0];\n    }\n}",
          cpp: "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your solution here\n        return {};\n    }\n};"
        }
      }
    }
  }
};

export default function QuizPage({
  params,
}: {
  params: { courseId: string; moduleId: string };
}) {
  const quiz = quizData[params.courseId as keyof typeof quizData]?.[params.moduleId];

  if (!quiz) {
    notFound();
  }

  return <QuizInterface quizData={quiz} courseId={params.courseId} moduleId={params.moduleId} />;
}