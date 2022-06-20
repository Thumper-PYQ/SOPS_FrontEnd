<template>
  <div class="block">
    <el-pagination
      background
      :page-size="pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        total:{
            type:Number,
            default:100
        },
        pageSize:{
            type:Number,
            default:10
        }
    },
    methods: {
      changePage(page){
          this.$emit('changePage',page)
      }
    },
    data() {
      return {
      };
    }
};
</script>

<style>
.block{
    text-align: center;
    margin: 20px;
}
</style>