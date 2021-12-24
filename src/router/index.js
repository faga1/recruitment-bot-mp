import PubPosition from '@/pages/PubPosition'
import Success from '@/pages/Success'
import PosManage from '@/pages/PosManage'
import PosDetail from '@/pages/PosDetail'
import DeliveryList from '@/pages/DeliveryList'
import DeliveryEva from '@/pages/DeliveryEva'
import PositionName from '@/pages/PositionName'
import PositionDesc from '@/pages/PositionDesc'
import DeliveryShared from '@/pages/DeliveryShared'
import DeliveryDetail from '../pages/DeliveryDetail'
import PdfDetail from '@/pages/PdfDetail'

// function flatten(arr) {
// 	return arr.reduce((prev, current) => {
// 		return prev.concat(Array.isArray(current.children) ? flatten(current.children) : current);
// 	}, []);
// }

export const menus = [
	{
		path: "/pubPosition",
		name: "发布职位",
		icon: "",
		exact: true,
		component: PubPosition,
	},
	{
		path:'/posDetail/:id',
		name:'职位详情',
		icon:'',
		exact:true,
		component:PosDetail
	},
	{
		path: "/success/:type",
		name: "发布成功",
		icon: "",
		exact: true,
		component: Success,
	},
	{
		path: "/posManage",
		name: "职位管理",
		icon: "",
		exact: true,
		component: PosManage,
	},
	{
		path:'/deliveryList',
		name:'简历列表',
		icon:'',
		exact:true,
		component:DeliveryList
	},
	{
		path:'/deliveryEva/:deliveryRecordId/:isHandled',
		name:'简历评价',
		icon:'',
		exact:true,
		component:DeliveryEva
	},
	{
		path:'/positionName',
		name:'职位名称',
		icon:'',
		exact:true,
		component:PositionName
	},
	{
		path:'/positionDesc',
		name:'职位描述',
		icon:'',
		exact:true,
		component:PositionDesc
	},
	{
		path:'/deliveryShared/:resource',
		name:'投递分享',
		icon:'',
		exact:true,
		component:DeliveryShared
	},
	{
		path:'/deliveryDetail/:deliveryRecordId/:isHandled',
		name:'投递详情',
		icon:'',
		exact:true,
		component:DeliveryDetail
	},
	{
		path:'/pdfDetail',
		name:'pdf详情',
		icon:'',
		exact:true,
		component:PdfDetail
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

// const routes = flatten(menus);

// export default routes;
