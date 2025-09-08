import { LessonDetail } from "@/components/lesson/lesson-detail"

const lessonData = {
  id: "3",
  title: "Lesson 3: Introduction to Strings",
  overview: "Understanding strings as character arrays and learning how they are stored and manipulated in memory.",
  theory: {
    sections: [
      {
        heading: "What are Strings?",
        content: "A string is essentially an array of characters. Each character occupies one position in the array, and the string is terminated by a special null character ('\\0') in languages like C++."
      },
      {
        heading: "String vs Character Array",
        content: "While strings are built on character arrays, they come with additional functionality like automatic memory management, built-in methods for manipulation, and easier concatenation operations."
      },
      {
        heading: "String Immutability",
        content: "In many programming languages like Java and Python, strings are immutable, meaning once created, they cannot be changed. Any 'modification' creates a new string object in memory."
      },
      {
        heading: "Memory Representation",
        content: "Strings are stored as consecutive characters in memory. Each character typically takes 1 byte (ASCII) or more bytes (Unicode), and the total memory depends on the string length."
      }
    ]
  },
  diagram: {
    title: "String Memory Layout",
    content: `String: "HELLO"
Index:   0  1  2  3  4  5
Char:   'H' 'E' 'L' 'L' 'O' '\\0'

Memory Layout:
┌───┬───┬───┬───┬───┬────┐
│ H │ E │ L │ L │ O │ \\0 │
└───┴───┴───┴───┴───┴────┘
 72  69  76  76  79   0   (ASCII values)

String Operations:
str[0] → 'H'
str[2] → 'L'
length → 5 (excluding null terminator)`
  },
  codeExamples: {
    cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    // String declaration and initialization
    string str = "Hello";
    char charArray[] = "World";
    
    // Accessing characters
    cout << "First character: " << str[0] << endl;
    cout << "String length: " << str.length() << endl;
    
    // String concatenation
    string result = str + " " + charArray;
    cout << "Concatenated: " << result << endl;
    
    // Character array access
    cout << "Char array: ";
    for(int i = 0; charArray[i] != '\\0'; i++) {
        cout << charArray[i];
    }
    cout << endl;
    
    return 0;
}`,
    python: `# String operations in Python
str1 = "Hello"
str2 = "World"

# Accessing characters
print(f"First character: {str1[0]}")
print(f"String length: {len(str1)}")

# String concatenation
result = str1 + " " + str2
print(f"Concatenated: {result}")

# String is immutable - this creates a new string
original = "Hello"
modified = original.replace('l', 'x')
print(f"Original: {original}")  # Still "Hello"
print(f"Modified: {modified}")  # "Hexxo"

# String indexing and slicing
text = "Programming"
print(f"Substring: {text[0:4]}")  # "Prog"`,
    java: `public class StringExample {
    public static void main(String[] args) {
        // String declaration and initialization
        String str1 = "Hello";
        String str2 = "World";
        
        // Accessing characters
        System.out.println("First character: " + str1.charAt(0));
        System.out.println("String length: " + str1.length());
        
        // String concatenation
        String result = str1 + " " + str2;
        System.out.println("Concatenated: " + result);
        
        // String immutability demonstration
        String original = "Hello";
        String modified = original.replace('l', 'x');
        System.out.println("Original: " + original);  // Still "Hello"
        System.out.println("Modified: " + modified);  // "Hexxo"
        
        // Character array conversion
        char[] charArray = str1.toCharArray();
        System.out.print("Character array: ");
        for(char c : charArray) {
            System.out.print(c + " ");
        }
        System.out.println();
    }
}`
  },
  timeComplexity: [
    { operation: "Access", complexity: "O(1)" },
    { operation: "Length", complexity: "O(1)" },
    { operation: "Concatenation", complexity: "O(n+m)" },
    { operation: "Substring", complexity: "O(k)" },
    { operation: "Search", complexity: "O(n*m)" },
    { operation: "Comparison", complexity: "O(n)" }
  ],
  analogy: {
    title: "Real-world Analogy",
    content: "Think of a string like a train with multiple cars. Each car (character) is connected to the next one in a specific order. You can look at any car by knowing its position, but if you want to add a car in the middle, you might need to create an entirely new train (due to immutability in some languages)."
  },
  nextLesson: "4"
}

export default function Lesson3Page() {
  return <LessonDetail lessonData={lessonData} />
}