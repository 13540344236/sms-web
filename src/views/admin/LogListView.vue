<template>
  <div>
    <div style="display: flex">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="商品名">
          <el-input v-model="formInline.name" placeholder="请输入商品名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left: 10px" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table :data="tableData" border
                style="width: 100%;horiz-align: center">
        <el-table-column prop="id" label="记录id" width="80"></el-table-column>
        <el-table-column prop="ip" label="登录地址" width="140"></el-table-column>
        <el-table-column prop="username" label="用户名" width="140"></el-table-column>
        <el-table-column prop="createdTime" label="时间"></el-table-column>
        <el-table-column prop="operation" label="用户操作" width="180"></el-table-column>
        <el-table-column prop="method" label="请求方法"></el-table-column>
        <el-table-column prop="time" label="执行时长" width="140"></el-table-column>
      </el-table>
    </div>

    <!--  分页  -->
    <div class="block" style="margin: 20px">
      <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNum"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,

      tableData: [],
      formInline:{
        name: '',
      },
      input:'',
    }
  },
  methods: {
// 分页查询
    pageAll() {
      console.log('pageAll()')
      this.axios.get('http://localhost:9091/logs/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
          .then((response) => {
            console.log(response)
            this.tableData = response.data.data.list
            this.totalCount = response.data.data.totalCount
          })
    },
    handleSizeChange(pageSize) {
      console.log(`每页 ${pageSize} 条`);
      this.pageSize = pageSize;
      this.pageAll()
    },
    handleCurrentChange(pageNum) {
      console.log(`当前页: ${pageNum}`);
      this.pageNum = pageNum;
      this.pageAll()
    },

//查询商品
    onSubmit() {
      this.axios.post('http://localhost:9091/goods/selectByName',this.formInline)
          .then((response) => {
            console.log("canshu", response)
            this.tableData = response.data.data
            console.log(this.tableData)
          })
    },
  },

  created() {
    this.pageAll();
  },
  mounted() {
    console.log('vue mounted')
    this.pageAll();
  }
}
</script>

<style scoped>

</style>