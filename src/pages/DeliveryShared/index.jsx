import React,{useEffect,useState} from "react";
import avatar from "../../../public/avatar.jpg";
import {Input,Button,Toast} from 'antd-mobile'
import request from "../../components/request";
import './deliveryShared.scss'
import { confirmCode, getUsername } from "../../components/request/request";
export default (props)=>{
    const [username,setUsername] = useState()
    const {resource}=props.match.params
    const [codeVal,setCodeVal] = useState()
    const [codeStatus,setCodeStatus] = useState(0)
    useEffect(() => {
        console.log(resource);
        getUserInfo()
        return () => {
        }
    }, [])

    const getUserInfo=async()=>{
        const res = await getUsername(resource)
        if(res.code!==20000&&res.code!==41100){
            Toast.show({
               icon:'fail',
               content:'获取分享人信息失败' 
            })
            return
        }
        if(res.code===44100){
            return setCodeStatus(1)
        }
        setUsername(res.data)
    }
    const confirm=async()=>{
        Toast.show({
            icon:'loading',
            content:'验证中...',
            duration:0
        })
        const res=await confirmCode(codeVal,resource) 
        Toast.clear()
        if(res.code===44200){
            return setCodeStatus(2)
        }
        props.history.push({pathname:`/deliveryDetail/${res.data.id}/${true}`,state:res.data})
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