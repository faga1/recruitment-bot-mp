import React,{useState} from "react";
import commonPassed from '../../../public/对号 (1).png'
import passed from '../../../public/对号.png'
import commonFailed from '../../../public/错号 圆 (1).png'
import failed from '../../../public/错号 圆.png'
import './resumeEva.scss'

export default ()=>{

    const [ispassed,setIspassed]=useState(1)
    const [score,setScore]=useState([
        {
            score:'2',
            isActive:false
        },
        {
            score:'2.5',
            isActive:false
        },
        {
            score:'3',
            isActive:false
        },
        {
            score:'3+',
            isActive:false
        },
        {
            score:'4',
            isActive:false
        },
        {
            score:'5',
            isActive:false
        }
    ])
    return(
        <div className='resume-eva'>
            <div className="position-deliver">
                <div className='header'>
                    <div className='rectangle'></div>
                    <div className='text'>投递简历</div>
                </div>
                <div className='deliver-card'>Java高级开发工程师</div>
            </div>
            <div className="eva-result">
                <div className='header'>
                    <div className="rectangle"></div>
                    <div className="text">结论</div>
                    <div className="text-des">(简历提交,点击编辑之后可修改)</div>
                </div>
                <div className="result-btn">
                    <div className={'btn'}>
                        <img src={ispassed===2?failed:commonFailed} alt="" />
                        <div>不通过</div>
                    </div>
                    <div className="passed btn">
                        <img src={ispassed===1?passed:commonPassed} alt="" />
                        <div>通过</div>
                    </div>
                </div>
            </div>
            <div className="resume-score">
                <div className='header'>
                    <div className="rectangle"></div>
                    <div className="text">结论</div>
                    <div className="text-des">(简历提交,点击编辑之后可修改)</div>
                 </div>
                 <div className='score-options'>
                    {
                        score.map((item)=>(
                            <div className={'score-item',item.isActive?'score-active':''} key={item.score} >{item.score}</div>
                        ))
                    }
                 </div>
                 <div className="score-explain">3:通过,能力达到要求,建议录用</div>
            </div>
            <div className="assessment">
                <div className='header'>
                    <div className="rectangle"></div>
                    <div className="text">结论</div>
                </div>
                <div className="assessment-content">
                    有很强的分析问题和解决问题能力，有强烈的责任心， 工作主动性强。 熟悉分布式、多线程及高性能的设计与编码及性能调优， 熟悉分布式的设计架构，有zookeeper/kafka/redis/ne tty/mongo等开发经验。 熟悉大数据相关组件原理及使用经验，如flume/spark/ kafka/Hive/Elasticsearch等。
                </div>
            </div>
            <div className="commite-assessment">提交评价</div>
        </div>
    )
    
}