<template>
    <div class="JM-loading">
        {{text}}
    </div>
</template>
<script>
    export default{
        data(){
            return{

            }
        },
        props:{
          text:{
              type:String,
              default:"loading"
          }
        }
    }
</script>