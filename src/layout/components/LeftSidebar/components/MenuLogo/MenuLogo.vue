<template>
    <div class="sidebar-logo-container">
        <Transition name="sidebarLogoFade">
            <RouterLink key="expand" class="sidebar-logo-link" to="/">
                <el-image :src="logo1Img" class="sidebar-logo"></el-image>
                <div v-if="sidebarCollapse" class="title-box">
                    <span class="title">{{ APP_TITLE }}</span>
                    <span class="website">{{ APP_WEBSITE }}</span>
                </div>
            </RouterLink>
        </Transition>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useViewStore } from '@/store/modules/view.js';
    import logo1Img from '@/assets/image/logo/logo1.svg';

    const viewStore = useViewStore();
    import { APP_TITLE, APP_WEBSITE } from '@/config/config.js';
    const sidebarCollapse = computed(() => viewStore.sidebarCollapse);
</script>

<style lang="scss" scoped src="./MenuLogo.scss"></style>
