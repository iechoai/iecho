"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { motion } from "motion/react";
import Link from "next/link";

export function PrivacyPage() {
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
              Privacy Policy
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
          className="bg-white dark:bg-card/80 rounded-2xl p-8 border border-gray-200 dark:border-border/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-card/80 rounded-2xl p-8 border border-gray-200 dark:border-border/50">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-2">
                Privacy Policy
              </h1>
              <p className="text-gray-600 dark:text-muted-foreground">
                <strong>Effective date:</strong>{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  Iecho ("we", "us", "our") operates iecho.app, an open‑source
                  directory of tools for students and developers. This Privacy
                  Policy explains what data we collect, why we collect it, and
                  how you can manage it.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  2. Data we collect
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-4">
                  We may collect and process the following categories of
                  personal data:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>
                    <strong>Account information:</strong> If you sign in (e.g.,
                    via GitHub), we store your user ID, display name, and email
                    address to authenticate and personalize your experience.
                  </li>
                  <li>
                    <strong>Communications:</strong> Messages you send via
                    contact forms or support channels.
                  </li>
                  <li>
                    <strong>Usage data:</strong> Server logs, pages visited,
                    clicks, and metrics collected via analytics providers (e.g.,
                    Plausible, Google Analytics) to improve the site.
                  </li>
                  <li>
                    <strong>Contributions:</strong> Content you submit via
                    GitHub PRs or the app (tool entries, comments) —
                    contributions are public per the repo and license.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  3. How we use data
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>Provide and maintain the site and features.</li>
                  <li>
                    Improve user experience, troubleshoot, and analyze usage
                    patterns.
                  </li>
                  <li>Moderate contributions and prevent abuse.</li>
                  <li>
                    Communicate updates, changes, or responses to support
                    requests.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  4. Third‑party services
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-4">
                  We use third‑party services to operate the site; they may
                  process personal data on our behalf. Typical services include:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>
                    <strong>Hosting & infra:</strong> Vercel (deployment + CDN)
                  </li>
                  <li>
                    <strong>Database:</strong> Neon (Postgres)
                  </li>
                  <li>
                    <strong>Caching:</strong> Upstash/Redis
                  </li>
                  <li>
                    <strong>Analytics & monitoring:</strong> Plausible / Google
                    Analytics (optional), Langfuse (AI observability)
                  </li>
                  <li>
                    <strong>Authentication:</strong> NextAuth and OAuth
                    providers (e.g., GitHub, Google)
                  </li>
                </ul>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mt-4">
                  We recommend listing the exact providers used on your
                  production instance and linking to their privacy pages.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  5. Cookies & tracking
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  We use cookies for session management and optional analytics.
                  Users can opt‑out of analytics where possible. If you
                  integrate third‑party scripts, disclose them and give an
                  opt‑out link.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  6. Data retention
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>
                    <strong>Contact/support messages:</strong> retained for as
                    long as necessary to provide support (default: 180 days,
                    configurable).
                  </li>
                  <li>
                    <strong>Analytics data:</strong> aggregated and retained per
                    provider defaults.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  7. Data subject rights
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  Depending on your jurisdiction, you may have rights to access,
                  correct, or delete your personal data. To exercise these
                  rights contact{" "}
                  <a
                    href="mailto:privacy@iecho.app"
                    className="text-[#0F5F6A] dark:text-primary hover:underline"
                  >
                    privacy@iecho.app
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  8. Security
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  We take reasonable measures to protect your data (HTTPS,
                  parameterized queries, least‑privilege secrets). However, no
                  online service is completely secure; if a breach occurs we
                  will follow disclosure and mitigation best practices.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  9. Children
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  The site is not intended for children under 13. We do not
                  knowingly collect their data.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  10. Changes to this policy
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  We may update this policy. We will post the revised date at
                  the top of this page.
                </p>
              </section>

              <div className="bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-xl p-6 mt-8">
                <p className="text-amber-800 dark:text-amber-400 text-sm">
                  <strong>Legal note:</strong> This is a concise template.
                  Please consult legal counsel to ensure compliance with local
                  laws (GDPR, CCPA, etc.).
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
