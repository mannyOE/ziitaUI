<template>
    <el-dialog :visible="show"
      :show-close="false" 
      :before-close="beforeClose">

    <div>
        <div slot="title">
          <button type="button" class="close" @click.stop="$_$closeModal">&times;</button>
        </div>
        <div class="container">
            <div class="col-md-6 main-title">
                <h3>People ({{teamMembers.length || 0}} Members)</h3>
            </div>
            <div class="col-md-6">
            </div>
        </div>
        <div class="container" v-if="teamMembers && teamMembers.length">
            <div v-for="teamMember in teamMembers" :key="teamMember.id" class="col-md-3 pr-0" @click.prevent="openTeamViewModal(teamMember)">
                <div class="people active">
                    <div class="person-img">
                        <img :src="teamMember.user.img || require('@/assets/img/1.jpeg')" :alt="teamMember.user.firstName + ' ' + teamMember.user.lastName">
                    </div>
                    <h2>{{teamMember.user.firstName}} {{teamMember.user.lastName}}</h2>
                    <h3>{{teamMember.user.userType}}</h3>
                    <div class="tools">
                        <i class="ion-compose"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="container" v-if="!team || !team.length && !loading">
            <div class="text-center" align="center">
                <div class="empty-state">
                    <i class="ion-ios-person"></i>
                </div>
                <h3>No team member found</h3>
            </div>
        </div>

        <team-member :show.sync="sub.showTeamViewModal" @close="closeTeamViewModal" :teamMember="selectedTeamMember">
            <div class="action-btn" slot="action">
                <button class="btn btn-default btn-md" @click.prevent="add(selectedTeamMember)">Add to project {{ project.title }}</button>
            </div>
        </team-member>
        
        <!-- <button type="button" class="close" @click="closeModal" data-dismiss="modal">&times;</button> -->
    </div>
    </el-dialog>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import VueToast from 'vue-toast'
import TeamMember from '@/app/shared/team-member-modal';
// import NewTeamMemberModal from '@/app/shared/add-developer-modal';


export default {
    name: "AddProjectTeam",
    components: {
        TeamMember,
        VueToast,
    },
    data() {
        return {
            showTeamViewModal: false,
            selectedTeamMember: {
                user: {}
            }
        }
    },
    created() {
        const clientId = this.project.clientId;
        console.log(clientId)
        this.getClientTeam(clientId);
    },
    computed: {
        teamMembers() {
            return [...this.team.developers];
        },
        ...mapGetters('auth', [
            'user',
        ]),
        ...mapGetters('clients/team', [
            'sub',
            'team',
        ]),
        ...mapGetters('projects/byid', [
            'project',
        ])
    },
    methods: {
        ...mapActions('clients/team', [
            'removeDeveloper',
            'getClientTeam',
        ]),
        ...mapActions('projects/add', [
            'addTeamMember',
        ]),
        ...mapActions('projects/byid', [
            'getProjectById',
        ]),
        ...mapActions('clients/team', [
            'removeProjectManager',
        ]),
        ...mapMutations('clients/team', [
            'toggleTeamModal',
        ]),
        openTeamViewModal(selectedTeamMember) {
            console.log(selectedTeamMember, "CHECK");
            this.toggleTeamModal(true);
            this.selectedTeamMember = selectedTeamMember;
        },
        closeTeamViewModal() {
            this.toggleTeamModal(false);
        },
        add(selectedTeamMember) {
            const developerId = selectedTeamMember.id;
            const toast = this.$refs.toast;
            const self = this;
            const projectId = this.$route.params.id;
            this.addTeamMember({ developerId, projectId }).then((result) => {
                if (result.msg === 'Added successfully') {
                    toast.showToast(`${selectedTeamMember.user.firstName} was successfully added to project.`, {
                        theme: 'success',
                        time: 2000,
                    });
                    setTimeout(() => {
                        const projectId = self.$route.params.id;
                        self.getProjectById({ id: projectId });
                    }, 4000);
                }
            }).catch((error) => {
                // console.log('Error in the adding of developers from Project Manager', new Error(error))
                toast.showToast(`Something went wrong while trying to add team member.`, {
                    theme: 'error',
                    time: 2000,
                });
            })
        }
    },
}
</script>
<style scoped="true">
.move-up {
    margin-top: -30px;
}

.empty-state {
    padding-top: 5%;
}

.empty-state i {
    font-size: 60px;
}
</style>