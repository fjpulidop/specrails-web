import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Menu, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { DocsSidebar } from '@/components/DocsSidebar';
import { Sheet, SheetContent, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { getDocsCopy } from '@/lib/docs-copy';
import { useI18n } from '@/lib/i18n';
export default function DocsLayout() {
  const [mobileOpen, setMobileOpen] = useState(false); const {languageId} = useI18n(); const copy = getDocsCopy(languageId);
  return <div className="min-h-screen bg-surface-0">
    <Navbar />
    <div className="flex pt-16">
      <aside className="fixed bottom-0 left-0 top-16 hidden w-64 overflow-y-auto border-r border-border/50 bg-surface-1/50 lg:block"><DocsSidebar /></aside>
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-80 max-w-[90vw] overflow-y-auto p-0 pt-12">
          <SheetTitle className="sr-only">{copy.label}</SheetTitle><SheetDescription className="sr-only">{copy.menu}</SheetDescription>
          <DocsSidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
      <main className="min-w-0 flex-1 lg:ml-64">
        <div className="sticky top-16 z-20 flex items-center gap-3 border-b border-border/50 bg-surface-1 px-4 py-2 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setMobileOpen(true)} aria-label={copy.menu}><Menu className="h-5 w-5" /></Button>
          <span className="flex items-center gap-2 text-sm text-muted-foreground"><BookOpen className="h-4 w-4" aria-hidden="true" />{copy.label}</span>
        </div>
        <Outlet />
      </main>
    </div>
  </div>;
}
