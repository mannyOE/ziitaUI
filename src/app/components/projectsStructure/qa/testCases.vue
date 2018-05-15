<template id="">
        <div v-if="module === null" class="text-center" style="padding-top: 70px;">
            <p class="fa fa-folder fa-5x" :style="{color: colors[0]}"></p>
            <p>Select a Module</p>
        </div>
        <div class="" v-else>
          <div class="row">
            <modChart :module.sync="setModuleId" :details="module"
             @approve="approveMod" @reject="rejectMod"></modChart>
          </div>
          <div class="row tests">
            <p class="col-md-2">TESTS</p>
            <div class="pull-right" style="margin-top: -10px;">
              <button class="btn-o btn fa fa-plus pull-right" v-if="!isComplete" @click.stop="openNewCaseModal"></button>
              <select class="form-control" style="width: 100px;" :id="module.Id" @change="filterTests">
                <option value="all">All</option>
                <option v-for="(opt, index) in statusOptions" :key="index" :value="index">{{opt}}</option>
              </select>
            </div>
            <p class="pull-right" style="margin-right: 5px; font-size: 12px;">Sort Tests: </p>
          </div>
          <div class="row scro">
            <table class="col-md-12">
                <thead >
                <tr style="text-indent: 30px; height: 50px;">
                    <th>
                        Test Case
                    </th>
                    <th>
                      Test Acceptance
                    </th>
                    <th>
                      Status
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr class="team-tr" v-for="(mod, dura) in current">
                  <td>{{mod.case}}</td>
                  <td> <div style="width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{mod.acceptance|| '--'}}</div> </td>
                  <td><select  :style="{color: '#000', width: 100+'px'}" :disabled="isComplete"
                    class="form-control" :id="mod._id" @change="changeState(dura)">
                    <option v-for="(opt, index) in statuses"
                    :value="index" :key="index"
                    :selected="mod.status === index"
                    >{{opt}}</option>
                  </select></td>
                </tr>
                <tr class="team-tr" v-if="current.length < 1">
                  <td colspan="3" class="text-center">No Tests in this category! </td>
                </tr>

                </tbody>
            </table>
          </div>
          <newCase :show="newCase" :module="module" @refresh="refresh" @close="closeNewCaseModal"></newCase>
        </div>
</template>



<script type="text/javascript">
import newCase from './new_case.vue'
import modChart from '@/app/shared/charts/moduleChart.vue'
import {
  mapGetters,
  mapActions
} from 'vuex';

  export default {
    props: ['module'],
    components: {newCase,modChart},
    data(){
      return {
        statusOptions: ['Passed', 'Failed', 'Untested', 'Retest','Pending'],
        colors: ["#6a1b9a","#d32f2f","#f0a04e", "#20c0de", "#ab0f55"],
        newCase: false,
        showing: null,


      }
    },
    methods: {
      refresh(){
        this.$emit('refresh');
      },
      approveMod(mod){
        var self = this;
        this.$confirm('Are you sure you want to approve this module?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
          self.$emit('sick', mod,1);
        })
        .catch(() => {});
      },
      rejectMod(mod){
        var self = this;
        this.$confirm('Are you sure you want to reject this module?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
          console.log('rejected');
          self.$emit('sick', mod,0);
        })
        .catch(() => {});
      },
      deleteCase(index){
        var self = this;
        this.$confirm('Are you sure you want to delete this test case?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
          self.module.test.splice(index,1);
          self.$emit('delete', self.module);
        })
        .catch(() => {});
      },
      openNewCaseModal(){
        this.newCase = true;
      },
      closeNewCaseModal(){
        this.newCase = false;
      },
      filterTests(){
        var filter = document.getElementById(this.module.Id).value;
        if(filter === 'all'){
          var selected = this.module.test;
          this.showing = selected;
        }else{
          var selected = this.module.test.filter(e=>e.status === Number(filter));
          this.showing = selected;
        }
      },
      changeState(index){

        this.current[index].status = Number(document.getElementById(this.current[index]._id).value);
        this.$emit('change', {
          test: this.current, Id: this.setModuleId
        });
      }
    },
    computed: {
      current(){
        if(this.showing == null){
          return this.module.test;
        }else{
          return this.showing;
        }
      },
      ...mapGetters('qualityAssurance', [
        'mods',
        'stats',
        'loading',

      ]),
      isComplete(){
        if(this.stats.modules.filter(e=>e.module === this.module.Id)[0].completed){
          return true;
        }else{
          return false;
        }
      },
      setModuleId(){
        return this.module.Id;
      },
      color(){
        return this.colors;
      },
      statuses(){
        return this.statusOptions;
      }
    },
    mounted(){
      // this.$emit('refresh');
    }
  }
</script>

<style scoped>
.team-tr{
    padding-top: 15px !important;
    padding-left: 15px !important;
    padding-right: 15px;
    color: #453F3F;
    font-family: Montserrat;
    font-size: 14px;
    height: 50px;
    text-indent: 30px;
    background-attachment: fixed;
}
.team-tr:hover{
    background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
    box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
    color: #fff;
    border-radius: 5px;
    background-attachment: fixed;
}
.accept {
  width: 50px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tests {
  /* padding: 0px 0 14px 70px; */
  /* border-top: 1px solid #D8D8D8; */
  border-bottom: 1px solid #D8D8D8;
  width: 104%;
  color: #4A4A4A;
  /* margin: 0px 0 0 -14px;
  font-size: 14px;*/
  height: 35px;
  padding-left: 40px;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;

}
.pull-right {
  color: #D8D8D8;
  line-height: 18px;
  font-size: 14px;
}
.btn-o {
  background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  color: #fff;

}
.scro {

  height: 350px;
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
</style>
