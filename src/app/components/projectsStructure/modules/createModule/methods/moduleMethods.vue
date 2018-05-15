<!--STEP 2 of 5-->


<template>
    <span>
        <BannerError v-if="validationError" :exempt="true">{{ validationMsg }}</BannerError>

        <ShowMethods v-if="!showForm" :methods="methods"
            @next="nextStep" @back="goBack" @openMethodsForm="openMethodsForm"/>

        <AddMethodForm v-show="showForm" :selectedMethod="selectedMethod" @updateMethod="updateMethod" @saveMethod="saveMethod" @closeMethodsForm="closeMethodsForm"/>
    </span>
</template>
<script>
    import AddMethodForm from './addMethodForm'
    import ShowMethods from './showMethods'
    import { mapGetters, mapActions } from "vuex";

export default {
  name: "module-methods",
  props: ["show"],
  components: {
      ShowMethods,
      AddMethodForm,
  },
  data() {
    return {
      methods: [],
      showForm: false,
      validationError: false,
      validationMsg: 'Please add atleast one method to continue',
      selectedMethod: {}
    };
  },
    computed:{

    ...mapGetters('modules', {
            module: "module"
        })
    },
  methods: {
    goBack () {
        this.$emit('back')
    },
    nextStep () {
            // if (this.methods.length) {
                this.$emit('next', this.methods)
            // } else {
            //     this.validationError = true
            // }
    },
    openMethodsForm(method) {
      if(method){
        this.selectedMethod = method;
      }
      else{
        this.selectedMethod = ''

      }
        this.validationError = false
        return this.showForm = true;
    },
    closeMethodsForm() {
      this.selectedMethod = {}
      return this.showForm = false;
    },
    saveMethod(method) {
        // console.log(method);
        // debugger;
        this.selectedMethod =  {}
        if(!this.module.method){
            this.module.method = [];
        }
        this.module.method.push(method);
        this.showForm = false;
        this.$emit('eaSave');
    },
    updateMethod(method,index){
      // return
      this.module.method.splice(index,1);
      //put fresh method back
      this.module.method.push(method)
      method={}
      this.selectedMethod = {}
      this.showForm = false;
      debugger;

    }
  },
};
</script>

<style>
</style>
