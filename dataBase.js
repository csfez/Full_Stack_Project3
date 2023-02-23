

class dataBase{
 
    constructor(){
      this.userArray=localStorage.getItem('users');
      this.meetingArray=localStorage.getItem('meetings');
      this.meetingId=localStorage.getItem('meetingId');

      if(this.userArray===null){
        this.userArray = new Array();
        this.meetingArray=new Array();
        localStorage.setItem('users',JSON.stringify(userArray));
        localStorage.setItem('meetings',JSON.stringify(meetingArray));
        localStorage.setItem('meetingId',0);
      }
      else{
        this.userArray=JSON.parse(this.userArray);
        this.meetingArray=JSON.parse(this.meetingArray);

        // var objusers = JSON.parse(this.userArray);
        
             
        // for(var i in objusers)
        //     this.users.push(objusers[i]);

        // var objmeet = JSON.parse(this.meetingArray);
    
          
        // for(var j in objmeet)
        //     this.users.push(objmeet[m]);
              

      }
    }

    register(user){
      var user_obj=JSON.parse(user);
      username = user_obj.name;
      psw = user_obj.password;

    
      for (const user of this.userArray){
        if(JSON.parse(user).name===username){
          alert("user name already exist!")
          return;
        }
      }

      this.userArray.push(user);
      localStorage.setItem('users',JSON.stringify(this.userArray));
      sessionStorage.setItem("currentUser",username);
      return true;

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

    // checkPassword(psw) {
    //   const isWhitespace = /^(?=.*\s)/;
    //   if (isWhitespace.test(psw)) {
    //     alert("Password must not contain Whitespaces");
    //     return false;
    //   }

    //   const isContainsLetter = /^(?=.*[A-Za-z])/;
    //   if (!isContainsLetter.test(psw)) {
    //     alert("Password must contain at least one Letter");
    //     return false;
    //   }

    //   const isContainsNumber = /^(?=.*[0-9])/;
    //   if (!isContainsNumber.test(psw)) {
    //     alert("Password must contain at least one Digit");
    //     return false;
    //   }

    //   const isValidLength = /^.{3,15}$/;
    //   if (!isValidLength.test(psw)) {
    //     alert("Password must be 3-15 Characters Long");
    //     return false;
    //   }

    //   return true;
    // }


    signIn(userSignIn){
    
      var user_obj=JSON.parse(userSignIn);
      username = user_obj.name;
      psw = user_obj.password;

      for (const user of this.userArray){
        if(JSON.parse(user).name===username){
          if(JSON.parse(user).password===psw){
            
            sessionStorage.setItem("cuurentUser",username);
            
            return true;
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