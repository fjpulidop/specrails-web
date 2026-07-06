import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface GitHubStarsButtonProps {
  repo?: string;
  /** Product name shown before "Star on GitHub" (e.g. "Specrails (Core)"). */
  label?: string;
  /** Extra classes for the button (e.g. "w-full"). */
  className?: string;
}

export const GitHubStarsButton = ({
  repo = "fjpulidop/specrails-core",
  label,
  className,
}: GitHubStarsButtonProps) => {
  const { data } = useQuery({
    queryKey: ["github-stars", repo],
    queryFn: async () => {
      const res = await fetch(`https://api.github.com/repos/${repo}`);
      if (!res.ok) return null;
      return res.json() as Promise<{ stargazers_count: number }>;
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const stars = data?.stargazers_count;

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Star ${label ?? repo} on GitHub`}
      className="block w-full"
    >
      <Button
        variant="outline"
        className={cn("w-full justify-center px-5 py-4 text-sm", className)}
      >
        <Star className="mr-2 h-4 w-4" />
        {label && <span className="mr-1.5 font-semibold text-foreground">{label}</span>}
        <span className="text-muted-foreground">Star on GitHub</span>
        {stars != null && (
          <span className="ml-2 font-bold text-dracula-yellow">
            {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
          </span>
        )}
      </Button>
    </a>
  );
};
