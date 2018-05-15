<template>
<el-dialog :visible="show"
 width="100%" top="0" class="pros"
      :show-close="false"
      :before-close="close">

      <button type="button" class="close esc" @click.stop="close">
        <span class="ion-android-close line-copy pull-left"></span> ESC</button>
      <button type="button" class="close back" @click.stop="back_a_step" v-show="project_stage !== 1">
        <span class="ion-android-arrow-back line-copy pull-left" alt=""></span> BACK</button>
        <section class="fade in" style="width:100%; overflow-y: hidden;">
          <div>
              <h4 class="text-center create-new-project">CREATE NEW PROJECT</h4><br>
              <form @submit.prevent="saveProjectData" autocomplete="off" class="create_proj_new" v-show="project_stage === 1">
                <div class="add-project-name">Add Project Name</div>
                  <input autocomplete="false" name="hidden" type="text" style="display:none;">
                  <input type="text"
                      autofocus="true"
                      name="name"
                      v-validate="'required|min:2'"
                      v-model="project.name"
                      class="form-control rectangle-23"
                      placeholder="">
                  <FieldError>
                      {{ errors.first('name') }}
                  </FieldError>




                  <!-- <label for="description">PROJECT DESCRIPTION</label>
                  <textarea type="text"
                      name="description"
                      v-validate="''"
                      v-model="project.description"
                      class="form-control">
                  </textarea>
                  <FieldError>
                      {{ errors.first('description') }}
                  </FieldError> -->

                  <button class="btn btn-primary btn-block" type="submit">
                      Next
                  </button>
              </form>
              <div v-show="project_stage === 2" class="pm">
                <div class="add-project-name">Choose a Project Manager</div>
                <ChooseProjectManager @set="setPm"/>

                <button class="btn btn-primary btn-block" type="submit" @click.stop="goToProjectType"
                :class="{'disabled':projectDetails.projectManager===null}">
                    Next
                </button>
              </div>
              <div v-show="project_stage === 3">
                <div class="add-project-name">Choose a Project Type</div>
                    <ChooseProjectType @set="setType"/>
              </div>
          </div>
        </section>
        <!-- <section class="fade in" style="height: 1024px; width:100%; overflow-y: hidden;" v-show="project_stage === 2">
          <div class="create_proj_new">
              <h4 class="text-center create-new-project">CREATE NEW PROJECT</h4><br>

                  <div class="add-project-name">Choose a Project Manager</div>
                  <ChooseProjectManager @set="setPm"/>

                  <button class="btn btn-primary btn-block" type="submit" @click.stop="goToProjectType"
                  :class="{'disabled':projectDetails.projectManager===null}">
                      Next
                  </button>

          </div>
        </section> -->
        <!-- <section class="fade in" style="height: 1024px; width:100%; overflow-y: hidden;" v-show="project_stage === 3">
          <div class="create_proj_new">
              <h4 class="text-center create-new-project">CREATE NEW PROJECT</h4><br>
              <div class="add-project-name">Choose a Project Type</div>
                  <ChooseProjectType @set="setType"/>
          </div>
        </section> -->
</el-dialog>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import ChooseProjectType from '../createproject/tabcontents/project-type'
import ChooseProjectManager from '../createproject/tabcontents/project-management'

