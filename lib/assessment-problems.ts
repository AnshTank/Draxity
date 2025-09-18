export interface TestCase {
  input: any;
  expected: any;
  hidden: boolean;
}

export interface Problem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  timeComplexity: string;
  spaceComplexity: string;
  hints: string[];
  examples: {
    input: string;
    output: string;
    explanation: string;
  }[];
  testCases: TestCase[];
  solution: string;
  solutionExplanation: string;
}

export const ASSESSMENT_PROBLEMS: Problem[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    
    inputFormat: `First line contains n (size of array)
Second line contains n space-separated integers (array elements)  
Third line contains target integer`,
    
    outputFormat: `Two space-separated integers representing the indices of the two numbers`,
    
    constraints: [
      "2 ≤ nums.length ≤ 10⁴",
      "-10⁹ ≤ nums[i] ≤ 10⁹", 
      "-10⁹ ≤ target ≤ 10⁹",
      "Only one valid answer exists"
    ],
    
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    
    hints: [
      "Think about what you've seen so far. What data structure allows fast lookups?",
      "Use a hash map to store numbers you've seen and their indices",
      "For each number, check if (target - current_number) exists in your hash map"
    ],
    
    examples: [
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1",
        explanation: "Because nums[0] + nums[1] = 2 + 7 = 9, we return [0, 1]"
      },
      {
        input: "3\n3 2 4\n6", 
        output: "1 2",
        explanation: "Because nums[1] + nums[2] = 2 + 4 = 6, we return [1, 2]"
      }
    ],
    
    testCases: [
      // Visible test cases
      { input: { nums: [2, 7, 11, 15], target: 9 }, expected: [0, 1], hidden: false },
      { input: { nums: [3, 2, 4], target: 6 }, expected: [1, 2], hidden: false },
      { input: { nums: [3, 3], target: 6 }, expected: [0, 1], hidden: false },
      
      // Hidden test cases
      { input: { nums: [1, 2], target: 3 }, expected: [0, 1], hidden: true },
      { input: { nums: [5, 5], target: 10 }, expected: [0, 1], hidden: true },
      { input: { nums: [1, 3, 5, 7], target: 8 }, expected: [1, 3], hidden: true },
      { input: { nums: [2, 4, 6, 8], target: 10 }, expected: [1, 3], hidden: true },
      { input: { nums: [10, 20, 30], target: 50 }, expected: [1, 2], hidden: true },
      { input: { nums: [-1, -2, -3, -4], target: -6 }, expected: [1, 3], hidden: true },
      { input: { nums: [0, 4, 3, 0], target: 0 }, expected: [0, 3], hidden: true },
      { input: { nums: [1, 5, 3, 9, 2], target: 8 }, expected: [2, 3], hidden: true },
      { input: { nums: [7, 2, 13, 11], target: 9 }, expected: [0, 1], hidden: true },
      { input: { nums: [15, 7, 2, 4], target: 9 }, expected: [1, 2], hidden: true },
      { input: { nums: [6, 8, 1, 9], target: 15 }, expected: [1, 3], hidden: true },
      { input: { nums: [12, 3, 7, 1], target: 10 }, expected: [1, 2], hidden: true },
      { input: { nums: [4, 1, 9, 7], target: 8 }, expected: [0, 1], hidden: true },
      { input: { nums: [2, 15, 8, 6], target: 14 }, expected: [2, 3], hidden: true },
      { input: { nums: [11, 2, 7, 15], target: 9 }, expected: [1, 2], hidden: true },
      { input: { nums: [1, 8, 6, 2], target: 14 }, expected: [1, 2], hidden: true },
      { input: { nums: [5, 2, 1, 8], target: 10 }, expected: [0, 3], hidden: true },
      { input: { nums: [9, 1, 4, 6], target: 10 }, expected: [0, 1], hidden: true },
      { input: { nums: [3, 7, 4, 2], target: 6 }, expected: [0, 3], hidden: true },
      { input: { nums: [8, 3, 5, 4], target: 9 }, expected: [0, 4], hidden: true },
      { input: { nums: [6, 4, 2, 8], target: 10 }, expected: [0, 4], hidden: true },
      { input: { nums: [1, 9, 3, 7], target: 10 }, expected: [0, 1], hidden: true },
      { input: { nums: [4, 5, 1, 6], target: 7 }, expected: [0, 4], hidden: true },
      { input: { nums: [2, 8, 7, 1], target: 9 }, expected: [0, 2], hidden: true },
      { input: { nums: [5, 1, 8, 3], target: 9 }, expected: [0, 3], hidden: true },
      { input: { nums: [7, 6, 2, 4], target: 8 }, expected: [2, 3], hidden: true },
      { input: { nums: [3, 4, 8, 1], target: 9 }, expected: [0, 2], hidden: true },
      { input: { nums: [9, 2, 6, 5], target: 11 }, expected: [0, 1], hidden: true }
    ],
    
    solution: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> numMap;
    
    for (int i = 0; i < nums.size(); i++) {
        int complement = target - nums[i];
        
        if (numMap.find(complement) != numMap.end()) {
            return {numMap[complement], i};
        }
        
        numMap[nums[i]] = i;
    }
    
    return {}; // Should never reach here given constraints
}

