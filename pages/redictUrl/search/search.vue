<template>
	<view>
		<view class="searchLineWrap">
			<view class="chooseWrap">
				<picker class="pickerWrap" mode="region" @change="chooseStartAddress">
					<input type="text" :value="address.startCity" disabled placeholder="始发市" >		
				</picker>
				<image class="exchange-icon" src='../../../static/img/icon/chongzhi.png' mode="aspectFit" ></image>
				<picker class="pickerWrap" mode="region" @change="chooseEndAddress">
					<input type="text" :value="address.endCity" disabled placeholder="目的市" >	
				</picker>
			</view>
			<button type="primary" class='searchBtn' @click="submitForSearchLines">查询</button>
		</view>
		<div class="cardList">
			<div v-for="(item,index) in itmes" :key="index">
				<van-card
					tag="优质"
					:desc="item.intro"
					:title="item.compName"
					:thumb="item.imageUrl"
				>
					<view slot="tags">
						<van-row>
							<van-col :span="6"><div style="text-align:center">{{item.startCity}} </div></van-col>
							<van-col :span="4"><div style="text-align:center"><van-icon custom-style="padding-top:0x;" name="exchange" /> </div></van-col>
							<van-col :span="6"><div style="text-align:center">{{item.endCity}}  </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="24"><div class="price">重货:￥{{item.heavyCargoFreightRate}} / m³ </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="24"><div class="price">轻货:￥{{item.lightCargoFreightRate}} / m³ </div></van-col>
						</van-row>
					</view>
					<view slot="footer"> 
						<!-- <van-button size="small"><van-icon size="12px" name="chat" /></van-button> -->
						<van-button size="mini" type="primary" @click="makePhoneCall(item.compTelephone)"><van-icon name="phone" color="#fff" size="18px" /></van-button>
					</view>
				</van-card>
			</div>
		</div>
			<!-- div class="uni-flex uni-row">
				<span>历史纪录</span>
			</div> -->
	</view>
</template>

<script>
	export default{
		components: {
		},
		mounted(){
			let self = this
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const options = currentPage.options
			console.log(options)
			let p = self.$request.post({
				url:'/logistics/driverDirectLine/ownerQuery',
				data: options
			})
			p.then(res => {
				self.itmes = res.page.list
			})
			self.address = options
		},
		data() {
			return {
				address: {
				  "currPage": 1,
				  "endAreaCode": "",
				  "endCity": "",
				  "endCityCode": "",
				  "pageSize": 10,
				  "startAreaCode": "",
				  "startCity": "",
				  "startCityCode": "",
				},
				startAddressValue: '',
				endAddressValue: '',
				itmes: []
			}
		},
		methods: {
			chooseStartAddress(e){
				let address = e.detail.value
				let code = e.detail.code
				this.address.startCity = address[1] // 0 省 1市 2区
				this.address.startCityCode = code[1] // 市 codes
				this.address.startAreaCode = code[2] // 区 code
			},
			chooseEndAddress(e){
				let address = e.detail.value
				let code = e.detail.code
				this.address.endCity = address[1] // 0 省 1市 2区
				this.address.endCityCode = code[1] // 市 codes
				this.address.endAreaCode = code[2] // 区 code
			},
			makePhoneCall(phone){
				let self = this
				wx.makePhoneCall({
					phoneNumber: phone
				})
			},
			submitForSearchLines(){
				let self = this
				self.$request.post({
					url: '/logistics/driverDirectLine/ownerQuery',
					data: self.address
				}).then(res => {
					self.itmes = res.page.list
				})
			}
		}
	}
</script>

<style lang="scss" scope>
.price{
	color:red
}
.searchLineWrap{
			background: #fff;
			width: 96%;
			border-radius:20upx;
			padding: 60upx 0;
			box-sizing: border-box;
			margin: 20upx auto;
			// position: relative;
			// top: -80upx;
			// left: 50%;
			// transform: translateX(-50%);
			// z-index: 1;
			.chooseWrap{
				display: flex;
				flex-wrap: nowrap;
				flex-direction: row;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 30upx;
				.exchange-icon{
					height: 45upx;
					flex: 1;
				}
				.pickerWrap{
					text-align: center;
					flex: 3;
				}
			}
			.searchBtn{
				width: 90%;
				height: 70upx;
				line-height: 70upx;
				border-radius: 80upx;
			}
		}
</style>