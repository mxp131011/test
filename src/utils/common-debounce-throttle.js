/* 在 vue 中使用（注意：不能使用箭头函数，否则this指向不对，并且不能再次封装如：
 *     // 错误调用方式
 *     // move(){  // 错误调用方式
 *     //    const that = this;
 *     //    debounce(function () {
 *     //        console.log('需要做的事情');
 *     //    }, 1000)};
 *     // }
 * 应该直接使用：
 *     // 正确调用方式1
 *     move: debounce(function () {// 正确调用方式
 *          console.log('需要做的事情');
 *     }, 1000)
 *     // 正确调用方式2
 *      const handle = function() {
 *          console.log('需要做的事情');
 *      }
 *      window.addEventListener('scroll', debounce(handle, 1000));
 *    // 正确调用方式3
 *    window.onresize = debounce(function() {
 *      console.log('需要做的事情');
 *    }, 500);
 **/

/**
 * 防抖 延迟执行版 （delay毫秒后在执行，只有最后一次才执行）
 *
 * 适用场景 ： 监听窗口宽高改变
 *
 * @param { Function } fn 要执行的方法
 * @param { Number } delay  防抖多少毫秒
 *
 *
 */
export function debounce(fn, delay = 500) {
    let timer = false;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            timer = false;
            fn(...args);
        }, delay);
    };
}

/**
 * 节流函数
 */
export function throttle(fn, delay = 500) {
    let waiting = false;
    return (...args) => {
        if (!waiting) {
            waiting = true;
            setTimeout(() => {
                fn(...args);
                waiting = false;
            }, delay);
        }
    };
}

/**
 * 防抖 立即执行版 （先执行然后等delay毫秒后才允许再次执行）
 *
 * 适用场景 ： 按钮点击事件
 *
 * @param { Function || Array } fn 要执行的方法
 * @param { Number } delay  防抖多少毫秒
 *
 */
export function clickImmediateDebounce(anyObj, ...args) {
    let fn = false;
    let delay = 400;
    if (Array.isArray(anyObj) && typeof anyObj[0] === 'function') {
        fn = anyObj[0];
        const _delay = anyObj[1] || delay;
        if (isNaN(_delay) && parseInt(_delay) > 0) {
            delay = parseInt(_delay);
        }
    } else if (typeof anyObj === 'function') {
        fn = anyObj;
    } else {
        throw new Error('第一个参数必须是一个方法或数组，如是数组第一个元素则必须为方法，第二个元素为数字');
    }
    let debounceTimer = null;
    debounceTimer && clearTimeout(debounceTimer);
    !debounceTimer && fn(...args);
    debounceTimer = setTimeout(() => {
        debounceTimer = null;
    }, delay);
}

/**
 * 防抖 延迟执行版 （delay毫秒后在执行，只有最后一次才执行）
 *
 * 适用场景 ： 监听窗口宽高改变
 *
 * @param { Function } fn 要执行的方法
 * @param { Number } delay  防抖多少毫秒
 *
 */
export function clickLaterDebounce(anyObj, ...args) {
    let fn = false;
    let delay = 400;
    if (Array.isArray(anyObj) && typeof anyObj[0] === 'function') {
        fn = anyObj[0];
        const _delay = anyObj[1] || delay;
        if (isNaN(_delay) && parseInt(_delay) > 0) {
            delay = parseInt(_delay);
        }
    } else if (typeof anyObj === 'function') {
        fn = anyObj;
    } else {
        throw new Error('第一个参数必须是一个方法或数组，如是数组第一个元素则必须为方法，第二个元素为数字');
    }
    let debounceTimer = null;
    debounceTimer && clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        fn(...args);
        debounceTimer = null;
    }, delay);
}
