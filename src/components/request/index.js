import axios from "axios";
import { message } from "antd";
import {Toast} from 'antd-mobile'
import {oAuth} from '@/models/common'

const codeMessage = {
	200: "服务器成功返回请求的数据。",
	201: "新建或修改数据成功。",
	202: "一个请求已经进入后台排队（异步任务）。",
	204: "删除数据成功。",
	400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
	401: "用户没有权限（令牌、用户名、密码错误）。",
	403: "用户得到授权，但是访问是被禁止的。",
	404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
	406: "请求的格式不可得。",
	410: "请求的资源被永久删除，且不会再得到的。",
	422: "当创建一个对象时，发生一个验证错误。",
	500: "服务器发生错误，请检查服务器。",
	502: "网关错误。",
	503: "服务不可用，服务器暂时过载或维护。",
	504: "网关超时。",
};

export const axiosInstance = axios.create({
	baseURL:'https://liuchaoyang-8099.cloud.wizzstudio.com',
	headers: { "X-Requested-With": "XMLHttpRequest" },
});

axiosInstance.interceptors.request.use((config)=>{
	config.headers.token=localStorage.getItem('token')
	console.log(config);
	return config
})


axiosInstance.interceptors.response.use(
	function(response) {
		console.log(response.data.code);
		if(response.data.code===41100){
			Toast.show({
				icon:'fail',
				content:'当前会话已过期,请重新登录',
				maskClickable:false
			})
			setTimeout(()=>{
				oAuth()
			},1300)
		}
		return response;
	},
	function(error) {
		const code = error.response.status;
		const msg = codeMessage[code] || `未知错误[${code}]`;
		message.error(msg);

		return Promise.reject(msg);
	}
);

export default {
	get(...args) {
		return axiosInstance.get(...args).then(data => {
			return data.data;
		});
	},
	post(url, data, ...a) {
		return axiosInstance.post(url, data, ...a).then(data => {
			return data.data;
		});
	},
	fileUpload(url, data) {
		return axiosInstance.post(url, data, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},
};
