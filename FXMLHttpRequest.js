//import {network} from "./network.js"


class FXMLHttpRequest{
  open(method, url, body, async) {
    this.method=method;
    this.url=url;
    this.body=body;
    this.async=async;
    this.readyState=0;
    this.status=0;
    this.responseText="";
    this.onload = () => {};
    
  }

  send(){  //send the request to network
    var net=new network()
    this.responseText=this.responseText=net.send(this);
    //return this.responseText;
    if(this.status==200){
    this.onload();
    }
  }

  send(data){
    var net=new network()
    this.responseText=this.responseText=net.send(this);
   // return this.responseText;
   if(this.status=200){

   this.onload();

  }
}
}

