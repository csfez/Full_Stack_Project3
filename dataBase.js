class user {
    constructor(userId,name, password) {
      this.userId=userId;
      this.name = name;
      this.password = password;
      this.tasks=[];
    }
    newTask(task){
        let u = new task(task.userId)
        this.tasks.push(task)
        return p
      }
}
class task{
    constructor(taskId,userId,title,content,CreationDate,date) {
        this.title = title;
        this.password = password;
    }
}
  
  let date = new Date();
  let year = date.getFullYear();
  
  let myCar = new Car("Ford", 2014);
  document.getElementById("demo").innerHTML=
  "My car is " + myCar.age(year) + " years old.";