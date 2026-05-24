import { Code2, Gauge, Layers, Rocket } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";

const points = [
  { icon: Code2, title: "Component Architecture", text: "Reusable, typed component systems that scale across teams." },
  { icon: Layers, title: "React & Next.js", text: "Deep ecosystem expertise — App Router, RSC, SSR/ISR, edge." },
  { icon: Gauge, title: "Performance", text: "Core Web Vitals, code-splitting, bundle budgets, edge caching." },
  { icon: Rocket, title: "DX & Velocity", text: "Design systems, CI, Storybook — ship faster without breaking polish." },
];

export function About() {
  return (
    <section id="about" className="py-28 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="About"
          title={<>Engineering interfaces that <span className="text-gradient">feel inevitable</span></>}
          description="I'm a senior frontend developer with 4+ years building scalable, responsive web applications. My focus: the React and Next.js ecosystem, performance optimization, and reusable component systems that empower teams to ship faster."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {points.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08}>
              <div className="glass rounded-2xl p-6 card-hover h-full">
                <div className="size-11 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <p.icon className="size-5 text-primary-foreground" />
                </div>
                <h3 className="mt-5 font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
