import React,{useEffect,useState} from "react";
import PositionCard from "../../components/PositionCard";
import { getPosList } from "../../components/request/request";
import { Button, Dialog } from 'antd-mobile'
import './PosManage.scss'
import { oAuth } from "../../models/common";
export default function(props){
    const [posList,setPosList]=useState([])
    useEffect(() => {
        if(!localStorage.getItem('token')){
            setTimeout(() => {
                // 身份判断
                oAuth('recruiter').then(()=>{
                    getPosList().then(val=>{
                        
                        if(val.code===20000){
                            setPosList((pre)=>{
                                return [...pre,...val.data]
                            })
                        }
                    })
                })
            }, 600);
        }
        getPosList().then(val=>{
            if(val.code===20000){
                setPosList((pre)=>{
                    return [...pre,...val.data]
                })
            }
        })
        return () => {
        }
    }, [])
    const toDetail=(index)=>{
        props.history.push({pathname:`/posDetail/${posList[index].id}`})
    }
    const pubNewPos=()=>{
        props.history.push('/pubPosition')
    }
    return (
        <div className='position-manage'>
            {
                posList.map((item,index)=>{
                    return <PositionCard {...item} onClick={()=>toDetail(index)} key={item.id}></PositionCard>
                })
            }
            <Button className='publish-position' onClick={pubNewPos}>发布新职位</Button>
        </div>
    )
}