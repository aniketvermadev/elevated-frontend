import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/60 py-10 mt-10">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="size-6 rounded-md bg-gradient-primary shadow-glow grid place-items-center text-[10px] text-primary-foreground">
            {"</>"}
          </span>
          © {new Date().getFullYear()} Devfolio. Crafted with care.
        </div>
        <div className="flex items-center gap-2">
          {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="size-10 grid place-items-center rounded-full glass hover:border-primary/50 hover:text-primary transition"
            >
              <Icon className="size-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
