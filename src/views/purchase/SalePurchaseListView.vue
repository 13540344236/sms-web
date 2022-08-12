<template>
  <div>
    <h3 style="margin: 20px 0">销售管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加销售</el-button>
      <el-button style="margin-left:20px" type="primary" @click="exportExcel">导出销售详情</el-button>
      <!--  批量删除  -->
      <el-button type="danger" @click="batchDelete" :disabled="this.multipleSelection.length === 0">批量删除</el-button>
    </div>

    <div>
      <!--            <el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--              <el-breadcrumb-item :to="{ path: '/sms/goods/list' }">首页</el-breadcrumb-item>-->
      <!--              <el-breadcrumb-item>商品管理</el-breadcrumb-item>-->
      <!--            </el-breadcrumb>-->

      <el-table :data="tableData" border
                style="width: 100%;horiz-align: center" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
        <el-table-column prop="name" label="商品名称" width="140"></el-table-column>
        <el-table-column prop="goodsSpecification" label="商品规格" width="140"></el-table-column>
        <el-table-column prop="saleQuantity" label="销售数量" width="140"></el-table-column>
        <el-table-column prop="customerName" label="客户姓名" width="140"></el-table-column>
        <el-table-column prop="customerPhone" label="客服电话" width="140"></el-table-column>
        <el-table-column prop="operatingStaff" label="操作员工" width="140"></el-table-column>
        <el-table-column prop="gmtCreate" label="操作时间"  width="140"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="primary"
                @click="edit(scope.row)">编辑</el-button>
            <el-button
                size="mini"
                type="danger"
                @click="openDeleteConfirm(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!--  添加商品  -->
      <el-dialog title="销售商品" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="商品名称" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="ruleForm.goodsSpecification"></el-input>
          </el-form-item>

          <el-form-item label="销售数量" prop="saleQuantity">
            <el-input v-model="ruleForm.saleQuantity"></el-input>
          </el-form-item>

          <el-form-item label="客服名称" prop="customerName">
            <el-input v-model="ruleForm.customerName"></el-input>
          </el-form-item>

          <el-form-item label="客服电话" prop="customerPhone">
            <el-input v-model="ruleForm.customerPhone"></el-input>
          </el-form-item>

          <el-form-item label="操作员工" prop="operatingStaff">
            <el-input v-model="ruleForm.operatingStaff"></el-input>
          </el-form-item>

          <el-form-item label="商品logo的URL" prop="logo">
            <el-input v-model="ruleForm.logo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑商品   -->
      <el-dialog title="编辑商品" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="商品名称" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="商品规格" prop="goodsSpecification">
            <el-input v-model="editForm.goodsSpecification"></el-input>
          </el-form-item>

          <el-form-item label="销售数量" prop="saleQuantity">
            <el-input v-model="editForm.saleQuantity"></el-input>
          </el-form-item>

          <el-form-item label="客服名称" prop="customerName">
            <el-input v-model="editForm.customerName"></el-input>
          </el-form-item>

          <el-form-item label="客服电话" prop="customerPhone">
            <el-input v-model="editForm.customerPhone"></el-input>
          </el-form-item>

          <el-form-item label="操作员工" prop="operatingStaff">
            <el-input v-model="editForm.operatingStaff"></el-input>
          </el-form-item>

          <el-form-item label="商品logo的URL" prop="logo">
            <el-input v-model="editForm.logo"></el-input>
          </el-form-item>

          <el-form-item label="操作时间" prop="gmtCreate">
            <el-input v-model="editForm.gmtCreate"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(editForm.id)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>



    <!--  分页  -->
    <div style="text-align: center;margin: 20px">
      <el-pagination background layout="total,prev, pager, next, jumper"
                     :total="total" :page-size="pageSize"></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    total: {
      type: Number,
      default: 10
    },
    pageSize: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {
      // 勾选的数据
      multipleSelection: [],
      tableData: [],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'',
        name: '',
        goodsSpecification:'',
        saleQuantity:'',
        customerName:'',
        customerPhone:'',
        operatingStaff:'',
        gmtCreate:'',
        logo: '',
      },
      editForm: {
        id:'',
        name: '',
        goodsSpecification:'',
        saleQuantity:'',
        customerName:'',
        customerPhone:'',
        operatingStaff:'',
        gmtCreate:'',
        logo: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    loadSales: function () {
      console.log('loadSales()');
      let url = 'http://localhost:9091/sales';
      console.log('url = ' + url);
      this.axios.get(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.tableData = json.data;
        } else {
          this.$message.error(response.data.message);
        }
      })
    },
    openDeleteConfirm(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id);
      }).catch(() => {
      });
    },
    handleDelete(id) {
      console.log('将删除id = ' + id + '的品牌数据');
      let url = 'http://localhost:9091/sales/' + id + '/delete'
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.loadSales();
      });
    },

// 批量删除
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val
    },
    batchDelete() {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach((res,i) => {
          let url = 'http://localhost:9091/sales/' + res.id + '/delete'
          this.axios.post(url).then((response) => {
            if (response.data.code === 20000 && (i+1) ===this.multipleSelection.length) {
              this.$message({
                message: '删除订单成功！',
                type: 'success'
              })
            }
            this.loadSales();
          })
        })
      }).catch(() => {
      });
    },
// 添加商品
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/sales/add-new';
          console.log('url >>>'+url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url,this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000){
              this.$message({
                message: '添加订单成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.loadSales();
            }else {
              this.$message.error(response.data.message);
            }
          }).catch(function (error) {
            console.log('响应结果失败!')
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

// 编辑商品
    edit(val){
      Object.assign(this.editForm,val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {
      console.log('将编辑id = ' + id + '的品牌数据');
      let url = 'http://localhost:9091/sales/' + id + '/edit'
      this.axios.post(url,this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑订单成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
          this.loadSales();
        } else {
          this.$message.error(response.data.message);
        }
        this.loadSales();
      });
    },
    exportExcel(){
      location.href = "http://localhost:9091/sales/exportExcel"
    }
  },
  created() {
    console.log('vue created')
  },
  mounted() {
    console.log('vue mounted')
    this.loadSales();
  }
}
</script>
