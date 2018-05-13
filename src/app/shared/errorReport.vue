<template>
<el-dialog :visible.sync="show" v-if="show" width="25%"
      :show-close="false"
      :modal="true"
      :before-close="beforeClose" style="margin-top: 150px; padding-left: 20px;">
		<div class="row" style="margin-left: 20px;">
			<div class="col-xs-3 fa-3x now-ui-icons ui-1_simple-remove" style="margin-top: -20px;"></div>
			<div class="col-xs-8 ls" style="padding-left: 30px;">{{error}}</div>
		</div>
</el-dialog>
</template>

<script>

export default {
  name: 'Loading-detail',
  props: ['show','error'],
  data(){
	  return {

	  }
  },
  
  methods: {
    beforeClose(done) {
        this.$emit('close');
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
    color: chocolate;
    text-transform: uppercase;
	font-weight: bolder;
	margin-top: -5px;
}
</style>
