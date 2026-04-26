import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GithubIcon } from "@/components/icons/github"
import { ModeToggle } from "@/components/mode-toggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-instrument text-2xl font-bold tracking-tight">WorkSync</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#faq" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Link 
            href="https://github.com/parsherr/work-management-system" 
            target="_blank" 
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-2"
          >
            <GithubIcon className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Button className="rounded-full px-6 h-9 font-semibold" asChild>
            <Link href="/dashboard">Try Demo</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
