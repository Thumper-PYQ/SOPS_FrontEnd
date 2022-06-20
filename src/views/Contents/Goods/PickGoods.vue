<template>
  <div class="goods">
    <!-- 1.搜索区域 -->
    <div class="header">
      <el-form :inline="true" :model="page" class="demo-form-inline">
        <!-- <el-form-item>
          <el-button type="danger" @click="handleMutiDelete">删除</el-button>
        </el-form-item> -->
        <el-form-item label="商品ID">
          <el-input v-model="page.goodsId" placeholder="商品ID"></el-input>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="page.goodsName" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="供应商">
          <el-input v-model="page.provideName" placeholder="供应商"></el-input>
        </el-form-item>
        <el-form-item label="商品描述">
          <el-input  v-model="page.goodsDescription"  placeholder="商品描述"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSelect">查询</el-button>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="primary" @click="addGoods">添加</el-button>
        </el-form-item> -->
      </el-form>
    </div>

    <!-- 2.表格区域展示视图数据 -->
    <div class="wrapper">
      <template>
        <el-table :data="tableData" @selection-change="handleSelectionChange" border style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="gid" label="商品ID" width="180">
          </el-table-column>
          <el-table-column  prop="gname"  label="商品名称"   width="180"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column  prop="provide.pname"  label="供应商名称"  width="180"  show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="numbers" label="商品库存数量" width="180">
          </el-table-column>
          <el-table-column  prop="description"  label="商品描述"  show-overflow-tooltip>
          </el-table-column>

          <!-- <el-table-column label="操作" width="180">
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
          </el-table-column> -->

        </el-table>
      </template>
    </div>

    <!-- 3.分页 -->
    <div>
      <my-pagination :total='pages.total' :pageSize='pages.pageSize' @changePage='changePage'></my-pagination>
    </div>

    <!-- 4.添加商品弹框 -->
    <el-dialog title="添加商品" :visible.sync="addDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="商品ID">
            <el-input v-model="addForm.gid"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="addForm.gname"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="addForm.provideid"></el-input>
          </el-form-item>
          <el-form-item label="入库数量">
            <el-input v-model="addForm.numbers"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
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
    <el-dialog title="编辑商品" :visible.sync="updateDialogVisible" width="40%">
      <div>
        <el-form ref="form" :model="addForm" label-width="80px" size="mini">
          <el-form-item label="商品ID">
            <el-input v-model="addForm.gid"></el-input>
          </el-form-item>
          <el-form-item label="商品名称">
            <el-input v-model="addForm.gname"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="addForm.provideid"></el-input>
          </el-form-item>
          <el-form-item label="入库数量">
            <el-input v-model="addForm.numbers"></el-input>
          </el-form-item>
          <el-form-item label="商品描述">
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
  name: "Goods",
  components:{
    MyPagination,
  },
  data() {
    return {
      addDialogVisible:false,
      updateDialogVisible:false,
      selectedids:[],
      page:{
        goodsId: '',
        goodsName: '',
        provideName: '',
        goodsDescription: '',        
      },
      goodsByPage:{
        goodsId: -1,
        goodsName: "null",
        provideName: "null",
        goodsDescription: "null",
        total:100,
        pageSize:10,
        currentPage:1
      },
      tableData: [],
      pages:{
        total:200,
        pageSize:10
      },
      addForm: {
          gid:'',
          gname: '',
          provideid: '',
          numbers: '',
          description: ''
        }
    };
  },
  methods: {
    handleSelectionChange(sels){
      this.selectedids=sels
      console.log(this.selectedids)
    },
    onUpdate(){
      this.$api.updateGoods(this.addForm).then(
        response=>{
          if(response.status==200){
            console.log(response)
            this.$message({message:'修改成功',type:'success'});
            //关闭弹窗
            this.updateDialogVisible=false;
            //重新加载后台数据
            this.httpBasePage(this.goodsByPage); 
            //清空表格数据
            this.clearForm();
          }
        },
        error=>{
          this.$message({
            message:error.message,
            type:"error"
          })
        }
      )
    },
    onSubmit() {
      this.$api.addGoods(this.addForm).then(
        response=>{
          if(response.status==200){
            console.log(response)
            this.$message({message:'添加成功',type:'success'});
            //关闭弹窗
            this.addDialogVisible=false;
            //重新加载后台数据
            this.httpBasePage(this.goodsByPage); 
            //清空表格数据
            this.clearForm();
          }
        },
        error=>{
          this.$message({
            message:error.message,
            type:"error"
          })
        }
      )
    },
    clearForm(){
      this.addForm.gid='';
      this.addForm.gname='';
      this.addForm.provideid='';
      this.addForm.numbers='';
      this.addForm.description='';
    },
    onSelect() {
      if(this.page.goodsId!=''){
        this.goodsByPage.goodsId=parseInt(this.page.goodsId)
      }
      if(this.page.goodsName!=''){
        this.goodsByPage.goodsName=this.page.goodsName
      }
      if(this.page.provideName!=''){
        this.goodsByPage.provideName=this.page.provideName
      }
      if(this.page.goodsDescription!=''){
        this.goodsByPage.goodsDescription=this.page.goodsDescription
      }
      if(this.page.goodsId==''&&this.page.goodsName==''&&this.page.provideName==''&&this.page.goodsDescription==''){
            this.$api.goodsResult(
              this.goodsByPage.currentPage,
              this.goodsByPage.pageSize,-1,"null","null","null").then(
              response=>{
                if(response.status==200){
                  console.log(response)
                  this.tableData=response.data.data.list;
                  this.pages.total = response.data.data.total
                  this.pages.pageSize = response.data.data.pageSize
                }
              },
              error=>{
                console.log('请求失败了',error.message)
              }
            )
      }else{
      this.httpBasePage(this.goodsByPage);
      }
    },
    changePage(num){
    /**
     * 分页的页码
     */
      this.goodsByPage.currentPage=num;
      this.httpBasePage(this.goodsByPage);    
    },
    addGoods() {
      this.addDialogVisible=true;
    },
    handleEdit(index, row) {
      this.updateDialogVisible=true;
      console.log(index, row);
      this.addForm.gid=row.gid;
      this.addForm.gname=row.gname;
      this.addForm.numbers=row.numbers;
      this.addForm.provideName=row.provideName;
      this.addForm.description=row.description;

      // this.onSubmit();
      // this.clearForm();
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
          let gids = this.selectedids.map((item)=>item.gid)
          console.log(gids)
          //向后台提交删除的数据
          this.$api.deleteGoods(gids).then(
            res=>{
              if(res.status===200){
                this.$message({ type: 'success', message: '删除成功!' })
                this.httpBasePage(this.goodsByPage);
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
          let gids = this.selectedids.map((item)=>item.gid)
          console.log(gids)
          //向后台提交删除的数据
          this.$api.deleteGoods(gids).then(
            res=>{
              if(res.status===200){
                this.$message({ type: 'success', message: '删除成功!' })
                this.httpBasePage(this.goodsByPage);
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
    httpBasePage(goodsByPage){
      this.$api.goodsResult(
        goodsByPage.currentPage,
        goodsByPage.pageSize,
        goodsByPage.goodsId,
        goodsByPage.goodsName,
        goodsByPage.provideName,
        goodsByPage.goodsDescription).then(
        response=>{
          if(response.status==200){
            console.log(response)
            this.tableData=response.data.data.list;
            this.pages.total = response.data.data.total
            this.pages.pageSize = response.data.data.pageSize
          }
        },
        error=>{
          console.log('请求失败了',error.message)
        }
      )
    }
  },
  mounted(){
    this.httpBasePage(this.goodsByPage);
    
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
</style>