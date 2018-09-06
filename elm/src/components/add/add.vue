<template>
    <div>
        <transition name="animate">
            <i class="icon-remove_circle_outline" @click.stop="remove" v-show="food.count>0"></i>
        </transition>
        <transition name="rote">
            <span v-show="food.count>0">{{food.count}}</span>
        </transition>
        <i class="icon-add_circle" @click.stop="add"></i>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        props: {
            food: {
                type: Object,
                default: 0
            },
            parent: {
                type: Number,
            },
            child: {
                type: Number,
            }
        },
        data() {
            return {
                num: 0,
                isAnimate: this.animate
            }
        },
        methods: {
            ...mapMutations({
                cartCount: 'cartCount',
                cartList: 'cartList'
            }),
            add() {
                this.cartCount({
                    parent: this.parent,
                    child: this.child,
                    count: ++this.food.count
                })
                this.cartList()
            },
            remove() {
                this.cartCount({
                    parent: this.parent,
                    child: this.child,
                    count: --this.food.count
                })
                this.cartList()
            }
        }
    }
</script>

<style lang="less" scoped>
    div {
        display: flex;
        align-items: center;
        height: 48px;
        width: auto;
        overflow: hidden;
        i {
            display: block;
            font-size: 48px;
            color: rgb(0, 160, 220);
            line-height: 48px;
            padding: 6px;
        }
        span {
            width: 48px;
            text-align: center;
            font-size: 20px;
            color: rgb(147, 153, 159);
            line-height: 48px;
        }
    }

    .animate-enter-active, .animate-leave-active, .rote-enter-active, .rote-leave-active {
        transition: all .3s;
    }

    .animate-enter, .animate-leave-to {
        opacity: 0;
        transform: translate3d(128px, 0, 0) rotate(180deg);
    }

    .rote-enter, .rote-leave-to {
        opacity: 0;
        transform: translate3d(128px, 0, 0);
    }
</style>