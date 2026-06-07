import { ExternalLink } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";
import skor from "@/assets/project-skor.webp";
import champsbase from "@/assets/project-champsbase.webp";
import crazyScale from "@/assets/project-crazyscale.webp";
import rrg from "@/assets/project-rrg.webp";
import kenzari from "@/assets/project-kenzari.webp";

const projects = [
  { title: "Skor", desc: "SKOR is rental platform with tenant verification, trust scoring, and property management tools.", img: skor, stack: ["React.js", "Bootstrap", "REST API"], featured: true, projectUrl: "https://app.skortorent.com/" },
  { title: "Champsbase", desc: "Online iGaming platform providing trusted casino and sports betting reviews, comparisons, and expert guides.", img: champsbase, stack: ["Next.js", "TypeScript", "Tailwind"], projectUrl: "https://champsbase.com/" },
  { title: "Crazy Scale", desc: "Product and AI studio transforming ideas into scalable, production-ready platforms.", img: crazyScale, stack: ["Next.js", "TypeScript", "SCSS"] },
  { title: "RRG Deals", desc: "Travel and booking platform for discovering, planning, and booking experiences in Red River Gorge.", img: rrg, stack: ["Next.js", "Tailwind", "GSAP", "REST API"] },
  { title: "Kenzari", desc: "Luxury e-commerce ecosystem for jewellery sales, customer engagement, and business operations.", img: kenzari, stack: ["Next.js", "Tailwind", "REST API"] },
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
                    <a href={p.projectUrl ?? ""} target="_blank" className="inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition">
                      <ExternalLink className="size-3.5" /> Live
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
