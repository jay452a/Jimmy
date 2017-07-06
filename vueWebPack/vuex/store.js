/**
 * Created by lenovo on 2017/7/6.
 * this is state manage
 */


import Vue from "vue/dist/vue.js";
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        author: 'Wise Wrong'
    }
})

export default store