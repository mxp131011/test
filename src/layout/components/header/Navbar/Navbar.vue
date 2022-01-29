<template>
    <div class="navbar">
        <!-- 展开或收起侧边栏 -->
        <div class="sidebar-butt" @click="$fastDebounce(toggleSideBarClick)">
            <i
                class="icon"
                :class="sidebarCollapse ? 't9-icon-caidanshouqi' : 't9-icon-caidanzhankai'"
                :title="sidebarCollapse ? '关闭侧边栏' : '展开侧边栏'"
            ></i>
        </div>
        <!-- 面包屑 -->
        <Breadcrumb v-show="!isMobile" class="breadcrumb-container"></Breadcrumb>
        <div class="right-menu">
            <el-space wrap>
                <!-- 重置路由 -->
                <InitRouter></InitRouter>
                <!-- 通知 -->
                <MyNotice></MyNotice>
                <!-- 全屏按钮 -->
                <AppFullScreen></AppFullScreen>
                <!-- 个人中心 -->
                <PersonalCenter></PersonalCenter>
            </el-space>
        </div>
    </div>
</template>

<script setup>
    import { useViewStore } from '@/store/modules/view.js';
    import { useRoute } from 'vue-router';
    import { computed, shallowRef, watch } from 'vue';
    import Breadcrumb from './components/Breadcrumb/Breadcrumb.vue';
    import InitRouter from './components/InitRouter/InitRouter.vue';
    import AppFullScreen from './components/AppFullScreen/AppFullScreen.vue';
    import MyNotice from './components/MyNotice/MyNotice.vue';
    import PersonalCenter from './components/PersonalCenter/PersonalCenter.vue';

    const viewStore = useViewStore();
    const isMobile = computed(() => viewStore.isMobile);
    const sidebarCollapse = computed(() => viewStore.sidebarCollapse);
    const searchHD = shallowRef('');
    const route = useRoute();

    watch(
        () => route.fullPath,
        () => {
            searchHD.value = '';
        }
    );

    /**
     * 展开或收起侧边栏
     */
    const toggleSideBarClick = () => viewStore.toggleSideBar();
</script>

<style lang="scss" scoped>
    .navbar {
        width: 100%;
        height: 100%;
        overflow: hidden;

        .sidebar-butt {
            @include flex(row, nowrap, center);
            float: left;
            width: 40px;
            height: 100%;
            cursor: pointer;

            .icon {
                font-size: 20px;
                color: #000000;
                transition: background 0.3s;
            }

            &:hover {
                .icon {
                    color: $menu-active-text;
                }
            }
        }

        .breadcrumb-container {
            float: left;
        }

        .right-menu {
            @include flex(row, nowrap, flex-end, center, center);
            height: 100%;
            line-height: 30px;
            color: #666666;
        }
    }
</style>
