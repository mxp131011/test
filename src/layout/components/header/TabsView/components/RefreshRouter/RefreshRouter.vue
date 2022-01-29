<template>
    <IconButton
        icon="t9-icon-gengxin"
        title="刷新本页"
        color="#666666"
        :class="isRefresIng ? 'butt-rotate-animation' : ''"
        :size="16"
        @click="$fastDebounce(refreshEventClick)"
    ></IconButton>
</template>

<script setup>
    import { shallowRef } from 'vue';
    import { $mitt, GLOBAL_REFRESH_ROUTE_MITT } from '@/utils/mitt-event.js';

    // 是否正在刷新 （用于控制旋转动画）
    const isRefresIng = shallowRef(false);
    // 刷新路由事件
    const refreshEventClick = () => {
        if (!isRefresIng.value) {
            isRefresIng.value = true;
            setTimeout(() => {
                isRefresIng.value = false;
            }, 1000);
            $mitt.emit(GLOBAL_REFRESH_ROUTE_MITT, '');
        }
    };
</script>
