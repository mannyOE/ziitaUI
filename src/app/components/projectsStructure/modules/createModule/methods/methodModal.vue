<template>
    <el-dialog :visible="show"
      width="50%"
      :show-close="false"
      :before-close="beforeClose"
      append-to-body>

        <!-- Modal content-->
    <div>
      <p class="text-primary">Name:</p>
        <h3 class="text-left hide-nomethd">{{ method.method_name  }}</h3>
       <hr>
        <h4 class="text-center hide-nomethd" style="background-color: #326ada2e; padding: 8px; border-radius: 50px; box-shadow: 0 2px 15px rgba(0,0,0,0.06);">Parameters</h4><br>
        <div v-if="method.input_params && method.output_params">
           <div class="row text-center">
             <div class="col-md-6">
                <span><b class="text-primary">Input </b> <p v-for="input_params in method.input_params">{{input_params }}</p></span>
             </div>
             <div class="col-md-6">
               <span><b class="text-primary">Output </b> <p v-for="output_params in method.output_params">{{ output_params }}</p></span>
             </div>
           </div>
        </div>
        <p v-else>No parameters added</p>

        <h4 class="text-center hide-nomethd"  style="background-color: #326ada2e; padding: 8px; border-radius: 50px; box-shadow: 0 2px 15px rgba(0,0,0,0.06);">Testcases</h4><br>

        <table class="table table-sm table-responsive text-center" v-if="method.method_test && method.method_test.length">
            <thead>
                <tr>
                    <th class="text-center text-primary">Case</th>
                    <th class="text-center text-primary">Accepted Output</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(test, index) in method.method_test" :key="index">
                    <td>{{ test.case }}</td>
                    <td>{{ test.acceptance}}</td>
                </tr>
            </tbody>
        </table>

        <p v-else>No testcases</p>
    </div>

        <p class="text-right next-button">
            <button class="btn btn-default" @click="$_$closeModal()">
                Close
            </button>
        </p>
   </el-dialog>
</template>
<script>

export default {
  name: "module-method-modal",
  props: ["show", "method"],
  components: {
  },
  data() {
    return {
    };
  },
  computed: {
  },
  methods: {
    beforeClose(done) {
        this.$_$closeModal()
        done();
    },
  },
};
</script>

<style>
</style>
