import {network} from "./network.js"


class FXMLHttpRequest{

  open(method, url, body, async) {
    this.method=method;
    this.url=url;
    this.body=body;
    this.async=async;
    this.status=0;
    this.responseText="";
  }

  send(){  //send the request to network
    this.responseText=network.send(this);
  }

  send(data){
    this.responseText=network.send(data,this);
  }
}


/* const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://github.com/csfez/Full_Stack_Project3/blob/main/dataBase.js');

xhr.onload = () => {
    var ourData =ourRequest.responseText;
    console.log(ourData);
  // Request finished. Do processing here.
};

xhr.send(null); */