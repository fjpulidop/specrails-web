import { useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  value: string;
  className?: string;
  /** Accessible label; defaults to "Copy to clipboard". */
  label?: string;
}

/**
 * Reusable copy-to-clipboard button. Shows a check for 2s after copying.
 */
export function CopyButton({ value, className, label = "Copy to clipboard" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = useCallback(() => {
    if (!navigator?.clipboard) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : label}
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground",
        "border border-border/50 bg-surface-1/60 hover:text-foreground hover:border-border transition-colors",
        className,
      )}
    >
      {copied ? (
        <Check className="w-4 h-4 text-accent-success" />
      ) : (
        <Copy className="w-4 h-4" />
      )}
    </button>
  );
}

export default CopyButton;
