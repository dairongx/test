<template>
    <div class="seller">
        <div class="seller_top">
            <div class="name">
                <div class="name_left">
                    <h2>{{seller.name}}</h2>
                    <div class="rate">
                        <rate :size="12" :spacing="2" :score="seller.score"></rate>
                        <span>({{seller.rankRate}})</span>
                        <span>月售{{seller.sellCount}}单</span>
                    </div>
                </div>
                <div class="name_right">
                    <i class="icon-favorite"></i>
                    <span>已收藏</span>
                </div>
            </div>
            <div class="base_info">
                <div>
                    <p>起送价</p>
                    <p><span>{{seller.minPrice}}</span>元</p>
                </div>
                <div>
                    <p>商家配送</p>
                    <p><span>{{seller.deliveryPrice}}</span>元</p>
                </div>
                <div>
                    <p>平均配送时间</p>
                    <p><span>{{seller.deliveryTime}}</span>元</p>
                </div>
            </div>
        </div>
        <div class="activity">
            <h2>公告与活动</h2>
            <p>{{seller.bulletin}}</p>
            <div class="support" v-for="(item,index) in seller.supports" :key="index">
                <i :class="[Supports[item.type]]"></i>
                <p>{{item.description}}</p>
            </div>
        </div>
        <div class="album">
            <h2>商家实景</h2>
            <div>
                <ul class="clear wrap">
                    <li class="left" v-for="(item,index2) in seller.pics" :key="index2">
                        <img :src="item" alt="">
                    </li>
                </ul>
            </div>
        </div>
        <div class="info">
            <h2>商家信息</h2>
            <ul>
                <li v-for="(item,index2) in seller.infos" :key="index2">
                    {{item}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import rate from '@/components/rate/rate'
    import {mapState,mapActions} from 'vuex'

    export default {
        data() {
            return {
                Supports: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            }
        },
        computed:{
            ...mapState(['seller'])
        },
        components: {
            rate
        },
        methods:{
            ...mapActions(['getSeller']),
            async init(){
                await this.getSeller()
                this.$nextTick(() => {
                    let $width = document.querySelector('ul.wrap li').scrollWidth
                    document.querySelector('ul.wrap').style.width = $width * (this.seller.pics.length) + 'px'
                })
            }
        },
        created() {
            this.init()
        }
    }
</script>

<style lang="less" scoped>
    .seller {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f4f5f7;
        overflow-y: auto;
        & > div {
            margin-bottom: 32px;
            background-color: #fff;
            h2 {
                font-size: 28px;
                color: rgb(7, 17, 27);
                line-height: 28px;
                margin-bottom: 16px;
            }
            &:last-child {
                margin: 0;
            }
        }
        .seller_top {
            padding: 0 36px;
            .name {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 36px 0;
                border-bottom: 2px solid rgba(7, 17, 27, .1);

                .rate {
                    display: flex;
                    font-size: 20px;
                    color: rgb(77, 85, 93);
                    line-height: 36px;
                    span:nth-of-type(1) {
                        margin: 0 24px 0 16px;
                    }
                }
                .name_right {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    font-size: 20px;
                    color: rgb(77, 85, 93);
                    line-height: 20px;
                    i {
                        font-size: 48px;
                        color: rgb(240, 20, 20);
                        line-height: 48px;
                        margin-bottom: 8px;
                    }
                }
            }
            .base_info {
                display: flex;
                justify-content: space-around;
                text-align: center;
                padding: 36px 0;
                font-size: 20px;
                color: rgb(147, 153, 159);
                line-height: 20px;
                p:nth-child(2) {
                    margin-top: 8px;
                    span {
                        font-size: 48px;
                        color: rgb(7, 17, 27);
                        font-weight: 200;
                        line-height: 48px;
                    }
                }
            }
        }
        .activity {
            padding: 36px 36px 0;
            & > p {
                padding: 0 24px 32px;
                font-size: 24px;
                font-weight: 200;
                color: rgb(240, 20, 20);
                line-height: 48px;
            }
        }
        .support {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            padding: 32px 24px;
            border-top: 2px solid rgba(7, 17, 27, .1);
            &:last-child {
                border-bottom: 2px solid rgba(7, 17, 27, .1);
            }
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
            p {
                padding-left: 12px;
                font-size: 24px;
                font-weight: 200;
                color: rgb(7, 17, 27);
                line-height: 32px;
            }
        }
        .album {
            padding: 36px;
            h2 {
                margin-bottom: 24px;
            }
            div {
                height: 180px;
                overflow-y: hidden;
                overflow-x: auto;
            }
            li {
                width: 240px;
                height: 180px;
                padding-right: 12px;
                &:last-child {
                    margin-right: 0;
                }
                img {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .info {
            padding: 36px 36px 0;
            h2 {
                margin-bottom: 24px;
            }
            ul {
                li {
                    font-size: 24px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    line-height: 32px;
                    padding: 32px 24px;
                    border-top: 2px solid rgba(7, 17, 27, .1);
                }
            }
        }
    }
</style>