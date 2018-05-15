import axios from 'axios';
import Vue from 'vue'
 // export const API = 'http://localhost:8000/'
// <<<<<<< Updated upstream
var port = '';
//port = 8000; //test
//port = 8001; //demo
//port = 8002; //live
var hostname = location.hostname;
hostname = hostname.toLowerCase();
//sdsds
var protocol = hostname !== "localhost.com"?"https://":"http://";

if(hostname == "zeedas.com" || hostname == "www.zeedas.com"){
    port = 8002;
}else if(hostname == "demo.zeedas.com"){
    port = 8001;
}else{

    hostname = "localhost";
    port = 3000;
}

 export const API = protocol+hostname+":"+port+"/";

 // export const API = "https://"+hostname+":"+port+"/";
// export const API = "http://localhost:"+port+"/";

//console.log(process.env.LOCAL);

console.log("Connecting API: "+ API);

Vue.prototype.$API = API;

// export var HOST = 'https://127.0.0.1:8080/#/';
export var blackAxios = axios.create({
  baseURL: API
});

// module.exports = {
//     API: API,
//     blackAxios: defAxios,
// };
