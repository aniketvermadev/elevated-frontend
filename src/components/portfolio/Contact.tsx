import { useState } from "react";
import { Github, Linkedin, Mail, Send } from "lucide-react";
import { Reveal, SectionHeader } from "./Section";
import { toast } from "sonner";

export function Contact() {
  const [sending, setSending] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll reply within 24 hours.");
      (e.target as HTMLFormElement).reset();
    }, 900);
  };

  return (
    <section id="contact" className="py-28 relative">
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Contact"
          title={<>Let's build something <span className="text-gradient">amazing together</span></>}
          description="Open to senior frontend roles, freelance projects, and collaborations."
        />
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 max-w-5xl mx-auto">
          <Reveal>
            <div className="glass rounded-3xl p-8 h-full flex flex-col gap-4">
              <a href="mailto:hello@devfolio.dev" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition">
                <span className="size-10 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <Mail className="size-5 text-primary-foreground" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-medium">hello@devfolio.dev</div>
                </div>
              </a>
              <a href="#" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition">
                <span className="size-10 rounded-xl glass grid place-items-center">
                  <Linkedin className="size-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">LinkedIn</div>
                  <div className="font-medium">linkedin.com/in/devfolio</div>
                </div>
              </a>
              <a href="#" className="flex items-start gap-4 p-4 rounded-2xl hover:bg-muted/50 transition">
                <span className="size-10 rounded-xl glass grid place-items-center">
                  <Github className="size-5" />
                </span>
                <div>
                  <div className="text-xs text-muted-foreground">GitHub</div>
                  <div className="font-medium">github.com/devfolio</div>
                </div>
              </a>
              <div className="mt-auto pt-4 text-sm text-muted-foreground">
                Based remotely · Replies within 24h
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={onSubmit} className="glass-strong rounded-3xl p-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <Field label="Name" name="name" placeholder="Jane Doe" required />
                <Field label="Email" name="email" type="email" placeholder="jane@company.com" required />
              </div>
              <Field label="Subject" name="subject" placeholder="Project inquiry" />
              <div>
                <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Message</label>
                <textarea
                  required
                  rows={5}
                  name="message"
                  placeholder="Tell me about your project…"
                  className="mt-1.5 w-full rounded-xl bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-primary text-primary-foreground font-medium shadow-glow hover:shadow-glow-accent transition disabled:opacity-60"
              >
                {sending ? "Sending…" : <>Send message <Send className="size-4" /></>}
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{label}</label>
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl bg-background/40 border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60 focus:ring-2 focus:ring-primary/20 transition"
      />
    </div>
  );
}
