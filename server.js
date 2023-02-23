import {dataBase} from "./dataBase.js"

export function hendleRequest(req){
    var res;
    if(req.method=='GET'){
       res= dataBase.get(req.url);
    }
    if(req.method=='POST'){
        dataBase.post(req.url,req.body);
    }
    return res;
}
