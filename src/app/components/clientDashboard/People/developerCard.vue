<template>
<div class="my-fucking-side-bar" v-show = "show">
	<br>
	<br>
	<br>
<i @click = "close" class="ion-ios-close-empty pull-right fa-2x" style="display:block;margin-right:10px;cursor:pointer;" ></i>
	<br>
	<br>
<span class="update">Update</span>
<span class="border"></span>
<!-- <br> -->
<div class="row">

<div class="col-md-12" style="padding:38px!important">
		   <form @submit.prevent="validateBeforeSubmit">
            

            <div class="row ">
              <div class="col-md-12 email">
                <label class="email-input" align="left" for="name">NAME</label>
                  <p :class="{ 'control': true }">
                      <input v-validate="'required'"
                        v-model="member.first_name"
                        class="form-control"
                        :class="{'input': true, 'is-danger': errors.has('name') }"
                        name="name"
                        type="text"
                        >

              
                  </p>
              </div>
            
            </div>
            <br>
                   <div class="row ">
              <div class="col-md-12 email">
                <label class="email-input" align="left" for="email">EMAIL ADDRESS</label>
                  <p :class="{ 'control': true }">
                      <input v-validate="'required|email'"
                        v-model="member.Email"
                        class="form-control"
                        :class="{'input': true, 'is-danger': errors.has('email') }"
                        name="email"
                        type="email"
                        >

              
                  </p>
              </div>
            
            </div>
            
        
          </form>
</div>
</div>
<span class="update">Change Password</span>
<span class="border"></span>
<!-- <br> -->
<div class="row">

<div class="col-md-12" style="padding:38px!important">
		   <form >
            

            <div class="row ">
              <div class="col-md-12 email">
                <label class="email-input" align="left" for="name">PASSWORD</label>
                  <p :class="{ 'control': true }">
                      <input 
                        v-model="password"
                        class="form-control"
                        :class="{'input': true, 'is-danger': errors.has('password') }"
                        name="password"
                        type="password"
                        >

              
                  </p>
              </div>
       
            
            </div>
          </form>
            
                <div class="row ">
              <div class="col-md-12 email">
                		<button v-if="!loading" style="margin-top:29px" type="submit" class="btn center-block btn-started">
              	<span class="btn-span">UPDATE</span>
              	</button>

              	<LoadingButton v-else style="margin-top:29px; background: none !important;" buttonclass=" center-block btn  btn-started">UPDATING...</LoadingButton>
              </div>
       
            
            </div>
           
           
            
        
