//localStorage.clear();
// import {FXMLHttpRequest} from "Full_Stack_Project3\FXMLHttpRequest.js"
// import FXMLHttpRequest from 'Full_Stack_Project3\FXMLHttpRequest.js'
var temp = document.querySelector('#sign_in');
var clon = temp.content.cloneNode(true);
document.querySelector('#main').appendChild(clon);
currentPage = 'sign_in';

const app = {
  // pages:[],
  // show:new Event('show'),
  init: function () {

    app.pages = document.getElementsByTagName("template");
    console.log(app.pages);

    document.querySelectorAll('.btn').forEach((button) => {
      button.addEventListener('click', app.nav);
    })

    history.replaceState(`${currentPage}_div`, "currentPage", `#${currentPage}`);
  },

  nav: function (ev) {

    console.log(history.state);
    ev.preventDefault();

    let currentPage = ev.target.getAttribute('data-target');
    var temp = document.querySelector(`#${currentPage}`);
    var clon = temp.content.cloneNode(true);

    var listItem = document.importNode(temp.content, true);

    // (`#${history.state}`).hide();

    // const element = listItem.getElementById("div_temp");
    console.log(history.state);
    var tempOld = document.querySelector(`#${history.state}`);
    // var clonOld = tempOld.content.cloneNode(true);
    console.log(history.state);
    // var listItemTempOld = document.importNode(tempOld.content, true);

    // listItemTempOld.getElementById("div_temp").innerHTML="";
    document.querySelector('#main').removeChild(tempOld);
    document.querySelector('#main').appendChild(clon);

    document.querySelectorAll('.btn').forEach((button) => {
      button.addEventListener('click', app.nav);
    })
    console.log(history.state)
    // window.addEventListener('init', app.init);
    // document.getElementById(`${currentPage}_div`).dispatchEvent(app.init);


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

function addUser() {
  //test username
  username = document.getElementById('uname').value;
  psw = document.getElementById('psw').value;
  email=document.getElementById('email').value;
  phone=document.getElementById('phone').value;

  let tesRegex = /^[A-Za-z]\w*$/;
  if (!username.match(tesRegex)) {
    alert("username must start with a letter and contain only characters, digits and underscore");
    return false;
  }

  //test password
  if (!checkPassword(psw)) {
    return false;
  }

  let user = {
    type: "user",
    name: username,
    password: psw,
    email:email,
    phone:phone
  };

  var user_json = JSON.stringify(user);
  var Fxml = new FXMLHttpRequest();
  Fxml.open("POST", "dataBase.js", user_json, true);
  var res = Fxml.send(user_json);
  if (res) {
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


function signIn() {
  username = document.getElementById('uname').value;
  psw = document.getElementById('psw').value;
  

  let user = {
    type: "userSignIn",
    name: username,
    password: psw,
  };
  var user_json = JSON.stringify(user);
  var Fxml = new FXMLHttpRequest();

  Fxml.open("GET","dataBase.js", user_json, true);
  var res = Fxml.send();
  if (res) {
    var button = document.getElementById('sign_in_btn');
    button.dataset.target = "app"
    app.init();
    showTasks();
    checked();
    const h1Element = document.createElement('h1');
    h1Element.className="my_h1"
    h1Element.textContent = `Welcome ${username}`;

    document.getElementById("app_div").appendChild(h1Element);

  } else {
    cleanInputs();
    alert("wrong userName or password")
  }

 /*  var user_json = JSON.stringify(user);
  var Fxml = new FXMLHttpRequest();
  Fxml.open("POST", "dataBase.js", user_json, true);
  var res = Fxml.send(user_json);
  if (res) {
    var button = document.getElementById('sign_in_btn');
    button.dataset.target = "app"
    app.init();
    showTasks()
  } else {
    cleanInputs();
  } */
}

function addNewTask() {
  // username = document.getElementById('username').value;
  title = document.getElementById('title').value;
  let task = {
    type: "add_task",
    name: username,
    title: title,
  };

  var task_json = JSON.stringify(task);
  var Fxml = new FXMLHttpRequest();
  Fxml.open("POST", "dataBase.js", task_json, true);
  var res = Fxml.send(task_json);
  if (res) {
    alert('task saves');
    document.getElementById("myUL").innerHTML = "";
    showTasks();
    // // Add a "checked" symbol when clicking on a list item
    // var list = document.querySelector('ul');
    // list.addEventListener('click', function(ev) {
    //   if (ev.target.tagName === 'LI') {
    //     ev.target.classList.toggle('checked');
    //   }
    // }, false);
    checked();
  }
  
}


function showTasks() {

  var Fxml = new FXMLHttpRequest();
  Fxml.open("GET", "dataBase.js", null, true);
  var res = Fxml.send();
  if (res) {
    for(const tas of res){
      var li = document.createElement("li");
      var inputValue = tas.title;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      if (inputValue === '') {
        alert("You must write something!");
      } else {
        document.getElementById("myUL").appendChild(li);
      }
      document.getElementById("title").value = "";

      var span = document.createElement("SPAN");
      
      var txt = document.createTextNode("\u00D7");
      span.className= "close";
      span.id=tas.title;
       
      span.appendChild(txt);
      // const btn=document.createElement('button');
      // btn.textContent = 'update';
      // btn.id=tas.title;
      // btn.addEventListener('click', function() {
      //   updateTask(this.id);
      // });

      // li.appendChild(btn)
      li.appendChild(span);

      span.onclick = function() {
        this.parentElement.style.display = 'none';
        delete_task(this.id);
      };

      
     
    } 
   
    // var closebtns = document.getElementsByClassName("close");
    //   var i;

    // // Loop through the elements, and hide the parent, when clicked on
    // for (i = 0; i < closebtns.length; i++) {
    //   closebtns[i].addEventListener("click", function() {
    //     this.parentElement.style.display = 'none';
    //     delete_task(this.id);
    //   });
    // }

    

    // document.getElementById("tasks").innerHTML = res;
  }
  
}

function checked(){
  // Add a "checked" symbol when clicking on a list item
  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  }, false);
}

// function showNewTasks(NewTask){
//   var li = document.createElement("li");
//   var inputValue = NewTask.title;
//   var t = document.createTextNode(inputValue);
//   li.appendChild(t);
//   if (inputValue === '') {
//     alert("You must write something!");
//   } else {
//     document.getElementById("myUL").appendChild(li);
//   }
//   document.getElementById("title").value = "";

//   var span = document.createElement("SPAN");
//   var txt = document.createTextNode("\u00D7");
//   span.className = "close";
//   span.appendChild(txt);
//   li.appendChild(span);
//   var closebtns = document.getElementsByClassName("close");

//   // Loop through the elements, and hide the parent, when clicked on
  
//   closebtns[0].addEventListener("click", function() {
//     this.parentElement.style.display = 'none';
//     delete_task(this.id);
//   });

 
// }

function delete_task(task_deleted){
  var Fxml = new FXMLHttpRequest();
  Fxml.open("DELETE", "dataBase.js", task_deleted, true);
  var res = Fxml.send(task_deleted);
}

// function updateTask(task_updated){
//   var Fxml = new FXMLHttpRequest();
//   Fxml.open("DELETE", "dataBase.js", task_deleted, true);
//   var res = Fxml.send(task_deleted);
// }

function myInfos(){
  // app.init();
  var Fxml = new FXMLHttpRequest();
  Fxml.open("GET", "dataBase.js","getInfoUser", true);
  var res = Fxml.send();
  const h1Element = document.createElement('h1');
  h1Element.className="my_h1"
  h1Element.textContent=`Welcome ${res.name}`;
  document.getElementById("my_info_div").appendChild(h1Element);
  const name = document.createElement('h2');
  name.textContent=`name: ${res.username}`;
  document.getElementById("my_info_div").appendChild(name);
  const email = document.createElement('h2');
  email.textContent=`email: ${res.email}`;
  document.getElementById("my_info_div").appendChild(email);
  const phone = document.createElement('h2');
  phone.textContent=`name: ${res.phone}`;
  document.getElementById("my_info_div").appendChild(phone);

}

