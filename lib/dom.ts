/**
 * DOM utilities for secure external navigation.
 * 
 * Provides helpers to safely open external URLs with automatic protection
 * against reverse-tabnabbing attacks by enforcing `noopener` and `noreferrer`
 * window features on all calls to `window.open()`.
 */

const splitWindowFeatures = (baseFeatures?: string): string[] => {
  if (!baseFeatures) {
    return [];
  }

  return baseFeatures
    .split(",")
    .map((feature) => feature.trim())
    .filter((feature) => feature.length > 0);
};

const mergeWindowFeatures = (baseFeatures?: string): string => {
  const defaults = ["noopener", "noreferrer"];
  if (!baseFeatures) {
    return defaults.join(",");
  }

  const provided = splitWindowFeatures(baseFeatures);

  const merged = new Set([...provided, ...defaults]);
  return Array.from(merged).join(",");
};

export const openExternalUrl = (url: string, features?: string) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const finalFeatures = mergeWindowFeatures(features);
    const newWindow = window.open(url, "_blank", finalFeatures);

    if (newWindow) {
      newWindow.opener = null;
    }
  } catch (error) {
    console.warn("Failed to open external URL", error);
  }
};
