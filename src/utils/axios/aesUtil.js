import CryptoJS from 'crypto-js';

import { AES_KEY_POST, AES_CBC_IV_POST } from '@/config/config.js';

// aes加密（用于请求）
export function encryptPost(word) {
    return encryptUtil(word, AES_KEY_POST, AES_CBC_IV_POST);
}

// aes解密（用于请求）
export function decryptPost(word) {
    return decryptUtil(word, AES_KEY_POST, AES_CBC_IV_POST);
}

/**
 * 加密
 *
 * 第一个参数word是待加密或者解密的字符串；
 * 第二个参数keyStr是aes加密需要用到的16位字符串的key；
 * 第三个参数是初始化向量 iv。
 */
export function encryptUtil(data, key, iv) {
    const AesKey = CryptoJS.enc.Utf8.parse(key);
    const secretData = CryptoJS.enc.Utf8.parse(data);
    const encrypted = CryptoJS.AES.encrypt(secretData, AesKey, myCBCOptions(iv));
    const hexStr = encrypted.ciphertext.toString().toUpperCase();
    return hexStr;
}

/**
 * 解密
 *
 * 第一个参数word是待加密或者解密的字符串；
 * 第二个参数keyStr是aes加密需要用到的16位字符串的key；
 * 第三个参数是初始化向量 iv。
 */
export function decryptUtil(data, key, iv) {
    const srcs = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(data));
    const AesKey = CryptoJS.enc.Utf8.parse(key);
    const decrypt = CryptoJS.AES.decrypt(srcs, AesKey, myCBCOptions(iv));
    return decrypt.toString(CryptoJS.enc.Utf8).toString();
}

function myCBCOptions(iv) {
    return {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    };
}
