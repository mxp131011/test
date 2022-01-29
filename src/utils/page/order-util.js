import { toast } from '@/utils/common-element-plus.js';
import { useAppStore } from '@/store/modules/app.js';

/**
 * 得到是否加载默认商品搜索筛选数据 （ isWant）
 */
export function getIsWant() {
    const appStore = useAppStore();
    const menuList = appStore.goodsFilterMenu || false;
    return menuList && Array.isArray(menuList) && menuList.length > 0 ? 'no' : 'yes';
}

/**
 *
 * 得到整理后的商品
 *
 */
export function getGoodsItemFun(goods, baseData) {
    goods.spsl = baseData.rD.ckfs === '零售退货' || goods.my_is_sales_return ? -1 : 1; // 商品数量
    goods.spys = goods.c_spys || ''; // 选中颜色
    goods.sppz = goods.c_sppz || ''; // 选中配置
    goods.spdj = String(goods.c_jg) || '0'; // 商品单价goods.c_jg, //
    goods.splsj = goods.c_jg; // 零售价
    goods.spjf = ''; // 商品积分
    goods.sphd = ''; // 商品活动
    goods.spbz = ''; // 商品备注
    goods.sptc = ''; // 商品套餐
    goods.spld = ''; // 商品料单
    goods.sptcz = ''; // 商品套餐值
    goods.spywbh = ''; // 商业务编号
    goods.sptsz = ''; // 商品提升值
    goods.spchList = goods.c_code ? [goods.c_code] : []; // 串号数组
    goods.dyList = baseData.xsxgD && Array.isArray(baseData.xsxgD.ywyxx) ? baseData.xsxgD.ywyxx : []; // 店员数组
    goods.gzzje = 0; // 挂账金额
    goods.gzdwList = []; // 挂账单位
    goods.complimentaryList = [];
    return goods;
}

/**
 * 得到所有的串号
 */
export function getAllIEMIFun(selectedList) {
    const allIMEI = [];
    selectedList.forEach((goodsItem) => {
        const spchList = Array.isArray(goodsItem.spchList) ? goodsItem.spchList : [];
        allIMEI.push(...spchList);
        const complimentaryList = Array.isArray(goodsItem.complimentaryList) ? goodsItem.complimentaryList : [];
        complimentaryList.forEach((complimentaryItem) => {
            complimentaryItem.c_code && allIMEI.push(complimentaryItem.c_code);
        });
    });
    return allIMEI;
}

/**
 * 是否存在相同的串号 (在编辑串号时)
 */
export function getEqualIEMIByEditIEMIFun(selectedList, imeiList) {
    const allIMEI = getAllIEMIFun(selectedList);
    for (let i = 0, len = imeiList.length; i < len; i++) {
        if (allIMEI.includes(imeiList[i])) {
            toast.error(`【${imeiList[i]}】串号已存在`);
            return false;
        }
    }
    return true;
}

/**
 * 是否存在相同的串号 (在新增商品时)
 */
export function getEqualIEMIByAddGoodsFun(selectedList, goods) {
    const allIMEI = getAllIEMIFun(selectedList);
    const newGoods = Array.isArray(goods) ? goods : [goods];
    for (let i = 0, len = newGoods.length; i < len; i++) {
        const item = newGoods[i];
        if (allIMEI.includes(item.c_code)) {
            toast.error(`【${item.c_code}】串号已存在`);
            return false;
        }
    }
    return true;
}

/**
 * 得到修改单据时需要验证的特权密码
 */
export function getEditVerifyPasswordWarehouse(ckxx, list) {
    if (ckxx && ckxx.c_ckbm && ckxx.c_ckmc) {
        return { ckbm: ckxx.c_ckbm, ckmc: ckxx.c_ckmc || '', msg: '修改需收授权' };
    } else {
        for (let i = 0, len = list.length; i < len; i++) {
            const item = list[i];
            if (item.ckbm && item.ckmc) {
                return { ckbm: item.ckbm, ckmc: item.ckmc, msg: '修改需收授权' };
            } else if (item.c_ckbm && item.c_ckmc) {
                return { ckbm: item.c_ckbm, ckmc: item.c_ckmc, msg: '修改需收授权' };
            }
        }
        return false;
    }
}

/**
 * 新建单据
 */
export function newOrder(baseData) {
    Object.assign(baseData, JSON.parse(baseData.defaultAxiosStr));
    baseData.dh = '';
    baseData.pageLoad.loadType = false;
}
