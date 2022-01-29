<template>
    <div class="login-page">
        <!-- 右边背景以及插画 -->
        <div class="bg-box hidden-md-and-down">
            <div class="bg-img-box">
                <img class="img bg-img" src="@/assets/image/login/wave1.svg" draggable="false" />
            </div>
            <img class="inbetweening-img" src="@/assets/image/login/bg_login.svg" draggable="false" />
        </div>
        <!-- 登录表单 -->
        <div class="login-box">
            <el-form ref="loginFormRef" class="login-form" labelPosition="left" statusIcon :model="loginForm" :rules="rules">
                <el-form-item class="logo-box">
                    <img class="logo-img" src="@/assets/image/logo2.svg" draggable="false" />
                </el-form-item>
                <el-form-item prop="cid">
                    <BasicInput v-model="loginForm.cid" placeholder="请输入公司编码" tabindex="1" :maxlength="20" minlength="1" type="url">
                        <template #prefix>
                            <el-icon><IconOfficeBuilding></IconOfficeBuilding></el-icon>
                        </template>
                    </BasicInput>
                </el-form-item>
                <el-form-item prop="uid">
                    <BasicInput v-model="loginForm.uid" placeholder="请输入用户名" tabindex="1" :maxlength="20" minlength="1" type="url">
                        <template #prefix>
                            <el-icon><IconUser></IconUser></el-icon>
                        </template>
                    </BasicInput>
                </el-form-item>
                <el-form-item prop="passd">
                    <BasicInput v-model="loginForm.passd" placeholder="请输入密码" tabindex="2" showPassword type="password" @keyup.enter="handleLogin">
                        <template #prefix>
                            <el-icon><IconLock></IconLock></el-icon>
                        </template>
                    </BasicInput>
                </el-form-item>
                <el-form-item>
                    <el-button class="login-btn" :loading="loading" type="primary" @click="$fastDebounce(handleLogin)">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
    <div class="fixed-bg-box">
        <div class="stars">
            <div class="star"></div>
            <div class="star" style="top: 80px; left: 800px; animation-delay: 3s"></div>
            <div class="star" style="top: 40px; left: 646px; animation-delay: 2s"></div>
            <div class="star" style="top: 120px; left: 395px; animation-delay: 4s"></div>
            <div class="star" style="top: 160px; left: 765px; animation-delay: 1s"></div>
            <div class="star" style="top: 170px; left: 1200px; animation-delay: 2s"></div>
            <div class="star" style="top: 200px; left: 1000px; animation-delay: 1s"></div>
        </div>
    </div>
</template>

<script>
    export default { name: 'login' };
</script>

<script setup>
    import { shallowReactive, shallowRef, ref, onMounted, onBeforeUnmount } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import { useUserStore } from '@/store/modules/user.js';
    import { toast } from '@/utils/common-element-plus.js';
    const router = useRouter();
    const route = useRoute();
    const userStore = useUserStore();

    const loginFormRef = ref(null);
    const loginForm = shallowReactive({
        cid: '',
        uid: '',
        passd: ''
    });
    const loading = shallowRef(false);
    const rules = {
        cid: [
            { required: true, message: '企业ID不能为空', trigger: 'blur' },
            { min: 3, max: 20, message: '企业ID长度只能为1到20位', trigger: 'blur' }
        ],
        uid: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 1, max: 20, message: '用户名长度只能为1到20位', trigger: 'blur' }
        ],
        passd: [
            { required: true, message: '密码不能为空', trigger: 'blur' },
            { min: 1, max: 20, message: '密码长度只能为1到20位', trigger: 'blur' }
        ]
    };

    /**
     * 登录
     */
    const handleLogin = async () => {
        try {
            await loginFormRef.value.validate();
            loading.value = true;
            await userStore.login(loginForm);
            router.push(route.query.redirect || '/');
            loading.value = false;
        } catch (error) {
            loading.value = false;
            toast.error(error.msg || '登录失败，BD001');
            console.log('error :>> ', error);
        }
    };

    /**
     * 监听回车键
     */
    function keydownEvent(event) {
        if (event.code === 'Enter' || event.keyCode === 13) {
            handleLogin();
        }
    }
    onMounted(() => {
        document.addEventListener('keydown', keydownEvent);
        loginForm.cid = 'ys1000';
        if (import.meta.env.DEV) {
            loginForm.uid = 'mxp';
            loginForm.passd = 'qwerty';

            const ua = navigator.userAgent.toLocaleLowerCase();
            if (ua.match(/msie/) !== null || ua.match(/trident/) !== null) {
                loginForm.uid = 'mxp1'; // IE
            } else if (ua.match(/firefox/) !== null) {
                loginForm.uid = 'mxp2'; // 火狐
            } else if (ua.match(/ubrowser/) !== null) {
                loginForm.uid = 'mxp3'; // UC
            } else if (ua.match(/opera/) !== null) {
                loginForm.uid = 'mxp4'; // 欧朋
            } else if (ua.match(/bidubrowser/) !== null) {
                loginForm.uid = 'mxp5'; // 百度
            } else if (ua.match(/metasr/) !== null) {
                loginForm.uid = 'mxp6'; // 搜狗
            } else if (ua.match(/tencenttraveler/) !== null || ua.match(/qqbrowse/) !== null) {
                loginForm.uid = 'mxp7'; // QQ
            } else if (ua.match(/edg/) !== null) {
                loginForm.uid = 'mxp8'; // Microsoft Edge
            } else if (ua.match(/maxthon/) !== null) {
                loginForm.uid = 'mxp9'; // 遨游
            } else if (ua.match(/ chrome/) !== null) {
                loginForm.uid = 'mxp10'; // 谷歌【注意前面有空格】
            } else if (ua.match(/safari/) !== null) {
                loginForm.uid = 'mxp11'; // Safari
            }
        }
    });
    onBeforeUnmount(() => {
        document.removeEventListener('keydown', keydownEvent);
    });
</script>

<style lang="scss" scoped src="./login.scss"></style>
