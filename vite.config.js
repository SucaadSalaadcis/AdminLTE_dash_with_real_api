import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'https://spiky-crater-dep2vxlep8.ploi.online',
  //       changeOrigin: true,
  //       secure: false,  // If you're using self-signed certificates
  //       rewrite: (path) => path.replace(/^\/api/, '')
  //     }
  //   }
  // }
})

