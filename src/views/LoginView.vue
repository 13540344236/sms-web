<!--登录页面-->
<template>
  <div id="logo">
    <el-form :rules="rules" ref="loginForm" :model="loinForm" class="loginContainer" style="background-color: rgb(255, 255, 255)">
      <h3 class="loginTitle" style="color:black;" >欢迎登录全民超市运营管理平台</h3>
      <!--      账号-->
      <el-form-item prop="username">
        <el-input prefix-icon="el-icon-user" type="text" auto-complete="false" v-model="loinForm.username"
                  placeholder="请输手机号"></el-input>
      </el-form-item>
      <!--      密码-->
      <el-form-item prop="password">
        <el-input prefix-icon="el-icon-lock" type="password" auto-complete="false" v-model="loinForm.password"
                  placeholder="请输入密码"></el-input>
      </el-form-item>
      <div >
        <el-col :span="12">
          <el-form-item prop="code" class="code">
            <el-input type="text" auto-complete="false" v-model="loinForm.code" placeholder="点击图片更换验证码"
                      @keydown.enter.native="submitLogin" style="width:166px;margin-right: 10px "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <img :src="vcUrl"  @click="captcha" width="120px" height="40px" alt=""/>
        </el-col>
      </div>

      <el-col>
        <div>
          <el-button type="text" @click="alter" style="display: inline-block">忘记密码</el-button>
        </div>
      </el-col>



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

export default {
  name: "Login",
  name1: "logo",
  data() {

    return {
      vcUrl: '',
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
    submitLogin(url, config) {
      //判断手机号是否合法
      const regMobile = /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if (regMobile.test(this.loinForm.username)) {
        // 获取验证码
        this.axios.get('http://localhost:9091/captchas/captcha').then(function (resp){
          let verKey = resp.data.key;
          console.log("asas:",verKey)
        },)
        // let code={'code':this.loinForm.code,}
        // this.axios.post('http://localhost:9091/captchas/verification',{verKey:verKey,verCode:code},function (data){
              // if (data){
              //   this.$message.error("验证码错误请重新输入")
              // } else {
                //用户名密码判断
                this.$refs['loginForm'].validate((valid) => {
                  if (valid) {  // 表单校验合法
                    let url = 'http://localhost:9091/logins/login';
                    console.log('url >>> ' + url);
                    let data = {
                      'username': this.loinForm.username,
                      'password': this.loinForm.password
                    };
                    console.log('data >>> ');
                    console.log(data);
                    this.axios.post(url,data).then(res => {
                      console.log("res:  ",res)
                      console.log("res为", res.data)
                      if (res.data === false) {
                        this.$message.error('登录失败，用户名或密码错误！');
                      } else {
                        this.$router.push("/")
                      }
                    })
                  }
                });
            //   }
            // })
      } else {
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
      this.axios.get('http://localhost:9091/captchas/captcha').then(res => {
        console.log("返回的数据为1：" + res.data.data.image)
        this.vcUrl = res.data.data.image
        console.log("返回的数据为2：" + res.data.code)
      });
    },
  },//methods结束

  created() {
    //页面刷新自动生成验证码
    this.axios.get('http://localhost:9091/captchas/captcha').then(res => {
      console.log("返回的数据为3：" + res.data.data.image)
      this.vcUrl = res.data.data.image
      console.log("返回的数据为4：" + res.data.code)
    });
  }

}
</script>

<style scoped>
/*系统登录边框样式*/
.loginContainer {
  border-right: 50px;
  background-clip: padding-box;
  margin:  10% 60%;
  height: 470px;
  width: 420px;
  padding: 10px 30px 10px 30px;
  background: rgba(255, 0, 0, 0);
  box-shadow: 0 0 25px #cac6c6;
}

.loginContainer:hover {
  box-shadow: -12px 12px 2px -1px rgba(255, 255, 255, .50);
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

#logo {
  background-image:  url("../assets/img.jpg");
  background-size: 100% 100%;
  height: 100%;
  position: fixed;
  width: 100%;
}

</style>
