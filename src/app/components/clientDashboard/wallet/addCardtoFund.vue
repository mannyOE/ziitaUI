

<template>


    <div class="well fsystem">
        <div v-if="cards.length">
            <div v-for="card in cards">
                <div class="well pay-well-modal">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="media">
                            <div class="media-left">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/MasterCard_early_1990s_logo.svg/200px-MasterCard_early_1990s_logo.svg.png" class="media-object" style="width:60px">
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading" style="font-size: 16px !important;" >XXX XXX XX{{card.cardNo}}</h4>
                                <p>{{user.first_name+" "+user.last_name}}</p>
                                <!-- <small><i class="ion-ios-clock"></i>Created at 8th-01-2017</small> -->
                            </div>
                            </div>
                            <p class="text-right">
                                <button class="btn btn-primary btn-continues" @click="nextStep(card.cardNo)"><i class="ion-ios-arrow-thin-right"></i></button>
                            </p>
                        </div>



                    </div>
                </div>
            </div>
        </div>
        <div class="well text-center" style="color: blue" v-else="show_new_card = true">
          No Registered Cards for this account, Please Add Card.
        </div>


         <p class="text-right next-button">
            <button class="btn btn-default" @click="goBack">
                Back
            </button>
           <!--  <button class="btn btn-default" @click="nextStep">
                Next&nbsp;
                    <i class="ion-ios-checkmark finish-checkmark"></i>
            </button> -->
        </p>
      </div>

</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "fund Amount",
  // props: ["projectId"],
  components: {
  },

  data() {

    return {
        show_new_card: false

    }
  },
  mounted (){
      this.fetchCards()
  },
  computed: {
      // ...mapGetters('modules/all', [
      //   'modules',
      //   'loading',
      //   'error',
      // ]),
        ...mapGetters('userCredentials', [
            'user',
        ]),
        ...mapGetters('wallet/getCards', [
            'cards',
        ]),

  },
  methods: {
    // ...mapActions('modules/all', [
    //     'getModules',
    //     'resetState'
    // ]),
    ...mapActions('userCredentials', [
        'callWithToken',
    ]),
    ...mapActions('wallet/getCards', [
        'getCards',
    ]),

    fetchCards(){
         this.callWithToken({
          parameters: {
            userId: this.user.Id,
          },
          action: this.getCards,
        });
    },


    beforeClose(done) {
        this.$_$closeModal()
        done();
    },
     goBack () {
        this.$emit('back')
    },

    nextStep (card) {
        this.$emit('next',card)
        // this.$emit('cardNo',card)
        // this.$show_notification(card)
        return
    },
  },
};
</script>

<style scoped>
    .media-heading{

    }
.btn-default{
    border: 1px solid #326ada;
    color: #326ada;
    text-transform: uppercase;
}
    .btn-default:hover{
        border: 1px solid #326ada;
        color: #326ada;
        text-transform: uppercase;
        background: #fff !important;
    }
.well.fsystem {
    background: #fff;
    border: none;
    padding: 10px;
    margin-bottom: 0px;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
}
.pay-well-modal {
    background: #fff;
    border: 1px solid #ddd;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    padding: 18px 21px 2px;
}
.btn-continues {
    border-radius: 50%;
    border: none;
    position: absolute;
    top: 15%;
    background: #FF346F !important;
    font-weight: 900 !important;
    right: -5%;
    color: #fff;
    padding: 5px 10px;
}


</style>
