<template>
  <span>
   <div class="container marg-2" v-if="check_permission('manageWallet')">
     <div class="row">

       <div class="col-md-11" v-show="paywallet" >
         <Wallet></Wallet>
         <!--<div class="well payment1">-->
           <!--&lt;!&ndash; <img :src="require('@/assets/img/zeedas-png.png')" alt="" class="img-responsive">-->
          <!--<h4>Choose An Option</h4> &ndash;&gt;-->
           <!--<p class="text-right"><button class="btn btn-default" @click="openPayment()">Add Card</button>-->
           <!--<button class="btn btn-default" @click="openAddModule()" data-toggle="modal">Fund Wallet</button>-->
           <!--</p>-->
         <!--</div>-->

        </div>

       </div>

     </div>
     <div v-else>
       <h3
           class="text-center no-projects"
           style="margin-top: 100px;" >
           <i class="icon ion-ios-list-outline"></i>
           <br/>You do not have the permission to view this content.<br><br>

       </h3>
     </div>
   </div>
    <fundModal :show.sync="fundModal" @close="closeFund" />
    <PayDetails :show.sync="showPayment" @close="closePayment"></PayDetails>

 </span>
</template>

<script>
import { mapGetters , mapActions, mapMutations} from 'vuex';
// import AddCard from './addcard';
import Wallet from './mainwallet';
import fundModal from './fundModal';
import PayDetails from './paymentModal';



export default {
    name: 'Profile',

    components: {
        PayDetails,
        Wallet,
        fundModal,
    },
    data(){
      return{
          showPayment: false,
          paywallet:true,
          addCard:false,
          fundModal:false,
          showPayment:false,
      }
    },
    computed: {
        routeName() {
            return this.$route.name;
         },
         ...mapGetters('userCredentials', [
           'user',
           'permissions',
         ]),
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
         openPayment () {
          this.showPayment = true
      },
        closePayment () {
          this.showPayment = false
      },
      closeFund () {
          this.fundModal = false
      },
       openAddModule () {
          this.fundModal = true
      },
      proceedCard(){
        // this.addCard = true;
        // this.paywallet = false;
        this.$router.push({ name: 'fund-wallet' })
      },
        submit() {
          console.log('Happy Happy sis');
        },
        check_permission(rule){
          var state = false;
          this.permissions.forEach((perm)=>{
            if(perm.Permission === rule){
              state = true;
            }
          })
          return state;
        },
    },
    }

</script>

<style scoped>
.well.payment1 button:nth-of-type(1) {
    background: #3369da;
    color: #fff;
    font-family: open sans !important;
}


.well.payment1 button {
    padding: 7px 53px;
    margin-right: 8px;
    font-family: open sans !important;
    border-radius: 1px;
}

.well.payment1 p {
    text-align: center;
}

.well.payment1 h4 {
    margin-bottom: 7%;
    font-weight: 900;
}
.well.payment1 img {
    height: 84px;
}

.well.payment1 {
    display: block;
    text-align: -webkit-center;
    background: #fff;
    border: none;
    box-shadow: 0 2px 15px rgba(0,0,0,0.13);
    margin-top: 7%;
    padding: 39px;
}
</style>
