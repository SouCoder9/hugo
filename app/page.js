import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Trophy,
  Target,
  Sparkles,
  CheckCircle2,
  Zap,
  Star,
} from "lucide-react";
import HeroSection from "@/components/hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import { features } from "@/data/features";
import { testimonial } from "@/data/testimonial";
import { faqs } from "@/data/faqs";
import { howItWorks } from "@/data/howItWorks";

export default function LandingPage() {
  return (
    <>
      <div className="grid-background"></div>

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="w-full py-20 md:py-32 bg-background relative">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-500 dark:text-violet-400 mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Powerful Features</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything You Need for{" "}
              <span className="text-gradient">Career Growth</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI-powered platform provides all the tools you need to advance your career
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="pt-8 pb-8 text-center flex flex-col items-center relative">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      {React.cloneElement(feature.icon, { className: "w-8 h-8 text-violet-500" })}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-20 md:py-32 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-500 dark:text-violet-400 mb-6">
              <Zap className="h-4 w-4" />
              <span>Simple Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Four simple steps to accelerate your career growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center space-y-4 group"
              >
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-xl group-hover:shadow-violet-500/40 transition-all duration-300 group-hover:scale-110">
                    {React.cloneElement(item.icon, { className: "w-10 h-10 text-white" })}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-background border-2 border-violet-500 flex items-center justify-center text-sm font-bold text-violet-500">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-bold text-xl">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-500 dark:text-violet-400 mb-6">
              <Star className="h-4 w-4 fill-violet-500" />
              <span>Testimonials</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What Our <span className="text-gradient">Users Say</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonial.map((testimonial, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm group">
                <CardContent className="pt-8 pb-8">
                  <div className="flex flex-col space-y-6">
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-pink-500 rounded-full opacity-50 blur group-hover:opacity-75 transition-opacity" />
                        <Image
                          width={56}
                          height={56}
                          src={testimonial.image}
                          alt={testimonial.author}
                          className="relative rounded-full object-cover w-14 h-14 border-2 border-background"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-lg">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                        <p className="text-sm text-violet-500 font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <blockquote className="relative">
                      <div className="absolute -top-4 -left-2 text-6xl text-violet-500/20 font-serif">"</div>
                      <p className="text-muted-foreground italic pl-6 leading-relaxed">
                        {testimonial.quote}
                      </p>
                    </blockquote>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-violet-500 text-violet-500" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="w-full py-20 md:py-32 bg-muted/30 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-sm font-medium text-violet-500 dark:text-violet-400 mb-6">
              <CheckCircle2 className="h-4 w-4" />
              <span>FAQ</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="text-gradient">Questions</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our platform
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-lg">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-base">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZ2LTRoLTJ2NGgyem0tNiA2aC00djJoNHYtMnptMC02aC00djJoNHYtMnptMC02aC00djJoNHYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-white backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>Start Your Journey Today</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
              Ready to Accelerate Your Career?
            </h2>
            <p className="mx-auto max-w-[600px] text-white/80 text-lg md:text-xl">
              Join thousands of professionals who are advancing their careers
              with AI-powered guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard" passHref>
                <Button
                  size="xl"
                  className="bg-white text-white/80 hover:bg-gray-100 shadow-xl shadow-black/30 group font-bold border-2 border-white/50 animate-bounce-slow"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
            <p className="text-white/60 text-sm">
              No credit card required • Free forever plan available
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
