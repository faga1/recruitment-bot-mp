import request from "@/components/request";
import { apis } from "@/config";
import {Dialog, Toast} from 'antd-mobile'
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

export function oAuth(identity=''){
	// 根据不同角色区分请求url
	let url='/login'
	if(identity==='recruiter'){
		url='/recruiterLogin'
	}else if(identity==='adamin'){
		url='/adaminLogin'
	}
	return new Promise((resolve)=>{
			window.fb.init({
				success:()=>{
					
						window.fb.oAuth({ 'oAuthUrl': 'http://redirect.risingsun.pro' }).then(function (res) {
							if (res.data && res.data.code) {
								let decodeData=decodeURIComponent(res.data.code)
								console.log(url);
								request.post(url,qs.stringify({code:decodeData})).then((res)=>{
									
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
								window.fb.closeWindow()
							}
							
						})
					
				}
		})
	})
}
