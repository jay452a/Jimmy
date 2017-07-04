import MyLoading from "./components/loading.vue"
import MyTree from "./components/tree.vue"
import myTreeTwo from "./components/treeTwo.vue"
import "./JM-ui.less"
// 这里是重点
const JM_ui = {
    install: function(Vue){//Vue.use()会执行install方法
        Vue.component('jm-loading',MyLoading)
        Vue.component('jm-tree',MyTree)
        Vue.component('jm-treeTwo',myTreeTwo)
    }
}

// 导出组件
export default JM_ui