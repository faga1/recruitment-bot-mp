import React,{useEffect,useState} from "react";
import {Picker,CascadePicker,Input, Button, Toast} from 'antd-mobile'
// import {Input} from 'antd'
import PickerCard from '@/components/PickerCard'
import './pubPosition.scss'
import pickBtn from '../../../public/组 190.png'
import destrictData from './location'
import { getPosInfo,editPos,storePosition } from "../../components/request/request";

export default function(props){
    const [companyVal,setCompanyVal]=useState('')
    const [pickerVis,setPickerVis]=useState(false)//picker是否可见
    const [pickerOwner,setPickerOwner]=useState(0)//picker对应的是哪个信息
    const [columns,setColumns]=useState([[]])//picker中的选项
    const [cascadeVis,setCascadeVis]=useState(false)//级联选择器是否可见
    //将数据抽离出来方便交互
    const [posObj,setPosObj]=useState({
        company:'',
        name:'',
        desc:'',
        address:'',
        type:'',
        empiricalRequirements:'',
        minimumDegree:'',
        published:false,//是否为新
        minimumSalary:0,
        highestSalary:0
    })
    // 显示picker
    const showPicker=(index)=>{
        setColumns(posInfo[index].pickList)
        setPickerOwner(index)
        setPickerVis(true) 
    }
    //显示cascadePicker
    const showCascade=(index)=>{
        setPickerOwner(index)
        setCascadeVis(true)
    }
    // 跳转
    const navigateTo=(index,pos)=>{
        // // 遍历posInfo 将内容传给posObj 缓存下来
        // posInfo.forEach((item,index)=>{
        //     if(index===6){
        //         posObj.minimumSalary=item.minimumSalary
        //         posObj.highestSalary=item.highestSalary
        //     }else{
        //         posObj[item.name]=item.content
        //     }
        // })
        //缓存posObj
        // 防止缓存时跳转丢失数据
        sessionStorage.setItem('posObj',JSON.stringify(pos))
        // 跳转时带上自身的content
        props.history.push({pathname:posInfo[index].path,state:{value:posInfo[index].content}})
    }
    //关于职位需要填写的信息
    const [posInfo,setPosInfo]=useState([
       
        {
            label:'职位名称',
            name:'name',
            content:'',
            method:navigateTo,//点击时对应的方法
            pickList:[],
            path:'/positionName',
            placeholder:'请选择职位名称'
        },
        {
            label:'职位描述',
            name:'desc',
            content:'',
            method:navigateTo,
            path:'/positionDesc',
            placeholder:'请描述职位描述'

        },
        {
            label:'工作地址',
            name:'address',
            content:'',
            method:showCascade,
            pickList:[],
            placeholder:'请选择工作地址'

        },
        {
            label:'职位类型',
            name:'type',
            content:'',
            method:showPicker,
            pickList:[['合伙人','技术人员','管理人员','后勤人员']],//对应columns
            placeholder:'请选择职位类型'

        },
        {
            label:'经验要求',
            name:'empiricalRequirements',
            content:'',
            method:showPicker,
            pickList:[['不限','1年以下','1-3年','3-5年','5-10年','10年以上']],
            placeholder:'请选择经验要求'

        },
        {
            label:'最低学历',
            name:'minimumDegree',
            content:'',
            method:showPicker,
            pickList:[['不限','初中及以下','中专/中计','高中','大专','本科','硕士','博士']],
            placeholder:'请选择学历'

        },
        {
            label:'薪资范畴',
            name:'salary_range',
            content:'',
            method:showPicker,
            pickList:[['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35',
        '36','37','38','39','40','41','42','43','44','45','46','47','48','49','50'],['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27','28','29','30','31','32','33','34','35',
        '36','37','38','39','40','41','42','43','44','45','46','47','48','49','50']],
            minimumSalary :0,
            highestSalary:0,
            placeholder:'请选择薪资范围'

        }
    ])

    
    useEffect(() => {
        if(props.location.query){
            getPosInfo(props.location.query.id).then(val=>{
                setPosObj({...val.data})
            })
            return 
        }
        let pos=JSON.parse(sessionStorage.getItem('posObj'))
        //如果进来有缓存，那么posObj等于pos
        if(pos){
            console.log(JSON.stringify(pos));
            setPosObj(pre=>{
                console.log('pre',JSON.stringify({...pre,...pos}));
                return {...pre,...pos}
            })
        }
        //给companyVal赋值
        // 从跳转页回来恢复content
        // 从跳转页回来传值
        if(props.location.state&&props.location.state.value){
            
            setPosObj(pre=>{
                pre[posInfo[props.location.state.index].name]=props.location.state.value
                return {...pre}
            })
        }
        // 点击编辑回来显示原有数据
        if(props.location.query){
            
            getPosInfo(props.location.query.id).then(val=>{
                setPosObj({...val.data})
                // posObjToPosInfo()
            })
        }
        
        return () => {
        }
    },[])
    useEffect(() => {
        posObjToPosInfo()
        return () => {
        }
    }, [posObj])
    // 将posObj转化为posInfo
    const posObjToPosInfo=()=>{
        setCompanyVal(posObj.company)
        posInfo.forEach((item,index)=>{
            //由于薪资和其他不一样，因此单独判断
            if(index===6){
                setPosInfo(preInfo=>{
                    if(posObj.minimumSalary&&posObj.highestSalary){
                        preInfo[6].content=posObj.minimumSalary+'k'+'-'+posObj.highestSalary+'k'
                    }
                    return [...preInfo]
                })
            }else{
                setPosInfo(preInfo=>{
                    preInfo[index].content=posObj[preInfo[index].name]
                    return [...preInfo]
                })
            }
            
        })
    }
    // 点击保存按钮
    const storePos = ()=>{
        // posObj={...posObj,company:companyVal}
        for(let i in posObj){
            if(!posObj[i]&&!posObj[i].length&&i!=='published'){
                console.log(i);
                Toast.show({
                    content: '请将表单填写完全',
                    icon:'fail',
                })
                return
            }
        }
        // 需要判断是编辑还是新建
        if(posObj.id){
            editPos(posObj.id,posObj).then(val=>{
                if(val.data.code===20000){
                    props.history.push({pathname:`/posDetail/${posObj.id}`,state:{id:val.data.data}})
                }
            })
            return 
        }
        storePosition(posObj).then((val)=>{
            if(val.code===20000){
                props.history.push({pathname:`/posDetail/${val.data}`})
            }
        })
        
    }
    return (
        <div className='pubPosition'>
            <div className="pos-company">
                <div className='picker-card'>
                    <div className="picker-name">招聘公司</div>
                    <div className='picker-content'>
                    <Input
                        placeholder='请输入内容'
                        value={companyVal}
                        onChange={val => {
                            setCompanyVal(val)
                            setPosObj(pre=>{
                                return {...pre,company:val}
                            })
                            console.log('Input'+JSON.stringify(posObj));                            
                        }}
                    />
                        <img src={pickBtn} />
                    </div>
                    

                </div>            
            </div>
            {
                posInfo.map((item,index)=>(
                    <PickerCard {...item} key={item.name} index={index} posObj={posObj} setPosInfo={setPosInfo}></PickerCard>
                ))
            }
            <Picker
                columns={columns}
            >
            </Picker>
            <Picker 
                title={posInfo[pickerOwner].label}
                columns={columns}
                visible={pickerVis}
                cols={1}
                onClose={()=>{
                    setPickerVis(false)
                }}
                onConfirm={v=>{
                    
                    if(pickerOwner===6){
                        if(parseInt(v[0])>parseInt(v[1])){
                            Toast.show({
                                content: '最低薪资应该小于最大薪资',
                                icon:'fail',
                            })
                            return 
                        }
                        setPosInfo(preInfo=>{
                            preInfo[pickerOwner].content=v[0]+'-'+v[1]+'k'
                            preInfo[pickerOwner].minimumSalary=parseInt(v[0])
                            preInfo[pickerOwner].highestSalary=parseInt(v[1])
                            return [...preInfo]
                        })
                        posObj['minimumSalary']=parseInt(v[0])
                        posObj['highestSalary']=parseInt(v[1])
                        return 
                    }
                    setPosInfo(preInfo=>{
                        preInfo[pickerOwner].content=v[0]
                        return [...preInfo]
                    })
                    posObj[posInfo[pickerOwner].name]=v[0]
                }}
                onChange={v=>{

                }}
                />
            <CascadePicker
                title='地区选择'
                options={destrictData}
                visible={cascadeVis}
                onClose={() => {
                    setCascadeVis(false)
                }}
                onConfirm={v=>{
                    let county=v[2]?v[2]:''
                    let city=v[1]?v[1]:''
                    let address=v[0]+city+county
                    setPosInfo(preInfo=>{
                        preInfo[pickerOwner].content=address
                        return [...preInfo]
                    })
                    posObj.address=address
                }}
            />
            <Button className='pubPosBtn' onClick={storePos}>保存</Button>
        </div>
    )
}