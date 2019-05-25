<template>
	<view class="">
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad(options) {
			let self = this
			self.$request.get({
				url:'/orderLogistics/shipperOrderinfo/' + options.orderNumber
			})
		}
		
	}
</script>

<style>
</style>
