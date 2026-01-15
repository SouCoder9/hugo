import React from "react";
import { Button } from "./ui/button";
import {
  PenBox,
  LayoutDashboard,
  FileText,
  GraduationCap,
  ChevronDown,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();

  return (
    <header className="fixed top-0 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500" />
            <Image
              src={"/logo.png"}
              alt="hugo Logo"
              width={200}
              height={60}
              className="h-10 py-1 w-auto object-contain relative"
            />
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <SignedIn>
            <Link href="/dashboard">
              <Button
                variant="outline"
                className="hidden md:inline-flex items-center gap-2"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Industry Insights</span>
              </Button>
              <Button variant="ghost" className="md:hidden w-10 h-10 p-0">
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>

            {/* Growth Tools Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="flex items-center gap-2 group">
                  <Sparkles className="h-4 w-4 group-hover:animate-pulse" />
                  <span className="hidden md:block">Growth Tools</span>
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link href="/resume" className="flex items-center gap-3 py-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-violet-500/10">
                      <FileText className="h-4 w-4 text-violet-500" />
                    </div>
                    <div>
                      <p className="font-medium">Build Resume</p>
                      <p className="text-xs text-muted-foreground">Create ATS-optimized resume</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="/ai-cover-letter"
                    className="flex items-center gap-3 py-1"
                  >
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-purple-500/10">
                      <PenBox className="h-4 w-4 text-purple-500" />
                    </div>
                    <div>
                      <p className="font-medium">Cover Letter</p>
                      <p className="text-xs text-muted-foreground">AI-powered cover letters</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/interview" className="flex items-center gap-3 py-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-500/10">
                      <GraduationCap className="h-4 w-4 text-pink-500" />
                    </div>
                    <div>
                      <p className="font-medium">Interview Prep</p>
                      <p className="text-xs text-muted-foreground">Practice with AI mock interviews</p>
                    </div>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SignedIn>

          <SignedOut>
            <SignInButton>
              <Button variant="outline" className="gap-2">
                <Zap className="h-4 w-4" />
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10 ring-2 ring-violet-500/20 ring-offset-2 ring-offset-background",
                  userButtonPopoverCard: "shadow-xl border border-border/50 backdrop-blur-xl",
                  userPreviewMainIdentifier: "font-semibold",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
