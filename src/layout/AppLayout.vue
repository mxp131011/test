<template>
    <section id="app-main" class="app-main">
        <RouterView #default="{ Component }">
            <Transition mode="out-in" name="fade-transform">
                <Component :is="Component" :key="route.fullPath"></Component>
            </Transition>
        </RouterView>
    </section>
</template>

<script setup>
    import { useRoute } from 'vue-router';
    const route = useRoute();
</script>
