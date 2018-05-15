<template>


    <div class="well fsystem">
     	<form action="">
     		<label for="">Amount</label>
     		<input type="text" class="form-control text-center" placeholder="Amount e.g #5000" v-model="fund.amount" v-on:input="preventKey" v-on:blur="addBar" >
     	</form><br>


         <p class="text-right next-button">
            <!-- <button class="btn btn-default" @click="goBack">
                Back
            </button> -->
            <button class="btn btn-default" @click="nextStep">
                Next&nbsp;
                    <i class="ion-checkmark-round "></i>
            </button>
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
    	fund:{
    		amount:null
    	}
    }
  },

  computed: {
      // ...mapGetters('modules/all', [
      //   'modules',
      //   'loading',
      //   'error',
      // ]),
      //   ...mapGetters('userCredentials', [
      //       'user',
      //   ]),
  },
    //  watch: {
    //     'fund.amount': {
    //         handler:
    //         deep: true
    //     },
    // },
  methods: {
    // ...mapActions('modules/all', [
    //     'getModules',
    //     'resetState'
    // ]),
    // ...mapActions('userCredentials', [
    //     'callWithToken',
    // ]),
   preventKey(oldval, newval){
   	console.log(oldval);
   	var newval = this.fund.amount;
   		 var value = newval.replace(/[^\d.]/g, "");
           this.fund.amount = value;
           // var fixed = 2;
           // var a = ne.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
           // if(a == "NaN")
               // a = 0;
           // var a = parseFloat(value).toFixed(fixed)
               // .toString()
               // .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   },
  addBar(){
  	const val = this.fund.amount;
  	 var value = val.replace(/[^\d.]/g, "");
  		   var fixed = 2;
           var a = val.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
           if(a == "NaN")
               a = 0;
           var a = parseFloat(value).toFixed(fixed)
               .toString()
               .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
           this.fund.amount = a;
  	},

    beforeClose(done) {
        this.$_$closeModal()
        done();
    },
     goBack () {
        this.$emit('back')
    },

    nextStep () {
        if(this.fund.amount === null){
          this.$show_notification("Please Enter a Valid Amount", "error");
        }else{
          this.$emit('next',this.fund.amount)
          return
        }
    },
  },
};
</script>

<style scoped>
.btn-default{
    background: #FF346F !important;
    color: #fff !important;
    border: 1px solid #FF346F !important;
    text-transform: uppercase !important;
}
.well.fsystem {
    background: #fff;
    border: none;
    padding: 10px;
    margin-bottom: 0px;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
}
</style>
