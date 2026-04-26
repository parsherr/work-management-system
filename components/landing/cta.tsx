import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTA() {
  return (
    <section className="py-32 px-6 bg-card border-t border-black/[0.03] text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] mix-blend-overlay"></div>
      <div className="max-w-2xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-instrument mb-8 tracking-tight leading-tight">Ready to transform your business?</h2>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed font-medium">
          Join thousands of modern teams that use WorkSync to manage their projects, people, and operations with absolute clarity.
        </p>
        <Button size="lg" className="rounded-full px-10 h-14 text-base shadow-soft bg-foreground text-background hover:bg-foreground/90 font-semibold" asChild>
          <Link href="/dashboard">Try Demo</Link>
        </Button>
      </div>
    </section>
  )
}
