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
                name: '欢迎使用后台管理系统',
                component: StatisticsView,
            },
            {
                path: 'goods',
                name:'商品管理',
                component: () => import('../views/good/GoodsListView.vue'),
                meta: '商品列表',


            },
            {
                path: 'category',
                name:'商品管理',
                component: () => import('../views/category/CategoryListView'),
                meta: '商品分类',


            },
            {
                path: 'goodsBad',
                name:'商品管理',
                component: () => import('../views/good/GoodsBadListView'),
                meta: '商品报损',


            },
            {
                path: 'goodsMax',
                name:'商品管理',
                component: () => import('../views/good/GoodsMaxListView'),
                meta: '商品报溢',

            },
            {
                path: 'admin1',
                name:'系统管理',
                component: () => import('../views/admin/AdminListView'),
                meta: '用户管理',

            },
            {
                path: 'admins',
                name:'人员管理',
                component: () => import('../views/admin/AdminsListView'),
                meta: '员工管理',

            },
            {
                path: 'role',
                name:'系统管理',
                component: () => import('../views/role/RoleListView'),
                meta: '角色管理',

            },
            {
                path: 'admin2',
                name:'员工信息',
                component: () => import('../views/admin/AdminsListView'),
                meta: '角色管理',


            },
            {
                path: 'supplier',
                name:'人员管理',
                component: () => import('../views/supplier/SupplierListView'),
                meta: '供货商管理',


            },
            {
                path: 'member',
                name:'人员管理',
                component: () => import('../views/member/MemberListView'),
                meta: '会员管理',

            },

            {
                path: 'purchase',
                name:'库存管理',
                component: () => import('../views/purchase/PurchaseListView'),
                meta: '进货入库',

            },
            {
                path: 'refundPurchase',
                name:'库存管理',
                component: () => import('../views/purchase/RefundPurchaseListView'),
                meta: '退货出库',


            },
            {
                path: 'salePurchase',
                name:'库存管理',
                component: () => import('../views/purchase/SalePurchaseListView'),
                meta: '销售出库',

            },
            {
                path: 'statistice',
                name:'欢迎使用后台管理系统',
                component: () => import('../views/statistics/StatisticsView'),
                meta: '欢迎使用后台管理系统',
            },
            {
                path: 'menu',
                name:'系统管理',
                component: () => import('../views/admin/MenuView'),
                meta: '菜单管理',

                }
            },
            {
                path: 'log',
                name:'登录日志',
                component: () => import('../views/admin/LogListView.vue'),
                meta: {
                    title: '登录日志',


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
