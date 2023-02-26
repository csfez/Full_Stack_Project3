

class dataBase{
 
  constructor(){
      this.userArray=localStorage.getItem('users');
      this.meetingArray=localStorage.getItem('meetings');
      this.meetingId=localStorage.getItem('meetingId');

      if(this.userArray===null){
        this.userArray = new Array();
        this.meetingArray=new Array();
        localStorage.setItem('users',JSON.stringify(this.userArray));
        localStorage.setItem('meetings',JSON.stringify(this.meetingArray));
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

    // cleanInputs() {
    //   document.getElementById('uname').value = "";
    //   document.getElementById('psw').value = "";
    // }

    
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
            
            sessionStorage.setItem("currentUser",username);
            
            return true;
          }
          alert("wrong password");
          return;
        }
      }
      alert("user name does not exist");
    }

    addNewMeeting(meet){
      var meeting_obj=JSON.parse(meet);
      var title = meeting_obj.title;
      var date = meeting_obj.date;
      var importance_level=meeting_obj.importance_level;

      let currentUser=sessionStorage.getItem('currentUser');

      objIndex = JSON.parse(this.userArray).findIndex((obj => obj.name == currentUser));

      //Log object to Console.
      console.log("Before update: ", myArray[objIndex])

      //Update object's name property.
      this.userArray[objIndex].meetings =this.userArray[objIndex].meetings.push(this.meetingId);

      for (const user of this.userArray){
        if(JSON.parse(user).name===currentUser){
          //put the id of the meeting in the user object
          var u=JSON.parse(user);
          u.meetings.push(this.meetingId);
        }
       } 
          //create the meeting in the meeting array
          var meeting={
            meetingId:this.meetingId,
            title:title,
            date:date,
            importance_level:importance_level
          };
       
          this.meetingArray.push(meeting);
          localStorage.setItem('users',JSON.stringify(this.userArray));
          localStorage.setItem('meetings',JSON.stringify(this.meetingArray));
          this.meetingId=parseInt(this.meetingId, 10)+1
          localStorage.setItem('meetingId',this.meetingId);
          return true;

       
      

    }

    deleteMeeting(meeting){
      var meeting_obj=JSON.parse(meet);
      var id = meeting_obj.meetingId;

      let currentUser=sessionStorage.getItem('currentUser');
      for (const user of this.userArray){
        if(JSON.parse(user).name===currentUser){
          //delete from currentuser list 
          u_obj=JSON.parse(user);

          const index = u_obj.meetings.indexOf(id);

          const x = u_obj.meetings.splice(index, 1);
          


        }
      }
    }

  get(){
    var list_meetingsId_current_user=[];
    var list_meetings=[]
    let currentUser=sessionStorage.getItem('currentUser');
    for (const user of this.userArray){
      if(JSON.parse(user).name===currentUser){
        list_meetingsId_current_user.push(JSON.parse(user).meetings)
      }
    }
    if(this.meetingArray!=null){
      for(const meetingId of list_meetingsId_current_user){
          for(const meeting of this.meetingArray){
            if(JSON.parse(meeting).meetingId==meetingId){
              list_meetings.push(meeting);
            }
          }
        }
      }
      return list_meetings;
  }
  
 
}