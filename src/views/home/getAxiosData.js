import $axios from '@/utils/axios/axios.js';

export const getAxiosData = async () => {
    try {
        const postData1 = {
            xskf: true, // 批发客户分析是否有显示
            xshy: true, // 会员数量分析是否有显示
            xscgqs: true, // 采购趋势是否有显示
            xslrzs: true, // 利润趋势分析是否有显示
            xsrwsl: true, // 利润趋势分析是否有显示
            xsrwlr: true // 利润趋势分析是否有显示})
        };
        const response = await Promise.all([$axios.post('xsfx_bb.do', { lx: '1' }), $axios.post('xsfx_bb.do', postData1)]);
        const response1 = response[0];
        const response2 = response[1];
        // 今日销售与利润
        const todayStatistics = {
            xsbz: Boolean(response1.xsbz),
            xsdw: response1.xsdw || '',
            xsje: response1.xsje || '0',
            xslrje: response1.xslrje || '0'
        };

        // 销售分析
        const xsfxData = {
            bz: Number(response2.hjjea) >= 100000 ? parseInt(response2.hjjea) : Number(response2.hjjea).toFixed(2),
            sz: Number(response2.hjjeb) >= 100000 ? parseInt(response2.hjjeb) : Number(response2.hjjeb).toFixed(2),
            dataset: getOptionData(response2.rData, response2.wkday)
        };

        // 批发客户分析相关 【先判断是否有权限】
        const pfkhData = !response2.pfkhfx_permission
            ? false
            : {
                  khsl: response2.khsl,
                  xzkf: response2.xzkf,
                  lskf: response2.lskf,
                  xz: { value: response2.xzl, name: '本周新增率', color: '#05c32b', bg: 'rgba(0,255,135,0.1)' },
                  ls: { value: response2.xzl, name: '本周流失率', color: '#ff2e31', bg: 'rgba(255,46,49,0.1)' }
              };
        // 采购趋势相关 【先判断是否有权限】
        const cgqsData = !response2.cgcs_permission
            ? false
            : {
                  cghjjea: response2.cghjjea,
                  cghjjeb: response2.cghjjeb,
                  dataset: getOptionData(response2.cgData, response2.wkday)
              };

        // 利润趋势相关 【先判断是否有权限】
        const lrqsData = !response2.lrcsfx_permission
            ? false
            : {
                  lrhjjea: response2.lrhjjea,
                  lrhjjeb: response2.lrhjjeb,
                  dataset: getOptionData(response2.lrData, response2.wkday)
              };

        // 会员分析相关 【先判断是否有权限】
        const hyfxData = !response2.hyslfx_permission
            ? false
            : {
                  hysl: response2.hysl,
                  hyxz: response2.hyxz,
                  hyls: response2.hyls,
                  xz: { value: response2.hyxzl, name: '本周新增率', color: '#05c32b', bg: 'rgba(0,255,135,0.1)' },
                  ls: { value: response2.hylsl, name: '本周复购率', color: '#ff2e31', bg: 'rgba(255,46,49,0.1)' }
              };
        // 任务统计
        const { rwslData, rwlrData } = trimRWListData(response2.rwData, response2.rwtj_sl_permission, response2.rwtj_lr_permission);

        return Promise.resolve({
            xsfxData, // 本周和上周销售图表
            pfkhData, // 批发客户分析
            cgqsData, // 采购趋势
            lrqsData, // 利润趋势
            hyfxData, // 会员分析
            rwslData, // 任务数量
            rwlrData, // 任务利润
            todayStatistics
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

/**
 * 得到图表配置的数据相关部分
 */
function getOptionData(arr, week) {
    const op = { series: [], xAxis: { data: week } };
    arr.forEach((item) => {
        op.series.push({ name: item.name, data: item.data.slice(0, 7) });
    });
    return op;
}

/**
 * 整理任务数据
 */
function trimRWListData(list, is_sl, is_lr) {
    if (Array.isArray(list) && list.length > 0) {
        let rw_zs_wcsl = 0;
        let rw_zs_rwsl = 0;
        let rw_zs_wclr = 0;
        let rw_zs_rwlr = 0;
        const rw_l_list = [];
        const rw_r_list = [];
        list.forEach((item) => {
            item.wcsl = item.wcsl !== '' && !isNaN(item.wcsl) ? Number(item.wcsl) : 0;
            item.rwsl = item.rwsl !== '' && !isNaN(item.rwsl) ? Number(item.rwsl) : 0;
            item.wclr = item.wclr !== '' && !isNaN(item.wclr) ? Number(item.wclr) : 0;
            item.rwlr = item.rwlr !== '' && !isNaN(item.rwlr) ? Number(item.rwlr) : 0;

            if (is_sl) {
                const wcl = item.wcsl === 0 || item.rwsl === 0 ? '0.00' : ((item.wcsl / item.rwsl) * 100).toFixed(2);
                rw_zs_wcsl += item.wcsl;
                rw_zs_rwsl += item.rwsl;
                rw_l_list.push({ name: item.name, wcsl: item.wcsl, rwsl: item.rwsl, wcl });
            }
            if (is_lr) {
                const wcl = item.wclr === 0 || item.rwlr === 0 ? '0.00' : ((item.wclr / item.rwlr) * 100).toFixed(2);
                rw_zs_wclr += item.wclr;
                rw_zs_rwlr += item.rwlr;
                rw_r_list.push({ name: item.name, wcsl: item.wclr, rwsl: item.rwlr, wcl });
            }
        });
        const obj = { rwslData: false, rwlrData: false };
        if (rw_l_list.length > 0) {
            obj.rwslData = { rw_zs_wcsl, rw_zs_rwsl, rw_l_list };
        }
        if (rw_r_list.length > 0) {
            obj.rwlrData = { rw_zs_wclr, rw_zs_rwlr, rw_r_list };
        }
        return obj;
    } else {
        return { rwslData: false, rwlrData: false };
    }
}
