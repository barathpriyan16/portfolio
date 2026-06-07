"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const sparks: Spark[] = [];
    const particleCount = 45;
    const connectionDistance = 110;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      particles = [];
      const colors = ["rgba(168, 85, 247, 0.4)", "rgba(139, 92, 246, 0.4)", "rgba(233, 213, 255, 0.4)"];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Mouse position smoothing (lerp)
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // Draw mouse glow aura on canvas
      const mouseGlow = ctx.createRadialGradient(
        mouse.x,
        mouse.y,
        0,
        mouse.x,
        mouse.y,
        150
      );
      mouseGlow.addColorStop(0, "rgba(168, 85, 247, 0.07)");
      mouseGlow.addColorStop(0.5, "rgba(139, 92, 246, 0.02)");
      mouseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = mouseGlow;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 150, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.x += p1.vx;
        p1.y += p1.vy;

        // Bounce on boundaries
        if (p1.x < 0 || p1.x > canvas.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > canvas.height) p1.vy *= -1;

        // Mouse interaction (repulsion)
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          const force = (180 - dist) / 180;
          const angle = Math.atan2(dy, dx);
          p1.x += Math.cos(angle) * force * 0.8;
          p1.y += Math.sin(angle) * force * 0.8;
        }

        // Draw particle
        ctx.fillStyle = p1.color;
        ctx.shadowBlur = 4;
        ctx.shadowColor = p1.color;
        ctx.beginPath();
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset shadow

        // Connect particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (distNodes < connectionDistance) {
            const alpha = (1 - distNodes / connectionDistance) * 0.15;
            ctx.strokeStyle = `rgba(148, 163, 184, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Update and draw mouse sparks trail
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.025;

        if (s.alpha <= 0) {
          sparks.splice(i, 1);
          continue;
        }

        ctx.fillStyle = s.color + s.alpha.toFixed(2) + ")";
        ctx.shadowBlur = 3;
        ctx.shadowColor = s.color + "1.0)";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    drawParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.targetX = e.clientX;
      mouseRef.current.targetY = e.clientY;

      // Spawn mouse sparks on move
      if (Math.random() < 0.6) {
        const colors = ["rgba(233, 213, 255, ", "rgba(168, 85, 247, ", "rgba(139, 92, 246, "];
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.4,
          alpha: 1.0,
          size: Math.random() * 1.8 + 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-brand-bg">
      {/* Mesh Gradient Glow */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] radial-glow opacity-60 animate-pulse-slow" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] radial-glow opacity-60 animate-pulse-slow" />
      
      {/* Fine grid background */}
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      {/* Canvas for connection lines and particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
