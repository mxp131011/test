import { defineStore } from 'pinia';
import { formatDateStr } from '@/utils/common-time.js';

/**
 * 注册app相关的store
 */
export const useAppStore = defineStore('app', {
    state: () => ({
        currBaseUrl: window.GLOBAL_AXIOS_DEFAULT_BASE_URL(), // 在/public/js/baseUrlConfig.js中设置（因为这个是基础配置，要求不能被打包）
        globalCKQ: 1, // 全局权限 （查看或操作） 1代表操作， 0代表查看
        /* 下面的会持久化保存 */
        goodsFilterMenu: [], // 商品筛选数据 【会持久化保存】
        tableDefaultStartDate: formatDateStr(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 报表默认时间
        tableDefaultEndDate: formatDateStr(new Date()) // 报表默认时间
    }),
    actions: {
        /*  设置全局权限 （查看或操作） 1代表操作， 0代表查看 */
        setGlobalCKQ(globalCKQ) {
            this.globalCKQ = globalCKQ;
        },

        /*  设置商品筛选数据 */
        setGoodsFiltrateMenuList(data) {
            const menuList = data && Array.isArray(data) ? data : [];
            if (data && data.length > 0) {
                menuList.forEach((item) => {
                    if (item.key === 'ckbm' && item.active === '' && item.list.length > 0) {
                        item.active = item.list[0].c_bm;
                        item.active_name = item.list[0].c_mc;
                    }
                    const arr = [];
                    item.list.forEach((i) => {
                        arr.push({ label: i.c_mc, value: i.active });
                    });
                    item.list = arr;
                });
                this.goodsFilterMenu = JSON.parse(JSON.stringify(menuList));
            }
        },

        /**
         * 设置表格筛选的默认时间
         * @param {Array || String} data 日期信息 字符串或者数组 如:['2021-11-01','2021-12-01'] 或者 '2021-11-01'
         * @param {String} type 设置开始时间还是结束时间 （data为字符串时有效）有效值为： 'start'或者'end'
         */
        setTableDefaultDate(data, type = 'start') {
            if (Array.isArray(data)) {
                if (data[0] && typeof data[0] === 'string' && data[0].length === 10) {
                    this.tableDefaultStartDate = data[0];
                }
                if (data[1] && typeof data[1] === 'string' && data[1].length === 10) {
                    this.tableDefaultEndDate = data[1];
                }
            } else if (typeof data === 'string' && data.length === 10) {
                if (type === 'start') {
                    this.tableDefaultStartDate = data;
                } else {
                    this.tableDefaultEndDate = data;
                }
            }
        }
    },

    // 持久化储存 依赖 pinia-plugin-persistedstate 插件
    persist: {
        key: 'my_pinia_app',
        storage: window.sessionStorage,
        paths: ['goodsFilterMenu', 'tableDefaultStartDate', 'tableDefaultEndDate']
    }
});
