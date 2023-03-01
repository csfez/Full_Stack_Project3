//localStorage.clear();
var temp = document.querySelector('#sign_in');
var clon = temp.content.cloneNode(true);
document.querySelector('#main').appendChild(clon);
currentPage = 'sign_in';

const app = {
  pages: [],
  show: new Event('show'),
  init: function () {
    app.pages = document.querySelectorAll('.page');
    app.pages.forEach((pg)=>{
        pg.addEventListener('show', app.pageShown);
    })
    
    // app.pages = document.getElementsByTagName("template");
    // console.log(app.pages);

    document.querySelectorAll('.btn').forEach((button) => {
      button.addEventListener('click', app.nav);
    })

    history.replaceState(`${currentPage}_div`, "currentPage", `#${currentPage}`);
    window.addEventListener('popstate', app.poppin);
  },

  nav: function (ev) {

    console.log(history.state);
    ev.preventDefault();

    currentPage = ev.target.getAttribute('data-target');
    var temp = document.querySelector(`#${currentPage}`);
    var clon = temp.content.cloneNode(true);

    // var listItem = document.importNode(temp.content, true);

    // (`#${history.state}`).hide();

    // const element = listItem.getElementById("div_temp");
    console.log(history.state);
    var tempOld = document.querySelector(`${location.hash}_div`);
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

    
    history.pushState({}, "currentPage", `#${currentPage}`);
    // history.replaceState(`${currentPage}_div`, "currentPage", `#${currentPage}`);
    document.getElementById(currentPage).dispatchEvent(app.show);
    // window.addEventListener('popstate', app.poppin);

  },
  pageShown: function(ev){
    console.log('Page', ev.target.id, 'just shown');
    console.log(currentPage);
    // if(ev.target.id=="edit_info"){
    //   var Fxml = new FXMLHttpRequest();
    //   Fxml.open("GET", "getInfoUser","getInfoUser", true);
    //   var user = Fxml.send();
    //   document.getElementById("uname").setAttribute("value",user.name);
    //   document.getElementById("email").setAttribute("value",user.email);
    //   document.getElementById("phone").setAttribute("value",user.phone);
    //   document.getElementById("psw").setAttribute("value",user.password);  
    // }

    if(ev.target.id=="edit_info"){
      var Fxml = new FXMLHttpRequest();
      Fxml.open("GET", "getInfoUser","getInfoUser", true);
      Fxml.onload=function() {
        var user=Fxml.responseText;
        document.getElementById("uname").setAttribute("value",user.name);
        document.getElementById("email").setAttribute("value",user.email);
        document.getElementById("phone").setAttribute("value",user.phone);
        document.getElementById("psw").setAttribute("value",user.password);  
          
    
      }
      Fxml.send();
    }
  },
  poppin: function(ev){
    // console.log(ev.target.getAttribute(`${currentPage}_div`));
    var tempOld = document.querySelector(`#${currentPage}_div`);
    console.log(location.hash, 'popstate event');
    var tempNew = document.querySelector(location.hash);
    var clon = tempNew.content.cloneNode(true);
    document.querySelector('#main').removeChild(tempOld);
    document.querySelector('#main').appendChild(clon);

    document.querySelectorAll('.btn').forEach((button) => {
      button.addEventListener('click', app.nav);
    })
    let hash = location.hash.replace('#' ,'');
    currentPage=hash;
    // document.querySelector('.active').classList.remove('active');
    // document.getElementById(hash).classList.add('active');
    console.log(hash)
    //history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(hash).dispatchEvent(app.show);
  }

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
  Fxml.send(user_json);
    alert("your account has been created")
  
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
  Fxml.onload=function() {
    var res =Fxml.responseText;
    if(res){
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
    }
    else{
      cleanInputs();
    alert("wrong userName or password");
    }
  } 
    Fxml.send();
    
  }


  
function addNewTask() {
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
      Fxml.onload=function(){
        alert('task saved');
        document.getElementById("myUL").innerHTML = "";
        showTasks();
   
        checked();
      }
      Fxml.send(task_json);
  } 
}


function showTasks() {

  var Fxml = new FXMLHttpRequest();
  Fxml.open("GET", "showTask", null, true);

  Fxml.onload=function() {
    var res=Fxml.responseText;
    for(const tas of res){
      var li = document.createElement("li");
      var inputValue = tas.title;
      var t = document.createTextNode(inputValue);
      li.appendChild(t);
      
      document.getElementById("myUL").appendChild(li);
      
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
  };
  Fxml.send();
  
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


function delete_task(task_deleted){
  var Fxml = new FXMLHttpRequest();
  Fxml.open("DELETE", "deleteTask", task_deleted, true);
  Fxml.send(task_deleted);
}

/* function myInfos(){
  // app.init();
  var Fxml = new FXMLHttpRequest();
  Fxml.open("GET", "getInfoUser","getInfoUser", true);
  var res = Fxml.send();
  document.getElementById("user_name").innerText=res.name;
  document.getElementById("user_email").innerText=res.email;
  document.getElementById("user_phone").innerText=res.phone;
  return res;
} */

function myInfos(){
  // app.init();
  var Fxml = new FXMLHttpRequest();
  Fxml.open("GET", "getInfoUser","getInfoUser", true);
  Fxml.onload=function(){
    document.getElementById("user_name").innerText=Fxml.responseText.name;
    document.getElementById("user_email").innerText=Fxml.responseText.email;
    document.getElementById("user_phone").innerText=Fxml.responseText.phone;
    return res;
  };
  Fxml.send();

}

function editUser(){
  username = document.getElementById('uname').value;
  psw = document.getElementById('psw').value;
  email=document.getElementById('email').value;
  phone=document.getElementById('phone').value;
  if((username=='')||(psw=='')||(email=='')||(phone=='')){
    alert("please full the fields");
  }else{

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
}

function pswfunction(){
    const password = document.querySelector('#psw');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
  
}