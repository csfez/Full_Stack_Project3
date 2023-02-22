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
xhr.open('GET', 'https://github.com/csfez/Full_Stack_Project3/blob/main/dataBase.js');

xhr.onload = () => {
    var ourData =ourRequest.responseText;
    console.log(ourData);
  // Request finished. Do processing here.
};

xhr.send(null);