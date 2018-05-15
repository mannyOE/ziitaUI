<template>
    <div class="zeedas-project-actitity">
        <div class="container">
          <eaChart  :modules.sync="mods" :updateChart="update" v-if="mods.length > 0"></eaChart>
          <div class="no-data" v-else>No Data Found</div>
          <div class="mods">
            Modules
          </div>
          <!-- <div class="d-rest">


            </div> -->


            <div class="d-res">
              <div class="nav-side col-md-3">
                <ModuleNav :modules="mods"
                @push="loadReam"></ModuleNav>
              </div>
              <div class="body-side col-md-7">

                <Methods
                :module.sync="currentModule" @updateChart="updateChart"></Methods>
              </div>
            </div>
          </div>

        </div>
</template>

<script type="text/javascript">
import ModuleNav from './nav.vue'
import eaChart from '@/app/shared/charts/ea-chart.vue'
import Methods from './methods.vue'
import spinner from '../qa/loader.vue'

import {
  mapGetters,
  mapActions
} from 'vuex';
  export default {
    components: {
      ModuleNav,
      Methods,
      eaChart,
      spinner
    },
    data() {
        return {
          currentModule: null,
          total: 0,
          update:'',
          load: false,
        }
    },
    mounted () {
      this.load = true;
      this.fetchModules();
    },

    methods: {
      ...mapActions('modules', [
          'getModules',
          'resetState'
      ]),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      ...mapActions('ea', [
        'fetchMods',
        'postCase'
      ]),
      fetchModules(){
          this.callWithToken({
             parameters: {
                 projectId: this.$route.params.id, // project id
             },
             action: this.fetchMods,
         }).then(ref=>{
           this.load = false;
         });
      },
      loadReam(id){
        this.currentModule = id;
        // debugger;
      },
      updateChart(){
        this.load = true;
        this.callWithToken({
          parameters: {
            Id: this.currentModule.Id,
            test: this.currentModule.method
          },
          action: this.postCase
        }).then(res=>{
          this.fetchModules();
        });

       //
      }


    },
    computed: {
      ...mapGetters('userCredentials', [
        'user',
        'permissions',
      ]),
      ...mapGetters('qualityAssurance', [
        'testCases',
        'loading',
        'error',
      ]),
      ...mapGetters('ea', [
        'mods',
        'stats',
        'loading',

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
.no-data {
  background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
  padding: 12px;
  width: 90%;
  color: #fff;
  text-align: center;
}


</style>
