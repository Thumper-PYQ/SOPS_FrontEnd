<template>
  <div class="warehouse">
    <!-- 1.搜索区域 -->
    <div class="header">
      <el-form :inline="true" :model="serchPage" class="demo-form-inline">
        <el-form-item>
          <el-button type="danger" @click="handleMutiDelete">删除</el-button>
        </el-form-item>
        <el-form-item label="仓库ID">
          <el-input v-model="serchPage.wid" placeholder="仓库ID"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input v-model="serchPage.address" placeholder="仓库地址"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addwarehouse">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="wid" label="仓库ID" width="180">
          </el-table-column>
          <el-table-column  prop="managerid"  label="仓库管理员"  width="180" show-overflow-tooltip>
          </el-table-column>
          <el-table-column  prop="address"  label="仓库地址"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="tele" label="仓库电话" width="180">
          </el-table-column>
          <el-table-column prop="description" label="仓库描述" show-overflow-tooltip  width="180">
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
    <el-dialog title="添加仓库" :visible.sync="addDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="ID">
            <el-input v-model="addForm.wid"></el-input>
          </el-form-item>
          <el-form-item label="管理员">
            <el-input v-model="addForm.managerid"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addForm.tele"></el-input>
          </el-form-item>
          <el-form-item label="仓库描述">
            <textarea v-model="addForm.description" cols="50" rows="10"></textarea>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 5.编辑商品弹框 -->
    <el-dialog title="编辑仓库" :visible.sync="updateDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="ID">
            <el-input v-model="addForm.wid"></el-input>
          </el-form-item>
          <el-form-item label="管理员">
            <el-input v-model="addForm.managerid"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addForm.tele"></el-input>
          </el-form-item>
          <el-form-item label="仓库描述">
            <textarea v-model="addForm.description" cols="50" rows="10"></textarea>
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
        wid:'',
        address:''
      },
      warehouseByPage:{
        wid:'',
        address:'',
        total:100,
        pageSize:10,
        pageNo:1
      },
      pages:{
        total:200,
        pageSize:10
      },
      addForm: {
          wid:'',
          managerid: '',
          address: '',
          tele: '',
          description:'',
        }
    };
  },
  methods: {
    handleSelectionChange(sels){
      this.selectedids=sels
    },
    onUpdate(){
      this.$api.updateWarehouse(this.addForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'修改成功',type:'success'})
          //关闭弹窗
          this.updateDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.warehouseByPage)
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
      this.$api.addWarehouse(this.addForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'添加成功',type:'success'})
          //关闭弹窗
          this.addDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.warehouseByPage)
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
      this.addForm.wid=''
      this.addForm.managerid=''
      this.addForm.address=''
      this.addForm.tele=''
      this.addForm.description=''
    },
    onSelect() {
      if(this.serchPage.wid!=''){
        this.warehouseByPage.wid=this.serchPage.wid
      }
      if(this.serchPage.address!=''){
        this.warehouseByPage.address=this.serchPage.address
      }
      if(this.serchPage.wid==''&&this.serchPage.address==''){
        this.warehouseByPage.wid=''
        this.warehouseByPage.address=''
        this.httpBasePage(this.warehouseByPage)
      }else{
        this.httpBasePage(this.warehouseByPage)
      }
    },
    changePage(num){
      this.warehouseByPage.pageNo=num
      this.httpBasePage(this.warehouseByPage)
    },
    addwarehouse() {
      this.addDialogVisible=true;
    },
    handleEdit(index, row) {
      this.updateDialogVisible=true;
      this.addForm.wid=row.wid
      this.addForm.managerid=row.managerid
      this.addForm.address=row.address
      this.addForm.tele=row.tele
      this.addForm.description=row.description
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
        let wids = this.selectedids.map((item)=>item.wid)
        console.log(wids)
        //向后台提交删除的数据
        this.$api.deleteWarehouse(wids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.warehouseByPage);
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
        let wids = this.selectedids.map((item)=>item.wid)
        console.log(wids)
        //向后台提交删除的数据
        this.$api.deleteWarehouse(wids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.warehouseByPage);
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
    httpBasePage(warehouseByPage){
      this.$api.getWarehouse(warehouseByPage).then(
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
    this.httpBasePage(this.warehouseByPage)
  }
};
</script>

<style lang='less' scoped>
.warehouse {
  margin: 20px;
}
.header {
  display: flex;
  margin: 20px, 0;
}
</style>