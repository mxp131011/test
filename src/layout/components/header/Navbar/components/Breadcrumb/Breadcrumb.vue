<template>
    <div class="breadcrumb-box">
        <el-breadcrumb separator="/">
            <TransitionGroup appear name="breadcrumb">
                <el-breadcrumb-item
                    v-for="item in matchedParentList"
                    :key="item.path"
                    :to="item.redirect && route.path !== item.redirect ? { path: item.redirect } : ''"
                >
                    <i class="icon" :class="item.meta.icon"></i>
                    <span class="text">{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </TransitionGroup>
        </el-breadcrumb>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';
    import { getAllRoutesList, getParentTitleList } from '@/router/router.js';
    const route = useRoute();
    const routesList = getAllRoutesList();

    const matchedParentList = computed(() => {
        const matched = getParentTitleList(route.path, routesList);
        return matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
    });
</script>

<style lang="scss" scoped>
    .breadcrumb-box {
        @include flex(row, nowrap, center, center, center);
        height: 100%;
        margin-left: 10px;

        .el-breadcrumb {
            display: inline-block;
            font-size: 14px;

            .icon {
                margin-right: 4px;
            }

            :deep(.is-link) {
                font-weight: normal;
                color: #26adfc;
            }
        }
    }
</style>
