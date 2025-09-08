import { LessonDetail } from "@/components/lesson/lesson-detail";
import { notFound } from "next/navigation";

// Lesson data structure - this would typically come from a database
const lessonData = {
  "dsa-fundamentals": {
    "1": {
      "1": {
        id: "1",
        title: "Lesson 1: Introduction to Arrays",
        overview:
          "Learn the fundamentals of arrays - one of the most important data structures in programming. Understand how arrays store data and why they're essential.",
        theory: {
          sections: [
            {
              heading: "What is an Array?",
              content:
                "An array is a collection of elements stored in contiguous memory locations. Each element can be accessed using an index, making arrays perfect for storing and retrieving data efficiently.",
            },
            {
              heading: "Array Characteristics",
              content:
                "Arrays have a fixed size (in most languages), elements of the same data type, and zero-based indexing. The memory layout allows for constant-time access to any element.",
            },
            {
              heading: "Why Use Arrays?",
              content:
                "Arrays provide fast access to elements, efficient memory usage, and are the foundation for many other data structures like strings, matrices, and dynamic arrays.",
            },
          ],
        },
        diagram: {
          title: "Array Memory Layout",
          content: `Array: [10, 20, 30, 40, 50]
Index:   0   1   2   3   4

Memory Layout:
┌────┬────┬────┬────┬────┐
│ 10 │ 20 │ 30 │ 40 │ 50 │
└────┴────┴────┴────┴────┘
  ↑    ↑    ↑    ↑    ↑
 [0]  [1]  [2]  [3]  [4]`,
        },
        codeExamples: {
          cpp: `#include <iostream>
using namespace std;

int main() {
    // Array declaration and initialization
    int arr[5] = {10, 20, 30, 40, 50};
    
    // Accessing elements
    cout << "First element: " << arr[0] << endl;
    cout << "Third element: " << arr[2] << endl;
    
    // Array size
    int size = sizeof(arr) / sizeof(arr[0]);
    cout << "Array size: " << size << endl;
    
    // Printing all elements
    for(int i = 0; i < size; i++) {
        cout << "arr[" << i << "] = " << arr[i] << endl;
    }
    
    return 0;
}`,
          python: `# Array (list) in Python
arr = [10, 20, 30, 40, 50]

# Accessing elements
print(f"First element: {arr[0]}")
print(f"Third element: {arr[2]}")

# Array length
print(f"Array length: {len(arr)}")

# Printing all elements
for i in range(len(arr)):
    print(f"arr[{i}] = {arr[i]}")

# Alternative way to iterate
for index, value in enumerate(arr):
    print(f"Index {index}: {value}")`,
          java: `public class ArrayBasics {
    public static void main(String[] args) {
        // Array declaration and initialization
        int[] arr = {10, 20, 30, 40, 50};
        
        // Accessing elements
        System.out.println("First element: " + arr[0]);
        System.out.println("Third element: " + arr[2]);
        
        // Array length
        System.out.println("Array length: " + arr.length);
        
        // Printing all elements
        for(int i = 0; i < arr.length; i++) {
            System.out.println("arr[" + i + "] = " + arr[i]);
        }
        
        // Enhanced for loop
        for(int value : arr) {
            System.out.println("Value: " + value);
        }
    }
}`,
        },
        timeComplexity: [
          { operation: "Access", complexity: "O(1)" },
          { operation: "Search", complexity: "O(n)" },
          { operation: "Insertion", complexity: "O(n)" },
          { operation: "Deletion", complexity: "O(n)" },
        ],
        analogy: {
          title: "Real-world Analogy",
          content:
            "Think of an array like a row of mailboxes in an apartment building. Each mailbox has a unique number (index), and you can quickly go to any specific mailbox if you know its number. All mailboxes are the same size and arranged in a straight line.",
        },
        nextLesson: "2",
      },
      "2": {
        id: "2",
        title: "Lesson 2: Array Operations",
        overview:
          "Master the fundamental operations you can perform on arrays: insertion, deletion, searching, and updating elements.",
        theory: {
          sections: [
            {
              heading: "Array Operations Overview",
              content:
                "Arrays support several key operations that allow you to manipulate and work with the stored data. Understanding these operations and their complexities is crucial for efficient programming.",
            },
            {
              heading: "Insertion Operations",
              content:
                "You can insert elements at the beginning, middle, or end of an array. Insertion at the end is fastest (O(1) if space is available), while insertion at the beginning or middle requires shifting elements (O(n)).",
            },
            {
              heading: "Deletion Operations",
              content:
                "Similar to insertion, deletion can happen at any position. Deleting from the end is fastest, while deleting from the beginning or middle requires shifting remaining elements to fill the gap.",
            },
            {
              heading: "Search Operations",
              content:
                "Arrays support both linear search (checking each element) and binary search (for sorted arrays). Linear search is O(n) while binary search is O(log n).",
            },
          ],
        },
        diagram: {
          title: "Array Operations Visualization",
          content: `Original Array: [10, 20, 30, 40, 50]
                     0   1   2   3   4

Insert 25 at index 2:
Step 1: Shift elements → [10, 20, _, 30, 40, 50]
Step 2: Insert element → [10, 20, 25, 30, 40, 50]

Delete element at index 1:
Step 1: Remove element → [10, _, 25, 30, 40, 50]
Step 2: Shift left     → [10, 25, 30, 40, 50]`,
        },
        codeExamples: {
          cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    vector<int> arr = {10, 20, 30, 40, 50};
    
    // Insert at specific position
    arr.insert(arr.begin() + 2, 25);
    cout << "After insertion: ";
    for(int x : arr) cout << x << " ";
    cout << endl;
    
    // Delete element
    arr.erase(arr.begin() + 1);
    cout << "After deletion: ";
    for(int x : arr) cout << x << " ";
    cout << endl;
    
    // Search for element
    auto it = find(arr.begin(), arr.end(), 30);
    if(it != arr.end()) {
        cout << "Found 30 at index: " << it - arr.begin() << endl;
    }
    
    return 0;
}`,
          python: `# Array operations in Python
arr = [10, 20, 30, 40, 50]

# Insert at specific position
arr.insert(2, 25)
print(f"After insertion: {arr}")

# Delete element
arr.pop(1)  # Remove element at index 1
print(f"After deletion: {arr}")

# Search for element
try:
    index = arr.index(30)
    print(f"Found 30 at index: {index}")
except ValueError:
    print("Element not found")

# Update element
arr[0] = 15
print(f"After update: {arr}")`,
          java: `import java.util.*;

public class ArrayOperations {
    public static void main(String[] args) {
        ArrayList<Integer> arr = new ArrayList<>(Arrays.asList(10, 20, 30, 40, 50));
        
        // Insert at specific position
        arr.add(2, 25);
        System.out.println("After insertion: " + arr);
        
        // Delete element
        arr.remove(1);
        System.out.println("After deletion: " + arr);
        
        // Search for element
        int index = arr.indexOf(30);
        if(index != -1) {
            System.out.println("Found 30 at index: " + index);
        }
        
        // Update element
        arr.set(0, 15);
        System.out.println("After update: " + arr);
    }
}`,
        },
        timeComplexity: [
          { operation: "Access", complexity: "O(1)" },
          { operation: "Insert (end)", complexity: "O(1)" },
          { operation: "Insert (middle)", complexity: "O(n)" },
          { operation: "Delete (end)", complexity: "O(1)" },
          { operation: "Delete (middle)", complexity: "O(n)" },
          { operation: "Search", complexity: "O(n)" },
        ],
        analogy: {
          title: "Real-world Analogy",
          content:
            "Think of array operations like managing a queue of people. Adding someone to the end is quick, but inserting someone in the middle means everyone behind them has to move back one position. Similarly, removing someone from the middle means everyone behind moves forward to fill the gap.",
        },
        nextLesson: "3",
      },
      "3": {
        id: "3",
        title: "Lesson 3: Two Pointers Technique",
        overview:
          "Learn the two pointers technique - a powerful method for solving array problems efficiently by using two indices.",
        theory: {
          sections: [
            {
              heading: "What is Two Pointers?",
              content:
                "Two pointers is a technique where we use two indices (pointers) to traverse an array. These pointers can move in the same direction or opposite directions depending on the problem.",
            },
            {
              heading: "When to Use Two Pointers",
              content:
                "This technique is useful for problems involving sorted arrays, finding pairs with specific sums, reversing arrays, or checking palindromes. It often reduces time complexity from O(n²) to O(n).",
            },
            {
              heading: "Types of Two Pointers",
              content:
                "Opposite Direction: Start from both ends and move towards center. Same Direction: Both pointers start from beginning but move at different speeds (fast and slow pointers).",
            },
          ],
        },
        diagram: {
          title: "Two Pointers Visualization",
          content: `Array: [1, 2, 3, 4, 5, 6]
        ↑           ↑
      left        right
      (0)          (5)

Step 1: Check arr[0] + arr[5] = 1 + 6 = 7
Step 2: Move pointers based on target
Step 3: Continue until pointers meet`,
        },
        codeExamples: {
          cpp: `#include <iostream>
#include <vector>
using namespace std;

// Find pair with target sum
bool twoSum(vector<int>& arr, int target) {
    int left = 0, right = arr.size() - 1;
    
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) return true;
        else if (sum < target) left++;
        else right--;
    }
    return false;
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6};
    int target = 9;
    
    if (twoSum(arr, target)) {
        cout << "Pair found!" << endl;
    } else {
        cout << "No pair found." << endl;
    }
    
    return 0;
}`,
          python: `def two_sum(arr, target):
    left, right = 0, len(arr) - 1
    
    while left < right:
        current_sum = arr[left] + arr[right]
        if current_sum == target:
            return True
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    
    return False

# Example usage
arr = [1, 2, 3, 4, 5, 6]
target = 9

if two_sum(arr, target):
    print("Pair found!")
else:
    print("No pair found.")`,
          java: `import java.util.*;

public class TwoPointers {
    public static boolean twoSum(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) return true;
            else if (sum < target) left++;
            else right--;
        }
        return false;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6};
        int target = 9;
        
        if (twoSum(arr, target)) {
            System.out.println("Pair found!");
        } else {
            System.out.println("No pair found.");
        }
    }
}`,
        },
        timeComplexity: [
          { operation: "Two Sum", complexity: "O(n)" },
          { operation: "Palindrome Check", complexity: "O(n)" },
          { operation: "Array Reversal", complexity: "O(n)" },
          { operation: "Remove Duplicates", complexity: "O(n)" },
        ],
        analogy: {
          title: "Real-world Analogy",
          content:
            "Imagine you're looking for two people in a line whose ages add up to a specific number. Instead of checking every possible pair (which would take forever), you start with the youngest and oldest person. If their ages are too high, replace the older person with someone younger. If too low, replace the younger person with someone older.",
        },
        nextLesson: "4",
      },
      "4": {
        id: "4",
        title: "Lesson 4: Sliding Window Technique",
        overview:
          "Master the sliding window technique for efficiently solving problems involving subarrays or substrings.",
        theory: {
          sections: [
            {
              heading: "What is Sliding Window?",
              content:
                "Sliding window is a technique where we maintain a window (subarray) of elements and slide it across the array. The window can expand, shrink, or move while maintaining certain properties.",
            },
            {
              heading: "Types of Sliding Window",
              content:
                "Fixed Size Window: Window size remains constant. Variable Size Window: Window size changes based on conditions. Both help reduce time complexity from O(n²) to O(n).",
            },
            {
              heading: "Common Applications",
              content:
                "Finding maximum sum subarray of size k, longest substring without repeating characters, minimum window substring, and problems involving consecutive elements.",
            },
          ],
        },
        diagram: {
          title: "Sliding Window Visualization",
          content: `Array: [1, 3, 2, 6, -1, 4, 1, 8, 2]
