<template>
    <div class="well creat-modules">
        <div class="row">
            <!-- {{developer.team}} -->
            <div class="col-md-12 text-center">
                <div class="well proj-choose-well ovrf">
                    <div class="row">
                        <!-- {{SelectedTeam}}sdsd -->
                        <!-- <div class="col-md-8">
                            <input type="text" class="form-control" placeholder="search">
                        </div>
                        <div class="col-md-4">
                            <button class="btn btn-primary btn-block">Search</button>
                        </div> -->
                    </div>
                    <div class="col-xs-12">
                        <!-- <div class="input-group mb-12">
                            <input type="text" class="form-control" v-model="search" @input="searching"
                            placeholder="Search the List">
                            <div class="input-group-append">
                                <span class="input-group-text fa fa-search fa-2x" id="basic-addon2"></span>
                            </div>
                        </div> -->
                        <div class="input-group" style="margin-bottom: 10px;">
                            <input type="text" class="form-control" placeholder="Search the List" v-model="search" @input="searching">
                            <div class="input-group-btn">
                            <button class="btn btn-default" @click="searching" type="submit">
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
                                    color="primary-o" :checked='memberAdded(member.Id)!==-1' @change="choosePerson(member)"/>
                                  </p>
                              </td>

                          </tr>
                          <tr class="team-tr" v-if="filteredTeam.length < 1" 
                          >
                              <td colspan="2">
                                  <div class="text-center">
                                      No results match this search
                                  </div>
                              </td>
                          </tr>

                          </tbody>
                      </table>
                      </div>
                    </div>
