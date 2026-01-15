import { getCoverLetters } from "@/actions/cover-letter";
import Link from "next/link";
import { Plus, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import CoverLetterList from "./_components/cover-letter-list";

export default async function CoverLetterPage() {
  const coverLetters = await getCoverLetters();

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20">
            <FileText className="h-8 w-8 text-violet-500" />
          </div>
          <div>
            <h1 className="text-4xl md:text-5xl font-bold">
              My <span className="text-gradient">Cover Letters</span>
            </h1>
            <p className="text-muted-foreground mt-1">Create and manage your AI-powered cover letters</p>
          </div>
        </div>
        <Link href="/ai-cover-letter/new">
          <Button className="group">
            <Sparkles className="h-4 w-4 mr-2 group-hover:animate-pulse" />
            Create New
          </Button>
        </Link>
      </div>

      <CoverLetterList coverLetters={coverLetters} />
    </div>
  );
}
