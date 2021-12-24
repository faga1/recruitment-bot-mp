import React,{useEffect,useState} from "react";
import {BrowserRouter,Switch,Route,Redirect,withRouter} from 'react-router-dom'
import { oAuth } from "@/models/common";
import {menus} from '@/router'
function App(props) {
    useEffect(() => {
		// if(window.fb.getPlatform()===0){
		// 	props.history.push('/platFormErr')
		// }
        // 判断是否含有token 没有则拉起弹窗
        // else{
			// 如果是可以通过指令进来的，不在app.js中统一设置判定(后续要做身份验证,以及请求重发)
			if (localStorage.getItem('token')||props.location.pathname==='/posManage'||props.location.pathname==='/deliveryList'||props.location.pathname.split('/')[1]==='deliveryShared'){
				return
			} 
    	    if (props.location.pathname==='/pubPosition'){
				console.log(111);
				oAuth('recruiter')
				return
			}
			oAuth()
		// }
    }, [])

	return (
		<div className="app-root">
				<Switch>
					{menus.map((route)=>(
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