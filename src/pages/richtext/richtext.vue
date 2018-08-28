<template>
	 <div class="richtext" v-html="content" style="padding: 10px;"></div>
</template>

<script>
	export default{
		data(){
			return {
				content:""
			}
		},
		created(){
			console.log(this.$route.params.IndexId);
			this.common.request.post('/home/contentList',{"cityId": localStorage.cityid}).then(data => {
				this.content=data[this.$route.params.IndexId].contentValue;
			});
		}
	}
</script>

<style>

</style>
