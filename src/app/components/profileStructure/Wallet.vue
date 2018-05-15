<template>

  <div id="menu3" class="tab-pane fade animated fadeInUp" :class="{'active in': routeName === 'wallet'}">
    <div class="col-md-8">
      <div class="well personal-well">
        <p class="person f-weight-6">Wallet Transaction</p>
        <i class="icon ion-ios-arrow-right step-size18 float-right"></i>
      </div>
      <div class="well wallet">
        <div class="row">
          <div class="col-md-6">
            <!-- <h3><b>&#8358;</b></h3> -->
            <div class="well earns">
              <div class="row">
                <div class="col-md-5">
                  <p class="naiar-divider">
                    <b class="ion-social-usd float-left"></b>
                  </p>
                </div>
                <div class="col-md-7">
                  <div class="text-right earns-text">

                    <h4 class="f-weight-6">2,5000,0000</h4>
                    <p class="f-weight-6">Earnings</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="col-md-6">
            <div class="well earns">
              <div class="row">
                <div class="col-md-5">
                  <p class="naiar-divider">
                    <i class="icon ion-ios-albums float-left-second"></i>
                  </p>
                </div>

                <div class="col-md-7">
                  <div class="text-right earns-text">

                    <h4 class="f-weight-6">50000</h4>
                    <p class="f-weight-6">Payouts</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="well balance ">
          <div class="row">
            <div class="col-md-6">
              <h4 class="text-left f-weight-6">
                <b class="txt-small">Balance</b>{{ wallet.balance }}</h4>
            </div>

            <div class="col-md-6" >
              <p class="text-right req_pay_out">
                <button class="btn btn-default">REQUEST PAYOUT</button>
              </p>
            </div>

          </div>
        </div>
        <h4 class="f-weight-7">Payout History</h4><br>
        <table class="table table-hover ">
          <thead>
            <tr>
              <th class="text-left">Amount</th>
              <th class="text-center">Discription</th>
              <th class="text-center">Payment Method</th>
              <th class="text-right">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-left f-s-12">2,000,000</td>
              <td class="text-center f-s-12">Mobilization For Projects</td>
              <td class="text-center f-s-12">Bank Transfer</td>
              <td class="text-right f-s-12">2nd oct 2017</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// import { date } from '@/filters/date.js';
// import { checkUser } from '@/utils';


export default {
    name: 'wallet',
    mounted () {
        this.callWithToken({
          parameters: {
            id: this.user.Id,
          },
          action: this.getWallet,
        });
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
        ...mapGetters('userCredentials', [
            'user',
        ]),
        routeName() {
            return this.$route.name;
        },
    },
    methods: {
      ...mapActions('wallet', [
        'getWallet',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
      reloadstore (type, id) {
          const args = {
            id: this.user.Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getProjects,
              reloadArgs: args
          })
      },
    },
};
</script>

<style>

</style>
