import { defineConfig } from "vite";
import { angular } from "@analogjs/vite-plugin-angular"; // Use '@angular-devkit/build-angular/vite' if using official Angular Vite
import path from "path";

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      // Fix pdf.js and worker path resolution
      "pdfjs-dist/build/pdf.worker.js": path.resolve(
        __dirname,
        "node_modules/pdfjs-dist/build/pdf.worker.min.js"
      ),
      "pdfjs-dist/build/pdf.js": path.resolve(
        __dirname,
        "node_modules/pdfjs-dist/build/pdf.min.js"
      ),
    },
  },
});
