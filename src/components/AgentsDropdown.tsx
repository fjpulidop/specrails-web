import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";

const AGENT_LINKS = [
  {
    label: "Overview",
    href: "/#agents",
    description: "Meet the 12 specialized AI agents",
  },
  {
    label: "Comparison Matrix",
    href: "/agents",
    description: "Side-by-side skills, models & capabilities",
  },
];

export function AgentsDropdown(): JSX.Element {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  const updatePos = useCallback(() => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({ top: rect.bottom + 8, left: rect.left });
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [open, updatePos]);

  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        buttonRef.current && !buttonRef.current.contains(target) &&
        menuRef.current && !menuRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          if (!open && buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setPos({ top: rect.bottom + 8, left: rect.left });
          } else {
            setPos(null);
          }
          setOpen((prev) => !prev);
        }}
        className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        Agents
        <ChevronDown
          className={`w-3 h-3 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && pos &&
        createPortal(
          <ul
            ref={menuRef}
            style={{ top: pos.top, left: pos.left }}
            className="fixed w-72 grid gap-1 p-3 bg-popover border border-border/30 rounded-xl shadow-xl z-[9999]"
          >
            {AGENT_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-2 hover:bg-dracula-current transition-colors group"
                >
                  <div className="text-sm font-medium text-foreground group-hover:text-dracula-purple transition-colors">
                    {link.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {link.description}
                  </div>
                </a>
              </li>
            ))}
          </ul>,
          document.body
        )}
    </>
  );
}
