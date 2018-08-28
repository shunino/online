<template>
	<div class="error">
		{{errorMsg}}
	</div>
</template>

<script>
export default{
	data(){
		return {
			errorMsg:''
		}
	},
	created(){
		this.errorMsg = localStorage.errorMsg;
	},
	deactivated(){
	   this.$destroy(true)
	}
}	
</script>

<style scoped>
.error{
	text-align: center;
	margin-top: 30%;
	font-size: 0.3rem;
}	
</style>