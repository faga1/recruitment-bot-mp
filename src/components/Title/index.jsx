import React from "react";
import './title.scss'

export default (props)=>{
    return(
        <div className='title'>
            <div className="rectangle"></div>
            <div className="text">{props.text}</div>
            <div className="text-des">{props.desc}</div>
        </div>
    )
}