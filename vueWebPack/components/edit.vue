<template>
	<div>
		<div id="show">显示隐藏对transition的影响</div>
		<button @click="isShow">显示</button>
		<button @click="hide">隐藏</button>

		<div class="bfc">
			<li>1</li>
			<li>2</li>
			<li>3</li>
			<li>4</li>
            <p>111</p>
		</div>

		<div class="bfc2">
			<p>呵呵哒1</p>
			<div class="wrap">
				<span>呵呵哒2</span>
				<span class="JM-loading">呵呵哒3</span>
			</div>

		</div>


	</div>

</template>
<script>
	export default{
		data(){
		    return{

			}
		},
        methods:{
            isShow(){
                var dom=document.getElementById("show")
                dom.style.display="block"
				setTimeout(function () {
                    dom.className="show"
                },100)
                var a=null
				console.log(typeof a)
			},
            hide(){
                var dom=document.getElementById("show")
                dom.removeAttribute("class")
				setTimeout(function () {
                    dom.style.display="none"
                },1000)

			}
		}
	}
</script>
<style>
	#show{transition: all 1s;opacity: 0;display: none}
	.show{opacity: 1 !important;}
	.bfc {
		background: red;
		border: 1px solid #dcdcdc;
		/*float: left;*/
		overflow:auto /*只要该属性不为visible,形成BFC*/
	}
	.bfc li{float: left;margin: 5px}
	.bfc p{margin: 6px;}

	/*同一个bfc内的两个元素上下外边距会相互重叠，加一个.wrap的div，设置overflow:hidden形成独立的bfc则会解决这个问题*/
	.bfc2 p{margin: 10px;border: 1px solid red}
	.bfc2 .wrap{overflow: hidden;}
	.bfc2 .wrap span{margin: 10px;display: inline-block}
</style>