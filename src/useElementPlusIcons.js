/* eslint-disable vue/component-definition-name-casing */
import {
    OfficeBuilding as IconOfficeBuilding,
    User as IconUser,
    Lock as IconLock,
    CircleCheck as IconCircleCheck,
    Check as IconCheck,
    Loading as IconLoading,
    ArrowLeft as IconArrowLeft,
    ArrowRight as IconArrowRight,
    ArrowUp as IconArrowUp,
    ArrowUpBold as IconArrowUpBold,
    ArrowDown as IconArrowDown,
    RefreshRight as IconRefreshRight,
    Search as IconSearch,
    ZoomIn as IconZoomIn,
    CirclePlus as IconCirclePlus,
    Delete as IconDelete,
    CaretBottom as IconCaretBottom,
    CircleClose as IconCircleClose,
    Back as IconBack,
    Right as IconRight,
    Remove as IconRemove,
    Connection as IconConnection,
    Download as IconDownload,
    Operation as IconOperation,
    Printer as IconPrinter,
    Upload as IconUpload
} from '@element-plus/icons-vue';

/**
 *  全局注册 element-plus 图标
 *
 */
export function useElementPlusIcons(app) {
    app.component('IconOfficeBuilding', IconOfficeBuilding); // 企业
    app.component('IconUser', IconUser); //  用户
    app.component('IconLock', IconLock); //  锁
    app.component('IconCheck', IconCheck); // 勾 【√】
    app.component('IconCircleCheck', IconCircleCheck); //  带圆圈的勾
    app.component('IconCircleClose', IconCircleClose); //  带圆圈的叉
    app.component('IconCirclePlus', IconCirclePlus); // 带圆圈的加号
    app.component('IconArrowLeft', IconArrowLeft); // 左箭头（线条）【 〈】
    app.component('IconArrowRight', IconArrowRight); // 右箭头（线条）【 〉】
    app.component('IconArrowUpBold', IconArrowUpBold); // 上箭头（线条）（粗的） 【︿】
    app.component('IconArrowDown', IconArrowDown); // 下箭头（线条） 【﹀】
    app.component('IconArrowUp', IconArrowUp); // 下箭头（线条） 【﹀】
    app.component('IconCaretBottom', IconCaretBottom); // 下箭头 (实心三角形)【▲】
    app.component('IconBack', IconBack); // 右箭头   【←】
    app.component('IconRight', IconRight); // 右箭头   【→】
    app.component('IconRefreshRight', IconRefreshRight); // 刷新 【↻】
    app.component('IconLoading', IconLoading); // 加载菊花
    app.component('IconSearch', IconSearch); // 搜索
    app.component('IconZoomIn', IconZoomIn); // 放大
    app.component('IconDelete', IconDelete); // 删除（垃圾箱）
    app.component('IconRemove', IconRemove); // 删除（带圆圈的一横）【⊖】
    app.component('IconDownload', IconDownload); // 下载
    app.component('IconOperation', IconOperation); // 操作
    app.component('IconConnection', IconConnection); // 链接
    app.component('IconPrinter', IconPrinter); // 打印机
    app.component('IconUpload', IconUpload); // 上传
}
