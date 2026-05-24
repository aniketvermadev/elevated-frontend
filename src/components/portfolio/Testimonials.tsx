import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";

const items = [
  {
    quote: "One of the most detail-oriented frontend engineers I've worked with. The motion, the polish, the performance — every layer is considered.",
    name: "Sarah Chen",
    role: "Head of Product, Lumen",
  },
  {
    quote: "Took our marketing site from clunky to award-worthy in three weeks. Recruiters and customers both noticed the difference.",
    name: "Marcus Hill",
    role: "Founder, Northwind AI",
  },
  {
    quote: "A rare blend of design taste and engineering discipline. Our Lighthouse score jumped to 99 across the board.",
    name: "Priya Sharma",
    role: "Engineering Lead, Stripe-adjacent",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const t = items[i];
  return (
    <section className="py-28 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Testimonials"
          title={<>What collaborators <span className="text-gradient">say</span></>}
        />
        <Reveal>
          <div className="relative max-w-3xl mx-auto glass-strong rounded-3xl p-10 shadow-glow">
            <Quote className="size-10 text-primary opacity-60" />
            <p className="mt-6 text-xl sm:text-2xl leading-snug font-display">
              "{t.quote}"
            </p>
            <div className="mt-8 flex items-center justify-between">
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.role}</div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setI((i - 1 + items.length) % items.length)}
                  className="size-10 rounded-full glass grid place-items-center hover:border-primary/50 transition"
                  aria-label="Previous"
                >
                  <ChevronLeft className="size-4" />
                </button>
                <button
                  onClick={() => setI((i + 1) % items.length)}
                  className="size-10 rounded-full bg-gradient-primary grid place-items-center hover:opacity-90 transition"
                  aria-label="Next"
                >
                  <ChevronRight className="size-4 text-primary-foreground" />
                </button>
              </div>
            </div>
            <div className="mt-6 flex gap-1.5">
              {items.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === i ? "w-8 bg-gradient-primary" : "w-4 bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
