<template>
<el-dialog :visible="show" width="25%"
      :show-close="false"
      :before-close="beforeClose" style="margin-top: 150px; padding-left: 20px;">
		<div class="row" style="margin-left: 20px;">
			<div class="col-xs-3 loading"></div>
			<div class="col-xs-8 ls" style="padding-left: 30px;">Wait One Moment ...</div>
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
      this.$_$closeModal();
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
	text-transform: uppercase;
  color: chocolate;
	font-weight: bolder;
	margin-top: -5px;
}
.loading{
 		display: inline-block;
 		border: 5px solid #f3f3f3;
 		height: 50px;
 		width: 50px;
 		border-top-color: chocolate;
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
