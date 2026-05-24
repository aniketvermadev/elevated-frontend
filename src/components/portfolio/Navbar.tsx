import { useEffect, useState } from "react";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  // { id: "github", label: "GitHub" },
];

export function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      let current = "home";
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.getBoundingClientRect().top <= 120) current = l.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(96%,920px)] rounded-full transition-all ${
        scrolled ? "glass-strong shadow-glow" : "glass"
      }`}
    >
      <nav className="flex items-center justify-between px-4 sm:px-6 py-3">
        <a href="#home" className="flex items-center gap-2 font-display font-bold">
          <span className="size-7 rounded-lg bg-gradient-primary shadow-glow animate-pulse-glow grid place-items-center text-xs">
            {"</>"}
          </span>
          <span className="hidden sm:inline">Devfolio</span>
        </a>
        <ul className="hidden md:flex items-center gap-1 text-sm">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative px-3 py-1.5 rounded-full transition-colors ${
                  active === l.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === l.id && (
                  <span className="absolute inset-0 -z-10 rounded-full bg-gradient-primary opacity-20" />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="hidden sm:inline-flex items-center text-sm font-medium px-4 py-1.5 rounded-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition"
        >
          Contact
        </a>
      </nav>
    </header>
  );
}
