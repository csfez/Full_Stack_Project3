class dataBase{
 
  constructor(){
      this.userArray=localStorage.getItem('users');
      this.taskArray=localStorage.getItem('tasks');
      // this.taskId=localStorage.getItem('taskId');

      if(this.userArray===null){
        this.userArray = new Array();
        this.taskArray=new Array();
        localStorage.setItem('users',JSON.stringify(this.userArray));
        localStorage.setItem('tasks',JSON.stringify(this.taskArray));
        // localStorage.setItem('taskId',0);
      }
      else{
        this.userArray=JSON.parse(this.userArray);
        this.taskArray=JSON.parse(this.taskArray);

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
      // psw = user_obj.password;
      
    
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

    addNewTask(task_){
      var task_obj=JSON.parse(task_);
      var title = task_obj.title;
      var username = task_obj.username;

      let currentUser=sessionStorage.getItem('currentUser');

      // objIndex = JSON.parse(this.userArray).findIndex((obj => obj.name == currentUser));

      //Log object to Console.
      //console.log("Before update: ", myArray[objIndex])

    

      // for (const user of this.userArray){
      //   if(JSON.parse(user).name===currentUser){
      //     //put the id of the meeting in the user object
      //     var u=JSON.parse(user);
      //     u.tasks.push(this.taskId);
      //   }
      //  } 
          //create the meeting in the meeting array
          var task={
            //meetingId:this.meetingId,
            title:title,
            username:currentUser
            //date:date,
            //importance_level:importance_level
          };
       
          this.taskArray.push(task);
          //localStorage.setItem('users',JSON.stringify(this.userArray));
          localStorage.setItem('tasks',JSON.stringify(this.taskArray));
          //this.meetingId=parseInt(this.meetingId, 10)+1
          //localStorage.setItem('meetingId',this.meetingId);
          return true;

    }

    deleteTask(task_){
      var task_obj=JSON.parse(task_);
      var title = task_obj.title;
      var username=task_obj.username;

      //let currentUser=sessionStorage.getItem('currentUser');
      for (var i = 0; i < this.taskArray.length; i++){
        if(this.taskArray[i].username===username && this.taskArray[i].title===title){
          //delete from currentuser list 
          this.taskArray.splice(i, 1); 
          i--; 
        }
      }
    }

  getAllTasks(){
    //var list_tasksId_current_user=[];
    var list_tasks=[]
    let currentUser=sessionStorage.getItem('currentUser');
    //if(this.taskArray.length!=0){
      for(const task of this.taskArray){
          if(task.username==currentUser){
              list_tasks.push(task);
            }
          }
       // }
    /* for (const user of this.userArray){
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
      } */
      return list_tasks;
  }

  getUser(user_){

    var user_obj=JSON.parse(user_);
    username = user_obj.name;
    psw = user_obj.password;

    for (const user of this.userArray){
      if(JSON.parse(user).name===username){
          if(JSON.parse(user).password===psw){
            sessionStorage.setItem("currentUser",username);
            return user;

          }
        }
      }
  }

  getInfoUser(){
    let currentUser=sessionStorage.getItem('currentUser');
      for(const user of this.userArray){
        if(JSON.parse(user).name===currentUser){
          var user_obj=JSON.parse(user);
          return user_obj;
        }
      }    
  }

  getTask(task_){
    var task_obj=JSON.parse(task_);
    username = task_obj.username;
    title = task_obj.title;
    for (const task of this.taskArray){
      if(JSON.parse(task).username===username){
        if(JSON.parse(task).title===title){
          sessionStorage.setItem("task",title);
          return task;}
        }
      }
  }

  updateUser(user){
    //delete first
    register()
    return true;
  }
  
  deleteTask(task_title_deleted){

    this.taskArray= this.taskArray.filter(t => t.title!=task_title_deleted); 
    localStorage.setItem('tasks',JSON.stringify(this.taskArray));
  }
 
}

