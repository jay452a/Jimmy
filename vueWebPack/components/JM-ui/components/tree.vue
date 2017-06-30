<template>
    <li class="JM-tree">
        <div @click='toggle'style="display: inline-block">
          <i v-if="hasChild" v-bind:class="isRotate"></i>
        </div>
        <label :for="treeData.id" class="checkbox" @click="toggleCheck" v-bind:class="{active:isActive}"></label>
        <input type="checkbox" :id="treeData.id" v-show="false"/>
        <span :data-id="treeData.id">{{treeData.label}}</span>
        <ul v-show="open"  v-bind:style="{paddingLeft:treeChild}"  v-if='hasChild'>
            <jm-tree v-for='child in treeData.children' :treeData="child"></jm-tree>
        </ul>
    </li>
</template>
<script>
    export default{
        name: 'jm-tree',
        data(){
            return{
                open:false,
                isRotate:{
                    rotate:false
                },
                isActive:false
            }
        },
        props:{
            treeData:{
                type:Object,
            },
            allData:{
                type:Array
            }
        },
        methods:{
            toggle(){
                if(this.hasChild) {
                    this.open = !this.open
                    this.isRotate.rotate=!this.isRotate.rotate
                }
            },
            toggleCheck(){
                this.isActive=!this.isActive
                if(this.isActive==true){
                    this.treeData.checked=true
                }else{
                    this.treeData.checked=false
                }
                console.log(this.allData)
            }
        },
        computed:{
            hasChild(){
                return this.treeData.children && this.treeData.children.length
            },
            treeChild(){
                return "16px"
            },

        }


    }
</script>
<style>
.JM-tree i.rotate{
    transform: rotateZ(90deg);
    position: relative;
    top:4px;
}

</style>