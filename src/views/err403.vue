<template>
    <div style="background: #f00; width: 100%; height: 100%">
        <RouterLink :to="{ path: '/err404' }">
            <a class="bullshit-return-home">
                <span>去404</span>
            </a>
        </RouterLink>
    </div>
</template>

<script>
    export default { name: 'err403' };
</script>

<script setup>
    import { onMounted } from 'vue';
    import { ElMessage } from 'element-plus';
    onMounted(() => {
        ElMessage({ showClose: true, grouping: true, message: 'aaaaaa' });
    });
</script>
