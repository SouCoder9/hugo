import { getAssessments } from "@/actions/interview";
import StatsCards from "./_components/stats-cards";
import PerformanceChart from "./_components/performace-chart";
import QuizList from "./_components/quiz-list";
import { GraduationCap } from "lucide-react";

export default async function InterviewPrepPage() {
  const assessments = await getAssessments();

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20">
            <GraduationCap className="h-8 w-8 text-violet-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              Interview <span className="text-gradient">Preparation</span>
            </h1>
            <p className="text-muted-foreground mt-1">Practice and improve your interview skills</p>
          </div>
        </div>
      </div>
      <div className="space-y-8">
        <StatsCards assessments={assessments} />
        <PerformanceChart assessments={assessments} />
        <QuizList assessments={assessments} />
      </div>
    </div>
  );
}
