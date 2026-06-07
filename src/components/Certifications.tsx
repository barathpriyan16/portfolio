"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Calendar, Award, ExternalLink } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 relative overflow-hidden bg-brand-bg/30">
      {/* Background gradients */}
      <div className="absolute top-[40%] right-[-10%] w-[350px] h-[350px] purple-radial-glow opacity-20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Academic <span className="bg-gradient-to-r from-accent-purple to-cyan-glow bg-clip-text text-transparent">Certifications</span>
          </h2>
          <div className="h-[3px] bg-accent-purple mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {portfolioData.certifications.map((cert, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group relative glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 overflow-hidden flex flex-col justify-between"
            >
              {/* Shine effect overlay element */}
              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-[1200ms] ease-out -z-10" />

              {/* Accent corner icon */}
              <div className="absolute top-4 right-4 text-cyan-glow/10 group-hover:text-cyan-glow/30 transition-colors duration-300">
                <Award className="w-12 h-12" />
              </div>

              {/* Card Header & Body */}
              <div className="space-y-4 relative z-10">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl w-fit text-cyan-glow">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-cyan-glow transition-colors duration-300">
                    {cert.title}
                  </h3>
                  <p className="text-accent-purple font-semibold text-xs sm:text-sm">
                    {cert.issuer}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between mt-8 pt-4 border-t border-white/5 relative z-10">
                <div className="flex items-center gap-1.5 text-xs text-text-gray font-mono">
                  <Calendar className="w-3.5 h-3.5 text-accent-purple" />
                  Issued: {cert.year}
                </div>
                
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-cyan-glow opacity-80 group-hover:opacity-100 transition-opacity">
                  VERIFIED CREDENTIAL <ExternalLink className="w-3 h-3" />
                </span>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
