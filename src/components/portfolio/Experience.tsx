import { Reveal, SectionHeader } from "./Section";

const timeline = [
  {
    period: "2025 — Present",
    role: "Senior Frontend Developer",
    company: "Seraphic Infosolutions",
    points: [
      "Developed scalable and reusable UI components using React & Next.js",
      "Improved website performance and reduced LCP by 43% using code-splitting and optimization techniques",
      "Built and maintained responsive, pixel-perfect user interfaces for enterprise applications",
      "Collaborated closely with backend and design teams for smooth product delivery",
    ],
  },
  {
    period: "2023 — 2025",
    role: "Frontend Developer",
    company: "Weboapp Discovery Private Limited",
    points: [
      "Built responsive and interactive web applications using React.js",
      "Handled REST API integrations, authentication flows, and state management",
      "Worked on reusable component architecture to improve development speed",
      "Mentored junior developers on React best practices and clean code structure",
    ],
  },
  {
    period: "2021 — 2023",
    role: "Frontend Developer",
    company: "Logicease Tecno Solutions, Ambala, Haryana",
    points: [
      "Developed responsive e-commerce and business websites",
      "Collaborated with UI/UX designers to create modern user experiences",
      "Optimized frontend performance and improved cross-browser compatibility",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="pt-28 pb-5 relative">
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
