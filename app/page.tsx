"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Star, Zap, Users, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Logo } from "../components/Logo";

export default function LandingPage() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gridRef.current) {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        // Convert mouse position to percentage
        const xPercent = (clientX / innerWidth) * 100;
        const yPercent = (clientY / innerHeight) * 100;

        // Update mask position
        gridRef.current.style.maskPosition = `${xPercent}% ${yPercent}%`;
        gridRef.current.style.webkitMaskPosition = `${xPercent}% ${yPercent}%`;
      }
    };

    // Add mouse move listener
    window.addEventListener("mousemove", handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="landing-page">
      {/* Interactive Grid Background */}
      <div ref={gridRef} className="grid-container"></div>

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
      <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative z-10">
        {/* Background Pattern */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-[#0F5F66]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#B6FF3D]/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Logo width={80} height={80} />
            <h1 className="text-4xl font-bold text-white">IechoAI</h1>
          </div>

          {/* Badge */}
          <Badge className="mb-6 bg-[#B6FF3D]/20 text-[#B6FF3D] border-[#B6FF3D]/30 hover:bg-[#B6FF3D]/30 transition-all">
            Empowering lives through Tech
          </Badge>

          {/* Headline */}
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover the
            <span className="text-transparent bg-gradient-to-r from-[#B6FF3D] to-[#B6FF3D]/80 bg-clip-text block md:inline md:ml-4">
              Perfect Tools
            </span>
          </h2>

          {/* Subheadline */}
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Curated collection of the best AI tools, productivity apps, and
            development resources tailored for students and developers. Find
            exactly what you need to boost your workflow.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-[#B6FF3D] to-[#B6FF3D]/90 hover:from-[#B6FF3D]/90 hover:to-[#B6FF3D]/80 text-black font-semibold px-8 py-4 rounded-xl shadow-xl shadow-[#B6FF3D]/25 hover:shadow-2xl hover:shadow-[#B6FF3D]/40 transition-all duration-300 hover:scale-105 text-lg"
            >
              <Link href="/tools">
                Explore Tools
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-lg"
            >
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-bold text-[#B6FF3D] mb-4 bg-gradient-to-br from-[#B6FF3D] to-[#B6FF3D]/80 bg-clip-text text-transparent drop-shadow-lg">
                20+
              </div>
              <div className="text-gray-300 text-lg font-medium">
                Curated Tools
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-bold text-[#B6FF3D] mb-4 bg-gradient-to-br from-[#B6FF3D] to-[#B6FF3D]/80 bg-clip-text text-transparent drop-shadow-lg">
                7
              </div>
              <div className="text-gray-300 text-lg font-medium">
                Categories
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl sm:text-7xl font-bold text-[#B6FF3D] mb-4 bg-gradient-to-br from-[#B6FF3D] to-[#B6FF3D]/80 bg-clip-text text-transparent drop-shadow-lg">
                100%
              </div>
              <div className="text-gray-300 text-lg font-medium">
                Free to Use
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">
              Why Choose IechoAI?
            </h3>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We've carefully curated the best tools and organized them for your
              specific needs
            </p>
          </div>

          <div className="grid grid-cols-1 -mx-0 md:grid-cols-2 gap-4 h-full">
            {/* Feature 1 */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/15 hover:border-[#B6FF3D]/30 transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden w-full h-[50dvh] flex flex-col justify-center isolate">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B6FF3D]/10 via-transparent to-[#0F5F66]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#B6FF3D]/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-100"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#B6FF3D]/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#B6FF3D]/30 to-[#B6FF3D]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-[#B6FF3D]/20 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#B6FF3D]/50 group-hover:to-[#B6FF3D]/20">
                  <Star className="w-10 h-10 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#B6FF3D] transition-colors duration-300">
                  Curated Quality
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                  Every tool is hand-picked and tested to ensure it delivers
                  real value to your workflow
                </p>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
            </div>

            {/* Feature 2 */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/15 hover:border-[#B6FF3D]/30 transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden w-full h-[50dvh] flex flex-col justify-center isolate">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B6FF3D]/10 via-transparent to-[#0F5F66]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#B6FF3D]/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-100"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#B6FF3D]/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#B6FF3D]/30 to-[#B6FF3D]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-[#B6FF3D]/20 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#B6FF3D]/50 group-hover:to-[#B6FF3D]/20">
                  <Zap className="w-10 h-10 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#B6FF3D] transition-colors duration-300">
                  Smart Filtering
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                  Find tools tailored to your role - whether you're a student or
                  developer
                </p>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
            </div>

            {/* Feature 3 */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/15 hover:border-[#B6FF3D]/30 transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden w-full h-[50dvh] flex flex-col justify-center isolate">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B6FF3D]/10 via-transparent to-[#0F5F66]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#B6FF3D]/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-100"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#B6FF3D]/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#B6FF3D]/30 to-[#B6FF3D]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-[#B6FF3D]/20 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#B6FF3D]/50 group-hover:to-[#B6FF3D]/20">
                  <Users className="w-10 h-10 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#B6FF3D] transition-colors duration-300">
                  Community Driven
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                  Save favorites and discover what tools other professionals are
                  using
                </p>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
            </div>

            {/* Feature 4 */}
            <div className="relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-10 hover:bg-white/15 hover:border-[#B6FF3D]/30 transition-all duration-500 hover:-translate-y-2 group cursor-pointer overflow-hidden w-full h-[50dvh] flex flex-col justify-center isolate">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#B6FF3D]/10 via-transparent to-[#0F5F66]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

              {/* Floating particles effect */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#B6FF3D]/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-100"></div>
              <div className="absolute top-8 right-8 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700 delay-300"></div>
              <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-[#B6FF3D]/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-500"></div>

              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#B6FF3D]/30 to-[#B6FF3D]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-125 group-hover:rotate-12 group-hover:shadow-2xl group-hover:shadow-[#B6FF3D]/20 transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-[#B6FF3D]/50 group-hover:to-[#B6FF3D]/20">
                  <Shield className="w-10 h-10 text-[#B6FF3D] group-hover:drop-shadow-lg transition-all duration-500" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-4 group-hover:text-[#B6FF3D] transition-colors duration-300">
                  Always Updated
                </h4>
                <p className="text-gray-300 leading-relaxed text-lg group-hover:text-white transition-colors duration-300">
                  Our collection grows and evolves with the latest tools and
                  technologies
                </p>
              </div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold text-white mb-6">
            Ready to Boost Your Productivity?
          </h3>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join thousands of students and developers who have already
            discovered their perfect toolset
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-[#B6FF3D] to-[#B6FF3D]/90 hover:from-[#B6FF3D]/90 hover:to-[#B6FF3D]/80 text-black font-semibold px-12 py-4 rounded-xl shadow-xl shadow-[#B6FF3D]/25 hover:shadow-2xl hover:shadow-[#B6FF3D]/40 transition-all duration-300 hover:scale-105 text-lg"
          >
            <Link href="/tools">
              Get Started Now
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
