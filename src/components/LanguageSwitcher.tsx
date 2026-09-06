import { useEffect, useId, useRef, useState } from "react";
import { Check, Languages } from "lucide-react";
import { LANGUAGES, LANGUAGE_IDS, useI18n, type LanguageId } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({
  className,
}: {
  className?: string;
}): JSX.Element {
  const { languageId, setLanguage, content } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const choicesId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (next: LanguageId) => {
    setLanguage(next);
    setOpen(false);
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={content.language.change}
        aria-expanded={open}
        aria-controls={open ? choicesId : undefined}
        title={`${content.language.label}: ${LANGUAGES[languageId].nativeName}`}
        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-border/70 bg-surface-2 text-muted-foreground transition-colors hover:bg-surface-3 hover:text-foreground"
      >
        <Languages className="h-4 w-4" aria-hidden="true" />
      </button>

      {open && (
        <div
          id={choicesId}
          className="absolute right-0 top-full z-50 mt-2 w-52 overflow-hidden rounded-xl border border-border/50 bg-popover p-1.5 shadow-xl"
        >
          {LANGUAGE_IDS.map((id) => {
            const language = LANGUAGES[id];
            const selected = id === languageId;
            return (
              <button
                key={id}
                type="button"
                onClick={() => choose(id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors",
                  selected
                    ? "bg-surface-2 text-foreground"
                    : "text-muted-foreground hover:bg-surface-2/70 hover:text-foreground",
                )}
              >
                <span className="w-7 font-mono text-xs uppercase text-muted-foreground">
                  {id}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {language.nativeName}
                </span>
                {selected && (
                  <Check
                    className="h-3.5 w-3.5 text-brand-cyan"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default LanguageSwitcher;
