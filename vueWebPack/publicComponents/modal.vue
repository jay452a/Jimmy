<template>
	<div id="modal">
		<div class="container">
			<header>{{header}}</header>
			<section>
				<p>确认{{header}}?</p>
				<el-input-number v-model="num1" @change="handleChange" :min="1" :max="10"></el-input-number>
			    <el-progress :percentage="100" status="success"></el-progress>
			</section>
			<footer>
				<el-button type="primary">主要按钮</el-button>
				<el-button type="text">文字按钮</el-button>
			</footer>
		</div>
		
		<div class="cover"></div>
	</div>
</template>

<script type="text/javascript">
	
	export default{
		data(){
			return {
				header:"删除",
				dataid:'1',
				num1:1
			}
		},
		methods:{
			sure:function(){
				let id=this.dataid
				console.log(id)
			},
			cancel:function(){
				document.getElementById("modal").style.display="none"
			},
			handleChange:function(){
				alert(this.num1)
			}
		}
	}
</script>

<style type="text/css">
	.cover{width: 100%;height: 100%;position: fixed;left: 0;top: 0;z-index: 99;background: black;opacity: 0.5;}
	.container{width: 400px;height: 250px;position: fixed;z-index: 100;left: 50%;top: 50%;margin-left: -200px;margin-top: -125px;background: white;border: 1px solid #DCDCDC;border-radius: 4px;}
</style>