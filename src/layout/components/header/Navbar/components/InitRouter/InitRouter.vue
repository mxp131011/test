<template>
    <IconButton
        :size="18"
        color="#000000"
        icon="t9-icon-chongzhi"
        :class="isInitIng ? 'butt-rotate-animation' : ''"
        title="全部重置"
        @click="$fastDebounce(initEventClick)"
    ></IconButton>
</template>

<script setup>
    import { shallowRef } from 'vue';
    import { $mitt, GLOBAL_INITIALIZE_ROUTE_MITT } from '@/utils/mitt-event.js';

    // 是否正在初始化 （用于控制旋转动画）
    const isInitIng = shallowRef(false);
    // 初始化路由事件
    const initEventClick = () => {
        if (!isInitIng.value) {
            isInitIng.value = true;
            setTimeout(() => {
                isInitIng.value = false;
            }, 1000);
            $mitt.emit(GLOBAL_INITIALIZE_ROUTE_MITT, '');
        }
    };
</script>
