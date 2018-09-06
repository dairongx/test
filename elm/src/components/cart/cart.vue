<template>
    <div class="cart" v-if="seller">
        <div class="img" @click="show">
            <i class="icon-shopping_cart" :class="{'highlight':cartLists.length>0}"></i>
            <span v-if="cartLists.length>0">{{cartLists.length}}</span>
        </div>
        <div class="price">
            <p>￥{{price}}</p>
            <p>另需配送费￥{{seller.deliveryPrice}}元</p>
        </div>
        <div class="btn" :class="[enough]">{{text}}</div>
        <div class="wrap" v-show="listShow&&cartLists.length>0" id="wrapper" @click="hide($event)">
            <div class="orderList" v-if="cartLists.length>0" id="order">
                <div class="top">
                    <span>购物车</span>
                    <span class="clear" @click="clear">清空</span>
                </div>
                <ul>
                    <li v-for="(item,index) in cartLists" :key="index">
                        <span>{{item.name}}</span>
                        <add :food="item" :parent="item.parent" :child="item.child"></add>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import add from '@/components/add/add'
    import {mapState,mapMutations} from 'vuex'

    export default {
        props: {
            seller: {
                type: Object
            },
        },
        data() {
            return {
                listShow: false
            }
        },
        components: {
            add
        },
        computed: {
            ...mapState(['cartLists']),
            price() {
                let p = 0
                this.cartLists.forEach(el => {
                    p += el.count * el.price
                })
                return p
            },
            text() {
                let minPrice = this.seller.minPrice
                if (this.price == 0) {
                    return `￥${minPrice}元起送`
                } else if (this.price < minPrice) {
                    let diff = minPrice - this.price
                    return `还差￥${diff}元起送`;
                } else {
                    return '去结算';
                }
            },
            enough() {
                let minPrice = this.seller.minPrice
                if (this.price > minPrice) {
                    return 'enough'
                }
                return ''
            }
        },
        methods: {
            ...mapMutations(['clearCart']),
            show() {
                if (this.cartLists.length > 0) {
                    this.listShow = !this.listShow
                }
            },
            hide(e) {
                if (e.target.id == 'wrapper') {
                    this.listShow = false
                }
            },
            clear(){
                this.clearCart()
                this.listShow = false
            }
        }
    }
</script>

<style lang="less" scoped>
    .cart {
        position: fixed;
        display: flex;
        justify-content: space-between;
        align-items: center;
        bottom: 0;
        left: 0;
        width: 100%;
        background-color: #141c27;
        z-index: 999;
        .img {
            position: relative;
            width: 80px;
            height: 80px;
            padding: 10px;
            margin-left: 36px;
            border-radius: 50%;
            transform: translateY(-16px);
            background-color: #141c27;
            z-index: 999;
            i {
                display: inline-block;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                font-size: 48px;
                color: rgba(255, 255, 255, .5);
                line-height: 80px;
                text-align: center;
                overflow: hidden;
                background-color: #2b343d;
                &.highlight {
                    background: rgb(0, 160, 220);
                    color: #fff;
                }
            }
            span {
                position: absolute;
                top: 0;
                right: 0;
                width: 48px;
                height: 48px;
                line-height: 48px;
                text-align: center;
                border-radius: 24px;
                font-size: 9px;
                font-weight: 700;
                color: #fff;
                background: rgb(240, 20, 20);
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
            }
        }
        .price {
            display: flex;
            color: rgba(255, 255, 255, .4);
            font-size: 32px;
            font-weight: 700;
            line-height: 48px;
            p:nth-child(1) {
                padding-right: 24px;
                border-right: 1px solid rgba(255, 255, 255, .1);
            }
            p:nth-child(2) {
                padding-left: 24px;
                font-size: 24px;
            }
        }
        .btn {
            width: 210px;
            height: 100px;
            font-size: 26px;
            color: rgba(255, 255, 255, .4);
            font-weight: 700;
            line-height: 100px;
            text-align: center;
            background-color: #2b343d;
            &.enough {
                background: #00b43c;
                color: #fff;
            }
        }
    }

    .wrap {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 100px;
        width: 100%;
        z-index: 998;
        background-color: rgba(7, 17, 27, .6);
        .orderList {
            position: absolute;
            bottom: 0;
            width: 100%;
            background-color: #fff;
            .top {
                display: flex;
                height: 80px;
                justify-content: space-between;
                padding: 0 36px;
                background-color: #f3f5f7;
                border-bottom: 2px solid rgba(7, 17, 27, .1);
                span {
                    line-height: 80px;
                    font-size: 28px;
                    font-weight: 200;
                    color: rgb(7, 17, 27);
                    &.clear {
                        font-size: 24px;
                        font-weight: 700;
                        color: rgb(0, 160, 220);
                    }
                }
            }
            ul {
                max-height: 520px;
                padding: 0 36px 48px;
                overflow-y: auto;
            }
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                height: 96px;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
            }
        }
    }
</style>