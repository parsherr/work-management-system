import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GithubIcon } from "@/components/icons/github"

export function Hero() {
  return (
    <section className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-center relative z-10">
      <div className="mx-auto max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs font-semibold text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <GithubIcon className="h-3.5 w-3.5" />
          <span>100% Open Source on GitHub</span>
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-instrument leading-[1.05] tracking-tight text-foreground mb-6">
          Effortless team management <br className="hidden sm:block"/> by WorkSync
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed font-medium">
          Unify your organization with a workspace designed for absolute clarity. Shared cloud storage, seamless task pipelines, and intelligent calendars.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <Button size="lg" className="rounded-full px-8 h-12 text-base shadow-soft w-full sm:w-auto bg-foreground text-background hover:opacity-90 transition-opacity font-semibold" asChild>
            <Link href="/dashboard">Try Demo</Link>
          </Button>
          <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base shadow-sm w-full sm:w-auto border-border bg-card hover:bg-muted font-semibold group" asChild>
            <Link href="https://github.com/parsherr/work-management-system" target="_blank" rel="noreferrer">
              <GithubIcon className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              Star on GitHub
            </Link>
          </Button>
        </div>
      </div>
      
      {/* App Mockup Placeholder */}
      <div className="relative mx-auto max-w-5xl rounded-2xl p-1.5 shadow-soft">
        {/* Glowing Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-200/40 via-red-100/30 to-green-100/40 rounded-[2rem] blur-2xl -z-10 transform scale-105" />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/50 to-transparent rounded-[2rem] -z-10" />
        
        {/* Mockup Container */}
        <div className="w-full rounded-xl bg-card border border-border shadow-sm overflow-hidden relative z-20">
          <img 
            src="/task-page-v2.png" 
            alt="WorkSync Task Management" 
            className="w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  )
}
