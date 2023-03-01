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
        return res;
    }
    
    
    delay(ms){
        var start=Date.now(),
        now=start;
        while(now-start<ms){
            now=Date.now();
        }
    }

}