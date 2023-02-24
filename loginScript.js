//localStorage.clear();
// import {FXMLHttpRequest} from "Full_Stack_Project3\FXMLHttpRequest.js"
// import FXMLHttpRequest from 'Full_Stack_Project3\FXMLHttpRequest.js'
   var temp = document.querySelector('#sign_in');
    var clon = temp.content.cloneNode(true);
    document.querySelector('#main').appendChild(clon);
    currentPage='sign_in';

const app={
  // pages:[],
  // show:new Event('show'),
  init:function(){

    app.pages=document.getElementsByTagName("template");
    console.log(app.pages);

    document.querySelectorAll('.btn').forEach((button)=>{
      button.addEventListener('click', app.nav);
    })

    history.replaceState(`${currentPage}_div`, "currentPage", `#${currentPage}`);
  },

  nav:function(ev){

    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target');
    var temp = document.querySelector(`#${currentPage}`);
    var clon = temp.content.cloneNode(true);

    var listItem = document.importNode(temp.content, true);

    // (`#${history.state}`).hide();
    
    // const element = listItem.getElementById("div_temp");
    console.log(history.state);
    var tempOld=document.querySelector(`#${history.state}`);
    // var clonOld = tempOld.content.cloneNode(true);
    console.log(history.state);
    // var listItemTempOld = document.importNode(tempOld.content, true);

    // listItemTempOld.getElementById("div_temp").innerHTML="";
    document.querySelector('#main').removeChild(tempOld);
    document.querySelector('#main').appendChild(clon);
  
    console.log(history.state)
   
     history.replaceState(`${currentPage}_div`, "currentPage", `#${currentPage}`);
  },


 
}


document.addEventListener('DOMContentLoaded', app.init);

// let username;
// let psw;
// let userArray;

// let registerButton = document.getElementsByTagName('button')[0];
// let signInButton = document.getElementsByTagName('button')[1];
// registerButton.addEventListener('click', register);
// signInButton.addEventListener('click', signIn);

// initialize();

// function initialize(){
//   userArray=localStorage.getItem('all_users');
//   if(userArray===null){
//     userArray = new Array();
//     localStorage.setItem('all_users',JSON.stringify(userArray));
//   }
//   else{
//     userArray=JSON.parse(userArray);
//   }
// }

// function register(){
//   username = document.getElementById('uname').value;
//   psw = document.getElementById('psw').value;

//   for (const user of userArray){
//     if(user.name===username){
//       alert("uesr name already exist!")
//       return;
//     }
//   }
//   if(addData()){
//     cleanInputs();
//     window.location.replace('./main.html');
//     sessionStorage.setItem("cuurentUser",username);
//   }
// }

function cleanInputs() {
  document.getElementById('uname').value = "";
  document.getElementById('psw').value = "";
}

function addUser(){
  //test username
  username = document.getElementById('uname').value;
  psw = document.getElementById('psw').value;
  let tesRegex=  /^[A-Za-z]\w*$/;
  if(!username.match(tesRegex)) 
  { 
    alert("username must start with a letter and contain only characters, digits and underscore");
    return false;
  }

  //test password
  if (!checkPassword(psw)){
    return false;
  }

  let user={
      type:"user",
      name:username,
      password:psw, 
      meetings:[]
    };

  var user_json=JSON.stringify(user);
  var Fxml=new FXMLHttpRequest();
  Fxml.open("POST","dataBase.js",user_json,true);
  var res=Fxml.send(user_json);
  if(res){
    alert("your account has been created")
  }
  cleanInputs();

}



function checkPassword(psw) {
  const isWhitespace = /^(?=.*\s)/;
  if (isWhitespace.test(psw)) {
    alert("Password must not contain Whitespaces");
    return false;
  }

  const isContainsLetter = /^(?=.*[A-Za-z])/;
  if (!isContainsLetter.test(psw)) {
    alert("Password must contain at least one Letter");
    return false;
  }

  const isContainsNumber = /^(?=.*[0-9])/;
  if (!isContainsNumber.test(psw)) {
    alert("Password must contain at least one Digit");
    return false;
  }

  const isValidLength = /^.{3,15}$/;
  if (!isValidLength.test(psw)) {
    alert("Password must be 3-15 Characters Long");
    return false;
  }

  return true;
}


function signIn(){
  username = document.getElementById('uname').value;
  psw = document.getElementById('psw').value;
  
  let user={
    type:"userSignIn",
    name:username,
    password:psw,
  };

  var user_json=JSON.stringify(user);  
  var Fxml=new FXMLHttpRequest();
  Fxml.open("POST","dataBase.js",user_json,true);
  var res=Fxml.send(user_json);
  if(res){
    app.init();
  }
}

function addNewMeeting(){
  title = document.getElementById('title').value;
  date = document.getElementById('date').value;
  importance_level=document.getElementById('level').value;
  let meeting={
    type:"add_meeting",
    title:title,
    date:date,
    importance_level:importance_level
  };

  var meeting_json=JSON.stringify(meeting);  
  var Fxml=new FXMLHttpRequest();
  Fxml.open("POST","dataBase.js",meeting_json,true);
  var res=Fxml.send(meeting_json);
  if(res){
    alert('meeting saves')
  }

}