<template>
    <div class="error-container">
        <div class="error-content">
            <el-row :gutter="20">
                <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                    <div class="pic-error">
                        <el-image class="pic-error-parent" :src="Img403"></el-image>
                    </div>
                </el-col>
                <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
                    <div class="bullshit">
                        <div class="bullshit-oops">抱歉!</div>
                        <div class="bullshit-headline">您没有访问权限...</div>
                        <div class="bullshit-info">当前帐号没有权限访问该页面,请联系管理员。</div>
                        <RouterLink #default="{ navigate }" custom :to="{ path: redirectPath || '/' }">
                            <a class="bullshit-return-home" @click="$fastDebounce(navigate)">
                                <span v-if="haveHome" style="margin-right: 6px">{{ jumpTime }}s</span>
                                <span>{{ redirectPath ? '返回上一页' : '返回首页' }}</span>
                            </a>
                        </RouterLink>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default { name: 'err403' };
</script>

<script setup>
    import { onMounted, shallowRef } from 'vue';
    import { useRouterStore } from '@/store/modules/router.js';
    import { useRouter, useRoute, onBeforeRouteLeave } from 'vue-router';
    import Img403 from '@/assets/image/error-page/403.svg';

    const routerStore = useRouterStore();
    const route = useRoute();
    const router = useRouter();
    const haveHome = shallowRef(false);
    let timer = false;
    const jumpTime = shallowRef(5);
    const redirectPath = route.query && route.query.redirect && route.query.redirect.indexOf(route.fullPath || route.full) ? route.query.redirect : '';
    onMounted(() => {
        if (redirectPath) {
            haveHome.value = true;
            timer = setInterval(() => {
                if (jumpTime.value) {
                    jumpTime.value--;
                } else {
                    timer && clearInterval(timer);
                    timer = false;
                    router.push({ path: route.query.redirect || '/' });
                }
            }, 1000);
        } else {
            haveHome.value = false;
        }
    });
    onBeforeRouteLeave(() => {
        routerStore.delSingleTabs(route.fullPath);
        timer && clearInterval(timer);
        return true;
    });
</script>

<style lang="scss" scoped>
    .error-container {
        position: relative;
        min-height: 100vh;

        .error-content {
            position: absolute;
            top: 55%;
            left: 50%;
            width: 40vw;
            height: 400px;
            transform: translate(-50%, -50%);

            .pic-error {
                @include flex(row, nowrap, center, center, stretch);
                position: relative;
                float: left;
                width: 100%;
                height: 100%;
                overflow: hidden;

                &-parent {
                    width: 100%;
                }
            }

            .bullshit {
                @keyframes slideUp {
                    0% {
                        opacity: 0;
                        transform: translateY(60px);
                    }

                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                position: relative;
                float: left;
                width: 300px;
                padding: 30px 0;
                overflow: hidden;

                &-oops {
                    margin-bottom: 20px;
                    font-size: 32px;
                    font-weight: bold;
                    line-height: 40px;
                    color: #1890ff;
                    opacity: 0;
                    animation-name: slideUp;
                    animation-duration: 0.5s;
                    animation-fill-mode: forwards;
                }

                &-headline {
                    margin-bottom: 10px;
                    font-size: 20px;
                    font-weight: bold;
                    line-height: 24px;
                    color: #222222;
                    opacity: 0;
                    animation-name: slideUp;
                    animation-duration: 0.5s;
                    animation-delay: 0.1s;
                    animation-fill-mode: forwards;
                }

                &-info {
                    margin-bottom: 30px;
                    font-size: 13px;
                    line-height: 21px;
                    color: #13ce66;
                    opacity: 0;
                    animation-name: slideUp;
                    animation-duration: 0.5s;
                    animation-delay: 0.2s;
                    animation-fill-mode: forwards;
                }

                &-return-home {
                    display: block;
                    float: left;
                    width: 120px;
                    height: 36px;
                    font-size: 14px;
                    line-height: 36px;
                    color: #ffffff;
                    text-align: center;
                    cursor: pointer;
                    background: #1890ff;
                    border-radius: 100px;
                    opacity: 0;
                    animation-name: slideUp;
                    animation-duration: 0.5s;
                    animation-delay: 0.3s;
                    animation-fill-mode: forwards;
                }
            }
        }
    }
</style>
