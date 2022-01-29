<template>
    <div class="left-sidebar">
        <div class="logo-box"><MenuLogo></MenuLogo></div>
        <div class="menu-box">
            <div class="search-box"></div>
            <el-scrollbar :max-height="`calc(100vh - ${headerHeight + 30}px)`">
                <el-menu
                    :router="true"
                    :uniqueOpened="true"
                    :collapse="!sidebarCollapse"
                    :defaultActive="route.path"
                    backgroundColor="#fff"
                    :textColor="menuText"
                    :activeTextColor="menuActiveText"
                >
                    <SidebarItem
                        v-for="routeItem in routes"
                        :key="routeItem.path || routeItem.name"
                        :item="routeItem"
                        :role="role"
                        :basePath="routeItem.path"
                    ></SidebarItem>
                </el-menu>
            </el-scrollbar>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { getAllRoutesList } from '@/router/router.js';
    import MenuLogo from './components/MenuLogo/MenuLogo.vue';
    import SidebarItem from './components/SidebarItem/SidebarItem.vue';
    import { menuText, menuActiveText, headerHeight } from '@/styles/export.js';
    import { useRoute } from 'vue-router';
    import { useViewStore } from '@/store/modules/view.js';
    import { useUserStore } from '@/store/modules/user.js';
    const viewStore = useViewStore();
    const userStore = useUserStore();
    const route = useRoute();
    const role = computed(() => userStore.role);
    const routes = getAllRoutesList();
    const sidebarCollapse = computed(() => viewStore.sidebarCollapse);
</script>

<style lang="scss" scoped>
    .left-sidebar {
        @include flex(column, nowrap, flex-start, stretch, stretch);
        height: 100%;

        .logo-box {
            @include flex(row, nowrap, center, center, center);
            width: 100%;
            height: $header-height;
            min-height: $header-height;
            overflow: hidden;
        }

        .menu-box {
            @include flex(column, nowrap, flex-start, stretch, stretch);
            box-sizing: border-box;
            flex: 1;
            height: 100%;
            border-right: 1px solid #eeeeee;

            .search-box {
                @include flex(row, nowrap, center, flex-start, center);
                width: 100%;
                height: 30px;
            }

            .el-scrollbar {
                flex: 1;
                height: 100%;
                // 侧边栏菜单高度改为40px
                :deep(.el-menu) {
                    $menu-height: 40px;
                    .el-menu-item {
                        height: $menu-height;
                        line-height: $menu-height;
                    }
                    .el-sub-menu {
                        .el-sub-menu__title {
                            height: $menu-height;
                            line-height: $menu-height;
                        }
                    }
                }
            }
        }
    }
</style>
