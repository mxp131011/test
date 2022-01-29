<template>
    <IconButton
        :icon="isFullscreen ? 't9-icon-neibusuoxiao' : 't9-icon-neibufangda'"
        :size="16"
        color="#666666"
        :title="isFullscreen ? '退出全屏' : '全屏显示'"
        @click="$fastDebounce(fullscreenClick)"
    ></IconButton>
</template>

<script setup>
    import { computed } from 'vue';
    import { useViewStore } from '@/store/modules/view.js';
    const viewStore = useViewStore();
    const isFullscreen = computed(() => viewStore.pageFullScreenState);
    // 监听全屏改变事件
    const fullscreenClick = () => {
        viewStore.setPageFullScreen();
    };
</script>
