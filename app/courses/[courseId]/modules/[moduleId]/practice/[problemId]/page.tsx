import { CodingEnvironment } from "@/components/practice/coding-environment"

export default function ProblemPage({
  params,
}: {
  params: { courseId: string; moduleId: string; problemId: string }
}) {
  return <CodingEnvironment problemId={params.problemId} />
}
