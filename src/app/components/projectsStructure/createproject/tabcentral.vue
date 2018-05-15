<template>
    <el-tabs  v-model="activeTabName"
        tab-position="left"
        @tab-click="handleTabClick"
        style="height: 100%;margin-top:-30px">
      <el-tab-pane name="projectType"
        :disabled="disableType" >
        <!--Tab Label-->
        <span slot="label">
            <small>Select Project Type</small>
            <h4>Choose Your Project Type</h4>
        </span>
        <!--Tab content-->
        <ChooseProjectType @next="handleProjectType"/>
      </el-tab-pane>

      <el-tab-pane name="projectManager"
        :disabled="disableManager">
        <!--Tab Label-->
        <span slot="label">
            <small>Select Project Manager</small>
            <h4>Choose Your Project Manager</h4>
        </span>
        <!--Tab content-->
        <ChooseProjectManager @next="addProject" @back="goToProjectType"/>
      </el-tab-pane>

  <!--  -->
    </el-tabs>
</template>

<script>
	import TabMenu from './tabmenu'
	import ChooseProjectType from './tabcontents/project-type'
	import ChooseProjectManager from './tabcontents/project-management'
	import ReachOut from './tabcontents/reachout'

    export default {
        name: 'create-project-tabs',
        props: ['name'],
		components: {
            TabMenu,
            ChooseProjectType,
            ChooseProjectManager,
            ReachOut,
		},
		data () {
			return {
				activeTabName: 'projectType',
				projectDetails: {
                    type: {
                        id: null,
                        name: null,
                    },
                    projectManager: null,
                },
                disableType: false,
                disableManager: true,
                disableReach: true,
			};
		},
        computed: {
        },
		methods: {
            handleTabClick(tab, event) {
                // if (tab.name === 'invites') {
                // this.fetchInvites();
                // } else if (tab.name === 'team') {
                // this.fetchTeam();
                // }
            },
            goToProjectType (type) {
                /**
                 * enable project type tab and navigate to it
                */
                this.disableType = false;
                this.activeTabName = 'projectType';

            },
            goToProjectManager (id) {
                /**
                 * disable project type,
                 * enable project manager tab and navigate to it
                */
                this.disableType = true
                this.disableManager = false
                this.activeTabName = 'projectManager'
            },
            goToReachOut (id) {
                /**
                 * disable manager,
                 * enable reach out tab and navigate to it
                */
                this.disableManager = true
                this.disableReach = false
                this.activeTabName = 'reachOut'
            },
            handleProjectType (type) {
                /**
                 * Store chosen project type
                 * enable next tab(manager) and navigate
                */
                this.projectDetails.type.id = type.id
                this.projectDetails.type.name = type.name

                this.goToProjectManager()
            },
            handleProjectManager (id) {
                /**
                 * Save chosen project manager id
                */
                this.projectDetails.projectManager = id;

                this.goToReachOut()
            },
            addProject (id) {
                if(id){
                    this.projectDetails.projectManager = id;
                }
                /**
                 * Pass the data to create project
                 * parent component to handle it
                */
                this.$emit('createProject', this.projectDetails)
            },
		},
    }
</script>

<style scoped>
small{
    font-family: open sans;
}
.el-tabs__item.is-active {
    color: #3369da !important;
}
</style>
