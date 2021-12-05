import React,{useEffect,useState} from "react";
import PositionCard from "../../components/PositionCard";
import { getPosList } from "../../components/request/request";
import { Button } from 'antd-mobile'
import './PosManage.scss'
export default function(props){
    const [posList,setPosList]=useState([])
    useEffect(() => {
        getPosList().then(val=>{
            setPosList((pre)=>{
                return [...pre,...val.data]
            })
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