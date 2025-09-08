import { CodingEnvironment } from "@/components/practice/coding-environment"
import { Navigation } from "@/components/navigation"

export default function PracticePage() {
  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-900">
        <CodingEnvironment />
      </div>
    </>
  )
}