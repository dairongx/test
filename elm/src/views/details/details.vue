<template>
    <div class="details" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd"
         @touchcancel="touchCancel">
        <div class="back" @click="$router.go(-1)"><i class="icon-arrow_lift"></i></div>
        <div>
            <div class="img">
                <img :src="food.image" alt="">
            </div>
            <div class="box base">
                <h2>{{food.name}}</h2>
                <p class="sellCount">
                    <span>月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                </p>
                <p class="price">
                    <span>￥{{food.price}}</span>
                    <span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                </p>
                <div class="add">
                    <button v-show="food.count==0" @click="add">加入购物车</button>
                    <add v-show="food.count>0" :food="food" :parent="detailsData.parent" :child="detailsData.child"></add>
                </div>

            </div>
            <div class="box product">
                <h2>商品介绍</h2>
                <p v-if="food.info">{{food.info}}</p>
                <p v-else>暂无介绍</p>
            </div>
        </div>
        <rate-list :rating="food.ratings"></rate-list>
    </div>
</template>

<script>
    import rateList from '@/components/rateList/rateList'
    import add from '@/components/add/add'
    import {mapState,mapMutations} from 'vuex'

    export default {
        name: 'vDetails',
        computed: {
            ...mapState(['goods']),
            detailsData() {
                return JSON.parse(sessionStorage.getItem('detailsData')) || {}
            },
            food(){
                return this.goods[this.detailsData.parent].foods[this.detailsData.child]
            }
        },
        data() {
            return {}
        },
        components: {
            rateList,add
        },
        methods: {
            ...mapMutations({
                cartCount: 'cartCount',
                cartList: 'cartList'
            }),
            touchStart(e) {
                this.flag = true
                this.startX = e.touches[0].clientX
                this.startY = e.touches[0].clientY
            },
            touchMove(e) {
                if (this.flag) {
                    this.moveX = e.touches[0].clientX
                    this.moveY = e.touches[0].clientY
                    this.x = this.moveX - this.startX
                    this.y = Math.abs(this.moveY - this.startY)
                }
            },
            touchEnd() {
                if (this.flag) {
                    if (this.x > 50 && this.y < 30) {
                        this.$router.go(-1)
                    }
                }
                this.touchCancel()

            },
            touchCancel() {
                this.flag = false
                this.startX = null
                this.moveX = null
                this.x = null
                this.startY = null
                this.moveY = null
                this.y = null
            },
            add() {
                this.cartCount({
                    parent: this.detailsData.parent,
                    child: this.detailsData.child,
                    count: ++this.food.count
                })
                this.cartList()
            },
        }
    }
</script>

<style lang="less" scoped>
    .details {
        position: fixed;
        bottom: 100px;
        left: 0;
        top: 0;
        right: 0;
        background-color: #f3f5f7;
        overflow-y: auto;
        z-index: 998;
        & > div {
            width: 100%;
        }
        .img {
            width: 100%;
            height: 750px;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .box {
            position: relative;
            padding: 36px;
            border-bottom: 2px solid rgba(7, 17, 27, .1);
            background-color: #fff;
            h2 {
                font-size: 28px;
                color: rgb(7, 17, 27);
                line-height: 28px;
                padding-bottom: 16px;
            }
        }
        .base {
            margin-bottom: 32px;
            h2 {
                font-size: 28px;
                font-weight: 700;
                color: rgb(7, 17, 27);
                line-height: 28px;
                padding-bottom: 16px;
            }
            .sellCount {
                font-size: 20px;
                color: rgb(147, 153, 159);
                line-height: 20px;
                span {
                    margin-right: 24px;
                }
            }
            .price {
                padding-top: 36px;
                span:nth-child(1) {
                    font-size: 28px;
                    color: rgb(240, 20, 20);
                    line-height: 48px;
                }
                span:nth-child(2) {
                    text-decoration: line-through;
                }
            }
            .add {
                position: absolute;
                bottom: 36px;
                right: 36px;
                button{
                    width: 148px;
                    height: 48px;
                    border-radius: 24px;
                    border: none;
                    font-size: 20px;
                    color: #fff;
                    line-height: 24px;
                    outline: none;
                    background-color: rgb(0, 160, 220);
                }
            }
        }
        .product {
            margin-bottom: 32px;
            p {
                font-size: 24px;
                font-weight: 200;
                color: rgb(77, 85, 93);
                line-height: 48px;
            }
        }
        .rating {
            padding: 36px 36px 0 36px;
            ul {
                display: flex;
                border-bottom: 2px solid rgba(7, 17, 27, .1);
                li {
                    padding: 16px 24px;
                    margin: 24px 16px 36px 0;
                    font-size: 24px;
                    color: #fff;
                    line-height: 32px;
                    border-radius: 2px;
                    span {
                        font-size: 16px;
                    }
                    &:nth-child(1) {
                        background-color: rgb(0, 160, 220);
                    }
                    &:nth-child(2) {
                        color: rgb(77, 85, 93);
                        background-color: rgba(0, 160, 220, .2);
                    }
                    &:nth-child(3) {
                        color: rgb(77, 85, 93);
                        background-color: rgba(77, 85, 93, .2);
                    }
                }
            }
            div {
                display: flex;
                align-items: center;
                font-size: 24px;
                color: rgb(147, 153, 159);
                line-height: 48px;
                padding: 24px 0;
                i {
                    font-size: 48px;
                    line-height: 48px;
                }
            }
        }
        .back{
            position: fixed;
            top: 30px;
            left: 30px;
            width: 60px;
            height: 60px;
            line-height: 60px;
            text-align: center;
            font-size: 30px;
            border-radius: 50%;
            color: #fff;
            background-color: rgba(0,0,0,.3);
            z-index: 9999;
        }
    }
</style>