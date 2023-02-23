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
                db.register(req.body);
            }
            if(JSON.parse(req.body).type=="meeting"){
                db.addNewMeeting(req.body);
            }
            
        }
        return res;
    }
}
