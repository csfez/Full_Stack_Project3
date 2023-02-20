//localStorage.clear();

const app={
  pages:[],
  show:new Event('show'),
  init:function(){

    app.pages=document.querySelectorAll('.page');
    app.pages.forEach((pg)=>{
      pg.addEventListener('show', app.pageShown);
    })

    document.querySelectorAll('.btn').forEach((button)=>{
      button.addEventListener('click', app.nav);
    })

    let username;
    let psw;
    let userArray;

    let registerButton = document.getElementById('sign_in_btn');
    let signInButton = document.getElementById('register_btn');
    registerButton.addEventListener('click', register);
    signInButton.addEventListener('click', signIn);
    initialize();
    history.replaceState({}, 'Home', '#sign_in');
  },

  nav:function(ev){
    ev.preventDefault();
    let currentPage = ev.target.getAttribute('data-target');
    document.querySelector('.active').classList.remove('active');
    document.getElementById(currentPage).classList.add('active');
    console.log(currentPage)
    history.pushState({}, currentPage, `#${currentPage}`);
    document.getElementById(currentPage).dispatchEvent(app.show);
  },

  pageShown: function(ev){},

 
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

function initialize(){
  userArray=localStorage.getItem('all_users');
  if(userArray===null){
    userArray = new Array();
    localStorage.setItem('all_users',JSON.stringify(userArray));
  }
  else{
    userArray=JSON.parse(userArray);
  }
}

function register(){
  username = document.getElementById('uname').value;
  psw = document.getElementById('psw').value;

  for (const user of userArray){
    if(user.name===username){
      alert("uesr name already exist!")
      return;
    }
  }
  if(addData()){
    cleanInputs();
    window.location.replace('./main.html');
    sessionStorage.setItem("cuurentUser",username);
  }
}

function cleanInputs() {
  document.getElementById('uname').value = "";
  document.getElementById('psw').value = "";
}

function addData(){
  //test username
  let tesRegex=  /^[A-Za-z]\w*$/;
  if(!username.match(tesRegex)) 
  { 
    alert("username must tart with a letter and contain only characters, digits and underscore");
    return false;
  }

  //test password
  if (!checkPassword(psw)){
    return false;
  }

  let user={name:username, password:psw, rockScore:0, arkanoidScore:0};
  userArray.push(user);
  localStorage.setItem('all_users',JSON.stringify(userArray));
  return true;
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

  for (const user of userArray){
    if(user.name===username){
      if(user.password===psw){
        cleanInputs();
        window.location.replace("./client.html");
        sessionStorage.setItem("cuurentUser",username);
        return;
      }
      alert("wrong password");
      return;
    }
  }
  alert("user name does not exist");
}