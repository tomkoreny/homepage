'use client';

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <ThemeToggle />
      
      <div id="home">
        <Hero />
      </div>
      
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
