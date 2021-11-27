import React from "react";
import address from '../../../public/组 197.png'
import avatar from '../../../public/avatar.jpg'
import './positionCard.scss'

export default ()=>{
    return (
        <>
            <div className="position-item">
                <div className='item-left'>
                    <div className="item-name">Java高级开发工程师</div>
                    <div className="item-tag"><span>本科</span><span>5-10年</span></div>
                    <div className="item-company">
                        <img src={address}/>
                        <span className='company-text'>深圳告诉工程顾问有限公司</span>
                    </div>
                    <div className='recruiterInfo'>
                        <img src={avatar}></img>
                        <span className='recruiter-name'>用户233</span>
                    </div>
                </div>
                <div className='item-right'>
                    <div className='item-salary'>15-30K</div>
                    <div className="item-isPub">未发布</div>
                    <div className="item-address">西安雁塔区</div>
                </div>
            </div>
        </>
    )
}
