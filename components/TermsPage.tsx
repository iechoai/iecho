"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "./ui/button";
import { Logo } from "./Logo";
import { motion } from "motion/react";
import Link from "next/link";

export function TermsPage() {
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
              Terms of Service
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
          <div className="bg-white dark:bg-card/80 rounded-2xl p-8 border border-gray-200 dark:border-border/50">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-foreground mb-2">
                Terms of Service
              </h1>
              <p className="text-gray-600 dark:text-muted-foreground">
                <strong>Effective date:</strong>{" "}
                {new Date().toLocaleDateString()}
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  1. Agreement to terms
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  By using iecho.app (the "Service"), you agree to these Terms
                  of Service. If you don't agree, please do not use the Service.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  2. Services provided
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  Iecho provides a curated directory of tools and resources for
                  students and developers. The Service is provided "as is" and
                  may change or be discontinued at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  3. User contributions
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-4">
                  Contributions made via GitHub PRs or the site are covered by
                  the project's license (see LICENSE file). By contributing, you
                  grant Iecho a non‑exclusive right to use, modify, and
                  redistribute your contribution under that license.
                </p>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  Do not submit content you do not own or have permission to
                  share.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  4. Acceptable use
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-muted-foreground">
                  <li>
                    Violate applicable laws or infringe third‑party rights.
                  </li>
                  <li>
                    Abuse the API or automate scraping at scale without
                    permission.
                  </li>
                  <li>
                    Attempt to compromise the Service or disrupt other users.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  5. Moderation & removal
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  We reserve the right to remove content, block users, or take
                  other actions to protect the community and service integrity.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  6. Intellectual property
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  The codebase is licensed under the project LICENSE. The
                  curated data is licensed under the DATA license (see
                  DATA_LICENSE.md). Trademarks and brand assets remain the
                  property of the project.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  7. Disclaimers & limitation of liability
                </h2>
                <div className="bg-gray-50 dark:bg-muted/30 rounded-xl p-6 mb-4">
                  <p className="text-gray-600 dark:text-muted-foreground leading-relaxed mb-4">
                    <strong>
                      THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY
                      KIND. WE DO NOT GUARANTEE THE ACCURACY OR AVAILABILITY OF
                      THIRD‑PARTY TOOLS LISTED.
                    </strong>
                  </p>
                  <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                    <strong>
                      TO THE MAXIMUM EXTENT PERMITTED BY LAW, IECHO SHALL NOT BE
                      LIABLE FOR INDIRECT, INCIDENTAL, OR CONSEQUENTIAL DAMAGES.
                    </strong>
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  8. Indemnity
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  You agree to indemnify Iecho from claims arising from your
                  misuse of the Service or violation of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  9. Governing law
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  These Terms shall be governed by the laws of [Your
                  Country/State] (specify your jurisdiction).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-foreground mb-4">
                  10. Changes to terms
                </h2>
                <p className="text-gray-600 dark:text-muted-foreground leading-relaxed">
                  We may modify these Terms; material changes will be
                  communicated via the website. Continued use after changes
                  constitutes acceptance.
                </p>
              </section>

              <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl p-6 mt-8">
                <p className="text-blue-800 dark:text-blue-400 text-sm">
                  <strong>Note:</strong> This is a template for general
                  guidance. Please consult with legal counsel to ensure these
                  terms meet your specific needs and comply with applicable laws
                  in your jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
