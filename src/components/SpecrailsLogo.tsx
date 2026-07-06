import { useId } from "react";

/**
 * The canonical specrails wordmark: a glossy gradient pill riding twin rails,
 * with the mono wordmark inside. The single source of truth for the brand mark
 * (navbar, footer, docs). Decorative by default — pair with an accessible label
 * on the wrapping link/anchor.
 */
export function SpecrailsLogo({
  height = 40,
  className,
}: {
  height?: number;
  className?: string;
}) {
  // Unique gradient id so multiple instances on one page don't collide.
  const gid = useId();
  return (
    <svg
      viewBox="0 0 188 64"
      height={height}
      width={Math.round(height * 188 / 64)}
      aria-hidden="true"
      focusable="false"
      className={className}
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1ccbe2" />
          <stop offset="100%" stopColor="#a374db" />
        </linearGradient>
      </defs>
      <rect x="4" y="6" width="180" height="6" rx="3" fill="hsl(var(--rail))" opacity="0.6" />
      <rect x="4" y="18" width="180" height="28" rx="14" fill={`url(#${gid})`} />
      <rect x="14" y="21" width="160" height="9" rx="4.5" fill="#ffffff" opacity="0.18" />
      <text
        x="94"
        y="32.5"
        fontFamily="'JetBrains Mono', monospace"
        fontWeight="700"
        fontSize="20"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#0a0e1a"
        letterSpacing="0.5"
      >
        specrails
      </text>
      <rect x="4" y="52" width="180" height="6" rx="3" fill="hsl(var(--rail))" opacity="0.6" />
    </svg>
  );
}

export default SpecrailsLogo;