Window Size: 3

Step 1: [1, 3, 2] 6, -1, 4, 1, 8, 2  → Sum = 6
Step 2: 1, [3, 2, 6] -1, 4, 1, 8, 2  → Sum = 11
Step 3: 1, 3, [2, 6, -1] 4, 1, 8, 2  → Sum = 7
Step 4: 1, 3, 2, [6, -1, 4] 1, 8, 2  → Sum = 9`,
        },
        codeExamples: {
          cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Maximum sum of subarray of size k
int maxSumSubarray(vector<int>& arr, int k) {
    int n = arr.size();
    if (n < k) return -1;
    
    // Calculate sum of first window
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    
    int maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < n; i++) {
        windowSum = windowSum - arr[i - k] + arr[i];
        maxSum = max(maxSum, windowSum);
    }
    
    return maxSum;
}

int main() {
    vector<int> arr = {1, 3, 2, 6, -1, 4, 1, 8, 2};
    int k = 3;
    
    cout << "Maximum sum: " << maxSumSubarray(arr, k) << endl;
    return 0;
}`,
          python: `def max_sum_subarray(arr, k):
    n = len(arr)
    if n < k:
        return -1
    
    # Calculate sum of first window
    window_sum = sum(arr[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, n):
        window_sum = window_sum - arr[i - k] + arr[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum

# Example usage
arr = [1, 3, 2, 6, -1, 4, 1, 8, 2]
k = 3

print(f"Maximum sum: {max_sum_subarray(arr, k)}")`,
          java: `import java.util.*;

public class SlidingWindow {
    public static int maxSumSubarray(int[] arr, int k) {
        int n = arr.length;
        if (n < k) return -1;
        
        // Calculate sum of first window
        int windowSum = 0;
        for (int i = 0; i < k; i++) {
            windowSum += arr[i];
        }
        
        int maxSum = windowSum;
        
        // Slide the window
        for (int i = k; i < n; i++) {
            windowSum = windowSum - arr[i - k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        
        return maxSum;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 3, 2, 6, -1, 4, 1, 8, 2};
        int k = 3;
        
        System.out.println("Maximum sum: " + maxSumSubarray(arr, k));
    }
}`,
        },
        timeComplexity: [
          { operation: "Fixed Window", complexity: "O(n)" },
          { operation: "Variable Window", complexity: "O(n)" },
          { operation: "Naive Approach", complexity: "O(n²)" },
        ],
        analogy: {
          title: "Real-world Analogy",
          content:
            "Think of sliding window like looking through a moving train window. You can see a fixed portion of the landscape at any time. As the train moves, you lose sight of what's behind and gain sight of what's ahead, but you're always looking at a continuous section.",
        },
        nextLesson: "5",
      },
      "5": {
        id: "5",
        title: "Lesson 5: String Fundamentals",
        overview:
          "Understanding strings and character manipulation - the foundation for text processing and algorithms.",
        theory: {
          sections: [
            {
              heading: "What are Strings?",
              content:
                "Strings are sequences of characters stored in memory. In most programming languages, strings are implemented as arrays of characters with additional functionality for text manipulation.",
            },
            {
              heading: "String Operations",
              content:
                "Common string operations include concatenation, substring extraction, character access, length calculation, and comparison. Understanding these operations is crucial for text processing.",
            },
            {
              heading: "String Immutability",
              content:
                "In many languages like Java and Python, strings are immutable - meaning once created, they cannot be changed. Any modification creates a new string object.",
            },
          ],
        },
        diagram: {
          title: "String Memory Layout",
          content: `String: "HELLO"
Index:   0 1 2 3 4

Memory Layout:
┌───┬───┬───┬───┬───┐
│ H │ E │ L │ L │ O │
└───┴───┴───┴───┴───┘
  ↑   ↑   ↑   ↑   ↑
 [0] [1] [2] [3] [4]`,
        },
        codeExamples: {
          cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string str = "Hello World";
    
    // String length
    cout << "Length: " << str.length() << endl;
    
    // Character access
    cout << "First char: " << str[0] << endl;
    
    // Substring
    cout << "Substring: " << str.substr(0, 5) << endl;
    
    // String concatenation
    string greeting = str + "!";
    cout << "Concatenated: " << greeting << endl;
    
    // String comparison
    if (str == "Hello World") {
        cout << "Strings are equal" << endl;
    }
    
    return 0;
}`,
          python: `# String operations in Python
str_val = "Hello World"

# String length
print(f"Length: {len(str_val)}")

# Character access
print(f"First char: {str_val[0]}")

# Substring (slicing)
print(f"Substring: {str_val[0:5]}")

# String concatenation
greeting = str_val + "!"
print(f"Concatenated: {greeting}")

# String methods
print(f"Uppercase: {str_val.upper()}")
print(f"Lowercase: {str_val.lower()}")
print(f"Replace: {str_val.replace('World', 'Python')}")

# String comparison
if str_val == "Hello World":
    print("Strings are equal")`,
          java: `public class StringExample {
    public static void main(String[] args) {
        String str = "Hello World";
        
        // String length
        System.out.println("Length: " + str.length());
        
        // Character access
        System.out.println("First char: " + str.charAt(0));
        
        // Substring
        System.out.println("Substring: " + str.substring(0, 5));
        
        // String concatenation
        String greeting = str + "!";
        System.out.println("Concatenated: " + greeting);
        
        // String methods
        System.out.println("Uppercase: " + str.toUpperCase());
        System.out.println("Contains: " + str.contains("World"));
        
        // String comparison
        if (str.equals("Hello World")) {
            System.out.println("Strings are equal");
        }
    }
}`,
        },
        timeComplexity: [
          { operation: "Access", complexity: "O(1)" },
          { operation: "Length", complexity: "O(1)" },
          { operation: "Concatenation", complexity: "O(n)" },
          { operation: "Substring", complexity: "O(n)" },
          { operation: "Search", complexity: "O(n)" },
        ],
        analogy: {
          title: "Real-world Analogy",
          content:
            "Think of a string like a necklace of beads, where each bead is a character. You can look at any specific bead (character access), count all beads (length), or create a new necklace by combining beads from different necklaces (concatenation).",
        },
        nextLesson: "6",
      },
      "6": {
        id: "6",
        title: "Lesson 6: String Pattern Matching",
        overview:
          "Learn algorithms for finding patterns in strings, including brute force and efficient pattern matching techniques.",
        theory: {
          sections: [
            {
              heading: "Pattern Matching Problem",
              content:
                "Pattern matching involves finding occurrences of a pattern (substring) within a larger text. This is fundamental in text processing, search engines, and DNA analysis.",
            },
            {
              heading: "Brute Force Approach",
              content:
                "The naive approach checks every possible position in the text to see if the pattern matches. While simple to implement, it has O(n*m) time complexity where n is text length and m is pattern length.",
            },
            {
              heading: "Efficient Algorithms",
              content:
                "Advanced algorithms like KMP (Knuth-Morris-Pratt) and Boyer-Moore can achieve better time complexity by avoiding redundant comparisons using preprocessing techniques.",
            },
          ],
        },
        diagram: {
          title: "Pattern Matching Visualization",
          content: `Text:    "ABABCABABA"
Pattern: "ABABA"

Step 1: A B A B C A B A B A
        A B A B A
        ↑ Match until index 3, mismatch at 4

Step 2: A B A B C A B A B A
          A B A B A
          ↑ Start fresh comparison

Step 3: A B A B C A B A B A
              A B A B A
              ↑ Found match at index 5!`,
        },
        codeExamples: {
          cpp: `#include <iostream>
#include <string>
#include <vector>
using namespace std;

// Brute force pattern matching
vector<int> bruteForceSearch(string text, string pattern) {
    vector<int> matches;
    int n = text.length();
    int m = pattern.length();
    
    for (int i = 0; i <= n - m; i++) {
        int j = 0;
        while (j < m && text[i + j] == pattern[j]) {
            j++;
        }
        if (j == m) {
            matches.push_back(i);
        }
    }
    return matches;
}

int main() {
    string text = "ABABCABABA";
    string pattern = "ABABA";
    
    vector<int> matches = bruteForceSearch(text, pattern);
    
    cout << "Pattern found at positions: ";
    for (int pos : matches) {
        cout << pos << " ";
    }
    cout << endl;
    
    return 0;
}`,
          python: `def brute_force_search(text, pattern):
    matches = []
    n, m = len(text), len(pattern)
    
    for i in range(n - m + 1):
        j = 0
        while j < m and text[i + j] == pattern[j]:
            j += 1
        if j == m:
            matches.append(i)
    
    return matches

# Example usage
text = "ABABCABABA"
pattern = "ABABA"

matches = brute_force_search(text, pattern)
print(f"Pattern found at positions: {matches}")

# Using built-in method
index = text.find(pattern)
if index != -1:
    print(f"First occurrence at index: {index}")
else:
    print("Pattern not found")`,
          java: `import java.util.*;

public class PatternMatching {
    public static List<Integer> bruteForceSearch(String text, String pattern) {
        List<Integer> matches = new ArrayList<>();
        int n = text.length();
        int m = pattern.length();
        
        for (int i = 0; i <= n - m; i++) {
            int j = 0;
            while (j < m && text.charAt(i + j) == pattern.charAt(j)) {
                j++;
            }
            if (j == m) {
                matches.add(i);
            }
        }
        return matches;
    }
    
    public static void main(String[] args) {
        String text = "ABABCABABA";
        String pattern = "ABABA";
        
        List<Integer> matches = bruteForceSearch(text, pattern);
        
        System.out.println("Pattern found at positions: " + matches);
        
        // Using built-in method
        int index = text.indexOf(pattern);
        if (index != -1) {
            System.out.println("First occurrence at index: " + index);
        }
    }
}`,
        },
        timeComplexity: [
          { operation: "Brute Force", complexity: "O(n*m)" },
          { operation: "KMP Algorithm", complexity: "O(n+m)" },
          { operation: "Boyer-Moore", complexity: "O(n/m)" },
          { operation: "Built-in Find", complexity: "O(n*m)" },
        ],
        analogy: {
          title: "Real-world Analogy",
          content:
            "Pattern matching is like looking for a specific word in a book. You could check every page from start to finish (brute force), or use smarter techniques like an index or knowing common word patterns to skip unnecessary pages.",
        },
        nextLesson: "7",
      },
      "7": {
        id: "7",
        title: "Lesson 7: Advanced Array Operations",
        overview:
          "Master complex array manipulations including in-place operations, rotations, and merge techniques.",
        theory: {
          sections: [
            {
              heading: "In-place Operations",
              content:
                "In-place algorithms modify the input array without using extra space proportional to input size. These operations are memory-efficient and often required in space-constrained environments.",
            },
            {
              heading: "Array Rotation",
              content:
                "Array rotation involves moving elements to the left or right by a specified number of positions. This can be done using reversal technique, cyclic replacement, or temporary arrays.",
            },
            {
              heading: "Merge Operations",
              content:
                "Merging involves combining two or more sorted arrays into a single sorted array. This is a fundamental operation in merge sort and other divide-and-conquer algorithms.",
            },
          ],
        },
        diagram: {
          title: "Array Rotation Visualization",
          content: `Original: [1, 2, 3, 4, 5, 6, 7]
Rotate right by 3:

Step 1: Reverse entire array
        [7, 6, 5, 4, 3, 2, 1]

Step 2: Reverse first 3 elements
        [5, 6, 7, 4, 3, 2, 1]

Step 3: Reverse remaining elements
        [5, 6, 7, 1, 2, 3, 4]

Result: [5, 6, 7, 1, 2, 3, 4]`,
        },
        codeExamples: {
          cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

// Rotate array right by k positions
void rotateArray(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n; // Handle k > n
    
    // Reverse entire array
    reverse(arr.begin(), arr.end());
    
    // Reverse first k elements
    reverse(arr.begin(), arr.begin() + k);
    
    // Reverse remaining elements
    reverse(arr.begin() + k, arr.end());
}

// Merge two sorted arrays
vector<int> mergeSorted(vector<int>& arr1, vector<int>& arr2) {
    vector<int> result;
    int i = 0, j = 0;
    
    while (i < arr1.size() && j < arr2.size()) {
        if (arr1[i] <= arr2[j]) {
            result.push_back(arr1[i++]);
        } else {
            result.push_back(arr2[j++]);
        }
    }
    
    // Add remaining elements
    while (i < arr1.size()) result.push_back(arr1[i++]);
    while (j < arr2.size()) result.push_back(arr2[j++]);
    
    return result;
}

int main() {
    vector<int> arr = {1, 2, 3, 4, 5, 6, 7};
    rotateArray(arr, 3);
    
    cout << "Rotated array: ";
    for (int x : arr) cout << x << " ";
    cout << endl;
    
    return 0;
}`,
          python: `def rotate_array(arr, k):
    n = len(arr)
    k = k % n  # Handle k > n
    
    # Reverse entire array
    arr.reverse()
    
    # Reverse first k elements
    arr[:k] = reversed(arr[:k])
    
    # Reverse remaining elements
    arr[k:] = reversed(arr[k:])
    
    return arr

def merge_sorted(arr1, arr2):
    result = []
    i = j = 0
    
    while i < len(arr1) and j < len(arr2):
        if arr1[i] <= arr2[j]:
            result.append(arr1[i])
            i += 1
        else:
            result.append(arr2[j])
            j += 1
    
    # Add remaining elements
    result.extend(arr1[i:])
    result.extend(arr2[j:])
    
    return result

# Example usage
arr = [1, 2, 3, 4, 5, 6, 7]
rotated = rotate_array(arr.copy(), 3)
print(f"Rotated array: {rotated}")

arr1 = [1, 3, 5, 7]
arr2 = [2, 4, 6, 8]
merged = merge_sorted(arr1, arr2)
print(f"Merged array: {merged}")`,
          java: `import java.util.*;

public class AdvancedArrayOps {
    public static void rotateArray(int[] arr, int k) {
        int n = arr.length;
        k = k % n; // Handle k > n
        
        // Reverse entire array
        reverse(arr, 0, n - 1);
        
        // Reverse first k elements
        reverse(arr, 0, k - 1);
        
        // Reverse remaining elements
        reverse(arr, k, n - 1);
    }
    
    private static void reverse(int[] arr, int start, int end) {
        while (start < end) {
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
            start++;
            end--;
        }
    }
    
    public static int[] mergeSorted(int[] arr1, int[] arr2) {
        int[] result = new int[arr1.length + arr2.length];
        int i = 0, j = 0, k = 0;
        
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] <= arr2[j]) {
                result[k++] = arr1[i++];
            } else {
                result[k++] = arr2[j++];
            }
        }
        
        // Add remaining elements
        while (i < arr1.length) result[k++] = arr1[i++];
        while (j < arr2.length) result[k++] = arr2[j++];
        
        return result;
    }
    
    public static void main(String[] args) {
        int[] arr = {1, 2, 3, 4, 5, 6, 7};
        rotateArray(arr, 3);
        
        System.out.println("Rotated array: " + Arrays.toString(arr));
    }
}`,
        },
        timeComplexity: [
          { operation: "Array Rotation", complexity: "O(n)" },
          { operation: "In-place Reversal", complexity: "O(n)" },
          { operation: "Merge Arrays", complexity: "O(n+m)" },
          { operation: "Cyclic Rotation", complexity: "O(n)" },
        ],
        analogy: {
          title: "Real-world Analogy",
          content:
            "Array rotation is like rearranging people in a circular queue - everyone moves a certain number of positions, but the relative order is maintained. Merging is like combining two sorted lines of people into one sorted line.",
        },
        nextLesson: "8",
      },
      "8": {
        id: "8",
        title: "Lesson 8: Module Review & Preparation",
        overview:
          "Comprehensive review of all array and string concepts before taking the final quiz and coding assessment.",
        theory: {
          sections: [
            {
              heading: "Key Concepts Review",
              content:
                "We've covered array basics, operations, two pointers, sliding window, string fundamentals, pattern matching, and advanced operations. Each concept builds upon the previous ones.",
            },
            {
              heading: "Problem-Solving Strategies",
              content:
                "When approaching array/string problems: identify the pattern, choose the right technique (two pointers, sliding window, etc.), consider time/space complexity, and test with examples.",
            },
            {
              heading: "Common Pitfalls",
              content:
                "Watch out for off-by-one errors, array bounds, null/empty inputs, and integer overflow. Always validate your approach with edge cases before implementing.",
            },
          ],
        },
        diagram: {
          title: "Technique Selection Guide",
          content: `Problem Type → Recommended Technique

• Find pair with sum → Two Pointers
• Subarray with condition → Sliding Window  
• Pattern in string → Pattern Matching
• Rotate/reverse → In-place Operations
• Merge sorted data → Merge Technique
• Search in array → Binary Search (if sorted)
• Multiple operations → Choose based on frequency`,
        },
        codeExamples: {
          cpp: `// Summary of key techniques
#include <iostream>
#include <vector>
#include <string>
using namespace std;

class ArrayStringTechniques {
public:
    // Two Pointers: Find pair with target sum
    bool twoSum(vector<int>& arr, int target) {
        int left = 0, right = arr.size() - 1;
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) return true;
            else if (sum < target) left++;
            else right--;
        }
        return false;
    }
    
    // Sliding Window: Max sum subarray of size k
    int maxSumSubarray(vector<int>& arr, int k) {
        int windowSum = 0, maxSum = 0;
        for (int i = 0; i < k; i++) windowSum += arr[i];
        maxSum = windowSum;
        
        for (int i = k; i < arr.size(); i++) {
            windowSum = windowSum - arr[i-k] + arr[i];
            maxSum = max(maxSum, windowSum);
        }
        return maxSum;
    }
    
    // Pattern Matching: Find pattern in text
    int findPattern(string text, string pattern) {
        return text.find(pattern);
    }
};`,
          python: `# Summary of key techniques

class ArrayStringTechniques:
    def two_sum(self, arr, target):
        """Two Pointers: Find pair with target sum"""
        left, right = 0, len(arr) - 1
        while left < right:
            current_sum = arr[left] + arr[right]
            if current_sum == target:
                return True
            elif current_sum < target:
                left += 1
            else:
                right -= 1
        return False
    
    def max_sum_subarray(self, arr, k):
        """Sliding Window: Max sum subarray of size k"""
        window_sum = sum(arr[:k])
        max_sum = window_sum
        
        for i in range(k, len(arr)):
            window_sum = window_sum - arr[i-k] + arr[i]
            max_sum = max(max_sum, window_sum)
        
        return max_sum
    
    def find_pattern(self, text, pattern):
        """Pattern Matching: Find pattern in text"""
        return text.find(pattern)
    
    def rotate_array(self, arr, k):
        """In-place Operations: Rotate array"""
        n = len(arr)
        k = k % n
        arr[:] = arr[-k:] + arr[:-k]
        return arr

# Example usage
techniques = ArrayStringTechniques()
print("All techniques ready for quiz!")`,
          java: `// Summary of key techniques
import java.util.*;

public class ArrayStringTechniques {
    // Two Pointers: Find pair with target sum
    public boolean twoSum(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left < right) {
            int sum = arr[left] + arr[right];
            if (sum == target) return true;
            else if (sum < target) left++;
            else right--;
        }
        return false;
    }
    
    // Sliding Window: Max sum subarray of size k
    public int maxSumSubarray(int[] arr, int k) {
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += arr[i];
        int maxSum = windowSum;
        
        for (int i = k; i < arr.length; i++) {
            windowSum = windowSum - arr[i-k] + arr[i];
            maxSum = Math.max(maxSum, windowSum);
        }
        return maxSum;
    }
    
    // Pattern Matching: Find pattern in text
    public int findPattern(String text, String pattern) {
        return text.indexOf(pattern);
    }
    
    public static void main(String[] args) {
        System.out.println("All techniques ready for quiz!");
    }
}`,
        },
        timeComplexity: [
          { operation: "Two Pointers", complexity: "O(n)" },
          { operation: "Sliding Window", complexity: "O(n)" },
          { operation: "Pattern Matching", complexity: "O(n*m)" },
          { operation: "Array Operations", complexity: "O(n)" },
        ],
        analogy: {
          title: "Final Thoughts",
          content:
            "Mastering arrays and strings is like learning to read and write - they're fundamental skills that enable you to tackle more complex problems. Each technique is a tool in your programming toolkit.",
        },
        nextLesson: null,
      },
    },
  },
};

export default function LessonPage({
  params,
}: {
  params: { courseId: string; moduleId: string; lessonId: string };
}) {
  const lesson = lessonData[params.courseId as keyof typeof lessonData]?.[params.moduleId]?.[params.lessonId];

  if (!lesson) {
    notFound();
  }

  return <LessonDetail lessonData={lesson} />;
}