//这是公用方法
export default{
	dateTranform:function(now,isHour){//日期格式转换
		if(now){
		  let nowChang=new Date(now)	
		  let   year=nowChang.getFullYear();     
	      let   month=nowChang.getMonth()+1;     
	      let   date=nowChang.getDate();     
	      let   hour=nowChang.getHours();     
	      let   minute=nowChang.getMinutes();     
	      let   second=nowChang.getSeconds();  
	      if(isHour==true){
	      	return   year+"-"+month+"-"+date+" "+hour+":"+minute+":"+second;   
	      }else{
	      	return   year+"-"+month+"-"+date
	      }
		}else{
			return ""
		}
	},
	getJSON:function(data){//公用ajax方法
		console.log(data)
		var promise = new Promise(function(resolve, reject){
	    var client = new XMLHttpRequest();
	    client.open(data.type==undefined?"GET":data.type, data.url);
	    client.onreadystatechange = handler;
	    client.responseType = "json";
	    client.setRequestHeader("Accept", "application/json");
	    if(data.type){
	    	client.send(data.data);
	    }else{
	    	client.send(null);
	    }
	
	    function handler() {
	      if (this.readyState !== 4) {
	        return;
	      }
	      if (this.status === 200) {
	        resolve(this.response);
	      } else {
	        reject(new Error(this.statusText));
	      }
	    };
	  });
	
	  return promise;
	}
}