int main() {
    int n;
    cin >> n;
    
    vector<int> nums(n);
    for (int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    int target;
    cin >> target;
    
    vector<int> result = twoSum(nums, target);
    cout << result[0] << " " << result[1] << endl;
    
    return 0;
}`,
    
    solutionExplanation: `**Approach: Hash Map (One Pass)**

1. **Key Insight**: Instead of checking every pair (O(n²)), we can use a hash map to store numbers we've seen and their indices.

2. **Algorithm**:
   - Iterate through the array once
   - For each number, calculate its complement (target - current_number)
   - Check if the complement exists in our hash map
   - If yes, we found our pair! Return the indices
   - If no, store the current number and its index in the hash map

3. **Why it works**: When we're at index i, we've already stored all previous numbers. If the complement of nums[i] was seen before, it's in our hash map.

4. **Time Complexity**: O(n) - single pass through array
5. **Space Complexity**: O(n) - hash map storage

**Example walkthrough** for [2,7,11,15], target=9:
- i=0: complement=9-2=7, not in map, store {2:0}
- i=1: complement=9-7=2, found in map at index 0, return [0,1]`
  },
  
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    description: `Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets
2. Open brackets must be closed in the correct order
3. Every close bracket has a corresponding open bracket of the same type`,
    
    inputFormat: `Single line containing a string s of parentheses`,
    
    outputFormat: `"true" if the string is valid, "false" otherwise`,
    
    constraints: [
      "1 ≤ s.length ≤ 10⁴",
      "s consists of parentheses only: '()[]{}'"
    ],
    
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    
    hints: [
      "Think about the Last In, First Out (LIFO) principle. What data structure follows this?",
      "Use a stack to keep track of opening brackets",
      "When you see a closing bracket, check if it matches the most recent opening bracket"
    ],
    
    examples: [
      {
        input: "()",
        output: "true",
        explanation: "The string has valid parentheses that are properly matched"
      },
      {
        input: "()[]{}",
        output: "true", 
        explanation: "All brackets are properly opened and closed in correct order"
      },
      {
        input: "(]",
        output: "false",
        explanation: "Opening '(' is closed by ']' which is incorrect"
      }
    ],
    
    testCases: [
      { input: { s: "()" }, expected: true, hidden: false },
      { input: { s: "()[]{}", }, expected: true, hidden: false },
      { input: { s: "(]" }, expected: false, hidden: false },
      { input: { s: "((" }, expected: false, hidden: true },
      { input: { s: "))" }, expected: false, hidden: true },
      { input: { s: "()[]" }, expected: true, hidden: true },
      { input: { s: "([)]" }, expected: false, hidden: true },
      { input: { s: "{[]}" }, expected: true, hidden: true },
      { input: { s: "" }, expected: true, hidden: true },
      { input: { s: "(((" }, expected: false, hidden: true },
      { input: { s: ")))" }, expected: false, hidden: true },
      { input: { s: "({[]})" }, expected: true, hidden: true },
      { input: { s: "([{}])" }, expected: true, hidden: true },
      { input: { s: "[({})]" }, expected: true, hidden: true },
      { input: { s: "({[}])" }, expected: false, hidden: true },
      { input: { s: "((()))" }, expected: true, hidden: true },
      { input: { s: "((())" }, expected: false, hidden: true },
      { input: { s: "(()))" }, expected: false, hidden: true },
      { input: { s: "[[[]]]" }, expected: true, hidden: true },
      { input: { s: "[[[]]" }, expected: false, hidden: true },
      { input: { s: "{{{}}}" }, expected: true, hidden: true },
      { input: { s: "{{{}" }, expected: false, hidden: true },
      { input: { s: "(){}[]" }, expected: true, hidden: true },
      { input: { s: "([{}])()" }, expected: true, hidden: true },
      { input: { s: "([{}])(" }, expected: false, hidden: true },
      { input: { s: "()()()" }, expected: true, hidden: true },
      { input: { s: "()()(" }, expected: false, hidden: true },
      { input: { s: "[][]{}" }, expected: true, hidden: true },
      { input: { s: "[]{}{" }, expected: false, hidden: true },
      { input: { s: "({})[]" }, expected: true, hidden: true },
      { input: { s: "({])[" }, expected: false, hidden: true },
      { input: { s: "(({}))" }, expected: true, hidden: true },
      { input: { s: "(({}]" }, expected: false, hidden: true }
    ],
    
    solution: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    
    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            st.push(c);
        } else {
            if (st.empty()) return false;
            
            char top = st.top();
            st.pop();
            
            if ((c == ')' && top != '(') ||
                (c == ']' && top != '[') ||
                (c == '}' && top != '{')) {
                return false;
            }
        }
    }
    
    return st.empty();
}

int main() {
    string s;
    cin >> s;
    
    if (isValid(s)) {
        cout << "true" << endl;
    } else {
        cout << "false" << endl;
    }
    
    return 0;
}`,
    
    solutionExplanation: `**Approach: Stack Data Structure**

1. **Key Insight**: Parentheses follow Last In, First Out (LIFO) principle.

2. **Algorithm**:
   - Use a stack to keep track of opening brackets
   - For opening brackets: push to stack
   - For closing brackets: check if it matches the top of stack
   - String is valid if stack is empty at the end

3. **Time Complexity**: O(n) - single pass
4. **Space Complexity**: O(n) - stack storage`
  }
];

export function getProblemById(id: string): Problem | undefined {
  return ASSESSMENT_PROBLEMS.find(problem => problem.id === id);
}