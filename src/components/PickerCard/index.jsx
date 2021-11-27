import React from "react";
import pickBtn from '../../../public/组 190.png'
import { Button } from 'antd-mobile'
import './pickerCard.scss'

export default (props)=>{
    console.log(props);
    return (
        <div className='picker-card'>
            <div className="picker-name">{props.name}</div>
            <Button className='picker-content' onClick={()=>props.method(props.index)}>
                {props.content} 
                <img src={pickBtn} />
            </Button>
        </div>
    )
}