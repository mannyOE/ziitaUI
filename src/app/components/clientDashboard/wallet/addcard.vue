<!-- <template>
   <div class="container marg-2 add-a-card">
     <div class="row">
       
       <div class="col-md-6 col-md-offset-3">
                <label for="">Amount</label>
                <input type="text" class="form-control" placeholder="">
        <div class="well previouscards">
            
             <div class="media">
              <div class="media-left">
                <img :src="require('@/assets/img/zeedas-png.png')"  class="media-object" style="width:40px ; height:40px;">
              </div>
              <div class="media-body">
                <h4 class="media-heading move-down">Choose From Previous Card</h4>
               
              </div>
            </div>


            <div class="row">
            <p v-if="!cards.length">No saved cards</p>
            <div v-for="(card, index) in cards" :key="index">
                <div class="col-md-9">
                    <div class="media">
                    <div class="media-left">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/MasterCard_early_1990s_logo.svg/200px-MasterCard_early_1990s_logo.svg.png" class="media-object" style="width:60px">
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">XXX XXX XX{{ card.cardNo }}</h4>
                        <p>{{ card.name }}</p>
                        <p>{{ card.created_time }}</p>
                    </div>
                    </div>
                    
                </div>
                <div class="col-md-3">
                    <button class="btn btn-primary" @click.stop="makePayment">Continue</button>
                </div>
            </div>
        </div>
        -<h4 v-else class="text-center no-projects">
             <i class="icon ion-ios-list-outline"></i>
            <br/>No Cards yet.
        </h4>
        </div>
        
         <div class="well payment">
          <div class="media">
              <div class="media-left">
                <img :src="require('@/assets/img/zeedas-png.png')"  class="media-object" style="width:40px ; height:40px;">
              </div>
              <div class="media-body">
                <h4 class="media-heading  move-down">Add A Card</h4>
               
              </div>
            </div>
           <div class="row">
               <div class="cards-payment">
                <label for="">Card Number</label>
                <input name="cardNo"
                    v-model="newCard.num"
                    v-validate="'required|integer|min:16|max:16'"
                    type="text" 
                    class="form-control" 
                    placeholder="">

                <FieldError>
                    {{ errors.first('cardNo') }}
                </FieldError>

                <div class="row">
                    <div class="col-md-6">
                        <label for="">Expires</label>
                        <input name="expiry"
                            v-model="newCard.expiry"
                            v-validate="'required'"
                            type="text" 
                            class="form-control" 
                            placeholder="MM / YY">

                        <FieldError>
                            {{ errors.first('expiry') }}
                        </FieldError>
                    </div>
                    <div class="col-md-6">
                        <label for="">CVV</label>
                        <input name="cvv"
                            v-model="newCard.cvv"
                            v-validate="'required|integer|min:3|max:3'"
                            type="text" 
                            class="form-control" 
                            placeholder="e.g 234">

                        <FieldError>
                            {{ errors.first('cvv') }}
                        </FieldError>
                    </div>
                </div>


                   <div class="well" 
                        :class="{ 'active': isActiveType(cardType.id) }"
                        v-for="(cardType, index) in $_$cardTypesArray" 
                        :key="index" 
                        @click="setType(cardType.id)">
                       <img :src="cardType.image" alt="" class="img-responsive ">
                       <h4 class="text-center">Master Card</h4>
                   </div>
                </div>
              
           </div>
           <p class="text-right"><button class="btn btn-default" @click.stop="goBack">Back</button>
           <button class="btn btn-default" @click.stop="newCardPayment">Continue</button></p>
         </div> 
       
        </div>
       
       </div>
      
     </div>
   </div>
</template> -->
<template>
   <div class="container marg-2 add-a-card">
     <div class="row">
       
       <div class="col-md-6 col-md-offset-3">
                <label for="">Amount</label>
                <input type="text" class="form-control" placeholder="">
        <div class="well previouscards">
            
             <div class="media">
              <div class="media-left">
                <img :src="require('@/assets/img/zeedas-png.png')"  class="media-object" style="width:40px ; height:40px;">
              </div>
              <div class="media-body">
                <h4 class="media-heading move-down">Choose From Previous Card</h4>
               
              </div>
            </div>


            <div class="row">
            <p v-if="!cards.length">No saved cards</p>
            <div v-for="(card, index) in cards" :key="index">
                <div class="col-md-9">
                    <div class="media">
                    <div class="media-left">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/MasterCard_early_1990s_logo.svg/200px-MasterCard_early_1990s_logo.svg.png" class="media-object" style="width:60px">
                    </div>
                    <div class="media-body">
                        <h4 class="media-heading">XXX XXX XX{{ card.cardNo }}</h4>
                        <p>{{ card.name }}</p>
                        <p>{{ card.created_time }}</p>
                    </div>
                    </div>
                    
                </div>
                <div class="col-md-3">
                    <button class="btn btn-primary" @click.stop="makePayment">Continue</button>
                </div>
            </div>
        </div>
        </div>
        
         <div class="well payment">
          <!-- <div class="media">
              <div class="media-left">
                <img :src="require('@/assets/img/zeedas-png.png')"  class="media-object" style="width:40px ; height:40px;">
              </div>
              <div class="media-body">
                <h4 class="media-heading  move-down">Add A Card</h4>
               
              </div>
            </div> -->
         
           <p class="text-right"><button class="btn btn-default" @click.stop="goBack">Back</button>
          </p>
         </div> 
       
        </div>
       
       </div>
      
     </div>
   </div>
