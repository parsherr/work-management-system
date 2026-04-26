import { Button } from "@/components/ui/button"

export function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-[3.5rem] font-instrument mb-6 tracking-tight leading-tight">Choose the perfect plan<br/>for your business</h2>
        <p className="text-lg text-muted-foreground max-w-lg mx-auto font-medium">Start for free, upgrade when you need more power and advanced controls.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {/* Free Plan */}
        <div className="rounded-3xl border border-black/[0.04] bg-card p-10 flex flex-col shadow-soft">
          <h3 className="text-xl font-semibold mb-2">Starter</h3>
          <p className="text-muted-foreground text-sm mb-8 h-10 leading-relaxed">Perfect for individuals and small teams starting out.</p>
          <div className="mb-8">
            <span className="text-5xl font-instrument tracking-tight">$0</span>
            <span className="text-muted-foreground text-sm font-medium ml-1">/mo</span>
          </div>
          <Button variant="outline" className="w-full mb-10 rounded-full h-11 border-border/80 text-foreground bg-transparent hover:bg-muted shadow-sm font-semibold">Start for free</Button>
          <ul className="space-y-4 text-sm flex-1 text-muted-foreground font-medium">
            <li className="flex items-center gap-3"><span className="text-foreground/40 text-xs">✔</span> Up to 5 members</li>
            <li className="flex items-center gap-3"><span className="text-foreground/40 text-xs">✔</span> Basic task tracking</li>
            <li className="flex items-center gap-3"><span className="text-foreground/40 text-xs">✔</span> 5GB Cloud Storage</li>
          </ul>
        </div>

        {/* Pro Plan */}
        <div className="rounded-3xl border border-foreground/10 bg-foreground text-background p-10 flex flex-col relative transform md:-translate-y-4 shadow-2xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-sm tracking-wide">MOST POPULAR</div>
          <h3 className="text-xl font-semibold mb-2 text-background">Professional</h3>
          <p className="text-muted-foreground text-sm mb-8 h-10 leading-relaxed opacity-80">For growing teams that need more power and flexibility.</p>
          <div className="mb-8">
            <span className="text-5xl font-instrument tracking-tight">$19</span>
            <span className="text-muted-foreground text-sm font-medium ml-1 opacity-80">/user/mo</span>
          </div>
          <Button className="w-full mb-10 rounded-full h-11 bg-background text-foreground hover:bg-background/90 shadow-sm font-semibold">Get started</Button>
          <ul className="space-y-4 text-sm flex-1 opacity-90 font-medium">
            <li className="flex items-center gap-3"><span className="text-blue-400 text-xs">✔</span> Unlimited members</li>
            <li className="flex items-center gap-3"><span className="text-blue-400 text-xs">✔</span> Advanced pipelines & reporting</li>
            <li className="flex items-center gap-3"><span className="text-blue-400 text-xs">✔</span> 1TB Cloud Storage</li>
            <li className="flex items-center gap-3"><span className="text-blue-400 text-xs">✔</span> Custom roles & permissions</li>
          </ul>
        </div>

        {/* Enterprise Plan */}
        <div className="rounded-3xl border border-black/[0.04] bg-card p-10 flex flex-col shadow-soft">
          <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
          <p className="text-muted-foreground text-sm mb-8 h-10 leading-relaxed">Advanced security and support for large organizations.</p>
          <div className="mb-8">
            <span className="text-5xl font-instrument tracking-tight">$49</span>
            <span className="text-muted-foreground text-sm font-medium ml-1">/user/mo</span>
          </div>
          <Button variant="outline" className="w-full mb-10 rounded-full h-11 border-border/80 text-foreground bg-transparent hover:bg-muted shadow-sm font-semibold">Contact sales</Button>
          <ul className="space-y-4 text-sm flex-1 text-muted-foreground font-medium">
            <li className="flex items-center gap-3"><span className="text-foreground/40 text-xs">✔</span> Everything in Professional</li>
            <li className="flex items-center gap-3"><span className="text-foreground/40 text-xs">✔</span> Unlimited Cloud Storage</li>
            <li className="flex items-center gap-3"><span className="text-foreground/40 text-xs">✔</span> SSO & Advanced Security</li>
            <li className="flex items-center gap-3"><span className="text-foreground/40 text-xs">✔</span> Dedicated Success Manager</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
