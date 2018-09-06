<template>
    <div class="goods" v-if="goods">
        <div class="wrap">
            <div ref="menu" class="menu">
                <ul>
                    <li v-for="(item,index) in goods"
                        :key="index"
                        :class="['menu_item',currentIndex==index?'on':'']"
                        @click="select(index,$event)">
                        <p><i v-if="item.type>0" :class="[menuType[item.type]]"></i>{{item.name}}</p>
                    </li>
                </ul>
            </div>
            <div ref="list" class="list">
                <ul>
                    <li v-for="(item,parent) in goods" :key="item.name" class="item">
                        <p class="title">{{item.name}}</p>
                        <ul class="foods">
                            <li v-for="(food,child) in item.foods" :key="food.name">
                                <div class="food_img" @click="getDetails(parent,child)">
                                    <img :src="food.icon" alt="">
                                </div>
                                <div class="food_info" @click="getDetails(parent,child)">
                                    <h3>{{food.name}}</h3>
                                    <p class="description" v-if="food.description">{{food.description}}</p>
                                    <p class="sellCount">
                                        <span>月售{{food.sellCount}}份</span>
                                        <span>好评率{{food.rating}}%</span>
                                    </p>
                                    <p class="price">
                                        <span>￥{{food.price}}</span>
                                        <span v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                    </p>
                                </div>
                                <add class="num" :food="food" :parent="parent" :child="child"></add>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <transition name="toLeft">
            <router-view/>
        </transition>
    </div>
</template>

<script>
    import add from '@/components/add/add'
    import vDetails from '@/views/details/details'
    import Bscroll from 'better-scroll'
    import {mapState, mapActions} from 'vuex'

    export default {
        data() {
            return {
                menuType: ['special', 'discount', 'decrease', 'guarantee', 'invoice'],
                on: 0,
                scrollY: 0,
                listHeight: []
            }
        },
        components: {
            add, vDetails
        },
        created() {
            this.init()
        },
        computed: {
            ...mapState({
                goods: 'goods'
            }),
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i]
                    let height2 = this.listHeight[i + 1]
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i
                    }
                }
                return 0
            }
        },
        methods: {
            ...mapActions({
                getGoods: 'getGoods'
            }),
            async init() {
                await this.getGoods()
                this.$nextTick(() => {
                    this.Scroll()
                    this.calcHeight()
                })
            },
            getDetails(parent,child) {
                let data = {parent,child}
                sessionStorage.setItem('detailsData', JSON.stringify(data))
                this.$router.push('/goods/details')
            },
            Scroll() {
                this.menuScroll = new Bscroll(this.$refs.menu, {
                    click: true
                })
                this.listScroll = new Bscroll(this.$refs.list, {
                    click: true,
                    probeType: 3
                })

                this.listScroll.on('scroll', (res) => {
                    this.scrollY = Math.abs(Math.round(res.y))
                })
            },
            calcHeight() {
                let list = this.$refs.list.getElementsByClassName('item')
                let height = 0
                this.listHeight.push(height)
                for (let i = 0; i < list.length; i++) {
                    let item = list[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
            select(index, event) {
                if (!event._constructed) {
                    return
                }
                let foodList = this.$refs.list.getElementsByClassName('item');
                let el = foodList[index];
                this.listScroll.scrollToElement(el, 300);
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .wrap {
            display: flex;
            height: 100%;
        }
        .menu {
            flex: 0 0 160px;
            height: 100%;
            background-color: #f4f5f7;
            overflow: hidden;
            /*overflow-y: auto;*/
            .menu_item {
                display: flex;
                align-items: center;
                height: 108px;
                padding: 0 24px;
                font-size: 24px;
                color: rgb(77, 85, 93);
                font-weight: 200;
                line-height: 28px;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                &.on {
                    font-weight: 700;
                    background-color: #fff;
                }
            }
        }
        .list {
            flex: 1;
            height: 100%;
            overflow: hidden;
            /*overflow-y: auto;*/
        }
        .menu_item {
            i {
                display: inline-block;
                width: 20px;
                height: 20px;
                margin-right: 2px;
                background-size: 100% 100%;
                background-repeat: no-repeat;
                &.decrease {
                    background-image: url('../../assets/img/decrease_3@3x.png');
                }
                &.discount {
                    background-image: url('../../assets/img/discount_3@3x.png');
                }
                &.guarantee {
                    background-image: url('../../assets/img/guarantee_3@3x.png');
                }
                &.invoice {
                    background-image: url('../../assets/img/invoice_3@3x.png');
                }
                &.special {
                    background-image: url('../../assets/img/special_3@3x.png');
                }
            }
        }
        .item {
            .title {
                font-size: 24px;
                color: rgb(147, 153, 159);
                line-height: 52px;
                padding-left: 28px;
                border-left: 2px solid #d9dde1;
                background-color: #f3f5f7;
            }
            .foods {
                li {
                    display: flex;
                    position: relative;
                    padding: 36px;
                }
            }
            .food_img {
                flex: 0 0 100px;
                width: 100px;
                height: 100px;
                overflow: hidden;
                border-radius: 3px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .food_info {
                flex: 1;
                padding: 4px 36px 0 20px;
                font-size: 20px;
                line-height: 20px;
                color: rgb(147, 153, 159);
                overflow: hidden;
                h3 {
                    font-size: 28px;
                    color: rgb(7, 17, 27);
                    line-height: 28px;
                    padding-bottom: 16px;
                }
                .description {
                    padding-bottom: 16px;
                    height: 20px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .sellCount {
                    padding-bottom: 16px;
                    span {
                        margin-right: 24px;
                    }
                }
                .price {
                    position: relative;
                    span {
                        &:nth-child(1) {
                            font-size: 28px;
                            color: #f01414;
                            line-height: 28px;
                        }
                        &:nth-child(2) {
                            font-weight: 700;
                            text-decoration: line-through;
                        }
                    }
                }
            }
            .num {
                position: absolute;
                bottom: 18px;
                right: 36px;
            }
        }
    }
</style>