</template>

<script>
// import { mapGetters , mapActions } from 'vuex';



// export default {
//     name: 'add-existing-card',
//     mounted () {
//       this.fetchWallet()
//       this.fetchCards()
//     },
//     destroyed () {
//       this.$_$destroyedHook(['remResetState'])
//     },
//     data () {
//         return {
//             newCard: {
//                 cvv: null,
//                 num: null,
//                 expiry: null,
//                 type: null,
//             },
//         }
//     },
//     computed: {
//       // mix the getters into computed with object spread operator
//       // ...mapGetters('wallet', [
//       //   'wallet',
//       //   'loading',
//       //   'error',
//       // ]),
//       ...mapGetters('wallet/getCards', [
//         'cards',
//         'loading',
//         'error',
//       ]),
//        // ...mapGetters('wallet/deleteCard', {
//        //    deleteLoading: 'loading',
//        //  }),
//         ...mapGetters('userCredentials', [
//             'user',
//         ]),
//         routeName() {
//             return this.$route.name;
//          },
//         // ...mapGetters('wallet/getCards', [
//         //     'cards',
//         //     'loading',
//         //     'error',
//         // ]),
//         // ...mapGetters('userCredentials', [
//         //     'user',
//         // ]),
//     },
//     watch: {
//         'newCard.expiry': {
//             handler: function (val, old) {
//                 // validate card expiry
//                 const maxChars = 8

//                 function rejectAddition (scope, value) {
//                     scope.newCard.expiry = value.slice(0, -1)
//                 }

//                 // if new added character is a number
//                 if (!isNaN(Number(val[val.length - 1]))) {
//                     // format date after first two characters
//                     if (val.length === 2) {
//                         // only if they are adding new characters
//                         if (val.length > old.length){
//                             this.newCard.expiry += ' / '
//                         }
//                     }

//                     // limit total characters allowed
//                     if (val.length === maxChars) {
//                         rejectAddition(this, val)
//                     }
//                 } else {
//                     // remove  character if not number
//                     rejectAddition(this, val)
//                 }
//             },
//             deep: true
//         },
//     },
//      methods: {
//         // ...mapActions({
//         //     editUser: "auth/editUser"
//         // }),
//         // checkUser,
//         goBack(){
//             this.$router.push({ name: 'wallet' })
//         },
//         submit() {
//           console.log('Happy Happy sis');
//         },
//         ...mapActions('wallet/getCards', [
//             'getCards',
//             'resetState'
//         ]),
//         ...mapActions('userCredentials', [
//             'callWithToken',
//         ]),
//         setType (type) {
//             this.newCard.type = type
//         },
//         isActiveType (type) {
//             return this.newCard.type === type
//         },
//       newCardPayment () {
//         this.callWithToken({
//           parameters: {
//             userId: this.user.Id,
//           },
//           action: this.getCards,
//         });
//       },
//       makePayment () {
//         this.callWithToken({
//           parameters: {
//             userId: this.user.Id,
//           },
//           action: this.getCards,
//         });
//       },
//       fetchWallet () {
//         this.callWithToken({
//           parameters: {
//             userId: this.user.Id,
//           },
//           action: this.getCards,
//         });
//       },
//     },
//     methods: {
//       ...mapActions('wallet', [
//         'getWallet',
//       ]),
//       ...mapActions('wallet/getCards', [
//         'getCards',
//         'resetState'
//       ]),
//         ...mapActions('wallet/deleteCard', {
//           deleteCard: 'deleteCard',
//           remResetState:  'resetState',
//         }),
//       ...mapActions('userCredentials', [
//         'callWithToken',
//       ]),
//       fetchWallet () {
//         this.callWithToken({
//           parameters: {
//             userId: this.user.Id,
//           },
//           action: this.getWallet,
//         });
//       },
//       fetchCards () {
//         this.callWithToken({
//           parameters: {
//             userId: this.user.Id,
//           },
//           action: this.getCards,
//         });
//       },
//        removeCard (id, index) {
//         const functionArgs = {
//             id: id, // id
//             index: index, // index in array
//           }
//         const self = this;

