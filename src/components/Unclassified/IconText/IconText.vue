<template>
    <div class="icon-text">
        <!-- 加载菊花 -->
        <template v-if="loading">
            <el-icon class="is-loading" :color="color" :style="{ marginRight: margin + 'px' }" :size="newSize.iconSize">
                <IconLoading></IconLoading>
            </el-icon>
        </template>
        <!-- 前边图标 -->
        <template v-if="!loading && icon">
            <i
                v-if="props.icon.indexOf('t9-icon-') === 0"
                :class="icon"
                :style="{ color, fontSize: newSize.iconSize, lineHeight: newSize.iconSize, marginRight: margin + 'px' }"
            ></i>
            <el-icon v-if="props.icon.indexOf('Icon') === 0" :color="color" :size="newSize.iconSize" :style="{ marginRight: margin + 'px' }">
                <Component :is="icon"></Component>
            </el-icon>
        </template>
        <!-- 文字 -->
        <span v-if="text" :style="{ fontSize: newSize.fontSize, lineHeight: newSize.fontSize, whiteSpace, color, marginLeft: 0 }">
            {{ text }}
        </span>
        <!-- 后边图标 -->
        <template v-if="rIcon">
            <i
                v-if="props.rIcon.indexOf('t9-icon-') === 0"
                :class="rIcon"
                :style="{ color, fontSize: newSize.iconSize, lineHeight: newSize.iconSize, marginLeft: margin + 'px' }"
            ></i>
            <i v-if="props.rIcon.indexOf('Icon') === 0" :style="{ marginLeft: margin + 'px' }">
                <el-icon :color="color" :size="newSize.iconSize">
                    <Component :is="rIcon"></Component>
                </el-icon>
            </i>
        </template>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    const props = defineProps({
        icon: { type: String, default: '' },
        rIcon: { type: String, default: '' },
        loading: { type: Boolean, default: false }, // 加载中
        size: { type: [String, Number], default: 'small', validator: (val) => ['default', 'large', 'small'].includes(val) || typeof val === 'number' }, // 支持传入'default', 'large','small' 等固定尺寸或数字类型大小
        textSize: { type: Number, default: 0 }, // 图标和文字默认大小 （图标默认比文字大2像素）
        iconSize: { type: Number, default: 0 }, // 图标和文字默认大小 （图标默认比文字大2像素）
        color: { type: String, default: 'inherit' }, // 图标和文字默认颜色
        text: { type: String, default: '' },
        margin: { type: Number, default: 6 }, // 间距
        whiteSpace: { type: String, default: 'nowrap' } // 文字的whiteSpace样式（主要用于控制文字换行）
    });

    /**
     * 最终大小
     */
    const newSize = computed(() => {
        const size = typeof props.size === 'number' ? props.size : ['default', 'large'].includes(props.size) ? 14 : 12;
        return {
            textSize: (props.textSize > 6 ? props.textSize : size) + 'px',
            iconSize: (props.iconSize > 6 ? props.iconSize : size) + 'px'
        };
    });
</script>

<style lang="scss" scoped>
    .icon-text {
        @include flex(row, nowrap, center, center, center);
    }
</style>
