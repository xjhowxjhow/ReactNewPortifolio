import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite's SPA fallback would answer /admin with the portfolio; point it at the CMS page instead.
const adminRoute = () => {
  const rewrite = (req, res, next) => {
    if (/^\/admin(\?.*)?$/.test(req.url)) {
      res.writeHead(301, { Location: '/admin/' });
      res.end();
      return;
    }
    if (/^\/admin\/(\?.*)?$/.test(req.url)) req.url = '/admin/index.html';
    next();
  };
  return {
    name: 'admin-route',
    configureServer(server) {
      server.middlewares.use(rewrite);
    },
    configurePreviewServer(server) {
      server.middlewares.use(rewrite);
    },
  };
};

export default defineConfig({
  plugins: [adminRoute(), react()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    chunkSizeWarningLimit: 700,
  },
});
