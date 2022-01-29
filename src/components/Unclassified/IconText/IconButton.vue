<template>
    <div class="icon-text" :title="title" :style="{ padding: padding + 'px', color }">
        <el-icon v-if="loading" class="is-loading" :size="size" color="inherit">
            <IconLoading></IconLoading>
        </el-icon>
        <template v-else-if="icon">
            <i v-if="props.icon.indexOf('t9-icon-') === 0" :class="icon" :style="{ fontSize: size + 'px', lineHeight: size + 'px' }"></i>
            <el-icon v-if="props.icon.indexOf('Icon') === 0" :size="size" color="inherit">
                <Component :is="icon"></Component>
            </el-icon>
        </template>
    </div>
</template>

<script setup>
    const props = defineProps({
        icon: { type: String, default: '' },
        loading: { type: Boolean, default: false }, // 加载中
        size: { type: Number, default: 18 }, // 支持传入'default', 'large','small' 等固定尺寸或数字类型大小
        color: { type: String, default: 'inherit' }, // 图标和文字默认颜色
        title: { type: String, default: '' },
        padding: { type: Number, default: 6 } // 间距
    });
</script>

<style lang="scss" scoped>
    .icon-text {
        @include flex(row, nowrap, center, center, center);
        cursor: pointer;

        &:hover {
            color: $menu-active-text !important;
        }

        &:active {
            color: $menu-active-text !important;
        }
    }
</style>
