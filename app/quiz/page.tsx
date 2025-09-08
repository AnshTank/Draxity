import { QuizInterface } from "@/components/quiz/quiz-interface";
import { Navigation } from "@/components/navigation";

export default function QuizPage() {
  return (
    <div className="h-screen overflow-hidden">
      <Navigation />
      <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950 p-6">
        <QuizInterface />
      </div>
    </div>
  );
}
