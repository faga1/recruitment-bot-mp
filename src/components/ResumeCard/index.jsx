import { Button } from "antd-mobile";
import React from "react";
import avatar from '../../../public/avatar.jpg'
import share from '../../../public/组 215.png'
import './resumeCard.scss'
import positionIcon from '../../../public/组 205.png'

export default (props)=>{
    return (
        <div className='resume-card' 
            onClick={props.onClick}
            >
            {/* <div className="hunterInfo">
                <img src={avatar} alt="" />
                <div className="hunter-name">{props.name}</div>
            </div> */}
            <div className="positionName">
                <img src={positionIcon}  />
                <span className='position-text'>{props.positionName}</span>
            </div>
            <div className='hunter-tags'>
                <div className="tag-item">{props.degree}</div>
                <div className="tag-item">{props.workYear}</div>
                <div className="tag-item">{props.age}</div>
            </div>
            
            <div className="self-des">
                {props.personalDesc}
            </div>
            <Button className="share-btn" style={{display:(props.activeKey)==='handled'?'block':'none'}} onClick={props.shareClick}>
                <img src={share} />
            </Button>
        </div>
    )
}