
class server{
    hendleRequest(req){
        var db=new dataBase();
        req.readyState=2; //request received
        var res;
        if(req.method=='GET'){
            if(req.body=="getInfoUser"){
                res=db.getInfoUser();
            }
            else{
                if(JSON.parse(req.body)!=null){
                    if(JSON.parse(req.body).type=="user" ||JSON.parse(req.body).type=="userSignIn"){
                        res= db.getUser(req.body)
                    }
                    if(JSON.parse(req.body).type=="task"){
                        res=db.getTask(req.body);  //if its true as he managed to add
                    }
                    
                }
            
                else{
                    res= db.getAllTasks(req.body);
                    
                }
            }
        }


        if(req.method=='POST'){
            if(JSON.parse(req.body).type=="user"){
                res=db.register(req.body); //if its true as he managed to add
            }
            if(JSON.parse(req.body).type=="add_task"){
                res=db.addNewTask(req.body);  //if its true as he managed to add
            }
            if(JSON.parse(req.body).type=="userSignIn"){
                res=db.signIn(req.body);
            }
             
        }
        if(req.method=='DELETE'){
            res=db.deleteTask(req.body);
        }

        if(req.method=='PUT'){
            if(JSON.parse(req.body).type=="user"){
                res=db.updateUserDetailes(req.body); //if its true as he managed to add
            }
            if(JSON.parse(req.body).type=="task"){
                res=db.updateTaskDetailes(req.body);  //if its true as he managed to add
            }

        }

        if(res){
            req.status=200;
        }else{
            req.status=400;
        }
        return res;
    }
}
