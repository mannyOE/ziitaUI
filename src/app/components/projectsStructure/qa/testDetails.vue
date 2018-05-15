<template>
    <el-dialog :visible="show"
      width="28%"
      :show-close="false"
      :before-close="beforeClose">

        <!-- Modal content-->
          <div slot="title">
            <button type="button" class="close" data-dismiss="modal" @click.stop="$_$closeModal">&times;</button>
          </div><br>
          <div class="row">
            <div class="col-xs-2">

            </div>
            <div class="text-center col-xs-8 mbody">
              <h4 class="">Test Case Details</h4>
              <div role="form">
                <div class="form-group">
                  <label>Test Case:</label><br>
                  <b v-html="test.case"></b>
                </div>
                <div class="form-group">
                  <label>Expected Outcome:</label><br>
                  <b v-html="test.expectedOutcome"></b>
                </div>
                <div class="form-group">
                  <label>Test Status:</label><br>
                  <b v-html="getStatus(test.status)"></b>
                </div>
                <div class="form-group">
                  <label>Comment:</label>
                  <textarea v-model="test.outcome" name="name" rows="8" class="form-control"></textarea>
                </div>
                <button class="btn btn-md btn-primary" @click="submit">Submit</button>
                <button class="btn btn-md btn-default" @click="close">Cancel</button>
              </div>
            </div>
            <div class="col-xs-2">
            </div>
          </div>
   </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "view-test-case",
  props: ["show","test","index"],
  components: {
  },
  data() {
    return {
      statusOptions: ['Passed', 'Failed', 'Untested', 'Retest','Pending'],

    };
  },
  computed: {
    ...mapGetters('qualityAssurance', [
      'mods',
      'loading',
    ])
  },
  methods: {
    beforeClose(done) {
        this.$_$closeModal()
        done();
    },
    setStat(status){
      var t = this.statusOptions;
      t.splice(status, 1);
      return t;
    },
    getStatus(index){
      return this.statusOptions[index];
    },
    ...mapActions('qualityAssurance', [
        'postCase',
        'resetState'
    ]),
    submit(){
      if(this.test.outcome.length !== 0){
        this.$emit('save', this.test, this.index);
      }else{
        this.$show_notification("Please add a comment to submit", 'warning');
      }
    },
    close(){
      this.$emit('close');
    }

  }

};
</script>

<style scoped>
.mbody{
  padding-bottom: 5%;

}
</style>
