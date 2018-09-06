<template>
    <ul class="tab">
        <li v-for="item in list" :key="item.title">
            <router-link :to="item.path" class="path">{{item.title}}</router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props:{
            list:{
                type: Array
            }
        }
    }
</script>

<style lang="less" scoped>
    .tab{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 80px;
        border-bottom: 2px solid rgba(7,17,27,.1);
        background-color: #fff;
        li{
            flex: 1;
            font-size: 28px;
            color: rgb(77,85,93);
            line-height: 28px;
            text-align: center;
            .path{
                display: block;
                width: 100%;
            }
            .router-link-active{
                color: rgb(240,20,20);
            }
        }
    }
</style>