</div>
</div>
</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import taskSummary from '@/app/components/projectsStructure/teams/taskSummary';
export default {
  props: ['show', 'member'],
  components: {taskSummary},
  data(){
	  return {
		  
		  loading: false,
		   password:""

	  }
  },
  mounted () {

	  // this.getDevAnalysis()
  },
  computed: {
      ...mapGetters('users/updateProfile', [
          'updateProfile',
      ]),
      ...mapGetters('team/suspendUser', {
          suspendError: 'error',
		  suspendLoading: 'loading',
		  activating:'activating'
		}),
        ...mapGetters('userCredentials', ['user',]),
      ...mapGetters('team/getDeveloper', {
		tDev: 'developer',
		tLoad: 'loading',
		tError: 'error',
	  }),
      ...mapGetters('projects/getDeveloper', {
		pDev: 'developer',
		pLoad: 'loading',
		pError: 'error',
	  }),
		isDeveloper () {
			return this.member.type === this.$_$userTypesObject.developer.id
		},
		devstats () {
			if (this.project) {
				return this.pDev
			}
			return this.tDev
		}
  },
  methods: {
      viewWork(){
          this.workSum = true;
          this.hoursSpent = false;
      },
      viewHrsSpnt(){
          this.hoursSpent = true;
          this.workSum =false;
      },
	  imageLink(member){
		  if(!member.profile_thumbnail){
			  return require('@/assets/img/1.jpeg');
		  }
		  return this.$API + 'img/thumbnails/'+ member.profile_thumbnail;
	  },
	  format_time(time){
		  if(!time)
		  return "--";
		  return this.$format_time(time);
	  },
	   validateBeforeSubmit() {
	   	var self = this;
            this.$validator.validateAll().then(result => {
                if (result) {

		               	self.callWithToken({
						parameters: self.member,
						action: self.updateProfile,
					}).then(res=>{
						alert(res);
					})
                }
            });
        },
           ...mapGetters('users/updateProfile', [
          'updateProfile',
      ]),
      ...mapActions('team/removeUser', [
          'removeUser',
          'deleteUser',
          'resetState',
      ]),
  ...mapActions('team',[
		  'getClientTeam'
	  ]),
      ...mapActions('team/suspendUser', [
          'suspendUser','unsuspendUser'
			]),
      ...mapActions('team/suspendUser', {
          suspendReset: 'resetState',
			}),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      ...mapActions('team/getDeveloper', {
		getTDev: 'getDeveloper',
	  }),
      ...mapActions('projects/getDeveloper', {
		getPDev: 'getDeveloper',
	  }),
	     ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
    beforeClose() {
    	this.$emit("close")
    },
    reloadStore(type, id) {
	//   this.$emit('reloadStore', type, id);
	 const args = {
            Id: this.member.Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.gtDev,
              reloadArgs: args
		  })

    },

	getDevAnalysis(id) {
		let args = {
			id: this.member.Id,
			projectId: this.projectId,
		}

		const self = this;

		if (this.project) {
			this.callWithToken({
				parameters: args,
				action: this.getPDev,
			});
		} else {
			this.callWithToken({
				parameters: args,
				action: this.getTDev,
			});
		}
	},
	suspend(id) {
		let args = {
			id: id,
		}

		const self = this;
		this.callWithToken({
			parameters: args,
			action: this.suspendUser,
		})
		.then(function (status) {
				if (status) {
					// Reload pending invites on success
						self.member.status=0;
					// self.reloadStore('suspendUser',id)
				} else {
				}
		});
	},
	unSuspend(id) {
		this.isActivating=true
		let args = {
			id: id,
		}
		const self = this;
		this.callWithToken({
			parameters: args,
			action: this.unsuspendUser,
		})
		.then(function (status) {
				if (status) {
					self.member.status=2;
				} else {
				}
		});


	},
	getColor(val){
		if(val>=5 && val<=7)
			return '#326ada';
		if(val>7)
			return 'green';
		if(val<=4)
			return 'red'
	},

	remove(id) {
		let args = {
			id: this.projectId,
			developer_Id : id
		}
		const self = this;
		this.callWithToken({
			parameters: args,
			action: this.removeUser,
		})
		.then(function (status) {
				if (status) {
					// Reload pending invites on success
					// self.reloadStore('removeUser')
					// self.$emit("reloadList");


		self.beforeClose();

				}
		});
	},
	delete_user(id) {


		this.deleting = true;
		let args = {
			developer_Id : id
		}
		const self = this;
		this.callWithToken({
			parameters: args,
			action: this.deleteUser,
		})
		.then(function (status) {
				self.deleting = false;
				if (status) {
					self.$show_notification("Deleted Successfully");
					self.callWithToken({
						parameters: {
							id: self.user.team_Id, // project id
						},
						action: self.getClientTeam,
					});
					// Reload pending invites on success
					// self.reloadStore('removeUser')
					// self.$emit("reloadList");



				}else{
					self.$show_notification("Error Deleting", "error");
				}
		});
	},
  showSummary(){
    this.activeTab = 1;
  },
  showTimechart(){
    this.activeTab = 2;
  },
  close(){
    this.$emit('close');
  }
  }
};
</script>
<style scoped>
input{
  height: 40px !important;
  width: 265px;
  border: 1px solid #D6DAE5 !important;
   border-radius: 3px !important;
   background-color: #FFFFFF !important;
   margin-top: 8px !important;
 }

