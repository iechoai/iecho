"use client";

import { motion } from "motion/react";
import { useMemo } from "react";

const getDomain = (url: string) => {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (e) {
    return "";
  }
};

export type IntegrationTool = {
  id: string;
  name: string;
  url: string;
  icon?: string;
};

interface IntegrationsSectionProps {
  tools: IntegrationTool[];
}

export function IntegrationsSection({ tools }: IntegrationsSectionProps) {
  // Filter tools that have valid URLs and are likely to have good favicons
  const validTools = useMemo(() => {
    return tools
      .filter((t) => t.url && !t.url.includes("localhost"))
      .slice(0, 30);
  }, [tools]);

  // Split into two rows
  const row1 = validTools.slice(0, Math.ceil(validTools.length / 2));
  const row2 = validTools.slice(Math.ceil(validTools.length / 2));

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center mb-16 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-sm font-medium text-gray-300">
            Ecosystem
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            The Best Tools, All in One Place.
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Browse our extensive directory of AI and productivity tools designed
            to supercharge your workflow.
          </p>
        </motion.div>
      </div>

      <div className="relative flex flex-col gap-8">
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-[#0F0F0F] to-transparent z-10 pointer-events-none"></div>

        {/* Row 1 - Left to Right */}
        <MarqueeRow tools={[...row1, ...row1]} direction="left" speed={40} />

        {/* Row 2 - Right to Left */}
        <MarqueeRow tools={[...row2, ...row2]} direction="right" speed={50} />
      </div>
    </section>
  );
}

function MarqueeRow({
  tools,
  direction,
  speed,
}: {
  tools: IntegrationTool[];
  direction: "left" | "right";
  speed: number;
}) {
  return (
    <div className="flex overflow-hidden select-none group">
      <motion.div
        className="flex gap-4 md:gap-8 flex-shrink-0 items-center"
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {tools.map((tool, idx) => (
          <div
            key={`${tool.id}-${idx}`}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 hover:border-[#B6FF3D]/30 hover:scale-110 transition-all duration-300 cursor-pointer"
            title={tool.name}
          >
            <img
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${getDomain(
                tool.url
              )}`}
              alt={tool.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
      {/* Duplicate for seamless loop (handled by the double array passed in props, but we need enough content to fill screen) */}
      <motion.div
        className="flex gap-4 md:gap-8 flex-shrink-0 items-center pl-4 md:pl-8"
        initial={{ x: direction === "left" ? 0 : "-50%" }}
        animate={{ x: direction === "left" ? "-50%" : 0 }}
        transition={{
          duration: speed,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {tools.map((tool, idx) => (
          <div
            key={`${tool.id}-${idx}-duplicate`}
            className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm hover:bg-white/10 hover:border-[#B6FF3D]/30 hover:scale-110 transition-all duration-300 cursor-pointer"
            title={tool.name}
          >
            <img
              src={`https://www.google.com/s2/favicons?sz=128&domain_url=${getDomain(
                tool.url
              )}`}
              alt={tool.name}
              className="w-8 h-8 md:w-10 md:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
