import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { APP_TITLE, APP_AUTHOR, APP_KEYWORDS } from './src/config/config.js';
import path from 'path';
import { createHtmlPlugin } from 'vite-plugin-html';
import ElementPlusPlugin from 'unplugin-element-plus/vite';

export default defineConfig((command) => {
    // 是不是生产环境（预览环境也不是生产环境）
    const isBuild = Boolean(command.mode === 'production');

    return {
        base: '/zlt9_erp/', // 基础路径
        plugins: [
            vue(),
            ElementPlusPlugin({ useSource: true }), // 按需加载element-plus样式
            // 给index.html 添加全局变量
            createHtmlPlugin({
                minify: true, // 压缩index.html
                inject: { data: { APP_TITLE, APP_AUTHOR, APP_KEYWORDS: APP_KEYWORDS.toString() } }
            })
        ],
        resolve: {
            preserveSymlinks: !isBuild, // 构建生产环境时关闭，测试环境打开
            alias: {
                // 设置别名
                '@': path.resolve(process.cwd(), 'src')
            }
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@use "@/styles/index/index.scss" as *;`
                }
            },
            // 去掉编译【@charset】相关的警告
            postcss: {
                plugins: [
                    {
                        postcssPlugin: 'internal:charset-removal',
                        AtRule: {
                            charset: (atRule) => {
                                if (atRule.name === 'charset') {
                                    atRule.remove();
                                }
                            }
                        }
                    }
                ]
            }
        },
        server: {
            open: true, // 是否自动打开浏览器
            host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"或者true
            strictPort: false, // 设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
            cors: true // 为开发服务器配置 CORS。默认启用并允许任何源
        }
    };
});
