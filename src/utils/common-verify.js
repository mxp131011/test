// 双字节字符(包括汉字在内，即占两个英文字符位置的字符)
// eslint-disable-next-line no-control-regex
export const double_byte_RegEx = /[^\x00-\xff]/;

// 中文字符
export const chinese_RegEx = /[\u4e00-\u9fa5]/;

// 验证密码 不能为纯数字字母或特殊符号的6到18位字符
export const password_RegEx = /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)])+$)^.{6,18}$/;

// 验证电话号
export const tel_RegEx = /^[1][0-9]{10}$/;

// 邮箱
export const email_RegEx = /^([\w_-]+)@([\w-]+[.]?)*[\w]+\.[a-zA-Z]{2,10}$/;

// 网址
export const url_RegEx = /^(ftp|https?):\/\/([\w_-]+)\.([\w-]+[.]?)*[\w]+\.[a-zA-Z]{2,10}(.*)/;

// 身份证
export const IDcard_RegEx = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/;

/** ********************整数**********************整数************/
/** ********************整数**********************整数************/
/** ********************整数**********************整数************/
// 正整数（不含0）
export const add_int_numb_RegEx = /^[1-9]\d*$/;

// 负整数（不含0）
export const minus_int_numb_RegEx = /^-[1-9]\d*$/;

// 整数 （ 不含0（正负都可以）
export const all_int_numb_RegEx = /^-?[1-9]\d*$/;

// 正整数（含0）
export const add_int_or_zero_numb_RegEx = /^[1-9]\d*$|^0$/;

// 负整数 （含0）
export const minus_int_or_zero_numb_RegEx = /^-[1-9]\d*$|^0$/;

// 正负整数 （含0）
export const all_int_or_zero_numb_RegEx = /^-?[1-9]\d*$|^0$/;

/** ********************浮点数**********************浮点数************/
/** ********************浮点数**********************浮点数************/
/** ********************浮点数**********************浮点数************/

// 正浮点数 （不含0）
export const add_float_numb_RegEx = /(^[1-9]\d*|^0)\.\d+$/;

// 负浮点数（不含0）
export const minus_float_numb_RegEx = /(^-[1-9]\d*|^-0)\.\d+$/;

// 正浮点数 （含0）
export const add_float_ro_zero_numb_RegEx = /(^[1-9]\d*|^0)\.\d+$|^0$/;

// 负浮点数（含0）
export const minus_float_ro_zero_numb_RegEx = /(^-[1-9]\d*|^-0)\.\d+$|^0$/;

// 浮点数（包含正负浮点数不含0）
export const all_float_numb_RegEx = /(^-?[1-9]\d*|^-?0)\.\d+$/;

// 浮点数（包含正负浮点数和0）
export const all_float_or_zero_numb_RegEx = /(^-?[1-9]\d*|^-?0)\.\d+$|^0$/;

// 所有合法数字 （整数，小数，正数，负数，0） 【不推荐用正则验证直接用isNaN(numb)并判断大于小于就可以了】
export const all_numb = /(^-?[1-9]\d*|^-?0)(\.\d+)?$/;

/** ********************数字输入时正则**********************数字输入时正则************/
/** ********************数字输入时正则**********************数字输入时正则************/
/** ********************数字输入时正则**********************数字输入时正则************/

// 正整数 （不含0） 主要用于输入时验证
export const add_int_numb_input_RegEx = /^[1-9]\d*/;

// 负整数（不含0） 主要用于输入时验证
export const minus_int_numb_input_RegEx = /^-[1-9]\d*/;

// 正负整数（不含0） 主要用于输入时验证
export const all_int_numb_input_RegEx = /^-?[1-9]\d*/;

// 正整数 （含0） 主要用于输入时验证
export const add_int_or_zero_numb_input_RegEx = /^[1-9]\d*$|^0/;

// 负整数 （含0） 主要用于输入时验证
export const minus_int_or_zero_numb_input_RegEx = /^-[1-9]\d*$|^0/;

// 正负整数（含0） 主要用于输入时验证
export const all_int_or_zero_numb_input_RegEx = /^-?\d*$|^0/;

// 正浮点数 主要用于输入时验证
export const add_float_numb_input_RegEx = /^\d+\.?\d*/;

// 负浮点数 主要用于输入时验证
export const minus_float_numb_input_RegEx = /^-\d*\.?\d*/;

// 正负浮点数  主要用于输入时验证 【这里就可以验证合法的数字输入了包含 0.   -   -0. 】
export const all_float_numb_input_RegEx = /^-?\d*\.?\d*/;

/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/
/** ********************验证**********************验证************/

/**
 * 验证密码合法性
 *
 */
export function verifyPassword(str) {
    return Boolean(password_RegEx.test(str));
}

/**
 * 验证电话号
 */
export function verifyTel(str) {
    return Boolean(tel_RegEx.test(str));
}

/**
 * 验证电话号
 */
export function verifyTelFrom(rule, value, callback) {
    if (String(value).length === '') {
        callback(new Error('请输入电话'));
    } else if (!tel_RegEx.test(value)) {
        callback(new Error('电话号非法'));
    } else {
        callback();
    }
}

