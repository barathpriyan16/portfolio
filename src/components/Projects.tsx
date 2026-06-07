"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Code2, Check, X, Layers } from "lucide-react";
import { portfolioData, ProjectItem } from "@/data/portfolio";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);


export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // 3D Mouse Tilt Calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalize coordinates relative to card center (-0.5 to 0.5)
    const normalizedX = (x / rect.width) - 0.5;
    const normalizedY = (y / rect.height) - 0.5;
    
    const rotateX = normalizedY * -15; // rotate limit 15deg
    const rotateY = normalizedX * 15;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[30%] left-[-10%] w-[350px] h-[350px] purple-radial-glow opacity-30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="bg-gradient-to-r from-accent-blue via-cyan-glow to-accent-purple bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="h-[3px] bg-accent-blue mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {portfolioData.projects.map((proj) => (
            <div
              key={proj.id}
              className="group relative rounded-2xl p-[1.5px] bg-white/5 overflow-hidden transition-all duration-500"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Dynamic glowing background border */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent-blue via-cyan-glow to-accent-purple opacity-10 group-hover:opacity-40 transition-opacity duration-500 -z-10" />

              {/* Card Main body */}
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedProject(proj)}
                className="h-full bg-brand-secondary/95 rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer transition-all duration-300 ease-out border border-white/5"
                style={{ transformStyle: "preserve-3d", transition: "transform 0.1s ease-out" }}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-4" style={{ transform: "translateZ(30px)" }}>
                    <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-cyan-glow">
                      <Code2 className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-text-gray font-semibold bg-brand-bg px-2.5 py-1 rounded-md border border-white/5">
                      {proj.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-cyan-glow transition-colors duration-300 mb-3"
                    style={{ transform: "translateZ(40px)" }}
                  >
                    {proj.title}
                  </h3>

                  {/* Snippet Description */}
                  <p
                    className="text-text-gray text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6"
                    style={{ transform: "translateZ(20px)" }}
                  >
                    {proj.description}
                  </p>
                </div>

                {/* Bottom Tags and CTA */}
                <div style={{ transform: "translateZ(35px)" }}>
                  {/* Tech stack top badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {proj.tech.slice(0, 4).map((techName) => (
                      <span
                        key={techName}
                        className="px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-brand-bg rounded-md border border-white/5"
                      >
                        {techName}
                      </span>
                    ))}
                    {proj.tech.length > 4 && (
                      <span className="px-2 py-0.5 text-[10px] font-mono text-cyan-glow bg-brand-bg rounded-md border border-white/5">
                        +{proj.tech.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Footer CTAs */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xs font-mono font-bold text-accent-blue group-hover:text-cyan-glow transition-colors">
                      LEARN MORE &rarr;
                    </span>

                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-brand-bg hover:bg-white/5 border border-white/5 hover:border-white/25 rounded-full text-text-gray hover:text-white transition-all"
                        title="View Codebase"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                      <a
                        href={proj.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-brand-bg hover:bg-white/5 border border-white/5 hover:border-white/25 rounded-full text-text-gray hover:text-white transition-all"
                        title="View Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              {/* Dark Backing Blur */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-brand-bg/85 backdrop-blur-md"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative w-full max-w-2xl glassmorphism rounded-2xl p-6 sm:p-8 shadow-3xl max-h-[90vh] overflow-y-auto z-10 border border-white/10"
              >
                {/* Close Button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/5 hover:bg-white/10 text-text-gray hover:text-white transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-accent-blue/15 text-accent-blue border border-accent-blue/20">
                      <Layers className="w-3.5 h-3.5" />
                      SYSTEM ARCHITECTURE
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mt-3 leading-tight">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs font-mono text-cyan-glow font-semibold mt-1">
                      Released: {selectedProject.year}
                    </p>
                  </div>

                  <hr className="border-white/5" />

                  {/* Full Description */}
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-sm tracking-wide uppercase font-mono">
                      Project Overview:
                    </h4>
                    <p className="text-text-gray text-sm sm:text-base leading-relaxed">
                      {selectedProject.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-white font-bold text-sm tracking-wide uppercase font-mono">
                      Key Capabilities:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-text-gray text-xs sm:text-sm">
                          <Check className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Stack Details */}
                  <div className="space-y-2">
                    <h4 className="text-white font-bold text-sm tracking-wide uppercase font-mono">
                      Technologies & Frameworks:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((techItem) => (
                        <span
                          key={techItem}
                          className="px-3 py-1 text-xs font-mono font-semibold text-white bg-brand-bg rounded-lg border border-white/5"
                        >
                          {techItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all"
                    >
                      <GithubIcon className="w-4 h-4" />
                      Source Repository
                    </a>
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-brand-bg bg-cyan-glow hover:bg-accent-blue hover:text-white rounded-full transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Launch Application
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
