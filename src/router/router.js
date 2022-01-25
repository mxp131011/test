import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
// 得到创建的路由
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            redirect: '/err403', // 重定向
            children: [
                {
                    path: '/err403',
                    name: 'err403',
                    component: () => import('@/views/err403.vue'),
                    meta: { title: '无权访问', noCache: true },
                    hidden: true
                },
                {
                    path: '/err404',
                    name: 'err404',
                    meta: { title: '404', noCache: true },
                    component: () => import('@/views/err404.vue'),
                    hidden: true
                }
            ]
        }
    ]
});
