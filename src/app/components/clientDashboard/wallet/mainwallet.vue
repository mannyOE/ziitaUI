<!--<template>-->



      <!--<div class="well wallet">-->
        <!--<div class="cards-paymentx">-->
          <!--<img :src="require('@/assets/img/zeedas-png.png')" alt="" class="img-responsive">-->
        <!--<h4>Wallet History</h4>-->
        <!--</div>-->
        <!--<div class="row">-->
          <!--<div class="col-md-6">-->
            <!--&lt;!&ndash; <h3><b>&#8358;</b></h3> &ndash;&gt;-->
            <!--<div class="well earns">-->
              <!--<div class="row">-->
                <!--<div class="col-md-5">-->
                  <!--<p class="naiar-divider">-->
                    <!--<b class="float-left">₦</b>-->
                  <!--</p>-->
                <!--</div>-->
                <!--<div class="col-md-7">-->
                  <!--<div class="text-right earns-text">-->

                    <!--<h4 class="f-weight-6">₦ {{ round(wallet.balance) || 0}}</h4>-->
                    <!--<p class="f-weight-6" style="font-weight: bolder;">Balance</p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->

          <!--</div>-->
          <!--<div class="col-md-6">-->
            <!--<div class="well earns">-->
              <!--<div class="row">-->
                <!--<div class="col-md-5">-->
                  <!--<p class="naiar-divider">-->
                    <!--<b class="float-left ion-card"></b>-->
                  <!--</p>-->
                <!--</div>-->

                <!--<div class="col-md-7">-->
                  <!--<div class="text-right earns-text">-->

                    <!--<h4 class="f-weight-6">₦ {{ round(wallet.pending) || 0 }}</h4>-->
                    <!--<p class="f-weight-6" style="font-weight: bolder;">Bill</p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->

        <!--&lt;!&ndash; <div class="well balance ">-->
          <!--<div class="row">-->
            <!--<div class="col-md-6">-->
              <!--<h4 class="text-left f-weight-6">-->
                <!--<b class="txt-small">Balance</b> {{ round(wallet.balance) }}</h4>-->
            <!--</div>-->

            <!--<div class="col-md-6 pull-right" >-->
              <!--<p class="text-right req_pay_out">-->
                <!--<button class="btn btn-default">REQUEST PAYOUT</button>-->
              <!--</p>-->
            <!--</div>-->

          <!--</div>-->
        <!--</div> &ndash;&gt;-->
         <!--&lt;!&ndash; <div class="well balance ">-->
          <!--<div class="row">-->
            <!--<div class="col-md-6">-->
              <!--<h4 class="text-left f-weight-6">-->
                <!--<b class="txt-small">Subscription Status: </b> {{ team.length }}</h4>-->
            <!--</div>-->

            <!--<div class="col-md-6 pull-right" >-->
              <!--<p class="text-right req_pay_out">-->
                <!--<button class="btn btn-default" @click="OpenSubs()">Subscribe</button>-->
              <!--</p>-->
            <!--</div>-->

          <!--</div>-->
        <!--</div> &ndash;&gt;-->
        <!--<h4 class="f-weight-7">Transactions</h4><br>-->
        <!--<div v-if="transactions.length">-->
        <!--<table class="table table-hover">-->
          <!--<thead>-->
            <!--<tr>-->
              <!--<th class="text-left">Amount</th>-->
              <!--<th class="text-center">Description</th>-->
              <!--<th class="text-center">Payment Method</th>-->
              <!--<th class="text-right">Date</th>-->
            <!--</tr>-->
          <!--</thead>-->
          <!--<tbody>-->
            <!--<tr v-for="(transaction, index) in transactions" :key="index">-->
              <!--<td class="text-left f-s-12" v-html="round(transaction.amount)"></td>-->
              <!--<td class="text-center f-s-12">{{ transaction.tag }}</td>-->
              <!--<td class="text-center f-s-12">{{ transaction.type }}</td>-->
              <!--<td class="text-right f-s-12" v-html="intuit(transaction.updated)"></td>-->
            <!--</tr>-->
          <!--</tbody>-->
        <!--</table>-->
        <!--<div v-show="pages > 1" align=center>-->
          <!--<button class="btn" @click="prevTransactions" v-show="transactionPage > 1"><i class="fa fa-caret-left"></i> Previous</button>-->
          <!--<button class="btn btn-primary" v-show="transactionPage < pages" @click="nextTransactions">Next <i class="fa fa-caret-right"></i></button>-->
        <!--</div>-->
        <!--</div>-->
        <!--<h3 v-else class="text-center no-projects">-->
            <!--&lt;!&ndash; <i class="icon ion-ios-list-outline"></i> &ndash;&gt;-->
            <!--<br/>No transactions yet.-->
        <!--</h3>-->
        <!--<Spinners :show="loader"></Spinners>-->
      <!--</div>-->


