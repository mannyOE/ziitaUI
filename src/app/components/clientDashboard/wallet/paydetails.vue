<template>

       
    <div class="well fsystem">
      <form action="">
        <label for="">Reciever Acc No</label>
        <input type="text" class="form-control" placeholder="e.g 2333122212312">
      </form>

        
         <p class="text-right next-button">
            <button class="btn btn-default" @click="goBack">
                Back
            </button>
            <button class="btn btn-default" @click="nextStep">
                Next&nbsp;
                    <i class="ion-ios-checkmark finish-checkmark"></i>
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
  methods: {
    // ...mapActions('modules/all', [
    //     'getModules',
    //     'resetState'
    // ]),
    // ...mapActions('userCredentials', [
    //     'callWithToken',
    // ]),

  
    beforeClose(done) {
        this.$_$closeModal()
        done();
    },
     goBack () {
        this.$emit('back')
    },
    
    nextStep () {
        this.$emit('next')
        return
    },
  },
};
</script>

<style scoped>

.well.fsystem {
    background: #fff;
    border: none;
    box-shadow: none !important;
}
</style>
