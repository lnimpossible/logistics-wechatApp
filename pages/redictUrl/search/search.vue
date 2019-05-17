<template>
	<view>
		<view class="searchLineWrap">
			<view class="chooseWrap">
				<picker class="pickerWrap" mode="region" @change="chooseStartAddress">
					<input type="text" :value="address.startCity" disabled placeholder="始发市" >		
				</picker>
				<image class="exchange-icon" src='../../../static/img/icon/chongzhi.png' mode="aspectFit" @click="exchangeAddressOrigin"></image>
				<picker class="pickerWrap" mode="region" @change="chooseEndAddress">
					<input type="text" :value="address.endCity" disabled placeholder="目的市" >	
				</picker>
			</view>
			<button type="primary" class='searchBtn' @click="submitForSearchLines">查询</button>
		</view>
		<div class="cardList">
			<div class="cardItem" v-for="(item,index) in itmes" :key="index">
				<van-card
					tag="优质"
					:desc="item.intro"
					:title="item.compName"
					:thumb="item.imageUrl"
				>
					<view slot="tags">
						<van-row style="margin: 5px 0 10px 0;">
							<van-col :span="7"><div style="text-align:left;font-size: 14px;">{{item.startCity}} </div></van-col>
							<van-col :span="3"><div style="text-align:center;font-size: 14px;"><van-icon custom-style="padding-top:0x;" name="exchange" /> </div></van-col>
							<van-col :span="7"><div style="text-align:right;font-size: 14px;">{{item.endCity}}  </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="16"><div class="price">重 ￥ {{item.heavyCargoFreightRate || 0}}/m³ </div></van-col>
						</van-row>
					</view>
					<view slot="tags">
						<van-row>
							<van-col :span="16"><div class="price">轻 ￥ {{item.lightCargoFreightRate || 0}}/m³ </div></van-col>
							<van-col :span="8"><van-button size="mini" type="info" @click="makePhoneCall(item.compTelephone)"><van-icon name="phone" color="#fff" size="18px" /></van-button></van-col>
						</van-row>
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
		data() {
			return {
				address: {
				  "currPage": 1,
				  "endAreaCode": "",
				  "endCity": "",
				  "endCityCode": "",
				  "pageSize": 20,
				  "startAreaCode": "",
				  startCity: "",
				  "startCityCode": "",
				},
				startAddressValue: '',
				endAddressValue: '',
				itmes: []
			}
		},
		mounted(){
			let self = this
			const pages = getCurrentPages()
			const currentPage = pages[pages.length - 1]
			const options = currentPage.options
			console.log(options)
			self.$request.post({
				url:'/logistics/driverDirectLine/cargoQuery',
				data: options
			}).then(res => {
				self.itmes = res.page.list
				self.address.startCity = options.startCity
				self.address.startCityCode = options.startCityCode
				self.address.startAreaCode = options.startAreaCode
				self.address.endCity = options.endCity
				self.address.endCityCode = options.endCityCode
				self.address.endAreaCode = options.endAreaCode
				console.log(self.address)
			})
		},
		methods: {
			exchangeAddressOrigin(){
				let self = this
				let temp_startCity = self.address.startCity
				let temp_startCityCode = self.address.startCityCode
				let temp_startAreaCode = self.address.startAreaCode
				
				self.address.startCity = self.address.endCity
				self.address.startCityCode = self.address.endCityCode
				self.address.startAreaCode = self.address.endAreaCode
				
				self.address.endCity = temp_startCity
				self.address.endCityCode = temp_startCityCode
				self.address.endAreaCode = temp_startAreaCode
			},
			submitForSearchLines(){
				let self = this
				self.$request.post({
					url:'/logistics/driverDirectLine/cargoQuery',
					data:self.address
				}).then(res => {
					self.itmes = res.page.list
				})
			},
			chooseStartAddress(e){
				let self = this
				let address = e.detail.value
				let code = e.detail.code
				self.address.startCity = address[1] // 0 省 1市 2区
				self.address.startCityCode = code[1] // 市 codes
				self.address.startAreaCode = code[2] // 区 code
				console.log(self.address)
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
			}
		}
	}
</script>

<style lang="scss" scope>
.cardList{
	width: 96%;
	margin: 0 auto;
	.cardItem{
		margin: 20upx 0;
	}
}
.searchLineWrap{
	background: #fff;
	width: 96%;
	border-radius:20upx;
	padding: 40upx 0;
	box-sizing: border-box;
	margin: 20upx auto;
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