<template>
  <div class="provides">
    <!-- 1.搜索区域 -->
    <div class="header">
      <el-form :inline="true" :model="searchPage" class="demo-form-inline">
        <el-form-item>
          <el-button type="danger" @click="handleMutiDelete">删除</el-button>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="searchPage.pname" placeholder="供应商名称"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="addprovides">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="pid" label="供应商ID" width="180">
          </el-table-column>
          <el-table-column
            prop="pname"
            label="供应商名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="供应商地址"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column prop="tele" label="联系电话" width="180">
          </el-table-column>
          
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button
              >
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
    <el-dialog title="添加供应商" :visible.sync="addDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="ID">
            <el-input v-model="addForm.pid"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="addForm.pname"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addForm.tele"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 5.编辑商品弹框 -->
    <el-dialog title="编辑供应商" :visible.sync="updateDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="ID">
            <el-input v-model="addForm.pid"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="addForm.pname"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="addForm.address"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="addForm.tele"></el-input>
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
      pages:{
        total:200,
        pageSize:10
      },
      searchPage:{
        pname:''
      },
      provideByPage:{
        pname:'',
        total:100,
        pageSize:10,
        pageNo:1
      },
      addForm: {
          pid:'',
          pname: '',
          address: '',
          tele: '',
        }
    };
  },
  methods: {
    handleSelectionChange(sels){
      this.selectedids=sels
    },
    onUpdate(){
      this.$api.updateProvide(this.addForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'修改成功',type:'success'})
          //关闭弹窗
          this.updateDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.provideByPage)
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
      this.$api.addProvide(this.addForm).then(
        response=>{
          if(response.status===200){
            this.$message({message:'添加成功',type:'success'})
            //关闭弹窗
            this.addDialogVisible=false
            //重新加载后台数据
            this.httpBasePage(this.provideByPage)
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
      this.addForm.pid=''
      this.addForm.pname=''
      this.addForm.address=''
      this.addForm.tele=''
    },
    onSelect() {
      //对输入框需要进行清楚处理，因为不知道其他的方法，所以利用了searchPage做为中转
      if(this.searchPage.pname!=''){
        this.provideByPage.pname=this.searchPage.pname
      }
      if(this.searchPage.pname==''){
        this.provideByPage.pname=''
        this.httpBasePage(this.provideByPage)
      }else{
        this.httpBasePage(this.provideByPage)
      }
      console.log(this)
    },
    changePage(num){
      this.provideByPage.pageNo=num
      this.httpBasePage(this.provideByPage)
    },
    addprovides() {
      this.addDialogVisible=true;
    },
    handleEdit(index, row) {
      this.updateDialogVisible=true;
      console.log(index, row);
      this.addForm.pid=row.pid
      this.addForm.pname=row.pname
      this.addForm.address=row.address
      this.addForm.tele=row.tele
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
        let pids = this.selectedids.map((item)=>item.pid)
        console.log(pids)
        //向后台提交删除的数据
        this.$api.deleteProvide(pids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.provideByPage);
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
        let pids = this.selectedids.map((item)=>item.pid)
        console.log(pids)
        //向后台提交删除的数据
        this.$api.deleteProvide(pids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.provideByPage);
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
    httpBasePage(provideByPage){
      this.$api.getProvide(provideByPage).then(
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
    this.httpBasePage(this.provideByPage)
  }
};
</script>

<style lang='less' scoped>
.provides {
  margin: 20px;
}
.header {
  display: flex;
  margin: 20px, 0;
}
</style>