<template>
	
</template>

<style type="text/css" scoped>
	.content {
    width: 300px;
    display: none;
    position: absolute;
    transition: height 0.4s;
    box-shadow: 0 0 10px 0 grey;
		-webkit-transition: height 0.4s;
  }
  .content ul {
    list-style-type: none;
    padding-left: 0px;
  }
  .show {
    display: inline-block;
    z-index: 2;
  }
  .dropdown {
    position: relative;
    display: inline-block;
    padding: 0;
    width: auto;
    /* background: #fff; */
    border-radius: 10px;
    border: 1px solid green;
  }
  .card {
    box-shadow: 0 0 10px 0 grey;
    margin-top: 0;
    height: auto;
    margin-bottom: 0;
  }


</style>


<script type="text/javascript">
/* eslint-disable */

	export default {
		name: 'zeedas-dasboard-sidebar-re-do',
		data () {
			return {
        show: '',
        showing: false

			}
		},
		components: {

		},
		methods: {
      showList() {
        if(!this.showing){
          this.showing =  true;
          this.show = 'show';
        }else{
          this.showing = false;
          this.show = '';
        }
      },
      closeList(){
        this.showing = false;
        this.show = '';
      }
		}
	}
</script>
