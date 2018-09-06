<template>
	<div class="calculator">
		<mt-header title="房贷计算器">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
		<navbar v-model="selected">
			<tab-item id="等额本息">等额本息</tab-item>
			<tab-item id="等额本金">等额本金</tab-item>
		</navbar>
	</div>
</template>

<script>
import { Header, Button, Navbar, TabItem } from 'mint-ui';
	export default {
		components: {
            'mt-header': Header,
			'mt-button': Button,
			Navbar,
			TabItem
		},
		data() {
			return{
				selected: '等额本息'
			}
		},
		methods: {
            goBack() {
                this.$router.go(-1)
            }
        }
	}
</script>

<style scoped>
@import "./calculator.css";
</style>