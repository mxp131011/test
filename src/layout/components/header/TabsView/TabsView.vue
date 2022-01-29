<!-- 标签栏 -->
<!-- 标签栏 -->
<template>
    <div class="tabs-view-box">
        <div class="tabs-box">
            <el-tabs :modelValue="routePath" type="card" @tabRemove="handleTabRemove">
                <el-tab-pane v-for="tab in tabViews" :key="tab.path" :closable="!tab.meta || !tab.meta.affix" :name="tab.path">
                    <template #label>
                        <div
                            class="tabs-view-item"
                            @click.stop.prevent="$fastDebounce(handleTabClick, tab.fullPath || tab.path)"
                            @click.middle="handleTabRemove(tab.path, $event)"
                            @contextmenu="openContextMenuTap(tab, $event)"
                        >
                            <i v-if="tab.meta && tab.meta.icon" class="icon" :class="tab.meta.icon"></i>
                            <span class="title">{{ (tab.meta && tab.meta.title) || tab.name }}</span>
                        </div>
                    </template>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="action-box">
            <el-space wrap :size="4">
                <!-- 刷新当前页面 -->
                <RefreshRouter class="action"></RefreshRouter>
                <!-- 页面全屏 -->
                <PageFullScreen></PageFullScreen>
                <!-- 关闭页面以及tab -->
                <CloseTabs ref="closeTabsRef" class="action"></CloseTabs>
            </el-space>
        </div>
    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import { useRouterStore } from '@/store/modules/router.js';
    import { ref, watch, computed } from 'vue';
    import CloseTabs from './components/CloseTabs/CloseTabs.vue';
    import PageFullScreen from './components/PageFullScreen/PageFullScreen.vue';
    import RefreshRouter from './components/RefreshRouter/RefreshRouter.vue';
    const router = useRouter();
    const route = useRoute();
    const routerStore = useRouterStore();
    const closeTabsRef = ref(null);

    // 显示的路由
    const tabViews = computed(() => routerStore.tabViews);

    // 路径
    const routePath = computed(() => route.path);

    // 初始化
    const affixTabs = filterAffixTabs(router.options.routes);
    affixTabs.forEach((tab) => {
        routerStore.addSingleTabs(tab);
    });
    routerStore.addSingleTabs(route);

    watch(
        () => routePath.value,
        () => {
            routerStore.addSingleTabs(route);
        }
    );

    // el-tabs子菜单被点击 （跳转路由）
    const handleTabClick = (fullPath) => {
        fullPath !== route.fullPath && router.push(fullPath);
    };
    // el-tabs子菜单关闭按钮被点击或 （用于关闭当前页面）
    const handleTabRemove = (_path) => {
        tabViews.value.some((tab) => {
            const isAffix = Boolean(tab.meta && tab.meta.affix);
            const isHave = Boolean(!isAffix && _path === tab.path);
            isHave && closeTabsRef.value.closeSelectedTab(tab);
            return isHave;
        });
    };

    /**
     * 右键关闭
     */
    function openContextMenuTap(tab, event) {
        closeTabsRef.value.openContextMenu(tab, event);
    }

    // 得到固定的routes 即在route.meta.affix=true
    function filterAffixTabs(_routes) {
        let tabs = [];
        _routes.forEach((_route) => {
            _route.meta && _route.meta.affix && tabs.push(_route);
            if (Array.isArray(_route.children) && _route.children.length > 0) {
                tabs = tabs.concat(filterAffixTabs(_route.children, _route.path));
            }
        });
        return tabs;
    }
</script>

<style lang="scss" scoped src="./TabsView.scss"></style>
