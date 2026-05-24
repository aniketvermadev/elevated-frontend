import { GitBranch, GitCommit, Star, Users } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";

const stats = [
  { icon: GitCommit, label: "Contributions", value: "1,420+" },
  { icon: Star, label: "Stars earned", value: "320+" },
  { icon: GitBranch, label: "Repositories", value: "60+" },
  { icon: Users, label: "Followers", value: "180+" },
];

// 52 weeks * 7 days contribution grid
const days = Array.from({ length: 52 * 7 }, (_, i) => {
  const seed = Math.sin(i * 12.9898) * 43758.5453;
  const r = seed - Math.floor(seed);
  return Math.floor(r * 5); // 0-4 intensity
});

const colors = [
  "bg-muted",
  "bg-primary/20",
  "bg-primary/40",
  "bg-primary/70",
  "bg-gradient-primary",
];

export function GitHubSection() {
  return (
    <section id="github" className="py-28 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Open Source"
          title={<>Building in <span className="text-gradient">public</span></>}
        />
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-6">
          <Reveal>
            <div className="grid grid-cols-2 gap-4 h-full">
              {stats.map((s) => (
                <div key={s.label} className="glass rounded-2xl p-5 card-hover">
                  <s.icon className="size-5 text-primary" />
                  <div className="mt-4 text-2xl font-bold font-display">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6 card-hover h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Contribution activity</h3>
                <span className="text-xs font-mono text-muted-foreground">Last 12 months</span>
              </div>
              <div className="overflow-x-auto">
                <div
                  className="grid grid-flow-col grid-rows-7 gap-[3px] min-w-[640px]"
                  style={{ gridTemplateColumns: "repeat(52, minmax(0, 1fr))" }}
                >
                  {days.map((d, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-[3px] ${colors[d]}`}
                      title={`${d} contributions`}
                    />
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
                Less
                {colors.map((c, i) => (
                  <span key={i} className={`size-3 rounded-[3px] ${c}`} />
                ))}
                More
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
