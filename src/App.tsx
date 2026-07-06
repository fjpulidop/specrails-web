import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/lib/i18n";
import Index from "./pages/Index.tsx";

// Index stays eager (the landing). Everything else is route-split so the docs
// markdown/highlight stack and subpage code stay off the initial bundle.
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const DocsLayout = lazy(() => import("./pages/DocsLayout.tsx"));
const DocPage = lazy(() => import("./pages/DocPage.tsx"));
const DocsIndex = lazy(() => import("./pages/DocsIndex.tsx"));
const DownloadPage = lazy(() => import("./pages/DownloadPage.tsx"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage.tsx"));

const queryClient = new QueryClient();

const App = () => (
  <I18nProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<div className="min-h-screen bg-background" aria-hidden="true" />}>
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
              <Route path="/privacy" element={<PrivacyPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </I18nProvider>
);

export default App;
