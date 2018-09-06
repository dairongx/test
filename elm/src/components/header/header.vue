<template>
    <div class="header" v-if="seller">
        <div class="header_top">
            <div class="left img">
                <img :src="seller.avatar" alt="">
            </div>
            <div class="left info">
                <div class="title">
                    <img src="@/assets/img/brand@3x.png" alt="">
                    <p>{{seller.name}}</p>
                </div>
                <div class="express">
                    {{seller.description}}/{{seller.deliveryTime}}分钟送达
                </div>
                <div class="support">
                    <i :class="[Supports[seller.supports[0].type]]"></i>
                    <p>{{seller.supports[0].description}}</p>
                </div>
            </div>
            <div class="more clear" @click="detailShow=true">
                <span class="left">{{seller.supports.length}}个</span>
                <span class="icon-keyboard_arrow_right left"></span>
            </div>
        </div>
        <div class="header_bottom">
            <img src="@/assets/img/bulletin@3x.png" alt="">
            <p class="notice">{{seller.bulletin}}</p>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <transition name="fade">
            <div class="wrap" v-show="detailShow">
                <div class="content">
                    <div class="main">
                        <h1>{{seller.name}}</h1>
                        <rate :score="seller.foodScore" class="rate"></rate>
                        <h2>优惠信息</h2>
                        <div class="supports">
                            <div class="support" v-for="(item,index2) in seller.supports" :key="index2">
                                <i :class="[Supports[item.type]]"></i>
                                <p>{{item.description}}</p>
                            </div>
                        </div>
                        <h2>商家公告</h2>
                        <p class="bulletin">{{seller.bulletin}}</p>
                    </div>
                    <div class="close">
                        <i class="icon-close" @click="detailShow=false"></i>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import rate from '@/components/rate/rate'

    export default {
        name: 'vHeader',
        props:{
            seller: {
                type: Object
            },
        },
        data() {
            return {
                Supports: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
                detailShow: false
            }
        },
        components: {
            rate
        },
    }
</script>

<style lang="less" scoped>
    .header {
        width: 100%;
        .header_top {
            position: relative;
            height: 128px;
            padding: 48px 0 36px 48px;
            background-color: rgba(7, 17, 27, .3);
            .img {
                width: 128px;
                height: 128px;
                border-radius: 4px;
                margin-right: 32px;
                overflow: hidden;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .info {
                color: #fff;
            }
            .more {
                position: absolute;
                right: 24px;
                bottom: 36px;
                padding: 14px 16px;
                background-color: rgba(0, 0, 0, .2);
                border-radius: 24px;
                overflow: hidden;
                span {
                    font-size: 20px;
                    line-height: 24px;
                    font-weight: 200;
                    color: #fff;
                    &:first-child {
                        margin-right: 4px;
                    }
                }
            }
        }
        .info {
            position: relative;
            padding-top: 4px;
            .title {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 16px;
                img {
                    height: 32px;
                }
                p {
                    padding-left: 12px;
                    font-size: 32px;
                    font-weight: bold;
                    line-height: 36px;
                }
            }
            .express {
                font-size: 24px;
                font-weight: 200;
                line-height: 24px;
                margin-bottom: 20px;
            }
            .support {
                i {
                    width: 20px;
                    height: 20px;
                    margin-right: 8px;
                    background-size: 20px 20px;
                }
                p {
                    font-size: 20px;
                    font-weight: 200;
                    line-height: 24px;
                }
            }
        }
        .support {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            i {
                display: block;
                width: 32px;
                height: 32px;
                margin-right: 12px;
                background-size: 32px 32px;
                background-repeat: no-repeat;
                overflow: hidden;
                &.decrease {
                    background-image: url("../../assets/img/decrease_2@3x.png");
                }
                &.discount {
                    background-image: url("../../assets/img/discount_2@3x.png");
                }
                &.guarantee {
                    background-image: url("../../assets/img/guarantee_2@3x.png");
                }
                &.invoice {
                    background-image: url("../../assets/img/invoice_2@3x.png");
                }
                &.special {
                    background-image: url("../../assets/img/special_2@3x.png");
                }
            }
        }
        .header_bottom {
            display: flex;
            justify-content: flex-start;
            align-content: center;
            height: 56px;
            padding: 0 24px;
            line-height: 56px;
            background-color: rgba(7, 17, 27, .5);
            color: #fff;
            font-weight: 200;
            font-size: 20px;
            img {
                height: 36px;
                margin-top: 10px;
            }
            p {
                flex: auto;
                padding: 0 8px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            i {
                line-height: 56px;
            }
        }
    }

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(7, 17, 27, .8);
        overflow-y: auto;
        z-index: 1000;
        .content {
            display: flex;
            flex-direction: column;
            width: 100%;
            min-height: 100%;
            color: #fff;
            .main {
                flex: 1;
                padding: 128px 72px;
                h1 {
                    text-align: center;
                    font-size: 32px;
                    font-weight: 700;
                    line-height: 32px;
                }
                .rate {
                    margin: 32px auto 56px;
                    text-align: center;
                }
                h2 {
                    position: relative;
                    text-align: center;
                    font-size: 30px;
                    font-weight: 700;
                    line-height: 30px;
                    margin-bottom: 48px;
                    &::after, &::before {
                        position: absolute;
                        content: ' ';
                        top: 14px;
                        width: 224px;
                        height: 2px;
                        background-color: rgba(255, 255, 255, .2);
                    }
                    &::after {
                        left: -24px
                    }
                    &::before {
                        right: -24px;
                    }
                }
                .supports {
                    margin-bottom: 32px;
                    .support {
                        padding-left: 24px;
                        margin-bottom: 24px;
                    }
                    p {
                        font-size: 24px;
                        font-weight: 200;
                        line-height: 24px;
                    }
                }
                .bulletin {
                    padding: 48px 24px 0;
                    font-size: 24px;
                    line-height: 48px;
                    font-weight: 200;
                }
            }
            .close {
                flex: 0;
                height: 128px;
                margin-top: -128px;
                text-align: center;
                font-size: 64px;
                color: rgba(255, 255, 255, .5);
            }
        }
    }
</style>