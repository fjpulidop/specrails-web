import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

// Vite's SPA fallback otherwise serves the marketing shell for this directory.
function companionEntryPlugin(): Plugin {
  const configure: NonNullable<Plugin["configureServer"]> = (server) => {
    server.middlewares.use((req, _res, next) => {
      if (req.url && /^\/companion-app\/?(?:\?|$)/.test(req.url)) {
        req.url = req.url.replace(/^\/companion-app\/?/, "/companion-app/index.html");
      }
      next();
    });
  };
  return {
    name: "companion-entry",
    configureServer: configure,
    configurePreviewServer: configure,
  };
}

// Copy index.html → 404.html so hosting providers (Hostinger/LiteSpeed)
// serve the SPA shell instead of a generic 404 page.
function copy404Plugin(): Plugin {
  return {
    name: "copy-404",
    closeBundle() {
      const dist = path.resolve(__dirname, "dist");
      const src = path.join(dist, "index.html");
      const dest = path.join(dist, "404.html");
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
      }
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  cacheDir: ".cache/vite",
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  optimizeDeps: {
    include: [
      "react-markdown",
      "remark-gfm",
      "rehype-highlight",
      "rehype-slug",
    ],
  },
  plugins: [
    companionEntryPlugin(),
    react(),
    mode === "development" && componentTagger(),
    copy404Plugin(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
