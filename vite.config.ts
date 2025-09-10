import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
        insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'), // File đầu vào của thư viện
      name: 'MyShoppingCartLib', // Tên global variable (khi dùng qua script tag)
      fileName: (format) => `my-shopping-cart-lib.${format}.js`,
    },
    rollupOptions: {
      // Đảm bảo không đóng gói React và React-DOM vào thư viện
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});