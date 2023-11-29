import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Checker()],

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://www.wetravels.online",
        changeOrigin: true,
      },
    },
  },
});