//         this.$confirm('Are you sure you want to delete this card?', 'Warning', {
//           confirmButtonText: 'Yes, I\'m sure',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         })
//         .then(() => {
//             self.callWithToken({
//               parameters: functionArgs,
//               action: self.deleteCard,
//             })
//             .then(function (status) {
//                 if(status) {
//                     self.reloadStore('deleteCard', id);
//                 } else {
//                 }
//             });
//         })
//         .catch(() => {});
//       },
//       reloadstore (type, id) {
//           const args = {
//             userId: this.user.Id, // clients team id
//           }
//           this.$_$cheekyReloadStore({
//               vm: this,
//               type: type,
//               authenticate: this.callWithToken,
//               loadId: id,
//               reloadAction: this.getWallet,
//               reloadArgs: args
//           })
//       },
//     },
// };
import { mapGetters , mapActions } from 'vuex';



export default {
    name: 'add-card',
    components: {
       
    },
    data () {
        return{

        }
    },
    mounted () {
      this.callWithToken({
        parameters: {
          teamId: this.user.Id, // clients team id
        },
        action: this.getCards,
      });
    },
    destroyed () {
        this.$_$destroyedHook(['remResetState'])
      },
    computed: {
        routeName() {
            return this.$route.name;
         },
       ...mapGetters('wallet', [
        'wallet',
        'loading',
        'error',
      ]),
        ...mapGetters('wallet/getCards', [
            'newCard',
            'loading',
            'error',
        ]),
        ...mapGetters('userCredentials', [
            'user',
        ]),
    },
    
     methods: {
        // ...mapActions({
        //     editUser: "auth/editUser"
        // }),
        // checkUser,
         // ...mapActions('wallet', [
         //    'getWallet',
         //  ]),
        goBack(){
            this.$router.push({ name: 'wallet' })
        },
        submit() {
          console.log('Happy Happy sis');
        },
        ...mapActions('wallet/getCards', [
            'getCards',
            'resetState'
        ]),
        ...mapActions('userCredentials', [
            'callWithToken',
        ]),
       reloadStore (type, id) {
          const args = {
            userId: this.user.Id,
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getCards,
              reloadArgs: args
          })
      },
      // fetchWallet () {
      //   this.callWithToken({
      //     parameters: {
      //       userId: this.user.Id,
      //     },
      //     action: this.getCards,
      //   });
      // },

 },
}

</script>

<style scoped>


.well.previouscards button {
    /* width: auto; */
    padding: 6px 20px;
    background: #fff;
    color: #000;
}

.well.previouscards {
    background: #fff;
    border: none;
    padding: 21px 28px;
    margin-top: 8%;
    box-shadow: 0 2px 15px rgba(0,0,0,0.12);
}
.well.payment {
    background: #fff;
    border: none;
    box-shadow: 0 2px 15px rgba(0,0,0,0.15);
}
.well.payment img {
    height: 50px;
    width: 120px;
    margin-top: 15%;
}
.well.payment .well {
    background: #fff;
    border: none;
    display: inline-block;
    /* padding: 22px 22px; */
    /* margin-top: 8%; */
    /* box-shadow: 0 2px 15px rgba(0,0,0,0.12); */
    /* border-radius: 1px; */
    cursor: pointer;
    /* height: 156px; */
    box-shadow: none;
    /* border: 1px solid #ddd; */
    /* box-shadow: 0 2px 15px rgba(0,0,0,0.12); */
}

.well.payment .well.active {
    background: #fff;
    border: 1px solid #ddd;
}

.well.payment img {
    height: 50px;
    width: 60px;
    margin-bottom: 15%;
    margin-top: 15%;
}
.well.payment .well h4 {
    background: #e8e8e8a6;
    font-size: 13px;
    padding: 5px;
    /* color: #3369da; */
    border-radius: 50px;
    margin-top: 24px;
}
.well.payment button:nth-of-type(2) {
    background: #3369da;
    color: #fff;
}

.well.payment button {
    padding: 7px 41px;
    margin-right: 2%;
    margin-top: 6%;
}
h4.media-heading.move-down {
    margin-top: 3%;
    margin-bottom: 9%;
    font-size: 15px;
}
</style>
