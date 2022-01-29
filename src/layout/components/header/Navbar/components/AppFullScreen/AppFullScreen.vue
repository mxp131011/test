<template>
    <IconButton
        :size="18"
        color="#000000"
        :title="isFullscreen ? '退出全屏' : '全屏显示'"
        :icon="isFullscreen ? 't9-icon-quanjusuoxiao' : 't9-icon-quanjufangda'"
        @click="$fastDebounce(fullscreenClick)"
    ></IconButton>
</template>

<script setup>
    import { useViewStore } from '@/store/modules/view.js';
    import { computed } from 'vue';
    const viewStore = useViewStore();
    const isFullscreen = computed(() => viewStore.appFullScreenState);
    // 监听全屏改变事件
    const fullscreenClick = () => {
        viewStore.setAppFullScreen();
    };
</script>
