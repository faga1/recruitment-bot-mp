import React from "react"
import {Button} from 'antd-mobile'
import './scoreOptions.scss'
export const score=[
    {
        label:'2',
        score:2,
    },
    {
        label:'2.5',
        score:2.5,
    },
    {
        label:'3',
        score:3,
    },
    {
        label:'3+',
        score:3.5,
    },
    {
        label:'4',
        score:4,
    },
    {
        label:'5',
        score:5,
    }
]
export default (props)=>{
    
    return (
        <div className='score-options'>
            {
                score.map((item)=>(
                    <Button className={['score-item',item.score===props.currentScore?'score-active':''].join(' ')} key={item.score} onClick={()=>{props.onClick(item.score)}}>{item.label}</Button>
                ))
            }
        </div>
    )
}