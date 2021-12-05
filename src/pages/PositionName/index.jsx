import React,{useState,useEffect} from "react";
import { Input ,TreeSelect ,Button } from 'antd-mobile'

import './positionName.scss'

export default(props)=>{
    const [inputValue,setInputVal]=useState('')
    const options=[
        {
            label: '研发',
            value: '研发',
            children: [
              {
                label: '后端开发',
                value: '后端开发',
              },
              {
                label: '前端开发',
                value: '前端开发',
              },
              {
                label: '客户端开发',
                value: '客户端开发',
              },
              {
                label: '算法',
                value: '算法',
              },
              {
                label: '测试',
                value: '测试',
              }
            ],
          },
          {
            label: '运营',
            value: '运营',
            children: [
              {
                label: '产品运营',
                value: '产品运营',
              },
              {
                label: '内容运营',
                value: '内容运营',
              },
              {
                label: '用户运营',
                value: '用户运营',
              },
              {
                label: '商业运营',
                value: '商业运营',
              },
              {
                label: '审核运营',
                value: '审核运营',
              },
              {
                label: '销售运营',
                value: '销售运营',
              },
              {
                label: '频道运营',
                value: '频道运营',
              }
            ],
          },
          {
            label: '产品',
            value: '产品',
            children: [
              {
                label: '产品经理',
                value: '产品经理',
              },
              {
                label: '数据分析',
                value: '数据分析',
              },
            ],
          },
          {
            label: '市场',
            value: '市场',
            children: [
              {
                label: '营销策划',
                value: '营销策划',
              },
              {
                label: 'PR',
                value: 'PR',
              },
            ],
          }
        ]
    useEffect(() => {
      setInputVal(props.location.state.value)
      return () => {
      }
    },[])
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
                defaultValue={['A', 'A1', 'A12']}
                options={options}
                onChange={(value) => {
                    setInputVal(value[1])
                }}
            />
            <Button  onClick={storeVal}>保存</Button>
        </div>
    )
}