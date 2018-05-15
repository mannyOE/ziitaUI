<template>
    <el-dialog :visible="show"
      width="30%"
      :show-close="false"
      :before-close="beforeClose">
        <div slot="title">
            <button type="button" class="close" @click.stop="$_$closeModal">×</button>
        </div>
         <div class="img-centered">
          <img :src="require('@/assets/img/zeedas-png.png')" alt="" class="img-responsive" height="50" width="50"><br>
          <h4>Add Payment Method</h4>
        </div>
     <form action="" class="container-fluid" @submit.prevent="addMyCard">
        <div class="cards-payment">
              <!-- <div class="row"> -->
               <!-- <div class="cards-payment"> -->

                <label for="">Card Number</label>
                <input name="cardNo"
                    v-model="newCard.num"


                    v-validate="'required|min:19|max:24'"
                    type="text"
                    class="form-control text-center"
                    placeholder="" maxlength="24" v-on:input="spaceCard" required/>



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
                            placeholder="MM / YY" maxlength="8" required>



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
                            placeholder="e.g 234" maxlength="3" required/>



                        <FieldError>
                            {{ errors.first('cvv') }}
                        </FieldError>
                    </div>
                </div>

                  <!--  <div class="well"
                       :class="{ 'active': isActiveType(cardType.id) }"
                       v-for="(cardType, index) in $_$cardTypesArray"
                       :key="index"
                       @click="setType(cardType.id)">
                      <img :src="cardType.image" alt="" class="img-responsive ">
                      <h4 class="text-center">Master Card</h4>
                  </div> -->

                    <p>
                    <button  v-if="!loading" class="btn btn-default" style="color: white;" type="submit">Continue</button>
                    <LoadingButton v-else buttonclass="btn btn-default sav-btn-category">Saving...</LoadingButton>
                    </p>
            </div>

           <!-- </div> -->

</form>
        <!-- </div> -->
    </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'pay-member-modal',
    props: ['show'],
    components: {

    },
    data () {
        return {
            newCard: {
                cvv: null,
                num: null,
                expiry: null,
                type: null,
            },
            errormsg: ""
        }
    },
  //    mounted () {
  //     this.fetchWallet()
  // },
  //    destroyed () {
  //       this.$_$destroyedHook()
  //     },
    computed: {
       ...mapGetters('wallet/addCard', [
          'success',
          'error',
          'fieldErrors',
          'loading',
      ]),
       ...mapGetters('userCredentials', [
          'user',
      ]),

    },
    watch: {
        'newCard.expiry': {
            handler: function (val, old) {
              // this.$show_notification('Error');
                // validate card expiry
                const maxChars = 8

                function rejectAddition (scope, value) {
                    scope.newCard.expiry = value.slice(0, -1)
                }

                // if new added character is a number
                if (!isNaN(Number(val[val.length - 1]))) {
                    // format date after first two characters
                    if (val.length === 2) {
                        // only if they are adding new characters
                        if (val.length > old.length){
                            this.newCard.expiry += ' / '
                        }
                    }

                    // limit total characters allowed
                    if (val.length === maxChars) {
                        rejectAddition(this, val)
                    }
                } else {
                    // remove  character if not number
                    rejectAddition(this, val)
                }
            },
            deep: true
        },
        'error': {
            handler: function (val, old) {
              if(!this.loading){
                this.$show_notification(val);
              }
            },
            deep: true
        },
        'success': {
            handler: function (val, old) {
              if(!this.loading){
                this.$show_notification(val);
              }
            },
            deep: true
        },
    },
    methods: {
        beforeClose(done) {
            this.$_$closeModal()
            done();
        },
        ...mapActions('wallet/addCard', [
              'addCard',
              'resetState',
               'setError'
          ]),
        ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      //    ...mapActions('wallet', [
      //   'getWallet',
      // ]),
      spaceCard(){
    const val = this.newCard.num;
     var value = val.replace(/[^\d.]/g, "");
           // var fixed = 2;
            console.log(val);
//           var a = val.replace(/\B(?=(\d{4})+(?!\d))/g, "bb");
//           if(a == "NaN")
//               a = "";
           var a = (value+"")
               .toString()
               .replace(/\B(?=(\d{4})+(?!\d))/g, " ");
            console.log(a);
           this.newCard.num = a;
      },
        setType (type) {
            this.newCard.type = type
        },
        isActiveType (type) {
            return this.newCard.type === type
        },
      newCardPayment () {
            return;
        this.callWithToken({
          parameters: {
            userId: this.user.Id,
          },
          action: this.addCard,
        });
      },
      // makePayment () {
      //   this.callWithToken({
      //     parameters: {
      //       userId: this.user.Id,
      //     },
      //     action: this.getCards,
      //   });
      // },
        // fetchWallet () {
        //         this.callWithToken({
        //           parameters: {
        //             userId: this.user.Id,
        //           },
        //           action: this.getWallet,
        //         });
        //       },


    addMyCard() {
            this.setError("");
            var self = this;
        this.$validator.validateAll().then(result => {
            if (result) {
            // eslint-disable-next-line
            // Set arguments for endpoint
                var x = this.newCard.expiry.split("/");
                let args = {
                    no: this.newCard.num,
                    month: x[0].toString().trim(),
                    // month: this.card.month,
                     year: "20"+x[1].toString().trim(),
                    cvv: this.newCard.cvv,
                    type:this.newCard.type,
                    // Id: this.user.getUser();
                    // teamId: this.userData.Id,
                }

                const self = this;
                this.callWithToken({
                  parameters: args,
                  action: this.addCard,
                })
                .then(function (status) {
                    if (status) {
                      // Reload categories on success
                        self.reloadStore()
                        self.$_$closeModal()

                    }
                });
                return;
            }
        });
    },

    },
};
</script>


<style scoped>
.btn-default{
    background: #FF346F !important;
    color: #fff !important;
    text-transform: uppercase;
    border: none !important;
    border-radius: 4px !important;
}
.cards-payment input {
    margin-bottom: 8%;
    height: 49px;
    /*width: 305px !important;*/
    font-weight: 900 !important;
}
.cards-payment {
    /* margin-top: 6%; */
    padding: 14px;
}
.cards-payment h4 {
    color: #3369da;
    margin-bottom: 15%;
}
.cards-payment label {
    text-align: -webkit-left !important;
    display: block;
}

.cards-payment {
    display: block;
    text-align: -webkit-center;
}

.cards-payment img {
    width: 100px;
}
.row.marg-to-3 {
    margin-top: 4%;
    margin-bottom: 2%;
}
.cards-payment button {
    background: #3b6ddb;
    border: none;
    /* width: 30%; */
    margin-top: 7%;
    padding: 7px 43px;
    border-radius: 1px;
}
.img-centered{
  display: block;
  text-align: -webkit-center;
}
</style>
