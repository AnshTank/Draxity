import { LessonDetail } from "@/components/lesson/lesson-detail"

const lessonData = {
  id: "4",
  title: "Lesson 4: String Operations",
  overview: "Master common string manipulation techniques including searching, replacing, splitting, and pattern matching.",
  theory: {
    sections: [
      {
        heading: "String Manipulation Basics",
        content: "String operations involve modifying, searching, or extracting information from strings. These operations are fundamental in text processing, data validation, and algorithm implementation."
      },
      {
        heading: "Search Operations",
        content: "Finding substrings within strings is a common task. Methods include simple linear search, built-in find functions, and advanced pattern matching algorithms like KMP or Boyer-Moore."
      },
      {
        heading: "Modification Operations",
        content: "String modifications include replacing characters or substrings, converting case, trimming whitespace, and splitting strings into arrays. Remember that in immutable languages, these create new string objects."
      },
      {
        heading: "Pattern Matching",
        content: "Advanced string operations involve finding patterns, validating formats (like email addresses), and using regular expressions for complex text processing tasks."
      }
    ]
  },
  diagram: {
    title: "String Operations Visualization",
    content: `Original String: "Hello World Programming"
                      0123456789...

Substring Operations:
substring(0, 5)  → "Hello"
substring(6, 11) → "World"

Replace Operations:
replace('o', 'X') → "HellX WXrld PrXgramming"

Split Operations:
split(' ') → ["Hello", "World", "Programming"]

Search Operations:
indexOf('W') → 6
contains("World") → true`
  },
  codeExamples: {
    cpp: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    string text = "Hello World Programming";
    
    // Substring operations
    cout << "Substring: " << text.substr(0, 5) << endl;
    
    // Search operations
    size_t pos = text.find("World");
    if(pos != string::npos) {
        cout << "Found 'World' at position: " << pos << endl;
    }
    
    // Replace operations
    string replaced = text;
    replace(replaced.begin(), replaced.end(), 'o', 'X');
    cout << "Replaced: " << replaced << endl;
    
    // Case conversion
    string upper = text;
    transform(upper.begin(), upper.end(), upper.begin(), ::toupper);
    cout << "Uppercase: " << upper << endl;
    
    // Character frequency
    int count = 0;
    for(char c : text) {
        if(c == 'l') count++;
    }
    cout << "Count of 'l': " << count << endl;
    
    return 0;
}`,
    python: `# String operations in Python
text = "Hello World Programming"

# Substring operations
print(f"Substring: {text[0:5]}")
print(f"Last 5 chars: {text[-5:]}")

# Search operations
pos = text.find("World")
print(f"Found 'World' at position: {pos}")
print(f"Contains 'Python': {'Python' in text}")

# Replace operations
replaced = text.replace('o', 'X')
print(f"Replaced: {replaced}")

# Case operations
print(f"Uppercase: {text.upper()}")
print(f"Lowercase: {text.lower()}")

# Split operations
words = text.split(' ')
print(f"Words: {words}")

# Join operations
joined = '-'.join(words)
print(f"Joined: {joined}")

# Character frequency
count = text.count('l')
print(f"Count of 'l': {count}")`,
    java: `public class StringOperations {
    public static void main(String[] args) {
        String text = "Hello World Programming";
        
        // Substring operations
        System.out.println("Substring: " + text.substring(0, 5));
        
        // Search operations
        int pos = text.indexOf("World");
        System.out.println("Found 'World' at position: " + pos);
        System.out.println("Contains 'Java': " + text.contains("Java"));
        
        // Replace operations
        String replaced = text.replace('o', 'X');
        System.out.println("Replaced: " + replaced);
        
        // Case operations
        System.out.println("Uppercase: " + text.toUpperCase());
        System.out.println("Lowercase: " + text.toLowerCase());
        
        // Split operations
        String[] words = text.split(" ");
        System.out.print("Words: ");
        for(String word : words) {
            System.out.print(word + " ");
        }
        System.out.println();
        
        // Character frequency
        long count = text.chars().filter(ch -> ch == 'l').count();
        System.out.println("Count of 'l': " + count);
    }
}`
  },
  timeComplexity: [
    { operation: "Substring", complexity: "O(k)" },
    { operation: "Search", complexity: "O(n*m)" },
    { operation: "Replace", complexity: "O(n)" },
    { operation: "Split", complexity: "O(n)" },
    { operation: "Concatenation", complexity: "O(n+m)" },
    { operation: "Comparison", complexity: "O(n)" }
  ],
  analogy: {
    title: "Real-world Analogy",
    content: "Think of string operations like editing a document. You can search for specific words (find operation), replace all instances of a word (replace operation), or split the document into paragraphs (split operation). Just like document editing, some operations are quick (like finding a word) while others take more time (like replacing every occurrence of a word in a large document)."
  }
}

export default function Lesson4Page() {
  return <LessonDetail lessonData={lessonData} />
}