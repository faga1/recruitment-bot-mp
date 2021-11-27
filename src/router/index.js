import PubPosition from '@/pages/PubPosition'
import PubSuccess from '@/pages/PubSuccess'
import PosManage from '@/pages/PosManage'
import PosDetail from '@/pages/PosDetail'
import ResumeList from '@/pages/ResumeList'
import ResumeEva from '@/pages/ResumeEva'
import PositionName from '@/pages/PositionName'
import PositionDes from '@/pages/PositionDes'
import PlatFormErr from '@/pages/PlatFormErr'

function flatten(arr) {
	return arr.reduce((prev, current) => {
		return prev.concat(Array.isArray(current.children) ? flatten(current.children) : current);
	}, []);
}

export const menus = [
	{
		path: "/pubPosition",
		name: "发布职位",
		icon: "",
		exact: true,
		component: PubPosition,
	},
	{
		path:'/posDetail',
		name:'职位详情',
		icon:'',
		exact:true,
		component:PosDetail
	},
	{
		path: "/pubSuccess",
		name: "发布成功",
		icon: "",
		exact: true,
		component: PubSuccess,
	},
	{
		path: "/posManage",
		name: "职位管理",
		icon: "",
		exact: true,
		component: PosManage,
	},
	{
		path:'/resumeList',
		name:'简历列表',
		icon:'',
		exact:true,
		component:ResumeList
	},
	{
		path:'/resumeEva',
		name:'简历评价',
		icon:'',
		exact:true,
		component:ResumeEva
	},
	{
		path:'/positionName',
		name:'职位名称',
		icon:'',
		exact:true,
		component:PositionName
	},
	{
		path:'/positionDes',
		name:'职位描述',
		icon:'',
		exact:true,
		component:PositionDes
	},
	{
		path:'/platFormErr',
		name:'平台错误',
		icon:'',
		exact:true,
		component:PlatFormErr
	}
	// {
	// 	path: "/func",
	// 	name: "功能",
	// 	icon: "",
	// 	children: [
	// 		{
	// 			path: "/page1",
	// 			name: "员工管理",
	// 			icon: "",
	// 			exact: true,
	// 			component: Page1,
	// 		},
	// 		{
	// 			path: "/page2",
	// 			name: "Page2",
	// 			icon: "",
	// 			exact: true,
	// 			component: Page2,
	// 		},
	// 		{
	// 			path: "/page3",
	// 			name: "Page3",
	// 			icon: "",
	// 			exact: true,
	// 			component: Page3,
	// 		}
	// 	],
	// },
	// ...AntdComp,
	// {
	// 	path: "/setting",
	// 	name: "设置",
	// 	icon: "",
	// 	component: Setting,
	// },
];

const routes = flatten(menus);

export default routes;
