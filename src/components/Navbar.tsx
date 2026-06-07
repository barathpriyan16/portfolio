"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download, Terminal } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Achievements", href: "#achievements" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Monitor scroll height and active section
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state
      setScrolled(window.scrollY > 20);

      // Track scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Track active section
      const sections = navItems.map((item) => item.href.substring(1));
      let currentSection = "home";

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the section is close to the top of screen
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = sectionId;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const handleDownloadResume = () => {
    // Open resume / mock file
    alert("Downloading BARATHPRIYAN R's Resume... (Mock PDF triggered successfully)");
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-accent-blue via-cyan-glow to-accent-purple z-[100] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl z-[90] rounded-full transition-all duration-300 ${
          scrolled ? "glassmorphism shadow-2xl py-3 px-6" : "bg-transparent py-5 px-4"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo / Console Prompt */}
          <a
            href="#home"
            onClick={(e) => handleScrollToSection(e, "#home")}
            className="flex items-center gap-2 group cursor-pointer text-white font-sans font-black tracking-widest text-sm uppercase"
          >
            <Terminal className="w-5 h-5 text-cyan-glow group-hover:rotate-12 transition-transform duration-300" />
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Barathpriyan
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScrollToSection(e, item.href)}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full ${
                    isActive ? "text-cyan-glow" : "text-text-gray hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-white/5 border border-white/10 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden md:block">
            <button
              onClick={handleDownloadResume}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-accent-blue to-accent-purple hover:from-cyan-glow hover:to-accent-blue transition-all duration-300 shadow-md shadow-accent-blue/15 hover:shadow-cyan-glow/20 cursor-pointer transform hover:-translate-y-[1px]"
            >
              <Download className="w-4 h-4" />
              Resume
            </button>
          </div>

          {/* Mobile Hamburguer */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-text-gray hover:text-white transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-4 top-20 z-80 glassmorphism rounded-2xl p-6 shadow-3xl flex flex-col gap-4 md:hidden"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleScrollToSection(e, item.href)}
                    className={`px-4 py-3 rounded-xl font-medium text-base transition-all ${
                      isActive
                        ? "bg-white/5 text-cyan-glow border-l-2 border-cyan-glow"
                        : "text-text-gray hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>
            <hr className="border-white/5 my-2" />
            <button
              onClick={handleDownloadResume}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-accent-blue to-accent-purple hover:from-cyan-glow hover:to-accent-blue transition-all"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
