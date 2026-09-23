"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { profile } from "@/data/profile";

const paragraphs = profile.about.split("\n\n");

const ease = [0.16, 1, 0.3, 1] as const;

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  let wordCounter = 0;

  return (
    <section
      id="about"
      className="py-14 sm:py-18 relative overflow-hidden"
      style={{ background: "#09090b" }}
    >
      <div className="global-container" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease }}
          className="mb-8"
        >
          <h2 className="section-title">About</h2>
          <p className="section-subtitle max-w-3xl">
            Building at the intersection of{" "}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent font-medium">
              AI and software.
            </span>
          </p>
        </motion.div>

        {/* Editorial Body: Staggered Word Reveal at a measured, elegant pace with consistent font size */}
        <div className="max-w-4xl space-y-6">
          {paragraphs.map((para, pi) => {
            const words = para.split(" ");

            return (
              <p
                key={pi}
                className="text-sm sm:text-sm leading-relaxed text-slate-300"
              >
                {words.map((word) => {
                  const currentIdx = wordCounter++;
                  // Deliberate, smooth word-by-word reveal pacing
                  const delay = 0.2 + currentIdx * 0.038;

                  return (
                    <motion.span
                      key={`${pi}-${currentIdx}`}
                      initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                      animate={
                        isInView
                          ? { opacity: 1, y: 0, filter: "blur(0px)" }
                          : { opacity: 0, y: 8, filter: "blur(2px)" }
                      }
                      transition={{
                        duration: 0.45,
                        delay,
                        ease,
                      }}
                      className="inline-block mr-[0.3em]"
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
}
