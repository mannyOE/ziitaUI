<template>
  <span>
  <div class="well config-personal" id="personal-details_config" v-show="launchterminal">
      <div class="well config-light-well">
          <div class="row">
              <div class="col-md-4">
                  <p>CONFIG NAME</p>
              </div>
              <div class="col-md-8">
                  <input type="text" class="form-control">
              </div>
          </div>
      </div>
      
      <div class="button-layered-configuration">
           <button class="btn btn-default" @click="openterminal">Launch Terminal</button> <button class="btn btn-default">Upload Config file</button>
      </div>
     
  </div> 
  <terminal v-show="termianl"></terminal>    
  </span>
</template>
 <script>
    import { mapGetters , mapActions, mapMutations} from 'vuex';
import terminal from './terminal.vue';
import RepoView from './serverconfig'

export default {
    name: 'server-config2',
   
    components: {
        terminal,
        RepoView,
    },
    data(){
      return{
       termianl:false,
       launchterminal:true,
      }
    },
    computed: {
        routeName() {
            return this.$route.name;
         },
        // ...mapGetters('auth',[
        //   'id',
        //   'user',
        //   'userType'
        // ]),
        // data() {
        // return {
        // user: {
        //     firstName:'',
        //     lastName:'',
        //     email:'',
        //     phone:''
        //     },
        // };
        //  data() {
        // return {
        //     user: {
        //         type: 'default',
        //         firstName: '',
        //         lastName: '',
        //         email: '',
        //         bio: '',
        //     },
        // };
  

    },

    // methods: {
    //     ...mapMutations(['editUser']),
    //     ...mapActions('user' ['editUser' ]),
    //     checkUser,

    //     submit() {
    //     const toast = this.$refs.toast;
    //     const self = this;
    // //  console.log(this.user, "login");

    //     return this.editUser(user)
    //     .then(data => {
    //       if (data) {
    //         toast.showToast("Save Was Successfull", {
    //           theme: "success",
    //           time: 3000
    //         });
    //          console.log("login");
    //         self.showCreateBtn = true;
    //       }

    //     })
    //     .catch(error => {
    //       console.log("Cant Save Changes", error);
    //       if (error) {
    //         toast.showToast("Cant Save Changes ,Email Has Been Previously Used", {
    //           theme: "error",
    //           time: 3000
    //         });

    //       }
    //       return null;
    //     });
    // },
     //    }
    //   }
     methods: {
        // ...mapActions({
        //     editUser: "auth/editUser"
        // }),
        // checkUser,
        openterminal(){
          this.termianl = true;
          this.launchterminal = false;
        },
        // openserver_newrepo(){
        //   this.serverconfig2 = true;
        //   this.category = false;
        // },
        submit() {
          console.log('Happy Happy sis');
        },
    },
    }

  </script>
  <style>
    .well.config-light-well {
    border: none;
    box-shadow: none;
    border-radius: 1px;
}




.button-layered-configuration button {
    padding: 9px 62px;
    border-radius: 1px;
}
.button-layered-configuration {
    text-align: center;
    margin-top: 8%;
}
  </style>