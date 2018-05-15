<template>
    <div class="templ">
		<div class="container">
			<div class="row">
				<p>Project Name</p>
				<h4 class="f-s-18"><b>{{ project.name }}</b></h4>
				<hr class="nav-moduules-hr">
				<create-project-tabs @createProject="addProject"/>
		</div>
	</div>
</div>
</template>

<script>
	import CreateProjectTabs from './tabcentral'
	import { mapActions, mapGetters } from 'vuex';

    export default {
        name: 'create-project',
		components: {
            CreateProjectTabs,
		},
		data () {
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
		destroyed () {
			this.$_$destroyedHook();
		},
		computed: {
			...mapGetters('persistentState', [
				'project',
			]),
			...mapGetters('userCredentials', [
				'user',
			]),
		},
		methods: {
			...mapActions('projects/add', [
				'createProject',
				'resetState'
			]),
			...mapActions('userCredentials', [
				'callWithToken',
			]),
			addProject (details) {
				let args = {
					project_name: this.project.name,
					project_description: this.project.description,
					company_Id: this.user.Id,
					manager_Id: details.projectManager,
					platform: details.type.id,
					platform_name: details.type.name,
                    team: []
				};
                if(details.projectManager){
                    args.team.push(details.projectManager);
                }
                debugger;
				const self = this;

				this.callWithToken({
					parameters: args,
					action: this.createProject,
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
.nav-moduules-hr {
    width: 24%;
    height: 2px;
    background: #3369da;
    border: none;
    margin-left: 0%;
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
.el-tabs__item.is-active {
    color: #3369da !important;
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
