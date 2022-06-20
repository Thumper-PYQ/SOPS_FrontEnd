import router from './index';
import store from '../store/index'

// 全局前置守卫：初始化时候执行，每次路由切换前执行
router.beforeEach((to, from, next) => {
    if (to.matched.some(ele => ele.meta.isAuth)) {
        let token = store.state.loginModule.userinfo.token;
        if (token) {      //权限控制的具体规则
            next()        //放行
        } else {
            next('/login')
        }
    } else {
        next()   //放行
    }
})


// 全局后置守卫：初始化时执行，每次路由切换后执行
// router.afterEach((to,from)=>{
//   if(to.meta.title){
//     document.title=to.meta.title   //修改网页的title
//   }else{
//     document.title='vue_test'
//   }
// })