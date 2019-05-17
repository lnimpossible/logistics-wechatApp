<template>
    <div id="wrap" :style="backgroundstyle">
		<image class="mask" mode="aspectFill" src="../../../static/img/loginBg/login_old.jpg" ></image>
		<div class="maskBg"></div>
		<main class='chooseLoginType' :style="styles">
			<van-row>
				<van-col :span="24">
					<button class='btn-byRank' type="primary" open-type='getPhoneNumber'  @getphonenumber="getphonenumber" size="large">一键登录</button>
				</van-col>
				<van-col :span="24">
					<button type="default" size="large" @click="getnote">短信验证码登录</button>
				</van-col>
			</van-row>
        </main>
        <div class="login" :style="replacestyles">
            <van-cell-group>
                <van-field
                        :value="userphone"
                        required
                        clearable
                        label="手机号"
                        placeholder="请输入手机号"
                        @change="onChange"
                        :error-message="userRegError"
                />
                <van-field
                        :value="usersms"
                        center
                        clearable
                        required
                        @change="onChangeMsg"
                        label="短信验证码"
                        placeholder="请输入短信验证码"

                        :border="false"
                        use-button-slot
                >
                    <van-button slot="button" size="small" type="primary" @click="sendMsg" :disabled="sms.disabled">{{sms.loadingText}}</van-button>
                </van-field>
            </van-cell-group>
            <button size="small" type="primary" class="loginBtn" @click="login" > 登录 </button>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
				code: '',
                backgroundstyle:{
                    backgroundImage:' url(" + require("../../static/image/login.jpg") + ")',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    width: '100vw',
                    height: '100vh'
                },
                styles:"display:block",
                replacestyles:"display:none",
                userphone:'',
                usersms: '',
                userRegError: '',
                userInfo: {
                    phone: '',
                    sms: ''
                },
                sms:{
                    loadingText: '发送验证码',
                    disabled: false
                }
            }
        },
		mounted() {
			let self = this
			self.$log.set('userInfo', null)
			wx.login({
                success (loginRes) {
				  console.log(loginRes)
				  self.code = loginRes.code
				}
			})
		},
        methods:{
            onChange(event){
                let self = this
                self.userInfo.phone = event.mp.detail
            },
            onChangeMsg(event){
                let self = this
                self.userInfo.sms = event.mp.detail
            },
            sendMsg(){
                let self = this
                let phone = self.userInfo.phone
                let sms = self.userInfo.sms
                if(!(/^1[34578]\d{9}$/.test(phone))){
                    self.userRegError = '手机号格式错误'
                    return false;
                }else{
                    self.userRegError = ''
                    self.startCount()
                    self.getSmsCode(phone)
                }
            },
            startCount(){
                let self = this
                self.sms.loadingText = 60
                self.sms.disabled = true
                let timer = setInterval(() => {
                    if(self.sms.loadingText === 0 ){
                        self.sms.disabled = false
                        self.sms.loadingText = '发送验证码'
                        clearInterval(timer)
                    }else{
                        self.sms.loadingText --
                    }
                },1000)
            },
            getSmsCode(phone){
                let self = this
                let p = self.$request.post({
                    url: "/sendSmsCode",
                    data:{
                        "mobile": phone,
                        "smsType": "1"
                    }
                })
                p.then((res) => {
                })
            },
            getnote(e){
                let self =this
                self.styles="display:none"
                self.replacestyles="display:block"
            },
            getphonenumber(e){
              let self = this
			  if(self.code){
				self.$request.post({
                    url: '/user/getWxUserInfo',
                    data:{
                      "code": self.code,
                      "encryptedData": e.mp.detail.encryptedData,
                      "iv": e.mp.detail.iv
                    }
                  }).then((res) => {
                    let phoneNumber = res.userInfo.phoneNumber;
					self.loginByRank(phoneNumber)
                  })
				}else{
					console.log('wx:login error')
				}
            },
			loginByRank(phoneNumber){
				let self = this
				self.$request.post({
					url: '/user/login',
					data:{
						"accountType": "2",
						"mobile": phoneNumber,
						"password": "wxPhoneLogin"
					}
				}).then((userRes) => {
					uni.showToast({
						title: '登录成功',
						mask: false,
						duration: 1500
					})
					self.$log.set('userInfo', {
						phoneNumber: userRes.phoneNumber,
						token: userRes.token
					})
					let url = '../../tabbar/index/index'
					uni.reLaunch({url:url})
				})
			}
        }
    }
</script>

<style lang="scss" scoped>
    #wrap{
		width: 100vw;
		height: 100vh;
		.mask{
			width: 100%;
			height: 100%;
			z-index: 0;
			position: absolute;
		}
		.maskBg{
			width: 100vw;
			height: 100vh;
			z-index: 1;
			position: absolute;
			background: rgba(0,0,0,0.3)
		}
		.chooseLoginType{
			width: 80%;
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translate(-50%,-40%);
			padding: 10px 20px;
			z-index: 2;
			text-align: center;
			.btn-byRank{
				margin-bottom: 15px;
			}
		}
		.login{
			position: absolute;
			background: #fff;
			z-index: 2;
		}
    }
</style>