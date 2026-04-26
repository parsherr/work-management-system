import Link from "next/link"
import { GithubIcon } from "@/components/icons/github"

export function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-border/50 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
        <div className="col-span-2 md:col-span-1">
          <Link href="/" className="font-instrument text-2xl font-bold tracking-tight inline-block mb-4">WorkSync</Link>
          <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
            Making team management effortless, powerful, and beautifully simple.
          </p>
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="https://github.com/parsherr/work-management-system" 
              target="_blank" 
              rel="noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <GithubIcon className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
          <div className="text-sm text-muted-foreground/60">© 2026 WorkSync Inc.</div>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-6 text-sm tracking-wide">Product</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#features" className="hover:text-foreground transition-colors">Features</Link></li>
            <li><Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
            <li><Link href="https://github.com/parsherr/work-management-system" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">GitHub (Open Source)</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Changelog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-6 text-sm tracking-wide">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground transition-colors">About Us</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Blog</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-6 text-sm tracking-wide">Legal</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="#" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            <li><Link href="#" className="hover:text-foreground transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
