import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";

export default defineConfig({
  plugins: [
    tanstackStart(),
    react(),
    tailwindcss(),
    netlify(),

    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Muhammad Abdullah Abbad",
        short_name: "Abdullah",
        description: "Full Stack Web Developer Portfolio",
        theme_color: "#AFCD5F",
        background_color: "#212121",
        display: "standalone",

        icons: [
          {
            src: "/favicon.ico",
            sizes: "192x192",
            type: "image/x-icon",
          },
          {
            src: "/favicon.ico",
            sizes: "512x512",
            type: "image/x-icon",
          },
        ],
      },
    }),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});