import $axios from '@/utils/axios/axios.js';
import { useAppStore } from './app.js';
import { defineStore } from 'pinia';

/**
 * 注册user相关的store
 */
export const useUserStore = defineStore('user', {
    state: () => ({
        nickname: '',
        cid: '',
        uid: '',
        token: '',
        role: []
    }),
    getters: {
        loginStatus: (state) => Boolean(state.cid && state.uid)
    },
    actions: {
        // 登录
        async login(userInfo) {
            const { cid, uid, passd } = userInfo;
            const appStore = useAppStore();
            const data = { gsbm: cid, C_name: uid, c_pass: passd, ckq: appStore.globalCKQ, c_url: appStore.currBaseUrl };
            try {
                const response = await $axios.post('login_yz.do', data, { showErrorMessage: true });
                this.nickname = 'nickname' in response && response.nickname ? response.nickname : cid;
                this.cid = cid;
                this.uid = 'user' in response && response.user ? response.user : cid;
                this.token = 'Token' in response && response.Token ? response.Token : '';
                this.role = response.role || [];
                return Promise.resolve(true);
            } catch (error) {
                return Promise.reject(error);
            }
        },
        logout() {
            this.nickname = '';
            this.cid = '';
            this.uid = '';
            this.token = '';
            this.role = [];
        }
    },
    // 持久化储存 依赖 pinia-plugin-persistedstate 插件
    persist: {
        key: 'my_pinia_user',
        storage: window.sessionStorage
    }
});
