import { watch, ref, nextTick, onBeforeUnmount } from 'vue';

/**
 * 得到 表格的高度
 */
export function getTableHeight(tableBoxRef, pageLoad) {
    const tableHeight = ref(0);
    const myObserver = new ResizeObserver(() => {
        setTableHeight();
    });
    let timeout = false;
    watch(
        () => pageLoad.loadType,
        (loadType) => {
            if (!loadType) {
                nextTick(() => {
                    if (tableBoxRef.value) {
                        tableHeight.value = tableBoxRef.value.clientHeight;
                    }
                    tableBoxRef.value && myObserver.observe(tableBoxRef.value);
                });
            } else {
                myObserver.disconnect();
            }
        }
    );

    onBeforeUnmount(() => {
        myObserver.disconnect();
    });

    /**
     * 设置表格的高度
     */
    function setTableHeight() {
        timeout && clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (tableBoxRef.value) {
                tableHeight.value = tableBoxRef.value.clientHeight;
            }
        }, 80);
    }

    return tableHeight;
}
