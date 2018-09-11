import NoContentError from './shared/noContentError'
import LoadingBar from './shared/loading'
import LoadingButton from './shared/loadingButton'
import Modal from './shared/modal'
import MemberCard from './shared/cards/memberCard'
import HideField from './shared/hideField'
import Notifications from 'vue-notification'
import PrettyCheckbox from 'pretty-checkbox-vue';
import loading from '@/app/shared/loading';



// import Spinner from './shared/loading'
//import IntroJs from 'intro.js'
var introJs = require("intro.js");

// Filters
import savageMoment from './filters/savMoment'

// Constants
import {
  userTypesArray,
  userTypes,
  userStatusTypesArray,
  userStatusTypes,
  projectTypes,
  projectStatusTypes,
  cardTypesArray,
} from '@/constants'

// Helper functions
import {
  closeModal,
  cheekyReloadStore,
  destroyedHook,
  getUserTypeName,
  getUserStatusName,
  getUserStatusMessage,
  isUserSuspended,
  isUserDeleted,
} from '@/app/helpers'


/**
 * You can register global components here and use them as a plugin in your main Vue instance
 */

const GlobalComponents = {
  install (Vue) {
    Vue.component('LoadingBar', LoadingBar)
    Vue.component('LoadingButton', LoadingButton)
    Vue.component('MemberCard', MemberCard)
    Vue.component('HideField', HideField)
    Vue.component('Loading', loading)
    Vue.use(PrettyCheckbox);
    // Vue.component('Spinners', Spinner)
    Vue.use(Notifications);

    // Adding helpers to vue instance with $_$ to avoid clashes
    // Constants
    Vue.prototype.$_$userTypes = userTypesArray
    Vue.prototype.$_$userTypesObject = userTypes

    Vue.prototype.$_$userStatusTypesArray = userStatusTypesArray
    Vue.prototype.$_$userStatusTypesObject = userStatusTypes

    Vue.prototype.$_$projectTypes = projectTypes
    Vue.prototype.$_$projectStatus = projectStatusTypes

    Vue.prototype.$_$cardTypesArray = cardTypesArray

    // helper functions
    Vue.prototype.$_$closeModal = closeModal
    Vue.prototype.$_$cheekyReloadStore = cheekyReloadStore
    Vue.prototype.$_$destroyedHook = destroyedHook

    Vue.prototype.$_$getUserTypeName = getUserTypeName
    Vue.prototype.$_$getUserStatusName = getUserStatusName
    Vue.prototype.$_$getUserStatusMessage = getUserStatusMessage

    Vue.prototype.$_$isUserSuspended = isUserSuspended
    Vue.prototype.$_$isUserDeleted = isUserDeleted

    Vue.prototype.$show_notification = function(msg, type, duration){
      var data = {type: type || "success", title: msg};
      if(duration)
        data.duration = duration;

      Vue.prototype.$notify(data)
    };

    Vue.prototype.$print = function(){
      if (process.env.NODE_ENV === 'development') {
        console.log(arguments)
      }
    };

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
    Vue.prototype.$introJs = introJs;


    // Filters
    Vue.filter('savageMoment', savageMoment)
  }
}

export default GlobalComponents
