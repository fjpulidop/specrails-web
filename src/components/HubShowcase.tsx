import { useRef, useState, useEffect, useCallback } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import {
  LayoutDashboard,
  BarChart3,
  Activity,
  Monitor,
  Info,
} from "lucide-react";

const navButtons = [
  { label: "Dashboard", route: "/", icon: LayoutDashboard },
  { label: "Analytics", route: "/analytics", icon: BarChart3 },
  { label: "Activity", route: "/activity", icon: Activity },
];

const HubShowcase = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [activeNav, setActiveNav] = useState(0);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Load iframe once section becomes visible, but only if the demo build exists.
  // We probe a manifest file that the hub demo build creates — Vite's SPA fallback
  // would return HTML for any path, so we check the content-type instead.
  const [shouldLoadIframe, setShouldLoadIframe] = useState(false);
  useEffect(() => {
    if (!isVisible) return;
    fetch("/hub-demo/manifest.json", { method: "GET" })
      .then((res) => {
        const ct = res.headers.get("content-type") ?? "";
        if (res.ok && ct.includes("application/json")) setShouldLoadIframe(true);
        else setIframeError(true);
      })
      .catch(() => setIframeError(true));
  }, [isVisible]);

  const navigateIframe = useCallback((index: number) => {
    setActiveNav(index);
    const iframe = iframeRef.current;
    if (iframe?.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "navigate", route: navButtons[index].route },
        "*"
      );
    }
  }, []);

  return (
    <section id="hub-showcase" className="py-24 px-6 section-darker" ref={ref}>
      <div className="container mx-auto max-w-5xl">
        {/* Heading */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dracula-purple/30 bg-dracula-purple/5 text-xs font-mono text-dracula-purple mb-4">
            <LayoutDashboard className="w-3 h-3" />
            Powered by specrails-hub
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">The Control Center</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            See your AI pipeline in action — real specrails-hub interface with
            live data visualization
          </p>
        </div>

        {/* Desktop: iframe with toolbar */}
        <div
          className={`hidden lg:block transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Toolbar */}
          <div className="flex items-center justify-center gap-2 mb-4">
            {navButtons.map((btn, i) => (
              <button
                key={btn.label}
                onClick={() => navigateIframe(i)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeNav === i
                    ? "bg-dracula-purple/20 text-dracula-purple border border-dracula-purple/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                }`}
              >
                <btn.icon className="w-4 h-4" />
                {btn.label}
              </button>
            ))}
          </div>

          {/* Browser chrome wrapper */}
          <div className="rounded-xl border border-border/30 overflow-hidden shadow-2xl shadow-dracula-purple/10 max-w-[1200px] mx-auto">
            {/* Fake browser bar */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-dracula-current border-b border-border/20">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-dracula-red/60" />
                <div className="w-3 h-3 rounded-full bg-dracula-yellow/60" />
                <div className="w-3 h-3 rounded-full bg-dracula-green/60" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-4 py-1 rounded-md bg-background/50 text-xs font-mono text-muted-foreground">
                  localhost:4200
                </div>
              </div>
            </div>

            {/* Iframe container with 16:10 aspect ratio */}
            <div className="relative" style={{ aspectRatio: "16/10" }}>
              {iframeError && (
                <div className="absolute inset-0 bg-dracula-bg flex items-center justify-center">
                  <div className="text-center max-w-md">
                    <LayoutDashboard className="w-16 h-16 text-dracula-purple/20 mx-auto mb-4" />
                    <p className="text-lg font-semibold text-foreground/80 mb-2">
                      Interactive demo coming soon
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      The live specrails-hub demo is being prepared. In the
                      meantime, install it locally to try the full experience.
                    </p>
                    <a
                      href="/docs/hub-installation"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dracula-purple/10 border border-dracula-purple/30 text-dracula-purple text-sm font-medium hover:bg-dracula-purple/20 transition-colors"
                    >
                      Install specrails-hub
                    </a>
                  </div>
                </div>
              )}
              {!iframeError && !iframeLoaded && shouldLoadIframe && (
                <div className="absolute inset-0 bg-dracula-bg flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-dracula-purple border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {!iframeError && !shouldLoadIframe && (
                <div className="absolute inset-0 bg-dracula-bg flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-dracula-purple border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {!iframeError && shouldLoadIframe && (
                <iframe
                  ref={iframeRef}
                  src="/hub-demo/index.html"
                  title="specrails-hub demo"
                  className="absolute inset-0 w-full h-full border-0"
                  onLoad={() => setIframeLoaded(true)}
                  sandbox="allow-scripts allow-same-origin"
                />
              )}
            </div>
          </div>
        </div>

        {/* Mobile: desktop-only notice */}
        <div
          className={`lg:hidden transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="rounded-xl border border-border/30 bg-dracula-current/40 p-10 flex flex-col items-center text-center gap-4">
            <Monitor className="w-12 h-12 text-dracula-purple/40" />
            <p className="text-base font-semibold text-foreground/80">
              Demo best viewed on Desktop
            </p>
            <p className="text-sm text-muted-foreground max-w-xs">
              The interactive specrails-hub demo requires a wider screen. Open
              this page on a laptop or desktop to explore it.
            </p>
            <a
              href="/docs/hub-installation"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-dracula-purple/10 border border-dracula-purple/30 text-dracula-purple text-sm font-medium hover:bg-dracula-purple/20 transition-colors"
            >
              Install specrails-hub locally
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-muted-foreground mt-6 max-w-xl mx-auto">
          <Info className="w-3 h-3 inline-block mr-1 -mt-0.5" />
          This is a simplified recreation with sample data. The full specrails-hub
          offers many more features.{" "}
          <a
            href="/docs/hub-features"
            className="text-dracula-purple hover:underline"
          >
            Explore all hub features
          </a>
        </p>
      </div>
    </section>
  );
};

export default HubShowcase;
