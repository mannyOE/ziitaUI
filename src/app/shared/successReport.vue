<template>
<el-dialog :visible="show" v-if="show" width="25%"
      :show-close="false"
      :before-close="beforeClose" style="margin-top: 150px; padding-left: 20px;">
		<div class="row" style="margin-left: 20px; margin-top: -20px;">
			<div class="col-xs-3 fa-3x now-ui-icons ui-1_check"></div>
			<div class="col-xs-8 ls">Success !!!</div>
		</div>
</el-dialog>
</template>

<script>

export default {
  name: 'Loading-detail',
  props: ['show',],
  data(){
	  return {

	  }
  },
  
  methods: {
    beforeClose(done) {
      // emit('reloadStore');
      this.$_$closeModal();
      	//   done();
      	// this.$router.reload();

    },
  }
};
</script>



<style scoped>
.laus{
  margin-bottom: 20px;
}
.ls {
	text-align: center;
	line-height: 10px;
	font-size: 18px;
    color: chocolate;
    text-transform: uppercase;
	font-weight: bolder;
	margin-top: 15px;
    padding-left: 50px; 
}

</style>
