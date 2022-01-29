// 推荐使用 lodash（一款强大的数据处理工具）   开源地址：https://github.com/lodash/lodash   文档：https://www.lodashjs.com/

/**
 * 数组对象去重 （根据某个字段去重）
 * @param {Object} arr
 * @param {String} key 需要根据那个字段去重
 */
export function filterRepeat(arr, key) {
    const obj = {};
    const newArr = arr.reduce((cur, next) => {
        if (!obj[next[key]]) {
            obj[next[key]] = true;
            cur.push(next);
        }
        return cur;
    }, []);
    return newArr;
}

/**
 * 根据key比较两个数组
 * 以arr1为准，如果arr2有相同的就用arr2的替换arr1的
 */
export function compareRepeat2ArrByKey(arr1, arr2, key) {
    const list = {};
    arr2.forEach((item) => {
        list[item[key]] = item;
    });
    arr1.forEach((item, index) => {
        if (list[item[key]]) {
            arr1.splice(index, 1, list[item[key]]);
        }
    });
    return arr1;
}

/**
 * 根据key合并数组去掉重复
 * 有重复的就保留arr2的
 */
export function mergeArrFun(arr1, arr2, key) {
    const list = {};
    arr1.forEach((item) => {
        list[item[key]] = item;
    });
    arr2.forEach((item) => {
        list[item[key]] = item;
    });
    const arr = [];
    for (const k in list) {
        arr.push(list[k]);
    }
    return arr;
}

/**
 * 根据路径获取对象的值
 * @param {*} obj  对象
 * @param {*} path  如 'a.c'只支持点路径，不支持 'a[0]'
 */
export function getValueByPath(obj, path) {
    const paths = path.split('.');
    let res = obj;
    let prop = '';
    while ((prop = paths.shift())) {
        res = res[prop];
    }

    return res;
}

/**
 *  根据路径 或一个路径数组得到一个由该路径值组成的一个字符串  （多由于唯一字段）
 * @param {*} obj  对象
 * @param {*} path  如 ['a.c','a' 'a.c.d']只支持点路径，不支持 ['a[0]']
 */
export function getOnlyValue(obj, valueKey) {
    if (Array.isArray(valueKey)) {
        let onlyValue = '';
        valueKey.forEach((key) => {
            onlyValue += '_' + (getValueByPath(obj, key) || '');
        });
        return onlyValue;
    } else {
        return obj[valueKey];
    }
}
