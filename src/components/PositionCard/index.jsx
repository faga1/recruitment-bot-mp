import React,{useEffect} from "react";
import address from '../../../public/address.png'
import avatar from '../../../public/avatar.jpg'
import './positionCard.scss'

export default (props)=>{
    console.log(props);
    useEffect(() => {
        console.log(props);
        return () => {
            
        }
    }, [])
    return (
        <>
            <div className="position-item" onClick={props.onClick}>
                <div className='item-left'>
                    <div className="item-name">{props.name}</div>
                    <div className="item-tag"><span>{props.minimumDegree}</span><span>{props.empiricalRequirements}</span></div>
                    <div className="item-company">
                        <img src={address}/>
                        <div className='company-text'>{props.address}</div>
                    </div>
                </div>
                <div className='item-right'>
                    <div className='item-salary'>{props.minimumSalary}-{props.highestSalary}K</div>
                    <div className='item-isPub' style={{color:props.published?'#0080FF':'#ACD5FF'}}>{props.published?'已发布':'未发布'}</div>
                </div>
            </div>
        </>
    )
}
