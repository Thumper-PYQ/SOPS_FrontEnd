/**
 * 请求的方法
 */

import axios from "axios";
import base from './base'

const api = {
    //商品列表
    getGoodsList(page){
        if(page>0)
        {
            // return axios.get(base.goodsLIst,{
            //     params:{
            //         id:page,
            //         page:222,
            //         name:'maotai'
            //     }
            // })
            
            return axios.get(`${base.goodsLIst}/${page}`);
        }
        return axios.get(base.goodsLIst);
    },

    //后台带有多表连接的查询
    goodsResult(pageNo,pageSize,goodsId,goodsName,provideName,goodsDescription){
        return axios.get(`${base.goodsplus}/${pageNo}/${pageSize}`,{
            params:{
                goodsId:goodsId,
                goodsName:goodsName,
                provideName:provideName,
                goodsDescription:goodsDescription
            }
        })
    },

    //添加商品
    addGoods(addForm){
        return axios.post(`${base.goodsplus}`,{
            gid:addForm.gid,
            gname:addForm.gname,
            provideid:addForm.provideid,
            numbers:addForm.numbers,
            description:addForm.description
        })
    },

    //删除商品
    deleteGoods(params){
        return axios.delete(`${base.deleteGoods}/${params}`)
    },

    //修改商品
    updateGoods(params){
        return axios.put(`${base.updateGoods}`,{
            gid:params.gid,
            gname:params.gname,
            provideid:params.provideid,
            numbers:params.numbers,
            description:params.description
        })
    },

    //查询供应商
    getProvide(param){
        return axios.get(`${base.provide}/${param.pageNo}/${param.pageSize}`,{
            params:{
                pname:param.pname
            }
        })
    },
    //添加供应商
    addProvide(addForm){
        return axios.post(`${base.provide}`,{
            pid:addForm.pid,
            pname:addForm.pname,
            address:addForm.address,
            tele:addForm.tele,
        })
    },
    //删除供应商
    deleteProvide(params){
        return axios.delete(`${base.deleteProvide}/${params}`)
    },
    //修改供应商
    updateProvide(params){
        return axios.put(`${base.updateProvide}`,{
            pid:params.pid,
            pname:params.pname,
            address:params.address,
            tele:params.tele,
        })
    },

    //查询仓库
    getWarehouse(param){
        return axios.get(`${base.warehouse}/${param.pageNo}/${param.pageSize}`,{
            params:{
                wid:param.wid,
                address:param.address
            }
        })
    },
    //添加仓库
    addWarehouse(addForm){
        return axios.post(`${base.warehouse}`,{
            wid:addForm.wid,
            managerid:addForm.managerid,
            address:addForm.address,
            tele:addForm.tele,
            description:addForm.description
        })
    },
    //删除仓库
    deleteWarehouse(params){
        return axios.delete(`${base.deleteWarehouse}/${params}`)
    },
    //修改仓库
    updateWarehouse(params){
        return axios.put(`${base.updateWarehouse}`,{
            wid:params.wid,
            managerid:params.managerid,
            address:params.address,
            tele:params.tele,
            description:params.description
        })
    },



    //查询订单
    getOrder(param){
        return axios.get(`${base.order}/${param.pageNo}/${param.pageSize}`,{
            params:{
                ordertime:param.ordertime,
                overtime:param.overtime
            }
        })
    },
    //添加订单
    addOrder(addForm){
        return axios.post(`${base.order}`,{
            id:addForm.id,
            comsumerid:addForm.comsumerid,
            goodslist:addForm.goodslist,
            address:addForm.address,
            ordertime:addForm.ordertime,
            overtiem:addForm.overtiem
        })
    },
    //删除订单
    deleteOrder(params){
        return axios.delete(`${base.deleteOrder}/${params}`)
    },
    //修改订单
    updateOrder(params){
        return axios.put(`${base.updateOrder}`,{
            id:params.id,
            comsumerid:params.comsumerid,
            goodslist:params.goodslist,
            address:params.address,
            ordertime:params.ordertime,
            overtime:params.overtime
        })
    },

    //查询仓库订单
    getWarehouseOrder(param){
        return axios.get(`${base.warehouseOrder}/${param.pageNo}/${param.pageSize}`,{
            params:{
                status:param.status,
            }
        })
    },
    //修改仓库订单状态
    updateWarehouseOrder(params){
        return axios.put(`${base.updateWarehouseOrder}`,{
            id:params.id,
            orderleve:params.orderleve,
            goodslist:params.goodslist,
            address:params.address,
            ordertime:params.ordertime,
            overtime:params.overtime,
            status:params.status
        })
    },

    //查询拣货订单
    getPickOrder(param){
        return axios.get(`${base.pickOrder}/${param.pageNo}/${param.pageSize}`,{
            params:{
                id:param.id,
                status:param.status,
            }
        })
    },
    //修改拣货订单状态
    updatePickOrder(params){
        return axios.put(`${base.updatePickOrder}`,{
            id:params.id,
            orderid:params.orderid,
            pickid:params.pickid,
            orderleve:params.orderleve,
            goodslist:params.goodslist,
            address:params.address,
            arrivetime:params.arrivetime,
            overtime:params.overtime
        })
    },

    //查询仓库管理员
    getWmu(param){
        return axios.get(`${base.wmu}/${param.pageNo}/${param.pageSize}`,{
            params:{
                warehouseid:param.warehouseid,
                address:param.address,
                manageName:param.manageName
            }
        })
    },
    getSingleWmu(param){
        return axios.get(`${base.singleWmu}/${param.pageNo}/${param.pageSize}`)
    },
    //添加仓库管理员
    addWmu(addForm){
        return axios.post(`${base.wmu}`,{
            id:addForm.id,
            name:addForm.name,
            age:addForm.age,
            gender:addForm.gender,
            tele:addForm.tele,
            loginname:addForm.loginname,
            password:addForm.password
        })
    },
    //删除仓库管理员
    deleteWmu(params){
        return axios.delete(`${base.deleteWmu}/${params}`)
    },
    //修改仓库管理员
    updateWmu(params){
        return axios.put(`${base.updateWmu}`,{
            id:params.id,
            name:params.name,
            age:params.age,
            gender:params.gender,
            tele:params.tele,
            loginname:params.loginname,
            password:params.password
        })
    },



    //查询仓库拣货员
    getPu(param){
        return axios.get(`${base.pu}/${param.pageNo}/${param.pageSize}`,{
            params:{
                warehouseid:param.warehouseid,
                name:param.name,
                manageType:param.manageType
            }
        })
    },
    //添加仓库拣货员
    addPu(addForm){
        return axios.post(`${base.pu}`,{
            id:addForm.id,
            name:addForm.name,
            age:addForm.age,
            gender:addForm.gender,
            tele:addForm.tele,
            loginname:addForm.loginname,
            password:addForm.password,
            warehouseid:addForm.warehouseid,
            manageid:addForm.manageid,
            totalcount:addForm.totalcount,
            errorcount:addForm.errorcount
        })
    },
    //删除仓库拣货员
    deletePu(params){
        return axios.delete(`${base.deletePu}/${params}`)
    },
    //修改仓库拣货员
    updatePu(params){
        return axios.put(`${base.updatePu}`,{
            id:params.id,
            name:params.name,
            age:params.age,
            gender:params.gender,
            tele:params.tele,
            loginname:params.loginname,
            password:params.password,
            warehouseid:params.warehouseid,
            manageid:params.manageid,
            totalcount:params.totalcount,
            errorcount:params.errorcount
        })
    },


    //查询货架分区
    getShelvearea(param){
        return axios.get(`${base.shelvearea}/${param.pageNo}/${param.pageSize}`,{
            params:{
                shelveid:param.shelveid,
                said:param.said,
                goodid:param.goodid
            }
        })
    },
    //添加货架
    addShelve(addForm){
        return axios.post(`${base.addShelve}`,{
            sid:addForm.sid,
            warehouseid:addForm.warehouseid,
        })
    },
    //添加分区
    addArea(addForm){
        return axios.post(`${base.addArea}`,{
            said:addForm.said,
            shelveid:addForm.shelveid,
            goodid:addForm.goodid,
            warehouseid:addForm.warehouseid,
        })
    },
    //删除货架分区
    deleteShelveArea(params){
        return axios.delete(`${base.deleteShelvearea}/${params}`)
    },
    //修改货架分区
    updateShelveArea(params){
        return axios.put(`${base.updateShelvearea}`,{
            id:params.id,
            said:params.said,
            shelveid:params.shelveid,
            warehouseid:params.warehouseid,
            goodid:params.goodid,
        })
    },

}

export default api;