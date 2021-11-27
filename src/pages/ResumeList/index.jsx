import React,{useState} from "react";
import {Tabs} from 'antd-mobile'
import ResumeCard from "../../components/ResumeCard";
import { oAuth } from "../../models/common";
import './resumeList.scss'

export default ()=>{
    const [activeKey,setKey]=useState('untread')


    var changeKey=(key)=>{
        setKey(key)
    }
    return (
        <>
            <Tabs activeKey={activeKey} onChange={changeKey}>
                <Tabs.Tab title='已处理' key='tread' >
                </Tabs.Tab>
                <Tabs.Tab title='未处理' key='untread'>
                </Tabs.Tab>
            </Tabs>
            <div className='Tabs-content'>
                <ResumeCard activeKey={activeKey}></ResumeCard>
                <ResumeCard activeKey={activeKey}></ResumeCard>
                <ResumeCard activeKey={activeKey}></ResumeCard>
                <ResumeCard activeKey={activeKey}></ResumeCard>
                <ResumeCard activeKey={activeKey}></ResumeCard>
                <ResumeCard activeKey={activeKey}></ResumeCard>
            </div>
        </>
    )
}