import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider, useI18n } from "@/lib/i18n";
import Index from "./pages/Index.tsx";

// Index stays eager (the landing). Everything else is route-split so the docs
// markdown/highlight stack and subpage code stay off the initial bundle.
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const DocsLayout = lazy(() => import("./pages/DocsLayout.tsx"));
const DocPage = lazy(() => import("./pages/DocPage.tsx"));
const DocsIndex = lazy(() => import("./pages/DocsIndex.tsx"));
const DownloadPage = lazy(() => import("./pages/DownloadPage.tsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.tsx"));
const CompanionPage = lazy(() => import("./pages/CompanionPage.tsx"));

function RouteLoading() {
  const { languageId } = useI18n();
  const label = {
    en: "Loading…", es: "Cargando…", fr: "Chargement…", de: "Wird geladen…",
    pt: "A carregar…", it: "Caricamento…", zh: "正在加载…", ja: "読み込み中…",
  }[languageId];
  return <div role="status" className="grid min-h-screen place-content-center gap-3 bg-background text-center"><span className="font-mono text-sm text-brand-cyan">specrails</span><span className="text-sm text-muted-foreground">{label}</span></div>;
}

const App = () => (
  <I18nProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/docs" element={<DocsLayout />}>
              <Route index element={<DocsIndex />} />
              <Route path=":slug" element={<DocPage />} />
            </Route>
            <Route path="/agents" element={<Navigate to="/" replace />} />
            <Route path="/core" element={<Navigate to="/" replace />} />
            <Route path="/desktop" element={<Navigate to="/" replace />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/companion" element={<CompanionPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </I18nProvider>
);

export default App;
