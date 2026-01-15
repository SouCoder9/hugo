"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Star } from "lucide-react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/30 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 right-10 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-purple-500/20 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="space-y-8 text-center relative z-10">
        {/* Badge */}
        <div className="flex justify-center animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-500 dark:text-violet-400">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Career Advancement</span>
            <Star className="h-4 w-4 fill-violet-500 text-violet-500" />
          </div>
        </div>

        <div className="space-y-6 mx-auto">
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient-title animate-fade-in-up">
            Your AI Career Coach for
            <br />
            <span className="relative">
              Professional Success
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 10C50 4 100 2 150 6C200 10 250 4 298 8" stroke="url(#gradient)" strokeWidth="3" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="gradient" x1="0" y1="0" x2="300" y2="0">
                    <stop stopColor="#7c3aed"/>
                    <stop offset="0.5" stopColor="#a855f7"/>
                    <stop offset="1" stopColor="#ec4899"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl leading-relaxed animate-fade-in">
            Advance your career with personalized guidance, interview prep, and
            AI-powered tools for job success.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-in-up">
          <Link href="/dashboard">
            <Button size="xl" className="px-8 group">
              <Zap className="h-5 w-5 mr-2 group-hover:animate-pulse" />
              Get Started Free
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="#features">
            <Button size="xl" variant="outline" className="px-8">
              Learn More
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 animate-fade-in">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient">50+</div>
            <div className="text-sm text-muted-foreground">Industries</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient">1000+</div>
            <div className="text-sm text-muted-foreground">Interview Questions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient">95%</div>
            <div className="text-sm text-muted-foreground">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gradient">24/7</div>
            <div className="text-sm text-muted-foreground">AI Support</div>
          </div>
        </div>

        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            {/* <Image
              src="/banner.jpeg"
              width={1280}
              height={720}
              alt="Dashboard Preview"
              className="rounded-2xl shadow-2xl border border-border/50 mx-auto"
              priority
            /> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
