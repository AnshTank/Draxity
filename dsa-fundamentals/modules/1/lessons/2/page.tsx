import { LessonDetail } from "@/components/lesson/lesson-detail";

const lessonData = {
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
};

export default function Lesson2Page() {
  return <LessonDetail lessonData={lessonData} />;
}
