"use client";

import { ArrowLeft, Github, Users, Zap, Heart } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { motion } from "motion/react";
import Link from "next/link";

export function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-card/50 backdrop-blur-sm border-b border-gray-200 dark:border-border px-6 py-4 sticky top-0 z-50">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-gray-100 dark:hover:bg-muted/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-xl font-medium text-gray-900 dark:text-foreground">
              About
            </h1>
          </div>

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Logo width={24} height={24} />
            <span className="text-lg font-medium text-[#0F5F6A] dark:text-primary">
              IechoAI
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6">
        <motion.div
          className="prose prose-gray dark:prose-invert max-w-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.div
              className="w-20 h-20 bg-gradient-to-br from-[#0F5F6A] to-[#0F5F6A]/80 dark:from-primary dark:to-primary/80 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#0F5F6A]/20 dark:shadow-primary/20"
              initial={{ scale: 0.5, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <Logo
                width={32}
                height={32}
                className="text-white dark:text-primary-foreground"
              />
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Curated tools for students & developers
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Iecho is a free, open‑source directory that helps students and
              developers discover the best tools, libraries, and learning
              resources. We curate, categorize, and surface hand‑picked tools so
              you can find what you need fast — no clutter, no paywall.
            </motion.p>
          </div>

          {/* What We Do Section */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-8 text-center">
              What We Do
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-card/80 rounded-xl p-6 border border-gray-200 dark:border-border/50 shadow-sm">
                <div className="w-12 h-12 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-[#0F5F6A] dark:text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-3">
                  Curate Quality Tools
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground">
                  We handpick high quality tools and resources for learning,
                  productivity, and development to save you time searching.
                </p>
              </div>

              <div className="bg-white dark:bg-card/80 rounded-xl p-6 border border-gray-200 dark:border-border/50 shadow-sm">
                <div className="w-12 h-12 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-[#0F5F6A] dark:text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-3">
                  Community-Driven
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground">
                  Maintain an open, community‑driven list that anyone can
                  contribute to via GitHub pull requests.
                </p>
              </div>

              <div className="bg-white dark:bg-card/80 rounded-xl p-6 border border-gray-200 dark:border-border/50 shadow-sm">
                <div className="w-12 h-12 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center mb-4">
                  <Github className="w-6 h-6 text-[#0F5F6A] dark:text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-3">
                  Fast Discovery
                </h3>
                <p className="text-gray-600 dark:text-muted-foreground">
                  Provide a fast, searchable interface to help users discover
                  the right tool for the task at hand.
                </p>
              </div>
            </div>
          </motion.section>

          {/* Why Open Source Section */}
          <motion.section
            className="mb-12 bg-white dark:bg-card/80 rounded-2xl p-8 border border-gray-200 dark:border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-6">
              Why We're Open Source
            </h2>
            <p className="text-lg text-gray-600 dark:text-muted-foreground leading-relaxed mb-6">
              Open source means transparency, community contribution, and faster
              iteration. We publish the curated list so educators, students, and
              developers can inspect, reuse, and improve it.
            </p>
            <p className="text-lg text-gray-600 dark:text-muted-foreground leading-relaxed">
              The hosted version (iecho.app) offers convenience and uptime; the
              code and data remain open for the community.
            </p>
          </motion.section>

          {/* How to Help Section */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-8 text-center">
              How You Can Help
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4 bg-white dark:bg-card/80 rounded-xl p-6 border border-gray-200 dark:border-border/50">
                <div className="w-10 h-10 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Github className="w-5 h-5 text-[#0F5F6A] dark:text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-2">
                    Submit New Tools
                  </h3>
                  <p className="text-gray-600 dark:text-muted-foreground">
                    Submit new tools via a GitHub pull request to{" "}
                    <code className="bg-gray-100 dark:bg-muted/60 px-2 py-1 rounded text-sm">
                      data/tools.json
                    </code>
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white dark:bg-card/80 rounded-xl p-6 border border-gray-200 dark:border-border/50">
                <div className="w-10 h-10 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-[#0F5F6A] dark:text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-2">
                    Join Our Community
                  </h3>
                  <p className="text-gray-600 dark:text-muted-foreground">
                    Join our Discord to discuss ideas and volunteer as a
                    reviewer for new tool submissions.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-white dark:bg-card/80 rounded-xl p-6 border border-gray-200 dark:border-border/50">
                <div className="w-10 h-10 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-[#0F5F6A] dark:text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-2">
                    Sponsor Development
                  </h3>
                  <p className="text-gray-600 dark:text-muted-foreground">
                    Sponsor development on GitHub Sponsors or Open Collective to
                    help cover infrastructure costs.
                  </p>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Mission Statement */}
          <motion.section
            className="text-center bg-gradient-to-br from-[#0F5F6A]/5 to-[#B6FF3D]/5 dark:from-primary/5 dark:to-accent/20 rounded-2xl p-8 border border-gray-200 dark:border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-4">
              Our Mission
            </h2>
            <p className="text-xl font-medium text-[#0F5F6A] dark:text-primary">
              Empowering students and developers through curated, accessible
              tools and open collaboration.
            </p>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
