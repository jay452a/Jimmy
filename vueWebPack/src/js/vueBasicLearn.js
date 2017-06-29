var data={
	a:"属性",
	message:"纯文本",
	number:1,
	rawHtml:"<p>这是插入HTML</p>",//不能再插入的html中使用{{}}绑定数据
	url:"http://www.baidu.com",
	isActive:false,
	activeClass:"active",
	errorClass:"error",
	styleObject:{
		color:"red",
		fontSize:"20px"
	},
	baseStyles:{
		color:"red",
		fontSize:"20px"
	},
	overridingStyles:{
		textDecoration:"underline",
	},
	isShow:false,
	lists:[
	  {name:"jimmy",sex:"boy"},{name:"lisa",sex:"girl"},{name:"bob",sex:"boy"}
	],
	count:0,
	inputMessage:"",
	MultilineMessage:"",
	picked:"One",
	checkedNames:["Jack"],
	selected:"2"
    
}
//组件实例
Vue.component('my-component', {
  template: '<div>A custom component!</div>'
})
//局部注册
var loading={
	 template: '<div>{{loading}}...</div>',
	 data:function(){
	 	return{
	 		loading:'正在加载'
	 	}
	 }
}
//非父子间通信
var hub=new Vue()
var list={
	template:"<ul><li v-on:click='getText'>{{text}}</li></ul>",
	props:{
		text:{
			type:String,
			default:"this is a list"
		}
	},
	methods:{
		getText:function(){
			this.$emit('click')
			hub.$emit("click",this.text)
		}
	}
}

var one={
	template:"<button>get{{message}}</button>",
	data:function(){
		return {
			message:""
		}
	},
	mounted:function(){
		var _this=this
		hub.$on("click",function(val){
			console.log(val)
			_this.message=val
		})
	}
}

var Vue=new Vue({
	el:"#app",
	data:data,
	filters:{
		slice:function(value){
			return value.substring(0,1)
		}
	},
	computed:{
		revMessage:function(){
			return this.message.split('').reverse().join('')
		}
	},
	methods:{
		counter:function(event){
			this.count++
			alert(event.target.tagName)
		},
		getText:function(val){
			alert(val)
		}
	},
	components:{
		"loading":loading,
		'my-list':list,
		"my-one":one
	}
})
console.log(Vue)
Vue.$watch('a', function (newVal, oldVal) {
 console.log(newVal,oldVal)
})
Vue.a="修改属性"
