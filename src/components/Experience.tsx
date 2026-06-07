"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, CheckCircle, Database } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] cyan-radial-glow opacity-30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[300px] h-[300px] purple-radial-glow opacity-30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Work <span className="bg-gradient-to-r from-cyan-glow to-accent-blue bg-clip-text text-transparent">Experience</span>
          </h2>
          <div className="h-[3px] bg-cyan-glow mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Timeline Core */}
        <div className="relative border-l border-white/10 pl-6 sm:pl-10 ml-4 sm:ml-8 space-y-12">
          
          {portfolioData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative"
            >
              {/* Timeline dot anchor */}
              <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-brand-bg border border-cyan-glow shadow-[0_0_8px_#22d3ee]">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-glow animate-ping" />
              </span>

              {/* Experience Card */}
              <div className="glassmorphism glassmorphism-hover p-6 sm:p-8 rounded-2xl relative overflow-hidden group">
                
                {/* Accent top gradient border */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-accent-blue via-cyan-glow to-accent-purple" />
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20">
                      Internship
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-2 group-hover:text-cyan-glow transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-slate-300 font-semibold text-sm sm:text-base mt-1">
                      {exp.company}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-bg/80 border border-white/5 text-xs text-text-gray font-mono self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5 text-accent-blue" />
                    {exp.duration}
                  </div>
                </div>

                {/* Main description */}
                <p className="text-text-gray text-sm sm:text-base mb-6 leading-relaxed border-l-2 border-white/5 pl-4">
                  {exp.description}
                </p>

                {/* Key Achievements/Responsibilities */}
                <div className="space-y-3 mb-6">
                  <h4 className="text-white text-sm font-bold tracking-wide uppercase font-mono">
                    Key Contributions:
                  </h4>
                  <ul className="space-y-2">
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2 text-text-gray text-xs sm:text-sm leading-relaxed">
                        <CheckCircle className="w-4 h-4 text-cyan-glow shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tech tags used in the role */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2.5 py-1 text-xs font-mono font-medium text-slate-300 bg-brand-bg rounded-md border border-white/5 hover:border-accent-blue/30 transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
}
