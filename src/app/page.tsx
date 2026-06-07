import React from "react";
import Background from "@/components/Background";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Achievements from "@/components/Achievements";
import CodingProfiles from "@/components/CodingProfiles";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* 60fps Dynamic particle network canvas & custom mouse light aura */}
      <Background />

      {/* Floating glassmorphic header */}
      <Navbar />

      <main className="relative z-10 w-full flex flex-col items-center">
        {/* Fullscreen Hero introduction & 3D Interactive Canvas Neural Network Orb */}
        <div className="w-full">
          <Hero />
        </div>

        {/* Academic Profile details, counts indicators, and custom AI identity layout */}
        <div className="w-full">
          <About />
        </div>

        {/* Orbit skills solar-system & metrics switches */}
        <div className="w-full">
          <Skills />
        </div>

        {/* Internship details & vertical animated timeline */}
        <div className="w-full">
          <Experience />
        </div>

        {/* 3D tilt project preview boards & interactive modal overlays */}
        <div className="w-full">
          <Projects />
        </div>

        {/* Confetti-powered trophy highlight */}
        <div className="w-full">
          <Achievements />
        </div>

        {/* Platform statistics rings for SkillRack & LeetCode */}
        <div className="w-full">
          <CodingProfiles />
        </div>

        {/* Certifications shine sheets */}
        <div className="w-full">
          <Certifications />
        </div>

        {/* Secure contact validation desk & counter-rotating ring visualizer */}
        <div className="w-full">
          <Contact />
        </div>
      </main>

      {/* Credits, links list, and arrow back controls */}
      <Footer />
    </>
  );
}
