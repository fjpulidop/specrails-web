import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import DocsLayout from "./pages/DocsLayout.tsx";
import DocPage from "./pages/DocPage.tsx";
import DocsIndex from "./pages/DocsIndex.tsx";
import AgentsPage from "./pages/AgentsPage.tsx";
import CorePage from "./pages/CorePage.tsx";
import DownloadPage from "./pages/DownloadPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsIndex />} />
            <Route path=":slug" element={<DocPage />} />
          </Route>
          <Route path="/agents" element={<AgentsPage />} />
          <Route path="/core" element={<CorePage />} />
          <Route path="/download" element={<DownloadPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
