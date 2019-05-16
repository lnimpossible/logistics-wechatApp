<template>
  <div class="content">
		<div class="title"> <span>最新资讯</span> </div>
		<ul class="newsList">
			<li class="newWrap" v-for="(item,index) in newsList" :key="index">
				<div class="newsTitle"><van-icon name="fire" /> <span>{{item.title}}</span> <span class="newsTime">{{item.publishTime}}</span></div>
				<div class="newsIntro" v-html="item.content"></div>
			</li>
		</ul>
  </div>
</template>
<script>
export default {
  mounted(){
		let self = this
		self.$request.post({
			url: '/getNewsBriefList',
			data: {
				"newsType": 1
			}
		}).then(res => {
			self.newsList = res.newsBriefList
		})
  },

  data () {
    return {
			newsList:[
					{title: '专线小程序上线了',time:'2019-2-1',content:'的撒艰苦奋斗比大姐大姐啊晒偶发，，fail打，较方便的监控设备开发不都是开会吧。'},
					{title: '大萨达撒大萨达撒大萨达撒大萨达撒',time:'2019-2-1',content:'的撒艰苦奋斗比大姐大姐啊晒偶的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发的撒艰苦奋斗比大姐大姐啊晒偶发发，，fail打，较方便的监控设备开发不都是开会吧。'}
				],
    }
  },
  methods: {
		
  }
}
</script>

<style lang="scss" scoped>
	.content{
		width: 100%;
		height: 100%;
		padding-bottom: 30upx;
		background: #efefef;
		.title{
			padding: 20upx;
			color: orange;
			span{
				border-bottom: 1upx solid;
				padding: 20upx;
			}
		}
		.newsList{
			width: 90%;
			font-size: 38upx;
			margin:0 auto;
			padding: 20upx;
			border-radius: 10upx;
			.newWrap{
				margin-bottom: 20upx;
				padding: 20upx;
				background: #fff;
				.newsTitle{
					padding-bottom: 20upx;
					.newsTime{
						color: #000;
						font-size:25upx;
						margin-left: 25upx;
					}
				}
				.newsIntro{
					color: #333;
					font-size: 33upx;
					line-height: 55upx;
				}
			}
		}
	}
</style>
