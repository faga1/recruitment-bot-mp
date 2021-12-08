import React,{useEffect,useState} from "react";
import {BrowserRouter,Switch,Route,Redirect,withRouter} from 'react-router-dom'
import { oAuth } from "@/models/common";
import routes from '@/router'
function App(props) {
    useEffect(() => {
		console.log(JSON.stringify(props));
		// if(window.fb.getPlatform()===0){
		// 	props.history.push('/platFormErr')
		// }
        // 判断是否含有token 没有则拉起弹窗
        // else{
			// 如果是可以通过指令进来的，不在app.js中统一设置判定(后续要做身份验证,以及请求重发)
			// console.log('aaa',props.location.pathname.split('/')[1]);
			if (localStorage.getItem('token')||props.location.pathname==='/posManage'||props.location.pathname==='/deliveryList'||props.location.pathname.split('/')[1]==='deliveryShared'){
				console.log('bbb');
				return
			} 
			console.log('ccc');
    	    if (props.location.pathname==='/pubPosition'){
				oAuth('recruiter')
				return
			}
			console.log('ddd');
			oAuth()
		// }
    }, [])

	return (
		<div className="app-root">
				<Switch>
					{routes.map((route)=>(
						<Route
							key={route.name}
							path={route.path}
							exact={!!route.exact}
							component={route.component}
						/>
						
					))}
					<Redirect to='/pubPosition'></Redirect>
				</Switch>
		</div>
	);
}
export default withRouter(App)