import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        goods: null,
        ratings: null,
        seller: null,
        cartLists: []
    },
    mutations: {
        getGoods(state, res) {
            if (res.data.success) {
                res.data.data.forEach(par => {
                    par.foods.forEach(el => {
                        el.count = 0
                    })
                })
                state.goods = res.data.data
            }
        },
        getRatings(state, res) {
            if (res.data.success) {
                state.ratings = res.data.data
            }
        },
        getSeller(state, res) {
            if (res.data.success) {
                state.seller = res.data.data
            }
        },
        cartCount(state, options) {
            let goods = state.goods
            goods[options.parent].foods[options.child].count = options.count
            state.goods = goods
        },
        cartList(state){
            let list = []
            state.goods.forEach((par,index1) => {
                par.foods.forEach((el,index2) => {
                    if(el.count>0){
                        el.parent = index1
                        el.child = index2
                        list.push(el)
                    }
                })
            })
            state.cartLists = list
        },
        clearCart(state){
            let goods = state.goods
            goods.forEach(el=>{
                el.foods.forEach(el2=>{
                    el2.count=0
                })
            })
            state.goods = goods
            state.cartLists = []
        }
    },
    actions: {
        async getGoods({commit}) {
            let goods = await axios.get('/api/goods')
            commit('getGoods', goods)
        },
        async getRatings({commit}) {
            let goods = await axios.get('/api/ratings')
            commit('getRatings', goods)
        },
        async getSeller({commit}) {
            let goods = await axios.get('/api/seller')
            commit('getSeller', goods)
        },
    }
})