<!--</template>-->

<template>
    <div class="row" >

      <div class="col-xs-12" >
        <div class="row" style="margin-top: 40px;">
          <div class="col-xs-4" >
            <p class="wall">WALLET</p>
          </div>
          <div class="col-xs-4" >
            <div class="rec-1" >
              <div class="row" >
                <div class="col-xs-7" >
                  <small class="tet">Current Balance</small><br>
                  <b class="tem"> {{ round(wallet.balance) || 0}}</b>
                </div>
                <div class="col-xs-5" >
                  <div >
                    <img src="../../../../assets/img/Group 4.png" >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-4" >
            <div class="rec-1" >
              <div class="row" >
                <div class="col-xs-7" >
                  <small class="tet">Total Expenses</small><br>
                  <b class="tem">{{ round(wallet.pending) || 0 }}</b>
                </div>
                <div class="col-xs-5" >
                  <div  >
                    <img src="../../../../assets/img/Group 5.png" >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-xs-12" style="border-top: 1px solid #D8D8D8; margin-top: 65px; min-height: 450px;">
        <div class="row " >
          <div class="col-xs-4 " style="border-right: 1px solid #d8d8d8; min-height: 450px;">

            <div class="row" >
              <div class="col-xs-12 top-1" >
                <b class="my-exp">My Cards</b>
              </div>
              <div class="col-xs-12" style="padding: 15px 40px; ">
                <div class="row" >
                  <div class="col-xs-6" >
                    <p class="tot-crds">4 CARDS</p>
                  </div>
                  <div class="col-xs-6" >
                    <small class="new-card" >NEW CARD</small>
                    <button class="btn new-btn" @click="openPayment()">
                      <i class="ion-plus-round" ></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-xs-12 each-card">
                <div class="cards" >
                  <div class="row" >
                    <div class="col-xs-12" >
                      <small class="l-txt" >Card Number</small><br>
                      <small class="b-txt" >**** **** **** 0956</small>
                    </div>
                    <div class="col-xs-8" >
                      <small class="l-txt" >Valid Through</small><br>
                      <small class="b-txt" >09/20</small>
                    </div>
                    <div class="col-xs-4" >
                      <img src="../../../../assets/img/visa.png" height="30" style="margin-top: +10px;" >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-8 ">

            <div class="row" >
              <div class="col-xs-12 top-2" >
                <div class="col-xs-9" style="padding: 7px;">
                  <b class="my-exp" >My Expenses</b>
                </div>
                <div class="col-xs-3" >
                  <button class="btn fund-wall" @click="openAddModule()">FUND WALLET</button>
                </div>
              </div>

              <div class="col-xs-12 expense-container" >
                <div class="row" >
                  <div class="col-xs-12 each-expense" v-for="(transaction, index) in transactions" :key="index">
                    <div class="expense" >
                      <div class="col-xs-2 " >
                        <img src="../../../../assets/img/Group 7.png" >
                      </div>
                      <div class="col-xs-7" style="padding: 15px 25px;">
                        <p class="top">{{ transaction.tag }}</p>
                        <p class="time" v-html="intuit(transaction.updated)">Received- </p>
                      </div>
                      <div class="col-xs-3" style="padding: 31px 45px;">
                        <p class="money-in" v-html="round(transaction.amount)">  </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <!--<div class="col-xs-12 each-expense" >-->
                <!--<div class="expense" >-->
                  <!--<div class="col-xs-2 up-dw" ></div>-->
                  <!--<div class="col-xs-7" style="padding: 15px 25px;">-->
                    <!--<p class="top">Purchase of Domain name</p>-->
                    <!--<p class="time">Purchased- 1 Hour Ago</p>-->
                  <!--</div>-->
                  <!--<div class="col-xs-3" style="padding: 31px 45px;">-->
                    <!--<p class="money-out" >-₦10 000</p>-->
                  <!--</div>-->
                <!--</div>-->
              <!--</div>-->

            </div>
          </div>
        </div>
      </div>
      <PayDetails :show.sync="showPayment" @close="closePayment"></PayDetails>
      <fundModal :show.sync="fundModal" @close="closeFund" />
    </div>
