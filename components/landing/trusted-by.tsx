export function TrustedBy() {
  return (
    <section className="py-20 border-b border-black/[0.03]">
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <h2 className="text-xs font-semibold text-muted-foreground/60 mb-10 tracking-[0.15em] uppercase">
          Confidence backed by results
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-x-14 gap-y-10 opacity-40 hover:opacity-80 grayscale hover:grayscale-0 transition-all duration-700">
          {/* Mock Logos */}
          {['Acme Corp', 'GlobalTech', 'Nexus', 'Stark Ind.', 'Wayne Ent.'].map((company) => (
            <div key={company} className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-sm bg-foreground/50" />
              <span className="font-semibold text-sm tracking-tight text-foreground/80">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
