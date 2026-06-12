import { Github, BookOpen, Bug } from "lucide-react";

const FooterSection = () => (
  <footer id="footer" className="py-16 px-6 section-darker border-t border-border/10">
    <div className="container mx-auto max-w-4xl">
      <div className="font-mono text-2xl font-bold text-center mb-8">
        <span className="text-dracula-purple">spec</span>
        <span className="text-dracula-pink">rails</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-8 mb-8 max-w-2xl mx-auto">
        {/* Core links */}
        <div className="text-center sm:text-left">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-dracula-cyan mb-3">
            Core
          </h4>
          <div className="flex flex-col gap-2">
            <a href="https://github.com/fjpulidop/specrails-core" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm justify-center sm:justify-start">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm justify-center sm:justify-start">
              <BookOpen className="w-4 h-4" /> Documentation
            </a>
            <a href="https://github.com/fjpulidop/specrails-core/issues" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm justify-center sm:justify-start">
              <Bug className="w-4 h-4" /> Issues
            </a>
          </div>
        </div>

        {/* Hub links */}
        <div className="text-center sm:text-left">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-dracula-purple mb-3">
            Hub
          </h4>
          <div className="flex flex-col gap-2">
            <a href="https://github.com/fjpulidop/specrails-desktop" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm justify-center sm:justify-start">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href="/docs/hub-features" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm justify-center sm:justify-start">
              <BookOpen className="w-4 h-4" /> Documentation
            </a>
            <a href="/docs/hub-installation" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm justify-center sm:justify-start">
              <Bug className="w-4 h-4" /> Installation
            </a>
          </div>
        </div>
      </div>

      <div className="text-center">
        <span className="text-muted-foreground text-sm">MIT License</span>
        <p className="text-muted-foreground/50 text-xs mt-2">
          © 2026 specrails
        </p>
      </div>
    </div>
  </footer>
);

export default FooterSection;
