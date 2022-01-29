/**
 * 删除指定的元素并返回删除后的数组
 */
Array.prototype.mySplice = function (index) {
    return this.slice(0, index).concat(this.slice(index + 1));
};

/**
 * 在数组后面添加一个元素并返回添加后的数组
 */
Array.prototype.myPush = function (item) {
    return this.concat([item]);
};

/**
 * 特定的值删除数组中的元素并返回删除后的数组
 */
Array.prototype.myDelItem = function (item) {
    const index = this.indexOf(item);
    return this.mySplice(index);
};

/**
 * 得到两个数组的交集
 */
Object.myGetIntersection = function (arr1, arr2) {
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
        return arr1.filter((item) => arr2.includes(item));
    } else {
        return [];
    }
};

/**
 * 判断两个数组是否有交集
 */
Object.myHaveIntersection = function (arr1, arr2) {
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
        const index = arr1.findIndex((item) => arr2.includes(item));
        return index >= 0;
    } else {
        return false;
    }
};

/**
 * 判断两个对象内容是否相等
 * @param {Object}  obj1 需要判断的对象1
 * @param {Object} obj2 需要判断的对象2
 * @param {Array} notComparisonParam notComparisonParam  不判断对象中的那些字段 【字符串数组】
 *      实例运行： Object.myEqual({aa:'11',cc:'222'}, {aa:'11',cc:'333'}, ['cc']);
 *      结果为true ，因为虽然两个对象的cc字段值不一样，但notComparisonParam中指定了cc字段不判断
 */
Object.myEqual = function (obj1, obj2, notComparisonParam = []) {
    // 判断两个对象是否指向同一内存或者全等，指向同一内存或全等返回true
    if (obj1 === obj2) {
        return true;
    }

    // 类型相同才比较，不同则直接返回false
    const obj1Type = typeof obj1;
    const obj2Type = typeof obj2;
    if (obj1Type === obj2Type) {
        if (obj1Type === 'object' && obj2Type === 'object') {
            const a = JSON.parse(JSON.stringify(obj1));
            const b = JSON.parse(JSON.stringify(obj2));
            notComparisonParam.forEach((item) => {
                delete a[item];
                delete b[item];
            });
            // 获取两个对象键值数组
            const aProps = Object.getOwnPropertyNames(a);
            const bProps = Object.getOwnPropertyNames(b);
            // 判断两个对象键值数组长度是否一致，不一致返回false
            if (aProps.length !== bProps.length) {
                return false;
            }
            // 遍历对象的键值
            for (const prop in a) {
                // 判断a的键值，在b中是否存在，不存在，返回false
                if (Object.prototype.hasOwnProperty.call(b, prop)) {
                    // 判断a的键值是否为对象，是则递归，不是对象直接判断键值是否相等，不相等返回false
                    if (typeof a[prop] === 'object') {
                        if (!Object.myEqual(a[prop], b[prop])) {
                            return false;
                        }
                    } else if (a[prop] !== b[prop]) {
                        return false;
                    }
                } else {
                    return false;
                }
            }
            return true;
        } else {
            // 不是对象且上面已经判断了不全等则返回false
            return false;
        }
    } else {
        return false;
    }
};

/**
 * 是否为空对象（传入对象为假也代表是空对象，如false，null，0等）
 */
Object.myIsNullObj = function (obj) {
    return Boolean(!obj || JSON.stringify(obj) === '{}');
};

/**
 * 是否为json对象
 */
Object.myIsJson = function (obj) {
    return Boolean(typeof obj === 'object' && obj);
};

/**
 * 把字符串转为Json对象
 */
Object.myStrToJson = function (obj) {
    if (typeof obj === 'string') {
        try {
            return JSON.parse(obj);
        } catch (err) {
            return false;
        }
    } else {
        return false;
    }
};
