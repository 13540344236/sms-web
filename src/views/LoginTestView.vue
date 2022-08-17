<template>
  <div>
    <el-row style="margin: 80px 0 0 0;">
      <el-col :span="12">&nbsp;</el-col>
      <el-col :span="9">
        <h1 style="text-align: center; margin: 20px 0;">用户登录</h1>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username" size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" size="small"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button size="small" @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: 'root',
        password: '123456'
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!');
          let url = 'http://localhost:9091/users/login';
          console.log('url >>> ' + url);
          let data = {
            'username': this.ruleForm.username,
            'password': this.ruleForm.password
          };
          console.log('data >>> ');
          console.log(data);
          this.axios.post(url, data).then((response) => {
            console.log(response.data.code);
            if (response.data.code == 20000) {
              // 提示登录成功
              this.$message({
                message: '登录成功！',
                type: 'success'
              });
              // 获取服务器端响应的JWT并存入到LocalStorage中
              let jwt = response.data.data;
              console.log(jwt);
              localStorage.setItem('jwt', jwt);//JWT设置
              // 跳转到主页
              this.$router.push('/sms');
            } else {
              this.$message.error('登录失败，用户名或密码错误！');
            }
          }).catch(function (error) {
            console.log('响应结果为失败！');
          })
        } else {
          alert('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>