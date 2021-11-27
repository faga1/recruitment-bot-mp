import request from "@/components/request";
import { apis } from "@/config";
import {Toast} from 'antd-mobile'
import qs from 'qs'


import avatar from "@/assets/images/avatar.jpg";

export function getUserInfo() {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve({
				empCode: 1000,
				avatar: avatar,
				username: "noob.zhou",
			});
		}, 200);
	});
}

export function oAuth(){
	window.fb.init({
		success:()=>{
			try{
				window.fb.oAuth({ 'oAuthUrl': 'http://redirect.risingsun.pro/redirect' }).then(function (res) {
		
					if (res.data && res.data.code) {
						let decodeData=decodeURIComponent(res.data.code)
						request.post('/login',qs.stringify({code:decodeData})).then((res)=>{
							console.log(res.data);
							localStorage.setItem('token',res.data)
						})
						 
					} else {
						Toast.show({
							icon:'fail',
							content:res['errMsg']
						})
						console.log(window.fb.getPlatform());
						if(window.fb.getPlatform()===0){

							window.close()
						} 
						window.fb.closeWindow()
					}
		
				})
			}catch(e){
				console.log(e);
			}
		}
	})
}
