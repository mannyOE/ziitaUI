<template>
    <div class="templ">
    <div class="container">
        <div class="row">
            <div class="col-md-3 col-sm-3">

                 <ProjectTabs :name="project.name"></ProjectTabs>

   		    </div>
            <div class="col-md-9 col-sm-9">
                <div class="tab-content">
                    <!-- <div id="home" class="tab-pane fade in active">

                            <div class="well creat-modules">
                                <label for="">PROJECT NAME</label>
                                <input type="text" class="form-control" placeholder="Jana Doe">

                                <label for="">PROJECT DISCRIPTION</label>
                                <textarea type="text" class="form-control" ></textarea>

                                <p class="text-right next-button"><button class="btn btn-default" data-toggle="tab" data-target="#menu1">Next</button></p>
                            </div>
		            </div> -->
                    <div id="menu1" class="tab-pane fade in active" >

                            <div class="well creat-modules">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="well proj-type-well" :class="{ dactive:  activeId == 'link-1'  }"  @click.prevent="activeLink('link-1')">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <img :src="require('@/assets/img/mobile.png')">
                                                </div>
                                                <div class="col-md-8">
                                                    <h4>Mobile</h4>
                                                    <p> Develop, manage your mobile application and effectively track your team's activities. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="well proj-type-well" :class="{ dactive:  activeId == 'link-2'  }"  @click.prevent="activeLink('link-2')">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <img :src="require('@/assets/img/web.png')">
                                                </div>
                                                <div class="col-md-8">
                                                    <h4>Web</h4>
                                                    <p> Build, test your web application and effectively track your team's activities. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="well proj-type-well" :class="{ dactive:  activeId == 'link-3'  }" @click.prevent="activeLink('link-3')">
                                            <div class="row">
                                                <div class="col-md-4">
                                                    <i class="icon ion-ios-settings"></i>
                                                </div>
                                                <div class="col-md-8">
                                                    <h4>Others</h4>
                                                    <p> Build and manage any other application of your choice. </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p class="text-center next-button">
                                <router-link :to="{ name: 'projects'}">
                                    <button class="btn btn-default">Back</button>
                                </router-link>&nbsp;&nbsp;
                                <button class="btn btn-default" data-toggle="tab" data-target="#menu2">Next</button>
                            </p>

		            </div>
                     <div id="menu2" class="tab-pane fade" >

                            <div class="well creat-modules">
                                <div class="row">
                                    <div class="col-md-6 text-center">
                                        <div class="well proj-choose-well ovrf">
                                            <div class="row">
                                                <h4>Choose from Existing Project Managers</h4><br>
                                                <div class="col-md-8">
                                                    <input type="text" class="form-control" placeholder="search">
                                                </div>
                                                <div class="col-md-4">
                                                    <button class="btn btn-primary btn-block">Search</button>
                                                </div>
                                            </div><br>
                                             <i class="icon ion-person"></i>
                                             <h4>No Team Member Yet</h4>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="well proj-choose-well">
                                            <h4>Invite A Project Manager</h4><br>
                                            <label class="label" for="firstName">First Name</label>
                                                <p :class="{ 'control': true }">
                                                    <input v-validate="'required|min:2'" class="form-control" :class="{'input': true, 'is-danger': errors.has('firstName') }" name="firstName" type="text" placeholder="First Name">
                                                    <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
                                                </p>
                                            <label class="label" for="lastName">Last Name</label>
                                                <p :class="{ 'control': true }">
                                                    <input v-validate="'required|min:2'" class="form-control" :class="{'input': true, 'is-danger': errors.has('lastName') }" name="lastName" type="text" placeholder="First Name">
                                                    <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
                                                </p>

                                             <label class="label" for="email">Email</label>
                                                <p :class="{ 'control': true }">
                                                    <input v-validate="'required|email'" class="form-control" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="First Name">
                                                    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                                                </p>
                                                <br>
                                             <button class="btn btn-primary btn-block">Invite</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                                    <p class="text-center next-button"><button class="btn btn-default" data-toggle="tab" data-target="#menu1">Back</button>&nbsp;&nbsp;<button class="btn btn-default" data-toggle="tab" data-target="#menu3" >Next</button></p>

		            </div>
               <!--       <div id="menu3" class="tab-pane fade">

                            <div class="well creat-modules">
                                <div class="row">
                                    <div class="col-md-6 text-center">
                                        <div class="well proj-reach-well">
                                           <h4 class="text-center">Call Us </h4>
                                           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum voluptatibus adipisci non sed numquam?</p>
                                           <button class="btn btn-primary text-center" style="padding:7px 50px; border-radius:50px; outline:none !important;">Call Us</button>
                                        </div>
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <div class="well proj-reach-well">
                                             <h4 class="text-center">Chat Us</h4>
                                             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti ad iusto vel hic possimus quos odit .</p>
                                            <button class="btn btn-primary text-center" style="padding:7px 50px; border-radius:50px; outline:none !important;">Chat Us</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <p class="text-right next-button"><button class="btn btn-default" data-toggle="tab" data-target="#menu2">Back</button>&nbsp;&nbsp;
                              <router-link :to="{ name: 'overview'}">
                                <button class="btn btn-default" data-toggle="tab" data-target="#menu3">Create Project</button>
                              </router-link>
                            </p>

		            </div> -->
                </div>

            </div>
        </div>
    </div>
    </div>
