import { Github, BookOpen, Bug } from "lucide-react";

const FooterSection = () => (
  <footer id="footer" className="py-16 px-6 section-darker border-t border-border/10">
    <div className="container mx-auto max-w-4xl text-center">
      <div className="font-mono text-2xl font-bold mb-6">
        <span className="text-dracula-purple">spec</span>
        <span className="text-dracula-pink">rails</span>
      </div>

      <div className="flex justify-center gap-6 mb-8">
        <a href="https://github.com/fjpulidop/specrails" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <Github className="w-4 h-4" /> GitHub
        </a>
        <a href="https://github.com/fjpulidop/specrails" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <BookOpen className="w-4 h-4" /> Documentation
        </a>
        <a href="https://github.com/fjpulidop/specrails/issues" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm">
          <Bug className="w-4 h-4" /> Issues
        </a>
        <span className="text-muted-foreground text-sm">MIT License</span>
      </div>

      <p className="text-muted-foreground text-sm">
        Made with 💜 for the Claude Code community
      </p>
      <p className="text-muted-foreground/50 text-xs mt-2">
        © 2026 specrails
      </p>
    </div>
  </footer>
);

export default FooterSection;
