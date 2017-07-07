<template>
    <ul style="padding-left: 16px">
        <li class="JM-tree" v-for="data in tree">
            <div style="display: inline-block">
                <i v-if="data.children&&data.children.length" :class="data.open?'rotate':''"@click="toggle(data)"></i>
            </div>
            <label
                :for="data.id" class="checkbox"
                @click="toggleCheck(data)"
                v-bind:class="(data.checked==true?'active':(data.checked=='half'?'activeHalf':''))">
            </label>
            <input type="checkbox" :id="data.id" v-show="false"/>
            <span :data-id="data.id">{{data.label}}</span>
            <transition name="fade">
            <jm-treeTwo
                    :treeDataTwo="data.children"
                    v-show="data.show"
                    v-if="data.children&&data.children.length"
                    :linkChildren="linkChild"
                    :linkParents="linkP"
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
          linkP(){
              return this.linkParents
          }

      },
      methods:{
          toggle(oneData){
              oneData.open=!oneData.open
              oneData.show=!oneData.show
              this.tree = Object.assign({}, this.tree);//open和show不是一开始就定义好的，所以需要重新创建一个对象，详解见vue数据响应式原理

          },
          toggleCheck(oneData){
              var that=this
              let parent=this.$parent
              console.log(parent)
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
              function checkParent(data,oneData){
                  //console.log(oneData,"当前数据")
                  //console.log(data,"p")
                  let treeNode=data.tree
                  for (let key in treeNode){
                      if(treeNode[key].id==oneData.pid){
                         let children=treeNode[key].children
                          //console.log(children,"c")
                          let ishalf=0
                         for(let i=0;i<children.length;i++){
                             if(children[i].checked!=oneData.checked){
                                 ishalf++
                             }
                         }
                         if(ishalf<children.length){
                             treeNode[key].checked="half"
                         }
                         if(ishalf==0){
                             treeNode[key].checked=oneData.checked
                         }
                          if(data.$parent){
                              checkParent(data.$parent,treeNode[key])
                          }
                      }
                  }

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
              if(this.linkP){
                  if(parent){
                      checkParent(parent,oneData)
                  }
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