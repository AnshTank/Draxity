# 🚀 Draxity – Next-Gen DSA Learning Platform

![Draxity Logo](https://via.placeholder.com/200x60.png?text=Draxity+Logo)

Draxity is an **interactive e-learning platform** for mastering **Data Structures & Algorithms (DSA)** through

- 📚 **Interactive Learning** - Comprehensive DSA lessons and tutorials
- 📝 **Gamified Quizzes** - 10 MCQs per lesson with scratch card rewards
- 💻 **Multi-Language Compiler** - Practice coding in 8+ programming languages
- 🎯 **LeetCode-Style Challenges** - Solve problems with real-time test case validation
- 🏆 **Progress Tracking** - Dashboard, achievements, and leaderboard system

---

## ✨ Features

- 🔥 **NextLeap-Style Compiler** – Multi-language online compiler with resizable panels
- 🧠 **Interactive Quizzes** – 10 MCQs with 70% passing score requirement
- 🎟️ **Gamified Scratch Cards** – Unlock coding challenges through quiz completion
- ⚡ **LeetCode-Style Editor** – Split-panel coding environment with test cases
- 🎯 **Progress Tracking** – Dashboard with stats, achievements, and leaderboard
- 🌙 **Dark Mode Support** – Complete theme switching across all components
- 📱 **Responsive Design** – Optimized for all screen sizes

---

## 🏗️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Theme**: next-themes for dark/light mode switching
- **Icons**: Lucide React icons
- **Code Editor**: Custom textarea-based editor with syntax highlighting
- **State Management**: React hooks (useState, useEffect)

---

## 📂 Project Structure

```bash
draxity-platform/
│── app/
│   ├── page.tsx                    # Home page with hero, features, CTA
│   ├── practice/
│   │   └── page.tsx               # Practice mode wrapper
│   ├── quiz/
│   │   └── page.tsx               # Quiz assessment wrapper
│   ├── courses/
│   │   └── page.tsx               # Courses page with navigation
│   ├── dashboard/
│   │   └── page.tsx               # Dashboard with stats & progress
│   ├── achievements/
│   │   └── page.tsx               # Achievements page
│   ├── leaderboard/
│   │   └── page.tsx               # Leaderboard page
│   ├── globals.css                # Global styles
│   └── layout.tsx                 # Root layout with theme provider
│── components/
│   ├── ui/                        # Shadcn UI components
│   ├── practice/
│   │   └── coding-environment.tsx # NextLeap-style online compiler
│   ├── quiz/
│   │   └── quiz-interface.tsx     # 10 MCQ quiz with scratch card unlock
│   ├── scratch-cards/
│   │   ├── scratch-card.tsx       # Interactive scratch card component
│   │   └── assessment-editor.tsx  # LeetCode-style coding editor
│   └── theme-provider.tsx         # Dark/light theme provider
│── lib/
│   └── utils.ts                   # Utility functions
│── public/                        # Static assets
│── README.md                      # Project documentation
```

---

## 🚀 Getting Started

```bash
# Clone repo
git clone <repo-url>
cd draxity-platform

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit 👉 [http://localhost:3000](http://localhost:3000)

## 🎮 Key Pages & Features

- **Home (/)** - Hero section, problem cards, features showcase
- **Practice (/practice)** - NextLeap-style compiler with 8 programming languages
- **Quiz (/quiz)** - 10 MCQ assessment with scratch card rewards
- **Courses (/courses)** - Course catalog with practice/quiz navigation
- **Dashboard (/dashboard)** - Progress tracking and statistics
- **Achievements (/achievements)** - Achievement system with categories
- **Leaderboard (/leaderboard)** - Weekly/monthly ranking system

---

## 🤝 Contributing

1. 🍴 Fork this repo
2. 🌿 Create your branch (`git checkout -b feature-xyz`)
3. ✅ Commit your changes (`git commit -m "Add feature xyz"`)
4. 📤 Push to branch (`git push origin feature-xyz`)
5. 🔃 Open a Pull Request

---

## 🧑‍💻 Authors

- 👤 **Ansh Tank** – [GitHub](https://github.com/AnshTank)
- 👤 **Jiya Visariya** – [GitHub](https://github.com/jiyavisariya09)

---

## ⭐ Support

If you like this project, don’t forget to give it a **⭐ on GitHub**!
