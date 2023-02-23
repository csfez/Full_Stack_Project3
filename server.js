import {dataBase} from "./dataBase.js"

export function hendleRequest(req){
    req.readyState=2; //request received
    var res;
    if(req.method=='GET'){
       res= dataBase.get(req.url,req.body);
    }
    if(req.method=='POST'){
        if(JSON.parse(req.body).type=="user"){
            dataBase.register(req.url,req.body);
        }
        if(JSON.parse(req.body).type=="meeting"){
            dataBase.addNewMeeting(req.url,req.body);
        }
        
    }
    return res;
}
