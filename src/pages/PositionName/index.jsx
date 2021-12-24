import React,{useState,useEffect} from "react";
import { Input ,TreeSelect ,Button } from 'antd-mobile'
import optionData from '@/models/getCityPosition.json'
import './positionName.scss'
const replaceField={
  label:'name',
  value:'code',
  children:'subLevelModelList'
}
/**
 * 
 * @param {Array} position 未处理的职位列表 
 * @returns 删除后的职位列表
 */
function deleteThirdNode(position){
  position.forEach(item=>{
    if(item.subLevelModelList){
      item.subLevelModelList.forEach(item1=>{
        delete item1.subLevelModelList
      })
    }
  })
  return position
}

const options = deleteThirdNode(optionData.zpData.position)
// 由于在onchange中无法拿到label，只能通过遍历来获取label
/**
 * 
 * @param {Array} options 职位数组
 * @param {number} code 职位的唯一标识
 * @returns label
 */
function searchLabel(options,code){
  for(const item of options){
    if(item.code===code){
      return item.name
    }
    if(item.subLevelModelList){
      for(const item1 of item.subLevelModelList){
        if(item1.code===code){
          return item1.name
        }
      }
    }
  }
}

export default(props)=>{
    const [inputValue,setInputVal]=useState('')
    useEffect(() => {
      setInputVal(props.location.state.value)
      return () => {
      }
    },[])
    //保存后跳转
    const storeVal=()=>{
        props.history.push({pathname:'/pubPosition',state:{value:inputValue,index:0}})
    }
      
    return (
        <div className='positionName'>
            <Input
                placeholder='输入职位名称(0/20)'
                value={inputValue}
                onChange={(v)=>{setInputVal(v)}}
            />
             <TreeSelect
             defaultValue={[100000]}
             options={options}
             fieldNames={replaceField}
                onChange={(value) => {
                  let label=searchLabel(options,value[1])
                  setInputVal(label)
                }}
                
            />
            <Button  onClick={storeVal}>保存</Button>
        </div>
    )
}