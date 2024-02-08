import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/iam-dashboard",
  server: {
    port: 3000,
    host: true,
    hmr: {
      path: "/ws",
      clientPort: 8080, // this MUST match the NGINX's listening port
    },
  },
});
