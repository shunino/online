<template>
    <div class="dynamic">
        <mt-header title="动态详情">
            <!-- <router-link to="/" slot="left"> -->
                <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
            <!-- </router-link> -->
        </mt-header>
        <div class="pic-bg">
            <div class="pic-wrap">
                <img src="http://temp.im/640x260" />
            </div>
            <div class="text-wrap">
                <div class="text-title">
                    绿城·杨柳郡
                </div>
                <div class="text-more">
                    查看详情&gt;
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-item" v-for="o in 4" :key="o">
                <div class="content-item-header">
                    <span class="date">2018.08.09</span>
                    <span class="tag">最新</span>
                    <span class="more">查看详情&gt;</span>
                </div>
                <div class="content-item-title">
                    绿城·杭州西溪云庐9月加推Trees Villa欢lalalaladsfsd
                </div>
                <div class="content-item-detail">
                    绿城·杭州西溪云庐9月加推Trees Villa欢杭州杨柳郡四期预计9月加推，开盘楼栋5、6、7、8、9#开盘户型：90方两室一厅，两房两卫，90方一厨一
                </div>
            </div>
        </div>
        <my-footer></my-footer>
    </div>
</template>

<script>
import { Header, Button } from 'mint-ui';
import footer  from '@/components/footer/footer.vue';
    export default {
        components: {
            'mt-header': Header,
            'mt-button': Button,
            'my-footer': footer
        },
        methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
    }
</script>

<style scoped>
@import "./dynamic.css";
</style>