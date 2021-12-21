import React, { useState,useEffect } from 'react';
import { Document, Page, pdfjs} from 'react-pdf';
import Title from '@/components/Title'
import ScoreOptions from '../../components/ScoreOptions';
import nameIcon from '../../../public/组 219.png'
import sexIcon from '../../../public/组 220.png'
import birthIcon from '../../../public/组 209.png'
import degreeIcon from '../../../public/degree.png'
import experienceIcon from '../../../public/experience.png'
import telIcon from '../../../public/tel.png'
import emailIcon from '../../../public/email.png'
import addressIcon from '../../../public/address.png'
import positionIcon from '../../../public/组 205.png'
import ShareCard from '../../components/ShareCard';
import moment from 'moment'

import './deliveryDetail.scss'
import {TextArea,Button, Mask, Toast} from 'antd-mobile';
import { getDeliveryDetail, getShareLink } from '../../components/request/request';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function InfoItem(props){
  return (
    <div className='info-item'>
      <img src={props.icon}  />
      <span>{props.text}</span>
    </div>
  )
}

export default function (props) {
  const [pageNumber, setPageNumber] = useState(1);
  // 投递信息
  const [detail,setDetail] = useState({})
  //分享框中信息
  const [shareInfo,setShareInfo] = useState()  
  //遮罩层是否可见                
  const [maskVis,setMaskVis] = useState(false)
  // 判断该简历是否被处理
  const isHandled=props.match.params.isHandled==='true'?true:false
  // 简历ID
  const id=props.match.params.deliveryRecordId
  // 是否从分享入口来
  const show = props.location.state?props.location.state.show:true
  // 求职者信息
  const InfoList=[
      {
        icon:nameIcon,
        text:detail.name
      },
      {
        icon:sexIcon,
        text:detail.sex?detail.sex:''
      },
      {
        icon:birthIcon,
        text:detail.age?detail.age+'岁':''
      },
      {
        icon:degreeIcon,
        text:detail.degree
      },
      {
        icon:experienceIcon,
        text:detail.workYear
      },
      {
        icon:telIcon,
        text:detail.contactNumber
      },
      {
        icon:emailIcon,
        text:detail.emailAddress
      },
      {
        icon:addressIcon,
        text:detail.address
      }
    ] 
  useEffect(() => {
    if(props.location.state){
      let data= props.location.state.data
      // 将性别转化为字符串
      data.sex=data.sex?'男':'女'
      // 格式化最近处理时间
      data.updateTime=moment(data.updateTime).format('YYYY.MM.DD')
      return setDetail(data)
    }
    getDetail()
    return () => {
    }
  }, [])

  const getDetail=async()=>{
    const handledText=isHandled?'handled':'unhandled'
    const res = await getDeliveryDetail(id,handledText)
    if(res.code===20000){
      res.data.sex=res.data.sex?'男':'女'
      res.data.updateTime=moment(res.data.updateTime).format('YYYY.MM.DD')
      setDetail(res.data)
    }
  }
  const getShareInfo=async(e)=>{
    // 阻止冒泡
    e.stopPropagation()
    const id=detail.id
    // 将连接信息缓存，如果有缓存则走缓存
    if(sessionStorage.getItem(id+'')){
      setShareInfo(JSON.parse(sessionStorage.getItem(id+'')))
      setMaskVis(true)
      return 
    }
    Toast.show({
      icon:'loading',
      content:'链接生成中...',
      duration:0,
      maskClickable:false
    })
    const res = await getShareLink(id)
    Toast.clear()
    if(res.code===20000){
      setShareInfo(res.data)
      sessionStorage.setItem(id+'',JSON.stringify(res.data))
      setMaskVis(true)
    }
  }
  return (
    <div className='deliveryDetail' >
      <Title text='基本信息'></Title>
      {
        InfoList.map(item=>{
          return <InfoItem {...item} ></InfoItem>
        })
      }
      <Title text='投递岗位'></Title>
      <InfoItem icon={positionIcon} text={detail.positionName}></InfoItem>
      <Title text='个人描述'></Title>
      <TextArea value={detail.personalDesc} autoSize={{maxRows:5}}></TextArea>
      <div className="score" style={{display:isHandled?'block':'none'}}>
        <Title text='得分'></Title>
        <ScoreOptions currentScore={detail.score}></ScoreOptions>
        <div className="score-explain">3:通过,能力达到要求,建议录用</div>
      </div>
      <Title text='个人简历'></Title>
      <div className='pdfViewer' onClick={()=>props.history.push({pathname:'/pdfDetail',state:{file:detail.resumeAttachment}})}>
        <Document
          file={detail.resumeAttachment}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      {isHandled&&<div>
        <Title text='综合评价'></Title>
        <TextArea className='evaluation' 
          autoSize={{minRows:5,maxRows:10}} 
          value={detail.evaluation} disabled 

        ></TextArea>
        <div className='updateInfo'>
          <div className='updateTime'>最近更新于{detail.updateTime}</div>
          <div className='handlerName'>操作人:{detail.handlerFanbookNickname}</div>
        </div>
      </div>}
      
      
      {show&&<div className="btn" >
        <Button style={{display:isHandled?'block':'none'}} className='edit' onClick={()=>{props.history.push(`/deliveryEva/${id}/${isHandled}`)}}>编辑</Button>
        <Button style={{display:isHandled?'block':'none'}} className='share' onClick={(e)=>getShareInfo(e)}>分享</Button>
        <Button style={{display:isHandled?'none':'block'}} className='evaluate' onClick={()=>{props.history.push(`/deliveryEva/${id}/${isHandled}`)}}>立即评价</Button>
      </div>}
      <Mask visible={maskVis} onMaskClick={()=>setMaskVis(false)}>
        <ShareCard  {...shareInfo} cancleMask={()=>setMaskVis(false)}></ShareCard>
      </Mask>
    </div>
  );
}