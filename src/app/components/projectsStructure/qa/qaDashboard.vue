<template>
    <div class="zeedas-project-actitity">
        <div class="container">
          <mainChart :modules.sync="mods" v-if="mods"></mainChart>
          <div class="mods">
            Modules
          </div>
          <!-- <div class="d-rest">


            </div> -->


            <div class="d-res">
              <div class="nav-side col-md-3">
                <ModuleNav :modules.sync="mods"
                @push="loadReam"></ModuleNav>
              </div>
              <div class="body-side col-md-7">

                <testCases
                @sick="completesMod"
                @refresh="fetchModules"
                @delete="deleteCase"
                @change="update"
                :module.sync="currentModule"></testCases>
              </div>
            </div>
          </div>

        </div>
</template>

<script type="text/javascript">
import mainChart from '@/app/shared/charts/overallChart.vue'
import testCases from './testCases.vue'
import ModuleNav from './nav.vue'
import spinner from './loader.vue'

import {
  mapGetters,
  mapActions
} from 'vuex';
  export default {
    components: {
      mainChart,
      testCases,
      ModuleNav,
      spinner
    },
    data() {
        return {
          currentModule: null,
          total: 0,
          load: false,
        }
    },
    mounted () {
      this.load = true;
      this.fetchModules();
    },
    methods: {
      completesMod(mod,goto){
        console.log(mod, goto);
        this.load = true;
        this.callWithToken({
           parameters: {
               Id: mod,
               goto: goto,
           },
           action: this.completeModule,
       }).then(res=>{
         this.fetchModules();
       });
      },

      updateTest(module){
        this.load = true;
        this.callWithToken({
           parameters: {
               Id: module.Id,
               test: module.test,
           },
           action: this.postCase,
       }).then(red=>{
         this.fetchModules();
       });
      },
      update(module){
        // console.log(test, Id);
        this.load=true;
        this.updateTest(module);
        if(!this.error){
          this.fetchModules();
          this.$show_notification("Changed Successfull");
        }
      },
      deleteCase(module){
        this.load=true;
        this.updateTest(module);
        if(!this.error){
          this.$show_notification("Deleted Successfull");
          this.fetchModules();
        }
      },
      ...mapActions('modules', [
          'getModules',
          'resetState'
      ]),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      ...mapActions('qualityAssurance', [
        'fetchMods',
        'postCase',
        'resetState',
        'completeModule'
      ]),
      fetchModules(){
          this.callWithToken({
             parameters: {
                 projectId: this.$route.params.id, // project id
             },
             action: this.fetchMods,
         }).then(red=>{
           this.load=false;
           // this.currentModule = this.mods[0];
           // console.log(this.mods[0]);
         });
      },
      loadReam(id){
        this.currentModule = id;
        // console.log(this.currentModule);
      }


    },
    computed: {
      ...mapGetters('userCredentials', [
        'user',
        'permissions',
      ]),
      ...mapGetters('qualityAssurance', [
        'stats',
        'loading',
        'error',
        'mods',
      ]),
      ...mapGetters('modules', [
        'modules',
        'loading',
        'error',
      ]),
    }
  }
</script>


<style scoped>

.tests-table-container {
  margin-top: 20px;
  content: "jfhskdd";
}
.mods {
  padding: 20px 0 20px 70px;
  border-top: 1px solid #D8D8D8;
  border-bottom: 1px solid #D8D8D8;
  width: 92%;
  margin: 30px 0 0 -30px;
  color: #4A4A4A;
  font-size: 14px;
  font-weight: bold;
}
.d-rest {
  width: 88%;
  display: inline-block;
}
.nav-side {
  width: 25%;
  display: inline-block;
  margin: 0 0 auto 0;
  border-right: 1px solid #D8D8D8;
}
.body-side {
  width: 65%;
  display: inline-block;
}


</style>
