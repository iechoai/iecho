"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, Loader2, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import {
  toolRecommendationSchema,
  type ToolRecommendationPayload,
} from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RecommendToolDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  { id: "chatbots", label: "Chatbots" },
  { id: "note-taking", label: "Note-taking" },
  { id: "studying", label: "Studying" },
  { id: "tools", label: "Tools" },
  { id: "scheduling", label: "Scheduling" },
  { id: "tutorials", label: "Tutorials" },
  { id: "documentation", label: "Documentation" },
  { id: "prompting", label: "Prompting" },
  { id: "productivity", label: "Productivity" },
  { id: "design", label: "Design" },
  { id: "no-code", label: "No-code tools" },
  { id: "extensions", label: "Extensions" },
  { id: "resources", label: "Book Resources" },
  { id: "games", label: "Game Development" },
];

export function RecommendToolDialog({
  isOpen,
  onClose,
}: RecommendToolDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ToolRecommendationPayload>({
    resolver: zodResolver(toolRecommendationSchema),
    defaultValues: {
      name: "",
      url: "",
      description: "",
      category: "",
      tags: "",
      email: "",
    },
  });

  const onSubmit = async (data: ToolRecommendationPayload) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/tools/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit recommendation");
      }

      toast.success("Thank you for your recommendation!");
      form.reset();
      onClose();
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
            className="relative z-10 w-full max-w-lg bg-white dark:bg-card rounded-2xl shadow-2xl border border-gray-200 dark:border-border overflow-hidden max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-border shrink-0">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground">
                  Recommend a Tool
                </h3>
                <p className="text-sm text-gray-600 dark:text-muted-foreground mt-1">
                  Know a great tool we're missing? Let us know!
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
            <div className="p-6 overflow-y-auto">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tool Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. ChatGPT" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Briefly describe what this tool does..."
                            className="resize-none min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ai, writing, productivity (comma separated)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email (Optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="For follow-up if needed"
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="pt-4">
                    <Button
                      type="submit"
                      className="w-full bg-[#0F5F6A] dark:bg-primary hover:bg-[#0F5F6A]/90 dark:hover:bg-primary/90 text-white dark:text-primary-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Recommendation"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
