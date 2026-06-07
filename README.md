# Barathpriyan R - Premium AI/ML Portfolio Website

This is a premium, interactive, and production-ready personal portfolio website for **Barathpriyan R**, a Computer Science student specializing in Artificial Intelligence and Machine Learning at Sri Eshwar College of Engineering.

The layout is built with a sleek, futuristic aesthetic inspired by Linear, Stripe, Vercel, and OpenAI-style dark dashboards.

---

## 🚀 Key Visual & Interactive Features

1. **Interactive 3D Neural Orb Hero**:
   - A custom HTML5 Canvas-based rotating sphere built in 3D-space, projecting particles, depth-shading color scales, and connection lines at 60 FPS.
   - Attracted/repelled magnetically relative to your cursor position when hovered.

2. **Dynamic Particle Grid Backdrop**:
   - Particle link canvas overlay and moving digital matrix lines supporting mouse gravitation.

3. **Academic Identity & AI Chip Profile**:
   - Custom circuit board microchip SVG trace overlays, red/yellow/green developer terminals, and stats metrics.

4. **Circular Orbit Skills System**:
   - Elements orbit in concentric ring patterns around a central "AI + Full Stack" nucleus, remaining upright using counter-rotational keyframes, with pause-on-hover actions. Fallback category filters are provided for mobile.

5. **3D Mouse Tilt Project Cards**:
   - Mouse alignment tilt calculation translates local coordinate bounds into perspective X and Y angles on hover, displaying rich feature checklists and full detail modal popups.

6. **Trophy & Confetti Micro-interaction**:
   - Celebrates the First Place Freshathon Hackathon victory with interactive dual-cannon canvas confetti bursts when the trophy card is hovered.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Core Logic**: [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Special Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Directory Structure

```text
src/
  ├── app/
  │    ├── globals.css      # Custom v4 Tailwind variables, scrollbars, glassmorphisms
  │    ├── layout.tsx       # Root metadata, SEO keywords, typography
  │    └── page.tsx         # Page assembler mounting sections
  ├── components/
  │    ├── Background.tsx   # Mouse-follow glow mesh and node particles canvas
  │    ├── Navbar.tsx       # Sticky blur floating navbar & scroll progress index
  │    ├── Hero.tsx         # Typing roles cycle and 3D Neural Orb
  │    ├── About.tsx        # Identity profile, graduation records, statistics
  │    ├── Skills.tsx       # Concentric skill orbits & responsive category selectors
  │    ├── Experience.tsx   # Timeline entries for MERN developer intern contribution
  │    ├── Projects.tsx     # 3D tilt cards & full overlay detail specifications modal
  │    ├── Achievements.tsx # Confetti triggers on trophy hover
  │    ├── CodingProfiles.tsx # LeetCode and SkillRack rings and rankings stats
  │    ├── Certifications.tsx # Shine-transition certificates
  │    ├── Contact.tsx      # Verified connection forms & rotating orbit shields
  │    └── Footer.tsx       # Copy, social handles, scroll to top controls
  ├── data/
  │    └── portfolio.ts     # Fully typed static content data model
  └── lib/
       └── utils.ts         # Lightweight class name joiner
```

---

## 💻 Local Setup & Command Scripts

Ensure you have [Node.js](https://nodejs.org/) installed, then run:

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Local Host Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

### 3. Run Build Verification
```bash
npm run build
```

### 4. Run ESLint Linting Checks
```bash
npm run lint
```
