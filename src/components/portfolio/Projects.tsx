import { ExternalLink, Github } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";
import saas from "@/assets/project-saas.jpg";
import ai from "@/assets/project-ai.jpg";
import ecom from "@/assets/project-ecom.jpg";
import admin from "@/assets/project-admin.jpg";
import portfolio from "@/assets/project-portfolio.jpg";

const projects = [
  { title: "SaaS Analytics Dashboard", desc: "Real-time analytics with charts, filters, and team workspaces.", img: saas, stack: ["Next.js", "TypeScript", "Tailwind", "REST API"], featured: true },
  { title: "AI Platform Landing", desc: "High-converting marketing site with motion-rich storytelling.", img: ai, stack: ["Next.js", "Framer Motion", "GSAP"] },
  { title: "E-commerce Storefront", desc: "Headless commerce with cart, checkout & Stripe integration.", img: ecom, stack: ["React", "TypeScript", "SCSS"] },
  { title: "Admin Dashboard", desc: "Role-based admin with data tables and live charts.", img: admin, stack: ["React", "Tailwind", "REST API"] },
  { title: "Portfolio Website", desc: "Award-winning portfolio with cinematic interactions.", img: portfolio, stack: ["Next.js", "Tailwind", "Framer Motion"] },
];

export function Projects() {
  return (
    <section id="projects" className="pt-28 pb-5 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Featured Work"
          title={<>Selected <span className="text-gradient">projects</span></>}
          description="A handful of recent builds — production apps and landing experiences."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-5 auto-rows-[minmax(280px,auto)]">
          {projects.map((p, i) => (
            <Reveal
              key={p.title}
              delay={i * 0.06}
              className={p.featured ? "lg:col-span-4 lg:row-span-2" : "lg:col-span-2"}
            >
              <article className="group relative h-full overflow-hidden rounded-3xl glass card-hover">
                <div className={`relative overflow-hidden ${p.featured ? "aspect-[16/10]" : "aspect-[16/10]"}`}>
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="text-[11px] font-mono px-2 py-1 rounded-full bg-muted text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <a href="#" className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition">
                      <ExternalLink className="size-3.5" /> Live
                    </a>
                    <a href="#" className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full glass hover:border-primary/50 transition">
                      <Github className="size-3.5" /> Code
                    </a>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
