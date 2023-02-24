// import {dataBase} from "./dataBase.js"

// export function hendleRequest(req){
//     var db=new dataBase();
//     req.readyState=2; //request received
//     var res;
//     if(req.method=='GET'){
//        res= db.get(req.url,req.body);
//     }
//     if(req.method=='POST'){
//         if(JSON.parse(req.body).type=="user"){
//             db.register(req.url,req.body);
//         }
//         if(JSON.parse(req.body).type=="meeting"){
//             db.addNewMeeting(req.url,req.body);
//         }
        
//     }
//     return res;
// }

class server{
    hendleRequest(req){
        var db=new dataBase();
        req.readyState=2; //request received
        var res;
        if(req.method=='GET'){
           res= db.get(req.body);
        }
        if(req.method=='POST'){
            if(JSON.parse(req.body).type=="user"){
                res=db.register(req.body); //if its true as he managed to add
            }
            if(JSON.parse(req.body).type=="add_meeting"){
                res=db.addNewMeeting(req.body);  //if its true as he managed to add
            }
            if(JSON.parse(req.body).type=="userSignIn"){
                res=db.signIn(req.body);
            }
             
        }
        if(req.method=='DELETE'){
            res=db.deleteMeeting(req.body);
        }
        if(res){
            req.status=200;
        }else{
            req.status=400;
        }
        return res;
    }
}
