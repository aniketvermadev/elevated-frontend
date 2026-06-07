import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";
import avatar from "@/assets/aniket.webp";

const stack = [
  "React", "Next.js", "TypeScript", "Tailwind", "JavaScript",
  "Node", "REST API", "GSAP", "Framer Motion", "Bootstrap", "SCSS", "Git",
];

export function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-5 overflow-hidden max-w-screen">
      <div className="absolute inset-0 grid-bg pointer-events-none" />
      <div className="absolute -top-32 -left-32 size-[480px] rounded-full bg-primary/30 blur-[120px]" />
      <div className="absolute top-20 -right-32 size-[420px] rounded-full bg-accent/30 blur-[120px]" />

      <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center relative">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-muted-foreground"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full size-2 bg-emerald-400" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]"
          >
            Frontend Developer{" "} <br />
            <span className="text-gradient">crafting modern</span> <br />
            web experiences
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground max-w-xl"
          >
            4+ years building scalable, high-performance interfaces in the
            React &amp; Next.js ecosystem. Obsessed with motion, polish, and
            pixel-perfect detail.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-glow-accent transition-all"
            >
              View Projects
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="/Aniket_Verma_Resume.pdf"
              download
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-primary/50 transition"
            >
              <Download className="size-4" />
              Download Resume
            </a>
            {/* <a
              href="#"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass hover:border-primary/50 transition"
            >
              <Github className="size-4" />
              GitHub
            </a> */}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="absolute inset-0 -m-8 rounded-full bg-gradient-primary blur-3xl opacity-40 animate-pulse-glow" />
          <div className="relative w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] max-w-full rounded-[2rem] overflow-hidden glass-strong animate-float">
            <img
              src={avatar}
              alt="Developer portrait"
              width={768}
              height={768}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-accent/20 mix-blend-overlay" />
          </div>
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl px-4 py-3 flex items-center gap-3 shadow-glow">
            <Sparkles className="size-4 text-primary" />
            <div>
              <div className="text-xs text-muted-foreground">Experience</div>
              <div className="text-sm font-semibold">4+ Years</div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="container mx-auto">
        <div className="mt-10 w-full max-w-full overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
          <div className="flex w-full overflow-hidden">
            <div className="flex min-w-max gap-3 animate-marquee">
              {[...stack, ...stack].map((s, i) => (
                <span
                  key={i}
                  className="shrink-0 px-4 py-2 rounded-full glass text-xs font-mono text-muted-foreground whitespace-nowrap"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
