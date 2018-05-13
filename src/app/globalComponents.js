import Spinner from './shared/loading'
//import IntroJs from 'intro.js'
var introJs = require("intro.js");
import Error from './shared/errorReport'
import Success from './shared/successReport'





// Helper functions
import {
  closeModal,
} from '@/app/helpers'


/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('Spinner', Spinner)
    Vue.component('Error',Error)
    Vue.component('Success',Success)
    

    // Adding helpers to vue instance with $_$ to avoid clashes
    // Constants
   

    // helper functions
    Vue.prototype.$_$closeModal = closeModal
    
    Vue.prototype.$format_time = function(seconds){
      var sec_num = seconds;
      var days   = Math.floor(sec_num / (3600 * 24));
      var hours   = Math.floor((sec_num - (days * 3600 * 24)) / 3600);
      var minutes = Math.floor((sec_num - ((days * 3600 * 24) + (hours * 3600))) / 60);
      var seconds = Math.floor(sec_num - (days * 3600 * 24) - (hours * 3600) - (minutes * 60));

      var str = "";
      if(days > 1){
          str = days+" days ";
      }else if(days == 1){
        str = days+" day ";
      }

      if(hours > 0){
        str += hours+" hr ";
      }else if(days > 0){
        str += hours+" hr ";
      }

      return str+minutes+" min "+seconds+" sec";
    };
  }
}

export default GlobalComponents
