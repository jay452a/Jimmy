<template>
	<div id="list">
	   <ul class="left">
	    <h3>需求支撑</h3>
	      <li v-bind:class="classObject1"v-on:click="changeActive"><span></span><router-link to="/list/needList">需求列表</router-link></li>
	    <h3>方案中心</h3>
	      <li v-bind:class="classObject2"v-on:click="changeActive"><span></span><router-link to="/list/soluList">方案列表</router-link></li>
	   </ul>
	   <div class="right">
		   	<p>{{message}}</p>
		   <keep-alive include="list1,list2,edit">
			   <router-view></router-view>
		   </keep-alive>

	   </div>
	</div>
	
</template>
<script>
	 export default {
         data () {
            return {
                message:"需求列表",
                classObject1:{
                	active:"true"
                },
                classObject2:{
                	active:""
                }
                
            }
        },
        methods:{
        	changeActive:function(){
        		const href=window.location.href
        		if(href.indexOf("/list/needList")>-1){
        			this.classObject1.active=true
        			this.classObject2.active=false
        			this.message="需求列表"
        		}else if(href.indexOf("/list/soluList")>-1){
        			this.classObject1.active=false
        			this.classObject2.active=true
        			this.message="方案列表"
        		}
        	}
        }
        
        
    }
</script>
<style type="text/css" scoped>
	.right{float: right;}
	.right{width: 999px;height: 100%;}
	#list .right p{padding: 5px;background: #F3F3F3;border-bottom: 1px solid #DCDCDC;}
	#list{width: 100%;height: 100%;min-height: 500px;}
	#list .left h3{
		text-align: center;
		font-size: 14px;
		font-weight: 100;
	}
	#list .left{width: 150px;border-right: 1px solid #DCDCDC;display: inline-block;height: 100%;min-height: 500px;padding-top: 15px;}
	#list .left li{margin: 10px 0;text-align: center;}
	#list .left li.active{border-left: 2px solid #f67a18;}
	#list .left li.active a{color: #f67a18;}
	#list .left li span{width: 6px;height: 6px;display: inline-block;border-radius: 50%;background: #DCDCDC;margin-right: 10px;}
</style>