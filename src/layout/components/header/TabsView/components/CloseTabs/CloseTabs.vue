<template>
    <div>
        <!-- 弹出框 -->
        <BubblePopups ref="BubblePopupsRef" :width="108" :height="120" :zIndex="2000">
            <ul class="context-menu-box">
                <li class="menu" @click.stop.prevent="$fastDebounce(handleContextMenu, 'closeOthersTabs')">
                    <IconText text="关闭其他" icon="IconCircleClose"></IconText>
                </li>
                <li class="menu" @click.stop.prevent="$fastDebounce(handleContextMenu, 'closeLeftTabs')">
                    <IconText text="关闭左侧" icon="IconBack"></IconText>
                </li>
                <li class="menu" @click.stop.prevent="$fastDebounce(handleContextMenu, 'closeRightTabs')">
                    <IconText text="关闭右侧" icon="IconRight"></IconText>
                </li>
                <li class="menu" @click.stop.prevent="$fastDebounce(handleContextMenu, 'closeAllTabs')">
                    <IconText text="关闭全部" icon="IconRemove"></IconText>
                </li>
            </ul>
        </BubblePopups>

        <!-- dropdown -->
        <el-dropdown size="default" @command="handleCommand">
            <IconButton icon="t9-icon-caidan" :size="16" color="#666666" title="关闭菜单"></IconButton>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="closeOthersTabs">
                        <IconText text="关闭其他" icon="IconCircleClose"></IconText>
                    </el-dropdown-item>
                    <el-dropdown-item command="closeLeftTabs">
                        <IconText text="关闭左侧" icon="IconBack"></IconText>
                    </el-dropdown-item>
                    <el-dropdown-item command="closeRightTabs">
                        <IconText text="关闭右侧" icon="IconRight"></IconText>
                    </el-dropdown-item>
                    <el-dropdown-item command="closeAllTabs">
                        <IconText text="关闭全部" icon="IconRemove"></IconText>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
    </div>
</template>

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import { ref, shallowReactive } from 'vue';
    import { useRouterStore } from '@/store/modules/router.js';
    const router = useRouter();
    const route = useRoute();
    const routerStore = useRouterStore();
    const beasData = shallowReactive({ contextMenuTab: false });

    // 下拉菜单（ el-dropdown）的子项被点击
    const closeTabAction = (command, tab) => {
        switch (command) {
            case 'closeOthersTabs':
                closeOthersTabs();
                break;
            case 'closeLeftTabs':
                closeLeftTabs(tab);
                break;
            case 'closeRightTabs':
                closeRightTabs(tab);
                break;
            case 'closeAllTabs':
                closeAllTabs();
                break;
        }
    };

    // 下拉菜单（ el-dropdown）的子项被点击
    const handleCommand = (command) => {
        closeTabAction(command, route);
    };

    const BubblePopupsRef = ref(null);
    const openContextMenu = (tab, event) => {
        beasData.contextMenuTab = tab;
        BubblePopupsRef.value.show(event.currentTarget);
    };
    const handleContextMenu = (command) => {
        BubblePopupsRef.value.hide();
        closeTabAction(command, beasData.contextMenuTab);
    };

    // 跳转到最后一个tab页面
    function openLastTabRoute(res) {
        // 如果当前路由不在tabs中才跳转到最后一个
        const index = res.findIndex((item) => item.fullPath === route.fullPath);
        if (index < 0) {
            const lastTab = res.length >= 1 ? res[res.length - 1] : {};
            const path = lastTab.fullPath ? lastTab.fullPath : '/';
            lastTab.fullPath !== route.fullPath && router.push(path);
        }
    }

    // 关闭右侧页面
    function closeRightTabs(selected) {
        routerStore.delRightTabs(selected).then((res) => {
            openLastTabRoute(res);
        });
    }
    // 关闭左侧页面
    function closeLeftTabs(selected) {
        routerStore.delLeftTabs(selected).then((res) => {
            openLastTabRoute(res);
        });
    }
    // 关闭选中的页面 (本页面)
    function closeSelectedTab(selected) {
        routerStore.delSingleTabs(selected).then((res) => {
            openLastTabRoute(res);
        });
    }
    // 关闭其它页面
    function closeOthersTabs() {
        routerStore.delOthersTabs(route).then((res) => {
            openLastTabRoute(res);
        });
    }
    // 关闭全部页面
    function closeAllTabs() {
        routerStore.delAllTabs().then(() => {
            router.push('/');
        });
    }
    // 暴露出去的方法或属性
    defineExpose({ closeSelectedTab, openContextMenu });
</script>

<style lang="scss" scoped>
    .context-menu-box {
        .menu {
            height: 30px;
            padding: 0 14px;
            font-size: 14px;
            line-height: 30px;
            color: #666666;

            &:hover {
                color: $zsd;
                background: $menu-hover-bg;
            }

            .icon {
                margin-right: 6px;
            }
        }
    }
</style>
