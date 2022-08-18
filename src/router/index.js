import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StatisticsView from '../views/statistics/StatisticsView'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: HomeView,
        children: [
            {
                path: '',
                name: '首页',
                component: StatisticsView,
                meta: {
                    isLogin: true
                }
            },
            {
                path: 'goods',
                name:'商品列表',
                component: () => import('../views/good/GoodsListView.vue'),
                meta: {
                    title: '商品列表',

                }
            },
            {
                path: 'category',
                name:'商品分类',
                component: () => import('../views/category/CategoryListView'),
                meta: {
                    title: '商品分类',

                }
            },
            {
                path: 'goodsBad',
                name:'商品报损',
                component: () => import('../views/good/GoodsBadListView'),
                meta: {
                    title: '商品报损',

                }
            },
            {
                path: 'goodsMax',
                name:'商品报溢',
                component: () => import('../views/good/GoodsMaxListView'),
                meta: {
                    title: '商品报溢',

                }
            },
            {
                path: 'admin1',
                name:'用户管理',
                component: () => import('../views/admin/AdminListView'),
                meta: {
                    title: '用户管理',

                }
            },
            {
                path: 'admins',
                name:'员工管理',
                component: () => import('../views/admin/AdminsListView'),
                meta: {
                    title: '员工管理',

                }
            },
            {
                path: 'role',
                name:'角色权限管理',
                component: () => import('../views/role/RoleListView'),
                meta: {
                    title: '角色权限管理',

                }
            },
            {
                path: 'admin2',
                name:'角色管理',
                component: () => import('../views/admin/AdminsListView'),
                meta: {
                    title: '角色管理',

                }
            },
            {
                path: 'supplier',
                name:'供货商管理',
                component: () => import('../views/supplier/SupplierListView'),
                meta: {
                    title: '供货商管理',

                }
            },
            {
                path: 'member',
                name:'会员管理',
                component: () => import('../views/member/MemberListView'),
                meta: {
                    title: '会员管理',

                }
            },

            {
                path: 'purchase',
                name:'进货入库',
                component: () => import('../views/purchase/PurchaseListView'),
                meta: {
                    title: '进货入库',

                }
            },
            {
                path: 'refundPurchase',
                name:'退货出库',
                component: () => import('../views/purchase/RefundPurchaseListView'),
                meta: {
                    title: '退货出库',

                }
            },
            {
                path: 'salePurchase',
                name:'销售出库',
                component: () => import('../views/purchase/SalePurchaseListView'),
                meta: {
                    title: '销售出库',

                }
            },
            {
                path: 'statistice',
                name:'首页',
                component: () => import('../views/statistics/StatisticsView'),
                meta: {
                    title: '欢迎使用后台管理系统',

                }
            },
            {
                path: 'menu',
                name:'统计报表分析',
                component: () => import('../views/admin/MenuView'),
                meta: {
                    title: '统计报表分析',

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
