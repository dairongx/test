<template>
    <div class="ratings">
        <div class="seller clear" v-if="seller">
            <div class="left seller_left">
                <p>{{seller.score}}</p>
                <p>综合评分</p>
                <p>高于周边商家{{seller.rankRate}}%</p>
            </div>
            <div class="left seller_right">
                <p>商品评价
                    <rate class="rate" :size="12" :spacing="3" :score="seller.foodScore" :showScore="true"></rate>
                </p>
                <p>服务态度
                    <rate class="rate" :size="12" :spacing="3" :score="seller.serviceScore" :showScore="true"></rate>
                </p>
                <p>送达时间 <span>{{seller.deliveryTime}}分钟</span></p>
            </div>
        </div>
        <rate-list :rating="ratings"></rate-list>
    </div>
</template>

<script>
    import rate from '@/components/rate/rate'
    import rateList from '@/components/rateList/rateList'
    import {mapState,mapActions} from 'vuex'

    export default {
        data() {
            return {
                hasContent: true
            }
        },
        components: {
            rate,rateList
        },
        computed:{
            ...mapState(['ratings','seller'])
        },
        created() {
            this.getRatings()
            this.getSeller()
        },
        methods:{
            ...mapActions(['getRatings','getSeller'])
        }
    }
</script>

<style lang="less" scoped>
    .ratings {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #f4f5f7;
        overflow-y: auto;
        .seller {
            padding: 36px 0;
            background-color: #fff;
            margin-bottom: 32px;
            .seller_left {
                width: 275px;
                text-align: center;
                border-right: 1px solid rgba(7, 17, 27, .1);
                p:nth-child(1) {
                    font-size: 48px;
                    color: rgb(255, 153, 0);
                    line-height: 56px;
                    padding-bottom: 12px;
                }
                p:nth-child(2) {
                    font-size: 24px;
                    color: rgb(7, 17, 27);
                    line-height: 24px;
                }
                p:nth-child(3) {
                    font-size: 20px;
                    color: rgb(147, 153, 159);
                    line-height: 20px;
                    padding: 16px 0 12px;
                }
            }
            .seller_right {
                padding: 0 48px;
                p {
                    display: flex;
                    align-items: center;
                    font-size: 24px;
                    color: rgb(7, 17, 27);
                    line-height: 36px;
                    margin-bottom: 16px;
                    &:last-child {
                        margin: 0;
                        span {
                            color: rgb(147, 153, 159);
                            margin-left: 24px;
                        }
                    }
                    .rate {
                        margin-left: 24px;
                    }
                }
            }
        }
    }
</style>