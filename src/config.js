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
port = 2300;
//sdsds
// var protocol = "";

// if(hostname == "18.221.93.144"){
//     port = 3000;
//     protocol = "http://";
// }else{
//     protocol = "http://";
//     hostname = "localhost";
//     port = 3000;
// }

 export const API = 'http://'+hostname+":"+port+"/";

 // export const API = "https://"+hostname+":"+port+"/";
// export const API = "http://localhost:"+port+"/";

//console.log(process.env.LOCAL);

console.log("Connecting API: "+ API);

Vue.prototype.$API = API;

// export var HOST = 'https://127.0.0.1:8080/#/';
Vue.prototype.blackAxios = axios.create({
  baseURL: API
});

export var blackAxios = axios.create({
  baseURL: API
});

// module.exports = {
//     API: API,
//     blackAxios: defAxios,
// };
