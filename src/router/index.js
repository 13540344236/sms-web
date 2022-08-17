import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatisticsView from '../views/statistics/StatisticsView'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        children: [
            {
                path: '',
                name: 'statistics',
                component: StatisticsView,
                meta: {
                    isLogin: true
                }
            },
            {
                path: 'goods',
                component: () => import('../views/good/GoodsListView.vue'),
                meta: {
                    title: '超市库存管理平台 -- 商品列表',

                }
            },
            {
                path: 'category',
                component: () => import('../views/category/CategoryListView'),
                meta: {
                    title: '超市库存管理平台 -- 商品分类',

                }
            },
            {
                path: 'goodsBad',
                component: () => import('../views/good/GoodsBadListView'),
                meta: {
                    title: '超市库存管理平台 -- 商品报损',

                }
            },
            {
                path: 'goodsMax',
                component: () => import('../views/good/GoodsMaxListView'),
                meta: {
                    title: '超市库存管理平台 -- 商品报溢',

                }
            },
            {
                path: 'admin1',
                component: () => import('../views/admin/AdminListView'),
                meta: {
                    title: '超市库存管理平台 -- 用户管理',

                }
            },
            {
                path: 'admins',
                component: () => import('../views/admin/AdminsListView'),
                meta: {
                    title: '超市库存管理平台 -- 员工管理',

                }
            },
            {
                path: 'role',
                component: () => import('../views/role/RoleListView'),
                meta: {
                    title: '超市库存管理平台 -- 角色权限管理',

                }
            },
            {
                path: 'admin2',
                component: () => import('../views/admin/AdminsListView'),
                meta: {
                    title: '超市库存管理平台 -- 角色管理',

                }
            },
            {
                path: 'supplier',
                component: () => import('../views/supplier/SupplierListView'),
                meta: {
                    title: '超市库存管理平台 -- 供货商管理',

                }
            },
            {
                path: 'member',
                component: () => import('../views/member/MemberListView'),
                meta: {
                    title: '超市库存管理平台 -- 会员管理',

                }
            },

            {
                path: 'purchase',
                component: () => import('../views/purchase/PurchaseListView'),
                meta: {
                    title: '超市库存管理平台 -- 进货入库',

                }
            },
            {
                path: 'refundPurchase',
                component: () => import('../views/purchase/RefundPurchaseListView'),
                meta: {
                    title: '超市库存管理平台 -- 退货出库',

                }
            },
            {
                path: 'salePurchase',
                component: () => import('../views/purchase/SalePurchaseListView'),
                meta: {
                    title: '超市库存管理平台 -- 销售出库',

                }
            },
            {
                path: 'statistice',
                component: () => import('../views/statistics/StatisticsView'),
                meta: {
                    title: '超市库存管理平台 -- 统计报表分析',

                }
            },
            {
                path: 'menu',
                component: () => import('../views/admin/MenuView'),
                meta: {
                    title: '超市库存管理平台 -- 统计报表分析',

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
        path: '/register',//注册
        name: 'register',
        component: () => import(/* webpackChunkName: "about" */ '../views/RegisterView')
    },
    {
        path: '/alter',//找回密码
        name: 'alter',
        component: () => import(/* webpackChunkName: "about" */ '../views/AlterView')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
//路由守卫
// router.beforeEach((to, from, next) => {
//     // 1.如果访问的是登录页面（无需权限），直接放行
//     if (to.path === '/login' || to.path === '/register' || to.path === '/alter') return next()
//     // 2.如果访问的是有登录权限的页面，先要获取token
//     const tokenStr = window.sessionStorage.getItem('token')
//     // 2.1如果token为空，强制跳转到登录页面；否则，直接放行
//     if (!tokenStr) {
//         return next('/login')
//     }
//     next()
// })