
class server{
    hendleRequest(req){
        var db=new dataBase();
        req.readyState=2; //request received
        var res;
        if(req.method=='GET'){
            if(req.url=="getInfoUser"){
                res=db.getInfoUser();
            }
            else{
                if(JSON.parse(req.url)!=null){
                    if(JSON.parse(req.url).type=="user" ||JSON.parse(req.url).type=="userSignIn"){
                        res= db.getUser(req.url)
                    }
                    if(JSON.parse(req.url).type=="task"){
                        res=db.getTask(req.url);  //if its true as he managed to add
                    }
                    
                }
            
                else{
                    res= db.getAllTasks(req.url);
                    
                }
            }
        }


        if(req.method=='POST'){
            if(req.url=='editUser'){
                res=db.updateUser(req.body);
            }else{
            if(JSON.parse(req.url)=="user"){
                res=db.register(req.body); //if its true as he managed to add
            }
            if(JSON.parse(req.url)=="add_task"){
                res=db.addNewTask(req.body);  //if its true as he managed to add
            }
            if(JSON.parse(req.url)=="userSignIn"){
                res=db.signIn(req.body);
            }
        }
        }
        if(req.method=='DELETE'){
            res=db.deleteTask(req.body);
        }

        if(req.method=='PUT'){
            if(JSON.parse(req.url)=="user"){
                res=db.updateUserDetailes(req.body); //if its true as he managed to add
            }
            if(JSON.parse(req.url)=="task"){
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
