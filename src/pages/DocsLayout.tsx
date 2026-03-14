import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import SectionNav from "@/components/SectionNav";

export default function DocsLayout(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-16">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col w-60 shrink-0 fixed top-16 bottom-0 left-0 border-r border-border/20 bg-background overflow-y-auto">
          <DocsSidebar />
        </aside>

        {/* Mobile sidebar via Sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-60 p-0 pt-16">
            <DocsSidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="flex-1 md:ml-60 min-w-0">
          <div className="md:hidden flex items-center gap-3 px-6 py-4 border-b border-border/20">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <span className="text-sm text-muted-foreground font-mono">Docs</span>
          </div>
          <Outlet />
        </main>
      </div>
      <SectionNav autoDetect=".docs-prose h2[id]" scrollThreshold={50} />
    </div>
  );
}
