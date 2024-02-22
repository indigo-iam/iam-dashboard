import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/iam-dashboard",
  server: {
    port: 3000,
    host: true,
    watch: {
      usePolling: true,
    },
    hmr: {
      path: "/ws",
      clientPort: 8080, // this MUST match the NGINX's listening port
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@services": path.resolve(__dirname, "src/services"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
});
