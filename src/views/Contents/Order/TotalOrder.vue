<template>
  <div class="goods">
    <!-- 1.搜索区域 -->
    <div class="header">
      <el-form :inline="true" :model="serchPage" class="demo-form-inline">
        <el-form-item>
          <el-button type="danger" @click="handleMutiDelete">删除</el-button>
        </el-form-item>
        <el-form-item label="下单时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="serchPage.ordertime" style="width: 180%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="出仓时间">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="serchPage.overtime" style="width: 180%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addOrder">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="订单编号" width="100">
          </el-table-column>
          <el-table-column  prop="comsumerid"  label="消费者ID"  width="100">
          </el-table-column>
          <el-table-column prop="goodslist" label="商品列表" show-overflow-tooltip >
          </el-table-column>
          <el-table-column  prop="address"  label="收货地址"  show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="tele" label="联系电话" >
          </el-table-column> -->
          <el-table-column prop="ordertime" label="下单时间" width="180">
          </el-table-column>
          <el-table-column prop="overtime" label="出仓时间" width="180">
          </el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 3.分页 -->
    <div>
      <my-pagination :total='pages.total' :pageSize='pages.pageSize' @changePage='changePage'></my-pagination>
    </div>

    <!-- 4.添加商品弹框 -->
    <el-dialog title="添加订单" :visible.sync="addDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="订单编号">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="消费者ID">
            <el-input v-model="addForm.comsumerid"></el-input>
          </el-form-item>
          <el-form-item label="商品列表">
            <el-input v-model="addForm.goodslist"></el-input>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-input v-model="addForm.ordertime"></el-input>
          </el-form-item>
          <el-form-item label="出仓时间">
            <el-input v-model="addForm.overtime" ></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 5.编辑商品弹框 -->
    <el-dialog title="编辑商品" :visible.sync="updateDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="订单编号">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="消费者ID">
            <el-input v-model="addForm.comsumerid"></el-input>
          </el-form-item>
          <el-form-item label="商品列表">
            <el-input v-model="addForm.goodslist"></el-input>
          </el-form-item>
          <el-form-item label="收货地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="下单时间">
            <el-input v-model="addForm.ordertime"></el-input>
          </el-form-item>
          <el-form-item label="出仓时间">
            <el-input v-model="addForm.overtime" ></el-input>
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
      addDialogVisible:false,
      updateDialogVisible:false,
      selectedids:[],
      tableData: [],
      serchPage: {
        ordertime:'',
        overtime:''
      },
      orderByPage:{
        ordertime:'',
        overtime:'',
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
        comsumerid: '',
        goodslist:'',
        address: '',
        ordertime: '',
        overtime:'',
      }
    };
  },
  methods: {
    handleSelectionChange(sels){
      this.selectedids=sels
    },
    onUpdate(){
      this.$api.updateOrder(this.addForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'修改成功',type:'success'})
          //关闭弹窗
          this.updateDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.orderByPage)
          //清空表格数据
          this.clearFrom()
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
    onSubmit() {
      this.$api.addOrder(this.addForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'添加成功',type:'success'})
          //关闭弹窗
          this.addDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.orderByPage)
          //清空表格数据
          this.clearFrom()
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
    clearFrom(){
      this.addForm.id=''
      this.addForm.comsumerid=''
      this.addForm.goodslist=''
      this.addForm.address=''
      this.addForm.ordertime=''
      this.addForm.overtime=''
    },
    onSelect() {
      if(this.serchPage.ordertime!=''){
        //2022-05-16T16:00:00.000Z  -> 2022-05-17
        
        this.orderByPage.ordertime=this.serchPage.ordertime
      }
      if(this.serchPage.overtime!=''){
        this.orderByPage.overtime=this.serchPage.overtime
      }
      if(this.serchPage.ordertime==''&&this.serchPage.overtime==''){
        this.orderByPage.ordertime=''
        this.orderByPage.overtime=''
        this.httpBasePage(this.orderByPage)
      }else{
        this.httpBasePage(this.orderByPage)
      }
    },
    changePage(num){
      this.orderByPage.pageNo=num
      this.httpBasePage(this.orderByPage)
    },
    addOrder() {
      this.addDialogVisible=true;
    },
    handleEdit(index, row) {
      this.updateDialogVisible=true;
      this.addForm.id=row.id
      this.addForm.comsumerid=row.comsumerid
      this.addForm.goodslist=row.goodslist
      this.addForm.address=row.address
      this.addForm.ordertime=row.ordertime
      this.addForm.overtime=row.overtime
    },
    handleDelete(index, row) {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //单个删除向数组中存放gid
        this.selectedids.push(row)
        //批量删除向数组中存入gid
        let ids = this.selectedids.map((item)=>item.id)
        console.log(ids)
        //向后台提交删除的数据
        this.$api.deleteOrder(ids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.orderByPage);
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });      
    },
    handleMutiDelete() {
      this.$confirm('是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        //批量删除向数组中存入gid
        let ids = this.selectedids.map((item)=>item.id)
        console.log(ids)
        //向后台提交删除的数据
        this.$api.deleteOrder(ids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.orderByPage);
            }
          }
        )
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    httpBasePage(orderByPage){
      this.$api.getOrder(orderByPage).then(
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