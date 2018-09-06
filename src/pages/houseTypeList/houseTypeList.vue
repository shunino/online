<template>
	<div id="houseTypeList">
		<mt-header title="户型列表">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
        <div class="row content-wrap">
          <div class="content-item" v-for="o in 8" :key="o" @click="goPage('houseTypeList')">
            <div class="pic-wrap">
              <img src="static/huxing.png" />
            </div>
            <div class="content-item-right">
                <div class="text-wrap">
                    <span class="title">五房两卫三厅</span>
                    <span style="color: #989CA8;">建面168㎡</span>
                </div>
                <div class="parse">
                    户型解析：【采光】：1.采光特别的适采光特别的适采光特别的适采光特别的适采光特别的适
                </div>
                <div style="font-size: .12rem;">
                    约<b>390</b>万/套
                </div>
                <div class="tags-wrap">
                    <span class="tag-item">干湿分离</span>
                    <span class="tag-item">户型方正</span>
                </div>
            </div>
            
          </div>
		</div>
	</div>
</template>

<script>
import { Header, Button } from 'mint-ui';
	export default {
		components: {
            'mt-header': Header,
			'mt-button': Button
		},
		data() {
			return{
			}
		},
		methods: {
            goBack() {
                this.$router.go(-1)
			},
		},
		mounted() {
		},
		filters: {
			imgfilter(url) {
				return config.file_show_url + url;
			}
		},
	}
</script>

<style scoped>
@import "./houseTypeList.css";

</style>