import React,{useEffect,useState} from "react";
import avatar from "../../../public/avatar.jpg";
import {Input,Button,Toast} from 'antd-mobile'
import request from "../../components/request";
import './deliveryShared.scss'
import { confirmCode, getUsername } from "../../components/request/request";
export default (props)=>{
    const [username,setUsername] = useState()
    // 链接中的resource
    const {resource}=props.match.params
    // 提取码
    const [codeVal,setCodeVal] = useState('')
    // 0:正常 1:分享码已失效 2:提取码错误
    const [codeStatus,setCodeStatus] = useState(0)
    useEffect(() => {
        getUserInfo()
        return () => {
        }
    }, [])
    // 获取分享人信息
    const getUserInfo=async()=>{
        const res = await getUsername(resource)
        if(res.code===44100){
            return setCodeStatus(1)
        }
        if(res.code!==20000&&res.code!==41100){
            Toast.show({
               icon:'fail',
               content:'获取分享人信息失败' 
            })
            return
        }
        
        setUsername(res.data)
    }
    const confirm=async()=>{
        if(codeVal.trim()===''){
            Toast.show({
                icon:'fail',
                content:'提取码不能为空'
            })
            return
        }
        Toast.show({
            icon:'loading',
            content:'验证中...',
            duration:0
        })
        
        const res=await confirmCode(codeVal,resource) 
        Toast.clear()
        if(res.code===44200){
            // 提取码错误
            return setCodeStatus(2)
        }
        props.history.push({pathname:`/deliveryDetail/${res.data.id}/${true}`,state:{data:res.data,show:false}})
    }
    return (
        <div className="resume-share">
            <div className="extract-card">
                <div className='userInfo'>
                    <div className="username">{username}</div>
                    <div className='share-text'>分享</div>
                </div>
                <div className='code-status' style={{color:codeStatus===1?'#FF9900':'#FF0000'}}>{codeStatus===1&&<span>分享码已失效</span>}{codeStatus===2&&<span>验证码错误</span>}</div>
                <div className='extract-tools'>
                    <Input placeholder='输入提取码' value={codeVal} onChange={(val)=>setCodeVal(val)} disabled={codeStatus===1}/>
                    <Button onClick={confirm} disabled={codeStatus===1} style={{backgroundColor:codeStatus===1&&'#D1D1D1'}}>确认</Button>
                </div>
                <div className='validity-text'>有效期7天</div>
            </div>
        </div>
    )
}