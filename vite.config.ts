import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    'ng2-pdf-viewer': ['ng2-pdf-viewer']
                }
            }
        }
    },
    optimizeDeps: {
        include: ['ng2-pdf-viewer']
    }
}); 