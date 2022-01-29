import { defineStore } from 'pinia';

/**
 * 注册router相关的store
 */
export const useRouterStore = defineStore('router', {
    state: () => ({
        tabViews: [], // 显示的路由 【会持久化保存】
        // 路由白名单 （不重定向，不在菜单和导航栏显示） 【建议在errorPageList的每页item加上meta.noCache=true】
        whiteListRoutes: ['login', 'err403', 'err404'].map((item) => item.toLowerCase())
    }),
    getters: {
        cachedRouteName: (state) => state.tabViews.filter((view) => Boolean(!view.meta || !view.meta.noCache)).map((item) => item.name)
    },
    actions: {
        /**
         * 通过view删除tabs
         */
        delTabsByView(view) {
            const index = this.tabViews.findIndex((item) => item.path === view.path);
            index >= 0 && this.tabViews.splice(index, 1);
        },

        /**
         * 添加单个标签
         */
        addSingleTabs(view) {
            return new Promise((resolve) => {
                if (!this.whiteListRoutes.includes(view.path.toLowerCase())) {
                    const index = this.tabViews.findIndex((v) => v.path.toUpperCase() === view.path.toUpperCase());
                    const page = { fullPath: view.fullPath, path: view.path, name: view.name, meta: view.meta };
                    if (index >= 0) {
                        this.tabViews.splice(index, 1, page);
                    } else {
                        this.tabViews.push(page);
                    }
                }
                resolve(this.tabViews);
            });
        },

        /**
         * 删除单个标签
         */
        delSingleTabs(view) {
            return new Promise((resolve) => {
                this.delTabsByView(view);
                resolve(this.tabViews);
            });
        },

        /**
         * 删除其他标签
         */
        delOthersTabs(view) {
            return new Promise((resolve) => {
                this.tabViews = this.tabViews.filter((v) => v.meta.affix || v.path === view.path);
                resolve(this.tabViews);
            });
        },

        /**
         * 删除所有标签
         */
        delAllTabs() {
            return new Promise((resolve) => {
                this.tabViews = this.tabViews.filter((tag) => Boolean(tag.meta.affix));
                resolve(this.tabViews);
            });
        },

        /**
         * 删除左边标签
         */
        delLeftTabs(view) {
            return new Promise((resolve) => {
                const index = this.tabViews.findIndex((item) => item.path === view.path);
                if (index >= 0) {
                    const tabs = this.tabViews.slice(0, index);
                    tabs.forEach((tab) => {
                        !tab.meta.affix && this.delTabsByView(tab);
                    });
                }
                resolve(this.tabViews);
            });
        },

        /**
         * 删除右边标签
         */
        delRightTabs(view) {
            return new Promise((resolve) => {
                const index = this.tabViews.findIndex((item) => item.path === view.path);
                if (index >= 0) {
                    const tabs = this.tabViews.slice(index + 1);
                    tabs.forEach((tab) => {
                        !tab.meta.affix && this.delTabsByView(tab);
                    });
                }
                resolve(this.tabViews);
            });
        }
    },
    // 持久化储存 依赖 pinia-plugin-persistedstate 插件
    persist: {
        key: 'my_pinia_router',
        storage: window.sessionStorage,
        paths: ['tabViews']
    }
});
