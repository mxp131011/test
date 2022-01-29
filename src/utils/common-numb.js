import { Precision } from '@/utils/storage/myLocalStorage.js';

/**
 * 得到百分比（保留两位）
 */
export function getPercentage(numb) {
    return Math.round(Number(numb) * 10000) / 100 + '%';
}

/**
 * 整理数字 (四舍五入保留n为小数)
 */
export function organizeDigital(numb, pos) {
    if (isNaN(numb) || isNaN(pos)) {
        return numb;
    } else {
        const src = Number(numb);
        return Math.round(src * Math.pow(10, pos)) / Math.pow(10, pos);
    }
}

/**
 * 整理数字 (四舍五入保留n为小数)通过type
 *
 * @param {Number || String} numb  数字或数字字符串
 * @param {Number || String} type  只能是 'dj', 'sl', 'zje' 或者数字
 */
export function organizeDigitalByType(numb, type) {
    if (['dj', 'sl', 'zje'].includes(type)) {
        return organizeDigital(numb, new Precision().get()[type]);
    } else if (typeof type === 'number') {
        return organizeDigital(numb, type);
    } else {
        return organizeDigital(numb, 2);
    }
}

/**
 *  根据对象的某两个key相乘
 * @param {Number || String} val1 乘数的key
 * @param {Number || String} val2 被乘数的key
 * @param {Number || String} type  只能是 'dj', 'sl', 'zje' 或者数字
 */
export function getTotal(val1, val2, type) {
    const newVal1 = !isNaN(val1) ? Number(val1) : 0;
    const newVal2 = !isNaN(val2) ? Number(val2) : 0;
    return organizeDigitalByType(newVal1 * newVal2, type);
}

/**
 *  根据对象数组的某个key得到合计
 * @param {Array} list 对象数组
 * @param {String} key 需要计算的key
 * @param {Number || String} type  只能是 'dj', 'sl', 'zje' 或者数字
 */
export function getTotalByObjArrKey(list, key, type) {
    const total = list.reduce((_total, curr) => {
        _total += !isNaN(curr[key]) ? Number(curr[key]) : 0;
        return _total;
    }, 0);

    return organizeDigitalByType(total, type);
}

/**
 *  根据对象数组的某两个key相乘后在得到合计
 * @param {Array} list 对象数组
 * @param {String} key1 乘数的key
 * @param {String} key2 被乘数的key
 * @param {Number || String} type  只能是 'dj', 'sl', 'zje' 或者数字
 */
export function getMultiplyTotalByObjArrKey(list, key1, key2, type) {
    const total = list.reduce((_total, curr) => {
        const val1 = !isNaN(curr[key1]) ? Number(curr[key1]) : 0;
        const val2 = !isNaN(curr[key2]) ? Number(curr[key2]) : 0;
        _total += val1 * val2;
        return _total;
    }, 0);
    return organizeDigitalByType(total, type);
}
