<template>
    <el-popover placement="bottom" trigger="click" :width="260">
        <template #reference>
            <el-badge type="danger" :value="badge" :hidden="!badge">
                <IconButton :size="18" color="#000000" icon="t9-icon-tongzhi" title="通知"></IconButton>
            </el-badge>
        </template>
        <div v-if="notices && notices.length > 0" class="notice-list">
            <el-scrollbar>
                <ul>
                    <li v-for="(item, index) in notices" :key="index">
                        <el-avatar :size="45" :src="item.image"></el-avatar>
                        <span>{{ item.notice }}</span>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
        <el-empty v-else description="暂无消息" :imageSize="80"></el-empty>
        <div v-if="notices && notices.length > 0" class="notice-clear" @click="$fastDebounce(handleClearNotice)">
            <el-button type="text" icon="IconDelete">清空消息</el-button>
        </div>
    </el-popover>
</template>

<script setup>
    import { shallowRef } from 'vue';
    const notices = shallowRef([]);
    const badge = shallowRef(0);

    const handleClearNotice = () => {
        badge.value = null;
        notices.value = [];
    };
</script>

<style lang="scss" scoped>
    .el-badge {
        display: block;
        text-align: center;
    }

    .el-empty {
        width: 100%;
        height: 29vh;
    }

    .notice-clear {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 10px 0 0;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        border-top: 1px solid #e8eaec;

        i {
            margin-right: 3px;
        }
    }
</style>
