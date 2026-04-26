export function Testimonial() {
  return (
    <section className="py-32 px-6 border-b border-black/[0.03]">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full overflow-hidden mb-10 border border-black/[0.05] shadow-soft flex items-center justify-center bg-gradient-to-br from-card to-background">
          <svg className="w-5 h-5 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <blockquote className="text-3xl md:text-[2.75rem] font-instrument mb-10 leading-[1.2] tracking-tight text-foreground">
          "In just a few minutes, we transformed our data into actionable insights. This process was so smooth and incredibly efficient."
        </blockquote>
        <div className="flex flex-col items-center">
          <div className="font-semibold text-base text-foreground mb-0.5">Jane Doe</div>
          <div className="text-muted-foreground text-sm font-medium">VP of Operations, TechCorp</div>
        </div>
      </div>
    </section>
  )
}
