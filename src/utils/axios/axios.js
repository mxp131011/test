import { APP_ID, API_VERSION, AXIOS_DEBUGGER } from '@/config/config.js';
import axios from 'axios';
import { encryptPost } from './aesUtil.js';
import { useUserStore } from '@/store/modules/user.js';
import { useAppStore } from '@/store/modules/app.js';

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// post请求头
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

const instance = axios.create({
    timeout: 180000, // 设置超时三分钟
    withcredentials: false
});

/*
 * const CancelToken = axios.CancelToken;
 * const axiosSource = CancelToken.source();
 */

// 添加请求拦截器
instance.interceptors.request.use((config) => {
    try {
        const userStore = useUserStore();
        const appStore = useAppStore();
        // 设置基础路径
        config.baseURL = config.baseURL || appStore.currBaseUrl;
        const common = {};
        // 当noGlobalParam有值且为true时不传全局参数 否则需要传全局参数
        if (!('noGlobalParam' in config) || !config.noGlobalParam) {
            common.mac = '';
            common.timestamp = new Date().getTime();
            common.appid = APP_ID;
            common.gsbm = userStore.cid || '';
            common.C_name = userStore.uid || '';
            common.token = userStore.token || '';
            common.ckq = '1';

            common.loginType = 'web';

            // 版本号后端注意用大于符号控制
            common.apiversions = API_VERSION;
        }
        if (config.method.toUpperCase() === 'GET') {
            config.params = typeof config.params === 'object' ? config.params : {};
            config.params = Object.assign(common, config.params);
        } else {
            const data = typeof config.data === 'object' ? config.data : {};
            config.oldData = Object.assign(common, data);
            config.oldDataStr = JSON.stringify(config.oldData);
            if (JSON.stringify(config.oldData) !== '{}') {
                // 当custom.noEncrypt有值且为true时不加密（默认为false）
                if ('noEncrypt' in config && config.noEncrypt) {
                    config.data = config.oldData;
                } else {
                    config.data = JSON.stringify({ signature: encryptPost(JSON.stringify(config.oldData)) });
                }
            }
        }

        if (import.meta.env.DEV) {
            // 在测试环境下控制打印参数
            const showLog = Boolean('showLog' in config && config.showLog);
            if (showLog || AXIOS_DEBUGGER) {
                console.log(config.url, '请求参数对象 :>> ', config.oldData);
                console.log(config.url, '请求参数加密 :>> ', config.data);
                console.log(config.url, '请求参数字符 :>> ', JSON.stringify(config.oldData));
            }
        }

        if (!config.url) {
            config.cancelAxios = true;
            config.errMsg = 'URL为空，-1005';
            return Promise.reject(config);
        }
        return config;
    } catch (e) {
        console.error('代码错误：', e);
        config.cancelAxios = true;
        config.errMsg = '请求内部代码错误，-1007';
        return Promise.reject(config);
    }
});

// 添加响应拦截器
instance.interceptors.response.use(
    (response) => {
        if (!response.config) {
            response.config = {};
        }
        // 直接返回原始数据
        if ('rawData' in response.config && response.config.rawData) {
            return response.data;
        } else {
            try {
                // 如果json非法可能是因为有看不见的字符引起的这里去掉先去掉看不见的字符在转换
                if (response.data && typeof response.data === 'string') {
                    try {
                        // eslint-disable-next-line no-control-regex
                        response.data = JSON.parse(response.data.replace(/[\x00-\x1f]+/g, ''));
                    } catch (err) {
                        console.log('解析错误=====', err);
                    }
                }

                if (response.data && typeof response.data === 'object') {
                    if ('ResCode' in response.data && !isNaN(response.data.ResCode)) {
                        response.data.code = Number(response.data.ResCode);
                        delete response.data.ResCode;
                    } else if ('code' in response.data && !isNaN(response.data.code)) {
                        response.data.code = Number(response.data.code);
                    } else if (!('code' in response.data)) {
                        response.data.code = -1005;
                    }
                    if ('Msg' in response.data) {
                        response.data.msg = response.data.Msg;
                        delete response.data.Msg;
                    } else if ('data' in response.data) {
                        response.data.msg = response.data.data;
                        delete response.data.data;
                    } else if (!('msg' in response.data)) {
                        // 没有就赋值
                        response.data.msg = '加载失败，BD1005';
                    }
                    let successCode = [1];
                    // 自定义返回成功的code
                    if ('successCode' in response.config && response.config.successCode) {
                        successCode = response.config.successCode;
                        successCode = Array.isArray(successCode) ? successCode : [successCode];
                    }
                    if (successCode.includes(response.data.code) && 'msg' in response.data) {
                        // 返回请求数据 （request的数据）
                        if ('returnRequest' in response.config && response.config.returnRequest) {
                            response.data.localRequest = {
                                data: response.config.data,
                                oldData: response.config.oldData
                            };
                        }
                        return response.data;
                    }
                    console.log('请求失败11111========', response);
                    return Promise.reject(requestComFail(response));
                } else {
                    console.log('请求失败2========', response);
                    return Promise.reject({
                        code: -1002,
                        msg: '请求失败，数据格式错误'
                    });
                }
            } catch (e) {
                console.error('代码错误1：', e);
                const info = { code: -20001, msg: '代码错误，BD0022' };
                return Promise.reject(requestComFail(info));
            }
        }
    },
    (response) => {
        console.log('请求失败3========', response);
        if (!navigator.onLine) {
            response.data = { code: -20042, msg: '暂无网络请检测网络，BD0042' };
        }
        return Promise.reject(requestComFail(response));
    }
);

function requestComFail(responses) {
    const response = responses || {};
    if ('cancelAxios' in response && response.cancelAxios) {
        return { code: -1000, msg: response.errMsg || '请求错误或请求已取消' };
    } else {
        const config = 'config' in response ? response.config : {};
        if (!response.errMsg) {
            const method = config.method || '';
            response.errMsg = method.toUpperCase() === 'DOWNLOAD' ? '下载失败，BD0033' : '请求失败，BD0033';
        }
        const data = response.data && typeof response.data === 'object' ? response.data : {};
        const statusCode = 'statusCode' in response ? response.statusCode : -1001;
        let code = 'code' in data ? data.code : statusCode;
        code = 'code' in response ? response.code : code;
        let errMsg = 'errMsg' in response ? response.errMsg : '请求失败,' + code;
        errMsg = 'msg' in response ? response.msg : errMsg;
        if (typeof errMsg === 'string') {
            if (errMsg.indexOf('timeout') > -1) {
                code = -1201;
                errMsg = '请求超时，-1201';
            } else if (errMsg.indexOf('Unable to resolve host') > -1) {
                code = -1202;
                errMsg = '无法解析域名，请尝试关闭或打开WiFi再试，-1202';
            } else if (errMsg.indexOf('request:fail abort') > -1) {
                code = -1203;
                errMsg = '请求失败或取消，-1203';
            } else if (errMsg.indexOf('request:fail') > -1) {
                code = -1204;
                errMsg = '请求失败，-1204';
            }

            if (code === 404) {
                errMsg = '链接已失效，请联系客服';
            } else if (code === 500) {
                errMsg = '服务器内部错误，请联系客服';
            }
        }
        const msg = 'msg' in data ? data.msg : errMsg;
        const ersResult = { code, msg, ...data };
        'ResCode' in ersResult && delete ersResult.ResCode;
        'Msg' in ersResult && delete ersResult.Msg;

        return ersResult;
    }
}

/**
 * 发送请求对象
 */
export default instance;
