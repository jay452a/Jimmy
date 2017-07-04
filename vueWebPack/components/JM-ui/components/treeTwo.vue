<template>
    <ul style="padding-left: 16px">
        <li class="JM-tree" v-for="data in tree">
            <div style="display: inline-block">
                <i v-if="data.children&&data.children.length" :class="data.open?'':'rotate'"@click="toggle(data)"></i>
            </div>
            <span :data-id="data.id">{{data.label}}</span>
            <jm-treeTwo :treeDataTwo="data.children" v-show="data.show" v-if="data.children&&data.children.length"></jm-treeTwo>
        </li>
    </ul>
</template>
<script>

  export default{
      name: 'jm-treeTwo',
      data(){
          return{
              isRotate:{
                  rotate:false
              },
              tree:this.treeDataTwo
          }
      },
      props:{
         treeDataTwo:{
             type:Array
         }
      },
      computed:{

      },
      methods:{
          toggle(oneData){
              oneData.open=!oneData.open
              oneData.show=!oneData.show
              this.tree = Object.assign({}, this.tree);//open和show不是一开始就定义好的，所以需要重新创建一个对象，详解见vue数据响应式原理

          }
      },
      created(){

      }

  }
</script>
<style>

</style>