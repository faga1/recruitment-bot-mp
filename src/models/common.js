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
	return new Promise((resolve)=>{
			window.fb.init({
				success:()=>{
					
						window.fb.oAuth({ 'oAuthUrl': 'http://redirect.risingsun.pro' }).then(function (res) {
							console.log(JSON.stringify(res));
							if (res.data && res.data.code) {
								let decodeData=decodeURIComponent(res.data.code)
								request.post('/login',qs.stringify({code:decodeData})).then((res)=>{
									console.log(res.data);
									if(res.code===20000){
										localStorage.setItem('token',res.data)
										resolve()
									}

								})
								
							} else {
								console.log(res.errMsg);
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
					
				}
		})
	})
}
