import React, { useState,useEffect } from 'react';
import { Document, Page, pdfjs} from 'react-pdf';
import {PDFReader} from 'react-read-pdf'
import { Toast } from 'antd-mobile';
import Title from '@/components/Title'
import ScoreOptions from '../../components/ScoreOptions';
import request from '../../components/request';
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


import './deliveryDetail.scss'
import {TextArea,Button, Mask} from 'antd-mobile';
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
  const [detail,setDetail] = useState({})
  const [shareInfo,setShareInfo] = useState()                  
  const [maskVis,setMaskVis] = useState(false)
  const isHandled=props.match.params.isHandled==='true'?true:false
  const id=props.match.params.deliveryRecordId
  const InfoList=[
      {
        icon:nameIcon,
        text:detail.name
      },
      {
        icon:sexIcon,
        text:detail.sex?'男':'女'
      },
      {
        icon:birthIcon,
        text:detail.age?detail.age:''+'岁'
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
      return setDetail(props.location.state)
    }
    getDetail()
    return () => {
    }
  }, [])

  const getDetail=async()=>{
    const handledText=isHandled?'handled':'unhandled'
    const res = await getDeliveryDetail(id,handledText)
    setDetail(res.data)
  }
  const getShareInfo=async(e)=>{
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
    if(res.code!==20000){
        Toast.show({
            icon:'fail',
            content:'获取分享链接失败'
        })
        return
    }
    
    setShareInfo(res.data)
    
    sessionStorage.setItem(id+'',JSON.stringify(res.data))
    setMaskVis(true)          
  }
  return (
    <div className='deliveryDetail'>
      <Title text='基本信息'></Title>
      {
        InfoList.map(item=>{
          return <InfoItem {...item} key={item.text}></InfoItem>
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

      
      
      <div className="btn">
        <Button style={{display:isHandled?'block':'none'}} className='edit' onClick={()=>{props.history.push(`/deliveryEva/${id}/${isHandled}`)}}>编辑</Button>
        <Button style={{display:isHandled?'block':'none'}} className='share' onClick={(e)=>getShareInfo(e)}>分享</Button>
        <Button style={{display:isHandled?'none':'block'}} className='evaluate' onClick={()=>{props.history.push(`/deliveryEva/${id}/${isHandled}`)}}>立即评价</Button>
      </div>
      <Mask visible={maskVis} onMaskClick={()=>setMaskVis(false)}>
        <ShareCard  {...shareInfo} cancleMask={()=>setMaskVis(false)}></ShareCard>
      </Mask>
    </div>
  );
}