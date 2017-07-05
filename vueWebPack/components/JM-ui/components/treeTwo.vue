<template>
    <ul style="padding-left: 16px">
        <li class="JM-tree" v-for="data in tree">
            <div style="display: inline-block">
                <i v-if="data.children&&data.children.length" :class="data.open?'rotate':''"@click="toggle(data)"></i>
            </div>
            <label :for="data.id" class="checkbox" @click="toggleCheck(data)" v-bind:class="data.checked?'active':''"></label>
            <input type="checkbox" :id="data.id" v-show="false"/>
            <span :data-id="data.id">{{data.label}}</span>
            <transition name="fade">
            <jm-treeTwo
                    :treeDataTwo="data.children"
                    v-show="data.show"
                    v-if="data.children&&data.children.length"
                    :linkChildren="linkChild"
            ></jm-treeTwo>
            </transition>
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
              tree:this.treeDataTwo,
              isActive:false
          }
      },
      props:{
         treeDataTwo:{
             type:Array
         },
          linkChildren:{//判断选中是否关联下级
             type:Boolean
         },
          linkParents:{//是否选中时子关联上级
              type:Boolean
          }
      },
      computed:{
          linkChild(){
              return this.linkChildren
          },

      },
      methods:{
          toggle(oneData){
              oneData.open=!oneData.open
              oneData.show=!oneData.show
              this.tree = Object.assign({}, this.tree);//open和show不是一开始就定义好的，所以需要重新创建一个对象，详解见vue数据响应式原理

          },
          toggleCheck(oneData){
              var that=this
              let allData=this.tree
              function checkChild(data) {
                  for(let i=0;i<data.length;i++){
                      data[i].checked=oneData.checked
                      if(data[i].children&&data[i].children.length){
                          checkChild(data[i].children)
                      }else{
                          return
                      }
                  }
              }
              function checkParents(data,allNode) {
                  let result
                  let ok=false
                  for(let j=0;j<allNode.length;j++){
                        console.log(allNode[j].id,data.pid)
                         if(allNode[j].id == data.pid){
                             //allNode[i].checked=oneData.checked
                             ok=true
                             result=allNode[j]
                         }else{
                             if(!ok){
                                 if(allNode[j].children&&allNode[j].children.length){
                                     checkParents(data,allNode[j].children)
                                 }else{
                                     result=""
                                 }
                             }


                         }
                  }
                  return result
              }
              //父关联子
              if(!this.linkChildren){
                  oneData.checked=!oneData.checked
              }else{
                  oneData.checked=!oneData.checked
                  if(oneData.children&&oneData.children.length){
                      checkChild(oneData.children)
                  }
              }
              //子找到父
              if(this.linkChildren){
                  let p=checkParents(oneData,allData)
                  console.log(p)
              }

          }
      },
      created(){

      }

  }
</script>
<style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }

</style>