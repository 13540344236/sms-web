<template>
  <div>
    <h3 style="margin: 20px 0">供应商管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加供应商</el-button>
      <el-button
          style="margin-left:20px"
          type="danger" @click="batchDelete" :disabled="this.multipleSelection.length === 0">批量删除</el-button>
    </div>

    <div>
      <!--            <el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--              <el-breadcrumb-item :to="{ path: '/sms/goods/list' }">首页</el-breadcrumb-item>-->
      <!--              <el-breadcrumb-item>商品管理</el-breadcrumb-item>-->
      <!--            </el-breadcrumb>-->

      <el-table :data="tableData" border style="width: 100%;text-align: center" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
        <el-table-column prop="supplier" label="供货商名称" width="140"></el-table-column>
        <el-table-column prop="supplierName" label="供货商联系人" width="140"></el-table-column>
        <el-table-column prop="supplierPhone" label="联系人电话" width="140"></el-table-column>
        <el-table-column prop="supplierSite" label="供货商地址" width="140"></el-table-column>
        <el-table-column prop="remark" label="备注" width="140"></el-table-column>
        <el-table-column prop="gmtCreate" label="录入时间" width="140"></el-table-column>
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

      <!--  添加供应商  -->
      <el-dialog title="添加供应商" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="供应商名称" prop="supplier">
            <el-input v-model="ruleForm.supplier"></el-input>
          </el-form-item>

          <el-form-item label="供应商联系人" prop="supplierName">
            <el-input v-model="ruleForm.supplierName"></el-input>
          </el-form-item>

          <el-form-item label="供应商电话" prop="supplierPhone">
            <el-input v-model="ruleForm.supplierPhone"></el-input>
          </el-form-item>

          <el-form-item label="供应商地址" prop="supplierSite">
            <el-input v-model="ruleForm.supplierSite"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input v-model="ruleForm.remark"></el-input>
          </el-form-item>

          <el-form-item label="录入时间" prop="gmtCreate">
            <el-input v-model="ruleForm.gmtCreate"></el-input>
          </el-form-item>

          <el-form-item label="操作时间" prop="gmtModified">
            <el-input v-model="ruleForm.gmtModified"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑供应商   -->
      <el-dialog title="编辑供应商" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="供应商ID" prop="id">
            <el-input v-model="editForm.id" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="供应商名称" prop="supplier">
            <el-input v-model="editForm.supplier"></el-input>
          </el-form-item>

          <el-form-item label="供应商联系人" prop="supplierName">
            <el-input v-model="editForm.supplierName"></el-input>
          </el-form-item>

          <el-form-item label="联系人电话" prop="supplierPhone">
            <el-input v-model="editForm.supplierPhone"></el-input>
          </el-form-item>

          <el-form-item label="供应商地址" prop="supplierSite">
            <el-input v-model="editForm.supplierSite"></el-input>
          </el-form-item>

          <el-form-item label="备注" prop="remark">
            <el-input v-model="editForm.remark"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(editForm.id)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      // 勾选的数据
      multipleSelection: [],
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,

      tableData: [],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'',
        supplier: '',
        supplierName: '',
        supplierPhone: '',
        supplierSite:'',
        remark: '',
        gmtCreate: '',
        gmtModified:'',
      },
      editForm: {
        id:'',
        supplier: '',
        supplierName: '',
        supplierPhone: '',
        supplierSite:'',
        remark: '',
        gmtCreate: '',
        gmtModified:'',
      },
      rules: {
        supplierPhone: [
          { required: true,pattern:/^[1][3,4,5,7,8][0-9]{9}$/, message: '请输入正确的电话格式', trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
/*    loadGoods: function () {
      console.log('loadGoods()');
      let url = 'http://localhost:9091/suppliers';
      console.log('url = ' + url);
      this.axios.get(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.tableData = json.data;
        } else {
          this.$message.error(response.data.message);
        }
      })
    },*/

// 删除供应商
    openDeleteConfirm(id) {
      this.$confirm('此操作将永久删除该供应商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id);
      }).catch(() => {
      });
    },
    handleDelete(id) {
      console.log('将删除id = ' + id + '的供应商数据');
      let url = 'http://localhost:9091/suppliers/' + id + '/delete'
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除供应商成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.pageAll();
      });
    },

// 批量删除
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val
    },
    batchDelete() {
      this.$confirm('此操作将永久删除供应商, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.multipleSelection.forEach((res, i) => {
          let url = 'http://localhost:9091/suppliers/' + res.id + '/delete'
          this.axios.post(url).then((response) => {
            if (response.data.code === 20000 && (i + 1) === this.multipleSelection.length) {
              this.$message({
                message: '删除供应商成功！',
                type: 'success'
              })
            }
            this.pageAll();
          })
        })
      }).catch(() => {
      });
    },

// 添加供应商
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/suppliers/add-new';
          console.log('url >>>'+url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url,this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000){
              this.$message({
                message: '添加供应商成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.pageAll();
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

// 编辑供应商
    edit(val){
      Object.assign(this.editForm,val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {
      console.log('将编辑id = ' + id + '的供应商数据');
      let url = 'http://localhost:9091/suppliers/' + id + '/edit'
      this.axios.post(url,this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑供应商成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
        } else {
          this.$message.error(response.data.message);
        }
        this.pageAll();
      });
    },

// 分页查询
    pageAll() {
      console.log('pageAll()')
      this.axios.get('http://localhost:9091/suppliers/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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
  },

  created() {
    /*    console.log('vue created')
        this.axios.get('http://localhost:9091/goods').then((response) => {
          if (response.data.code === 20000) {
            this.tableData = response.data.data;
          } else {
            this.$message.error(response.data.message);
          }
        })*/
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