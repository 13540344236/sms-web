<template>
  <div>
    <!--  整个页面的外层标签  -->
    <el-container>
      <!--   整个页面的上半部分，即顶栏部分   -->
      <el-header class="layout-header">
        <h2 style="margin: 15px">聚贤庄超市后台管理系统</h2>
      </el-header>
      <!--   整个页面的下半部分，是一个容器   -->
      <el-container class="layout-body">
        <!--下半部分的左侧，即左边栏，将显示菜单-->
        <el-aside class="layout-aside">
          <!--el-menu是整个菜单-->
          <!--在el-menu中补充router属性（不写属性值即表示true），即可将各菜单项的index作为URL进行跳转-->
          <!--default-active用于配置默认激活的菜单项的URL（配置为URL时需结合router一起使用）-->
          <el-menu
              router
              :default-active="this.$router.currentRoute.path"
              class="el-menu-vertical-demo">
            <!--el-submenu是允许包含子级的菜单，但此标签本身并不是菜单项-->

            <el-submenu index="1">
              <!--在el-submenu下的template用于配置包含子菜单的父级项-->
              <!--例如：在“用户管理”下有“用户列表”和“添加用户”，此处使用template配置的就是“用户管理”-->
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>系统管理</span>
              </template>
              <!-- el-menu-item表示菜单项 -->
              <el-menu-item index="/sms/admin/list">
                <i class="el-icon-user-solid"></i>
                <span>用户管理</span>
              </el-menu-item>

              <el-menu-item index="/sms/role/list">
                <i class="el-icon-user"></i>
                <span>角色管理</span>
              </el-menu-item>

            </el-submenu>



            <el-submenu index="2">
              <!--在el-submenu下的template用于配置包含子菜单的父级项-->
              <!--例如：在“用户管理”下有“用户列表”和“添加用户”，此处使用template配置的就是“用户管理”-->
              <template slot="title">
                <i class="el-icon-user-solid"></i>
                <span>人员管理</span>
              </template>
              <!-- el-menu-item表示菜单项 -->
              <el-menu-item index="/sms/admins/list">
                <i class="el-icon-user"></i>
                <span>员工管理</span>
              </el-menu-item>

              <el-menu-item index="/sms/supplier/list">
                <i class="el-icon-house"></i>
                <span>供应商管理</span>
              </el-menu-item>


              <el-menu-item index="/sms/member/list">
                <i class="el-icon-s-goods"></i>
                <span>会员管理</span>
              </el-menu-item>

            </el-submenu>


            <el-submenu index="3">
              <!--在el-submenu下的template用于配置包含子菜单的父级项-->
              <!--例如：在“用户管理”下有“用户列表”和“添加用户”，此处使用template配置的就是“用户管理”-->
              <template slot="title">
                <i class="el-icon-s-shop"></i>
                <span>商品管理</span>
              </template>
              <!-- el-menu-item表示菜单项 -->
              <el-menu-item index="/sms/goods/list">
                <i class="el-icon-s-goods"></i>
                <span>商品列表</span>
              </el-menu-item>
              <el-menu-item index="/sms/category/list">
                <i class="el-icon-goods"></i>
                <span>商品分类</span>
              </el-menu-item>
              <el-menu-item index="/sms/goodsBad/list">
                <i class="el-icon-s-goods"></i>
                <span>商品报损</span>
              </el-menu-item>
              <el-menu-item index="/sms/goodsMax/list">
                <i class="el-icon-goods"></i>
                <span>商品报溢</span>
              </el-menu-item>

              
            </el-submenu>


            <el-submenu index="4">
              <!-- 在el-submenu下的template用于配置包含子菜单的父级项 -->
              <!-- 例如：在“用户管理”下有“用户列表”和“添加用户”，此处使用template配置的就是“用户管理” -->
              <template slot="title">
                <i class="el-icon-house"></i>
                <span>库存管理</span>
              </template>
              <!-- el-menu-item表示菜单项 -->
              <el-menu-item index="/sms/purchase/list">
                <i class="el-icon-circle-plus"></i>
                <span>进货库存</span>
              </el-menu-item>
              <el-menu-item index="/sms/refundPurchase/list">
                <i class="el-icon-remove"></i>
                <span>退货出库</span>
              </el-menu-item>
              <el-menu-item index="/sms/salePurchase/list">
                <i class="el-icon-remove-outline"></i>
                <span>销售出库</span>
              </el-menu-item>

            </el-submenu>


            <el-submenu index="5">
              <!-- 在el-submenu下的template用于配置包含子菜单的父级项 -->
              <!-- 例如：在“用户管理”下有“用户列表”和“添加用户”，此处使用template配置的就是“用户管理” -->
              <template slot="title">
                <i class="el-icon-tickets"></i>
                <span>统计报表分析</span>
              </template>
              <!-- el-menu-item表示菜单项 -->
              <el-menu-item index="/sms/statistice">
                <i class="el-icon-tickets"></i>
                <span>统计报表分析</span>
              </el-menu-item>
            </el-submenu>


          </el-menu>

        </el-aside>
        <!-- 下半部分的右侧，即主体部分，将由router-view实现具体显示 -->
        <el-main>
          <!--将由router-view实现具体显示-->
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
* {
  margin: 0
}

.layout-header {
  background-color:#1284b4;

}


.layout-body {
  position: absolute;
  top: 60px;
  bottom: 0;
  left: 0;
  right: 0
}

.layout-aside {
  background-color:#70c0ec;
}
</style>
<script>
export default {
  methods: {
    logout() {
      // 清空LocalStorage中的数据
      localStorage.clear();
      // 跳转回主页
      this.$router.push('/');
    }
  }
}
</script>

