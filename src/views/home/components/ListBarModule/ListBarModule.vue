<template>
    <view class="list-bar-module-box">
        <view class="box" :style="{ color }">
            <CountTo class="numb" :endVal="Number(numb)" :decimals="2" forcedDecimals></CountTo>
            <span class="unit">{{ unit }}</span>
        </view>
        <view class="name-box">
            <span class="small">{{ name }}</span>
        </view>
    </view>
</template>

<script setup>
    defineProps({
        name: { type: String, required: true },
        numb: { type: [String, Number], required: true },
        unit: { type: String, default: '元' },
        color: { type: String, required: true }
    });
</script>

<style lang="scss" scoped>
    .list-bar-module-box {
        @include flex(column, nowrap, center, center, center);

        width: 100%;
        height: 44px;
        padding: 0 10px;

        .box {
            .numb {
                font-size: 16px;
                font-weight: bolder;
            }

            .unit {
                margin-left: 2px;
                font-size: 12px;
            }
        }

        .name-box {
            margin-top: 4px;
            font-size: 12px;
            color: #666666;
        }
    }
</style>
