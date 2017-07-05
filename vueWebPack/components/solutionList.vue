<template>
	<div>
		<li>{{li2}}</li>
		<jm-loading text="正在加载"></jm-loading>
		<jm-tree :treeData="tree" v-for="tree in treeData" :allData="treeData" ref="tree"></jm-tree>
		<button @click="chose">选择</button>

		<jm-treeTwo
		:treeDataTwo="treeData"
		:linkChildren="true"
		:linkParents="true"
		></jm-treeTwo>

		<ul>
			<li v-for="list in listData" @click="setData(list)" v-show="list.show">{{list.name}}</li>
		</ul>

	</div>
</template>
<script type="text/javascript">
   // import JmTree from "./JM-ui/components/tree";
    let treeData=[{
            id:"1",
            label: '一级 1',
		    checked:false,
            children: [{
                id:"2",
                label: '二级 1-1',
                checked:false,
                children: [{
                    id:"3",
                    label: '三级 1-1-1',
                    checked:false,
                }]
            }]
        }, {id:"99",
            label: '一级 2',
		    checked:false,
            children: [{
                id:"4",
                label: '二级 2-1',
                checked:false,
                children: [{
                    id:"5",
                    checked:false,
                    label: '三级 2-1-1'

                }]
            }, {
                id:"6",
                checked:false,
                label: '二级 2-2',
                children: [{
                    checked:false,
                    label: '三级 2-2-1'
                }]
            }]
        }, {
            id:"7",
            label: '一级 3',
            checked:false,
            children: [{
                id:"8",
                label: '二级 3-1',
                checked:false,
                children: [{
                    id:"9",
                    checked:false,
                    label: '三级 3-1-1'
                }]
            }, {
                id:"10",
                checked:false,
                label: '二级 3-2',
                children: [{
                    id:"11",
                    checked:false,
                    label: '三级 3-2-1'
                }]
            }]
        }]
    let listData=[{name:"jimmy",show:true},{"name":"super",show:true}]
        export default{
        //components: {JmTree},
        data(){
			return {
				li2:"this is list2222",
				treeData:treeData,
                listData:listData
			}
		},
		methods:{
            chose(){



			},
            setData(list){
                list.show=false



			}
		},
        created(){
            let data=this.treeData
            function setData(data,id) {
                for(let i=0;i<data.length;i++){
					//data[i].show=false
					//data[i].open=true
					//data[i].checked=false
					if(id){
                        data[i].pid=id
					}
					if(data[i].children&&data[i].children.length){
						setData(data[i].children,data[i].id)
					}else{
					    return
					}
                }
            }
            setData(data)
            this.treeData=data
			console.log(this.treeData)
        }
	}
</script>
<style>

	.h1{ color: red}
</style>