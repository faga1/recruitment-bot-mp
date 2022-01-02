# 前端项目模板

## 启动

```
npm run server
or
npm run build
```
## 目录

```
    |-- .gitignore
    |-- .npmignore
    |-- .prettierrc
    |-- jsconfig.json
    |-- package-lock.json
    |-- package.json
    |-- packez.config.js
    |-- README.md
    |-- tsconfig.json
    |-- dist//子目录省略
    |-- dist-analyzer//子目录省略
    |-- public//子目录省略
    |-- src
        |-- App.js
        |-- index.html
        |-- index.js
        |-- version.js
        |-- assets
        |   |-- common.scss//一些全局的样式
        |   |-- dsky-antd.scss//修改antd的样式
        |   |-- normalize.css
        |   |-- styles.scss
        |   |-- _var.scss//声明变量
        |-- components//定义组件
        |   |-- PickerCard// 发布职位页面的每一个选择框
        |   |   |-- index.jsx
        |   |   |-- pickerCard.scss
        |   |-- PositionCard//职位详情和职位管理的卡片
        |   |   |-- index.jsx
        |   |   |-- positionCard.scss
        |   |-- request//配置axios
        |   |   |-- index.js
        |   |   |-- request.js//请求封装的文件
        |   |-- ResumeCard//简历列表中简历卡片
        |   |   |-- index.jsx
        |   |   |-- resumeCard.scss
        |   |-- ScoreOptions//简历得分组件
        |   |   |-- index.jsx
        |   |   |-- scoreOptions.scss
        |   |-- ShareCard//分享时弹窗的组件
        |   |   |-- index.jsx
        |   |   |-- shareCard.scss
        |   |-- Title//简历详情和简历评价中标题组件
        |       |-- index.jsx
        |       |-- title.scss
        |-- config
        |   |-- index.js
        |-- mock
        |   |-- index.js
        |-- models
        |   |-- common.js//函数封装
        |   |-- employee.js
        |   |-- getCityPosition.json//职位名称的文件
        |-- pages
        |   |-- comp-pages//antd组件修改后的组件(子目录省略)
        //路由组件
        |   |-- DeliveryDetail
        |   |   |-- deliveryDetail.scss
        |   |   |-- index.jsx
        |   |-- DeliveryEva
        |   |   |-- deliveryEva.scss
        |   |   |-- index.jsx
        |   |-- DeliveryList
        |   |   |-- deliveryList.scss
        |   |   |-- index.jsx
        |   |-- DeliveryShared
        |   |   |-- deliveryShared.scss
        |   |   |-- index.jsx
        |   |-- PdfDetail
        |   |   |-- index.jsx
        |   |   |-- pdfDetail.scss
        |   |-- PosDetail
        |   |   |-- index.jsx
        |   |   |-- posDetail.scss
        |   |-- PositionDesc
        |   |   |-- index.jsx
        |   |   |-- positionDesc.scss
        |   |-- PositionName
        |   |   |-- index.jsx
        |   |   |-- positionName.scss
        |   |-- PosManage
        |   |   |-- index.jsx
        |   |   |-- PosManage.scss
        |   |-- PubPosition
        |   |   |-- index.jsx
        |   |   |-- location.js
        |   |   |-- pubPosition.scss
        |   |-- Success
        |       |-- index.jsx
        |       |-- success.scss
        //路由配置文件
        |-- router
        |   |-- antdComp.js
        |   |-- index.js
        |-- utils
            |-- index.js


```

## 路由
全部使用一级路由
|路由|页面|参数|
|----|----|----|
|/pubPosition|发布职位|无|
|/posDetail|职位详情|id|
|/success|成功|type|
|/posManage|职位管理|无|
|/deliveryList|简历列表|无|
|/deliveryEva|简历详情|deliveryRecordId,isHandled|
|/positionName|职位名称|无|
|/positionDesc|职位描述|无|
|/deliveryDetail|投递详情|deliveryRecordId,isHandled|
|/pdfDetail|pdf详情|无|

## 注意事项
* pdfDetail组件是使用类式组件其余都是用函数式组件
* 如果需要修改navigationBarTitle需要配置小程序配置文件
* 如果需要用vconsole进行调试不用通过cdn引入,会产生冲突
* 使用fanbook小程序的api调用方法:window.fb.xxx
* 部署后需要修改baseUrl，在src/components/request/index.js:25处修改
* 部署后需要修改授权地址，该(重定向)地址由后端提供,重定向至授权页面(src/models/common.js)