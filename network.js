import {server} from "./server.js"

export function sendAsync(req,callback){
    setTimeout(()=>{
        const server=new server();
        const res= server.hendleRequest(req);
        callback(res);
    }, 3000)
}