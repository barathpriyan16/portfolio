"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Code2, Target, Award, Shield, FileText } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function CodingProfiles() {
  const [skillRackProgress, setSkillRackProgress] = useState(0);
  const [leetCodeProgress, setLeetCodeProgress] = useState(0);

  // Animate progress rings on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setSkillRackProgress(85); // Arbitrary graphical fill
      setLeetCodeProgress(50);  // Arbitrary graphical fill
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  // SVG Progress Ring calculations
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  return (
    <section id="coding-profiles" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] cyan-radial-glow opacity-20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Coding <span className="bg-gradient-to-r from-cyan-glow to-accent-blue bg-clip-text text-transparent">Profiles</span>
          </h2>
          <div className="h-[3px] bg-cyan-glow mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* LeetCode Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden group"
          >
            {/* Top accent light */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-orange-400 to-amber-500 opacity-50" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              
              {/* Profile Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">LeetCode</h3>
                    <p className="text-xs text-text-gray font-mono">Platform // leetcode.com</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-3xl font-black text-white flex items-baseline gap-1.5 font-mono">
                    50+
                    <span className="text-xs text-text-gray font-sans font-semibold">Problems Solved</span>
                  </div>
                  <p className="text-text-gray text-xs sm:text-sm">
                    Solved various DSA topics covering Arrays, Strings, Sorting, Searching, Recursion, Math, and basic algorithms.
                  </p>
                </div>

                <div className="pt-2">
                  <a
                    href="https://leetcode.com/u/barathpriyan_r/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-orange-400 hover:text-white transition-colors"
                  >
                    VIEW ACCOUNT PROFILE &rarr;
                  </a>
                </div>
              </div>

              {/* Progress Ring Visual */}
              <div className="relative shrink-0 w-28 h-28 flex items-center justify-center self-center sm:self-auto">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Track circle */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-white/5 fill-none"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-orange-400 fill-none transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (leetCodeProgress / 100) * circumference}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col justify-center items-center text-center">
                  <span className="text-sm font-black text-white font-mono">50+</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-gray font-bold">Solved</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* SkillRack Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 relative overflow-hidden group"
          >
            {/* Top accent light */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-cyan-glow to-accent-blue" />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              
              {/* Profile Details */}
              <div className="space-y-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-cyan-glow/10 border border-cyan-glow/20 rounded-xl text-cyan-glow">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white">SkillRack</h3>
                    <p className="text-xs text-text-gray font-mono">Platform // skillrack.com</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="text-3xl font-black text-white flex items-baseline gap-1.5 font-mono">
                    486+
                    <span className="text-xs text-text-gray font-sans font-semibold">Problems Solved</span>
                  </div>
                  
                  {/* Platform stats metadata */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2">
                    <div className="flex items-center gap-2 p-2 bg-brand-bg/60 border border-white/5 rounded-lg">
                      <Award className="w-4 h-4 text-cyan-glow shrink-0" />
                      <div>
                        <div className="text-[9px] uppercase text-text-gray font-bold">Rank</div>
                        <div className="text-xs font-bold text-white font-mono">66,519</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2 bg-brand-bg/60 border border-white/5 rounded-lg">
                      <Shield className="w-4 h-4 text-yellow-500 shrink-0" />
                      <div>
                        <div className="text-[9px] uppercase text-text-gray font-bold">Badges</div>
                        <div className="text-xs font-bold text-white font-mono">100+ Bronze</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 p-2 bg-brand-bg/60 border border-white/5 rounded-lg col-span-2">
                      <FileText className="w-4 h-4 text-accent-purple shrink-0" />
                      <div>
                        <div className="text-[9px] uppercase text-text-gray font-bold">Certifications</div>
                        <div className="text-xs font-bold text-white font-mono">4 Platform Certificates</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://www.skillrack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold font-mono text-cyan-glow hover:text-white transition-colors"
                  >
                    VIEW ACCOUNT PROFILE &rarr;
                  </a>
                </div>
              </div>

              {/* Progress Ring Visual */}
              <div className="relative shrink-0 w-28 h-28 flex items-center justify-center self-center sm:self-auto">
                <svg className="w-full h-full transform -rotate-90">
                  {/* Track circle */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-white/5 fill-none"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="56"
                    cy="56"
                    r={radius}
                    className="stroke-cyan-glow fill-none transition-all duration-1000 ease-out"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - (skillRackProgress / 100) * circumference}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col justify-center items-center text-center">
                  <span className="text-sm font-black text-white font-mono">486+</span>
                  <span className="text-[9px] uppercase tracking-wider text-text-gray font-bold">Solved</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
