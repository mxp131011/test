import { toast } from '@/utils/common-element-plus.js';

/**
 * 网页把复制内容到剪切版
 */
export async function copyToClipboard(text) {
    if (window.clipboardData) {
        window.clipboardData.clearData();
        const result = window.clipboardData.setData('Text', text);
        if (result) {
            return Promise.resolve(true);
        }
    }
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            return Promise.resolve(true);
        } catch (error) {}
    }
    if (document.execCommand) {
        const textarea = document.createElement('textarea');
        document.body.insertBefore(textarea, document.body.firstChild);
        textarea.value = text;
        textarea.focus();
        textarea.setSelectionRange && textarea.setSelectionRange(0, textarea.value.length);
        textarea.select();
        const result = document.execCommand('copy');
        document.body.removeChild(textarea);
        return result ? Promise.resolve(true) : Promise.reject('复制失败请手动复制');
    }
    return Promise.reject('复制失败请手动复制');
}

/**
 * 网页把复制内容到剪切版 （失败成功都提示）
 */
export async function copyToClipboardToast(text) {
    try {
        await copyToClipboard(text);
        toast.success('复制成功');
        return Promise.resolve(true);
    } catch (error) {
        toast.error(error);
        return Promise.resolve(error);
    }
}

/**
 *  根据最小宽度 ,item个数和屏幕宽度得到最适合的分割宽度
 *
 * @param { Number } minWidth  最小宽度
 * @param { Number } maxWidth  最小宽度
 * @param { Number } winWidth 屏幕宽度
 *
 */
export function getBestSize(minWidth, maxWidth, winWidth) {
    const maxNumb = parseInt(winWidth / minWidth); // 最多可以分割几个
    const minNumb = parseInt(winWidth / maxWidth); // 最少可以分割几个

    let subNumb = parseInt((maxNumb - minNumb) / 2 + minNumb);
    if (subNumb >= maxNumb) {
        subNumb = maxNumb;
    } else if (subNumb + 1 === maxNumb && maxNumb - minNumb < 2) {
        subNumb = maxNumb;
    }
    const subWidth = winWidth / subNumb;
    return { boxWidth: subWidth * subNumb, subWidth };
}

/**
 * 处理路径 （路径2为斜杠开头就直接返回路径2，否则就返回组合路径）
 *
 */
export function pathResolve(u1, u2) {
    if (u2) {
        // 路径2为斜杠开头就直接返回路径2，否则就返回组合路径
        return u2.indexOf('/') === 0 ? u2 : (u1 + '/' + u2).replace(/\/\//g, '/');
    } else {
        // 路径2不存在就直接返回路径1
        return u1;
    }
}

/**
 *  base64转化为路径
 */
export function base64ToPath(base64) {
    return new Promise((resolve) => {
        const base64Str = base64.split(',');
        const type = base64Str[0].match(/:(.*?);/)[1];
        const str = window.atob(base64Str[1]);
        let n = str.length;
        const u8Arr = new Uint8Array(n);
        while (n--) {
            u8Arr[n] = str.charCodeAt(n);
        }
        resolve((window.URL || window.webkitURL).createObjectURL(new Blob([u8Arr], { type })));
    });
}

/**
 *  base64转化为文件对象
 */
export function base64ToFile(base64, fileName) {
    return new Promise((resolve) => {
        const base64Str = base64.split(',');
        const type = base64Str[0].match(/:(.*?);/)[1];
        const str = window.atob(base64Str[1]);
        let n = str.length;
        const u8Arr = new Uint8Array(n);
        while (n--) {
            u8Arr[n] = str.charCodeAt(n);
        }
        resolve(new File([u8Arr], fileName, { type }));
    });
}
