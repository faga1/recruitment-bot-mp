import React,{useEffect,useState} from "react";
import PositionCard from "../../components/PositionCard";
import {Button, TextArea, Toast} from 'antd-mobile'
import { getPosInfo,positionPub } from "../../components/request/request";
import './posDetail.scss'

export default (props)=>{
    // 职位信息
    const [posObj,setPosObj]=useState({
        published:true
    })
    
    const posEdit=()=>{
        props.history.push({pathname:'/pubPosition',query:{id:props.match.params.id}})
    }
    useEffect(() => {
        let id =props.match.params.id
        getPosInfo(id).then(val=>{
            if(val.code===20000){
                setPosObj(val.data)
            }
        })
        return () => {
        }
    }, [])
    // 发布职位
    const posPub=async()=>{
        const res = await positionPub(props.match.params.id)
        if(res.code===20000){
            Toast.show({
                icon:'success',
                content:'发布成功'
            })
            props.history.push('/success/pub')
        }
    }
    return (
        <div className='position-detail'>
            <PositionCard {...posObj}/>
            <div className='position-des'>
                <div className='des-text'>职位描述</div>
                <TextArea className="des-content" value={posObj.desc} autoSize={{ minRows: 10, maxRows: 100 }}>
                    
                </TextArea>
                
            </div>
            <div className='detail-tools'>
                <Button className='edit' onClick={posEdit} style={{display:posObj.published?'none':'block'}}>编辑</Button>
                <Button type='primary' className='publish' onClick={posPub} style={{display:posObj.published?'none':'block'}}>发布</Button>
                <div className='published' style={{display:posObj.published?'block':'none'}}>已发布</div>
            </div>
        </div>
    )
}