<template>
  <div class="goods">
    <!-- 1.搜索区域 -->
    <div class="header">
      <el-form :inline="true" :model="serchPage" class="demo-form-inline">
        <el-form-item >
          <el-radio-group v-model="serchPage.status">
            <el-radio label=0>待处理订单</el-radio>
            <el-radio label=1>已完成订单</el-radio>
            <el-radio label='all'>所有订单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect" style="margin-left:20px">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData"  border style="width: 100%">
          <el-table-column prop="id" label="订单编号" width="80">
          </el-table-column>
          <el-table-column  prop="orderleve"  label="订单等级"  width="80">
          </el-table-column>
          <el-table-column prop="goodslist" label="商品列表" show-overflow-tooltip >
          </el-table-column>
          <el-table-column  prop="address"  label="收货地址"  show-overflow-tooltip >
          </el-table-column>
          <el-table-column prop="ordertime" label="下单时间" width="150">
          </el-table-column>
          <el-table-column prop="overtime" label="出仓时间" width="150">
          </el-table-column>
          <el-table-column prop="status" label="订单状态" width="80">
          </el-table-column>
          <el-table-column label="操作" width="120">
            <template slot-scope="scope">
              <el-button  size="mini"  type="primary"  @click="handleEdit(scope.$index, scope.row)" >修改状态</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 3.分页 -->
    <div>
      <my-pagination :total='pages.total' :pageSize='pages.pageSize' @changePage='changePage'></my-pagination>
    </div>

    <!-- 5.编辑商品弹框 -->
    <el-dialog title="编辑订单" :visible.sync="updateDialogVisible" width="30%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="出仓时间">
            <el-input v-model="addForm.overtime" ></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-input v-model="addForm.status" ></el-input>
          </el-form-item>          
          <el-form-item size="large">
            <el-button type="primary" @click="onUpdate">确 定</el-button>
            <el-button @click="updateDialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import MyPagination from '../../../components/MyPagination.vue'



export default {
  components:{
    MyPagination,
  },
  data() {
    return {
      updateDialogVisible:false,
      tableData: [],
      serchPage: {
        status:'',
      },
      orderByPage:{
        status:'',
        total:100,
        pageSize:10,
        pageNo:1
      },
      pages:{
        total:200,
        pageSize:10
      },
      addForm: {
        id:'',
        orderleve:'',
        goodslist:'',
        address: '',
        ordertime: '',
        overtime:'',
        status:''
      }
    };
  },
  methods: {
    onUpdate(){
      this.$api.updateWarehouseOrder(this.addForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'修改成功',type:'success'})
          //关闭弹窗
          this.updateDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.orderByPage)
        }
      },
      error=>{
        this.$message({
          message:error.message,
          type:'error'
        })
      }
    )
    },
    onSelect() {
      if(this.serchPage.status!=''){       
        this.orderByPage.status=this.serchPage.status
      }
      if(this.serchPage.status==''){
        this.orderByPage.status=''
        this.httpBasePage(this.orderByPage)
      }else{
        this.httpBasePage(this.orderByPage)
      }
    },
    changePage(num){
      this.orderByPage.pageNo=num
      this.httpBasePage(this.orderByPage)
    },
    handleEdit(index, row) {
      this.updateDialogVisible=true;
      this.addForm.id=row.id
      this.addForm.orderleve=row.orderleve
      this.addForm.goodslist=row.goodslist
      this.addForm.address=row.address
      this.addForm.ordertime=row.ordertime
      this.addForm.overtime=row.overtime
      this.addForm.status=row.status
    },
    httpBasePage(orderByPage){
      this.$api.getWarehouseOrder(orderByPage).then(
        response=>{
          if(response.status===200){
            console.log(response)
            this.tableData=response.data.data.records
            this.pages.total=response.data.data.total
            this.pages.pageSize=response.data.data.size
          }
        },
        error=>{
          console.log('请求失败了',error.message)
        }
      )
    }   
  },
  mounted(){
    this.httpBasePage(this.orderByPage)
  }
};
</script>

<style lang='less' scoped>
.goods {
  margin: 20px;
}
.header {
  display: flex;
  margin: 20px, 0;
}
.el-input__inner {
    width: 180px;
}
</style>