</template>
<script>
import ProjectTabs from '@/app/components/projectsStructure/ProjectTabs';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'createproject',
  components:{
      ProjectTabs
  },
  data() {
    return {
      projectData: {
        type: {
            id: '',
            name: '',
        },
        team: [],
      },
      platforms: [
      ],
      activeId: null,
    };

  },
  computed: {
    ...mapGetters('persistentState', [
        'project',
    ]),
  },
  methods: {
        activeLink(linkIdent) {
            this.activeId = this.activeId === linkIdent ? null : linkIdent
        }
    },

};

</script>
<style scoped>
/* .creat-modules{
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 1px;
} */

.creat-modules input{
     margin-bottom: 12px;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.creat-modules textarea{
     max-width: 100%;
    margin-bottom: 3%;
    height: 115px;
    resize: none;
    box-shadow: none !important;
    border-radius: 5px;
    border: 2px solid #DEE9F2 !important;
}
.modules{
     background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 1px;
}
.modules hr {
    background: #326ADA;
    height: 2px;
    border-top: none;
    width: 50%;
}
.modules h3{
    font-weight: 500;
    margin-top: -2%;
}
.modules p{
    font-size: 10px;
}

.modal-header {
    padding: 30px;
    border-bottom: 1px solid rgba(229, 229, 229, 0);
}
button.btn.btn-default.grp-btn {
    border-radius: 50%;
    margin-left: 10px;
    color: #326ada !important;
    border: 1px solid #326ada;
}
.templ {
    position: relative;
    margin-top: 5%;
    margin-bottom: 10%;
}

.creat-modules {
    background: transparent;
    border: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    margin-top: 0% !important;
    border-radius: 1px;
}
.well.proj-type-well.active {
    border: 2px solid #3369da !important;
    margin-top: -18% !important;
}
.well.proj-type-well:hover {
    border: 1px solid #3369da !important;
}
.well.proj-type-well h4 {
    font-weight: 900;
}
.well.proj-choose-well h4 {
    font-weight: 900;
}

.well.proj-type-well i {
    color: #3369da;
    font-size: 63px;
}

.well.proj-choose-well i {
    color: #3369da;
    font-size: 40px;
}

.well.proj-type-well p {
    font-size: 11px;
}

.well.proj-type-well {
    background: white;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 1px;
    transition: all .5s ease;
    padding: 30px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}

.well.proj-choose-well {
    background: white;
    cursor: pointer;
    min-height: 358px;
    max-height: 357px;
    border: 1px solid #ddd;
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.06);
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}
.well.proj-reach-well {
    background: white;
    border: 1px solid #ddd;
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.06);
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}
.ovrf{
    overflow-y: overlay;
    overflow-x: hidden;
}
.ovrf:hover::-webkit-scrollbar{
     width: 5px;
     transition: all 1s ease;
}
.ovrf::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
}
.ovrf::-webkit-scrollbar-thumb {
    border-radius: 50px;
   /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
   background-color: #848484;
   transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
}
.ovrf::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;

    transition: all 1s ease;
}
.dactive:before {
    content: "\f382";
    position: absolute;
    font-family: Ionicons;
    color: green;
    top: 7%;
    right: 7%;
    border: 1px solid green;
    font-size: 20px;
    padding: 3px 6px;
    border-radius: 50%;
}
.well.proj-choose-well input{
   /* margin-bottom: 9%; */
}
button{
    font-family: 'Open Sans' !important;
}
</style>
