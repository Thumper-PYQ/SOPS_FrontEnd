/**
 * 接口路径配置
 */

const base ={
    goodsLIst:'http://localhost:80/goods',    //商品列表
    goodsplus:'http://localhost:80/goodsplus',  //商品列表
    deleteGoods:'http://localhost:80/goodsplus/delete', //删除商品
    updateGoods:'http://localhost:80/goodsplus/update', //更新商品

    provide:'http://localhost:80/provide',//供应商
    deleteProvide:'http://localhost:80/provide/delete',//删除供应商
    updateProvide:'http://localhost:80/provide/update', //更新商品

    warehouse:'http://localhost:80/warehouse',//仓库
    deleteWarehouse:'http://localhost:80/warehouse/delete',//删除仓库
    updateWarehouse:'http://localhost:80/warehouse/update', //更新仓库   

    shelvearea:'http://localhost:80/shelvearea',//货架分区
    addShelve:'http://localhost:80/shelvearea/shelve',//添加货架
    addArea:'http://localhost:80/shelvearea/area',//添加分区
    deleteShelvearea:'http://localhost:80/shelvearea/delete',//删除货架分区
    updateShelvearea:'http://localhost:80/shelvearea/update', //更新货架分区
    
    order:'http://localhost:80/order',//订单
    deleteOrder:'http://localhost:80/order/delete',//删除订单
    updateOrder:'http://localhost:80/order/update', //更新订单 

    warehouseOrder:'http://localhost/warehouseorder',//仓库订单
    updateWarehouseOrder:'http://localhost:80/warehouseorder/update', //更新仓库订单

    pickOrder:'http://localhost/pickorder/',//拣货订单
    updatePickOrder:'http://localhost:80/pickorder/update', //更新拣货订单    

    wmu:'http://localhost:80/wmu',//条件查询仓库管理员
    singleWmu:'http://localhost:80/single',//无条件查询仓库管理员
    deleteWmu:'http://localhost:80/wmu/delete',//删除仓库管理员
    updateWmu:'http://localhost:80/wmu/update', //更新仓库管理员

    pu:'http://localhost:80/pu',//仓库拣货员
    deletePu:'http://localhost:80/pu/delete',//删除仓库拣货员
    updatePu:'http://localhost:80/pu/update', //更新仓库拣货员
}

export default base;