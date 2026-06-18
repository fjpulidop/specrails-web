import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";

// Index stays eager (the landing). Everything else is route-split so the docs
// markdown/highlight stack and subpage code stay off the initial bundle.
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
const DocsLayout = lazy(() => import("./pages/DocsLayout.tsx"));
const DocPage = lazy(() => import("./pages/DocPage.tsx"));
const DocsIndex = lazy(() => import("./pages/DocsIndex.tsx"));
const AgentsPage = lazy(() => import("./pages/AgentsPage.tsx"));
const CorePage = lazy(() => import("./pages/CorePage.tsx"));
const DesktopPage = lazy(() => import("./pages/DesktopPage.tsx"));
const DownloadPage = lazy(() => import("./pages/DownloadPage.tsx"));

const queryClient = new QueryClient();

const App = () => (
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
            <Route path="/agents" element={<AgentsPage />} />
            <Route path="/core" element={<CorePage />} />
            <Route path="/desktop" element={<DesktopPage />} />
            <Route path="/download" element={<DownloadPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
