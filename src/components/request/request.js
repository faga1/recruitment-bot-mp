import request,{axiosInstance} from './index.js'
import { Toast } from 'antd-mobile'

// 获取职位信息
export async function getPosInfo(id){
    return await request.get(`/positions/${id}`)
}

// 编辑已有职位
export async function editPos(id,posObj){
    return await axiosInstance({
        url:`/positions/${id}`,
        data:posObj,
        method:'put'
    })
}

// 保存新职位
export async function storePosition(posObj){
   return await request.post('/positions',posObj)
}

// 发布职位
export async function positionPub(id){
    await axiosInstance.patch(`/positions/${id}/published`)
    sessionStorage.removeItem('posObj')
}

// 获取职位列表
export async function getPosList(){
    return await request.get('/positions')
}

// 获取投递列表
export async function getDeliveryList(handledText){
    return await request.get(`/deliveries/${handledText}`)
}

// 获取分享链接和提取码
export async function getShareLink(id){
    return await request.post(`/deliveryHandleRecords/${id}/share`)
}

// 获取投递详情
export async function getDeliveryDetail(id,handledText){
    return await request.get(`/deliveries/${id}/${handledText}`)
}

// 提交评价
export async function postEvaluation(eva){
    return await request.post('/deliveryHandleRecords',eva)
}

// 获取分享人名字
export async function getUsername(resource){
    return await request.get(`/deliveryHandleRecords/shareUser?resource=${resource}`)
}

// 判断提取码是否正确
export async function confirmCode(code,resource){
    return await request.get(`/deliveryHandleRecords/extract`,{
        params:{
            code,
            resource
        }
    })
}