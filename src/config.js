/* eslint-disable*/
import axios from 'axios';
import Vue from 'vue'
var port = '3000';
var protocol = '';
var hostname = location.hostname;
hostname = hostname.toLowerCase();
//sdsds
hostname = "18.221.93.144";
protocol = hostname !== "localhost"?"http://":"https://";

// if(hostname === 'localhost'){
//   port = '3000';
//   protocol = 'http://';
// }else{
//   port = '3000';
//   hostname = '18.221.93.144';
//   protocol = 'http://';
// }


export const API = protocol+hostname+":"+port+"/";

console.log("Connecting API: "+ API);

Vue.prototype.$API = API;

// export var HOST = 'https://127.0.0.1:8080/#/';
export var blackAxios = axios.create({
  baseURL: API
});
