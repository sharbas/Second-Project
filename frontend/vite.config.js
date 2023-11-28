import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Checker({ typescript: true })],

  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
});
