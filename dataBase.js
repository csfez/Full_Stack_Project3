// var users=[
//   { name:"chirly",
//     password:"qw",
//     tasks:[1,2]
//   },
//   { name:"yael",
//     password:"qw",
//     tasks:[3,4]
//   }
// ]

// var tasks=[
//   {
//     taskId:1,
//     date:'22/02/2023',
//     title:"holidays",
//     content:""
//   },
//   {
//     taskId:2,
//     date:'22/02/2023',
//     title:"menus",
//     content:""
//   },
//   {
//     taskId:3,
//     date:'22/02/2023',
//     title:"books",
//     content:""
//   }
// ]

// window.localStorage.setItem(users, JSON.stringify(users));
// window.localStorage.setItem(tasks, JSON.stringify(tasks));

// var xhttp=new XMLHttpRequest();
// xhttp.onreadystatechange=function(){
//   if(this.readyState==4 && this.status==200){
//     console.log(xhttp.responseText);
//   }
// };
// xhttp.open("GET","user.json",true);
// xhttp.send();

class dataBase{
    // initialize();
    userArray=[];
    meetingArray=[];
    meetingId=null;

    dataBase(){
      var userArray=localStorage.getItem('users');
      var meetingArray=localStorage.getItem('meetings');
      var meetingId=localStorage.getItem('meetingId');

      if(userArray===null){
        userArray = new Array();
        meetingArray=new Array();
        localStorage.setItem('users',JSON.stringify(userArray));
        localStorage.setItem('meetings',JSON.stringify(meetingArray));
        localStorage.setItem('meetingId',0);
      }
      else{
        userArray=JSON.parse(userArray);
        meetingArray=JSON.parse(meetingArray);

      }
    }

    register(user){
      var user_obj=JSON.parse(user);
      username = user_obj.name;
      psw = user_obj.password;

      for (const user of this.userArray){
        if(user.name===username){
          alert("user name already exist!")
          return;
        }
      }

      this.userArray.push(user);
      localStorage.setItem('users',JSON.stringify(this.userArray));
      sessionStorage.setItem("currentUser",username);
      return;

      // if(addData()){
      //   cleanInputs();
      //   // window.location.replace('client.html');
      //   addEventListener('click',app.nav);
      //   sessionStorage.setItem("currentUser",username);
      // }
    }

    cleanInputs() {
      document.getElementById('uname').value = "";
      document.getElementById('psw').value = "";
    }

    // function addData(){
    //   //test username
    //   let tesRegex=  /^[A-Za-z]\w*$/;
    //   if(!username.match(tesRegex)) 
    //   { 
    //     alert("username must tart with a letter and contain only characters, digits and underscore");
    //     return false;
    //   }

    //   //test password
    //   if (!checkPassword(psw)){
    //     return false;
    //   }

    //   let user={
    //     name:username,
    //      password:psw, 
        
    //     };
      
    //   userArray.push(user);
    //   localStorage.setItem('users',JSON.stringify(userArray));
    //   return true;
    // }

    checkPassword(psw) {
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


    signIn(){
      username = document.getElementById('uname').value;
      psw = document.getElementById('psw').value;

      for (const user of userArray){
        if(user.name===username){
          if(user.password===psw){
            cleanInputs();
            // window.location.replace("client.html");
            sessionStorage.setItem("cuurentUser",username);
            addEventListener('click',app.nav);
            return;
          }
          alert("wrong password");
          return;
        }
      }
      alert("user name does not exist");
    }

    addNewMeeting(){
      let currentUser=sessionStorage.getItem('currentUser');
      var storedUsers = JSON.parse(localStorage.getItem("users"));
      var storedTasks =  JSON.parse(localStorage.getItem("tasks"));
      document.getElementById
    }
}