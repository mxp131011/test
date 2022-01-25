import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router/router.js';
import { ElConfigProvider } from 'element-plus';
import 'element-plus/es/components/message/style/css'; // 手动引入ElMessage的样式

const app = createApp(App);

app.use(router); // 注册路由
app.component('el-config-provider', ElConfigProvider); // 注册组件
app.mount('#app');
