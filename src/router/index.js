import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/sms', //配置统一前缀
    name: 'home',
    component: HomeView,
    redirect: '/sms/goods/list',
    children:[
      {
        path:'goods/list',
        component: () => import('../views/good/GoodsListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 商品列表'
        }
      },
      {
        path:'category/list',
        component: () => import('../views/category/CategoryListView'),
        meta: {
          title: '超市库存管理平台 -- 商品分类'
        }
      },
      {
        path:'goodsBad/list',
        component: () => import('../views/good/GoodsBadListView'),
        meta: {
          title: '超市库存管理平台 -- 商品报损'
        }
      },
      {
        path:'goodsMax/list',
        component: () => import('../views/good/GoodsMaxListView'),
        meta: {
          title: '超市库存管理平台 -- 商品报溢'
        }
      },
      {
        path:'admin/list',
        component: () => import('../views/admin/AdminListView'),
        meta: {
          title: '超市库存管理平台 -- 用户管理'
        }
      },
      {
        path:'admins/list',
        component: () => import('../views/admin/AdminsListView'),
        meta: {
          title: '超市库存管理平台 -- 员工管理'
        }
      },
      {
        path:'role/list',
        component: () => import('../views/role/RoleListView'),
        meta: {
          title: '超市库存管理平台 -- 角色权限管理'
        }
      },
      {
        path:'admin/list',
        component: () => import('../views/admin/AdminsListView'),
        meta: {
          title: '超市库存管理平台 -- 角色管理'
        }
      },
      {
        path:'supplier/list',
        component: () => import('../views/supplier/SupplierListView'),
        meta: {
          title: '超市库存管理平台 -- 供货商管理'
        }
      },
      {
        path:'member/list',
        component: () => import('../views/member/MemberListView'),
        meta: {
          title: '超市库存管理平台 -- 会员管理'
        }
      },

      {
        path:'purchase/list',
        component: () => import('../views/purchase/PurchaseListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 进货入库'
        }
      },
      {
        path:'refundPurchase/list',
        component: () => import('../views/purchase/RefundPurchaseListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 退货出库'
        }
      },
      {
        path:'salePurchase/list',
        component: () => import('../views/purchase/SalePurchaseListView.vue'),
        meta: {
          title: '超市库存管理平台 -- 销售出库'
        }
      },
      {
        path:'statistice',
        component: () => import('../views/statistics/StatisticsView'),
        meta: {
          title: '超市库存管理平台 -- 统计报表分析'
        }
      },


    ]
  }
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
