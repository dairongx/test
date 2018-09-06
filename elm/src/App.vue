<template>
    <div id="app">
        <v-header :seller="seller"></v-header>
        <tab :list="list"></tab>
        <div class="main">
            <transition :name="animateType">
                <keep-alive>
                    <router-view/>
                </keep-alive>
            </transition>
        </div>
        <cart :seller="seller"></cart>
    </div>
</template>

<script>
    import header from '@/components/header/header'
    import tab from '@/components/tab/tab'
    import cart from '@/components/cart/cart'
    import {mapState,mapActions} from 'vuex'

    export default {
        name: 'App',
        data() {
            return {
                list: [
                    {path: '/goods', title: '商品'},
                    {path: '/ratings', title: '评价'},
                    {path: '/seller', title: '商家'}
                ],
                animateType: ''
            }
        },
        computed:{
            ...mapState({
                seller: 'seller'
            })
        },
        methods:{
            ...mapActions({
                getSeller: 'getSeller'
            })
        },
        created(){
            this.getSeller()
        },
        watch: {
            $route() {
                this.animateType = sessionStorage.getItem('type') || ''
            }
        },
        components: {
            vHeader: header,
            tab,
            cart
        }
    }
</script>

<style lang="less" scoped>
    #app {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }

    .main {
        position: absolute;
        top: 350px;
        bottom: 100px;
        width: 100%;
        height: calc(100vh - 450px);
    }
</style>
