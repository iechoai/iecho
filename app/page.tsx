import Link from "next/link";
import { ArrowRight, Star, Zap, Users, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Logo } from "../components/Logo";
import { GridBackground } from "../components/landing/GridBackground";
import { IntegrationsSection } from "../components/landing/IntegrationsSection";
import type { IntegrationTool } from "../components/landing/IntegrationsSection";
import { FeatureCard } from "../components/landing/FeatureCard";
import { StatsCounter } from "../components/landing/StatsCounter";
import toolsData from "../data/tools.json";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IechoAI - Discover the Perfect Tools",
  description:
    "Curated collection of the best AI tools, productivity apps, and development resources tailored for students and developers.",
  openGraph: {
    title: "IechoAI - Discover the Perfect Tools",
    description:
      "Curated collection of the best AI tools, productivity apps, and development resources tailored for students and developers.",
    type: "website",
  },
};

export default function LandingPage() { 
  const tools = toolsData.tools;
  const integrationTools: IntegrationTool[] = tools.map((tool) => ({
    id: tool.id,
    name: tool.name,
    url: tool.url,
    icon: tool.icon,
  }));

  // Calculate dynamic stats
  const totalTools = tools.length;
  const categories = new Set(tools.flatMap((t) => t.categories)).size;
  const freePercent = Math.round(
    (tools.filter((t) => t.tier === "free").length / tools.length) * 100
  );

  return (
    <div className="landing-page min-h-screen flex flex-col">
      <GridBackground />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Logo width={32} height={32} />
              <span className="text-xl font-semibold text-white">IechoAI</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/tools"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Tools
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* CTA Button */}
            <Button
              asChild
              className="bg-[#B6FF3D] hover:bg-[#B6FF3D]/90 text-black font-semibold px-6 py-2 rounded-lg transition-all hover:scale-105"
            >
              <Link href="/tools">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10 pt-20">
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8 animate-in fade-in zoom-in duration-1000">
            <Logo width={80} height={80} />
            <h1 className="text-4xl font-bold text-white">IechoAI</h1>
          </div>

          {/* Badge */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            <Badge className="mb-6 bg-[#B6FF3D]/20 text-[#B6FF3D] border-[#B6FF3D]/30 hover:bg-[#B6FF3D]/30 transition-all">
              Empowering lives through Tech
            </Badge>
          </div>

          {/* Headline */}
          <h2 className="text-5xl text-transparent bg-gradient-to-r from-[#fff] to-[#B6FF3D]/80 bg-clip-text md:text-7xl font-bold mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            Discover the Perfect Tools
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
            Curated collection of the best AI tools, productivity apps, and
            development resources tailored for students and developers. Find
            exactly what you need to boost your workflow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#B6FF3D] to-[#B6FF3D]/90 hover:from-[#B6FF3D]/90 hover:to-[#B6FF3D]/80 text-black font-semibold px-8 py-6 rounded-xl shadow-xl shadow-[#B6FF3D]/25 hover:shadow-2xl hover:shadow-[#B6FF3D]/40 transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link href="/tools">
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm px-8 py-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-lg"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <StatsCounter
              value={totalTools}
              label="Curated Tools"
              suffix="+"
              delay={1}
            />
            <StatsCounter value={categories} label="Categories" delay={1.2} />
            <StatsCounter
              value={freePercent}
              label="Free to Use"
              suffix="%"
              delay={1.4}
            />
          </div>
        </div>
      </div>

      {/* Integrations / Marquee Section */}
      <IntegrationsSection tools={integrationTools} />

      {/* Features Section */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Built for the Modern Maker
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Stop searching, start building. We've done the heavy lifting to
              find the tools that actually matter.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FeatureCard
              icon={
                <Star className="w-8 h-8 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
              }
              title="Zero Fluff, All Impact"
              description="We test every tool so you don't have to. Only the most effective resources make the cut."
              delay={0}
            />
            <FeatureCard
              icon={
                <Zap className="w-8 h-8 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
              }
              title="Tailored to You"
              description="Whether you're shipping code or studying for finals, find the exact stack you need in seconds."
              delay={0.2}
            />
            <FeatureCard
              icon={
                <Users className="w-8 h-8 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
              }
              title="Powered by People"
              description="Join a growing community of innovators. Upvote the best, skip the rest."
              delay={0.4}
            />
            <FeatureCard
              icon={
                <Shield className="w-8 h-8 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
              }
              title="Always on the Bleeding Edge"
              description="The tech world moves fast. We move faster, keeping you ahead of the curve."
              delay={0.6}
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Your Workflow, Upgraded.
          </h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            The right tool can change everything. Start exploring the collection
            today and find your new superpower.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#B6FF3D] to-[#B6FF3D]/90 hover:from-[#B6FF3D]/90 hover:to-[#B6FF3D]/80 text-black font-semibold px-12 py-6 rounded-xl shadow-xl shadow-[#B6FF3D]/25 hover:shadow-2xl hover:shadow-[#B6FF3D]/40 transition-all duration-300 hover:scale-105 text-lg"
          >
            <Link href="/tools">
              Find Your Tools
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 relative z-10 bg-black/40 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Logo width={32} height={32} />
              <span className="text-xl font-semibold text-white">IechoAI</span>
            </div>
            <p className="text-gray-300 mb-6">
              Empowering students and developers through curated, accessible
              tools and open collaboration.
            </p>

            {/* Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-6 mb-6">
              <Link
                href="/tools"
                className="text-gray-300 hover:text-white transition-colors hover:underline"
              >
                Tools
              </Link>
              <Link
                href="/about"
                className="text-gray-300 hover:text-white transition-colors hover:underline"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-300 hover:text-white transition-colors hover:underline"
              >
                Contact
              </Link>
              <a
                href="https://github.com/iechoai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors hover:underline"
              >
                GitHub
              </a>
            </div>
          </div>

          {/* Bottom section with legal links */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Iecho. Built with ❤️ — open source.
              </p>

              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
                >
                  Privacy
                </Link>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors text-sm hover:underline"
                >
                  Terms
                </Link>
              </div>
            </div>

            <p className="text-gray-500 text-xs mt-4 text-center">
              Iecho uses minimal analytics and respects your privacy. See our
              Privacy Policy.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
