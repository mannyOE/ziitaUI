<template>
    <div class="well creat-modules">
        <div class="row">
            <div class="col-md-12 text-center">
                <div class="well proj-choose-well ovrf">
                    <div class="row">
                       
                        <h4>Assign a developer to this module</h4><br>
                        <HideField>
                            <div class="col-md-8">
                                <input type="text" class="form-control" placeholder="search">
                            </div>
                            <div class="col-md-4">
                                <button class="btn btn-primary btn-block">Search</button>
                            </div>
                        </HideField>
                    </div><br>

                    

                   

                    <div class="col-xs-12">
                        <div class="input-group" style="margin-bottom: 10px;">
                            <input type="text" class="form-control" placeholder="Search the List" v-model="search" @input="searching">
                            <div class="input-group-btn">
                            <button class="btn btn-default"  style="margin-top: -10px;" @click="searching" type="submit">
                                <i style="font-size: 14px;" class="fa fa-search"></i>
                            </button>
                            </div>
                        </div>
                      <div class="olf">
                          <table class="col-xs-12">
                          <tbody>
                          <tr class="team-tr" v-for="(member, index) in filteredTeam" 
                          :key="index" @click="choosePerson(member)">
                              <td>
                                  <div class="row">
                                      <div class="col-xs-2" ><img :src="imageLink(member)" class="img-tr" @click="copy_link(member.Id)"></div>
                                      <div class="col-xs-10 text-left" >
                                          <p class="tr-txt" >{{ member.first_name }} {{ member.last_name }}</p>
                                      </div>
                                  </div>
                              </td>
                              <td style="margin-right: 20px;">

                                  <p class="tr-txt">
                                    <p-check class="p-default p-curve p-thick p-pulse"
                                    color="primary-o" :checked="activePerson.Id === member.Id" @change="choosePerson(member)"/>
                                  </p>
                              </td>

                          </tr>

                          </tbody>
                      </table>
                      </div>
                    </div>

                    


                </div>
            </div>
        <div v-if="activePerson!=={}">
            <button v-if="!assignLoading" class="btn btn-primary pull-right" @click.stop="assignPerson">Assign</button>
            <LoadingButton v-else buttonclass="btn btn-primary pull-right">Assigning...</LoadingButton>
        </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { API } from "@/config";

    export default {
        name: 'choose-team-member',
        props: ['modalVisible', 'moduleId', 'projectId', 'module'],
		components: {
		},
		data () {
			return {
                activePerson: {},
                activeError: false,
                activeMsg: 'Please choose a developer to assign',
                api: API,
                currrentProject: [],
                search: '',
                showing: null,
			}
		},
        watch: {
            'modalVisible': {
                handler: function (val, old) {
                    if (val === true) {
                    // handle the modal opening
                        this.fetchTeam()
                    } else {
                    // handle modal closing
                        this.clearErrors()
                        this.$_$destroyedHook()
                    }
                },
                deep: true
            },
        },
        mounted () {
            this.fetchTeam();
        },
        computed: {
              ...mapGetters('team',
                {all_team:'team'}
        ),
            ...mapGetters('projects/getTeam', [
                'team',
                'loading',
                'error',
            ]),
            ...mapGetters('team/getProjects', {
            hola:'projects'
            }),
            ...mapGetters('userCredentials', [
                'user',
            ]),
           ...mapGetters('modules', 
        {all_modules:'modules'}
      ),
            ...mapGetters('modules/assignDev', {
                assignError: 'error',
                assignStatus: 'status',
                assignLoading: 'loading',
            }),
               ...mapGetters('projects', [
                'projects'
         
            ]),
            ...mapGetters('userCredentials', [
                'user',
            ]),
              ... mapGetters('categories', [
             'categories',
              'loading',
                'error',
                ]
                ),
            filteredTeam () {              
                if(this.showing == null){
                    return this.dis_team();
                }else{
                    return this.showing;
                }
            },
        },
		methods: {
            dis_team(){
                  var members=[];                    
                  this.hola.forEach((pro)=>{
                      if(pro.Id === this.$route.params.id){
                        
                          pro.team.forEach(id=>{
                            this.all_team.forEach(dev=>{
                                if(dev.Id==id &&  dev.type ==='3'){
                        // if(!self.team.includes(dev.Id)//)                        
                                    members.push(dev);
                                }
                                })
                            })                        
                      }                    
                  });
                  return members;
            },
            imageLink(member){
                if(!member.profile_thumbnail){
                    return require('@/assets/img/1.jpeg');
                }
                return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
            },
            ...mapActions('projects/getTeam', [
                'getTeam',
                'clearErrors',
            ]),
              ...mapActions('team',[
             'getClientTeam'
        ]),
                ...mapActions('projects/byid', [
                    'getProjectById',

                ]),    
                ...mapActions('team/getProjects', [
                'getProjects',
                'resetState'
                ]),  
            ...mapActions('modules/assignDev', [
                'assignModule',
                'resetState',
            ]),
            // ...mapActions('projectManager/assignProject', {
            //     assignReset: 'resetState',
            // }),
            ...mapActions('userCredentials', [
                'callWithToken',
            ]),
            fetchTeam() {
                // Get client team data
                var self = this;
                this.callWithToken({
                    parameters: {
                    id: self.user.Id, // clients team id
                    },
                    action: self.getProjects,

                }).then(()=>{
                    this.callWithToken({
                        parameters: {
                            id: self.user.team_Id, // project id
                        },
                        action: self.getClientTeam,
                    });
                    self.currrentProject = self.projects.filter(e=>e.Id === self.$route.params.id);
                });
            },
            isCorrectType (member) {
                this.all_team.forEach(dev=>{
                    if(dev.Id==member)
                        member=dev
                })
                return member;
                // return true
            },
            searching(){
                var self = this;
                    var matches = this.dis_team().filter(function(str) {
                    return str.first_name.toLowerCase().includes(self.search) 
                    || str.last_name.toLowerCase().includes(self.search)
                     || str.Email.toLowerCase().includes(self.search);
                });
                this.showing = matches;
                
                
            },
            assignPerson() {
                const self = this;
                if (this.activePerson.Id) {
                    this.callWithToken({
                        parameters: {
                            moduleId: this.moduleId, // pm id
                            developerId: this.activePerson.Id, // project id
                        },
                        action: this.assignModule
                    })
                    .then(status => {
                        if (status) {
                            self.activeError = false;
                             self.$show_notification("Developer assigned successfully")
                            self.reloadStore();
                            self.$_$closeModal();

                        }
                    })
                } else {
                    this.activeError = true
                     self.$show_notification("Error Assigning Developer")
                }
            },
            choosePerson (member) {
                if (this.activePerson.Id !== member.Id) {
                    this.activePerson = member
                } else {
                    this.activePerson = {}
                }
            },
            isActivePerson (id) {
                return this.activePerson.Id === id
            },
            reloadStore (type, id) {
                this.$emit('reloadStore', type, id)
            },
		},
    }
</script>


<style scoped>
/* .creat-modules{
    background: transparent;
    border: none;
    box-shadow: none;
    border-radius: 1px;
} */
.person-selected {
    box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
    border-radius: 1px;
    border: 1px solid #3469da;
    text-align: center;
}

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
    margin-top: 3%;
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
    border: 0px solid #ddd;
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.0);
    box-shadow: 0 2px 15px rgba(0,0,0,0.0);
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
.olf {
  height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.team-tr{
    padding-top: 15px !important;
    padding-left: 15px !important;
    padding-right: 15px;
    color: #453F3F;
    font-family: Montserrat;
    font-size: 14px;
    height: 50px;
    background-attachment: fixed;
}
.team-tr:hover{
    background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
    box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
    color: #fff;
    border-radius: 5px;
    background-attachment: fixed;
}
.tr-txt{
    margin-left: 20px;
}
.img-tr{
    height: 30px;
    width: 30px;
    border-radius: 100%;
    margin: 0 20px 0 20px;
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