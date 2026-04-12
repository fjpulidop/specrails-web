import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

interface GitHubLabel {
  name: string;
  color: string;
}

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  html_url: string;
  labels: GitHubLabel[];
  state: string;
  created_at: string;
}

interface RepoIssue extends GitHubIssue {
  product: "core" | "hub";
}

const REPOS = [
  {
    key: "core" as const,
    apiUrl: "https://api.github.com/repos/fjpulidop/specrails-core/issues",
    issuesUrl: "https://github.com/fjpulidop/specrails-core/issues",
  },
  {
    key: "hub" as const,
    apiUrl: "https://api.github.com/repos/fjpulidop/specrails-hub/issues",
    issuesUrl: "https://github.com/fjpulidop/specrails-hub/issues",
  },
];

type Filter = "all" | "core" | "hub";

const HEX_COLOR_RE = /^[0-9a-fA-F]{6}$/;
const FALLBACK_COLOR = "6e7681";

function sanitizeLabelColor(color: string): string {
  return HEX_COLOR_RE.test(color) ? color : FALLBACK_COLOR;
}

const productBadge: Record<"core" | "hub", { label: string; className: string }> = {
  core: { label: "Core", className: "bg-dracula-cyan/15 text-dracula-cyan border-dracula-cyan/30" },
  hub: { label: "Hub", className: "bg-dracula-purple/15 text-dracula-purple border-dracula-purple/30" },
};

const RoadmapSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [issues, setIssues] = useState<RepoIssue[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const controller = new AbortController();

    Promise.all(
      REPOS.map((repo) =>
        fetch(`${repo.apiUrl}?state=open&per_page=10&sort=created&direction=desc`, {
          signal: controller.signal,
        })
          .then((res) => {
            if (res.status === 429) throw new Error("GitHub API rate limit exceeded");
            if (!res.ok) throw new Error("GitHub API error");
            return res.json();
          })
          .then((data: GitHubIssue[]) =>
            data
              .filter((issue) => !("pull_request" in issue))
              .map((issue): RepoIssue => ({ ...issue, product: repo.key }))
          )
      )
    )
      .then((results) => {
        const all = results
          .flat()
          .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        setIssues(all);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setError(true);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const filtered = filter === "all" ? issues : issues.filter((i) => i.product === filter);

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "core", label: "Core" },
    { key: "hub", label: "Hub" },
  ];

  return (
    <section id="roadmap" className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="gradient-text">Roadmap</span>
        </h2>
        <p
          className={`text-center text-dracula-foreground/60 mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Live from GitHub Issues
        </p>

        {/* Filter buttons */}
        <div
          className={`flex justify-center gap-2 mb-8 transition-all duration-700 delay-150 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                filter === f.key
                  ? "bg-dracula-purple/20 text-dracula-purple border-dracula-purple/30"
                  : "text-muted-foreground border-border/20 hover:text-foreground hover:border-border/40"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-8 h-8 border-2 border-dracula-purple border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="text-center py-12">
            <p className="text-dracula-foreground/60 mb-4">
              Could not load issues right now.
            </p>
            <div className="flex justify-center gap-4">
              {REPOS.map((repo) => (
                <a
                  key={repo.key}
                  href={repo.issuesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-dracula-purple hover:text-dracula-pink transition-colors underline text-sm"
                >
                  View {repo.key} issues
                </a>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-dracula-foreground/60 py-12">
            No open issues — all caught up!
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((issue, i) => {
              const badge = productBadge[issue.product];
              return (
                <a
                  key={issue.id}
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`glass-card p-5 transition-all duration-500 hover:border-dracula-purple/50 group ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-dracula-green mt-0.5 shrink-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                      >
                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z" />
                      </svg>
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium border ${badge.className}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                      <p className="font-medium text-sm group-hover:text-dracula-purple transition-colors leading-snug">
                        {issue.title}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {issue.labels.map((label) => {
                          const safeColor = sanitizeLabelColor(label.color);
                          return (
                            <span
                              key={label.name}
                              className="text-xs px-2 py-0.5 rounded-full font-medium"
                              style={{
                                backgroundColor: `#${safeColor}20`,
                                color: `#${safeColor}`,
                                border: `1px solid #${safeColor}40`,
                              }}
                            >
                              {label.name}
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-xs text-dracula-foreground/40 mt-2 block">
                        #{issue.number}
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        <div
          className={`text-center mt-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          <div className="flex justify-center gap-6">
            {REPOS.map((repo) => (
              <a
                key={repo.key}
                href={repo.issuesUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-dracula-foreground/60 hover:text-dracula-purple transition-colors"
              >
                View {repo.key} issues
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-2.19l5.72 5.72a.75.75 0 1 1-1.06 1.06L4 4.56v2.19a.75.75 0 0 1-1.5 0v-3.5A1.25 1.25 0 0 1 3.75 2Zm-1.5 4.5a.75.75 0 0 1 .75.75v5a.75.75 0 0 0 .75.75h8.5a.75.75 0 0 0 .75-.75v-5a.75.75 0 0 1 1.5 0v5A2.25 2.25 0 0 1 12.25 14.5h-8.5A2.25 2.25 0 0 1 1.5 12.25v-5a.75.75 0 0 1 .75-.75Z" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
