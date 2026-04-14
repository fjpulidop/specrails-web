import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GitHubStarsButtonProps {
  repo?: string;
}

export const GitHubStarsButton = ({
  repo = "fjpulidop/specrails-core",
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
    <a href={`https://github.com/${repo}`} target="_blank" rel="noopener noreferrer">
      <Button variant="outline" size="lg" className="text-base px-8 py-6">
        <Star className="w-5 h-5 mr-2" />
        Star on GitHub
        {stars != null && (
          <span className="ml-2 text-dracula-yellow font-bold">
            {stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars}
          </span>
        )}
      </Button>
    </a>
  );
};
