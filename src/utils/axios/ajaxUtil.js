import $axios from '@/utils/axios/axios.js';

// 定义类
class ajaxUtil {
    constructor(size = 40, page = 1) {
        this.page = page; // 页码
        this.size = size; // 每页加载多少条
    }

    /**
     * 刷新或首次加载
     * @param {String} url 请求的url
     * @param {Object} data 请求携带的参数
     * @param {Object} options 额外的配置项
     *  @returns 请求的结果
     */
    async post(url, data = {}, options = {}) {
        try {
            this.page = 1;
            // 注意扩展顺序一定不能弄反 ...data一定在最后
            const newData = { Page: this.page, Size: this.size, ...data };
            const response = await $axios.post(url, newData, options);
            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }

    /**
     * 加载更多
     * @param {String} url 请求的url
     * @param {Object} data 请求携带的参数
     * @param {Object} options 额外的配置项
     *  @returns 请求的结果
     */
    async morePost(url, data = {}, options = {}) {
        try {
            data.Page = this.page + 1;
            data.Size = this.size;
            const response = await $axios.post(url, data, options);
            this.page++;
            return Promise.resolve(response);
        } catch (err) {
            return Promise.reject(err);
        }
    }
}
export default ajaxUtil;
