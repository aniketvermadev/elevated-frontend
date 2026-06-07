import { Reveal, SectionHeader } from "./Section";

const groups = [
  {
    title: "Frontend",
    items: [
      { name: "HTML5", level: 98 },
      { name: "CSS3", level: 96 },
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "React", level: 96 },
      { name: "Next.js", level: 85 },
    ],
  },
  {
    title: "Styling",
    items: [
      { name: "Tailwind CSS", level: 97 },
      { name: "Bootstrap", level: 90 },
      { name: "SCSS", level: 88 },
    ],
  },
  {
    title: "Tools",
    items: [
      { name: "GitHub", level: 95 },
      { name: "Git", level: 95 },
      { name: "VS Code", level: 98 },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="pt-28 pb-5 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Skills"
          title={<>A toolkit tuned for <span className="text-gradient">premium interfaces</span></>}
        />
        <div className="grid lg:grid-cols-3 gap-6">
          {groups.map((g, gi) => (
            <Reveal key={g.title} delay={gi * 0.1}>
              <div className="glass rounded-2xl p-6 card-hover h-full">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-xl font-bold">{g.title}</h3>
                  <span className="text-xs font-mono text-muted-foreground">
                    {g.items.length} skills
                  </span>
                </div>
                <ul className="mt-6 space-y-4">
                  {g.items.map((s) => (
                    <li key={s.name}>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span>{s.name}</span>
                        {/* <span className="text-muted-foreground font-mono text-xs">
                          {s.level}%
                        </span> */}
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full"
                          style={{ width: `${s.level}%` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
