<template>
  <div v-show="show">
    <h3>标题</h3>
    <p>{{title}}+{{isSB}}</p>
    <a href="javascript:;" @click="close">关闭</a>
  </div>
</template>

<script>
	//使用props来传值
  export default {
    props: {
      show: Boolean,
      title:{
      	type:String,
      	default:"niubi"
      },
      isSB:Boolean
    },
    methods:{
      close () {
        this.$emit('input', false)
        console.log(this.title)
      }
      
      
    }
  }
</script>