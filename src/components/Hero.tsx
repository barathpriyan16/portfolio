"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Mail, Download } from "lucide-react";
import { portfolioData } from "@/data/portfolio";

// List of roles to animate
const roles = [
  "AI & ML Student",
  "Full Stack Developer",
  "MERN Stack Developer",
  "Machine Learning Enthusiast",
  "Hackathon Winner"
];

// 3D Point Interface
interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  phase: number;
  color: string;
}

function NeuralOrb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, hover: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = 450;
    let height = canvas.height = 450;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width * window.devicePixelRatio;
      height = canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const nodeCount = 75;
    const sphereRadius = 130;
    const points: Point3D[] = [];

    // Colors mimicking theme
    const colors = [
      "rgba(233, 213, 255, 0.85)", // Light Purple
      "rgba(168, 85, 247, 0.85)", // Accent Purple
      "rgba(139, 92, 246, 0.85)", // Accent Purple Darker
    ];

    // Generate points on a 3D sphere surface
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.sin(phi) * Math.sin(theta);
      const z = sphereRadius * Math.cos(phi);

      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        phase: Math.random() * Math.PI * 2,
        color: colors[i % colors.length],
      });
    }

    interface Pulse {
      from: number;
      to: number;
      progress: number;
      speed: number;
    }

    const pulses: Pulse[] = [];
    const pulseCount = 10;

    const findNeighbor = (fromIdx: number): number => {
      const neighbors: number[] = [];
      const fromPt = points[fromIdx];
      for (let i = 0; i < points.length; i++) {
        if (i === fromIdx) continue;
        const dx = fromPt.x - points[i].x;
        const dy = fromPt.y - points[i].y;
        const dz = fromPt.z - points[i].z;
        if (Math.hypot(dx, dy, dz) < 80) {
          neighbors.push(i);
        }
      }
      if (neighbors.length > 0) {
        return neighbors[Math.floor(Math.random() * neighbors.length)];
      }
      return Math.floor(Math.random() * points.length);
    };

    for (let i = 0; i < pulseCount; i++) {
      const from = Math.floor(Math.random() * points.length);
      pulses.push({
        from,
        to: findNeighbor(from),
        progress: Math.random(),
        speed: 0.005 + Math.random() * 0.008,
      });
    }

    let angleX = 0.003;
    let angleY = 0.005;

    const render = () => {
      // Clear with slight alpha to get a motion blur path trail
      ctx.clearRect(0, 0, width, height);

      const center = { x: canvas.clientWidth / 2, y: canvas.clientHeight / 2 };
      const mouse = mouseRef.current;

      // Adjust rotation angles dynamically based on mouse hover/drag
      let currentAngleX = angleX;
      let currentAngleY = angleY;

      if (mouse.hover) {
        // Magnetic pull tilt based on mouse position relative to canvas center
        const dx = mouse.x - canvas.clientWidth / 2;
        const dy = mouse.y - canvas.clientHeight / 2;
        currentAngleY += dx * 0.00005;
        currentAngleX += dy * 0.00005;
      }

      // Sine and cosine calculations for 3D rotations
      const cosX = Math.cos(currentAngleX);
      const sinX = Math.sin(currentAngleX);
      const cosY = Math.cos(currentAngleY);
      const sinY = Math.sin(currentAngleY);

      // Rotate and project points
      const projected: { x: number; y: number; z: number; original: Point3D }[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Pulsating offset to simulate brain activity
        p.phase += 0.03;
        const pulse = 1 + Math.sin(p.phase) * 0.06;
        
        let x = p.x * pulse;
        let y = p.y * pulse;
        let z = p.z * pulse;

        // Rotate Y-axis
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate X-axis
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Update permanent coordinates back to points list for continuity
        p.x = x1;
        p.y = y2;
        p.z = z2;

        // Perspective projection formula
        const fov = 350; // Camera distance
        const scale = fov / (fov + z2);
        
        const px = center.x + x1 * scale;
        const py = center.y + y2 * scale;

        projected.push({ x: px, y: py, z: z2, original: p });
      }

      // Draw Connections (lines between close points in 3D space)
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];

          // Compute 3D Euclidean distance
          const dx = p1.original.x - p2.original.x;
          const dy = p1.original.y - p2.original.y;
          const dz = p1.original.z - p2.original.z;
          const distance = Math.hypot(dx, dy, dz);

          if (distance < 75) {
            const alpha = (1 - distance / 75) * 0.25 * ((130 - p1.z) / 260 + 0.3);
            ctx.strokeStyle = `rgba(34, 211, 238, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Draw and Update Pulses
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.from = pulse.to;
          pulse.to = findNeighbor(pulse.from);
          pulse.speed = 0.005 + Math.random() * 0.008;
        }

        const p1 = points[pulse.from];
        const p2 = points[pulse.to];

        const px = p1.x + (p2.x - p1.x) * pulse.progress;
        const py = p1.y + (p2.y - p1.y) * pulse.progress;
        const pz = p1.z + (p2.z - p1.z) * pulse.progress;

        const fov = 350;
        const scale = fov / (fov + pz);
        const x = center.x + px * scale;
        const y = center.y + py * scale;

        const pulseAlpha = ((130 - pz) / 260 + 0.3);
        ctx.fillStyle = `rgba(34, 211, 238, ${pulseAlpha * 0.9})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(34, 211, 238, 0.9)";
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Draw Nodes (depth sorting so front nodes are drawn last/on top)
      projected.sort((a, b) => b.z - a.z);

      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        
        // Front items are larger and brighter
        const depthAlpha = (sphereRadius * 1.5 - p.z) / (sphereRadius * 3);
        const radius = Math.max(1, (1.8 + (130 - p.z) * 0.012));

        // Draw core node
        ctx.fillStyle = p.original.color.replace("0.85", depthAlpha.toFixed(2));
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra outer glow for front nodes
        if (p.z < -40) {
          ctx.fillStyle = "rgba(34, 211, 238, 0.1)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    resize();
    render();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };

    const handleMouseEnter = () => { mouseRef.current.hover = true; };
    const handleMouseLeave = () => { mouseRef.current.hover = false; };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseenter", handleMouseEnter);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("mouseenter", handleMouseEnter);
        canvas.removeEventListener("mouseleave", handleMouseLeave);
      }
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] sm:w-[420px] sm:h-[420px]">
      {/* Glow aura */}
      <div className="absolute inset-0 cyan-radial-glow opacity-50 blur-3xl animate-pulse-slow rounded-full" />
      {/* 3D Orbiting Rings */}
      <div className="absolute w-[80%] h-[80%] border border-cyan-glow/10 rounded-full animate-orbit-cw pointer-events-none" />
      <div className="absolute w-[95%] h-[95%] border border-accent-purple/10 rounded-full animate-orbit-cw pointer-events-none [animation-duration:60s] [animation-direction:reverse]" />
      
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%" }}
        className="relative z-10 cursor-grab active:cursor-grabbing"
      />
    </div>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Simple typing text effect
  useEffect(() => {
    const activeRole = roles[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setCurrentText((prev) => activeRole.slice(0, prev.length + 1));
      }, 80);
    }

    if (!isDeleting && currentText === activeRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex]);

  const handleScrollToSection = (id: string) => {
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

  const handleDownload = () => {
    alert("Downloading BARATHPRIYAN R's Resume... (Mock PDF triggered successfully)");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-6xl relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Text Area */}
        <div className="lg:col-span-7 text-left space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-glow/20 bg-cyan-glow/5 text-cyan-glow text-xs font-mono font-semibold"
          >
            <Cpu className="w-4 h-4 animate-spin [animation-duration:4s]" />
            AI / ML CSE Undergraduate
          </motion.div>

          <div className="space-y-2">
            <motion.h4
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-text-gray font-mono text-lg"
            >
              Hello, I'm
            </motion.h4>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-5xl sm:text-6xl font-black text-white tracking-tight"
            >
              {portfolioData.personal.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-10 text-xl sm:text-2xl font-bold bg-gradient-to-r from-accent-blue via-cyan-glow to-accent-purple bg-clip-text text-transparent flex items-center font-mono"
            >
              {currentText}
              <span className="w-[3px] h-6 bg-cyan-glow ml-1 animate-pulse" />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-text-gray text-base sm:text-lg max-w-xl leading-relaxed"
          >
            {portfolioData.personal.tagline}
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => handleScrollToSection("projects")}
              className="group flex items-center gap-2 px-6 py-3 font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:from-cyan-glow hover:to-accent-blue transition-all duration-300 rounded-full cursor-pointer transform hover:-translate-y-[1px]"
            >
              View Projects
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleScrollToSection("contact")}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 rounded-full cursor-pointer transform hover:-translate-y-[1px]"
            >
              <Mail className="w-4 h-4 text-cyan-glow" />
              Contact
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-6 py-3 font-semibold text-text-gray hover:text-white transition-all duration-300 rounded-full cursor-pointer"
            >
              <Download className="w-4 h-4" />
              Download CV
            </button>
          </motion.div>
        </div>

        {/* Visual Brain Orb Area */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <NeuralOrb />
          </motion.div>
        </div>
        
      </div>
    </section>
  );
}
