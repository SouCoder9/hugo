import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100vh] px-4 text-center relative">
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-violet-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="relative z-10">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-violet-500/20 to-pink-500/20 flex items-center justify-center mx-auto mb-8">
          <Search className="h-12 w-12 text-violet-500" />
        </div>
        
        <h1 className="text-8xl md:text-9xl font-bold text-gradient mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground text-lg mb-8 max-w-md mx-auto">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="group">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
          </Link>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
