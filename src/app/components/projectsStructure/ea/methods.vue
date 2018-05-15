<template id="">
        <div>

          <div v-if="module === null" class="text-center" style="padding-top: 70px;">
              <p class="fa fa-folder fa-5x btn-o"></p>
              <p>Select a Module</p>
          </div>
<!-- 07034634717 -->
      <div v-else>
        <div class="row">
          <modChart :module.sync="setModuleId" :details="module"
           @done="done"></modChart>
        </div>
        <div class="row">
          <div class="methods">
            <div class="labels">
              <a href="#" @click.prevent="tab(0)" :class="{'active-tab': dis_tab===0}">
                <label>Methods</label>
              </a>
              <a href="#" @click.prevent="tab(1)" :class="{'active-tab': dis_tab===1}">
                <label>Source File</label>
              </a>
              <a href="#" @click.prevent="tab(2)" :class="{'active-tab': dis_tab===2}">
                <label>Recent Files</label>
              </a>
            </div>
            <div class="content scro">
              <div class="method animated pulse" v-if="dis_tab === 0">
                <div>
                 <div class="">
                   <div class="col-md-12">
                     <div class="panel-group" id="accordion">
            <div class="panel panel-default" v-for="method in module.method" >
            <div class="module-dets">
              <!-- <h4 class="panel-title">
                [{-->
                <!-- {{module}} -->

              <div class="row">
                <div class="col-md-8">
                <p><b>Method Name: {{method.method_name}}</b></p>
              </a>
                   <p class="d-klass">Method Description: {{method.method_action}}</p>
                      <p>Input Parameters: <span v-for="(index,param) in method.input_params">{{showParams(method.input_params)}}</span> </p>
                        <p>Output Parameters: {{method.output_params[0]}}</p>
                </div>
                <div class="col-md-2">
                    <p>Passed: {{method.method_test.filter(t=>t.status==1).length}}</p>
                      <p>Failed: {{method.method_test.filter(t=>t.status==2).length}}</p>
                        <p>Untested: {{method.method_test.filter(t=>t.status==0).length}}</p>
                        <!-- <button class="btn btn-primary">Code</button> -->
                </div>
                <div class="col-md-2">
                    <a  data-toggle="collapse" data-parent="#accordion" class="btn-o"  :href="url(method)">
                  <i  vetical-align="middle"  class="ion-android-arrow-dropdown-circle fa-2x"></i>

                  </a>
                </div>
              </div>
              <!-- </h4> -->
            </div>
            <div :id="method._id" class="panel-collapse collapse">
              <div class="panel-body">
            <!-- {{method}} -->
                  <Reason  :method="method" :done="isComplete" @updateChart="updateChart"></Reason>
              </div>
            </div>


            </div>
            </div>
                   </div>
                 </div>
                       <!-- <LoadingButton v-if="isLoading" align="center" buttonclass="btn btn-default">Saving...</LoadingButton>
                        <button class="btn btn-success" v-else align="center" @click="save()">Save</button> -->
                         <!-- <LoadingButton v-if="loading" align="center" buttonclass="btn btn-default">Loading...</LoadingButton>
                        <button class="btn btn-success" v-else align="center" >Approve</button> -->

             </div>
              </div>
              <div class="source-file animated pulse" v-if="dis_tab === 1">
                <div class="row">
                <div class="col-md-12">
                   <Codes :module_Id="module.Id"></Codes>

                </div>
                </div>
              </div>

              <div class="recent-files animated pulse" v-if="dis_tab === 2">
                <div class="row">
                <div class="col-md-12">
                   <RecentCode :module="module"></RecentCode>

                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Reject :show_reason_modal="show_reason_modal" @closeReasonModal="closeReasonModal" @cancelAction="cancelAction"></Reject>
        </div>
</template>



<script type="text/javascript">
import {
  mapGetters,
  mapActions
} from 'vuex';
import modChart from '@/app/shared/charts/moduleChartEa.vue'
import Reason from '@/app/shared/modals/reject-reason.vue';
import Reject from './reason.vue';
import Codes from './code.vue'
import RecentCode from './recent-code.vue'

  export default {
    props: ['module'],
    components:{Reason,Codes,RecentCode,Reject,modChart},

    data(){
      return {
        show:false,
        selectedMethod:{},
        isLoading:false,
        accordions:[],
        activeTabName:'methods',
        loading:false,
        show_reason_modal:false,
        dis_tab: 0,


      }
    },
    methods:{
          ...mapActions('modules/add',{
        createModule:'createModule'
      }),
            ...mapActions('modules/reject', {
          rejectModule: 'rejectModule',
          rejectReset: 'resetState',
      }),
       ...mapActions('modules/accept', {
          acceptModule: 'acceptModule',
          // rejectReset: 'resetState',
      }),
       ...mapActions('userCredentials', [
          'callWithToken',
      ]),
          cancelAction(){
            this.show_reason_modal = false;
          },
      closeReasonModal(reason){
        // alert();
        this.show_reason_modal = false;
        var self = this;
          var parameters = {extended_time:reason.extendedTime,reason:reason.reason,module_Id:self.module.Id,Id:self.module.developer_Id, method : self.module.method};
          var store = self.rejectModule;
          this.action("This module will be rejected, Do you wish to continue?",
                      "Rejecting module","Module rejected!",parameters,store)

      },
        toPass(){
             var self = this;
        for(var i=0; i<self.module.method.length;i++){
          for(var x = 0 ; x <self.module.method[i].method_test.length; x++){
              if(self.module.method[i].method_test[x].status==0 || self.module.method[i].method_test[x].status==2)
                return false;
          }
        }
        return true;
        }
      ,
      done(){
        if(this.toPass()==true){
          var parameters ={module_Id:this.module.Id}
          var store = this.acceptModule;
          this.action("This module will be accepted, do you wish to continue?","Accepting Module","Module accepted",parameters,store);
        }
        else{
          this.show_reason_modal = true;
        }
      },
      tab(f){
        this.dis_tab = f;
      },

      action(confirmMessage,notificationMessage,successMessage,parameters,store){
         var self = this;

        this.$confirm(confirmMessage, 'Warning', {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
          if(store==self.acceptModule){
            self.save();
          }
           self.loading = true;
              self.$show_notification(notificationMessage,'success',1000);
            self.callWithToken({

                parameters:parameters,
                action: store,
            })
            .then(function (status) {
                self.loading = false;
                if(status){
                  self.updateChart();
                     self.$show_notification(successMessage,'success',1000);
                }
                else{
                   self.$show_notification("An error occured, try again",'error',1000);
                }
            });
        })

      },
       url(method){
        return "#"+method._id;
       },
      save(){
        // alert();
        var self = this;

           self.isLoading = true;
        this.callWithToken({
          parameters: this.module,
          action: this.createModule,
        })
        .then(status => {
          self.isLoading = false;

           self.$show_notification("Saved!",'success',1000);
          this.updateChart();

        })
      },
      updateChart(){
        // alert()
        this.$emit("updateChart");
      },
      showParams(input_params){
        var params = '';
        for(var x = 0 ; x < input_params.length ; x++){
          if(x<input_params.length-1){
            params+=input_params[x]+',';
          }
          else{
            params+=input_params[x]
          }
        }
       return params
      },
      showModal(method){
        this.selectedMethod = method;
        this.show = true;
      },
    },
    computed: {
      setModuleId(){
        return this.module.Id;
      },
      isComplete(){
        if(this.module.status === 3){
          return true;
        }else{
          return false;
        }
        // return false;
      },
    }

  }
</script>

<style scoped>
.methods {
  background-color: #fff;
  margin: 10px;
  width: 100%;
  padding: 5px;
}
.labels {
  margin: 12px;
  text-align: center;
  padding-bottom: 6px;
  border-bottom: 1px solid #D8D8D8;
  margin-bottom: 20px;
}
.active-tab {
  border-bottom: 3px solid #326ADA;
}
.labels a {
  margin: 0 20px;
  padding-bottom: 10px;
  color: #000;
  font-weight: 500;
  line-height: 16px;
}
.labels a label {
  cursor: pointer;
}
.method {
  width: 100%;
}

.btn-o {
  /* color: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%); */
  color: #6a1b9a;

}
.scro {

  height: 400px;
  overflow-y: auto;
}
.scro:hover::-webkit-scrollbar{
    width: 5px;
    transition: all 1s ease;
}
.scro::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
}
.scro::-webkit-scrollbar-thumb {
    border-radius: 50px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
    background-color: #848484;
    transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
}
.scro::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;

    transition: all 1s ease;
}

.module-dets {
	border: 1px solid #979797;
	border-radius: 3px;
  padding: 10px;
	background-color: #FFFFFF;
}
.d-klass {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

</style>
