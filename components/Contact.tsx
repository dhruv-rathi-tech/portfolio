"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/Icons";
import { Mail, ArrowUpRight, Send, CheckCircle2 } from "lucide-react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Safe, authentic fallback without fake API response:
    // Opens the user's default email client with the entered details pre-populated
    const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const body = encodeURIComponent(
      `Hello Dhruv,\n\n${formData.message}\n\nFrom:\nName: ${formData.name}\nEmail: ${formData.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("sent");
  };

  return (
    <section id="contact" className="py-14 sm:py-18 relative overflow-hidden" style={{ background: "#09090b" }}>
      {/* Ambient bottom glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: "750px",
          height: "380px",
          background:
            "radial-gradient(ellipse at center bottom, rgba(59,130,246,0.1) 0%, rgba(6,182,212,0.04) 40%, transparent 70%)",
        }}
      />

      <div className="global-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-8 sm:mb-10"
        >
          <h2 className="section-title">Contact</h2>
          <p className="section-subtitle">Let&apos;s build something.</p>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

          {/* ── Left Column: Information & Social Links ── */}
          <div className="lg:col-span-5 space-y-6">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              I&apos;m always interested in hearing about new projects, technical collaborations, and full-time or internship opportunities in AI, data engineering, and full-stack software.
            </p>

            <div className="pt-2 space-y-3">
              {[
                {
                  label: "GitHub",
                  value: "dhruv-rathi-tech",
                  href: profile.github,
                  icon: <GithubIcon size={18} />,
                  desc: "View repositories & code",
                },
                {
                  label: "LinkedIn",
                  value: "dhruv-rathi-31dr",
                  href: profile.linkedin,
                  icon: <LinkedinIcon size={18} />,
                  desc: "Connect professionally",
                },
                {
                  label: "Email",
                  value: profile.email,
                  href: `mailto:${profile.email}`,
                  icon: <Mail size={18} />,
                  desc: "Send a direct email",
                },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#1f2230] bg-[#0d0e15] hover:border-blue-500/40 hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.12)] hover:-translate-y-0.5 transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-105 group-hover:text-cyan-300 transition-all shrink-0">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-500 font-mono">{c.label}</p>
                    <p className="text-sm font-semibold text-white truncate">{c.value}</p>
                  </div>
                  <ArrowUpRight
                    size={16}
                    className="text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* ── Right Column: Interactive On-Page Contact Form ── */}
          <div className="lg:col-span-7">
            <div
              className="rounded-2xl border p-6 sm:p-8"
              style={{
                background: "linear-gradient(180deg, #0d0e15 0%, #090a0f 100%)",
                borderColor: "#1f2230",
                boxShadow: "0 15px 35px rgba(0,0,0,0.5)",
              }}
            >
              <h3 className="text-lg font-bold text-white mb-1">
                Send a Message
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                Fill in the details below to start a conversation.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    placeholder=""
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141622] border border-[#1f2230] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    placeholder=""
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141622] border border-[#1f2230] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-200"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder=""
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#141622] border border-[#1f2230] text-sm text-white placeholder-slate-600 focus:outline-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(59,130,246,0.25)] transition-all duration-200 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full justify-center py-3 text-sm cursor-pointer"
                >
                  <Send size={15} /> Send Message
                </button>

                {status === "sent" && (
                  <p className="flex items-center justify-center gap-2 text-xs text-cyan-400 pt-2 font-medium">
                    <CheckCircle2 size={14} /> Opening email draft in your default client...
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-16 pt-8 border-t border-[#1a1d28] flex flex-col items-center text-xs text-slate-500">
          <p>
            &copy; {new Date().getFullYear()} Dhruv Rathi. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
