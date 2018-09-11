<template>
    <div >
    <div class="rectangle" @click.stop="openDevDetail" style="margin: 30px !important;">
     <div class="rectangle-inner" align="center">
            <div class="person-img">
            <img class="person-img oval img img-circle" :src="imageLink(member)" >
        </div>
        <div class="people-card">
            <!-- {{member}} -->
            <span class="dev-name">{{ member.first_name }} {{ member.last_name }}</span>
            <span class="dev-email">{{member.Email }}</span>
            <span class="dev-position">{{ $_$getUserTypeName(member.type) }}</span>
        </div>
        <span class="chat-bubble">
        <i class="ion-ios-chatbubble-outline shape"></i>
        </span>
     </div>
    </div>


  
    </div>
</template>

<script>
import NoMember from "@/app/shared/NoMember";
import { mapActions, mapGetters } from 'vuex';
import { API } from '../../../config';

export default {
    name: "member-card",
    props: ['member', 'pendingInvite', 'project','id','projectId','people'],
    components: {
      NoMember,
    },
    data() {
        return {
          showDevModal: false,
          api: API
        }
    },
    mounted(){
        return;

        this.callWithToken({
        parameters: {
            id: this.user.team_Id, // project id
        },
        action: this.getClientTeam,
    });
    },
    computed: {
             ...mapGetters('userCredentials', [
            'user',
        ]),
          ...mapGetters('team',
                {all_team:'team'}
        ),
              ...mapGetters('projects/getTeam', [
                'team',
                'loading',
                'error',
            ]),
    },
    methods: {
        imageLink(member){
            if(!member.profile_thumbnail){
                return require('@/assets/img/user.svg');
            }
            return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
        },
        openDevDetail() {
           if(this.people){
        this.$router.push("/user/dashboard/developer/stats/"+this.member.Id+"/")

           }    
           else{
              this.showDevModal = true;
           } 
        },
        closeDev() {

            this.showDevModal = false;
        },
        reloadStore(type, id) {
            return;
            this.$emit('reloadStore', type, id)
        },
          ...mapActions('team',[
             'getClientTeam'
        ]),
           ...mapActions('userCredentials', [
        'callWithToken',
      ]),
    }
 
};
</script>
<style scoped>
    .member-card{
        position: relative;
    }
    .member-card img{
        top: -45px !important;
        /*position: absolute;*/
        /*margin-top: -45px;*/
    }
    .oval {
    height: 60px;
    width: 60px;
}
.dev-name{
    height: 22px;
    width: 100%;
    color: #413E3E;
    /*font-family: "Montserrat" !important;*/
    font-size: 17px;
    font-weight: bold;
    line-height: 22px;
    text-align: center;
    display: block;
    margin-top:19px;
    overflow: hidden;
}
.dev-email{
    height: 20px;
    width: 100%;
    color: #8C8989;
    /*font-family: "Montserrat" !important;*/
    font-size: 15px;
    line-height: 20px;
 overflow: hidden;
    display: block;
}
.rectangle-inner{
    height: 212px;
    width: 100%;
}
.shape {
    /*height: 13.39px;*/
    /*width: 16.36px;*/
    margin: 5px;
}
 .chat-bubble{
    box-sizing: border-box;
    /*height: 31px;*/
    /*width: 31px;*/
    border: 1px solid #D6DAE5;
    border-radius: 100%
}
.dev-position {
    height: 20px;
    width: 100%;
    color: #453F3F;
    /*font-family: "Montserrat";*/
    font-size: 15px;
    line-height: 20px;
    margin-top: 17px;
    margin-bottom: 23.5px;
    display: block;
}
    .rectangle{
    /*height: 200px;*/
    width: 260px;
    padding-top:30px;
    padding-bottom: 30px;
    margin: 30px !important;
    /*padding-left: 58px;*/
    /*padding-right: 58px; */
    border-radius: 8px;
    background-color: #FFFFFF;
    box-shadow: 0 14px 13px -14px rgba(111,150,254,0.1);

}
.rectangle:hover{
        /*box-shadow: 1px 1px 8px rgba(111,150,254,0.1);*/
        box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
}
</style>
