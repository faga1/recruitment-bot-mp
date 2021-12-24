import React,{useEffect} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import VConsole from 'vconsole'
import App from './App.js'
import "moment/locale/zh-cn";
import "@/assets/common.scss";
import "@/assets/styles.scss";
import "@/assets/dsky-antd.scss";

// let vConsole=new VConsole()


ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,

	document.getElementById("root")
);
