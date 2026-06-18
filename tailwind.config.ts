import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        border: "hsl(var(--border))",
        hairline: "hsl(var(--hairline))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        "background-darker": "hsl(var(--background-darker))",
        foreground: "hsl(var(--foreground))",
        rail: "hsl(var(--rail))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // ── Surface ladder ──
        surface: {
          0: "hsl(var(--surface-0))",
          1: "hsl(var(--surface-1))",
          2: "hsl(var(--surface-2))",
          3: "hsl(var(--surface-3))",
        },
        // ── Brand pair ──
        "brand-cyan": "hsl(var(--brand-cyan))",
        "brand-violet": "hsl(var(--brand-violet))",
        // ── Semantic ──
        "accent-success": "hsl(var(--accent-success))",
        "accent-warning": "hsl(var(--accent-warning))",
        "accent-danger": "hsl(var(--accent-danger))",
        "accent-info": "hsl(var(--accent-info))",
        // ── Deprecated dracula aliases (still referenced widely) ──
        "dracula-bg": "hsl(var(--dracula-bg))",
        "dracula-darker": "hsl(var(--dracula-darker))",
        "dracula-current": "hsl(var(--dracula-current))",
        "dracula-fg": "hsl(var(--dracula-fg))",
        "dracula-comment": "hsl(var(--dracula-comment))",
        "dracula-cyan": "hsl(var(--dracula-cyan))",
        "dracula-green": "hsl(var(--dracula-green))",
        "dracula-orange": "hsl(var(--dracula-orange))",
        "dracula-pink": "hsl(var(--dracula-pink))",
        "dracula-purple": "hsl(var(--dracula-purple))",
        "dracula-red": "hsl(var(--dracula-red))",
        "dracula-yellow": "hsl(var(--dracula-yellow))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        card: "var(--radius-card)",
        frame: "var(--radius-frame)",
        pill: "9999px",
      },
      boxShadow: {
        "glow-brand": "var(--glow-brand)",
        "glow-violet": "var(--glow-violet)",
        "glow-elevated": "var(--glow-elevated)",
      },
      backgroundImage: {
        "gradient-brand": "var(--gradient-primary)",
        "gradient-brand-soft": "var(--gradient-brand-soft)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "section-nav-up": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        "section-nav-down": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(2px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "section-nav-up": "section-nav-up 1.5s ease-in-out infinite",
        "section-nav-down": "section-nav-down 1.5s ease-in-out infinite",
      },
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
