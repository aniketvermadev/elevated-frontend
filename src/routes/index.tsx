import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/portfolio/Navbar";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { GitHubSection } from "@/components/portfolio/GitHubSection";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { Toaster } from "@/components/ui/sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Devfolio — Senior Frontend Developer Portfolio" },
      { name: "description", content: "Senior Frontend Developer with 4+ years building modern, performant web experiences in React, Next.js & TypeScript." },
      { property: "og:title", content: "Devfolio — Senior Frontend Developer Portfolio" },
      { property: "og:description", content: "React, Next.js & TypeScript portfolio with featured projects and case studies." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="dark relative min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <GitHubSection />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}
