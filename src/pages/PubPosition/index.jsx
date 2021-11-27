import React,{useEffect,useState} from "react";
import {Picker,CascadePicker,Input} from 'antd-mobile'
import PickerCard from '@/components/PickerCard'
import request from '@/components/request'
import './pubPosition.scss'
import pickBtn from '../../../public/组 190.png'
import destrictData from './location'

export default function(props){
    const [pickerVis,setPickerVis]=useState(false)//picker是否可见
    const [pickerOwner,setPickerOwner]=useState(0)//picker对应的是哪个信息
    const [columns,setColumns]=useState([[]])//picker中的选项
    const [cascadeVis,setCascadeVis]=useState(false)//级联选择器是否可见
    const [companyVal,setCompanyVal]=useState('')
    // 显示picker
    const showPicker=(index)=>{
        console.log(posInfo);
        setColumns([posInfo[index].pickList])
        setPickerOwner(index)
        setPickerVis(true) 
    }
    //显示cascadePicker
    const showCascade=(index)=>{
        setPickerOwner(index)
        setCascadeVis(true)
    }
    //关于职位需要填写的信息
    const [posInfo,setPosInfo]=useState([
        {
            name:'职位名称',
            content:'',
            method:()=>{props.history.push('/positionName')},//点击时对应的方法
            pickList:[]
        },
        {
            name:'职位描述',
            content:'',
            method:()=>{props.history.push('/positionDes')},
            pickList:['职位描述1','职位描述2']
        },
        {
            name:'工作地址',
            content:'',
            method:showCascade,
            pickList:[]
        },
        {
            name:'职位类型',
            content:'',
            method:showPicker,
            pickList:['职位类型1','职位类型2','职位类型3','职位类型4','职位类型5'],//对应columns
        },
        {
            name:'经验要求',
            content:'',
            method:showPicker,
            pickList:['经验要求1','经验要求2']
        },
        {
            name:'最低学历',
            content:'',
            method:showPicker,
            pickList:['不限','初中及以下','中专/中计','高中','大专','本科','硕士','博士']
        }
    ])
    

    return (
        <div className='pubPosition'>
            <div className="pos-company">
                <div className='picker-card'>
                    <div className="picker-name">招聘公司</div>
                    <div className='picker-content'>
                        <Input className='picker-content' value={companyVal} onChange={(val)=>{setCompanyVal(val)}} />
                        <img src={pickBtn} />
                    </div>
                    

                </div>            
            </div>
            {
                posInfo.map((item,index)=>(
                    <PickerCard {...item} key={item.name} index={index} setPosInfo={setPosInfo}></PickerCard>
                ))
            }
            <Picker
                columns={columns}
            >
            </Picker>
            <Picker 
                title={posInfo[pickerOwner].name}
                columns={columns}
                visible={pickerVis}
                cols={1}
                onClose={()=>{
                    setPickerVis(false)
                }}
                onConfirm={v=>{
                    setPosInfo(preInfo=>{
                        preInfo[pickerOwner].content=v[0]
                        return [...preInfo]
                    })
                }}
                onChange={v=>{

                }}
                />
            <CascadePicker
                title='地区选择'
                options={destrictData}
                visible={cascadeVis}
                onClose={() => {
                    setCascadeVis(false)
                }}
                onConfirm={v=>{
                    setPosInfo(preInfo=>{
                        preInfo[pickerOwner].content=v[1]+v[2]
                        return [...preInfo]
                    })
                }}
                
            />
        </div>
    )
}