input[type=password]{

}
/* BaseHeader{
  display:none;
} */
.logo {
    display: inline-block;
    margin-top: 6%;
}
.btn-started:hover{
     background-color: #337ab7 !important;
     box-shadow: 0 13px 30px -17px rgba(50,106,218,0.49);
     /*color:#fff;*/
}
.btn-started:hover .btn-span{
    color: #fff !important
}  
/*.btn-span:hover{
    color: #fff !important
}*/ 
.log-in{
  /*max-width: 450px !important;*/
  width: 100%;
}
.my-nav{
  margin-top: 40px
}
.logo p {
    float: right;
    font-size: 18px;
    font-weight: 900;
    margin-left: 5px;
    margin-top: 6px;
}
.btn-started{
  height: 45px;
  width: 130px;
  border: 1px solid #D6DAE5 !important;
  border-radius: 23px;
  background-color: #FFFFFF;
  box-shadow: unset;
  color: #8C8989;
    

}
.sign-in{
height: 23px;
width: 100%;
color: #413E3E;
  
font-size: 18px;
font-weight: bold;
letter-spacing: 7px;
 line-height: 23px;
 margin-top: 120px;
 text-align: center;
 margin-bottom: unset !important;
 opacity: 100%
}
.enter-details{
  height: 100%;
  width: 100%;
  color: #8C8989;
  font-family: "Gloria Hallelujah" !important;
  font-size: 24px;
   line-height: 48px;
   text-align: center;
   /*opacity: 100%;*/
}
.logo img {
    height: 32px;
    width: 32px;
    float: left;

}
.email {
  height: 77px;
  width: 100%;
}
.email-input{
  height: 16px;
  width: 450px !important;
  color: #453F3F !important;
    
  font-size: 12px;
  font-weight: bold;
  letter-spacing: 2px;
  line-height: 16px;
  text-align: left;
  margin-bottom: -10px !important;
}
.password {
  height: 77px;
  width: 450px;
  margin-top: 29px
}
.sign-up-add-btn i {
    color: #fff;
    font-size: 25px;
}
.btn-span{
    height: 16px;
     min-width: 104px;
     color: #8C8989;
       
      font-size: 12px;
      font-weight: bold;
       letter-spacing: 2px;
        line-height: 16px;
}
  .search-box {
    position: relative;
    padding-top: 0px;
  }
  .search-box .search {
    width: 145px;
    /*text-indent: 25px;*/
    transition: width 0.4s;
    -webkit-transition: width 0.4s;
    font-size: 15px;
    height: 50px;
    background-color: inherit;
    border: none;
    padding: 6px 12px;
    line-height: 1.42857143;
    color: #555;
    border-radius: 4px;

  }

  .search-box .search:focus {
      width: 100%;
      background: #fff;
      border-color: #66afe9;
      outline: 0;
      -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
              box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
  }
    .search-box .ion-eye {
     position: absolute;
    top: 13px;
    font-weight: bolder;
    font-size: 20px;
    left: 67%;
  }
     .search-box .ion-eye-disabled {
     position: absolute;
    top: 13px;
    font-weight: bolder;
    font-size: 20px;
    left: 67%;
  }
