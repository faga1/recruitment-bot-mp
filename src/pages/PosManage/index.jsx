import React from "react";
import PositionCard from "../../components/PositionCard";
import { Button } from 'antd-mobile'
import './PosManage.scss'
export default function(){
    return (
        <div className='position-manage'>
            <PositionCard/>
            <PositionCard/>
            <PositionCard/>
            <PositionCard/>
            <PositionCard/>
            <Button className='publish-position'>发布新职位</Button>
        </div>
    )
}