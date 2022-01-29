<template>
    <section id="app-main" class="app-main">
        <RouterView v-if="isInit" #default="{ Component }">
            <Transition mode="out-in" name="fade-transform">
                <KeepAlive :include="newCachedRouteName" :max="20">
                    <Component :is="Component" :key="routerKey"></Component>
                </KeepAlive>
            </Transition>
        </RouterView>
    </section>
</template>

<script setup>
    import { computed, shallowRef, nextTick, onMounted, onUnmounted } from 'vue';
    import { $mitt, GLOBAL_INITIALIZE_ROUTE_MITT, GLOBAL_REFRESH_ROUTE_MITT } from '@/utils/mitt-event.js';
    import { useRouterStore } from '@/store/modules/router.js';
    import { useRoute, useRouter } from 'vue-router';
    const route = useRoute();
    const router = useRouter();
    const routerStore = useRouterStore();
    const cachedRouteName = computed(() => routerStore.cachedRouteName);
    const refreshRouteName = shallowRef('');
    const isInit = shallowRef(true);
    const newCachedRouteName = computed(() => cachedRouteName.value.filter((item) => item !== refreshRouteName.value));
    const routerKey = computed(() => (refreshRouteName.value ? '' : route.fullPath || route.path));

    onMounted(() => {
        // 初始化
        $mitt.on(GLOBAL_INITIALIZE_ROUTE_MITT, () => {
            routerStore.delAllTabs().then(() => {
                router.push('/');
                isInit.value = false;
                nextTick(() => {
                    isInit.value = true;
                });
            });
        });

        // 刷新
        $mitt.on(GLOBAL_REFRESH_ROUTE_MITT, () => {
            refreshRouteName.value = route.name;
            nextTick(() => {
                refreshRouteName.value = '';
            });
        });
    });
    onUnmounted(() => {
        $mitt.off(GLOBAL_INITIALIZE_ROUTE_MITT);
        $mitt.off(GLOBAL_REFRESH_ROUTE_MITT);
    });
</script>

<style lang="scss" scoped>
    .app-main {
        display: block;
        width: 100%;
        height: auto;
        min-height: calc(100vh - #{$header-height});
        overflow-x: hidden;
        background: $bg;
    }
</style>
