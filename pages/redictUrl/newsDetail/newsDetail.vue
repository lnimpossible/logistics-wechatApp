<template>
  <div class="content">
		<PageTitle :title="currentTile"></PageTitle>
		<ul class="newsList">
			<li class="newWrap">
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
		const pages = getCurrentPages()
		const currentPage = pages[pages.length - 1]
		const options = currentPage.options
		console.log(options)
		self.$request.get({
			url: '/getNews/'+ options.id,
			data: {
				"newsType": 1
			}
		}).then(res => {
			self.item = res.news
		})
  },

  data () {
    return {
		item:[
			{title: '',time:'',content:''}
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
		.newsList{
			width: 90%;
			font-size: 38upx;
			margin:0 auto;
			padding: 20upx;
			border-radius: 10upx;
			min-height: 100vh;
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
					font-size: 25upx;
					line-height: 30upx;
				}
			}
		}
	}
</style>
