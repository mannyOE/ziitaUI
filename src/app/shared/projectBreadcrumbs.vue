<template>
    <div class="container breadcrumb">
        <div class="col-md-3 main-path">
            <h4>
                <router-link :to="{ name: 'projects' }">projects</router-link>
                 / <router-link :to="{ name: 'project-overview'}">{{ project.project_name }}</router-link>
                  / <b>{{ routeName }}</b> </h4>
        </div>
        <div class="col-md-6 main-path">
            <!-- PROJECT TITLE HERE -->
            <h3 > {{ project.project_name }} </h3>
        </div>
        <div class="col-md-3 main-path">
        </div>
    </div>
</template>

<script>
     import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'project-breadcrumbs',
        props: ['id'],
        mounted () {
            this.callWithToken({
                parameters: {
                    projectId: this.id, 
                },
                action: this.getProjectById,
            });
        },
        destroyed () {
            this.$_$destroyedHook()
        },
        methods: {
            ...mapActions('projects/byid', [
                'getProjectById',
                'resetState'
            ]),
            ...mapActions('userCredentials', [
                'callWithToken',
            ]),
        },
        computed: {
            ...mapGetters("projects/byid", [
                'project'
            ]),
            routeName() {
                return this.$route.name
            }
        }
    }
</script>

<style>
</style>