.sign-up-add-btn {
    position: absolute;
    top: -4%;
    background: #3369da;
    right: -6%;
    box-shadow: 0 2px 15px rgba(0,0,0,0.16);
    border-radius: 50%;
    padding: 12px 21px;
}
.z{
    height: 30px;
    width: 86px;
    color: #000000;
    font-family: "Gloria Hallelujah" !important;
    font-size: 24px;
    line-height: 30px;
}
		.d-b-c{
		font-family: Montserrat;
		font-size: 12px;
	}
	.b-c{
		height: 150px;
		margin-top: 20px;
		padding-right:80px;
		padding-left:80px;
		margin-bottom: 25px;
	}
	.b-c-inner{
		height: 120px;
		border-bottom: 1px solid rgba(157,157,163,0.25);
		padding-left: 15px;
		padding-right: 15px;
	}
	.border{
	height: 3px;
	width: 100%;
	display: block;
	margin-top: 20px;
	border: 1px solid #D8D8D8;
	}
	.b-c-bars{
		height: 110px;
		margin-bottom: 10px;
	}
	.bar{
		width: 7px;
		background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
		border: none;
		border-radius: 3px;
		position: absolute;
		bottom: 10px !important;
		margin-bottom: -110px !important;
	}
	.donut-pie{
		height: 150px;
		width: 150px;
		border-radius: 100%;
		border: 25px solid #f3f3f3;
		margin: auto;

	}
	.donut-pie-inner{
		height: 130px;
		width: 130px;
		border-radius: 100%;
		padding: 20px;
		border: 15px solid #f3f3f3;
		border-right: 18px solid #326ada;
		margin-top: -15px;
		margin-left: -15px;


	}
	.lining{
		border: 1px solid #D6DAE5;
		margin-top: 20px;
	}
	.select-time{
		height: 40px;
		width: 156px;
		border: 1px solid #D6DAE5;
		border-radius: 30px;
		background-color: rgba(255,255,255,0.47);
		font-family: Montserrat;
		font-size: 12px;
		font-weight: bold;
		line-height: 13px;
		margin-left: 80px;
		padding: 10px 15px;
	}
	.person-crd{
		border-radius: 3px;

		box-shadow: 0 22px 20px 8px rgba(111,150,254,0.1);
	}
	.offline{
		height: 44px;
		/*width: 130px;*/
		border-radius: 3px;
		padding: 15px 25px;
		background-color: #FF5C72;
		box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.13), 0 4px 9px 0 rgba(255,92,114,0.39);
	}

	.task{
		margin-bottom: 20px;
		color: #8C8989;
		font-family:Montserrat;
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
		text-align: center;
	}
	.no{
		margin-top: 20px;
		color: #453F3F;
		font-family: Montserrat;
		font-size: 24px;
		font-weight: 500;
		line-height: 31px;
		text-align: center;
	}
	.ico-img{
		height: 20px;
		/*margin-left: 77px;*/
		margin-bottom: 20px;
	}
	.person-c{
		box-shadow: 0 22px 20px 8px rgba(111,150,254,0.1);
		border-radius: 3px;
		padding: 35px;
	}
	.img-pm{
		height: 80px;
		width: 80px;
		border: 1px solid grey;
		border-radius : 100%;
	}
	.pm-name{
		height: 22px;
		width: 134px;
		color: #413E3E;
		font-family: Montserrat;
		font-size: 17px;
		font-weight: bold;
		line-height: 22px;
	}
	.pm-email{
		height: 20px;
		width: 212px;
		color: #8C8989;
		font-family: Montserrat;
		font-size: 15px;
		line-height: 20px;
		margin-top: -20px;
	}
	.quality{
		height: 20px;
		width: 128px;
		color: #453F3F;
		font-family: Montserrat;
		font-size: 15px;
		line-height: 20px;
	}
	.status{
		background-color: #84E289;
		border: 1px solid #84e289;
		border-radius: 3px;
		height: 44px;
		width: 130px;
		padding: 14px 27px;
		box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.1), 0 4px 9px 0 rgba(132,226,137,0.4);
	}
	.offline:hover{
		box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
		transform: scale(1.005);
		transition: .2s ease-in-out all;
		cursor: pointer;
	}
	.online {
		height: 16px;
		width: 47px;
		color: #FFFFFF;
		font-family: Montserrat;
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
	}
	.oval{
		box-sizing: border-box;
		border-radius: 100%;
		height: 11.89px;
		width: 11.89px;
		border: 3px solid #FFFFFF;
		box-shadow: 0 11px 25px -3px rgba(255,73,73,0.5);

	}
	.update {
	height: 19px;
	width: 49px;
	color: #4A4A4A;
	font-size: 14px;
	font-weight: 600;
	line-height: 19px;
	margin-left: 49px;
}
	.oval-1{
		border: 1px solid #D6DAE5;
		border-radius: 100%;
		height: 30px;
		width: 30px;
		padding: 3px;
		font-size: 18px;
		color: #7a7a7a;
		text-align: center;
		margin: auto;
	}
	.my-fucking-side-bar{
    width: 338px;
    position: fixed;
    right: 1px;
    margin-top: -11%;
	min-height: 1014px;
	background-color: #FFFFFF;
	box-shadow: -5px 2px 4px 0 rgba(50,106,218,0.1);
	}
	.top-2{
		margin-top: 55px;
		border-top: 1px solid rgba(214,218,229,0.34);
		border-bottom: 1px solid rgba(214,218,229,0.34);
	}
	.part{
		color: #453F3F;
		font-family: Montserrat;
		font-size: 12px;
		font-weight: 500;
		line-height: 16px;
		text-align: center;
		height: 74px;
		width: 262px;
		border-radius: 3px;
		padding: 24px;
	}
	.part:hover{
		background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
		box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
		color: #fff;
	}
	.part .active{
		background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
		box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
		color: #fff;
	}
	/*.top-3{*/
		/*margin-top: 60px;*/
		/*margin-bottom: 40px;*/
	/*}*/
	.clock{
		width: 47px;
		height: 50px;
	}
	.number{

		color: #453F3F;
		font-family: Montserrat;
		font-size: 28px;
		font-weight: bolder;
		/*line-height: 31px;*/
		text-align: center;
	}
	.hrs {

		color: #326ada;
		font-family: Montserrat;
		font-size: 14px;
		font-weight: bold;
		line-height: 16px;
		text-align: center;
	}
	.m-hrs{
		color: #8c8989;
		font-family: Montserrat;
		font-size: 12px;
	}
</style>