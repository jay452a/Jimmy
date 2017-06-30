<template>
	<div>
		<li>{{li2}}</li>
		<jm-loading text="正在加载"></jm-loading>
		<jm-tree :treeData="tree" v-for="tree in treeData" :allData="treeData"></jm-tree>
		<button @click="chose">选择</button>
	</div>
</template>
<script type="text/javascript">

	export default{
		data(){
			return {
				li2:"this is list2222",
				treeData: [{
				id:"1",
                label: '一级 1',
                children: [{
                    id:"2",
                    label: '二级 1-1',
                    children: [{
                        id:"3",
                        label: '三级 1-1-1'
                    }]
                }]
            }, {id:"99",
                label: '一级 2',
                children: [{
                    id:"4",
                    label: '二级 2-1',
                    children: [{
                        id:"5",
                        label: '三级 2-1-1'
                    }]
                }, {
                    id:"6",
                    label: '二级 2-2',
                    children: [{
                        label: '三级 2-2-1'
                    }]
                }]
            }, {
				id:"7",
				label: '一级 3',
                children: [{
                    id:"8",
                    label: '二级 3-1',
                    children: [{
                        id:"9",
                        label: '三级 3-1-1'
                    }]
                }, {
                    id:"10",
                    label: '二级 3-2',
                    children: [{
                        id:"11",
                        label: '三级 3-2-1'
                    }]
                }]
            }],
			}
		},
		methods:{
            chose(){
                console.log(this.treeData)
			}
		}
	}
</script>
<style>

	.h1{ color: red}
</style>