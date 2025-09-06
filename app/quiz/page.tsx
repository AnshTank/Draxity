import { QuizInterface } from "@/components/quiz/quiz-interface";
import { Navigation } from "@/components/navigation";

export default function QuizPage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen p-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-purple-950">
        <QuizInterface />
      </div>
    </>
  );
}
