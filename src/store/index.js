//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
import Vuex from 'vuex'
import loginModule from './Module/loginModule'

Vue.use(Vuex);


//创建store
const store = new Vuex.Store({
    actions:{
    },
    mutations:{
    },
    state:{
    },
    modules:{
        loginModule
    }
})

export default store