/**
 * 验证邮箱
 */
export function verifyEmail(str) {
    return Boolean(email_RegEx.test(str));
}

/**
 * 验证身份证
 */
export function verifyIDcard(str) {
    return Boolean(IDcard_RegEx.test(str));
}

/**
 * 验证网址
 */
export function verifyUrl(str) {
    return Boolean(url_RegEx.test(str));
}

/**
 * 小屏幕
 */
export function verifySmallScreen() {
    return document.documentElement.clientWidth < 600;
}

/** *******************数字验证****************数字验证***********************/
/** *******************数字验证****************数字验证***********************/
/** *******************数字验证****************数字验证***********************/
/**
 * 正整数 （不含0）
 */
export function verifyAddIntNumb(str) {
    return Boolean(add_int_numb_RegEx.test(str));
}

/**
 * 负整数（不含0）
 */
export function verifyMinusIntNumb(str) {
    return Boolean(minus_int_numb_RegEx.test(str));
}

/**
 * 正负整数（不含0）
 */
export function verifyAllIntNumb(str) {
    return Boolean(all_int_numb_RegEx.test(str));
}

/**
 * 正整数 （含0）
 */
export function verifyAddIntRoZeroNumb(str) {
    return Boolean(add_int_or_zero_numb_RegEx.test(str));
}

/**
 * 负整数 （含0）
 */
export function verifyMinusIntRoZeroNumb(str) {
    return Boolean(minus_int_or_zero_numb_RegEx.test(str));
}

/**
 * 正 负 整数（含0）
 */
export function verifyAllIntRoZeroNumb(str) {
    return Boolean(all_int_or_zero_numb_RegEx.test(str));
}

/**
 * 正浮点数
 */
export function verifyAddFloatNumb(str) {
    return Boolean(add_float_numb_RegEx.test(str));
}

/**
 * 负浮点数
 */
export function verifyMinusFloatNumb(str) {
    return Boolean(minus_float_numb_RegEx.test(str));
}

/**
 *  正负浮点数
 */
export function verifyAllsFloatNumb(str) {
    return Boolean(all_float_numb_RegEx.test(str));
}

/** *******************输入时验证****************输入时验证***********************/
/** *******************输入时验证****************输入时验证***********************/
/** *******************输入时验证****************输入时验证***********************/

/**
 * 正整数 （不含0） 主要用于输入时验证
 */
export function verifyAddIntNumbInput(str) {
    let numb = String(str).match(add_int_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    return numb;
}

/**
 * 负整数（不含0） 主要用于输入时验证
 */
export function verifyMinusIntNumbInput(str) {
    let numb = String(str).match(minus_int_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    return numb;
}

/**
 * 正负整数（不含0） 主要用于输入时验证
 */
export function verifyAllIntNumbInput(str) {
    let numb = String(str).match(all_int_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    return numb;
}

/**
 * 正整数 （含0） 主要用于输入时验证
 */
export function verifyAddIntRoZeroNumbInput(str) {
    let numb = String(str).match(add_int_or_zero_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');

    return numb;
}

/**
 * 负整数 （含0） 主要用于输入时验证
 */
export function verifyMinusIntRoZeroNumbInput(str) {
    let numb = String(str).match(minus_int_or_zero_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    numb = String(numb).replace(/^-0+/g, '0');
    console.log(numb);
    return numb;
}

/**
 * 正 负 整数（含0） 主要用于输入时验证
 */
export function verifyAllIntRoZeroNumbInput(str) {
    let numb = String(str).match(all_int_or_zero_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    numb = String(numb).replace(/^-0+/g, '-');
    numb = !isNaN(numb) ? String(Number(numb)) : numb;
    return numb;
}

/**
 * 正浮点数 主要用于输入时验证
 */
export function verifyAddFloatNumbInput(str) {
    let numb = String(str).match(add_float_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    numb = String(numb).replace(/^0+\./g, '0.');
    numb = numb.match(/^0+[1-9]+/) ? numb.replace(/^0+/g, '') : numb;
    return numb;
}

/**
 * 负浮点数 主要用于输入时验证
 */
export function verifyMinusFloatNumbInput(str) {
    let numb = String(str).match(minus_float_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    numb = String(numb).replace(/^-0+/g, '-0');
    numb = String(numb).replace(/^0+\./g, '0.');
    numb = String(numb).replace(/^-\./g, '-0.');
    numb = numb.match(/^0+[1-9]+/) ? numb.replace(/^0+/g, '') : numb;
    return numb;
}

/**
 *  正负浮点数   主要用于输入时验证
 */
export function verifyAllFloatNumbInput(str) {
    let numb = String(str).match(all_float_numb_input_RegEx);
    numb = Array.isArray(numb) ? numb[0] : '';
    numb = String(numb).replace(/^0+/g, '0');
    numb = String(numb).replace(/^-0+/g, '-0');
    numb = String(numb).replace(/^0+\./g, '0.');
    numb = String(numb).replace(/^-\./g, '-0.');
    numb = numb.match(/^0+[1-9]+/) ? numb.replace(/^0+/g, '') : numb;

    return numb;
}
