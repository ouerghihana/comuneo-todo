import { defineConfig } from "vitest/config";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsconfigPaths(),
  ],
  test: {
    environment: "happy-dom",
    globals: true,
    setupFiles: "./test/setup.ts",
  },
});
