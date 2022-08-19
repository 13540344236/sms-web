<template>
  <div>
    <div style="display: flex;margin: 40px 0">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="登录账号">
          <el-input v-model="formInline.id" placeholder="请输入登录账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button style="margin-left:10px" type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-button style="height: 40px;margin-left:10px" type="primary" @click="add">添加用户</el-button>
        <el-button style="margin-left:20px" type="primary"@click="adds">导出用户信息</el-button>
      </el-form>
    </div>

    <div>

      <!--  查询用户  -->
      <el-dialog title="查询用户" :visible.sync="dialogFormVisibleSelect" width="90%">
        <el-table  border style="width: 100%;text-align: center">
          <el-table-column prop="id" label="用户ID" width="100"></el-table-column>
          <el-table-column prop="staffName" label="用户名称" width="140"></el-table-column>
          <el-table-column prop="gender" label="用户性别" width="80"></el-table-column>
          <el-table-column prop="phone" label="用户电话号码" width="140"></el-table-column>
          <el-table-column prop="idNumber" label="身份证号" width="140"></el-table-column>
          <el-table-column prop="onDuty" label="是否在岗" width="140"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="140"></el-table-column>
          <el-table-column prop="description" label="描述" ></el-table-column>
          <el-table-column prop="enable" label="是否启用" width="140"></el-table-column>
          <el-table-column prop="gmtCreate" label="用户入职时间" width="140"></el-table-column>
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
      </el-dialog>

      <el-table :data="tableData" border style="width: 100%;text-align: center">
<!--        <el-table-column prop="id" label="用户ID" width="100"></el-table-column>-->
        <el-table-column prop="username" label="姓名" width="120"></el-table-column>
        <el-table-column prop="nickname" label="昵称" width="80"></el-table-column>
        <el-table-column prop="phone" label="登录账号" width="150"></el-table-column>
<!--        <el-table-column prop="idNumber" label="身份证号"></el-table-column>-->
<!--        <el-table-column prop="onDuty" label="是否在岗" width="140"></el-table-column>-->
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="role" label="角色" ></el-table-column>
        <el-table-column prop="enable" label="是否启用" width="120">
          <template slot-scope="scope">
            <el-switch
                v-model="scope.row.enable"
                @change="handleChangeEnable(scope.$index, scope.row.id, scope.row.enable)"
                :active-value="1"
                :inactive-value="0"
                active-color="#13ce66"
                inactive-color="#999">
            </el-switch>
          </template>
        </el-table-column>
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

      <!--  添加用户  -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="50%">

        <el-form :model="ruleForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">
          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>

          <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="角色" prop="role">
            <el-input v-model="ruleForm.role"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="ruleForm.address"></el-input>
          </el-form-item>




          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <!--   编辑用户   -->
      <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit" width="50%">

        <el-form :model="editForm" ref="ruleForm" label-width="150px" class="demo-ruleForm">

          <el-form-item label="用户姓名" prop="userName">
            <el-input v-model="editForm.username"></el-input>
          </el-form-item>

          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="editForm.nickname"></el-input>
          </el-form-item>

          <el-form-item label="电话" prop="phone">
            <el-input v-model="editForm.phone"></el-input>
          </el-form-item>

          <el-form-item label="角色" prop="role">
            <el-input v-model="editForm.role"></el-input>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>

          <el-form-item label="地址" prop="address">
            <el-input v-model="editForm.address"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
            <el-button type="primary" @click="handleEdit(ruleForm.id)">确 定</el-button>
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
      // 分页
      pageNum: 1,
      pageSize: 10,
      totalCount: 0,
      formInline: {
        id: ''
      },
      tableData: [],
      input:'',
      dialogFormVisible:false,
      dialogFormVisibleEdit:false,
      dialogFormVisibleSelect:false,
      ruleForm: {
        id:'',
        username: '',
        password: '',
        nickname: '',
        phone:'',
        email: '',
        address:'',
        createTime:'',
        avatarUrl:'',
        role:'',
        enable:''
      },
      editForm: {
        id:'',
        username: '',
        password: '',
        nickname: '',
        phone:'',
        email: '',
        address:'',
        createTime:'',
        avatarUrl:'',
        role:'',
        enable:''
      },
    }
  },
  methods: {
    /*    loadGoods: function () {
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
        },*/
    //查询
    onSubmit() {
      this.axios.get('http://localhost:9091/users/' + this.formInline.id + '/selectById')
          .then((response) => {
            console.log("canshu", response)
            this.tableData = [response.data.data]
            console.log(this.tableData)
          })
    },
// 删除用户
    openDeleteConfirm(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleDelete(id);
      }).catch(() => {
      });
    },
    handleDelete(id) {
      console.log('将删除id = ' + id + '的用户数据');
      let url = 'http://localhost:9091/users/' + id + '/delete'
      this.axios
          // .create({headers: {'Authorization': localStorage.getItem('jwt')}})
          .post(url).then((response) => {
        let json = response.data;
        if (json.code === 20000) {
          this.$message({
            message: '删除用户成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.pageAll();
      });
    },

// 查询用户
    select(input){
      this.dialogFormVisibleSelect = true
      this.selects(input)
    },
    selects(id){
      console.log('将查询id = ' + id + '的用户数据');
      let url = 'http://localhost:9091/users/' + id + '/selectById'
      this.axios
          // .create({headers: {'Authorization': localStorage.getItem('jwt')}})
          .get(url).then((response) => {
        console.log(response)
        let json = response.data;
        if (json.code === 20000) {
          this.selectData.push(response.data.data);
          this.$message({
            message: '查询用户成功！',
            type: 'success'
          })
        } else {
          this.$message.error(response.data.message);
        }
        this.selects();
      });
    },

// 添加用户
    add(){
      this.dialogFormVisible = true
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/users/add-new';
          console.log('url >>>'+url);
          console.log('data >>>');
          console.log("参数:" + this.ruleForm);
          this.axios
              // .create({headers: {'Authorization': localStorage.getItem('jwt')}})
              .post(url,this.ruleForm).then((response) => {
            console.log(response.data);
            if (response.data.code === 20000){
              this.$message({
                message: '添加用户成功！',
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

// 编辑商品
    edit(val){
      Object.assign(this.editForm,val)
      this.dialogFormVisibleEdit = true;
    },
    handleEdit(id) {
      console.log('将编辑id = ' + id + '的用户数据');
      let url = 'http://localhost:9091/users/update'
      this.axios
          // .create({headers: {'Authorization': localStorage.getItem('jwt')}})
          .post(url,this.editForm).then((response) => {
        let json = response.data;
        console.log(response.data.data)
        if (json.code === 20000) {
          this.$message({
            message: '编辑用户成功！',
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
      this.axios
          // .create({headers: {'Authorization': localStorage.getItem('jwt')}})
          .get('http://localhost:9091/users/page?pageNum=' + this.pageNum + '&pageSize=' + this.pageSize)
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

    //表格导入数据库
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
      let url = "http://localhost:9091/users/importExcel" //这里填写调用的后端Excel数据处理接口
      this.axios
          // .create({headers: {'Authorization': localStorage.getItem('jwt')}})
          .post(url, formData, config).then(response => {
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
    //导出表格
    adds(){
      location.href = "http://localhost:9091/users/exportExcel"
    },

    //是否启用
    handleChangeEnable(i, id, toState) {
      let enableText = ['禁用', '启用'];
      let originState = (toState + 1) % 2;
      this.$message('启用成功');
      setTimeout(() => {
        this.tableData[i].enable = originState;
      }, 200);
    },
  },

  created() {
    console.log('vue created')
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