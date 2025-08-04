import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), svgr()],
	server: {
		//open: true,
		port: 5173,
		proxy: {
			//origin: 'http://localhost:3001',
			'/register': 'http://localhost:3001',
			'/posts': 'http://localhost:3001',
			'/logout': 'http://localhost:3001',
			'/login': 'http://localhost:3001',
			'/users': 'http://localhost:3001',
			// '/api': {
			// 	target: 'http://localhost:3001',
			// 	changeOrigin: true,
			// 	secure: false,
			// 	rewrite: (path) => path.replace(/^\/api/, ''),
			// },
		},
	},
});
