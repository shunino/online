<template>
    <div class="newOpening">
        <mt-header title="最新开盘">
            <!-- <router-link to="/" slot="left"> -->
                <mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
            <!-- </router-link> -->
        </mt-header>
        <div class="content">
            <div class="content-item" v-for="o in 4" :key="o">
                <div class="content-item-title">
                    预计2018-08首开
                </div>
                <div class="content-item-detail">
                    开盘楼栋5、6、7、8、9#
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
@import "./newOpening.css";
</style>