import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/index.vue'
import Layout from '../views/Layout/index.vue'
import WmuLayout from '../views/WmuLayout/index.vue'
import PuLayout from '../views/PuLayout/index.vue'

//异步
const Home =() =>import('../views/Contents/Home/Home.vue')
const Goods = ()=>import('../views/Contents/Goods/Goods.vue')
const PickGoods= ()=>import('../views/Contents/Goods/PickGoods.vue')
const Provide = ()=>import('../views/Contents/Provide/Provide.vue')
const Warehouse = ()=>import('../views/Contents/Warehouse/Warehouse.vue')
const Shelve = ()=>import('../views/Contents/Shelve/Shelve.vue')
const pickShelve = ()=>import('../views/Contents/Shelve/PickShelve.vue')
const User = ()=>import('../views/Contents/User/User.vue')
const totalOrder = ()=>import('../views/Contents/Order/TotalOrder.vue')
const areaOrder = ()=>import('../views/Contents/Order/AreaOrder.vue')
const PickOrder = ()=>import('../views/Contents/Order/PickOrder.vue')
const Wmu = ()=>import('../views/Contents/User/Wmu.vue')
const Pu = ()=>import('../views/Contents/User/Pu.vue')
const suUser = ()=>import('../views/Contents/User/WmuDemo.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    meta:{title:'主页',isAuth:true},
    children:[
      {
        path:'home',
        name:'home',
        component:Home,
        meta:{},
      },
      {
        path:'goods',
        name:'goods',
        component:Goods,
        meta:{},
      },
      {
        path:'provide',
        name:'provide',
        component:Provide,
        meta:{},
      },
      {
        path:'warehouse',
        name:'warehouse',
        component:Warehouse,
        meta:{},
      },
      {
        path:'shelve',
        name:'shelve',
        component:Shelve,
        meta:{},
      },
      {
        path:'order',
        name:'totalorder',
        component:totalOrder,
        meta:{},
      },
      {
        path:'wmuUser',
        name:'wmuuser',
        component:suUser,

      },
      {
        path:'user',
        name:'user',
        component:User,
        redirect:'/user/wmu',
        children:[
          {
            path:'wmu',
            name:'wmu',
            component:Wmu
          },
          {
            path:'pu',
            name:'pu',
            component:Pu
          }
        ]
      }
    ]
  },
  {
    path: '/wmu',
    component: WmuLayout,
    meta:{title:'主页',isAuth:true},
    children:[
      {
        path:'home',
        name:'wmuhome',
        component:Home,
        meta:{},
      },
      {
        path:'goods',
        name:'wmugoods',
        component:Goods,
        meta:{},
      },
      {
        path:'shelve',
        name:'wmushelve',
        component:Shelve,
        meta:{},
      },
      {
        path:'order',
        name:'wmuorder',
        component:areaOrder,
        meta:{},
      }
    ]
  },
  {
    path: '/pu',
    component: PuLayout,
    meta:{title:'主页',isAuth:true},
    children:[
      {
        path:'home',
        name:'puhome',
        component:Home,
        meta:{},
      },
      {
        path:'goods',
        name:'pugoods',
        component:PickGoods,
        meta:{},
      },
      {
        path:'shelve',
        name:'pushelve',
        component:pickShelve,
        meta:{},
      },
      {
        path:'order',
        name:'puorder',
        component:PickOrder,
        meta:{},
      }
    ]
  },
  {
    path:'/login',
    name:'login',
    component:Login
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})


export default router
