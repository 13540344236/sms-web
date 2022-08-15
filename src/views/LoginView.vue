<!--登录页面-->
<template >
  <div>
    <el-form :rules="rules" ref="loginForm" :model="loinForm" class="loginContainer">
      <h3 class="loginTitle">欢迎登录超市后台管理系统</h3>
      <!--      账号-->
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user"  type="text" auto-complete="false" v-model="loinForm.username" placeholder="请输手机号"></el-input>
      </el-form-item>
      <!--      密码-->
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" type="password" auto-complete="false" v-model="loinForm.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item prop="code" class="code">
        <el-input type="text" auto-complete="false" v-model="loinForm.code" placeholder="点击图片更换验证码"
                  @keydown.enter.native="submitLogin" style="width:188px;margin-right: 10px "></el-input>
        <img :src="vcUrl"  @click="captcha" width="130px" height="40px" alt=""/>
<!--        <img id="verImg" @click="captcha" width="130px" height="48px"/>-->
      </el-form-item>

      <div>
        <el-button type="text" @click="alter">忘记密码</el-button>
      </div>
      <el-button type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
      <div>
        <el-button type="text" @click="register">还没有账号?
          <el-button type="text">注册新账号</el-button>
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script>

let verKey;
// 获取验证码

export default {
  name: "Login",

  data() {

    return {
      vcUrl:'http://localhost:9091/captchas/captcha',
      captchaUrl: '',
      loinForm: {
        username: '',
        password: '',
        code: ''
      },

      rules: {
        username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
        password: [{required: true, message: '请输入密码', trigger: 'blur'}],
        code: [{required: true, message: '请输入验证码', trigger: 'blur'}]
      }
    }
  },
  methods: {
    // 登录的点击事件
    submitLogin() {
      //判断手机号是否合法
      const regMobile = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if(regMobile.test(this.loinForm.username)){
        this.$refs['loginForm'].validate((valid) => {
          if (valid) {  // 表单校验合法
            let url='http://localhost:9091/logins/login';
            console.log('url >>> ' + url);
            let data={
              'username': this.loinForm.username,
              'password': this.loinForm.password
                };
              console.log('data >>> ');
              console.log(data);
            this.axios.post(url,data).then(res => {
              console.log("res为",res.data)
              if (!res) {
                this.$message.error('登录失败，用户名或密码错误！');
              } else {

                this.$router.push("/sms")
              }
            })
          }
        });
      }else {
        alert("手机号格式不正确")
        return;
      }
    },
    register() {
      this.$router.push('/register');
    },
    alter() {
      this.$router.push('/alter');
    },

    captcha() {
      //点击验证码更新事件
      this.axios.get('http://localhost:9091/captchas/captcha').then(res=>{
        console.log("返回的数据为："+res.data.data.image)
        this.vcUrl = res.data.data.image
        console.log("返回的数据为："+res.data.code)
      });
    },
  },//methods结束

  created(){
    //页面刷新自动生成验证码
    this.axios.get('http://localhost:9091/captchas/captcha').then(res=>{
      console.log("返回的数据为："+res.data.data.image)
      this.vcUrl = res.data.data.image
      console.log("返回的数据为："+res.data.code)
    });
  }

}
</script>

<style>
/*系统登录边框样式*/
.loginContainer {
  border-right: 15px;
  background-clip: padding-box;
  margin: 200px;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.loginContainer:hover {
  box-shadow: -12px 12px 2px -1px rgba(0, 0, 255, .2);
}

/*“系统登录”字体样式*/
.loginTitle {
  margin: 20px auto 15px auto;
  text-align: left;
}

.el-form-item__content {
  display: flex;
  align-items: center;
}

</style>
