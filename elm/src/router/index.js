import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
    routes: [
        {
            path: '/',
            redirect: '/goods',
        },
        {
            path: '/goods',
            name: 'goods',
            component: () => import('@/views/goods/goods'),
            children: [
                {
                    path: 'details',
                    name: 'details',
                    component: () => import('@/views/details/details')
                }
            ]
        },
        {
            path: '/seller',
            name: 'seller',
            component: () => import('@/views/seller/seller')
        },
        {
            path: '/ratings',
            name: 'ratings',
            component: () => import('@/views/ratings/ratings')
        }
    ]
})

router.beforeEach((to, from, next) => {
    let arr = ['/goods', '/ratings', '/seller']
    let toPath = to.path,
        fromPath = from.path,
        animateType;
    if (arr.indexOf(toPath) > -1 && arr.indexOf(fromPath) > -1) {
        if (arr.indexOf(toPath) > arr.indexOf(fromPath)) {
            animateType = 'rtl'
        }else{
            animateType = 'ltr'
        }
    }
    if(animateType){
        sessionStorage.setItem('type',animateType)
    }
    next()
})

export default router
