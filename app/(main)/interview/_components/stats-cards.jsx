import { Brain, Target, Trophy, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatsCards({ assessments }) {
  const getAverageScore = () => {
    if (!assessments?.length) return 0;
    const total = assessments.reduce(
      (sum, assessment) => sum + assessment.quizScore,
      0
    );
    return (total / assessments.length).toFixed(1);
  };

  const getLatestAssessment = () => {
    if (!assessments?.length) return null;
    return assessments[0];
  };

  const getTotalQuestions = () => {
    if (!assessments?.length) return 0;
    return assessments.reduce(
      (sum, assessment) => sum + assessment.questions.length,
      0
    );
  };

  const getScoreColor = (score) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average Score
          </CardTitle>
          <div className="p-2 rounded-xl bg-amber-500/10 group-hover:bg-amber-500/20 transition-colors">
            <Trophy className="h-5 w-5 text-amber-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${getScoreColor(getAverageScore())}`}>
            {getAverageScore()}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Across all assessments
          </p>
        </CardContent>
      </Card>

      <Card className="group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Questions Practiced
          </CardTitle>
          <div className="p-2 rounded-xl bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
            <Brain className="h-5 w-5 text-violet-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-gradient">{getTotalQuestions()}</div>
          <p className="text-sm text-muted-foreground mt-1">Total questions</p>
        </CardContent>
      </Card>

      <Card className="group">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Latest Score
          </CardTitle>
          <div className="p-2 rounded-xl bg-pink-500/10 group-hover:bg-pink-500/20 transition-colors">
            <Target className="h-5 w-5 text-pink-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className={`text-3xl font-bold ${getScoreColor(getLatestAssessment()?.quizScore || 0)}`}>
            {getLatestAssessment()?.quizScore.toFixed(1) || 0}%
          </div>
          <p className="text-sm text-muted-foreground mt-1">Most recent quiz</p>
        </CardContent>
      </Card>
    </div>
  );
}
