import LocalStorage from 'super-localstorage';
import { useUserStore } from '@/store/modules/user.js';

/**
 * 得到layout侧边栏的折叠(收起)状态
 *
 */
export class SidebarCollapseStorage {
    constructor() {
        this.key = 'SIDEBAR_COLLAPSE_STATUS';
        this.storage = new LocalStorage();
    }

    // true——代表收起； false——代表不收起； null——代表没有储存过
    get() {
        return this.storage.get(this.key);
    }

    // true——代表收起； false——代表不收起
    set(status) {
        this.storage.set(this.key, Boolean(status));
    }
}

/**
 * 得到layout侧边栏的折叠(收起)状态
 *
 */
export class Precision {
    constructor() {
        this.key = 'GLOBAL_PRECISION';
        this.storage = new LocalStorage();
    }

    get() {
        return (
            this.storage.get(this.key) || {
                sl: 2, // 数量
                dj: 2, // 单价
                zje: 2 // 总金额
            }
        );
    }

    set(data) {
        this.storage.set(this.key, {
            sl: !data.sl || isNaN(data.sl) ? 2 : parseInt(data.sl), // 数量
            dj: !data.dj || isNaN(data.dj) ? 2 : parseInt(data.dj), // 单价
            zje: !data.zje || isNaN(data.zje) ? 2 : parseInt(data.zje) // 总金额
        });
    }
}

/**
 * 得到报表筛选数据
 *
 */
export class TableFilter {
    constructor() {
        this.prefix_key = 'TABLE_FILTRATEXS_ALL_';
        this.storage = new LocalStorage();
        const userStore = useUserStore();
        this.uid = userStore.uid || '';
    }

    get(id) {
        if (id) {
            const storageData = this.storage.get(this.prefix_key + id);
            if (storageData && this.uid === storageData.uid) {
                return storageData.data;
            }
        }
        return false;
    }

    set(data, id) {
        if (Array.isArray(data) && id && this.uid) {
            const overdueDate = new Date().getTime() + 1000 * 60 * 60 * 24 * 3;
            this.storage.set(this.prefix_key + id, { uid: this.uid, data }, overdueDate);
        } else {
            console.log('TableFilter存储错误');
        }
    }
}
