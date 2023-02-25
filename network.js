// import {server} from "./server.js"

// export function sendAsync(req,callback){
//     setTimeout(()=>{
//         const server=new server();
//         const res= server.hendleRequest(req);
//         callback(res);
//     }, 3000)
// }

// export function send(req){
//     req.readyState=1; //server connection established
//     const _server=new server();
//     const res=_server.hendleRequest(req);
//     downloading();
//     return res;
// }


// function delay(ms){
//     var start=Date.now(),
//     now=start;
//     while(now-start<ms){
//         now=Date.now();
//     }
// }

// function downloading(during=3000){
//     console.log("downloading...");
//     delay(during);
//     console.log("finished downloading");
// }

class network{
    sendAsync(req,callback){
        setTimeout(()=>{
            var server=new server();
            const res= server.hendleRequest(req);
            callback(res);
        }, 3000)
    }
    
    send(req){
        req.readyState=1; //server connection established
        var _server=new server();
        const res=_server.hendleRequest(req);
        // this.downloading();
        return res;
    }
    
    
    delay(ms){
        var start=Date.now(),
        now=start;
        while(now-start<ms){
            now=Date.now();
        }
    }
    
    downloading(during=3000){
        console.log("downloading...");
        this.delay(during);
        console.log("finished downloading");
    }
}