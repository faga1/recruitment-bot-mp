import React from "react";
import successIcon from '../../../public/成功.png'
import './pubSuccess.scss'
import {Button} from 'antd-mobile'

export default function(){
    
   
         
    return (
        <>
            <div className="success-icon">
                <img src={successIcon} alt="发布成功" />
                <div className='success-text'>发布成功</div>
            </div>
            <div className="success-tools">
                <Button className='pos-manage' >职位管理</Button>
                <Button className='pub-position'>发布新职位</Button>
            </div>
        </>
    )
}