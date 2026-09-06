import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";
import { componentTagger } from "lovable-tagger";

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
