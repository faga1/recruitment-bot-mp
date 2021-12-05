import React from "react";
import pickBtn from '../../../public/组 190.png'
import { Button } from 'antd-mobile'
import './pickerCard.scss'

export default (props)=>{
    return (
        <div className='picker-card'>
            <div className="picker-name">{props.label}</div>
            <Button className='picker-content' onClick={()=>props.method(props.index,props.posObj)} style={{color:props.content?'#000000':'#D1D1D1'}}>
                    {props.content?props.content:props.placeholder}
                    <img src={pickBtn} />
            </Button>
            
        </div>
    )
}