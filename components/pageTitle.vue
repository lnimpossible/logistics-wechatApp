<template>
	<view class="content">
		<div class="title"> <span>{{title}}</span> </div>
	</view>
</template>

<script>
	export default {
		props:{
			title:''
		},
		data() {
			return {
			
			}
		}
	}
</script>

<style lang="scss">
.content{
	.title{
			padding: 20upx;
			color: orange;
			span{
				border-bottom: 1upx solid;
				padding: 20upx;
			}
		}
}
</style>
