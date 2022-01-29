/**
 * jason数据导出excel
 *  参数如下：
  {
        multiHeader: [['标题1', '标题2'], ['标题2', '标题4']], // 多行标题
        header: ['标题1', '标题2'], // 普通标题
        data: [['小明', '12岁'], ['小芳', '13岁']], //  表格数据
        fileName:'报表202111011221', // 文件名称
        merges: ['A1:B1', 'A2:B2', 'A1:B1'], // 需要合并的单元格
        fileType: 'xlsx', // 保存类型 支持： 'csv','txt','xlsx'
        autoWidth: true // 是否自动宽度

    }
 */
export async function export2Table({ multiHeader = [], header, data, fileName, merges = [], autoWidth = true, fileType = 'xlsx' } = {}) {
    try {
        fileName = fileName ? `${fileName}.${fileType}` : `excel_${new Date().getTime()}.${fileType}`;
        if (Array.isArray(header) && header.length > 0) {
            data.unshift(header);
        }
        for (let i = multiHeader.length - 1; i > -1; i--) {
            data.unshift(multiHeader[i]);
        }
        const XLSX = await import('xlsx/xlsx.mini.js');
        const wb = XLSX.utils.book_new();
        const ws_name = 'SheetJS';
        const ws = XLSX.utils.aoa_to_sheet(data);
        // 合并单元格
        if (merges.length > 0) {
            if (!ws['!merges']) {
                ws['!merges'] = [];
            }
            merges.forEach((item) => {
                ws['!merges'].push(XLSX.utils.decode_range(item));
            });
        }
        autoWidth && autoWidthFunc(ws, data);
        XLSX.utils.book_append_sheet(wb, ws, ws_name);
        await XLSX.writeFile(wb, fileName);

        return Promise.resolve(true);
    } catch (error) {
        console.log('错误信息====', error);
        return Promise.reject(true);
    }
}

/**
 * 自适应宽度
 */
function autoWidthFunc(ws, data) {
    // 设置worksheet每列的最大宽度
    const colWidth = data.map((row) => {
        return row.map((val) => {
            if (val === null || typeof val === 'undefined') {
                // 先判断是否为null/undefined
                return { wch: 10 };
            } else if (val.toString().charCodeAt(0) > 255) {
                // 再判断是否为中文
                return { wch: val.toString().length * 2 };
            } else {
                return { wch: val.toString().length };
            }
        });
    });

    /* 以第一行为初始值*/
    const result = colWidth[0];
    for (let i = 1; i < colWidth.length; i++) {
        for (let j = 0; j < colWidth[i].length; j++) {
            if (result[j].wch < colWidth[i][j].wch) {
                result[j].wch = colWidth[i][j].wch;
            }
        }
    }
    ws['!cols'] = result;
}
