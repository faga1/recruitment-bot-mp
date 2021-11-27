import React,{useEffect} from "react";
import PositionCard from "../../components/PositionCard";
import {Button} from 'antd-mobile'
import { oAuth } from "../../models/common";
import './posDetail.scss'

export default ()=>{

    return (
        <div className='position-detail'>
            <PositionCard></PositionCard>
            <div className='position-des'>
                <div className='des-text'>职位描述</div>
                <div className="des-content">
                    1. 参与公司相关系统的架构详细设计与核心代码开发；
                    2. 基于产品需求说明书，完成产品功能、技术方案和详 细设计文档编写与数据结构设计;
                    3. 完成软件代码的编写、自测、发布与完善；完成系统 接口开发、整合集成与联调测试; 
                    4. 响应并主动发现问题，对负责的系统持续优化完善。;
                    职位要求 
                    1. 本科及以上学历，5年以上的实际项目开发经验； 
                    2. 熟练掌握面向对象的分析与设计方法，熟练掌握常见 的设计模式，熟悉分布式、缓存、消息队列等机制， 熟悉JVM； 
                    3. 熟悉常见的主流框架，例如Spring/SpingMVC/MyB atis/Hibernate/Spring Boot等；
                </div>
                
            </div>
            <div className='detail-tools'>
                <div className='edit'>编辑</div>
                <div type='primary' className='publish'>发布</div>
            </div>
        </div>
    )
}