</template>

<script>
    import fundModal from './fundModal';
import PayDetails from './paymentModal';
import { mapGetters, mapActions } from 'vuex';
// import { date } from '@/filters/date.js';
// import { checkUser } from '@/utils';


export default {
    name: 'wallet',
    components:{
        PayDetails,
        fundModal,
    },
    data(){
      return{
        showSubscription:false,
        payAll: false,
        paySome: false,
        transactionPage: 1,
        loader: true,
          showPayment: false,
          fundModal:false,
      }
    },
    mounted () {
      this.fetchWallet();
      this.fetchTransactions();

    },
    destroyed () {
      this.$_$destroyedHook(['remResetState'])
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters('wallet', [
        'wallet',
        'loading',
        'error',
      ]),
      ...mapGetters('wallet/bill', [
        'biller',
        'loading',
        'error',
      ]),
      ...mapGetters('wallet/getTransactions', [
        'transactions',
        'loading',
        'error',
        'pages'

      ]),
        ...mapGetters('userCredentials', [
            'user',
        ]),
        routeName() {
            return this.$route.name;
        },
        ...mapGetters('team', [
          'team',
        'loading',
        'error',
      ]),
    },
    methods: {
      ...mapActions('wallet', [
        'getWallet',
      ]),
      ...mapActions('wallet/getTransactions', [
        'getTransactions',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
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
      fetchWallet () {
        this.callWithToken({
          parameters: {
            userId: this.user.Id,
          },
          action: this.getWallet,
        });
      },
      fetchTransactions () {
        this.loader= true;
        this.callWithToken({
          parameters: {
            userId: this.user.Id,
            page: this.transactionPage
          },
          action: this.getTransactions,
        }).then(res=>{
          this.loader = false;
        });
      },

      reloadstore (type, id) {
          const args = {
            userId: this.user.Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getWallet,
              reloadArgs: args
          })
      },
      prevTransactions(){
        this.transactionPage = this.transactionPage-1;
        this.fetchTransactions();
      },
      nextTransactions(){
        this.transactionPage = this.transactionPage+1;
        this.fetchTransactions();
      },
      round(amt){
        console.log(Number(amt)/1000);
        if(Number(amt) < 1000){
          return '₦' + Number(amt).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        return '₦' + (Number(amt)/1000).toFixed(2) + 'k';

      },
      intuit(dt){
        var days = (Math.abs(Date.now()-dt)/36e5)/24;
        if(days<7){
          if(days > 1){
            return Math.floor(days)+" days ago";
          }else{
            return Math.floor(days * 24)+" Hours ago";
          }

        }else{
          if(days < 31){
            // weeks ago
            return Math.floor(days/7)+' weeks ago';
          }else{
            if(days < 365 ){
              // months ago
              return Math.floor(days/31)+' months ago';
            }else{
              // years ago
              return Math.floor(days/365)+' years ago';
            }
          }
        }

      },
    },
};
</script>

<style scoped>
  .expense-container{
    overflow-y: overlay !important;
    height: 400px;
  }
  .expense-container:hover::-webkit-scrollbar{
    width: 5px;
    transition: all 1s ease;
  }
  .expense-container::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
  }
  .expense-container::-webkit-scrollbar-thumb {
    border-radius: 50px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
    background-color: #848484;
    transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
  }
  .expense-container::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;

    transition: all 1s ease;
  }
  .money-in{
    color: #4A4A4A;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
  }
  .money-out{
    color: #FB3640;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
  }
  .top{

    color: #4A4A4A;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 600;
  }
  .time{

    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 600;
  }
  .up-dw{
    border-radius: 3px 0 0 3px;
    background: linear-gradient(47.47deg, #326ADA 0%, #53A0FD 47.52%, #FFFFFF 150%);
    height: 85px;
  }
  .expense{
    border-radius: 3px 0 0 3px;
    height: 85px;
    background: #fff;
  }
  .each-expense{
    padding-top: 32px;
    padding-bottom: 30px;
    padding-left: 26px;
    border-bottom: 1px solid #D8D8D8;
  }
  .l-txt{
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 11px;
    font-weight: 500;
    line-height: 15px;
  }.b-txt{
       color: #4A4A4A;
       font-family: Montserrat;
       font-size: 14px;
       font-weight: 600;
     }
  .each-card{
    padding: 15px 40px;
    border-bottom: 1px solid #D8D8D8;
  }
  .cards{
    height: 117px;
    /*width: 245px;*/
    border-radius: 5px;
    background-color: #FFFFFF;
    box-shadow: 0 10px 30px 0 rgba(50,106,218,0.05);
    padding: 15px 20px;
  }
  .new-btn{
    height: 24px;
    width: 24px;
    background-color: #F72F61;
    box-shadow: 0 2px 4px 0 rgba(255,104,104,0.5);
    border-radius: 100%;
    color: #fff;
    font-size: 16px;
    padding: 2px;
  }
  .new-card {
    height: 14px;
    width: 75px;
    color: #9B9B9B;
    font-family:Montserrat;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 3px;
    line-height: 14px;
    text-align: center;
  }
  .tot-crds{
    color: #9B9B9B;
    font-family: montserrat;
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }
  .fund-wall{
    height: 39px;
    width: 113px;
    border-radius: 3px;
    background-color: #FF346F;

    color: #FFFFFF;
    font-family: Montserrat;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 0.09px;
    float: right;
  }
  .fund-wall:hover{
    box-shadow: 0 10px 30px 0 rgba(50,106,218,0.2);
  }
  .my-exp{
    color: #4A4A4A;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: bold;

  }
  .top-1{
    border-bottom: 1px solid #D8D8D8;

    padding: 18px 73px;
  }
  .top-2{
    border-bottom: 1px solid #D8D8D8;
    padding: 8px 40px 9px 20px;
  }
  .blue-rec{
    height: 58px;
    width: 58px;
    border-radius: 10px;
    background: linear-gradient(47.47deg, #326ADA 0%, #53A0FD 47.52%, #FFFFFF 150%);
  }
  .tem{

    color: #4A4A4A;
    font-family: Montserrat;
    font-size: 30px;
    font-weight: 600;
    text-align: left;
  }
  .tet{
    /*height: 19px;*/
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 500;
    /*line-height: 19px;*/
    text-align: left;
  }
  .rec-1{
    padding: 20px;
    height: 102px;
    width: 293px;
    border-radius: 3px;
    background-color: #FFFFFF;

  }
  .rec-1:hover{
    box-shadow: 0 10px 30px 0 rgba(50,106,218,0.1);
  }
  .wall{
    color: #9B9B9B;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: bold;
    line-height: 19px;
    text-align: center;
    margin-top: 40px;
  }
.well.wallet {
    background: #fff;
    border: none;
    margin-top: 7%;
    padding: 32px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.14);
}
.cards-paymentx {
    display: block;
    text-align: -webkit-center;
}

.cards-paymentx img {
    width: 100px;
}
.well.earns p {
    margin-top: 10px;
}

.well.earns b {
    font-size: 28px;
    padding: 5px 14px;
    border-radius: 50%;
    border: 1px solid green;
}

.well.earns i {
    font-size: 28px;
    color: #000000;
    border: 1px solid #3369da;
    border-radius: 50%;
    padding: 5px 14px;
}
.well.balance h4 {
    font-size: 15px;
}
.well.balance {
    background: #fff;
    border: none;
    box-shadow: 0 2px 15px rgba(0,0,0,0.14);
    padding: 10px 27px;
}
.well.balance button {
    background: #3369da;
    color: #fff;
    font-size: 12px;
    margin-top: 3px;
}
.well.earns {
    background: #fff;
    border: none;
    box-shadow: 0 2px 15px rgba(0,0,0,0.14);
}

.cards-paymentx h4 {
  color: #3369da;
    margin-bottom: 10%;
}
h4.f-weight-7 {
    font-size: 17px;
    margin-top: 9%;
    margin-bottom: 0%;
}
</style>
