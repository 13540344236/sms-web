// 路由权限
import router from "./index"

// router.beforeEach((to,from,next)=>{
//
//     //判断登录状态
//     if (to.meta.isLogin){
//         let token=false;
//         if (token){
//             next();
//         }else {
//             next({
//                 name:"Login"
//             });
//         }
//     }else {
//         next();
//     }
// })