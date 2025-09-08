import { LessonDetail } from "@/components/lesson/lesson-detail";

const lessonData = {
  id: "1",
  title: "Lesson 1: Introduction to Arrays",
  overview:
    "Arrays are a way to store multiple items of the same type in a single, continuous block of memory.",
  theory: {
    sections: [
      {
        heading: "What is an Array?",
        content:
          "An array is a fundamental data structure that stores multiple elements of the same data type in a contiguous block of memory. Imagine you need to keep track of the marks of 5 students. Instead of creating 5 separate variables (mark1, mark2, mark3, mark4, mark5), arrays allow you to store them in a single structure where each mark can be accessed by its index. This makes data management much more efficient and organized.",
      },
      {
        heading: "Key Characteristics",
        content:
          "Arrays have several important characteristics: 1) Homogeneous elements - all elements must be of the same data type, 2) Fixed size - the size is determined at creation and cannot be changed, 3) Indexed access - each element has a unique index starting from 0, 4) Contiguous memory - elements are stored in consecutive memory locations, 5) Random access - you can directly access any element using its index in O(1) time.",
      },
      {
        heading: "Memory Layout and Storage",
        content:
          "Arrays are stored in contiguous memory locations, which means elements are placed one after another without gaps. This layout provides several advantages: efficient memory usage, better cache performance due to spatial locality, and the ability to calculate any element's memory address using a simple formula: base_address + (index × element_size). This is why array access is so fast.",
      },
      {
        heading: "Array Declaration and Initialization",
        content:
          "Arrays can be declared and initialized in multiple ways. You can declare an array with a specific size and then assign values, or you can initialize it with values at the time of declaration. The compiler automatically determines the size based on the number of elements provided. Understanding different initialization methods is crucial for effective array usage.",
      },
      {
        heading: "Advantages and Disadvantages",
        content:
          "Arrays offer several advantages: O(1) random access time, memory efficiency, simple implementation, and good cache performance. However, they also have limitations: fixed size that cannot be changed, insertion and deletion operations are expensive (O(n)), and memory waste if the array is not fully utilized. Understanding these trade-offs helps in choosing the right data structure for your needs.",
      },
    ],
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
arr[0] arr[1] arr[2] arr[3] arr[4]`,
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
}`,
  },
  timeComplexity: [
    { operation: "Access", complexity: "O(1)" },
    { operation: "Traversal", complexity: "O(n)" },
    { operation: "Insertion", complexity: "O(n)" },
    { operation: "Deletion", complexity: "O(n)" },
    { operation: "Search", complexity: "O(n)" },
  ],
  analogy: {
    title: "Real-world Analogy",
    content:
      "Think of an array like a row of school lockers. Each locker has a unique number (index) and stores one item (value). You can quickly go to any locker if you know its number, but if you want to insert a new locker in the middle, you'd have to shift all the lockers after it.",
  },
  references: {
    articles: [
      {
        title: "Arrays in Data Structures - GeeksforGeeks",
        url: "https://www.geeksforgeeks.org/array-data-structure/",
      },
      {
        title: "Introduction to Arrays - Programiz",
        url: "https://www.programiz.com/dsa/array",
      },
      {
        title: "Array Data Structure - Tutorialspoint",
        url: "https://www.tutorialspoint.com/data_structures_algorithms/array_data_structure.htm",
      },
    ],
    videos: [
      {
        title: "Arrays Explained - CS Dojo",
        url: "https://www.youtube.com/watch?v=QJNwK2uJyGs",
      },
      {
        title: "Data Structures: Arrays - HackerRank",
        url: "https://www.youtube.com/watch?v=rL8X2mlNHPM",
      },
      {
        title: "Array Data Structure - mycodeschool",
        url: "https://www.youtube.com/watch?v=55l-aZ7_F24",
      },
    ],
  },
};

export default function Lesson1Page() {
  return <LessonDetail lessonData={lessonData} />;
}
