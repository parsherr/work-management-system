export function FAQ() {
  const faqs = [
    { q: "What is WorkSync?", a: "WorkSync is an all-in-one team management platform designed to unify your cloud storage, task pipelines, and member analytics in one beautiful workspace." },
    { q: "How secure is the cloud storage?", a: "We use enterprise-grade end-to-end encryption to ensure that your files and data are always secure and compliant with industry standards." },
    { q: "Can I migrate from my current tools?", a: "Yes, we offer one-click integrations and import tools for popular platforms like Jira, Trello, and Google Drive to make your transition seamless." },
    { q: "Is there a free trial available?", a: "Yes, you can try all Professional and Enterprise features free for 14 days without entering a credit card." }
  ];
  return (
    <section id="faq" className="py-32 px-6 max-w-3xl mx-auto border-t border-black/[0.03]">
      <h2 className="text-4xl md:text-5xl font-instrument mb-16 tracking-tight text-center">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-black/[0.04] pb-6 pt-4 group">
            <h3 className="text-lg font-semibold mb-3 text-foreground group-hover:text-foreground/70 transition-colors cursor-pointer flex justify-between items-center">
              {faq.q}
              <svg className="w-5 h-5 text-muted-foreground/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </h3>
            <p className="text-muted-foreground leading-relaxed pr-8 text-sm font-medium">{faq.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
