<template>
    <BasicLoadView class="my-page-view" :loadType="false" padding="0px">
        <div class="page-box">
            <div class="logo-img-box">
                <img class="logo" src="@/assets/image/logo2.svg" draggable="false" />
            </div>
            <div class="introductionBox">
                <h2 class="title">公司介绍</h2>
                <p class="introduction">
                    重庆智联九创软件有限公司（以下简称"智联软件"），始创于2005年，是一家从事企业管理软件研发的高科技企业，专注于为通信行业提供尖端的信息化建设解决方案,是国内领先的通信行业信息化管理解决方案提供商。
                </p>
                <p class="introduction">
                    在移动通信行业管理软件方面，能够为客户提供成熟的、全面的解决方案。客户群体包括手机厂家、移动运营商、批发商、零售（连锁、卖场、柜台）等，在行业中具有良好的口碑。
                </p>
                <p class="introduction">
                    智联软件系统包含了业界公认的优秀管理思想，能够为管理层提供至关重要的科学的决策支持报表，使企业的管理实现“质”的飞跃，具体体现在：
                </p>
                <div class="group">
                    <p class="group-item em3">第一、梳理业务流程，提高工作效率。</p>
                    <p class="group-item em3">第二、强化内部管理，杜绝管理漏洞。</p>
                    <p class="group-item em3">第三、优化服务质量，提升客户满意度。</p>
                </div>
                <p class="introduction">
                    智联软件聚焦于客户关注的挑战和压力，以客户需求为导向，持续投入大量的资源对软件产品进行升级,不断保持创新精神，提供有竞争力的解决方案和服务，为客户创造最大的价值……
                </p>
            </div>
            <div class="introductionBox">
                <h2 class="title">企业使命</h2>
                <p class="introduction">一切为了帮助客户达成目标、实现梦想，以客户需求为导向，提供有竞争力的解决方案和服务，为客户创造价值。</p>
            </div>
            <div class="contactBox">
                <div class="title">联系方式</div>
                <div class="textBox">
                    <div class="key">客服邮箱：</div>
                    <div class="value">9csoft@zlt9.com</div>
                </div>
                <div class="textBox">
                    <div class="key">客服QQ1：</div>
                    <div class="value">3007369461</div>
                </div>
                <div class="textBox">
                    <div class="key">客服QQ2：</div>
                    <div class="value">3007369462</div>
                </div>
                <div class="textBox">
                    <div class="key">客服QQ3：</div>
                    <div class="value">3007369463</div>
                </div>
                <div class="textBox">
                    <div class="key">联系电话：</div>
                    <div class="value">023-88061240 转 802、803</div>
                </div>
            </div>
            <div style="height: 100px"></div>
        </div>
    </BasicLoadView>
</template>

<script>
    // eslint-disable-next-line vue/match-component-file-name
    export default { name: 'about-us' };
</script>

<style lang="scss" scoped>
    .my-page-view {
        @include flex(row, nowrap, flex-start, center, center);

        .page-box {
            display: block;
            width: 100%;
            height: 100%;
            padding: 10px 50px !important;
            overflow-y: scroll;
        }
    }

    /**
    * logo
    */
    .logo-img-box {
        @include flex(row, nowrap, center, center, center);
        width: 100%;
        padding: 20px 0px;
        padding-top: 60px;

        .logo {
            width: 75%;
            max-width: 400px;
        }
    }

    /**
    * 正文
    */
    .introductionBox,
    .contactBox {
        width: 100%;
        margin-top: 40px;

        .title {
            margin-bottom: 20px;
            font-size: 30px;
            font-weight: bolder;
            color: $color-33;
        }
    }

    .introductionBox {
        .introduction,
        .group-item {
            width: 100%;
            margin-top: 16px;
            font-size: 24px;
            line-height: 40px;
            color: $color-66;
            text-align: justify;
            text-indent: 2em;
            word-break: break-all;
        }

        .group {
            .group-item {
                margin-top: 0px;

                &.em3 {
                    text-indent: 4em;
                }
            }
        }
    }

    /**
    * 联系方式
    */
    .contactBox {
        .textBox {
            @include flex(row, wrap, flex-start, center, center);
            height: 40px;
            margin-top: 10px;

            .key {
                width: 6em;
                height: 40px;
                overflow: hidden;
                font-size: 24px;
                line-height: 40px;
                color: $color-33;
                text-align: justify; // 两端对齐

                &:after {
                    display: inline-block;
                    width: 100%;
                    content: '';
                }
            }

            .value {
                font-size: 24px;
                color: $color-33;
            }
        }
    }
</style>
