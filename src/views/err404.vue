<template>
    <div style="background: #f0f; width: 100%; height: 100%">
        <RouterLink :to="{ path: '/err403' }">
            <a class="bullshit-return-home">
                <span>去403</span>
            </a>
        </RouterLink>
    </div>
</template>

<script>
    export default { name: 'err404' };
</script>

<script setup>
    import { onMounted } from 'vue';
    import { ElMessage } from 'element-plus';
    onMounted(() => {
        ElMessage({ showClose: true, grouping: true, message: 'aaaaaa' });
    });
</script>
