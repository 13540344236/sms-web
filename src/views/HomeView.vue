<!--主页-->
<template>
  <el-container>
    <el-header>
      <div style="height: 60px;line-height: 70px;text-align: left;border-bottom:1px solid #B7B7B7;">
        <img src="../assets/logo.png" alt="" style="width: 190px; position: relative;top:8px">
        <b style="color:black;position: relative;top:-10px ;" class="font" >【运营管理平台】</b>
        <el-dropdown style="width: 100px;cursor: pointer;float: right;font-size: 15px">
          <div>
            <span slot="">陈鑫</span>
            <i class="el-icon-arrow-down" style="margin-left: 5px "></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item><span style="text-decoration: none" @click="logout">退出登录</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </el-header>
    <el-container style="height:100vh; ">
      <el-aside :width="sideWidth+'px'" style="background-color: rgb(238, 241, 246)" height="100%">
        <el-menu style="height: 100%; overflow-x:hidden"
                 background-color="rgb(48,65,84)"
                 text-color="rgb(191,203,217)"
                 active-text-color="#fff"
                 :collapse-transition="false"
                 :collapse="isCollapse"
                 @select="handleSelect"
                 router>

          <el-menu-item index="/statistice">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-s-platform "></i>
              <span slot="title">系统管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admin1">用户管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/log">日志记录</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-user-solid"></i>
              <span slot="title">人员管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/admins">员工管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/supplier">供应商管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-s-shop"></i>
              <span slot="title">商品管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/goods">商品列表</el-menu-item>
              <el-menu-item index="/category">商品分类</el-menu-item>
              <el-menu-item index="/goodsBad">商品报损</el-menu-item>
              <el-menu-item index="/goodsMax">商品报溢</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-s-home"></i>
              <span slot="title">库存管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/purchase">进货入库</el-menu-item>
              <el-menu-item index="/refundPurchase">退货出库</el-menu-item>
              <el-menu-item index="/salePurchase">销售出库</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header style="font-size: 15px;  line-height: 70px; display:flex ">
            <div style="  flex: 1px;font-size: 28px;">
              <el-col :span="1">
                <span :class="collapseBtnClass" style="cursor: pointer;" @click="collapse"></span>
              </el-col>

<!--面包屑-->
             <el-col :span="20">
               <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 15px;  line-height: 70px; display:flex ">
                 <el-breadcrumb-item v-for="item in breadList" :key="item.path" :to="item.path">{{ item.meta.title }}</el-breadcrumb-item>
               </el-breadcrumb>
             </el-col>

            </div>
        </el-header>



        <el-main>
          <router-view/>
        </el-main>

      </el-container>
    </el-container>
  </el-container>
</template>


<script>
export default {
  name: 'Home',
  computed:{
    breadList(){
      return this.$route.matched
    }
  },
  mounted() {
    this.$route.fullPath.split('/')
  },

  data() {
    const item = {};
    return {
      tableData: Array(10).fill(item),
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 210,

    }
  },

  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 60
        this.collapseBtnClass = 'el-icon-s-unfold'
      } else {
        this.sideWidth = 210
        this.collapseBtnClass = 'el-icon-s-fold'
      }
    },
    logout() {
      this.$router.push('/login');
      this.$message.success("退出成功")
    },


  },

}
</script>
<style>
.font {
  font-family: "PingFang SC", sans-serif;
}
</style>