<template>
    <div class="page-header" shadow="never">
        <el-image :src="avatarImg" class="page-header-avatar"></el-image>
        <div class="page-header-tip">
            <p class="page-header-tip-title">{{ tips }}</p>
            <p class="page-header-tip-description">{{ description }}</p>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useUserStore } from '@/store/modules/user.js';
    import avatarImg from '@/assets/image/account/avatar.svg';
    const userStore = useUserStore();

    const nickname = computed(() => userStore.nickname);
    const tips = computed(() => {
        const hour = new Date().getHours();
        if (hour < 9) {
            return `早上好${nickname.value}，又是元气满满的一天。`;
        } else if (hour <= 11) {
            return `上午好${nickname.value}，看到你我好开心。`;
        } else if (hour <= 13) {
            return `中午好${nickname.value}，忙碌了一上午，记得吃午饭哦。`;
        } else if (hour < 17) {
            return `下午好${nickname.value}，你一定有些累了，喝杯咖啡提提神。`;
        } else if (hour < 21) {
            return `晚上好${nickname.value}，愿你天黑有灯，下雨有伞。`;
        } else {
            return `深夜好${nickname.value}，工作了一天了早点休息吧！`;
        }
    });
    const description = '智联T9，您的资深管家，我们温馨提醒您，遇到问题请及时联系QQ客服，我们有专业的售后团队为您解决您的烦恼！';
</script>

<style lang="scss" scoped>
    .page-header {
        @include flex(row, nowrap, flex-start, center, center);
        padding: 20px;
        background: #ffffff;
        border-radius: $border-10;

        box-shadow: $box-shadow;

        .page-header-avatar {
            margin-right: 16px;
            font-size: 50px;
            width: 50px;
            height: 50px;
        }

        .page-header-tip {
            .page-header-tip-title {
                font-size: 20px;
                font-weight: bolder;
                line-height: 20px;
                color: $color-33;
            }

            .page-header-tip-description {
                margin-top: 10px;
                font-size: 13px;
                line-height: 13px;
                color: $color-66;
            }
        }
    }
</style>
