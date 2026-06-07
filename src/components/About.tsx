"use client";

import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Cpu, Calendar, Medal, BarChart } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function About() {
  const [epoch, setEpoch] = React.useState(1);
  const [loss, setLoss] = React.useState(0.892);
  const [accuracy, setAccuracy] = React.useState(62.1);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setEpoch((prev) => {
        const next = prev >= 100 ? 1 : prev + 1;
        // Exponential decay model for training loss
        const computedLoss = 0.02 + 0.8 * Math.exp(-next / 15) + Math.random() * 0.01;
        // Exponential rise model for training accuracy
        const computedAcc = 99 - 38 * Math.exp(-next / 20) + Math.random() * 0.5;
        setLoss(computedLoss);
        setAccuracy(Math.min(99.9, computedAcc));
        return next;
      });
    }, 150);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  } as const;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] purple-radial-glow opacity-40 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-white tracking-tight"
          >
            About <span className="bg-gradient-to-r from-accent-blue to-cyan-glow bg-clip-text text-transparent">Me</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="h-[3px] bg-cyan-glow mx-auto mt-4 rounded-full"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          {/* Identity Visual (Left side: 5 columns) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <motion.div
              variants={itemVariants}
              whileHover={{ rotateY: 5, rotateX: -5 }}
              className="w-full max-w-[360px] glassmorphism rounded-2xl p-6 shadow-2xl relative overflow-hidden group border-white/10 [perspective:1000px]"
            >
              {/* Scan laser line animation */}
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-80 shadow-[0_0_8px_#22d3ee] animate-bounce [animation-duration:4s] z-20 pointer-events-none" />

              {/* Background grids */}
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

              {/* Card Header (AI Profiler Terminal) */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="text-[10px] font-mono text-cyan-glow/60 uppercase tracking-widest">
                  SYS_PROFILER // ACTIVE
                </div>
              </div>

              {/* Avatar Chip Visualizer */}
              <div className="relative w-full aspect-square bg-brand-bg rounded-xl border border-white/5 flex items-center justify-center overflow-hidden mb-6 group-hover:border-cyan-glow/20 transition-colors duration-300">
                {/* SVG Circuit Traces */}
                <svg className="absolute inset-0 w-full h-full opacity-35 group-hover:opacity-75 transition-opacity duration-300" viewBox="0 0 100 100">
                  <path d="M 10 50 L 35 50 M 35 50 L 50 35 M 50 35 L 50 15 M 50 35 L 65 50 L 90 50 M 50 65 L 50 85" stroke="currentColor" className="text-cyan-glow" strokeWidth="0.8" fill="none" />
                  <circle cx="10" cy="50" r="1.5" className="fill-cyan-glow animate-pulse" />
                  <circle cx="90" cy="50" r="1.5" className="fill-cyan-glow animate-pulse" />
                  <circle cx="50" cy="15" r="1.5" className="fill-cyan-glow" />
                  <circle cx="50" cy="85" r="1.5" className="fill-cyan-glow" />
                </svg>

                {/* Microchip Center Orb */}
                <div className="relative z-10 w-24 h-24 bg-brand-bg rounded-2xl border border-accent-purple/30 flex items-center justify-center shadow-lg shadow-accent-purple/15 group-hover:scale-105 transition-transform duration-300">
                  {/* Glowing core */}
                  <div className="absolute inset-2 bg-gradient-to-tr from-accent-blue/10 to-accent-purple/20 rounded-xl blur-sm group-hover:animate-pulse" />
                  <Cpu className="w-10 h-10 text-cyan-glow group-hover:rotate-45 transition-transform duration-700" />
                </div>
              </div>

              {/* Bio Details */}
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span className="text-text-gray">IDENTITY:</span>
                  <span className="text-white font-semibold">{portfolioData.personal.name}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span className="text-text-gray">LOCATION:</span>
                  <span className="text-white">{portfolioData.personal.location}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span className="text-text-gray">DEPT:</span>
                  <span className="text-cyan-glow">B.E. CSE (AI & ML)</span>
                </div>
                <div className="flex justify-between border-b border-white/5 py-1">
                  <span className="text-text-gray">ACADEMIC_CGPA:</span>
                  <span className="text-white font-semibold">7.65 / 10.0</span>
                </div>
              </div>

              {/* ML Engine Status Log */}
              <div className="mt-5 pt-4 border-t border-white/10 space-y-2.5 font-mono text-[10px]">
                <div className="text-cyan-glow/60 uppercase tracking-widest text-[9px] font-bold">
                  ML_ENGINE // REALTIME_AGENT_TRAINING
                </div>
                <div className="bg-brand-bg/90 p-2.5 rounded-lg border border-white/5 space-y-1 text-text-gray">
                  <div className="flex justify-between">
                    <span>EPOCH:</span>
                    <span className="text-white font-bold">{epoch}/100</span>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <span>TRAIN_LOSS:</span>
                    <span className="text-red-400 font-bold">{loss.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between flex-wrap">
                    <span>ACCURACY:</span>
                    <span className="text-green-400 font-bold">{accuracy.toFixed(2)}%</span>
                  </div>
                  
                  {/* Small animated loss chart */}
                  <div className="h-6 w-full bg-white/5 border border-white/5 rounded relative overflow-hidden mt-1">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 24" preserveAspectRatio="none">
                      <line x1="0" y1="12" x2="100" y2="12" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" strokeDasharray="2" />
                      
                      {/* Red loss line decay path */}
                      <path
                        d={`M 0,22 Q 30,${24 - (loss * 20)} 100,${24 - (loss * 22)}`}
                        stroke="rgba(239, 68, 68, 0.7)"
                        strokeWidth="1"
                        fill="none"
                      />
                      {/* Green accuracy line rising path */}
                      <path
                        d={`M 0,18 Q 40,${24 - (accuracy / 100 * 20)} 100,${24 - (accuracy / 100 * 22)}`}
                        stroke="rgba(34, 197, 94, 0.7)"
                        strokeWidth="1"
                        fill="none"
                      />
                    </svg>
                  </div>
                </div>
              </div>

            </motion.div>
          </div>

          {/* Bio Text & Education Stats (Right side: 7 columns) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-glow" />
                Personal Profile
              </h3>
              <p className="text-text-gray text-base leading-relaxed">
                {portfolioData.personal.about}
              </p>
            </motion.div>

            {/* Stats Dashboard Grid */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {portfolioData.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="glassmorphism p-4 rounded-xl text-center flex flex-col justify-center items-center group relative overflow-hidden"
                >
                  {/* Subtle top indicator border */}
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-glow to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="text-2xl font-black text-white bg-gradient-to-r from-cyan-glow to-accent-blue bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-xs font-semibold text-white mt-1">{stat.label}</div>
                  <div className="text-[10px] text-text-gray mt-0.5 leading-snug">{stat.description}</div>
                </div>
              ))}
            </motion.div>

            {/* Education Breakdown */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-accent-purple" />
                Academic Milestones
              </h3>

              <div className="space-y-4">
                {portfolioData.education.map((edu, idx) => (
                  <div
                    key={idx}
                    className="glassmorphism glassmorphism-hover p-5 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-white/5 relative overflow-hidden"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-xl mt-1 text-cyan-glow">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base leading-snug">{edu.degree}</h4>
                        <p className="text-cyan-glow/80 text-sm font-medium mt-0.5">{edu.institution}</p>
                        <p className="text-text-gray text-xs mt-1">{edu.details}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-bg border border-white/5 text-xs text-text-gray font-mono">
                      <Calendar className="w-3.5 h-3.5 text-accent-purple" />
                      {edu.year}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
