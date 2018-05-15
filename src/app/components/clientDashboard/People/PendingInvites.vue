<template>

  <div class="col-xs-12" style="padding: 40px;" >
    <table class="people-table">
      <thead>
      <tr class="tr" style="">
        <th><b style="margin-left: 27px;">Basic Info</b></th>
        <th><b>Invite ID</b></th>
        <th><b>Role</b></th>
        <th><b>Sent At</b></th>
        <th><b>Status</b></th>
        <th><b>Action</b></th>
      </tr>
      </thead>
      <tbody>
      <tr class="pple-tr">
        <td >
          <div class="row" >
            <div class="col-xs-3" style="margin-left: 27px;">
              <img src="../../../../assets/img/1.jpeg" class="pple-img" >
            </div>
            <div class="col-xs-8" >
              <p><b class="p-name">Gary Kim</b><br>
                <small class="email" >gary.kim@gmail.com</small></p>
            </div>
          </div>
        </td>
        <td>#30298367</td>
        <td>070-30192837</td>
        <td>Frontend Developer</td>
        <td>Pending</td>
        <td>
            <div class="row" >
                <div class="col-xs-4" >
                  <img src="../../../../assets/img/wrong.svg" class="ac-img">
                </div>
                <div class="col-xs-4" style="margin-right: 27px;" >
                  <img src="../../../../assets/img/clockwise.svg" class="ac-img" >
                </div>
            </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <!--<span>-->
    <!--<div class="container">-->
      <!--<div class="row">-->



        <!--&lt;!&ndash;<div class="col-md-6 main-title">&ndash;&gt;-->
          <!--&lt;!&ndash;<h3>Total&ndash;&gt;-->
            <!--&lt;!&ndash;<span >({{ invites.length }})</span>&ndash;&gt;-->
          <!--&lt;!&ndash;</h3>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;<div class="col-md-12">&ndash;&gt;-->
          <!--&lt;!&ndash;<div class="row">&ndash;&gt;-->

            <!--&lt;!&ndash;<LoadingBar v-if="loading"/>&ndash;&gt;-->
            <!--&lt;!&ndash;&lt;!&ndash;Style component, don't change it&ndash;&gt;&ndash;&gt;-->
            <!--&lt;!&ndash;<FetchError v-else-if="error">{{ error }}</FetchError>&ndash;&gt;-->

            <!--&lt;!&ndash;<NoMember v-else-if="!invites || !invites.length && !loading">&ndash;&gt;-->
              <!--&lt;!&ndash;No pending invites found&ndash;&gt;-->
          <!--&lt;!&ndash;</NoMember>&ndash;&gt;-->

            <!--&lt;!&ndash;<div v-else v-for="(member, index) in invites" :key="index" class="col-md-3">&ndash;&gt;-->
              <!--&lt;!&ndash;<MemberCard :member="member" :pendingInvite="true" @reloadStore="reloadStore"/>&ndash;&gt;-->
            <!--&lt;!&ndash;</div>&ndash;&gt;-->

          <!--&lt;!&ndash;</div>&ndash;&gt;-->
        <!--&lt;!&ndash;</div>&ndash;&gt;-->
      <!--</div>-->
    <!--</div>-->

  <!--</span>-->

</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { destroyedHook } from '@/app/helpers';
import NoMember from "@/app/shared/NoMember";

export default {
  name: "pending-invites",
    components: {
      NoMember,
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters('team/getPendingInvites', [
        'invites',
        'loading',
        'error',
      ]),
    },
    methods: {
        reloadStore(type, id) {
            this.$emit('reloadStore', type, id);
        },
        // imageLink(member){
        //     if(!member.profile_thumbnail){
        //         return require('@/assets/img/1.jpeg');
        //     }
        //     return this.api + 'img/thumbnails/'+ member.profile_thumbnail;
        // },
    }
 
};
</script>
<style scoped="true">
  .ac-img{
    height: 20px;
    margin: auto;
  }
  .tr{
    height: 70px;
    /*padding: 27px 37px 27px 37px;*/
    padding-left: 37px;
    padding-top: 27px;
    padding-bottom: 27px;
    padding-right: 37px;

  }
  .pple-img{
    width: 45px;
    height: 45px;
    border-radius: 100%;
    border: 1px solid #a7a7a7;

  }
  .pple-tr{
    padding-top: 13px;
    padding-bottom: 13px;
    padding-left: 39px;
    padding-right: 39px;
    height: 70px;
    /*padding: 13px 39px;*/
  }
  .pple-tr:hover{
    background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
    box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
    cursor: pointer;
    color: #fff;
    border-radius: 8px;
  }
  .people-table{
    border-radius: 8px;
    background-color: #FFFFFF;
    width: 1020px;
    box-shadow: 0 18px 31px 1px rgba(50,106,218,0.08);
    color: #8C8989;
    font-family: Montserrat;
    font-size: 14px;
  }
.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

</style>
