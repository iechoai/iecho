"use client";

import { ArrowLeft, Mail, Github, MessageSquare, Send } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Logo } from "./Logo";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import Link from "next/link";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rateLimitReset, setRateLimitReset] = useState<number | null>(null);

  const resetMessage = useMemo(() => {
    if (!rateLimitReset) {
      return null;
    }

    const now = Date.now();
    const seconds = Math.max(0, Math.round((rateLimitReset - now) / 1000));
    if (seconds === 0) {
      return "Please try again.";
    }
    return `Please try again in ${seconds} seconds.`;
  }, [rateLimitReset]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitted(false);
    setErrorMessage(null);
    setRateLimitReset(null);

    try {
      // Use an AbortController so we fail fast if the API is unreachable.
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10_000);

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        const resetHeader = response.headers.get("X-RateLimit-Reset");
        if (resetHeader) {
          setRateLimitReset(Number(resetHeader) * 1000);
        }
        const payload = await response.json().catch(() => null);
        throw new Error(
          payload?.error ?? "You are sending messages too quickly."
        );
      }

      if (!response.ok) {
        const payload = await response.json().catch(() => null);
        throw new Error(
          payload?.error ?? "Something went wrong. Please try again."
        );
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 4000);
    } catch (error) {
      setErrorMessage(
        (error as Error)?.message ?? "Unable to send your message right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

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
              Contact
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
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Contact Us
            </motion.h1>

            <motion.p
              className="text-xl text-gray-600 dark:text-muted-foreground leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Have questions, partnership ideas, or want to contribute? Reach
              out — we read every message.
            </motion.p>
          </div>

          {/* Contact Options */}
          <motion.section
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-6">
              Get in Touch
            </h2>

            <div className="grid sm:grid-cols-2 gap-4">
              <a
                href="mailto:hello@iecho.app"
                className="flex items-center gap-4 p-4 bg-white dark:bg-card/80 rounded-xl border border-gray-200 dark:border-border/50 hover:border-[#0F5F6A]/30 dark:hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-[#0F5F6A] dark:text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-foreground">
                    Email
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    hello@iecho.app
                  </p>
                </div>
              </a>

              <a
                href="https://github.com/iechoai/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-card/80 rounded-xl border border-gray-200 dark:border-border/50 hover:border-[#0F5F6A]/30 dark:hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="w-6 h-6 text-[#0F5F6A] dark:text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-foreground">
                    GitHub
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Contribute via PRs
                  </p>
                </div>
              </a>

              <a
                href="#"
                className="flex items-center gap-4 p-4 bg-white dark:bg-card/80 rounded-xl border border-gray-200 dark:border-border/50 hover:border-[#0F5F6A]/30 dark:hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-6 h-6 text-[#0F5F6A] dark:text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-foreground">
                    Discord
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    Join our community
                  </p>
                </div>
              </a>

              <a
                href="https://twitter.com/iechoai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white dark:bg-card/80 rounded-xl border border-gray-200 dark:border-border/50 hover:border-[#0F5F6A]/30 dark:hover:border-primary/30 transition-colors group"
              >
                <div className="w-12 h-12 bg-[#B6FF3D]/20 dark:bg-primary/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg
                    className="w-6 h-6 text-[#0F5F6A] dark:text-primary"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-foreground">
                    X / Twitter
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-muted-foreground">
                    @iechoai
                  </p>
                </div>
              </a>
            </div>
          </motion.section>

          {/* Contact Form */}
          <motion.section
            className="bg-white dark:bg-card/80 rounded-2xl p-8 border border-gray-200 dark:border-border/50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-6">
              Send us a message
            </h2>

            {submitted && (
              <motion.div
                className="mb-6 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-green-800 dark:text-green-400 font-medium">
                  Thank you! Your message has been sent successfully.
                </p>
              </motion.div>
            )}

            {errorMessage && (
              <motion.div
                className="mb-6 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="text-red-800 dark:text-red-400 font-medium">
                  {errorMessage}
                </p>
                {resetMessage && (
                  <p className="text-sm text-red-700/80 dark:text-red-300 mt-2">
                    {resetMessage}
                  </p>
                )}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-2"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="mt-2"
                  placeholder="Tell us about your question, feedback, or how you'd like to contribute..."
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>
          </motion.section>
        </motion.div>
      </main>
    </div>
  );
}
