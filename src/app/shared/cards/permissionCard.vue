<template>
    <span>
    <div class="people active member-card" @click.stop="openDevDetail">
        <div class="person-img">
            <img :src="imageLink(member)" >
        </div>
        <div class="people-card">
            <!-- {{all_team}} -->
            <h3>{{ member.first_name }} {{ member.last_name }}</h3>
            <h5>{{ $_$getUserTypeName(member.type) }}</h5>
        </div>
        <div class="tools">
            <i class="ion-compose"> &nbsp <small>Set Permissions</small></i>
        </div>
    </div>

    <PermModal @reloadStore="reloadStore"
        :member="member"
        @refresh="fetchPermissions(member.Id)"
        :show.sync="showDevModal"
        @close="closeDev"/>

    </span>
</template>

<script>
import PermModal from "@/app/shared/modals/permissions";
import { mapActions, mapGetters } from 'vuex';
import { API } from '../../../config';

export default {
    name: "permissions-card",
    props: ['member'],
    components: {
      PermModal,
    },
    data() {
        return {
          showDevModal: false,
          api: API
        }
    },
    mounted(){
    },
    computed: {
             ...mapGetters('userCredentials', [
            'user',
        ]),
      },
    methods: {
        imageLink(member){
            if(!member.profile_thumbnail){
                return require('@/assets/img/1.jpeg');
            }
            return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
        },
        openDevDetail() {
          this.fetchPermissions(this.member.Id);
          this.showDevModal = true;
        },
        ...mapActions('roles', [
            'getRoles',
            'resetState',
        ]),

        fetchPermissions(id){
          this.callWithToken({
          parameters: {
              Id: id, // project id
              Type: this.member.type,
            },
            action: this.getRoles,
            });
        },

        closeDev() {
            this.showDevModal = false;
        },
        reloadStore(type, id) {
            this.$emit('reloadStore', type, id)
        },
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
    }

};
</script>
<style>
    .member-card{
        position: relative;
    }
    .member-card img{
        top: -45px !important;
        /*position: absolute;*/
        /*margin-top: -45px;*/
    }
</style>
