import { Reveal, SectionHeader } from "./Section";

const timeline = [
  {
    period: "2023 — Present",
    role: "Senior Frontend Developer",
    company: "Independent / Remote",
    points: [
      "Led frontend for SaaS dashboards used by 50K+ users",
      "Built design system shared across 4 product teams",
      "Cut LCP by 43% via code-splitting & edge caching",
    ],
  },
  {
    period: "2022 — 2023",
    role: "Frontend Developer",
    company: "Product Studio",
    points: [
      "Shipped 12+ Next.js marketing & app surfaces",
      "Owned REST API integrations and auth flows",
      "Mentored 2 junior devs on React patterns",
    ],
  },
  {
    period: "2021 — 2022",
    role: "Frontend Developer",
    company: "Agency",
    points: [
      "Built responsive e-commerce experiences",
      "Collaborated with design on motion & UX",
      "Migrated legacy jQuery sites to React",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-28 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Experience"
          title={<>A timeline of <span className="text-gradient">shipped work</span></>}
        />
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
          {timeline.map((t, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div
                className={`relative mb-10 sm:w-1/2 ${
                  i % 2 === 0 ? "sm:pr-12" : "sm:ml-auto sm:pl-12"
                } pl-12 sm:pl-0`}
              >
                <span
                  className={`absolute top-6 size-3 rounded-full bg-gradient-primary shadow-glow ${
                    i % 2 === 0
                      ? "left-3 sm:left-auto sm:-right-1.5"
                      : "left-3 sm:-left-1.5"
                  }`}
                />
                <div className="glass rounded-2xl p-6 card-hover">
                  <div className="text-xs font-mono text-primary">{t.period}</div>
                  <h3 className="mt-1 text-xl font-bold">{t.role}</h3>
                  <div className="text-sm text-muted-foreground">{t.company}</div>
                  <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                    {t.points.map((p) => (
                      <li key={p} className="flex gap-2">
                        <span className="text-primary">▹</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
