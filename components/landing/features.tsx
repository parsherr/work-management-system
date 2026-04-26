import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Features() {
  return (
    <section id="features" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-20 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-[3.5rem] font-instrument mb-6 tracking-tight leading-tight">Built for absolute clarity<br/>and focused work</h2>
        <p className="text-lg text-muted-foreground font-medium">
          Everything you need to manage your team, securely stored and seamlessly connected in one intelligent workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feature 1: Shared Cloud Storage */}
        <div className="lg:col-span-2 bg-card rounded-3xl border border-black/[0.04] shadow-soft p-10 flex flex-col md:flex-row gap-10 overflow-hidden relative group hover:shadow-lg transition-shadow duration-500">
          <div className="flex-1 flex flex-col justify-center">
            <div className="w-10 h-10 rounded-xl bg-blue-50/50 flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Shared Cloud Storage</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">Centralize your team's files with secure, lightning-fast cloud storage. Organize, search, and collaborate on documents without leaving your workspace.</p>
          </div>
          <div className="flex-1 relative min-h-[220px] bg-background/50 border border-border/50 shadow-sm rounded-xl overflow-hidden translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 flex flex-col">
             <div className="h-10 border-b border-border/50 bg-card/80 flex items-center px-4"><div className="w-1/2 h-2.5 bg-muted/60 rounded-full"/></div>
             <div className="p-4 grid grid-cols-3 gap-3 flex-1">
               {[1,2,3,4,5,6].map(i => <div key={i} className="bg-card border border-border/40 shadow-sm rounded-lg" />)}
             </div>
          </div>
        </div>

        {/* Feature 2: Task Management */}
        <div className="bg-card rounded-3xl border border-black/[0.04] shadow-soft p-10 flex flex-col justify-between hover:shadow-lg transition-shadow duration-500">
          <div>
            <div className="w-10 h-10 rounded-xl bg-green-50/50 flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Intelligent Tasks</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">Break down complex projects into manageable tasks. Assign, track, and conquer together.</p>
          </div>
          <div className="mt-8 flex flex-col gap-3">
             <div className="h-12 border border-border/50 rounded-lg p-3 flex items-center gap-3"><div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30"/><div className="h-2 w-1/2 bg-muted/60 rounded-full"/></div>
             <div className="h-12 border border-border/50 rounded-lg p-3 flex items-center gap-3"><div className="w-4 h-4 rounded-full border-2 border-muted-foreground/30"/><div className="h-2 w-2/3 bg-muted/60 rounded-full"/></div>
          </div>
        </div>

        {/* Feature 3: Pipelines */}
        <div className="bg-card rounded-3xl border border-black/[0.04] shadow-soft p-10 flex flex-col justify-between hover:shadow-lg transition-shadow duration-500">
          <div>
            <div className="w-10 h-10 rounded-xl bg-purple-50/50 flex items-center justify-center mb-6">
              <svg className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Visual Pipelines</h3>
            <p className="text-muted-foreground leading-relaxed text-sm">Map out your workflows with custom kanban boards. See exactly where everything stands at a glance.</p>
          </div>
        </div>

        {/* Feature 4: Member Management & Analytics */}
        <div className="lg:col-span-2 bg-card rounded-3xl border border-black/[0.04] shadow-soft p-10 flex flex-col sm:flex-row gap-10 overflow-hidden relative group hover:shadow-lg transition-shadow duration-500">
           <div className="flex-1 flex flex-col justify-center order-2 sm:order-1">
             <div className="flex gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-red-50/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div className="w-10 h-10 rounded-xl bg-orange-50/50 flex items-center justify-center">
                  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
                </div>
             </div>
            <h3 className="text-xl font-semibold mb-3">Team & Analytics</h3>
            <p className="text-muted-foreground leading-relaxed text-sm mb-6">Manage roles, access, and team capacity. Leverage real-time analytics to measure velocity and optimize your operations continuously.</p>
            <div>
              <Button variant="link" className="px-0 text-foreground font-medium" asChild>
                 <Link href="/features">See all capabilities <svg className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg></Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 relative min-h-[220px] bg-background/50 border border-border/50 shadow-sm rounded-xl overflow-hidden order-1 sm:order-2 flex flex-col justify-between">
              <div className="p-6 flex-1 flex items-end gap-2">
                  <div className="flex-1 bg-blue-100 rounded-t-sm h-[40%]" />
                  <div className="flex-1 bg-blue-200 rounded-t-sm h-[60%]" />
                  <div className="flex-1 bg-blue-400 rounded-t-sm h-[80%]" />
                  <div className="flex-1 bg-blue-500 rounded-t-sm h-[100%]" />
                  <div className="flex-1 bg-blue-600 rounded-t-sm h-[70%]" />
              </div>
              <div className="h-px bg-border/50 w-full" />
              <div className="p-4 flex justify-between items-center bg-card">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-card bg-muted/80" />)}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground">+24 team</div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
