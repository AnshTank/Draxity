import { LessonDetail } from "@/components/lesson/lesson-detail"

const lessonData = {
  id: "1",
  title: "Lesson 1: Introduction to Arrays",
  overview: "Arrays are a way to store multiple items of the same type in a single, continuous block of memory.",
  theory: {
    sections: [
      {
        heading: "What is an Array?",
        content: "Imagine you need to keep track of the marks of 5 students. Instead of creating 5 separate variables (mark1, mark2, ...), arrays allow you to store them in a single structure where each mark can be accessed by its index."
      },
      {
        heading: "Key Characteristics",
        content: "Arrays store elements of the same data type in consecutive memory locations. Each element has a unique index starting from 0, making it easy to access any element directly."
      },
      {
        heading: "Memory Layout",
        content: "Arrays are stored in contiguous memory locations, which means elements are placed one after another. This allows for efficient memory usage and fast access times."
      }
    ]
  },
  diagram: {
    title: "Visual Diagram",
    content: `Index → 0   1   2   3   4
Value → 85  90  78  92  88

Memory Layout:
┌────┬────┬────┬────┬────┐
│ 85 │ 90 │ 78 │ 92 │ 88 │
└────┴────┴────┴────┴────┘
  ↑    ↑    ↑    ↑    ↑
arr[0] arr[1] arr[2] arr[3] arr[4]`
  },
  codeExamples: {
    cpp: `#include <iostream>
using namespace std;

int main() {
    // Array declaration and initialization
    int marks[5] = {85, 90, 78, 92, 88};
    
    // Accessing elements
    cout << "First student: " << marks[0] << endl;
    cout << "Third student: " << marks[2] << endl; // prints 78
    
    // Modifying elements
    marks[1] = 95;
    cout << "Updated second student: " << marks[1] << endl;
    
    return 0;
}`,
    python: `# Array (list) declaration and initialization
marks = [85, 90, 78, 92, 88]

# Accessing elements
print(f"First student: {marks[0]}")
print(f"Third student: {marks[2]}")  # prints 78

# Modifying elements
marks[1] = 95
print(f"Updated second student: {marks[1]}")

# Getting array length
print(f"Total students: {len(marks)}")`,
    java: `public class ArrayExample {
    public static void main(String[] args) {
        // Array declaration and initialization
        int[] marks = {85, 90, 78, 92, 88};
        
        // Accessing elements
        System.out.println("First student: " + marks[0]);
        System.out.println("Third student: " + marks[2]); // prints 78
        
        // Modifying elements
        marks[1] = 95;
        System.out.println("Updated second student: " + marks[1]);
        
        // Array length
        System.out.println("Total students: " + marks.length);
    }
}`
  },
  timeComplexity: [
    { operation: "Access", complexity: "O(1)" },
    { operation: "Traversal", complexity: "O(n)" },
    { operation: "Insertion", complexity: "O(n)" },
    { operation: "Deletion", complexity: "O(n)" },
    { operation: "Search", complexity: "O(n)" }
  ],
  analogy: {
    title: "Real-world Analogy",
    content: "Think of an array like a row of school lockers. Each locker has a unique number (index) and stores one item (value). You can quickly go to any locker if you know its number, but if you want to insert a new locker in the middle, you'd have to shift all the lockers after it."
  },
  nextLesson: "2"
}

export default function Lesson1Page() {
  return <LessonDetail lessonData={lessonData} />
}