import axios from 'axios';
import Vue from 'vue'
 // export const API = 'http://localhost:8000/'
// <<<<<<< Updated upstream
var port = '';
//port = 8000; //test
//port = 8001; //demo
//port = 8002; //live
var hostname = location.hostname;
var protocol = "";
hostname = hostname.toLowerCase();
if(hostname == "ziita.com" || hostname == "www.ziita.com"){
    port = 8002;
    protocol = "https://";
}else if(hostname == "demo.ziita.com"){
    port = 8001;
    protocol = "https://";
}else if(hostname == "localhost.com"){
    port = 3000;
    protocol = "http://";
    hostname = "localhost";
}else{
    hostname = "test.ziita.com";
    port = 8000;
}


 // export const API = "https://"+hostname+":"+port+"/";
export const API = "http://localhost:"+port+"/";


console.log("Connecting API: "+ API);

Vue.prototype.$API = API;

export var HOST = 'https://127.0.0.1:8080/#/';
export var blackAxios = axios.create({
  baseURL: API
});

// module.exports = {
//     API: API,
//     blackAxios: defAxios,
// };
