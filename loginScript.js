//localStorage.clear();
var temp = document.querySelector('#sign_in');
var clon = temp.content.cloneNode(true);
document.querySelector('#main').appendChild(clon);
currentPage = 'sign_in';

const app = {
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
  Fxml.open("POST", "addUser", user_json, true);
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

  Fxml.open("GET","signIn", user_json, true);
  var res = Fxml.send();
  if (res) {
    var button = document.getElementById('sign_in_btn');
    button.dataset.target = "app"
    app.init();
    showTasks();
    checked();
    myInfos();
  
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
  if(title==null){
    alert("You must write something!");
    }
  else{
      let task = {
        type: "add_task",
        name: username,
        title: title,
      };

      var task_json = JSON.stringify(task);
      var Fxml = new FXMLHttpRequest();
      Fxml.open("POST", "addNewTask", task_json, true);
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
  
}


function showTasks() {

  var Fxml = new FXMLHttpRequest();
  Fxml.open("GET", "showTask", null, true);
  var res = Fxml.send();
  if (res) {
    for(const tas of res){
      var li = document.createElement("li");
      var inputValue = tas.title;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      //  if (inputValue === '') {
      //   alert("You must write something!");
      // } else { 
      document.getElementById("myUL").appendChild(li);
      //}
      document.getElementById("title").value = "";

      var span = document.createElement("SPAN");
      
      var txt = document.createTextNode("\u00D7");
      span.className= "close";
      span.id=tas.title;
       
      span.appendChild(txt);
      li.appendChild(span);

      span.onclick = function() {
        this.parentElement.style.display = 'none';
        delete_task(this.id);
      };

    }
     checked();
    //  myInfos();
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
  //}
  
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
  Fxml.open("DELETE", "deleteTask", task_deleted, true);
  var res = Fxml.send(task_deleted);
}

// function updateTask(task_updated){
//   var Fxml = new FXMLHttpRequest();
//   Fxml.open("DELETE", "dataBase.js", task_deleted, true);
//   var res = Fxml.send(task_deleted);
// }
// myInfos();
function myInfos(){
  // app.init();
  var Fxml = new FXMLHttpRequest();
  Fxml.open("GET", "getInfoUser","getInfoUser", true);
  var res = Fxml.send();
  document.getElementById("user_name").innerText=res.name;
  document.getElementById("user_email").innerText=res.email;
  document.getElementById("user_phone").innerText=res.phone;
  return res;
}

function editInfos(){
  // var Fxml = new FXMLHttpRequest();
  // Fxml.open("GET", "getInfoUser","getInfoUser", true);
  // var res = Fxml.send();
  var user_obj=myInfos();
  // window.onload = function() {
  app.nav();
  var temp = document.getElementById('edit_info');
  var clon = temp.content.cloneNode(true);

  // Récupération de l'élément input
  const input = clon.querySelector('#uname1');
  
  // Modification de la valeur de l'input
  input.value = 'nouvelle valeur';
  var listItem = document.importNode(temp.content, true);

  listItem.getElementById("uname1").value = 'JohnDoe';
  // };

  // document.getElementById("email").placeholder=user_obj.email;
  // document.getElementById("phone").placeholder=user_obj.phone;
  // document.getElementById("psw").placeholder=user_obj.password;  
  
}

function editUser(){
  username = document.getElementById('uname').value;
  psw = document.getElementById('psw').value;
  email=document.getElementById('email').value;
  phone=document.getElementById('phone').value;
  let user = {
    name: username,
    password: psw,
    email:email,
    phone:phone
  };

  var Fxml = new FXMLHttpRequest();
  Fxml.open("POST", "editUser",user, true);
  Fxml.send();
  
}
