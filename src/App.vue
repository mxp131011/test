<template>
    <div>{{ aaa }}</div>
</template>

<script setup>
    import { shallowReactive } from 'vue';
    const config = shallowReactive({
        aaa: 'aaaa'
    });
</script>
