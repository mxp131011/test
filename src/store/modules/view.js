import { defineStore } from 'pinia';
import { sideBarWidthShow, sideBarWidthHide, tabsViewHeight, headerHeight } from '@/styles/export.js';
import { verifySmallScreen } from '@/utils/common-verify.js';
import { SidebarCollapseStorage } from '@/utils/storage/myLocalStorage.js';
import screenfull from 'screenfull';
import { toast } from '@/utils/common-element-plus.js';
const collapseStatusObj = new SidebarCollapseStorage();

/**
 * 注册view相关的store
 */
export const useViewStore = defineStore('view', {
    state: () => ({
        sidebarCollapse: verifySmallScreen() ? false : [null, true].includes(collapseStatusObj.get()), // 是否关闭侧边栏
        height: document.documentElement.clientHeight, // 整个可视区的高度
        width: document.documentElement.clientWidth, // 整个可视区的宽度
        isMobile: verifySmallScreen(), // 是否为手机
        pageFullScreenState: false, // app全屏
        appFullScreenState: false // 页面全屏
    }),
    getters: {
        //  header高度
        headerHeight: (state) => (state.pageFullScreenState ? tabsViewHeight : headerHeight),
        // 主视图模块宽度
        mainWidth: (state) => state.width - (state.pageFullScreenState ? 0 : state.sidebarCollapse ? sideBarWidthShow : sideBarWidthHide),
        // 主视图模块高度
        mainHeight: (state) => state.height - (state.pageFullScreenState ? tabsViewHeight : headerHeight)
    },
    actions: {
        /**
         * 关闭或开启侧边栏
         */
        toggleSideBar() {
            this.sidebarCollapse = !this.sidebarCollapse;
            collapseStatusObj.set(this.sidebarCollapse);
        },

        /**
         * 强制关闭侧边栏
         */
        closeSideBar() {
            this.sidebarCollapse = false;
            collapseStatusObj.set(false);
        },

        /**
         * 窗口大小改变
         */
        toggleResize() {
            this.width = document.documentElement.clientWidth;
            this.height = document.documentElement.clientHeight;
            this.isMobile = verifySmallScreen();
            const sidebarCollapse = collapseStatusObj.get();
            this.sidebarCollapse = this.isMobile ? false : [null, true].includes(sidebarCollapse);
        },

        /**
         * 设置页面全屏状态
         */
        setAppFullScreen() {
            if (screenfull.isEnabled) {
                const appFull = this.appFullScreenState;
                if (appFull) {
                    screenfull.exit();
                    this.appFullScreenState = false;
                } else {
                    screenfull.request();
                    this.appFullScreenState = true;
                }
            } else {
                toast.error('暂不支持全屏');
            }
        },

        /**
         * 设置页面全屏状态
         */
        setPageFullScreen() {
            if (screenfull.isEnabled) {
                const appFull = this.appFullScreenState;
                const pageFull = this.pageFullScreenState;
                const isFull = screenfull.isFullscreen;
                if (appFull && !pageFull && isFull) {
                    // 本身在全屏状态，只用设置一下pageFullScreenState
                    this.pageFullScreenState = true;
                } else if (appFull && pageFull && isFull) {
                    this.pageFullScreenState = false;
                } else if (pageFull) {
                    screenfull.exit();
                    this.pageFullScreenState = false;
                } else if (!pageFull) {
                    screenfull.request();
                    this.pageFullScreenState = true;
                }
            } else {
                toast.error('暂不支持全屏');
            }
        }
    }
});
