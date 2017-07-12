/**
 * Created by lenovo on 2017/7/6.
 * this is state manage
 */


import Vue from "vue/dist/vue.js";
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleA={
    state: {
        count: 10
    },
    mutations: {
        increment (state, n) {
            state.count += n
        }
    },
    getters:{
        docount:state => state.count+10
    },
    actions: {
        increment (context) {
            setTimeout(()=>{
                context.commit('increment',10)
            },1000)
        }
    }
}




const store = new Vuex.Store({
    modules: {
        a: moduleA,

    }
})

export default store