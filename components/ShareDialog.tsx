"use client";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Link2,
  Twitter,
  Facebook,
  Linkedin,
  Mail,
  Check,
  Download,
} from "lucide-react";
import { openExternalUrl } from "../lib/dom";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  url: string;
  description?: string;
  type?: "tool" | "profile" | "collection";
}

export function ShareDialog({
  isOpen,
  onClose,
  title,
  url,
  description,
  type = "tool",
}: ShareDialogProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareToTwitter = () => {
    const text =
      type === "tool"
        ? `Check out ${title} on IechoAI! ${description || ""}`
        : `Check out my tool collection on IechoAI!`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      text
    )}&url=${encodeURIComponent(url)}`;
    openExternalUrl(twitterUrl, "width=550,height=420");
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`;
    openExternalUrl(facebookUrl, "width=550,height=420");
  };

  const shareToLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      url
    )}`;
    openExternalUrl(linkedinUrl, "width=550,height=420");
  };

  const shareViaEmail = () => {
    const subject =
      type === "tool" ? `Check out ${title}` : "Check out my tool collection";
    const body = `${description || title}\n\n${url}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Dialog */}
          <motion.div
            className="relative z-10 w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-200 dark:border-border overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-border">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                  Share {type === "tool" ? "Tool" : "Collection"}
                </h3>
                <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">
                  {title}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-muted transition-colors text-gray-600 dark:text-muted-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Copy Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-2">
                  Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="flex-1 px-3 py-2 bg-gray-50 dark:bg-muted border border-gray-200 dark:border-border rounded-lg text-sm text-gray-700 dark:text-muted-foreground"
                  />
                  <Button
                    onClick={handleCopyLink}
                    className="bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Link2 className="w-4 h-4 mr-2" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-foreground mb-3">
                  Share via
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={shareToTwitter}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted transition-all group"
                  >
                    <div className="w-5 h-5 bg-[#1DA1F2] rounded flex items-center justify-center">
                      <Twitter className="w-3 h-3 text-white fill-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-foreground">
                      Twitter
                    </span>
                  </button>

                  <button
                    onClick={shareToFacebook}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted transition-all group"
                  >
                    <div className="w-5 h-5 bg-[#1877F2] rounded flex items-center justify-center">
                      <Facebook className="w-3 h-3 text-white fill-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-foreground">
                      Facebook
                    </span>
                  </button>

                  <button
                    onClick={shareToLinkedIn}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted transition-all group"
                  >
                    <div className="w-5 h-5 bg-[#0A66C2] rounded flex items-center justify-center">
                      <Linkedin className="w-3 h-3 text-white fill-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-foreground">
                      LinkedIn
                    </span>
                  </button>

                  <button
                    onClick={shareViaEmail}
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg border border-gray-200 dark:border-border hover:bg-gray-50 dark:hover:bg-muted transition-all group"
                  >
                    <div className="w-5 h-5 bg-gray-600 dark:bg-muted-foreground rounded flex items-center justify-center">
                      <Mail className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-foreground">
                      Email
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
