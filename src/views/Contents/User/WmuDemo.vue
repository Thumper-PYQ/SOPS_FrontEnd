<template>
  <div class="user">
    <!-- 1.搜索区域 -->
    <div class="header">
      <el-form :inline="true" :model="searchPage" class="demo-form-inline">
        <el-form-item>
          <el-button type="danger" @click="handleMutiDelete">删除</el-button>
        </el-form-item>
        <el-form-item label="仓库编号">
          <el-input v-model="searchPage.warehouseid" placeholder="仓库ID"></el-input>
        </el-form-item>
        <el-form-item label="仓库地址">
          <el-input v-model="searchPage.address" placeholder="仓库地址"></el-input>
        </el-form-item>
        <el-form-item label="仓库管理员">
          <el-input v-model="searchPage.manageName" placeholder="仓库管理员"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="adduser">添加</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="员工编号" >
          </el-table-column>
          <el-table-column  prop="name"  label="员工姓名">
          </el-table-column>
          <el-table-column  prop="age"  label="年龄">
          </el-table-column>
          <el-table-column prop="gender" label="性别" >
          </el-table-column>
          <el-table-column  prop="tele"  label="联系电话"  >
          </el-table-column>
          <el-table-column prop="loginname" label="登录名" >
          </el-table-column>
          <el-table-column  prop="password"  label="登录密码">
          </el-table-column>
          <el-table-column label="操作">
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

    <!-- 4.添加员工弹框 -->
    <el-dialog title="添加员工" :visible.sync="addDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="员工ID">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="员工年龄">
            <el-input v-model="addForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.gender" size="medium">
              <el-radio border label="男"></el-radio>
              <el-radio border label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="addForm.tele"></el-input>
          </el-form-item>
          <el-form-item label="登录名">
            <el-input v-model="addForm.loginname"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>

          <el-form-item size="large">
            <el-button type="primary" @click="onSubmit">确 定</el-button>
            <el-button @click="addDialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 5.编辑员工弹框 -->
    <el-dialog title="编辑员工" :visible.sync="updateDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="员工ID">
            <el-input v-model="addForm.id"></el-input>
          </el-form-item>
          <el-form-item label="员工姓名">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
          <el-form-item label="员工年龄">
            <el-input v-model="addForm.age"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="addForm.gender" size="medium">
              <el-radio border label="男"></el-radio>
              <el-radio border label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="addForm.tele"></el-input>
          </el-form-item>
          <el-form-item label="登录名">
            <el-input v-model="addForm.loginname"></el-input>
          </el-form-item>
          <el-form-item label="登录密码">
            <el-input v-model="addForm.password"></el-input>
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
      searchPage: {
        warehouseid:'',
        address:'',
        manageName:''
      },
      wmuByPage:{
        warehouseid:-1,
        address:'null',
        manageName:'null',
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
          name: '',
          age:'',
          gender: '',
          tele: '',
          loginname:'',
          password: '',
        }
    };
  },
  methods: {
    handleSelectionChange(sels){
      this.selectedids=sels
    },
    onUpdate() {
      this.$api.updateWmu(this.addForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'修改成功',type:'success'})
          //关闭弹窗
          this.updateDialogVisible=false
          //重新加载后台数据
          this.httpSingleBasePage(this.wmuByPage)
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
      this.$api.addWmu(this.addForm).then(
        response=>{
          if(response.status===200){
            this.$message({message:'添加成功',type:'success'})
            //关闭弹窗
            this.addDialogVisible=false
            //重新加载后台数据
            this.httpSingleBasePage(this.wmuByPage)
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
      this.addForm.name=''
      this.addForm.age=''
      this.addForm.gender=''
      this.addForm.tele=''
      this.addForm.loginname=''
      this.addForm.password=''
    },
    onSelect() {
      if(this.searchPage.warehouseid!=''){
        this.wmuByPage.warehouseid=parseInt(this.searchPage.warehouseid)
      }
      if(this.searchPage.address!=''){
        this.wmuByPage.address=this.searchPage.address
      }
      if(this.searchPage.manageName!=''){
        this.wmuByPage.manageName=this.searchPage.manageName
      }      
      if(this.searchPage.warehouseid==''&&this.searchPage.address==''&&this.searchPage.manageName==''){
        this.wmuByPage.warehouseid=-1
        this.wmuByPage.address='null'
        this.wmuByPage.manageName='null'

        this.httpSingleBasePage(this.wmuByPage)
      }else{
        this.httpBasePage(this.wmuByPage)
      }
    },
    changePage(num){
      this.wmuByPage.pageNo=num
      this.httpBasePage(this.wmuByPage)
    },
    adduser() {
      this.addDialogVisible=true;
    },
    handleEdit(index, row) {
      this.updateDialogVisible=true;
      this.addForm.id=row.id
      this.addForm.name=row.name
      this.addForm.age=row.age
      this.addForm.gender=row.gender
      this.addForm.tele=row.tele
      this.addForm.loginname=row.loginname
      this.addForm.password=row.password
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
        this.$api.deleteWmu(ids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpSingleBasePage(this.wmuByPage);
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
        this.$api.deleteWmu(ids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpSingleBasePage(this.wmuByPage);
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
    httpBasePage(wmuByPage){
      this.$api.getWmu(wmuByPage).then(
        response=>{
          if(response.status===200){
            console.log(response)
            this.tableData=response.data.data.list
            this.pages.total=response.data.data.total
            this.pages.pageSize=response.data.data.pageSize
          }
        },
        error=>{
          console.log('请求失败了',error.message)
        }
      )
    },
    httpSingleBasePage(wmuByPage){
      this.$api.getSingleWmu(wmuByPage).then(
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
    this.httpSingleBasePage(this.wmuByPage)
  }
};
</script>

<style lang='less' scoped>
.user {
  margin: 20px;
}
.header {
  // 可以所有的标签在一行显示
  display: flex;
  margin: 20px, 0;
}
</style>