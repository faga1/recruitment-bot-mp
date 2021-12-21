import React from "react";
import {Button, Toast} from 'antd-mobile'
import './shareCard.scss'
import TextArea from "antd/lib/input/TextArea";
import copy from 'copy-to-clipboard'
export default (props)=>{
    const url=props.url
    const code=props.code
    // textArea中显示的内容
    const textVal=url+' 提取码:'+code
    // 实际复制的内容
    const copyVal='hi,这是我觉得还不错的简历,有效期七天,请尽快查阅哦。链接:'+url+'提取码:'+code
    const copyUrl=()=>{
        copy(copyVal)
        Toast.show({
            icon:'success',
            content:'复制成功'
        })
    }
    return (
        <div className='share-card'>
            <div className='share-card-text'>赶紧分享给朋友吧</div>
            <div className='expire'>有效期:7天</div>
            <TextArea className="share-url"  value={textVal}/>
                
            <div className="share-tools">
                <Button className='cancle' onClick={props.cancleMask}>取消</Button>
                <Button className='copy' onClick={copyUrl}>复制分享</Button>
            </div>
        </div>
    )
}