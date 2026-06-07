"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Trophy, Star, ShieldAlert } from "lucide-react";
import confetti from "canvas-confetti";
import { portfolioData } from "@/data/portfolio";

export default function Achievements() {
  const triggerConfetti = () => {
    // Shoot celebratory particles from both sides of the viewport
    const duration = 2 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 25, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJS.Timeout = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 40 * (timeLeft / duration);
      // Confetti colors matching the portfolio theme
      const colors = ["#3B82F6", "#8B5CF6", "#22D3EE", "#FBBF24"];

      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors });
    }, 250);
  };

  return (
    <section id="achievements" className="py-24 relative overflow-hidden bg-brand-bg/40">
      {/* Background radial glow */}
      <div className="absolute top-[30%] right-[-10%] w-[350px] h-[350px] purple-radial-glow opacity-30 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Key <span className="bg-gradient-to-r from-accent-purple to-cyan-glow bg-clip-text text-transparent">Achievements</span>
          </h2>
          <div className="h-[3px] bg-accent-purple mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Achievement Trophy Cards Container */}
        {portfolioData.achievements.map((ach, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-2xl p-[1.5px] overflow-hidden"
          >
            {/* Pulsating gold-cyan outline */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-cyan-glow to-accent-purple opacity-20 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

            {/* Main Trophy Card */}
            <div
              onMouseEnter={triggerConfetti}
              onClick={triggerConfetti}
              className="bg-brand-secondary/95 rounded-2xl p-6 sm:p-10 border border-white/5 flex flex-col md:flex-row items-center gap-8 cursor-pointer relative overflow-hidden"
            >
              
              {/* Floating Star Ornaments */}
              <div className="absolute top-4 left-4 text-yellow-500/10 group-hover:text-yellow-500/30 transition-colors duration-300">
                <Star className="w-8 h-8 animate-spin [animation-duration:8s]" />
              </div>
              <div className="absolute bottom-4 right-4 text-cyan-glow/10 group-hover:text-cyan-glow/30 transition-colors duration-300">
                <Star className="w-6 h-6 animate-pulse" />
              </div>

              {/* Glowing Trophy Cup Visual (Gold) */}
              <div className="relative shrink-0 flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 bg-white/5 border border-yellow-500/20 group-hover:border-yellow-400/40 rounded-2xl group-hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.05)] group-hover:shadow-[0_0_25px_rgba(234,179,8,0.2)]">
                {/* Internal glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500/10 to-transparent rounded-2xl" />
                <Trophy className="w-12 h-12 text-yellow-500 group-hover:rotate-12 transition-transform duration-300" />
              </div>

              {/* Description */}
              <div className="text-center md:text-left space-y-4">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 shadow-[0_0_8px_rgba(234,179,8,0.1)]">
                    1st Place Winner
                  </span>
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-white/5 text-text-gray border border-white/5">
                    Hackathon Milestone // {ach.year}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                    {ach.title}
                  </h3>
                  <p className="text-yellow-400 font-bold font-mono text-sm tracking-wide">
                    {ach.role} — {ach.badge}
                  </p>
                </div>

                <p className="text-text-gray text-sm sm:text-base leading-relaxed max-w-xl">
                  {ach.description}
                </p>

                <div className="text-xs font-mono font-semibold text-cyan-glow animate-pulse pt-2">
                  Hover or tap card to trigger victory confetti!
                </div>
              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}
