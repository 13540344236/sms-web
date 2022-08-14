<template>
  <div>
    <h3 style="margin: 20px 0">角色管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加角色</el-button>

    </div>


    <div>
      <el-table :data="tableData" border style="width: 100%;text-align: center">
        <el-table-column type="selection" ></el-table-column>
        <el-table-column prop="name" label="姓名" width="300px"></el-table-column>
        <el-table-column prop="description" label="描述" ></el-table-column>
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
      <el-dialog title="添加角色" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑角色   -->
      <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="姓名" prop="name">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="editForm.description"></el-input>
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
      tableData: [],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'',
        name: '',
        description: '',
        sort: '',
        gmtCreate: '',
        gmtModified:'',
      },
      editForm: {
        id:'',
        name: '',
        description: '',
        sort: '',
        gmtCreate: '',
        gmtModified:'',
      },
      rules: {
      }
    }
  },
  methods: {
    loadGoods: function () {
      console.log('loadGoods()');
      let url = 'http://localhost:9091/roles';
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
      console.log('将删除id = ' + id + '的角色数据');
      let url = 'http://localhost:9091/roles/' + id + '/delete'
      this.axios.post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除角色成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.loadGoods();
      });
    },
// 添加角色
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/roles/addNew';
          console.log('url >>>'+url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios.post(url,this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000){
              this.$message({
                message: '添加角色成功！',
                type: 'success'
              });
              this.dialogFormVisible = false;
              this.loadGoods();
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
      console.log('将编辑id = ' + id + '的角色数据');
      let url = 'http://localhost:9091/roles/' + id + '/edit'
      this.axios.post(url,this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑角色成功！',
            type: 'success'
          });
          this.dialogFormVisibleEdit = false;
          this.loadGoods();
        } else {
          this.$message.error(response.data.message);
        }
        this.loadGoods();
      });
    }
  },
  mounted() {
    console.log('vue mounted')
    this.loadGoods();
  }
}
</script>

<style scoped>
</style>