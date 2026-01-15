import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Career Coach - Your Path to Professional Success",
  description: "Advance your career with AI-powered guidance, interview prep, and smart tools for job success.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#8b5cf6",
          colorBackground: "#0a0a0f",
          colorInputBackground: "#1a1a2e",
          colorInputText: "#ffffff",
          borderRadius: "0.75rem",
        },
        elements: {
          formButtonPrimary: "bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 hover:opacity-90",
          card: "bg-card/95 backdrop-blur-xl border border-border/50",
          headerTitle: "text-foreground",
          headerSubtitle: "text-muted-foreground",
          socialButtonsBlockButton: "border-border/50 hover:bg-violet-500/10",
          formFieldInput: "border-border/50 focus:border-violet-500",
          footerActionLink: "text-violet-500 hover:text-violet-400",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/logo.png" sizes="any" />
        </head>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Background decorations */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-[150px]" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px]" />
            </div>
            
            <Header />
            <main className="min-h-screen">{children}</main>
            <Toaster 
              richColors 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  color: 'hsl(var(--foreground))',
                },
              }}
            />

            <footer className="relative bg-muted/30 py-16 border-t border-border/50">
              <div className="absolute inset-0 bg-gradient-to-t from-violet-500/5 via-transparent to-transparent pointer-events-none" />
              <div className="container mx-auto px-4 text-center relative">
                <div className="flex flex-col items-center gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span>Made with</span>
                    <span className="text-pink-500 animate-pulse">💗</span>
                    <span>by</span>
                    <span className="font-semibold text-gradient">Soubhadra</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} AI Career Coach. All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
