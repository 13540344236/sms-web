import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sms',
    name: 'home',
    component: HomeView,
    redirect: '/sms/goods/list',//以下配置重定向的效果：一旦访问 / 路径，就会自动跳转到 /user/list 路径
    children:[
      {
        path:'goods/list',
        component: () => import('../views/good/GoodsListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 商品列表',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'category/list',
        component: () => import('../views/category/CategoryListView'),
        meta: {
          title: '超市库存管理平台 -- 商品分类',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'goodsBad/list',
        component: () => import('../views/good/GoodsBadListView'),
        meta: {
          title: '超市库存管理平台 -- 商品报损',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'goodsMax/list',
        component: () => import('../views/good/GoodsMaxListView'),
        meta: {
          title: '超市库存管理平台 -- 商品报溢',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'admin/list',
        component: () => import('../views/admin/AdminListView'),
        meta: {
          title: '超市库存管理平台 -- 用户管理',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'admins/list',
        component: () => import('../views/admin/AdminsListView'),
        meta: {
          title: '超市库存管理平台 -- 员工管理',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'role/list',
        component: () => import('../views/role/RoleListView'),
        meta: {
          title: '超市库存管理平台 -- 角色权限管理',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'admin/list',
        component: () => import('../views/admin/AdminsListView'),
        meta: {
          title: '超市库存管理平台 -- 角色管理',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'supplier/list',
        component: () => import('../views/supplier/SupplierListView'),
        meta: {
          title: '超市库存管理平台 -- 供货商管理',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'member/list',
        component: () => import('../views/member/MemberListView'),
        meta: {
          title: '超市库存管理平台 -- 会员管理',
          //路由权限
          isLogin:true
        }
      },

      {
        path:'purchase/list',
        component: () => import('../views/purchase/PurchaseListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 进货入库',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'refundPurchase/list',
        component: () => import('../views/purchase/RefundPurchaseListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 退货出库',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'salePurchase/list',
        component: () => import('../views/purchase/SalePurchaseListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 销售出库',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'statistice',
        component: () => import('../views/statistics/StatisticsView'),
        meta: {
          title: '超市库存管理平台 -- 统计报表分析',
          //路由权限
          isLogin:true
        }
      },
      {
        path:'menu/list',
        component: () => import('../views/admin/MenuView'),
        meta: {
          title: '超市库存管理平台 -- 菜单管理',
          //路由权限
          isLogin:true
        }
      },
    ]
  },
  {
    path: '/login',//登录
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView')
  },
  {
    path: '/Register',//注册
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView')
  },
  {
    path: '/alter',//找回密码
    name: 'alter',
    component: () => import(/* webpackChunkName: "about" */ '../views/AlterView')
  },
  {
    path: '/loginTest',//找回密码
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginTestView')
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to,from,next) => {
  if (to.meta.title){
    document.title = to.meta.title;
  }
  next()
})
export default router
