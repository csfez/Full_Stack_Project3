import {network} from "./network.js"

// var net=new network();


// function open(method, url, async) {

// }

// function send(){  //send the request to network

// }

// function send(string){
    
// }

// function onload(){

// }

const xhr = new XMLHttpRequest();
xhr.open('GET', '/server', true);

xhr.onload = () => {
  // Request finished. Do processing here.
};

xhr.send(null);