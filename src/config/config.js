import packageInfo from '../../package.json';

/**
 * 是否全局开启axios调试（打印未加密的请求参数）【仅在测试环境有效 即：（import.meta.env.DEV === true）】
 */
export const AXIOS_DEBUGGER = false;

/**
 * 内部版本 （服务器API版本）
 */
export const API_VERSION = 100;

/**
 * 标题
 */
export const APP_TITLE = packageInfo.title;

/**
 * 作者
 */
export const APP_AUTHOR = packageInfo.author;

/**
 * 公司
 */
export const APP_COMPANY = packageInfo.copyright;

/**
 * 关键字
 */
export const APP_KEYWORDS = packageInfo.keywords;

/**
 * 网站
 */
export const APP_WEBSITE = 'www.zlt9.com';

/**
 * 邮箱
 */
export const APP_MAIL = 'mxp131011@qq.com';

/**
 * 加密ID
 */
export const APP_ID = 'abcd1321';

/**
 * aes加密的key（用于请求）
 */
export const AES_KEY_POST = 'sczxfyumnqertxtx';

/**
 * aes加密的IV（用于请求）
 */
export const AES_CBC_IV_POST = 'sczxfyumnqertxtx';
