class dataBase{
 
  constructor(){
      this.userArray=localStorage.getItem('users');
      this.taskArray=localStorage.getItem('tasks');

      if(this.userArray===null){
        this.userArray = new Array();
        this.taskArray=new Array();
        localStorage.setItem('users',JSON.stringify(this.userArray));
        localStorage.setItem('tasks',JSON.stringify(this.taskArray));
      }
      else{
        this.userArray=JSON.parse(this.userArray);
        this.taskArray=JSON.parse(this.taskArray);
      }
    }

    register(user){
      var user_obj=JSON.parse(user);
      username = user_obj.name;      
    
      for (const user of this.userArray){
        if(user.name===username){
          alert("user name already exist!")
          return;
        }
      }

      this.userArray.push(JSON.parse(user));
      localStorage.setItem('users',JSON.stringify(this.userArray));
      sessionStorage.setItem("currentUser",username);
      return true;
    }

    signIn(userSignIn){
    
      var user_obj=JSON.parse(userSignIn);
      username = user_obj.name;
      psw = user_obj.password;

      for (const user of this.userArray){
        if(user.name===username){
          if(user.password===psw){ 
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

          //create the meeting in the meeting array
          var task={
            title:title,
            username:currentUser
          };
       
          this.taskArray.push(task);
          localStorage.setItem('tasks',JSON.stringify(this.taskArray));
          return true;
    }

    deleteTask(task_){
      var task_obj=JSON.parse(task_);
      var title = task_obj.title;
      var username=task_obj.username;

      for (var i = 0; i < this.taskArray.length; i++){
        if(this.taskArray[i].username===username && this.taskArray[i].title===title){
          //delete from currentuser list 
          this.taskArray.splice(i, 1); 
          i--; 
        }
      }
      localStorage.setItem('tasks',JSON.stringify(this.taskArray));
    }

  getAllTasks(){
    var list_tasks=[]
    let currentUser=sessionStorage.getItem('currentUser');
      for(const task of this.taskArray){
          if(task.username==currentUser){
              list_tasks.push(task);
            }
          }
      return list_tasks;
  }

  getUser(user_){

    var user_obj=JSON.parse(user_);
    username = user_obj.name;
    psw = user_obj.password;

    for (const user of this.userArray){
      if(user.name===username){
          if(user.password===psw){
            sessionStorage.setItem("currentUser",username);
            return user;

          }
        }
      }
  }

  getInfoUser(){
    let currentUser=sessionStorage.getItem('currentUser');
    for(const user of this.userArray){
      if(user.name===currentUser){
        var user_obj=user;
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
          return task;
        }
        }
      }
  }

  updateUser(user_){
    let currentUser=sessionStorage.getItem('currentUser');
    for (var i = 0; i < this.userArray.length; i++){
      if(this.userArray[i].name===currentUser){
        this.userArray[i]=user_;
      }
    }  

    for (var i = 0; i < this.taskArray.length; i++){
      if(this.taskArray[i].username===currentUser){
        this.taskArray[i].username=user_.name;
      }
    }  

    localStorage.setItem('users',JSON.stringify(this.userArray));
    localStorage.setItem('tasks',JSON.stringify(this.taskArray));

    sessionStorage.setItem("currentUser",username);
    return true;
  }
  
  deleteTask(task_title_deleted){

    this.taskArray= this.taskArray.filter(t => t.title!=task_title_deleted); 
    localStorage.setItem('tasks',JSON.stringify(this.taskArray));
  }
 
}

