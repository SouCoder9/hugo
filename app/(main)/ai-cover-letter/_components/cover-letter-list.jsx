"use client";

import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Eye, Trash2, FileText, Building2, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteCoverLetter } from "@/actions/cover-letter";

export default function CoverLetterList({ coverLetters }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully!");
      router.refresh();
    } catch (error) {
      toast.error(error.message || "Failed to delete cover letter");
    }
  };

  if (!coverLetters?.length) {
    return (
      <Card className="text-center py-12">
        <CardHeader>
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <FileText className="h-8 w-8 text-violet-500" />
          </div>
          <CardTitle className="text-2xl">No Cover Letters Yet</CardTitle>
          <CardDescription className="text-base">
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => router.push("/ai-cover-letter/new")}>
            <Sparkles className="h-4 w-4 mr-2" />
            Create Cover Letter
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {coverLetters.map((letter) => (
        <Card key={letter.id} className="group hover:border-violet-500/50 transition-all duration-300">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <CardTitle className="text-xl font-bold group-hover:text-violet-500 transition-colors truncate">
                  {letter.jobTitle}
                </CardTitle>
                <div className="flex flex-wrap items-center gap-3 mt-2">
                  <Badge variant="outline" className="gap-1">
                    <Building2 className="h-3 w-3" />
                    {letter.companyName}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {format(new Date(letter.createdAt), "PPP")}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => router.push(`/ai-cover-letter/${letter.id}`)}
                  className="hover:bg-violet-500/10 hover:border-violet-500/50 hover:text-violet-500"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Cover Letter?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your cover letter for {letter.jobTitle} at{" "}
                        {letter.companyName}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(letter.id)}
                        className="bg-gradient-to-r from-red-500 to-rose-500 text-white hover:opacity-90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="p-3 rounded-xl bg-muted/50 border border-border/50">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {letter.jobDescription}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
