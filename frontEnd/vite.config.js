import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import daisyui from 'daisyui';
// import { VitePWA } from 'vite-plugin-pwa'; // Example of another potential plugin

// https://vite.dev/config/
export default defineConfig(({ command, mode, ssrBuild, isSsr, isPreview }) => {
  return {
    plugins: [
       tailwindcss(),
      // daisyui(),
      react(),
      // VitePWA({
      //   registerType: 'autoUpdate',
      //   injectRegister: 'auto',
      //   workbox: {
      //     globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      //   },
      //   manifest: {
      //     name: 'Your Awesome App',
      //     short_name: 'Awesome App',
      //     description: 'A fantastic web application built with Vite and React.',
      //     theme_color: '#ffffff',
      //     icons: [
      //       {
      //         src: 'pwa-192x192.png',
      //         sizes: '192x192',
      //         type: 'image/png',
      //       },
      //       {
      //         src: 'pwa-512x512.png',
      //         sizes: '512x512',
      //         type: 'image/png',
      //         purpose: 'any maskable',
      //       },
      //     ],
      //   },
      // }),
      // You can uncomment the VitePWA plugin configuration above if you want to add PWA support.
      // Make sure to install the plugin first: npm install -D vite-plugin-pwa
    ],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:5000',
          changeOrigin: true,
          // You can add more proxy options here if needed, e.g.,
          // rewrite: (path) => path.replace(/^\/api/, ''),
          // secure: false, // Only set to false if your backend doesn't have a valid SSL certificate in development
        },
      },
    },
    // build: {
    //   outDir: 'dist', // Customize the output directory if needed
    //   minify: 'terser', // Enable minification for production builds (terser is default)
    //   sourcemap: true, // Generate sourcemaps for easier debugging in production
    //   rollupOptions: {
    //     // Customize Rollup options if you have specific bundling requirements
    //   },
    // },
    // optimizeDeps: {
    //   // You can include or exclude dependencies from optimization if needed
    // },
  };
});