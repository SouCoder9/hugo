"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Clock, TrendingUp, ChevronRight } from "lucide-react";
import QuizResult from "./quiz-result";

export default function QuizList({ assessments }) {
  const router = useRouter();
  const [selectedQuiz, setSelectedQuiz] = useState(null);

  const getScoreBadgeVariant = (score) => {
    if (score >= 80) return "success";
    if (score >= 60) return "warning";
    return "destructive";
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-violet-500/10">
                <TrendingUp className="h-5 w-5 text-violet-500" />
              </div>
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  Recent <span className="text-gradient">Quizzes</span>
                </CardTitle>
                <CardDescription className="mt-1">
                  Review your past quiz performance
                </CardDescription>
              </div>
            </div>
            <Button onClick={() => router.push("/interview/mock")} className="group">
              <Sparkles className="h-4 w-4 mr-2 group-hover:animate-pulse" />
              Start New Quiz
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {assessments?.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-8 w-8 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No quizzes yet</h3>
                <p className="text-muted-foreground mb-4">Start your first quiz to track your progress</p>
                <Button onClick={() => router.push("/interview/mock")}>
                  Take Your First Quiz
                </Button>
              </div>
            )}
            {assessments?.map((assessment, i) => (
              <Card
                key={assessment.id}
                className="cursor-pointer group hover:border-violet-500/50 transition-all duration-300"
                onClick={() => setSelectedQuiz(assessment)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl font-bold group-hover:text-violet-500 transition-colors">
                      Quiz {i + 1}
                    </CardTitle>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-violet-500 group-hover:translate-x-1 transition-all" />
                  </div>
                  <CardDescription className="flex flex-wrap items-center gap-3 mt-2">
                    <Badge variant={getScoreBadgeVariant(assessment.quizScore)}>
                      Score: {assessment.quizScore.toFixed(1)}%
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {format(
                        new Date(assessment.createdAt),
                        "MMM dd, yyyy HH:mm"
                      )}
                    </div>
                  </CardDescription>
                </CardHeader>
                {assessment.improvementTip && (
                  <CardContent className="pt-0">
                    <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">💡 Tip:</span> {assessment.improvementTip}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedQuiz} onOpenChange={() => setSelectedQuiz(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <QuizResult
            result={selectedQuiz}
            hideStartNew
            onStartNew={() => router.push("/interview/mock")}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
