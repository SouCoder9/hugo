import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "hugo",
  description: "Ai Career Coach",
}

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={`${inter.className}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {/* Header */}
            <Header>
             <h1 className="text-2xl font-bold">My Website</h1>
            </Header>
            <main className="min-h-screen ">
              {children}
            </main>
            {/* Footer */}
            <footer className="bg-muted/50 py-12">
              <div className="container"><p>Footer Content</p></div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
      </ClerkProvider>
  )
}