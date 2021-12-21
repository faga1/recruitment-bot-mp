import React,{useState,useEffect} from "react";
import commonPassed from '../../../public/对号 (1).png'
import passed from '../../../public/对号.png'
import commonFailed from '../../../public/错号 圆 (1).png'
import failed from '../../../public/错号 圆.png'
import {Button, TextArea,Toast} from 'antd-mobile' 
import Title from '@/components/Title'
import ScoreOptions,{score} from "../../components/ScoreOptions";
import './deliveryEva.scss'
import { getDeliveryDetail, postEvaluation } from "../../components/request/request";

export default (props)=>{
    //是否通过 0:未处理 1:通过 2:w未通过
    const [ispassed,setIspassed]=useState(0)
    const [isKeyboard,setIsKeyboard] = useState(false)
    const [textVal,setTextVal]=useState('')
    // 当前分数
    const [currentScore,setCurrentScore]=useState()
    // 职位名称
    const [positionName,setPositionName]=useState('')
    const isHandled=props.match.params.isHandled==='true'?true:false
    const id = props.match.params.deliveryRecordId
    useEffect(() => {
        getEvaluation()
        return () => {
        }
    }, [])
    // 将分数与是否通过关联
    useEffect(() => {
        if(currentScore<3){
            return setIspassed(2)
        }
        if(currentScore>0){
            setIspassed(1)
        }
        return () => {
        }
    }, [currentScore])
    // 获取评价
    const getEvaluation=async()=>{
        let handledText=isHandled?'handled':'unhandled'
        const res = await getDeliveryDetail(id,handledText)
        if(res.code===20000){
            setPositionName(res.data.positionName)
            if(isHandled){
                setTextVal(res.data.evaluation)
                setCurrentScore(res.data.score)
            }
        }
    }
    // 改变分数
    const changeScore=(score)=>{
        if(score<3){
            setIspassed(2)
        }else{
            setIspassed(1)
        }
        setCurrentScore(score)
    }
    // 改变是否通过
    const changePassed=(passed)=>{
        setIspassed(passed)
        if(!currentScore){
            if(passed===1){
                setCurrentScore(3)
            }
            else{
                setCurrentScore(2)
            }
            return
        }
        if(passed===1&&currentScore<3){
            setCurrentScore(3)
        }
        if(passed===2&&currentScore>2.5){
            setCurrentScore(2)
        }
    }
    // 发送评价
    const sendEva=async()=>{
        console.log(props.match.params.deliveryRecodeId);
        let eva={
            deliveryRecordId:props.match.params.deliveryRecordId,
            score:currentScore,
            evaluation:textVal
        }
        const res = await postEvaluation(eva)
        if(res.code===20000){
            props.history.push({pathname:'/success/commit',state:{id}})
        }
    }
    return(
        <div className='resume-eva' style={{marginBottom:isKeyboard?'70vw':''}}>
            <div className="position-deliver">
                <Title text='投递简历'></Title>
                <div className='deliver-card'>{positionName}</div>
            </div>
            <div className="eva-result">
                <Title text='结论' desc='(简历提交,点击编辑之后可修改)'></Title>
                <div className="result-btn">

                    <Button className='btn' style={{backgroundColor:ispassed===2?'#FFD1D1':'',color:ispassed===2?'#FF0000':''}} onClick={()=>changePassed(2)}>
                        <img src={ispassed===2?failed:commonFailed} alt="" />
                        <span>不通过</span>
                    </Button>
                    <Button className="passed btn" style={{backgroundColor:ispassed===1?'#C7FFC3':'',color:ispassed===1?'#00D410':''}} onClick={()=>changePassed(1)}>
                        <img src={ispassed===1?passed:commonPassed} alt="" />
                        <span>通过</span>
                    </Button>
                </div>
            </div>
            <div className="resume-score">
                <Title text='得分' desc='(简历提交,点击编辑之后可修改)'></Title>
                <ScoreOptions onClick={changeScore} currentScore={currentScore}></ScoreOptions>
                <div className="score-explain">3:通过,能力达到要求,建议录用</div>
            </div>
            <div className="assessment">
                <Title text='综合评价'></Title>
                <TextArea  
                    value={textVal}  
                    onChange={(val)=>setTextVal(val)}
                    onFocus={()=>setIsKeyboard(true)}
                    onBlur={()=>setIsKeyboard(false)}/>
                    

            </div>
            <Button className="assessment-btn" onClick={sendEva}>提交评价</Button>
        </div>
    )
    
}