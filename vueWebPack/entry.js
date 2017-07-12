import Vue from "vue/dist/vue.js";
import VueRouter from "vue-router";
import list from "./components/list.vue"
import list1 from "./components/needList.vue"
import edit from "./components/edit.vue"
import list2 from "./components/solutionList.vue"
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './src/style/public.css'
import "./src/style/demo.less"
import JM from "./components/JM-ui"
import Vuex from "vuex"
import store from "./vuex/store"
Vue.config.debug = true;//开启错误提示

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.use(JM)
Vue.use(Vuex)


const router = new VueRouter({
    routes: [
	    {
	    	path: '/',
	    	component: list,
	    	children:[
	    	        { path: '/', component: list1},
                    { path: '/list/needList', component: list1},
                    { path: '/list/edit', component: edit},
                    { path: '/list/soluList', component: list2}
                   ]
	    }
    ]
});

const vm=new Vue({
    store,
	el:"#app",
	router: router,

});

