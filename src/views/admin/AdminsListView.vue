<template>
  <div>
    <h3 style="margin: 20px 0">员工管理</h3>
    <div style="display: flex;margin: 20px 0">
      <el-input style="width: 180px" v-model="input" placeholder="请输入内容"></el-input>
      <el-button style="margin-left:20px" type="primary">搜索</el-button>
      <el-button style="margin-left:20px" type="primary" @click="add">添加员工</el-button>
      <el-button style="margin-left:20px" type="primary"@click="adds">导出员工信息</el-button>
      <el-upload
          :beforeUpload="beforeUpload"
          :showUploadList="false"
          :multiple="true">
        <el-button type="primary"> 导入线索 </el-button>
      </el-upload>


    </div>


    <div>
      <!--  员工列表  -->
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="员工ID" width="80"></el-table-column>
        <el-table-column prop="staffName" label="员工姓名" width="100"></el-table-column>
        <el-table-column prop="password" label="登陆密码" width="140"></el-table-column>
        <el-table-column prop="gender" label="性别" width="80"></el-table-column>
        <el-table-column prop="phone" label="电话号码" width="140"></el-table-column>
        <el-table-column prop="idNumber" label="身份证号码"></el-table-column>
        <el-table-column prop="onDuty" label="是否在岗" width="120"></el-table-column>
        <el-table-column prop="email" label="电子邮箱"></el-table-column>
        <el-table-column prop="description" label="员工简介"></el-table-column>
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

<!--   添加员工   -->
      <el-dialog title="添加员工" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="员工姓名" prop="staffName">
            <el-input v-model="ruleForm.staffName"></el-input>
          </el-form-item>

          <el-form-item label="登陆密码" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-input v-model="ruleForm.gender"></el-input>
          </el-form-item>

          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="身份证号码" prop="idNumber">
            <el-input v-model="ruleForm.idNumber"></el-input>
          </el-form-item>

          <el-form-item label="是否在岗" prop="onDuty">
            <el-input v-model="ruleForm.onDuty"></el-input>
          </el-form-item>

          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>

          <el-form-item label="员工简介" prop="description">
            <el-input v-model="ruleForm.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

<!--   编辑员工   -->
      <el-dialog title="编辑员工" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" :rules="rules" ref="editForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="员工姓名" prop="staffName">
            <el-input v-model="editForm.staffName"></el-input>
          </el-form-item>

          <el-form-item label="登陆密码" prop="password">
            <el-input v-model="editForm.password"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-input v-model="editForm.gender"></el-input>
          </el-form-item>

          <el-form-item label="电话号码" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="身份证号码" prop="idNumber">
            <el-input v-model="editForm.idNumber"></el-input>
          </el-form-item>

          <el-form-item label="是否在岗" prop="onDuty">
            <el-input v-model="editForm.onDuty"></el-input>
          </el-form-item>

          <el-form-item label="电子邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>

          <el-form-item label="员工简介" prop="description">
            <el-input v-model="editForm.description"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(editForm.id)">确 定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>


    <!--  分页(暂未完成)  -->
    <div style="text-align: center;margin: 20px">
      <el-pagination background layout="total,prev, pager, next, jumper"
                     :total="total" :page-size="pageSize"></el-pagination>
    </div>
  </div>
</template>

<script>
let href;
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
      fileList: [],
      tableData:[{id:'1', staffName: '张三', password: '123456', gender: '男', phone:'13255584449',
        idNumber: '514845151515851', onDuty: '1', email:'zhangsan@qq.com', description:'上班偷奸耍滑,建议开除'}],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      ruleForm: {
        id:'', staffName: '', password: '', gender: '', phone:'',
        idNumber: '', onDuty: '', email:'', description:''
      },
      editForm: {
        id:'', staffName: '', password: '', gender: '', phone:'',
        idNumber: '', onDuty: '', email:'', description:''
      },
      rules: {
        staffName: [
          { required: true, message: '请输入员工姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工登录密码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
        ],
        email: [
          { required: true, message: '请输入员工邮箱', trigger: 'blur' },
          { pattern:/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '请输入正确的邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入员工电话号码', trigger: 'blur' },
          { pattern:/^1[3|4|5|7|8][0-9]\d{4,8}$/, message: '请输入正确的手机号码', trigger: 'blur' }
        ],
        idNumber: [
          { required: true,message: '请输入员工身份证号码', trigger: 'blur' },
          { pattern:/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, min: 1, max: 14, message: '请输入正确的身份证号码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loadGoods: function () {
      console.log('loadGoods()');
      let url = 'http://localhost:9091/admins';
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
    beforeUpload(file){
      let _this = this
      console.log(file)
      let formData = new FormData();
      formData.append("file", file);
      let config = {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      };
      let url = "http://localhost:9091/admins/upload" //这里填写调用的后端Excel数据处理接口
      this.axios.post(url, formData, config).then(response => {
        let  data = response.status;
        console.log(data)
        if (response.status == 200) {
          this.$message('导入成功');
          return;
          this.loadGoods();
        }else{
          this.$message("导入失败");
          return;
        }

      }).catch(function(error){
        alert("导入失败");
      });
    },

    adds(){
      location.href = "http://localhost:9091/admins/download"
    },



// 员工列表
// 添加员工
    add(){
      this.dialogFormVisible = true
    },

    submitForm(formName) {

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

// 删除员工
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
    handleDelete(id){

    },

// 编辑员工
    edit(val) {
      Object.assign(this.editForm,val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {

    },

  },
  created() {
    console.log('vue created')
  },
  mounted() {
    console.log('vue mounted')
    this.loadGoods();
  }
}
</script>

<style scoped>

</style>