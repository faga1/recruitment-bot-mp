import React,{useState,useEffect} from "react";
import {Tabs, Toast,Mask} from 'antd-mobile'
import ShareCard from "../../components/ShareCard";
import ResumeCard from "../../components/ResumeCard";
import './deliveryList.scss'
import { getDeliveryList, getShareLink } from "../../components/request/request";
import { oAuth } from "../../models/common";


export default (props)=>{
    // tab栏状态
    const [activeKey,setKey]=useState('unhandled')
    // 已处理列表
    const [handledList,setHandledList]=useState([])
    // 未处理列表
    const [unhandledList,setUnhandledList]=useState([])
    // 遮罩层显示
    const [maskVis,setMaskVis] = useState(false)
    // 分享信息(url，提取码，过期时间)
    const [shareInfo,setShareInfo]=useState()
    // 切换tab栏触发事件
    const changeKey=(key)=>{
        setKey(key)
        if(key!=='handled') return
        if(!handledList.length){
            getList(key)
        }
    }
    useEffect(() => {
        // 如果没有token，请求重发
        if(!localStorage.getItem('token')){
            oAuth('admain').then(()=>{
                getList('unhandled')
            })
        }
        // 一开始请求获取未处理的，后续点击tab栏再请求处理过的
        getList('unhandled')
        return () => {
        }
    }, [])
    // 获取投递列表，参数代表获取已上传还是未上传
    /**
     * 
     * @param {string} handledText 是否已被处理
     * @returns 
     */
    const getList=async(handledText)=>{
        const res = await getDeliveryList(handledText)
        if(res.code===20000){
            if(handledText==='handled'){
                setHandledList(pre=>{
                    return [...pre,...res.data]
                })
                return 
            }
            setUnhandledList(res.data)
        }
    }
    /**
     * 
     * @param {number} index 简历序号 
     * @param {boolean} isHandled 是否被处理 
     * @returns 
     */
    const toDeliveryDetail=(index,isHandled)=>{
        if(isHandled){
            return props.history.push(`/deliveryDetail/${handledList[index].id}/${isHandled}`)
        }
        props.history.push(`/deliveryDetail/${unhandledList[index].id}/${isHandled}`)
    }
    // 点击分享
    const shareClick=async(index,e)=>{
        //阻止冒泡
        e.stopPropagation()
        const id=handledList[index].id
        // 将连接信息缓存，如果有缓存则走缓存
        if(sessionStorage.getItem(id+'')){
            setShareInfo(JSON.parse(sessionStorage.getItem(id+'')))
            setMaskVis(true)
            return 
        }
        Toast.show({
            icon:'loading',
            content:'链接生成中...',
            duration:0,
            maskClickable:false
        })
        const res = await getShareLink(id)
        Toast.clear()
        if(res.code===20000){
            setShareInfo(res.data)
            sessionStorage.setItem(id+'',JSON.stringify(res.data))
            setMaskVis(true)
        }
    }
    
    return (
        <>
            <Tabs activeKey={activeKey} onChange={changeKey}>
                <Tabs.Tab title='待处理' key='unhandled' >
                </Tabs.Tab>
                <Tabs.Tab title='已处理' key='handled'>
                </Tabs.Tab>
            </Tabs>
            <div className='Tabs-content'>
                {
                    activeKey==='handled'&&
                    handledList.map((item,index)=>{
                        return <ResumeCard  activeKey={activeKey}  {...item} onClick={()=>toDeliveryDetail(index,true)} shareClick={(e)=>shareClick(index,e)}></ResumeCard>
                    })
                }
                {
                    activeKey==='unhandled'&&
                    unhandledList.map((item,index)=>{
                        return <ResumeCard activeKey={activeKey} {...item} onClick={()=>toDeliveryDetail(index,false)}></ResumeCard>
                    })
                }

            </div>
            <Mask visible={maskVis} onMaskClick={()=>setMaskVis(false)}>
                <ShareCard {...shareInfo} cancleMask={()=>setMaskVis(false)}></ShareCard>
            </Mask>
        </>
    )
}