import React, { useState ,useEffect} from 'react';
import { TextArea,Button } from 'antd-mobile';
import './positionDesc.scss'

export default function (props) {
    const [textVal,setTextVal]=useState('')
    useEffect(() => {
        setTextVal(props.location.state.value)
        return () => {
            
        }
    }, [])
    const storeText=()=>{
        props.history.push({pathname:'/pubPosition',state:{value:textVal,index:1}})
    }
  return (
    <div className='position-desc'>
        <TextArea
            placeholder='请输入职位描述...'
            value={textVal}
            onChange={val=>{
                setTextVal(val)
            }}
        ></TextArea>
        <Button onClick={storeText}>保存</Button>
    </div>
  );
}