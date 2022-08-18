<!--找回密码-->
<template>
  <div id="logo">
    <el-form :rules="rules" ref="loginForm" :model="loinForm" class="loginContainer">
      <h3 class="loginTitle"  style="color: white; text-align: center ">找回密码</h3>
      <!--      账号-->
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" v-model="loinForm.username" placeholder="请输手机号"></el-input>
      </el-form-item>
      <!--      验证码-->
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" v-model="loinForm.code" placeholder="请输入验证码" style="width:188px;margin-right: 10px "></el-input>
        <el-button type="info" @click="getCode" :disabled="used">{{Text3}}</el-button>
      </el-form-item>
      <!--      密码1-->
      <el-form-item prop="password">
        <el-input type="password" auto-complete="off" v-model="loinForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <!--      密码2-->
      <el-form-item prop="checkpassword">
        <el-input type="password" auto-complete="off" v-model="loinForm.checkpassword"
                  placeholder="请再次输入密码"></el-input>
      </el-form-item>
      <el-form-item class="btn">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <div>
        <el-button type="text" @click="regisrer">还没有账号?
          <el-button type="text">注册新账号</el-button>
        </el-button>
        <el-button type="text" style="padding-left:80px"  @click="login">返回登录页</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "alter",
  name1:"logo",
  data() {

    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.loinForm.checkpassword !== '') {
          this.$refs.loginForm.validateField('checkpassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.loinForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
      return {
        loinForm: {
          username: '',
          password: '',
          checkpassword: '',
          code: '',
        },
        //获取验证码按钮
        counter:60,
        Text3:'获取验证码',
        used:false,

        rules: {
          username: [{required: true, message: '请输入手机号', trigger: 'blur'}],
          password: [{validator: validatePass, trigger: 'blur'}],
          checkpassword: [{validator: validatePass2, trigger: 'blur'}],
          code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
        }
      };
    },
  methods: {
    // 登录的点击事件
    submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        alert('submit!');
      } else {
        return false;
      }
      this.axios.get("http://localhost:9091/sms/checkSmsCode?phoneNumber="+ this.loinForm.username+"&loinForm.code"+this.loinForm.code).then(function (response){
        if (response.data.code == 1){
          alert("短信验证成功")
        }else if (response.data.code == 2){
          alert("输入验证码不正确")
        }
      })
    });
  },
  resetForm(formName) {
    this.$refs.loginFormRef.resetFileds();
  },
    regisrer() {
      this.$router.push('/register');
    },
    login(){
      this.$router.push('/login');
    },
    getCode(){
        //判断手机号是否合法
        const regMobile = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
        if (regMobile.test(this.loinForm.username)) {
          const timeWare = window.setInterval(() => {
            this.used = true;
            this.counter--;
            this.Text3 = this.counter + 's后重新获取';
            if (this.counter === 0) {
              this.Text3 = '获取验证码';
              this.counter = 60;
              this.used = false;
              clearTimeout(timeWare);
            }
          }, 1000);
        }else {
          alert("手机号格式不正确")
          return;
        }
        this.axios.get("http://localhost:9091/sms/sendSmsCode?phoneNumber="+ this.loinForm.username).then(function (response){
          if (response.data.code === 1){
            alert("短信发送成功，请注意查收！")
          }else if (response.data.code === 2){
            alert("短信发送失败，请注稍后再试。")
          }
        })
    }
  }
}
</script>

<style scoped>
/*边框样式*/
.loginContainer {
  border-right: 50px;
  background-clip: padding-box;
  margin: 100px 200px 600px 530px;
  width: 420px;
  padding: 10px 30px 10px 30px;
  background: rgba(255,0,0,0);
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginContainer:hover {
  box-shadow: -12px 12px 2px -1px rgba(0, 0, 255, .2);
}

/*“返回登录”字体样式*/
.loginTitle {
  margin: 20px auto 15px auto;
  text-align: left;
}
.btn{
  display: flex;
  justify-content: center;
}

#logo {
  background: url("../assets/img.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}

</style>