<template>
    <ul style="padding-left: 16px">
        <treeTwo v-for="data in tree" :model="data"></treeTwo>
    </ul>
</template>
<script>


  export default{
      components: {
          treeTwo:{
              name: 'jm-treeTwo',
              data(){
                  return {
                      modelTrans:this.model
                  }
              },
              props:{
                  model:{
                      type:Object
                  },
                  linkChild:{
                      type:Boolean
                  },
                  linkP:{
                      type:Boolean
                  }
              },
              methods:{
                  toggle(oneData){
                      oneData.open=!oneData.open
                      oneData.show=!oneData.show
                      this.modelTrans = Object.assign({}, this.modelTrans);//open和show不是一开始就定义好的，所以需要重新创建一个对象，详解见vue数据响应式原理

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
              template:
                  `<li class="JM-tree">
                    <div style="display: inline-block">
                        <i v-if='modelTrans.children&&modelTrans.children.length' :class="modelTrans.open?'rotate':''"@click="toggle(modelTrans)"></i>
                    </div>
                    <label :for='modelTrans.id' class="checkbox" @click='toggleCheck(modelTrans)' v-bind:class="modelTrans.checked?'active':''"></label>
                    <input type="checkbox" :id='modelTrans.id' v-show="false"/>
                    <span :data-id='modelTrans.id'>{{modelTrans.label}}</span>
                    <ul style="padding-left: 16px">
                        <jm-treeTwo
                            v-for='data in modelTrans.children'
                            :model='data'
                            v-show='modelTrans.show'
                            v-if='modelTrans.children&&modelTrans.children.length'
                        ></jm-treeTwo>
                    </ul>

              </li>`
          },


      },
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