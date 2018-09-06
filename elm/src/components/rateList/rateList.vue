<template>
    <div class="ratingList" v-if="rating">
        <div class="rating">
            <ul>
                <li @click="selectType=2" :class="{'on': selectType==2}">全部 <span>{{rating.length}}</span></li>
                <li @click="selectType=0" :class="{'on': selectType==0}">推荐 <span>{{up}}</span></li>
                <li @click="selectType=1" :class="{'on': selectType==1}">吐槽 <span>{{down}}</span></li>
            </ul>
            <div @click="showContent">
                <i :class="['icon-check_circle',onlyContent?'active':'']"></i>
                <span>只看有内容的评价</span>
            </div>
        </div>
        <ul class="list" v-if="rating.length>0">
            <li v-for="(item,index) in showData" :key="index" v-show="!onlyContent||item.text">
                <div class="list_top">
                    <div class="user">
                        <div class="img">
                            <img :src="item.avatar" alt="">
                        </div>
                        <div class="username">
                            <p>{{item.username}}</p>
                            <div>
                                <rate :size="9" :spacing="2" :score="item.score"></rate>
                                <span>{{item.deliveryTime}}分钟送达</span>
                            </div>
                        </div>
                    </div>
                    <div class="time">{{item.rateTime|time}}</div>
                </div>
                <div class="content">
                    <p v-if="item.text">{{item.text}}</p>
                    <div>
                        <i :class="[item.rateType==1?'icon-thumb_down':'icon-thumb_up']"></i>
                        <span v-for="food in item.recommend" :key="food">{{food}}</span>
                    </div>
                </div>
            </li>
        </ul>
        <div class="none" v-else>暂无评价</div>
    </div>
</template>

<script>
    import rate from '@/components/rate/rate'

    export default {
        name: 'rateList',
        data() {
            return {
                showData: [],
                selectType: 2,
                onlyContent: false
            }
        },
        props: {
            rating: {
                type: Array,
            }
        },
        components: {
            rate
        },
        computed:{
            up(){
                this.showData=this.rating
                return this.rating.filter(el=>el.rateType==0).length
            },
            down(){
                return this.rating.filter(el=>el.rateType==1).length
            }
        },
        watch:{
            selectType(val){
                if(val==2){
                    this.showData = this.rating
                }else if(val==1){
                    this.showData = this.rating.filter(el=>el.rateType===1)
                }else{
                    this.showData = this.rating.filter(el=>el.rateType===0)
                }
            }
        },
        methods: {
            showContent() {
                if (!this.onlyContent) {
                    this.onlyContent = true
                }else{
                    this.onlyContent = false
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .ratingList {
        background-color: #fff;
        .rating {
            padding: 0 36px;
            ul {
                display: flex;
                border-bottom: 2px solid rgba(7, 17, 27, .1);
                li {
                    padding: 16px 24px;
                    margin: 24px 16px 36px 0;
                    font-size: 24px;
                    line-height: 32px;
                    border-radius: 2px;
                    color: rgb(77, 85, 93);
                    background-color: rgba(0, 160, 220, .2);
                    span {
                        font-size: 16px;
                    }
                    &.on {
                        color: #fff;
                        background-color: rgb(0, 160, 220);
                    }
                    &:nth-child(3) {
                        color: rgb(77, 85, 93);
                        background-color: rgba(77, 85, 93, .2);
                        &.on{
                            color: #fff;
                            background-color: rgba(77, 85, 93, .6);
                        }
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
        .list {
            padding: 0 36px;
            border-top: 2px solid rgba(7, 17, 27, .1);
            li {
                padding: 36px 0;
                border-bottom: 2px solid rgba(7, 17, 27, .1);
                &:last-child {
                    border: none;
                }
            }
        }
    }

    .list_top {
        display: flex;
        justify-content: space-between;
        .user {
            display: flex;
            justify-content: space-between;
            align-items: center;
            .img {
                width: 56px;
                height: 56px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 24px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .username {
                p {
                    font-size: 20px;
                    color: rgb(7, 17, 27);
                    line-height: 24px;
                }
                div {
                    display: flex;
                    span {
                        margin-left: 12px;
                        font-size: 20px;
                        font-weight: 200;
                        color: rgb(147, 153, 159);
                        line-height: 24px;
                    }
                }
            }
        }
        .time {
            font-size: 20px;
            font-weight: 200;
            color: rgb(147, 153, 159);
            line-height: 24px;
        }
    }

    .content {
        padding-left: 80px;
        p {
            font-size: 24px;
            color: rgb(7, 17, 27);
            line-height: 36px;
            padding: 12px 0 16px;
        }
        div {
            display: flex;
            flex-wrap: wrap;
            i {
                display: inline-block;
                font-size: 24px;
                line-height: 32px;
                &.icon-thumb_down {
                    color: rgb(183, 187, 191);
                }
                &.icon-thumb_up {
                    color: rgb(0, 160, 220);
                }
            }
            span {
                display: inline-block;
                max-width: 100px;
                margin: 0 0 12px 16px;
                padding: 0 12px;
                font-size: 18px;
                color: rgb(147, 153, 159);
                line-height: 32px;
                border: 1px solid rgba(7, 17, 27, .1);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }

    .active {
        color: #3784ff;
    }
    .none{
        color: #333;
        font-size: 20px;
        line-height: 60px;
        padding-left: 36px;
        border-top: 2px solid rgba(7,17,27,.1);
    }
</style>