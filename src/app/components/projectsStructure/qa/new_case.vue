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
              <h4 class="">Add A New Test Case</h4>
              <div role="form">
                <div class="form-group">
                  <input type="text" name="" v-model="caseTitle" class="form-control" placeholder="Test Case Title">
                </div>
                <div class="form-group">
                  <input type="text" name="" v-model="caseOutcome" class="form-control" placeholder="Test Acceptance">
                </div>
                <button class="btn btn-md btn-primary form-button" :disabled="disableSubmit" @click="submitCase">Submit</button>
                <button class="btn btn-md btn-success form-button" @click="closeModal">Cancel</button>
              </div>
            </div>
            <div class="col-xs-2">

            </div>
            <spinner :show="load"></spinner>
          </div>
   </el-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import spinner from './loader.vue'

export default {
  name: "add-test-case",
  props: ["show","module"],
  components: {
    spinner
  },
  data() {
    return {
      statusOptions: ['Passed', 'Failed', 'Untested', 'Retest','Pending'],
      caseStatus: '',
      caseTitle: '',
      caseOutcome: '',
      load: false,
    };
  },

  computed: {
    disableSubmit(){
      if(this.caseTitle.length > 5 && this.caseOutcome.length > 10){
        return false;
      }else{
        return true;
      }
      // console.log(this.caseOutcome.length);
    },
      ...mapGetters('userCredentials', [
          'user'
      ]),
      ...mapGetters('qualityAssurance', [
        'mods',
        'loading',

      ])

  },
  watch: {
      'error': {
          handler: function (val, old) {
            val.forEach(mod=>{
              this.updatePassed(mod);
              this.total = this.total + mod.test.length;
              this.getChartData();
            });
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

      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      ...mapActions('qualityAssurance', [
          'postCase',
          'resetState'
      ]),
      closeModal(){
        this.$emit("close");
      },
      submitCase(){
        this.load=true;
        var namd = 0;
        if(this.module.test.length > 0){
          if(this.module.test[this.module.test.length - 1].testId !== undefined){
            namd = Number(this.module.test[this.module.test.length - 1].testId.split('-')[1]) + 1;
          }
        }
        var disTest = {
          testId: this.caseTitle.substring(0,2).toUpperCase()+'-'+namd,
          case: this.caseTitle,
          acceptance: this.caseOutcome,
          status: 4,
        };
        this.module.test.push(disTest);
        this.callWithToken({
        parameters: {
          Id: this.module.Id, // clients team id
          test: this.module.test,
        },
        action: this.postCase,
      }).then((state)=>{
        if(state){
          this.$show_notification("Done");
          this.$emit('refresh');
          this.caseTitle = '';
          this.caseOutcome = '';
          this.load = false;
        }else{
          this.$show_notification("Failed");
          this.$emit('refresh');
          this.caseTitle = '';
          this.caseOutcome = '';
        }
      });
      // this.resetState();

      },
    beforeClose(done) {
        this.$_$closeModal()
        done();
    },
  }

};
</script>

<style scoped>

#myModald .modal-dialog {
    width: 880px !important;
}

input#test-input {
  width: 100%;
  float: left;
  margin-right: 5px;
}




.btn.btn-md.bg-pink.btn-input-params {
    border-radius: 50%;
}


.float-right {
  float: right;
}

.col-blue {
  color: #728eaa;
}

.personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.well.filter button {
  color: #728eaa;
  font-weight: 500;
}

/*.allItems{
    display: none;
}*/

.well.filter input {
  margin-bottom: 7%;
}

.filter {
  background: #326ada;
  margin-top: 13%;
  color: white;
  border-radius: 1px;
  font-weight: 300 !important;
  z-index: 1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}
.el-tabs--card>.el-tabs__header .el-tabs__item{
    width:50% !important;
}


.tab-pane ul.nav {
  margin-top: 1% !important;
}
.tab-content {
    margin-top: 9%;
}

td.text-center.option i {
  margin-left: 11px;
}

.output-table {
  margin-top: 14%;
}

.filled {
  color: #6a86a5;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 10px;
  line-height: 1.42857143;
  vertical-align: to;
  border-top: 1px solid #eaeaea;
}








.txt-small {
  font-size: 13px;
  margin-left: 3px;
  font-weight: 100;
}



.f-s-12 {
  font-size: 12px;
}

.btn-danger {
  background: #ff0000;
}

.f-weight-3 {
  font-weight: 300;
}

.f-weight-6 {
  font-weight: 400;
}

.f-weight-7 {
  font-weight: 500;
}
.form-control{
  margin: 10px;
  width: 100%;
}





.next-button button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}


.modal-header {
  padding: 30px;
  border-bottom: 1px solid rgba(229, 229, 229, 0);
}


.f-size-12 {
  font-size: 12px;
}
.mbody{
  padding-bottom: 5%;

}
.form-button {
  margin-top: 10px
}




.f-size-13 {
  font-size: 13px;
  font-weight: 100;
}


/* .nav-side-nav {
    /* position: fixed; */

/* left: 20px;
    height: 200px;
} */
</style>
