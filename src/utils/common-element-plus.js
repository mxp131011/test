import { ElMessage, ElLoading } from 'element-plus';

/**
 * toast弹出框
 */
export const toast = {
    _show: (message, type, duration) => ElMessage({ showClose: true, grouping: true, message, type, duration }),
    show: (obj) => ElMessage(obj),
    info: (message, duration) => toast._show(message, 'info', duration),
    success: (message, duration) => toast._show(message, 'success', duration),
    warning: (message, duration) => toast._show(message, 'warning', duration),
    error: (message, duration) => toast._show(message, 'error', duration)
};

/**
 * 全屏加载动画
 */
export const fullLoading = {
    loadingInstance: '',
    show(text, options = {}) {
        this.loadingInstance = ElLoading.service({
            background: 'rgba(255,255,255,0.6)',
            lock: true,
            fullscreen: true,
            ...options,
            text
        });
    },
    hide() {
        this.loadingInstance && this.loadingInstance.close();
    }
};
