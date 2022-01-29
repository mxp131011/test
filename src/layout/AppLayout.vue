<template>
    <div class="app-container">
        <div v-show="!pageFullScreenState" class="aside" :style="{ width }">
            <LeftSidebar></LeftSidebar>
        </div>
        <div class="container">
            <div class="header" :style="{ height: headerHeight + 'px' }">
                <Navbar v-show="!pageFullScreenState"></Navbar>
                <TabsView></TabsView>
            </div>
            <div class="main">
                <AppMain></AppMain>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { useViewStore } from '@/store/modules/view.js';
    import { computed } from 'vue';
    import LeftSidebar from './components/LeftSidebar/LeftSidebar.vue';
    import TabsView from './components/header/TabsView/TabsView.vue';
    import Navbar from './components/header/Navbar/Navbar.vue';
    import AppMain from './components/AppMain/AppMain.vue';
    import { sideBarWidthShow, sideBarWidthHide } from '@/styles/export.js';
    const viewStore = useViewStore();
    const pageFullScreenState = computed(() => viewStore.pageFullScreenState);
    const width = computed(() => `${viewStore.sidebarCollapse ? sideBarWidthShow : sideBarWidthHide}px`);
    const headerHeight = computed(() => viewStore.headerHeight);
</script>

<style lang="scss" scoped>
    .app-container {
        @include flex(row, nowrap, flex-start, stretch, stretch);
        width: 100vw;
        height: 100vh;
        background: $bg;

        .aside {
            position: sticky;
            top: 0;
            height: 100%;
            background: $menu-bg;
            transition: width 0.3s;
        }

        .container {
            @include flex(column, nowrap, flex-start, stretch, stretch);
            flex: 1;

            .header {
                @include flex(column, nowrap, flex-start, stretch, stretch);
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                padding: 0px 10px !important;
                background: #ffffff;
                border-bottom: 1px solid #eeeeee;
            }

            .main {
                flex: 1;
                padding: 0px;
            }
        }
    }
</style>
