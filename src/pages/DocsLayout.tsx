import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu, PanelLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import { DocsSidebar } from "@/components/DocsSidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import SectionNav from "@/components/SectionNav";
import { useI18n } from "@/lib/i18n";

export default function DocsLayout(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { content } = useI18n();

  return (
    <div className="min-h-screen bg-surface-0">
      <Navbar />
      <div className="flex pt-16">
        {/* Desktop sidebar (page navigation) */}
        <aside className="fixed bottom-0 left-0 top-16 hidden w-60 shrink-0 overflow-y-auto border-r border-border/40 bg-surface-1/40 md:flex md:flex-col">
          <DocsSidebar />
        </aside>

        {/* Mobile sidebar via Sheet */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent side="left" className="w-72 p-0 pt-16">
            <DocsSidebar onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main content */}
        <main className="min-w-0 flex-1 md:ml-60">
          {/* Mobile top bar — opens the page-nav drawer */}
          <div className="flex items-center gap-3 border-b border-border/40 bg-surface-1/40 px-6 py-3 md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Open documentation menu"
              className="-ml-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <span className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
              <PanelLeft className="h-4 w-4" aria-hidden="true" />
              {content.nav.docs}
            </span>
          </div>
          <Outlet />
        </main>
      </div>
      {/* Floating section jumper — superseded by the right-rail TOC on xl. */}
      <div className="xl:hidden">
        <SectionNav autoDetect=".docs-prose h2[id]" scrollThreshold={50} />
      </div>
    </div>
  );
}
