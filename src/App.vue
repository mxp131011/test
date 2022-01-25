<template>
    <el-config-provider :locale="zhCn" size="small" :button="config">
        <RouterView></RouterView>
    </el-config-provider>
</template>

<script setup>
    import { shallowReactive } from 'vue';
    import zhCn from 'element-plus/lib/locale/lang/zh-cn';

    const config = shallowReactive({
        autoInsertSpace: true
    });
</script>
