<template>
    <el-dialog :visible="show"
      width="30%" 
      :show-close="false" 
      :before-close="beforeClose">
        <div slot="title">
            <button type="button" class="close" @click.stop="$_$closeModal">×</button>
        </div>
    
        <div class="cards-payment">
            <img :src="require('@/assets/img/zeedas-png.png')" alt="" class="img-responsive">
            <h4>Zeedas Fund</h4>
            <BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
            <form  @submit.prevent="addCard">
            <label for="">Select Card</label>
             <select type="text" class="form-control" placeholder="2000" name="card" v-model="transaction.card">
              <option v-for="(card, index) in cards" :key="index">{{ card.name }}</option>
             </select>
             
            <div class="row">
                <div class="col-md-6">
                     <label for="">Card Type</label>
                    <input type="text" placeholder="Card Type" name="type" v-model="transaction.type">
                   <!--   <FieldError>
                        {{ errors.first('name') || fieldErrors.category_name }}
                    </FieldError> -->
                </div>
                 <div class="col-md-6">
                    <label for="">Amount</label>
                    <input type="text" class="form-control" placeholder="e.g 233" name="amount" v-model="transaction.amount">
                </div>
            </div>
            <p >
                <input v-if="!loading" class="btn btn-primary" type="submit" value="Confirm" />
                   
                 <!-- <button class="btn btn-primary "></button> -->
                <LoadingButton v-else buttonclass="btn btn-primary ">Saving...</LoadingButton>
            </p>
               </form>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
    name: 'pay-member-modal',
    props: ['show'],
    components: {
       
    },
    mounted () {
      this.fetchWallet()
    },
  destroyed () {
        this.$_$destroyedHook()
      },
    data () {
        return {
            transaction:{
              amount:'',
              type:'',
              card:[]
            }
        }
    },
    computed:{
       ...mapGetters('wallet/fund', [
          'success',
          'error',
          'fieldErrors',
          'loading',
      ]),
       ...mapGetters('wallet', [
        'wallet',
        'loading',
        'error',
      ]),

       ...mapGetters('userCredentials', {
          'user',
      }),
    },
    methods: {
        beforeClose(done) {
            this.$_$closeModal()
            done();
        },
        ...mapActions('wallet/fund', [
              'fundWallet',
              'resetState',
          ]),
        ...mapActions('userCredentials', [
          'callWithToken',
      ]),
        ...mapActions('wallet', [
        'getWallet',
      ]),
      fetchWallet () {
              this.callWithToken({
                parameters: {
                  userId: this.user.Id,
                },
                action: this.getWallet,
              });
            },
 
    addCard() {
        this.$validator.validateAll().then(result => {
            if (result) {
            // eslint-disable-next-line
            // Set arguments for endpoint
                let args = {
                   amount: this.transaction.amount,
                   type: this.transaction.type,
                    card: this.transaction.card,
                    // cvv: this.card.cvv,
                    // teamId: this.userData.Id,
                }

                const self = this;
                this.callWithToken({
                  parameters: args,
                  action: this.fundWallet,
                })
                .then(function (status) {
                    if (status) {
                      // Reload categories on success
                        self.reloadStore()
                        self.$_$closeModal()
                    } else {
                    }
                });
                return;
            }
        });
    },  
    clearFields() {
          this.transaction = {
               amount:'',
              type:'',
              card:null,
            }
      },
        reloadstore (type, id) {
          const args = {
            userId: this.user.Id, // clients team id
          }
          this.$emit('reloadStore', 'addCard')
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getWallet,
              reloadArgs: args
          })
      },
      
    },
};
</script>


<style scoped>

.cards-payment input {
    margin-bottom: 8%;
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
</style>