<!--                     
                    <div class=""  v-else-if="filteredTeam.length">
                        <div class="form-group">
                            <input type="text" class="form-control" v-model="search" @input="searching">
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
                                    color="primary-o" :checked='memberAdded(member.Id)!==-1' @change="choosePerson(member)"/>
                                  </p>
                              </td>

                          </tr>

                          </tbody>
                      </table>
                      </div>
                    </div> -->



                </div>
            </div>
        <div v-if="filteredTeam.length>0">
            <button v-if="!assignLoading && !devLoading"
                class="btn btn-default assing-dev-butt-jam pull-right"
                @click.stop="assignDeveloper()">
              Add {{SelectedTeam.length}} Members
                

                </button>
            <LoadingButton v-else buttonclass="btn btn-primary pull-right assing-dev-butt-jam">Adding...</LoadingButton>
        </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { API } from '../../config';

    export default {
        name: 'choose-team-member',
        props: ['modalVisible', 'projectId', 'developer','members'],
		components: {
		},
		data () {
			return {
                activePerson: {},
                activeError: false,
                activeMsg: 'Please choose a team member to add',
                api: API,
                SelectedTeam:[],
                selected: "",
                search: '',
                filterResult: null,
			}
		},
        watch: {
            'modalVisible': {
                handler: function (val, old) {
                    this.SelectedTeam = [];
                    this.selected = "";
                    if (val === true) {
                    // handle the modal opening
                        // this.fetchTeam()
                    } else {
                    // handle modal closing
                        this.activeError = false
                        this.clearErrors()
                        this.$_$destroyedHook(['devReset'])
                    }
                },
                deep: true
            },
        },

        mounted () {
            if(this.team.length == 0){
                this.callWithToken({
                    parameters: {
                        id: this.user.team_Id, // clients team id
                        // id: this.user.Id, // clients team id
                    },
                    action: this.getClientTeam,
                });
            }
//    debugger;
//            var self = this;
//            this.getAPI().then(function(api){
//                self.api = api;
//            });
        },
        computed: {
            ...mapGetters('team', [
                'team',
                'loading',
                'error',
            ]),
            ...mapGetters('userCredentials', [
                'user',
            ]),
            ...mapGetters('projectManager/assignProject', {
                assignError: 'error',
                assignStatus: 'status',
                assignLoading: 'loading',
            }),
            ...mapGetters('projects/addDeveloper', {
                devError: 'error',
                devStatus: 'status',
                devLoading: 'loading',
            }),
             ...mapGetters('projects', [
                'projects'

            ]),

            filteredTeam () {
                if(this.filterResult === null){
                    return this.dis_team();
                }else{
                    return this.filterResult
                }             
            },
            

        },
		methods: {
            dis_team(){
                var members=[];
                var self = this;
                this.team.forEach(member=>{
                    // debugger;
                    //check who is logged in                    
                    if(!self.developer.team.includes(member.Id) && member.type === '3')
                    {
                        members.push(member);
                    }
                });
                var unique = [];
                // console.log(members);
                unique = members;     
                    return unique;
            },
            imageLink(member){
                if(!member.profile_thumbnail){
                    return require('@/assets/img/1.jpeg');
                }
                return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
            },
            allteam(){

            },
            ...mapActions('team', [
                'getClientTeam',
                'clearErrors',
            ]),
            ...mapActions('persistentState', [
                'getAPI',
            ]),
            ...mapActions('projectManager/assignProject', [
                'assignProject',
                'resetState',
            ]),
            ...mapActions('projects/addDeveloper', [
                'addDeveloper',
            ]),
            ...mapActions('projects/addDeveloper', {
                devReset: 'resetState',
            }),
            ...mapActions('userCredentials', [
                'callWithToken',
            ]),
            isCorrectType (member) {
                if (this.developer.status) {
                    return member.type === this.$_$userTypesObject.developer.id
                } else {
                    return member.type === this.$_$userTypesObject.projectManager.id
                }
                // return true
            },
            searching(){
                  var self = this;
                    var matches = this.dis_team().filter(function(str) {
                    return str.first_name.toLowerCase().includes(self.search) 
                    || str.last_name.toLowerCase().includes(self.search)
                     || str.Email.toLowerCase().includes(self.search);
                });
                this.filterResult = matches;      
            },
            assignPerson() {
                const self = this
                if (this.selected) {
                    this.callWithToken({
                        parameters: {
                            pmId: this.selected, // pm id
                            projectId: this.projectId, // project id
                        },
                        action: this.assignProject,
                    })
                    .then(status => {
                        // debugger
                        if (status) {
                            self.reloadStore()
                            self.activeError = false;
                           this.$show_notification("Project Manager Successfully Set");
                            self.$_$closeModal()

                        }
                        else{

                        }
                    })
                } else {
                    this.$show_notification("Please select a Project Manager", "error")
                }
            },
            assignDeveloper() {
                const self = this;

                if (this.SelectedTeam.length > 0) {
                    this.callWithToken({
                        parameters: {
                            developerId: this.SelectedTeam, // dev id
                            projectId: this.projectId, // project id
                        },
                        action: this.addDeveloper,
                    })
                    .then(status => {
                        if (status) {
                            self.activeError = false
                            self.reloadStore()
                            self.$_$closeModal()
                             self.$show_notification(devError)

                        }
                        else{
                             self.$show_notification(devError,'error')
                        }
                    })
                } else {
                   self.$show_notification("Please select a developer", "error");
                }
            },
            choosePerson (member) {
//                 debugger;
                     var index = this.memberAdded(member.Id);
                        if(index==-1){
                            this.SelectedTeam.push(member.Id)
                        }
                        else{
                            this.SelectedTeam.splice(index,1);
                        }
            },
            memberAdded(id){
                var self = this;
                 for(var x = 0; x < self.SelectedTeam.length ; x++){
                    if(id == self.SelectedTeam[x])
                        return x;

                }
                return -1;
            },
            isActivePerson (id) {
                if(this.selected){
                    return this.selected == id;
                }
                return this.SelectedTeam.includes(id);
            },
            reloadStore(type, id) {
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
    border: 0px !important;
    -webkit-box-shadow: none;
    box-shadow: none;
    margin-top: 3%;
    border-radius: 1px;
}
.well {
  margin-bottom: 0;
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
    border: 0px solid #ddd !important;
    border-radius: 1px;
    transition: all .5s ease;
    padding: 330px 30px 0px 30px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
}
.assing-dev-butt-jam {
  margin-top: 60px;
    padding: 7px 48px;
    border: 1px solid #ddd !important;
}
.well.proj-choose-well {
    background: white;
    cursor: pointer;
    /* min-height: 358px; */
    max-height: 357px;
    border: 0px solid #ddd;
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px 30px 0px 30px;
    -webkit-box-shadow: none !important;
    box-shadow:none !important;
}
.well.proj-reach-well {
    background: white;
    border: 1px solid #ddd;
    border-radius: 1px;
    -webkit-transition: all .5s ease;
    transition: all .5s ease;
    padding: 30px 30px 0px 30px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.06);
    box-shadow: 0 2px 15px rgba(0,0,0,0.06);
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
.person-c{
    box-shadow: 0 22px 20px 8px rgba(111,150,254,0.1);
}
.img-share{
    height: 14px;
    width: 18px;
}
.share{
    color: #453F3F;
    font-size: 12px;
    font-family: Montserrat;
    padding-left: 10px;
    padding-top: 5px;
}
button{
    font-family: 'Open Sans' !important;
}
.olf {
  height: 200px;
  overflow-y: auto;
  margin-bottom: 20px;
}
.olf:hover::-webkit-scrollbar{
    width: 5px;
    transition: all 1s ease;
}
.olf::-webkit-scrollbar {
    width: 0px;

    transition: all 1s ease;
}
.olf::-webkit-scrollbar-thumb {
    border-radius: 50px;
    /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
    background-color: #848484;
    transition: all 1s ease;
    /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
}
.olf::-webkit-scrollbar-track {
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
    border-radius: 50px;

    transition: all 1s ease;
}

</style>
