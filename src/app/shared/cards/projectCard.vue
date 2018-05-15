<template id="">
    <div class="project-card people">
      <div class="top">
        <span class="ion-ios-monitor-outline top-icons"  v-if="project.platform_name === 'other'"></span>
        <span class="ion-android-phone-portrait top-icons" v-if="project.platform_name === 'mobile'"></span>
        <span class="ion-android-globe top-icons" v-if="project.platform_name === 'web'"></span>
        <span class="pull-right created-date">Created {{intuitDate}}</span>
      </div>
      <div class="details">
        <h4>{{project.project_name}}</h4>
        <div class="details-description">{{project.project_description}}</div>
      </div>
      <div class="team">
          <!-- <img :src="require('@/assets/img/centralLogo.png')" class="img" alt="">
          <img :src="require('@/assets/img/centralLogo.png')" class="img" alt=""> -->

          <p>
            <ul>
              <li v-for="(tem, index) in currentTeam" :style="{left: '-'+index*10+'px'}" :key="index">
                <img class="img" :src="imageLink(tem)">
             </li>

             <span class="pull-right members">{{total}} Member(s)</span>
                 <!-- <li v-for="tem in team"><img :src="returnImage(tem)" class="img" alt=""> </li> -->
            </ul>
          </p>
      </div>


      <div class="tool-box people">
        <button class="btn btn-default fa fa-user" style="border-radius: 50%;"
        @click.stop="assignMember"></button>
        <button class="btn btn-default fa fa-trash-o" style="border-radius: 50%; background: #FFDFE3; border: #FF5C72; color: #FF5C72"
        @click.stop="deleteP" v-if="check_permission('manageProject')"></button>
        <button class="btn btn-default pull-right btn-rounded"
        @click.stop="overview">VIEW</button>
      </div>
    </div>
</template>

<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";

  export default {
    props: ['project','index','clienTeam'],
    data() {
      return {
        currentTeam: [],
        total: 0,
      }
    },
    mounted(){
      this.fetchTeam();

    },
    methods:{
      ...mapActions('projects/getTeam', [
        'getTeam',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
      fetchTeam(){
        this.project.team.forEach(id =>{
          this.clienTeam.forEach(dev=>{
            if(dev.Id === id){
              this.currentTeam.push(dev);
            }
          })
        });
        this.total = this.currentTeam.length;
        if(this.total >=4){
          this.currentTeam = this.currentTeam.slice(0,4);
        }
        if(this.total < 4){
          var left = 4 - this.total;
          for (var i = 0; i < left+1; i++) {
            this.currentTeam[this.total+i] = {};
          }
          this.currentTeam = this.currentTeam.slice(0,4);
        }
    },
    assignMember(){
      this.$emit("assign",this.project.Id);
    },
    overview(){
      this.$emit("overview",this.project.Id);
    },
    deleteP(){
      this.$emit("delete",this.project.Id, this.index);
    },

    imageLink(member){
        if(member.profile_thumbnail === undefined){
            return require('@/assets/img/1.jpeg');
        }
        return this.$API + 'img/thumbnails/'+ member.profile_thumbnail;
    },
    check_permission(rule){
      var state = false;
      this.permissions.forEach((perm)=>{
        if(perm.Permission === rule){
          state = true;
        }
      })
      return state;
    },

    },
    computed:{
      ...mapGetters('projects/getTeam', [
        'team',
        'loading',
        'error',
      ]),
      ...mapGetters('userCredentials', [
          'user',
          'permissions'
      ]),
      intuitDate(){
        var time = 'some time ago';
        if(this.project.created_time !== undefined){
          var t = this.project.created_time.split('-').reverse().toString().replace(/,/g, '-');
          var dt = new Date(Number(this.project.created_time));
          var days =((new Date() - dt)/36e5)/24;
          // console.log(dt, new Date());
          if(days<7){
            if(days > 1){
              return Math.floor(days)+" days ago";
            }else{
              return Math.floor(days * 24)+" Hours ago";
            }

          }else{
            if(days < 31){
              // weeks ago
              return Math.floor(days/7)+' weeks ago';
            }else{
              if(days < 365 ){
                // months ago
                return Math.floor(days/31)+' months ago';
              }else{
                // years ago
                return Math.floor(days/365)+' years ago';
              }
            }
          }

        }
        return time;
      }
    }

  }
</script>

<style media="screen" scoped>
.people{
  background: #ffffff;
  border-radius: 5px;
  padding: 13px;
  padding-top: 15px;
  margin-top: 5px;
  transition: all .4s ease;
  margin-bottom: 10px;
  box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.08);
}
.btn-rounded {
  padding: 10px 30px 10px 30px;

    color: #326ada;

  background: none;
  font-size: 14px;
  /*font-family: 'PT Sans', sans-serif;*/
    border: 1px solid #326ada;
}
.btn-rounded:hover{
    transition: 0.3s ease-in-out;
    /*border: none;*/
    background: #326ada;
    color: #fff;
}
.btn-circle {
  border-radius: 50%;
  background: #EF6375;
  color: #fff;
  box-shadow: 0 11px 37px 0 rgba(0, 0, 0, 0.13);
}
.btn-circle:hover {
  background-color: #fff;
  color: #EF6375;
}
.img {
  border-radius: 100%;
  height: 25px;
  width: 25px;
}
.team ul {
  position: relative;
  padding-top: 20px;
  left: -30px;
  list-style-type: none;
}
.team ul li {
  position: relative;
  display: inline-block;
}


.people .tool-box {
    border-top: 1px solid rgba(214,218,229,0.34);
}

.top-icons {
  margin: 5px;
  font-size: 18px;
}
.top {
  color: #A8BCE4;
  padding: 10px;
}
.details {
  padding: 10px;
}
.details h4 {
	text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
	color: #453F3F;
  text-transform: capitalize;
	/*font-family: 'PT Sans', sans-serif;*/

	font-size: 16px;
	font-weight: 600;

	line-height: 31px;
  overflow: hidden;
}
.details-description{
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #453F3F;
  /*font-family: 'PT Sans', sans-serif;*/

  font-size: 12px;

  line-height: 18px;
  overflow: hidden;
  margin-top: -10px;
}
.created-date {
  	height: 13px;
    width: auto;
    color: #D6DAE5;
    /*font-family: 'PT Sans', sans-serif;*/
    font-size: 11px;
    font-weight: bold;
    line-height: 13px;
}
.members {
  	height: 18px;
    width: 83px;
    color: #8C8989;
    font-family: 'PT Sans', sans-serif;
    font-size: 11px;
    line-height: 20px;
    text-align: right;
}

.people:hover {
  background: #ffffff;
  /* transform: rotate(90deg); */
  box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.25);
  border-radius: 1px;
  /* margin-top: 27%; */
}
.stats-card {
  height: 75px;
  width: 24%;
  margin-right: 10px;
  text-align: left;
}
.project-card {
  height: 265px;
  width: 100%;
    position: relative;
  margin-right: 50px;
  text-align: left;
}
.project-card .tool-box {
  position: absolute;
  bottom: 0px;
  margin: 5px 0px 0px -13px;
  width: 100%;
  height: auto;
}
.heading {
  text-transform: uppercase;
  font-weight: bolder;
  font-size: 11px;
  padding-bottom: 10px;
}


</style>
