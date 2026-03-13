import { AlertTriangle, GitMerge, ShieldOff } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const problems = [
  {
    icon: AlertTriangle,
    title: "No product direction",
    desc: "AI generates code without understanding user value",
  },
  {
    icon: GitMerge,
    title: "No coordination",
    desc: "Overlapping tasks, merge conflicts, duplicated work",
  },
  {
    icon: ShieldOff,
    title: "No guaranteed quality",
    desc: "No automated tests, no security review, no standards",
  },
];

const ProblemSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="problem" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Claude Code is powerful.{" "}
          <span className="text-dracula-comment">But without structure, it's chaos.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {problems.map((p, i) => (
            <div
              key={p.title}
              className={`glass-card p-6 text-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-dracula-current flex items-center justify-center mx-auto mb-4">
                <p.icon className="w-6 h-6 text-dracula-red" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
              <p className="text-muted-foreground text-sm">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
