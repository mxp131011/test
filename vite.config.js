import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig((command) => {
    const isBuild = Boolean(command.mode === 'production');
  
    return {
        base: '/zlt9_erp/',
        plugins: [
            vue(),
            createHtmlPlugin({
                minify: true,
                inject: {
                    data: {
                        APP_TITLE: '标题',
                        APP_AUTHOR: '作者',
                        APP_KEYWORDS: 'AAA,BBB',
                    },
                },
            }),
        ],

        server: {
            open: true,
            host: '0.0.0.0',
            strictPort: false,
            cors: true,
        },
    };
});
