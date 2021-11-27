import React,{useState} from "react";
import { Input ,TreeSelect ,Button } from 'antd-mobile'

import './positionName.scss'

export default(props)=>{
    const [inputValue,setInputVal]=useState('')
    const options=[
        {
            label: '职位种类1',
            value: '职位种类1',
            children: [
              {
                label: '职位1',
                value: '职位1',
              },
              {
                label: '职位2',
                value: '职位2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
          {
            label: '分类B',
            value: 'B',
            children: [
              {
                label: '分类B-1',
                value: 'B1',
              },
              {
                label: '分类B-2',
                value: 'B2',
              },
            ],
          },
        ]

    const storeVal=()=>{
        console.log(props);
        props.history.push({pathname:'/pubPosition',state:{value:inputValue}})
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