<template>
<el-dialog :visible="show" v-if="show" width="18%"
      :show-close="false"
      :before-close="beforeClose" class="person-card" style="margin-top: 150px; padding-left: 20px;">
		<div class="row" style="margin-left: 20px;">
			<div class="col-xs-2 loading"></div>
			<div class="col-xs-8 ls">Loading</div>
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
	font-size: 16px;
	font-weight: bolder;
	margin-top: -5px;
}
.loading{
 		display: inline-block;
 		border: 5px solid #f3f3f3;
 		height: 50px;
 		width: 50px;
 		border-top-color: #3498db;
 		border-radius: 100%;
 		animation: round 0.5s linear infinite;
		 z-index: 110;
		 margin-top: -30px;
 	}
 	@keyframes round{
 		from{transform: rotate(0deg);}
 		to{transform: rotate(360deg);}
}
</style>
