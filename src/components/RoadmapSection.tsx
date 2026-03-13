import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const items = [
  { label: "Agent Memory Inspector", color: "bg-dracula-purple" },
  { label: "Telemetry & cost tracking", color: "bg-dracula-cyan" },
  { label: "Performance regression detector", color: "bg-dracula-green" },
  { label: "Auto-doc sync", color: "bg-dracula-orange" },
  { label: "Codebase health dashboard", color: "bg-dracula-pink" },
  { label: "VPC Canvas visual editor", color: "bg-dracula-yellow" },
  { label: "Pipeline Monitor Dashboard", color: "bg-dracula-purple" },
];

const RoadmapSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 px-6" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="gradient-text">Roadmap</span>
        </h2>

        {/* Horizontal scrollable timeline */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max px-4">
            {items.map((item, i) => (
              <div
                key={item.label}
                className={`glass-card p-4 min-w-[180px] text-center transition-all duration-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className={`w-3 h-3 rounded-full ${item.color} mx-auto mb-3`} />
                <p className="text-sm font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadmapSection;
