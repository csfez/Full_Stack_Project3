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
  }

  send(){  //send the request to network
    var net=new network()
    var res=this.responseText=net.send(this);
    return res;

  }

  send(data){
    var net=new network()
    var res=this.responseText=net.send(this);
    return res;
  }
}

