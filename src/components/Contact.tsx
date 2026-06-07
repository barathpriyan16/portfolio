"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import confetti from "canvas-confetti";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const tempErrors: Partial<FormState> = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) tempErrors.subject = "Subject is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network latency
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Trigger tiny success confetti
      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.6 }
      });

      // Reset Form
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1800);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-brand-bg/50">
      
      {/* Rotating gradient rings in background (Right side) */}
      <div className="absolute right-[-10%] bottom-[-10%] w-[450px] h-[450px] pointer-events-none select-none opacity-40">
        <div className="absolute inset-0 border border-cyan-glow/10 rounded-full animate-orbit-cw" />
        <div className="absolute inset-8 border border-accent-purple/10 rounded-full animate-orbit-cw [animation-duration:50s] [animation-direction:reverse]" />
        <div className="absolute inset-16 border border-accent-blue/10 rounded-full animate-orbit-cw [animation-duration:35s]" />
      </div>

      {/* Radial glow */}
      <div className="absolute bottom-[10%] left-[-10%] w-[350px] h-[350px] cyan-radial-glow opacity-20 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white tracking-tight">
            Let's <span className="bg-gradient-to-r from-cyan-glow to-accent-blue bg-clip-text text-transparent">Connect</span>
          </h2>
          <div className="h-[3px] bg-cyan-glow mx-auto mt-4 rounded-full w-[60px]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Info cards (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-left">
            <div className="space-y-6">
              <h3 className="text-2xl font-black text-white leading-tight">
                Let's discuss something <span className="text-cyan-glow">intelligent.</span>
              </h3>
              <p className="text-text-gray text-base leading-relaxed">
                Interested in collaborating, hiring, or discussing AI/ML and full-stack projects? Feel free to reach out. I am available for internships, project work, and developer roles.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="space-y-4 my-6">
              
              {/* Email Card */}
              <div className="glassmorphism p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-3 bg-cyan-glow/10 border border-cyan-glow/20 rounded-xl text-cyan-glow">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-text-gray tracking-wider font-mono">Email Address</h4>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-white hover:text-cyan-glow transition-colors font-medium text-sm sm:text-base break-all"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              {/* Location Card */}
              <div className="glassmorphism p-5 rounded-2xl border border-white/5 flex items-center gap-4">
                <div className="p-3 bg-accent-purple/10 border border-accent-purple/20 rounded-xl text-accent-purple">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-bold text-text-gray tracking-wider font-mono">Current Location</h4>
                  <p className="text-white font-medium text-sm sm:text-base">
                    {portfolioData.personal.location}
                  </p>
                </div>
              </div>

            </div>

            {/* Social cards row */}
            <div className="flex gap-4">
              <a
                href="https://github.com/barathpriyan16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glassmorphism glassmorphism-hover p-4 rounded-xl text-center border border-white/5 flex flex-col items-center gap-2 group"
              >
                <GithubIcon className="w-5 h-5 text-text-gray group-hover:text-white transition-colors" />
                <span className="text-xs font-mono font-bold text-white">GitHub</span>
              </a>

              <a
                href="https://linkedin.com/in/barathpriyan16"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 glassmorphism glassmorphism-hover p-4 rounded-xl text-center border border-white/5 flex flex-col items-center gap-2 group"
              >
                <LinkedinIcon className="w-5 h-5 text-text-gray group-hover:text-accent-blue transition-colors" />
                <span className="text-xs font-mono font-bold text-white">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Contact Form (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="glassmorphism p-6 sm:p-8 rounded-2xl border border-white/5 h-full flex flex-col justify-center relative overflow-hidden">
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="contact-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-left"
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-mono font-bold uppercase tracking-wider text-text-gray">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-brand-bg/80 border text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-glow transition-all ${
                          errors.name ? "border-red-500/50" : "border-white/10"
                        }`}
                        placeholder="John Doe"
                      />
                      {errors.name && (
                        <p className="flex items-center gap-1 text-[10px] text-red-400 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-mono font-bold uppercase tracking-wider text-text-gray">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-brand-bg/80 border text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-glow transition-all ${
                          errors.email ? "border-red-500/50" : "border-white/10"
                        }`}
                        placeholder="john@example.com"
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1 text-[10px] text-red-400 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-mono font-bold uppercase tracking-wider text-text-gray">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl bg-brand-bg/80 border text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-glow transition-all ${
                          errors.subject ? "border-red-500/50" : "border-white/10"
                        }`}
                        placeholder="Internship Inquiry"
                      />
                      {errors.subject && (
                        <p className="flex items-center gap-1 text-[10px] text-red-400 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-mono font-bold uppercase tracking-wider text-text-gray">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className={`w-full px-4 py-3 rounded-xl bg-brand-bg/80 border text-white text-sm focus:outline-none focus:ring-1 focus:ring-cyan-glow transition-all resize-none ${
                          errors.message ? "border-red-500/50" : "border-white/10"
                        }`}
                        placeholder="Hi Barathpriyan, I would love to connect..."
                      />
                      {errors.message && (
                        <p className="flex items-center gap-1 text-[10px] text-red-400 font-mono">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-accent-blue to-accent-purple hover:from-cyan-glow hover:to-accent-blue disabled:opacity-50 transition-all duration-300 transform active:scale-[0.98] cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Transmission Active...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Secure Message
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-prompt"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 space-y-6"
                  >
                    <div className="flex justify-center">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 animate-bounce">
                        <CheckCircle2 className="w-12 h-12" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-white">Transmission Successful</h3>
                      <p className="text-text-gray text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out! Your secure message has been dispatched successfully. Barathpriyan R will respond to you shortly.
                      </p>
                    </div>

                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 rounded-full text-xs font-semibold text-text-gray hover:text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
