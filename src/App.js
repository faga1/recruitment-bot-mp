import React,{useEffect,useState} from "react";
import {BrowserRouter,Switch,Route,Redirect,withRouter} from 'react-router-dom'
import { oAuth } from "@/models/common";
import routes from '@/router'
function App(props) {
    useEffect(() => {
		// if(window.fb.getPlatform()===0){
		// 	props.history.push('/platFormErr')
		// }
        // // 判断是否含有token 没有则拉起弹窗
        // else{
			// if (localStorage.getItem('token')) return 
    	    // oAuth()
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
					<Redirect to='/pubSuccess'></Redirect>
				</Switch>
		</div>
	);
}
export default withRouter(App)