<template>
    <el-dropdown class="avatar-container" size="default" style="display: block">
        <div class="avatar-wrapper" title="个人中心">
            <el-image :src="avatarImg" class="user-avatar"></el-image>
        </div>
        <template #dropdown>
            <el-dropdown-menu class="user-dropdown">
                <RouterLink :to="{ path: '/about-us' }">
                    <el-dropdown-item style="width: 200px">
                        <IconText text="个人中心" icon="t9-icon-profile"></IconText>
                    </el-dropdown-item>
                </RouterLink>
                <RouterLink :to="{ path: '/about-us' }">
                    <el-dropdown-item>
                        <IconText text="关于我们" icon="t9-icon-qiye"></IconText>
                    </el-dropdown-item>
                </RouterLink>
                <RouterLink to="/">
                    <el-dropdown-item>
                        <IconText text="修改密码" icon="t9-icon-mima"></IconText>
                    </el-dropdown-item>
                </RouterLink>
                <RouterLink to="/">
                    <el-dropdown-item>
                        <IconText text="数据更新" icon="t9-icon-yunduan"></IconText>
                    </el-dropdown-item>
                </RouterLink>
                <RouterLink to="/">
                    <el-dropdown-item>
                        <IconText text="用户设置" icon="t9-icon-yonghushezhi"></IconText>
                    </el-dropdown-item>
                </RouterLink>
                <el-dropdown-item class="user-dropdown-item" @click="$fastDebounce(logout)">
                    <IconText color="#ff0000" text="退出登录" icon="t9-icon-shutdown"></IconText>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup>
    import { useUserStore } from '@/store/modules/user.js';
    import { useRoute, useRouter } from 'vue-router';
    import avatarImg from '@/assets/image/account/avatar.svg';

    const router = useRouter();
    const route = useRoute();

    const userStore = useUserStore();
    const logout = () => {
        userStore.logout();
        router.push(`/login?redirect=${route.fullPath}`);
    };
</script>

<style lang="scss" scoped>
    .avatar-wrapper {
        @include flex(row, nowrap, center, center, center);
        padding: 0px 4px;
        cursor: pointer;

        .user-avatar {
            display: inline-block;
            width: 26px;
            height: 26px;
            border-radius: 20px;
            border: 1px solid #fff;
            &:hover {
                border: 1px solid var(--el-color-primary);
            }
        }
    }
</style>
