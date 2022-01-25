import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import ElementPlusPlugin from 'unplugin-element-plus/vite';

export default defineConfig(() => {
    return {
        base: '/zlt9_erp/', // 基础路径
        plugins: [
            vue(),
            ElementPlusPlugin() // 按需加载element-plus样式
        ],
        resolve: {
            alias: {
                // 设置别名
                '@': path.resolve(process.cwd(), 'src')
            }
        },
        build: {
            cssCodeSplit: true, // 启用/禁用 CSS 代码拆分。当启用时，在异步 chunk 中导入的 CSS 将内联到异步 chunk 本身，并在其被加载时插入。 如果禁用，整个项目中的所有 CSS 将被提取到一个 CSS 文件中。
            sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
            target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
            chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
            assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
            minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大(大1%——2%)。
            brotliSize: true, // 启用/禁用 brotli 压缩大小报告。

            terserOptions: {
                compress: {
                    drop_console: true, // 注释console
                    drop_debugger: true, // 删除debugger,
                    pure_funcs: ['console.log', 'console.warn'] // 删除console.log和console.warn
                }
            },
            rollupOptions: {
                output: {
                    // 拆分代码
                    manualChunks: {
                        'vue': ['vue', 'vue-router'],
                        'element-plus': ['element-plus']
                    }
                }
            }
        }
    };
});
