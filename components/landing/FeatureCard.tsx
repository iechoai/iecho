"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export function FeatureCard({
  icon,
  title,
  description,
  delay = 0,
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-[#B6FF3D]/30 transition-all duration-500 group cursor-pointer overflow-hidden h-full flex flex-col justify-center isolate"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#B6FF3D]/5 via-transparent to-[#0F5F66]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

      {/* Floating particles effect */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-[#B6FF3D]/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-100"></div>
      <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 delay-300"></div>

      <div className="relative z-10">
        <div className="w-16 h-16 bg-gradient-to-br from-[#B6FF3D]/20 to-[#B6FF3D]/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 group-hover:shadow-xl group-hover:shadow-[#B6FF3D]/10 transition-all duration-500">
          {icon}
        </div>
        <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#B6FF3D] transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
