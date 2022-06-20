<template>
  <div class="shelve">
    <!-- 1.搜索区域 -->
    <div class="header">
      <el-form :inline="true" :model="serchPage" class="demo-form-inline">
        <el-form-item>
          <el-button type="danger" @click="handleMutiDelete">删除</el-button>
        </el-form-item>
        <el-form-item label="货架编号">
          <el-input v-model="serchPage.shelveid" placeholder="货架编号"></el-input>
        </el-form-item>
        <el-form-item label="分区编号">
          <el-input v-model="serchPage.said" placeholder="分区编号"></el-input>
        </el-form-item>
        <el-form-item label="商品编号">
          <el-input v-model="serchPage.goodid" placeholder="商品编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addshelve">添加货架</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="addarea">添加分区</el-button>
        </el-form-item>        
      </el-form>
    </div>

    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="id" label="ID" >
          </el-table-column>
          <el-table-column prop="warehouseid" label="仓库编号" >
          </el-table-column>
          <el-table-column  prop="shelveid"  label="货架编号">
          </el-table-column>
          <el-table-column  prop="said"  label="分区编号">
          </el-table-column>
          <el-table-column prop="goodid" label="商品编号" >
          </el-table-column>
          <el-table-column label="操作" width="180" >
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.$index, scope.row)">
                编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>

    <!-- 3.分页 -->
    <div>
      <my-pagination :total='pages.total' :pageSize='pages.pageSize' @changePage='changePage'></my-pagination>
    </div>

    <!-- 4.添加货架弹框 -->
    <el-dialog title="添加货架" :visible.sync="addshelveDialogVisible" width="30%">
      <div>
        <el-form ref="form" :model="addShelveForm" label-width="80px" size="mini">
          <el-form-item label="货架ID">
            <el-input v-model="addShelveForm.sid"></el-input>
          </el-form-item>
          <el-form-item label="仓库ID">
            <el-input v-model="addShelveForm.warehouseid"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onShelveSubmit">确 定</el-button>
            <el-button @click="addshelveDialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 5.添加分区弹框 -->  
    <el-dialog title="添加分区" :visible.sync="addareaDialogVisible" width="30%">
      <div>
        <el-form ref="form" :model="addAreaForm" label-width="80px" size="mini">
          <el-form-item label="仓库编号">
            <el-input v-model="addAreaForm.warehouseid"></el-input>
          </el-form-item>          
          <el-form-item label="货架编号">
            <el-input v-model="addAreaForm.shelveid"></el-input>
          </el-form-item>
          <el-form-item label="分区编号">
            <el-input v-model="addAreaForm.said"></el-input>
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input v-model="addAreaForm.goodid"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onAreaSubmit">确 定</el-button>
            <el-button @click="addareaDialogVisible = false">取 消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>

    <!-- 6.编辑分区对应商品弹框 -->
    <el-dialog title="编辑货架分区" :visible.sync="updateDialogVisible" width="30%">
      <div>
        <el-form ref="form" :model="addAreaForm" label-width="80px" size="mini">
          <el-form-item label="仓库编号">
            <el-input v-model="addAreaForm.warehouseid" ></el-input>
          </el-form-item>
          <el-form-item label="货架编号">
            <el-input v-model="addAreaForm.shelveid"></el-input>
          </el-form-item>
          <el-form-item label="分区编号">
            <el-input v-model="addAreaForm.said" ></el-input>
          </el-form-item>
          <el-form-item label="商品编号">
            <el-input v-model="addAreaForm.goodid"></el-input>
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="onAreaUpdate">确 定</el-button>
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
      addshelveDialogVisible:false,
      addareaDialogVisible:false,      
      updateDialogVisible:false,
      selectedids:[],
      tableData: [],
      serchPage: {
        shelveid:'',
        said:'',
        goodid:''
      },
      shelveAreaByPage:{
        shelveid:'',
        said:'',
        goodid:'',
        total:100,
        pageSize:10,
        pageNo:1
      },
      pages:{
        total:200,
        pageSize:10
      },
      addShelveForm: {
        sid:'',
        warehouseid: '',
      },
      addAreaForm: {
        id:'',
        said:'',
        shelveid: '',
        warehouseid: '',
        goodid: '',
      }
    };
  },
  methods: {
    handleSelectionChange(sels){
      this.selectedids=sels
    },
    onShelveSubmit() {
      this.$api.addShelve(this.addShelveForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'添加成功',type:'success'})
          //关闭弹窗
          this.addshelveDialogVisible=false
          //无需重新加载数据
          // this.httpBasePage(this.warehouseByPage)
          //清空表格数据
          this.clearShelveFrom()
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
    onAreaUpdate(){
      this.$api.updateShelveArea(this.addAreaForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'修改成功',type:'success'})
          //关闭弹窗
          this.updateDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.shelveAreaByPage)
          //清空表格数据
          this.clearAreaFrom()
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
    onAreaSubmit() {
      this.$api.addArea(this.addAreaForm).then(
      response=>{
        if(response.status===200){
          this.$message({message:'添加成功',type:'success'})
          //关闭弹窗
          this.addareaDialogVisible=false
          //重新加载后台数据
          this.httpBasePage(this.shelveAreaByPage)
          //清空表格数据
          this.clearAreaFrom()
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
    clearShelveFrom(){
      this.addShelveForm.sid=''
      this.addShelveForm.warehouseid=''
    },
    clearAreaFrom(){
      this.addAreaForm.id=''
      this.addAreaForm.said=''
      this.addAreaForm.shelveid=''
      this.addAreaForm.warehouseid=''
      this.addAreaForm.goodid=''
    },
    onSelect() {
      if(this.serchPage.shelveid!=''){
        this.shelveAreaByPage.shelveid=this.serchPage.shelveid
      }
      if(this.serchPage.said!=''){
        this.shelveAreaByPage.said=this.serchPage.said
      }
      if(this.serchPage.goodid!=''){
        this.shelveAreaByPage.goodid=this.serchPage.goodid
      }
      if(this.serchPage.shelveid==''&&this.serchPage.said==''&&this.serchPage.goodid==''){
        this.shelveAreaByPage.shelveid=''
        this.shelveAreaByPage.said=''
        this.shelveAreaByPage.goodid=''
        this.httpBasePage(this.shelveAreaByPage)
      }else{
        this.httpBasePage(this.shelveAreaByPage)
      }
    },
    changePage(num){
      this.shelveAreaByPage.pageNo=num
      this.httpBasePage(this.shelveAreaByPage)
    },
    addshelve() {
      this.addshelveDialogVisible=true
    },
    addarea(){
      this.addareaDialogVisible=true
    },
    handleEdit(index, row) {
      this.updateDialogVisible=true;
      this.addAreaForm.id=row.id
      this.addAreaForm.said=row.said
      this.addAreaForm.shelveid=row.shelveid
      this.addAreaForm.warehouseid=row.warehouseid
      this.addAreaForm.goodid=row.goodid
      // console.log(this.addAreaForm)
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
        this.$api.deleteShelveArea(ids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.shelveAreaByPage);
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
        this.$api.deleteShelveArea(ids).then(
          res=>{
            if(res.status===200){
              this.$message({ type: 'success', message: '删除成功!' })
              this.httpBasePage(this.shelveAreaByPage);
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
    httpBasePage(shelveAreaByPage){
      this.$api.getShelvearea(shelveAreaByPage).then(
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
    this.httpBasePage(this.shelveAreaByPage)
  }
};
</script>

<style lang='less' scoped>
.shelve {
  margin: 20px;
}
.header {
  // 可以所有的标签在一行显示
  display: flex;
  margin: 20px, 0;
}
</style>