export default {
    name: 'new-project-modal',
    props: ['show'],
    components: {
      ChooseProjectManager,
      ChooseProjectType
    },
    data () {
        return {
            project: {
                name: '',
                description: '',
            },
            projectDetails: {
                        type: {
                            id: null,
                            name: null,
                        },
                        projectManager: null,
                    },
            project_stage: 1,
        }
    },
    computed: {
			...mapGetters('persistentState', {created_project:'project'}),
			...mapGetters('userCredentials', [
				'user',
			]),
		},
    methods: {
        ...mapActions('persistentState', [
            'setProjectInitial',
        ]),
        ...mapActions('userCredentials', [
  				'callWithToken',
  			]),
        ...mapActions('projects/add', [
  				'createProject',
  				'resetState'
  			]),
        close() {
          this.project.name = '';
          this.project.description = '';
          this.created_project = [];
          this.project_stage = 1;
            this.$_$closeModal();
        },
        back_a_step(){
          this.project_stage = this.project_stage - 1;
        },
        setPm(pm){
          this.projectDetails.projectManager = pm;
        },
        setType(type){
          this.projectDetails.type.id = type.id
          this.projectDetails.type.name = type.name
          this.addProject(this.projectDetails);
        },
        goToProjectType(){
          this.project_stage = 3;
        },
        saveProjectData () {
            this.$validator.validateAll().then(result => {
                if (result) {
                    // eslint-disable-next-line
                    const self = this;

                    this.setProjectInitial({
                        name: self.project.name,
                        description: self.project.description,
                    })
                    .then(status => {
                          // this.$_$closeModal();
                          this.project_stage = 2;
                        // self.$router.push({name: 'create-project'});
                    })
                    return;
                }
            });
        },
        addProject (details) {
  				let args = {
  					project_name: this.project.name,
  					project_description: this.project.description,
  					company_Id: this.user.team_Id,
  					manager_Id: details.projectManager,
  					platform: details.type.id,
  					platform_name: details.type.name,
                      team: []
  				};
                  if(details.projectManager){
                      args.team.push(details.projectManager);
                  }

  				const self = this;

  				this.callWithToken({
  					parameters: args,
  					action: self.createProject,
  				})
  				.then(status => {
  					if (status) {
  						// Redirect to project page on success
  						self.$router.push({ name: 'project-overview', params: { id: status.id }})
  					}
  				})
  			}
    }
}
</script>
<style scoped>
.modal-header {
    padding: 3px !important;
    border-bottom: 0px solid #e5e5e5;
}
.create_proj_new button{
    height: 4.2%;
    width: 10.24%;
    border-radius: 3px;
    background-color: #FF346F;
    box-shadow: 0 10px 30px 0 rgba(50,106,218,0.2);
    margin: 7.71% auto 0 auto;
}
.pm button {
  height: 4.2%;
  width: 10.24%;
  border-radius: 3px;
  background-color: #FF346F;
  box-shadow: 0 10px 30px 0 rgba(50,106,218,0.2);
  margin: 2.71% auto 0 auto;
}
.create_proj_new label{
    margin-top: 1%;
}
.add-project-name {
	height: 2.44%;
	width: 20.18%;
	color: #4A4A4A;
	font-size: 18px;
	font-weight: bold;
	letter-spacing: 0.14px;
	line-height: 25px;
	text-align: center;
  margin: 2.25% auto 0 auto;
}
.rectangle-23 {
	height: 8.9%;
	width: 60.9%;
	border: 1px solid rgba(50,106,218,0.3);
	border-radius: 3px;
  text-align: center;
  font-weight: bolder;
  font-size: 56px;
  margin: 6.74% auto 0px auto;
}
.create-new-project {
	height: 1.86%;
	/* width: 156px; */
	color: #9B9B9B;
	font-size: 18px;
	font-weight: 500;
	letter-spacing: 0.11px;
	line-height: 19px;
	text-align: center;
  margin: 7.03% auto 0 auto;
}
.esc {
	height: 22px;
	width: auto;
	color:#a1d;
	font-size: 16px;
	font-weight: 600;
  position: absolute;
	letter-spacing: 0.12px;
	line-height: 14px;
	text-align: center;
  right: 2.32%;
  margin: 0px 80px 0 0;
}
.back {
	height: 22px;
  position: absolute;
	width: auto;
	color: #a1d;
	font-size: 16px;
	font-weight: 600;
	letter-spacing: 0.12px;
	line-height: 14px;
  left: 4.73%;
}
.line-copy {
	box-sizing: border-box;
	height: 15.42px;
	width: 16.59px;
  font-size: 16px;
  margin-right: 12.41px;
  line-height: 14px;
	/* border: 2px solid #D8D8D8; */
}

</style>
<style media="screen">
  .pros {
    height: 100%;
  }
  div.el-dialog__wrapper.pros > div.el-dialog{
    margin: 0;
    height: 100%;
  }

</style>
