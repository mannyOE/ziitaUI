<template>
	<div class="dropdown  col-md-12">
		<button class="btn btn-primary btn-link col-md-12 card" @click="Profile" @blur="closeProfile">
      <!-- <i class="fa fa-bell fa-2x"></i> -->
      <span>
        <img :src="require('@/assets/img/1.jpeg')" class="img" alt="">
        <span class="user-name">Afolabi Israel</span>
      </span>
    </button>
    <div class="content col-md-12" :class="profile">
      <ul>
        <li>dabble into shit</li>
        <li>i dont give a shit</li>
      </ul>
    </div>

	</div>
</template>

<style type="text/css" scoped>
	.content {
    width: 200px;
    height: 0px;
    overflow-y: hidden;
    position: absolute;
    transition: height 0.4s;
		-webkit-transition: height 0.4s;
  }
  .content ul {
    list-style-type: none;
    padding-left: 0px;
  }
  .show {
    height: auto;
  }
  .img {
    border-radius: 100%;
    height: 50px;
    width: 50px;
  }
  .user-name {
    text-align: right;
    font-weight: bolder;
    color: #000;
    right: 0;
  }
  .dropdown {
    position: relative;
    width: 300px;
    background: #fff;
    padding: 0;
    display: inline-block;
  }
  .card {
    /* padding: 2px; */
    border-radius: 10px;
    box-shadow: 0 0 10px 0 grey;
    margin-top: 0;
    height: auto;
    margin-bottom: 0;


    /* box-shadow: 2px 2px #FF0000; */
  }


</style>


<script type="text/javascript">
/* eslint-disable */

	export default {
		name: 'zeedas-dasboard-sidebar-re-do',
		data () {
			return {
        profile: '',
        showingProfile: false

			}
		},
		components: {

		},
		methods: {
      Profile() {
        if(!this.showingProfile){
          this.showingProfile =  true;
          this.profile = 'show';
        }else{
          this.showingProfile = false;
          this.profile = '';
        }
      },
      closeProfile(){
        // alert();
        this.showingProfile = false;
        this.profile = '';
      }

		}
	}
</script>
