import { useState } from "react";
import { Link } from "react-router-dom";
import { AGENTS, type AgentEntry, type PipelineStage, type JobCategory } from "@/data/agents";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modelColors: Record<string, string> = {
  Opus: "bg-dracula-purple/20 text-dracula-purple border-0",
  Sonnet: "bg-dracula-cyan/20 text-dracula-cyan border-0",
  Haiku: "bg-dracula-green/20 text-dracula-green border-0",
};

const stageColors: Record<PipelineStage, string> = {
  discovery: "bg-dracula-purple/20 text-dracula-purple border-0",
  design: "bg-dracula-orange/20 text-dracula-orange border-0",
  implementation: "bg-dracula-green/20 text-dracula-green border-0",
  testing: "bg-dracula-yellow/20 text-dracula-yellow border-0",
  review: "bg-dracula-cyan/20 text-dracula-cyan border-0",
  audit: "bg-dracula-comment/20 text-dracula-comment border-0",
};

const categoryColors: Record<JobCategory, string> = {
  strategy: "bg-dracula-comment/20 text-dracula-comment border-0",
  audit: "bg-dracula-comment/20 text-dracula-comment border-0",
  architecture: "bg-dracula-orange/20 text-dracula-orange border-0",
  engineering: "bg-dracula-green/20 text-dracula-green border-0",
  quality: "bg-dracula-cyan/20 text-dracula-cyan border-0",
  security: "bg-dracula-red/20 text-dracula-red border-0",
};

export default function AgentComparisonMatrix(): JSX.Element {
  const [search, setSearch] = useState("");
  const [modelFilter, setModelFilter] = useState<"all" | "Opus" | "Sonnet" | "Haiku">("all");
  const [stageFilter, setStageFilter] = useState<PipelineStage | "all">("all");
  const [categoryFilter, setCategoryFilter] = useState<JobCategory | "all">("all");

  const filtered: AgentEntry[] = AGENTS.filter((a) => {
    const matchSearch =
      search === "" ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.primaryJob.toLowerCase().includes(search.toLowerCase());
    const matchModel = modelFilter === "all" || a.model === modelFilter;
    const matchStage = stageFilter === "all" || a.stage === stageFilter;
    const matchCat = categoryFilter === "all" || a.category === categoryFilter;
    return matchSearch && matchModel && matchStage && matchCat;
  });

  const hasActiveFilter =
    search !== "" ||
    modelFilter !== "all" ||
    stageFilter !== "all" ||
    categoryFilter !== "all";

  function clearFilters(): void {
    setSearch("");
    setModelFilter("all");
    setStageFilter("all");
    setCategoryFilter("all");
  }

  return (
    <div>
      {/* Filter toolbar */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Input
          aria-label="Search agents"
          placeholder="Search agents..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs"
        />

        <div className="flex items-center gap-2">
          <label htmlFor="model-filter" className="sr-only">
            Model
          </label>
          <Select
            value={modelFilter}
            onValueChange={(v) => setModelFilter(v as "all" | "Opus" | "Sonnet" | "Haiku")}
          >
            <SelectTrigger id="model-filter" className="w-36">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All models</SelectItem>
              <SelectItem value="Opus">Opus</SelectItem>
              <SelectItem value="Sonnet">Sonnet</SelectItem>
              <SelectItem value="Haiku">Haiku</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="stage-filter" className="sr-only">
            Stage
          </label>
          <Select
            value={stageFilter}
            onValueChange={(v) => setStageFilter(v as PipelineStage | "all")}
          >
            <SelectTrigger id="stage-filter" className="w-40">
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stages</SelectItem>
              <SelectItem value="discovery">Discovery</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="implementation">Implementation</SelectItem>
              <SelectItem value="testing">Testing</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="audit">Audit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <label htmlFor="category-filter" className="sr-only">
            Category
          </label>
          <Select
            value={categoryFilter}
            onValueChange={(v) => setCategoryFilter(v as JobCategory | "all")}
          >
            <SelectTrigger id="category-filter" className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              <SelectItem value="strategy">Strategy</SelectItem>
              <SelectItem value="architecture">Architecture</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
              <SelectItem value="security">Security</SelectItem>
              <SelectItem value="audit">Audit</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilter && (
          <Button variant="ghost" onClick={clearFilters}>
            Clear filters
          </Button>
        )}
      </div>

      {/* Zero state */}
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="mb-4">No agents match your filters.</p>
          <Button variant="ghost" onClick={clearFilters}>
            Clear filters
          </Button>
        </div>
      )}

      {/* Desktop table */}
      {filtered.length > 0 && (
        <Table className="hidden md:table w-full">
          <caption className="sr-only">specrails agent comparison matrix</caption>
          <TableHeader>
            <TableRow>
              <TableHead>Agent</TableHead>
              <TableHead>Model</TableHead>
              <TableHead>Primary Job</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Docs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((a) => (
              <TableRow key={a.name}>
                <TableCell>
                  <div className="flex items-center">
                    <a.icon className={cn("w-4 h-4 mr-2", a.color)} />
                    <span className="font-medium text-sm">{a.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={modelColors[a.model]}>{a.model}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">{a.primaryJob}</span>
                </TableCell>
                <TableCell>
                  <Badge className={stageColors[a.stage]}>{a.stage}</Badge>
                </TableCell>
                <TableCell>
                  <Badge className={categoryColors[a.category]}>{a.category}</Badge>
                </TableCell>
                <TableCell>
                  <Link
                    to="/docs/agents"
                    className="text-xs text-dracula-purple hover:text-dracula-pink transition-colors"
                  >
                    Learn more →
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}

      {/* Mobile card stack */}
      {filtered.length > 0 && (
        <ul className="md:hidden space-y-3">
          {filtered.map((a) => (
            <li key={a.name} className="glass-card p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <a.icon className={cn("w-4 h-4", a.color)} />
                  <span className="font-semibold text-sm">{a.name}</span>
                </div>
                <Badge className={modelColors[a.model]}>{a.model}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{a.primaryJob}</p>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <Badge className={stageColors[a.stage]}>{a.stage}</Badge>
                <Badge className={categoryColors[a.category]}>{a.category}</Badge>
              </div>
              <Link
                to="/docs/agents"
                className="text-xs text-dracula-purple hover:text-dracula-pink transition-colors"
              >
                Learn more →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
