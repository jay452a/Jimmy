<template>
    <div>
        <h1 v-on:click="getName">姓名：{{name}}</h1>
        <h2 v-on:click="getAge">{{age}}</h2>
    </div>
</template>

<script>
    //es6
    export default {
         data () {
            return {
                name:"guowenfh",
                age:"2q1"
            }
        },
        methods: {
		    getName: function () {
		      alert(this.name)
		    },
		    getAge:function(){
		    	alert(this.age)
		    }
	  }
        
    }
</script>
<style lang="sass">
    $primaryColor: #333;
   .h1{color:$color;}
</style>
