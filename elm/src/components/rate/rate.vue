<template>
    <div class="rate">
        <div>
            <i v-for="(item,index) in star" :key="index" :class="[item]" :style="styles"></i>
            <span :style="{lineHeight: size+'px'}" v-if="showScore">{{score}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            score: {
                type: Number
            },
            maxScore: {
                type: Number,
                default: 5
            },
            size: {
                type: Number,
                default: 18
            },
            spacing: {
                type: Number,
                default: 6
            },
            showScore:{
                type: Boolean,
                default: false
            }
        },
        computed:{
            styles(){
                let style = {
                    width: this.size+'px',
                    height: this.size+'px',
                    margin: '0 '+this.spacing+'px',
                    backgroundSize: this.size+'px '+this.size+'px'
                }
                return style
            },
            star(){
                let stars = []
                let _score = Math.floor(this.score)
                let isHalf = this.score%1==0
                for(let i = 0;i<_score;i++){
                    stars.push('on')
                }
                if(!isHalf){
                    stars.push('half')
                }
                while(stars.length<this.maxScore){
                    stars.push('off')
                }
                return stars
            }
        }
    }
</script>

<style lang="less" scoped>
    .rate {
        div {
            i {
                display: inline-block;
                background-repeat: no-repeat;
                overflow: hidden;
                &.on {
                    background-image: url("../../assets/img/star48_on@3x.png");
                }
                &.half {
                    background-image: url("../../assets/img/star48_half@3x.png");
                }
                &.off {
                    background-image: url("../../assets/img/star48_off@3x.png");
                }
            }
            span{
                font-size: 24px;
                color: rgb(255,153,0);
            }
        }
    }
</style>