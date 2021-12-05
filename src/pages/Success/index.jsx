import React from "react";
import successIcon from '../../../public/成功.png'
import './success.scss'
import {Button} from 'antd-mobile'

export default function(props){
    const {type}=props.match.params
    const id = props.location.state?props.location.state.id:null
    const url_left=type==='pub'?'/posManage':`/deliveryDetail/${id}/${true}`
    const url_right=type==='pub'?'/pubPosition':'/deliveryList'
    return (
        <>
            <div className="success-icon">
                <img src={successIcon}  />
                <div className='success-text'>{type==='pub'?'发布成功':'提交成功'}</div>
            </div>
            <div className="success-tools">
                <Button className='pos-manage' onClick={()=>props.history.push(url_left)}>{type==='pub'?'职位管理':'返回'}</Button>
                <Button className='pub-position' onClick={()=>props.history.push(url_right)}>{type==='pub'?'发布新职位':'简历列表'}</Button>
            </div>
        </>
    )
}