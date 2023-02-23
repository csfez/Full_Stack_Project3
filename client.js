import {network} from "./network.js"
var output='';
var xhttp=new FXMLHttpRequest();
xhttp.onreadystatechange=function(){
     if(this.readState=4&&this.status==200){
        document.getElementById("meetings").innerHTML=xhttp.responseText;
     }
}
xhttp.open("GET","./server", true);
xhttp.send();




