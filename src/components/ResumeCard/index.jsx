import React from "react";
import avatar from '../../../public/avatar.jpg'
import share from '../../../public/组 215.png'
import './resumeCard.scss'

export default (props)=>{
    return (
        <div className='resume-card'>
            <div className="hunterInfo">
                <img src={avatar} alt="" />
                <div className="hunter-name">用户234</div>
            </div>
            <div className='hunter-tags'>
                <div className="tag-item">本科</div>
                <div className="tag-item">5-10年</div>
                <div className="tag-item">26岁</div>
            </div>
            <div className="self-des">
                5年以上java开发经验，本科以上学历，java基础扎实， 深入了解java成熟开源框架...
            </div>
            <div className="share-btn" style={{display:(props.activeKey)==='tread'?'none':'block'}}>
                <img src={share} />
            </div>
        </div>
    )
}