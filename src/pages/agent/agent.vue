<template>
	<div id="agent">
		<mt-header title="官方经纪人">
			<mt-button icon="back" slot="left" @click="goBack">返回</mt-button>
        </mt-header>
		<div class="tag-wrap">
          <span class="tag">专业服务</span>
          <span class="tag">绿城官方</span>
          <span class="tag">免费咨询</span>
          <span class="tag">户型分析</span>
        </div>
		<div class="agent-content">
            <div class="agent-content-item" v-for="(a, index) in agent" :key="index">
              <div class="agent-content-item-pic">
                <img v-if="a.photo" v-bind:src="a.photo|imgfilter">
                <img v-else src="../../assets/default-avator.png">
              </div>
              <div class="agent-content-item-name">
                <div class="name">{{a.username}}</div>
                <div class="grade">{{a.username}}</div>
              </div>
              <div class="agent-content-item-tel">
                <img src='static/assets/icon_phone_call@3x.png' />
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
				agent: [],
				buildId: this.$route.params.buildId
			}
		},
		methods: {
            goBack() {
                this.$router.go(-1)
			},
			handleGetAgent() {
				this.common.request.post("/estate/getProjectInfo", {
					buildingId: this.buildId
				})
				.then(data => {
					this.agent = data ? data.buildingBrokerEntity || [] : [];
				})
			}
		},
		mounted() {
			this.handleGetAgent()
		},
		filters: {
			imgfilter(url) {
				return config.file_show_url + url;
			}
		},
	}
</script>

<style scoped>
@import "./agent.css";

</style>