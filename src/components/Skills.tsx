"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, Globe, Database, Terminal, Shield } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

// Orbit item interface
interface OrbitSkill {
  name: string;
  ring: 1 | 2 | 3;
  color: string;
}

const orbitSkills: OrbitSkill[] = [
  // Ring 1 (Inner, Radius: 90px)
  { name: "Python", ring: 1, color: "text-cyan-glow border-cyan-glow/30" },
  { name: "React.js", ring: 1, color: "text-accent-blue border-accent-blue/30" },
  { name: "JavaScript", ring: 1, color: "text-yellow-400 border-yellow-400/20" },
  { name: "Node.js", ring: 1, color: "text-green-400 border-green-400/20" },

  // Ring 2 (Middle, Radius: 160px)
  { name: "C++", ring: 2, color: "text-purple-400 border-purple-400/25" },
  { name: "Java", ring: 2, color: "text-red-400 border-red-400/25" },
  { name: "MongoDB", ring: 2, color: "text-emerald-500 border-emerald-500/25" },
  { name: "MySQL", ring: 2, color: "text-fuchsia-400 border-fuchsia-400/25" },
  { name: "Express.js", ring: 2, color: "text-slate-300 border-slate-300/25" },

  // Ring 3 (Outer, Radius: 230px)
  { name: "DSA", ring: 3, color: "text-accent-purple border-accent-purple/35" },
  { name: "OOP", ring: 3, color: "text-pink-400 border-pink-400/25" },
  { name: "VS Code", ring: 3, color: "text-indigo-400 border-indigo-400/20" },
  { name: "Colab", ring: 3, color: "text-amber-500 border-amber-500/25" },
  { name: "Vite", ring: 3, color: "text-indigo-400 border-indigo-400/20" },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState<string>("All");

  const categories = ["All", ...portfolioData.skills.map((s) => s.category)];

  const filteredSkills = activeTab === "All"
    ? portfolioData.skills
    : portfolioData.skills.filter((s) => s.category === activeTab);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Languages": return <Code2 className="w-5 h-5 text-cyan-glow" />;
      case "Core Concepts": return <Shield className="w-5 h-5 text-accent-purple" />;
      case "Web & Frameworks": return <Globe className="w-5 h-5 text-accent-blue" />;
      case "Databases": return <Database className="w-5 h-5 text-green-400" />;
      default: return <Terminal className="w-5 h-5 text-slate-400" />;
    }
  };

  // Orbit rotation animations helpers
  const getOrbitAngle = (idx: number, total: number) => {
    return (idx * 360) / total;
  };

  // Divide skills into rings
  const ring1 = orbitSkills.filter(s => s.ring === 1);
  const ring2 = orbitSkills.filter(s => s.ring === 2);
  const ring3 = orbitSkills.filter(s => s.ring === 3);

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-brand-bg/50">
      {/* Glow rings in bg */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] cyan-radial-glow opacity-30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="bg-gradient-to-r from-accent-purple to-accent-blue bg-clip-text text-transparent">Skills</span>
          </h2>
          <div className="h-[3px] bg-accent-purple mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Orbit and Cards Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Circular Orbit Skill System (6 Columns, Desktop Only) */}
          <div className="lg:col-span-6 hidden md:flex items-center justify-center min-h-[500px] relative">
            <div className="relative w-[480px] h-[480px] flex items-center justify-center select-none">
              
              {/* Central Nucleus */}
              <div className="absolute z-20 w-24 h-24 bg-brand-secondary/90 border border-cyan-glow/50 rounded-full flex flex-col justify-center items-center text-center p-2 shadow-2xl shadow-cyan-glow/20">
                <span className="text-[10px] font-mono text-cyan-glow/70 uppercase tracking-widest font-semibold">Center</span>
                <span className="text-xs font-bold text-white leading-tight mt-0.5">AI + Stack</span>
              </div>

              {/* Ring 1 (Inner, R = 85px) */}
              <div 
                className="absolute w-[180px] h-[180px] border border-white/5 rounded-full animate-[spin_20s_linear_infinite] hover:[animation-play-state:paused]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {ring1.map((skill, idx) => {
                  const angle = getOrbitAngle(idx, ring1.length);
                  return (
                    <div
                      key={skill.name}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(90px) rotate(-${angle}deg)`,
                      }}
                    >
                      {/* Inner counter-rotating tag to keep text horizontal */}
                      <div className="animate-[spin_20s_linear_infinite_reverse] [animation-play-state:inherit]">
                        <span className={`px-2.5 py-1 text-[11px] font-semibold bg-brand-secondary border rounded-md whitespace-nowrap shadow-md cursor-pointer hover:border-cyan-glow transition-all ${skill.color}`}>
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ring 2 (Middle, R = 150px) */}
              <div 
                className="absolute w-[310px] h-[310px] border border-white/5 rounded-full animate-[spin_32s_linear_infinite_reverse] hover:[animation-play-state:paused]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {ring2.map((skill, idx) => {
                  const angle = getOrbitAngle(idx, ring2.length);
                  return (
                    <div
                      key={skill.name}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(155px) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="animate-[spin_32s_linear_infinite] [animation-play-state:inherit]">
                        <span className={`px-2.5 py-1 text-[11px] font-semibold bg-brand-secondary border rounded-md whitespace-nowrap shadow-md cursor-pointer hover:border-accent-blue transition-all ${skill.color}`}>
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ring 3 (Outer, R = 215px) */}
              <div 
                className="absolute w-[440px] h-[440px] border border-white/5 rounded-full animate-[spin_45s_linear_infinite] hover:[animation-play-state:paused]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {ring3.map((skill, idx) => {
                  const angle = getOrbitAngle(idx, ring3.length);
                  return (
                    <div
                      key={skill.name}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      style={{
                        transform: `rotate(${angle}deg) translate(220px) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="animate-[spin_45s_linear_infinite_reverse] [animation-play-state:inherit]">
                        <span className={`px-2.5 py-1 text-[11px] font-semibold bg-brand-secondary border rounded-md whitespace-nowrap shadow-md cursor-pointer hover:border-accent-purple transition-all ${skill.color}`}>
                          {skill.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Categorized Skills (6 Columns, Dashboard Style) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pb-4 border-b border-white/5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-300 cursor-pointer ${
                    activeTab === cat
                      ? "bg-gradient-to-r from-accent-purple to-accent-blue text-white shadow-lg shadow-accent-purple/10"
                      : "bg-white/5 text-text-gray hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Dashboard skill progress cards */}
            <div className="space-y-4 max-h-[480px] overflow-y-auto pr-2">
              <AnimatePresence mode="popLayout">
                {filteredSkills.map((catItem) => (
                  <motion.div
                    key={catItem.category}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="glassmorphism p-5 rounded-xl border border-white/5"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 bg-white/5 border border-white/10 rounded-lg">
                        {getCategoryIcon(catItem.category)}
                      </div>
                      <h4 className="text-white font-bold text-base">{catItem.category}</h4>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {catItem.skills.map((skill) => (
                        <div
                          key={skill}
                          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-brand-bg/50 border border-white/5 hover:border-cyan-glow/30 hover:bg-brand-bg transition-all duration-300 group cursor-default"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-cyan-glow/60 group-hover:bg-cyan-glow animate-pulse" />
                          <span className="text-sm font-medium text-text-gray group-hover:text-white transition-colors">
                            {skill}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
