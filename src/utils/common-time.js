/**
 *
 * date
 * showTime 是否显示时分秒
 *
 */
/**
 * 日期转换成字符串
 *
 * @param {Date || Number} dateObj 日期对象 或者 时间戳
 * @param {Boolean} showTime 是否显示时分秒
 * @param {String} dataSegmentation 用什么分割年月日 默认中横线
 * @param {String} dataSegmentation 用什么分割时分秒 默认冒号
 *  @param {String} connector 日期和时间链接符 默认空格
 * @returns 日期字符串 如：（2101-02-02）
 */
export function formatDateStr(dateObj = new Date(), showTime = false, dataSegmentation = '-', timeSegmentation = ':', connector = ' ') {
    let date = typeof dateObj === 'number' ? new Date(dateObj) : dateObj.getFullYear ? dateObj : false;
    if (!date) {
        date = new Date();
        console.error('传入日期非法已转换成 new Date()');
    }
    const year = String(date.getFullYear());
    let month = String(date.getMonth() + 1);
    month = month.length > 1 ? month : '0' + month;
    let day = String(date.getDate());
    day = day.length > 1 ? day : '0' + day;
    if (showTime) {
        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();
        return [year, month, day].join(dataSegmentation) + connector + [hour, minute, second].join(timeSegmentation);
    } else {
        return [year, month, day].join(dataSegmentation);
    }
}

/**
 * 格式化成Date对象
 * date  { Date, String, Array ,Number}
 * 可格式化
 *     [2021,10,11]  注意第一个为年，第二个为月，第三个为日 月份是从0开始，即0代表1月份，11代表12月
 *    '2021-10-11' 或 '2021/10/11'  日期之字符串
 *     new Date() 日期对象
 *    1631174240 【即时间戳】
 *
 */
export function formatDate(date) {
    try {
        let newDate = '';
        if (date instanceof Date) {
            newDate = date;
        } else if (Array.isArray(date)) {
            newDate = new Date(...date);
        } else if (typeof date === 'string') {
            newDate = new Date(date.substring(0, 19).replace(/-/g, '/')); // 兼容ios 先把-转换为/
        } else {
            newDate = new Date(date);
        }
        return newDate instanceof Date ? newDate : false;
    } catch (error) {
        return false;
    }
}

/**
 * 是否可以格式化成Date对象
 * date { Date, String, Array }
 */
export function isFormatDate(date) {
    return Boolean(formatDate(date));
}
