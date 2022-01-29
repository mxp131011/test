<template>
    <template v-if="isShow && ((!item.alwaysShow && childrenArr.length === 1) || childrenArr.length === 0)">
        <el-menu-item v-if="onlyOneChild && onlyOneChild.meta" :index="onlyOneChild.path" :class="{ 'menu-item-nest': !isNest }">
            <i class="menu-item-icon" :class="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"></i>
            <template #title>
                <span class="menu-item-title">{{ onlyOneChild.meta.title }}</span>
            </template>
        </el-menu-item>
    </template>

    <el-sub-menu v-else-if="isShow" :index="item.path" popperAppendToBody>
        <template #title>
            <i v-if="item.meta" class="menu-item-icon" :class="item.meta.icon"></i>
            <span class="menu-item-title">{{ item.meta.title }}</span>
        </template>
        <SidebarItem
            v-for="child in childrenArr"
            :key="child.path || child.name"
            :isNest="true"
            :item="child"
            :role="role"
            :basePath="child.path"
        ></SidebarItem>
    </el-sub-menu>
</template>

<script setup>
    import { computed } from 'vue';
    import { haveRouterPermission } from '@/utils/permission.js';
    const props = defineProps({
        isNest: { type: Boolean, default: false },
        role: { type: Array, required: true },
        item: { type: Object, required: true }
    });

    const isPermission = (menu) => Boolean(!menu.hidden && haveRouterPermission(menu, props.role));
    // 是否有权限显示
    const isShow = computed(() => isPermission(props.item));
    // 所有有权限显示的子菜单
    const childrenArr = computed(() => (props.item.children ? props.item.children.filter((item) => isPermission(item)) : []));

    const onlyOneChild = computed(() => {
        if (childrenArr.value.length === 1) {
            return childrenArr.value[0];
        }
        // 如果没有子路由器显示，则显示父路由器
        if (childrenArr.value.length === 0) {
            return { ...props.item };
        }
        return false;
    });
</script>

<style lang="scss" scoped>
    $height: 46px;

    .el-sub-menu .el-menu-item {
        min-width: 100%;
    }

    .el-menu-item {
        @include flex(row, nowrap, flex-start, center, center);
        width: 100%;
        min-width: 100%;
        height: $height;
        line-height: $height;
    }

    .el-menu-item.is-active {
        color: $menu-active-text !important;
    }

    .el-menu-item:hover {
        background-color: $menu-hover-bg !important;
    }

    :deep() {
        .el-sub-menu__title {
            @include flex(row, nowrap, flex-start, center, center);
            height: $height;
            line-height: $height;
        }

        .el-sub-menu__title:hover {
            background-color: $menu-hover-bg !important;
        }
    }

    .menu-item-icon {
        margin-right: 8px;
        font-size: 16px !important;
    }

    .menu-item-title {
        font-size: 14px !important;
    }
</style>
