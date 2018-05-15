<template>
   <div class="container">
    
     <div class="row">
       
       <div class="col-md-6 col-md-offset-3">
         <div class="well config-well" data-toggle="collapse" data-target="#personal-details_repoview" aria-expanded="false">
            <p class="person f-weight-6">Repository</p>
            <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
        </div>
        <RepoView></RepoView>
         <div class="well config-well" data-toggle="collapse" data-target="#personal-details_config2" aria-expanded="false">
            <p class="person f-weight-6">Server Configuration</p>
            <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
        </div>
       <serverconfig2></serverconfig2>   
       
        </div>
       
       </div>
      
     </div>
   </div>
</template>

<script>
import { mapGetters , mapActions, mapMutations} from 'vuex';
import serverconfig2 from './terminal.vue';
import RepoView from './viewRepo'

export default {
    name: 'config2repo',
    components: {
        serverconfig2,
        RepoView,
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
        submit() {
          console.log('Happy Happy sis');
        },
    },
    }

</script>

<style scoped>
.well.config-light-well {
    border: none;
    box-shadow: none;
    border-radius: 1px;
}
div#personal-details_config {
    background: #fff;
    padding: 36px;
    border: none;
    border-radius: 1px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
}
.button-layered-configuration button {
    padding: 7px 66px;
    border-radius: 1px;
}
.button-layered-configuration {
    text-align: center;
    margin-top: 8%;
}
.well.config-well {
    background: #fff;
    border: none;
    padding: 18px 24px 10px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
}
.well.config-well i{
    float: right;
    margin-top: -1% !important;
    font-size: 21px;
}
div#personal-details_repo {
    background: #fff;
    border: none;
    padding: 38px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.12);
}
.repo-marg button {
    width: 100%;
    color: #3369da;
}
.repo-marg{
    margin-top: 3%;
}
</style>
