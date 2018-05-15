<template>
<el-dialog :visible="show" width="40%"
      :show-close="false"
      :before-close="beforeClose" class="person-c" >

	<!-- {{devstats}} -->
        <div slot="title" style="margin-bottom: 10px;">
          <button type="button" class="close" @click.stop="beforeClose">&times;</button>
        </div>
    <!-- Modal content-->

     <div class="modal-body" align=center>
         <div class="row" >
             <div class="col-xs-3" >

                 <img src="../../../assets/img/docx-icon.png" class="f-v-img" v-show="file.file_ext==='docx'||file.file_ext==='doc'||file.file_ext==='xlsx'||file.file_ext==='xls'||file.file_ext==='pdf'">
                 <img src="../../../assets/img/img-ico-2.png" class="f-v-img" v-show="file.file_ext==='jpg'||file.file_ext==='jpeg'||file.file_ext==='png'||file.file_ext==='svg'">
             </div>
             
             <div class="col-xs-8" >
                 <p class=""><div class="paystack" >
                   <b>{{file.file_name}}</b>
                 </div> <br>
                    <b class="crt" >CREATED {{new Date(file.file_uploaded).toLocaleString("en-us", { month: "long" })}},
                      {{new Date(file.file_uploaded).getDate()}} {{new Date(file.file_uploaded).getFullYear()}}.</b>
                 </p>
             </div>
             <div class="col-xs-12 top" >
                <div class="row" >

                    <div class="col-xs-2 top-2" >
                        <p>FILE</p>
                    </div>
                    <div class="col-xs-6 top-3" style="line-height: 40px; width: 50%; overflow: hidden; text-overflow: ellipsis;">
                        <small id="link">{{api+file.file_Id+'/download'}}</small>
                    </div>
                    <div class="col-xs-2 top-4" >
                        <a class=" btn" name="button" @click="copy_link(api+file.file_Id+'/download')">
                          <i class="ion-ios-browsers-outline" style="margin: auto; cursor: pointer;"></i>
                          <span id="fb"></span>
                        </a>
                    </div>

                </div>
             </div>
             <div class="col-xs-12 " style="border-bottom: 1px solid rgba(214,218,229,0.34);" >
                 <div class="row" >
                     <div class="col-xs-6 top--2-1" >
                         <a class="btn" target="_blank" name="button" :href="api+file.file_Id+'/download'" download>
                             <i class="ion-ios-download-outline" style="font-size: 25px; color: #453F3F;"></i>
                         </a>

                     </div>
                     <div class="col-xs-6 top--2-2" >
                         <a class=" btn" name="button" @click="deleteFile(file.file_Id)">
                             <i class="ion-ios-trash-outline" style="font-size: 25px; color: #453F3F;"></i>
                         </a>

                     </div>
                 </div>
             </div>

             <div class="col-xs-12" style="margin-top: 35px;" >
                 <div class="row" >
                     <div class="col-xs-12" >
                        <p class="share"> SHARE WITH TEAM</p>
                    </div>
                     <div class="row"><div class="col-xs-2"></div>
                         <div class="input-group col-xs-8" style="margin-bottom: 10px; margin-right: auto; marrgin-left: auto;">
                            <input type="text" class="form-control" placeholder="Search the List" 
                            v-model="search" @input="searching">
                            <div class="input-group-btn">
                            <button class="btn btn-default" @click="searching" type="submit">
                                <i style="font-size: 14px;" class="fa fa-search"></i>
                            </button>
                            </div>
                        </div>
                     </div>
                     <div class="col-xs-12 olf" >
                         <table class="col-xs-10 col-xs-offset-1">
                             <tbody>
                             <tr class="team-tr" v-for="(member, index) in computedTeam" @click="shareWith(member.Id)">
                                 <td>
                                     <div class="row">
                                         <div class="col-xs-4" ><img :src="imageLink(member)" class="img-tr" @click="copy_link(member.Id)"></div>
                                         <div class="col-xs-8" >
                                             <p class="tr-txt text-left" >{{ member.first_name }} {{ member.last_name }}</p>
                                         </div>
                                     </div>
                                 </td>
                                 <td style="margin-right: 20px;">
                                     <p class="tr-txt" v-if="file.file_source === member.Id">Owner</p>
                                     <p class="tr-txt" v-else>
                                       <p-check class="p-default p-curve p-thick p-pulse"
                                       color="primary-o"
                                       :checked="file.shared_with.indexOf(member.Id)>-1"/>
                                     </p>
                                 </td>

                             </tr>

                             </tbody>
                         </table>
                     </div>
                 </div>
             </div>
         </div>
            <!--<label>Download Url:</label><p class="blue-grey">{{ api+file.file_Id+'/download' }}</p>-->
            <!--<label>File Uploaded By</label><p class="blue-grey" v-html="upload_by(file.source)"></p>-->
            <!--<label>File Type</label><p class="blue-grey">{{file.file_ext}}</p>-->

            <!--<p class="blue-grey">-->
              <!--<a v-if="upload_by(file.file_source) === 'ME'" class=" btn" name="button" @click="deleteFile(file.file_Id)">-->
                  <!--<i class="fa fa-trash fa-4x" style="color: #fff"></i>-->
              <!--</a>-->
              <!--<a class="btn" name="button" :href="api+file.file_Id+'/download'" download>-->
                <!--<i class="fa fa-download fa-4x" style="color: #fff"></i>-->
            <!--</a>-->
            <!--</p>-->


          </div>

</el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { API } from '../../../config';
export default {
  name: 'developer-detail',
  props: ['show', 'file','type'],
  data(){
	  return {
      zinc: false,
		  api: API,
		  deleting: true,
      view_no_access: false,
      search: '',
      showing: null,
	  }
  },
  watch: {

  },
  mounted () {
    // this.fetchTeam();
    // this.state = this.roles.split('');

  },
  computed: {
    ...mapGetters('roles', ['success','error','roles','more']),
    ...mapGetters('projects/getTeam', [
      'team',
      'loading',
      'error',
    ]),
    ...mapGetters('userCredentials', ['user','permissions']),
     ...mapGetters('team/getProjects', {
            hola:'projects'
            }),
    ...mapGetters('team',
            {all_team:'team'}
        ),
    isClient(){
      if(this.member.type === '1'){
        return true;
      }
    },
    computedTeam(){
        if(this.showing == null){
                    return this.dis_team();
                }else{
                    return this.showing;
                }
    },

  },
  methods: {
    shareThisFile(id){
      console.log("Hov");
    },
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
      copy_link(link){
        var $temp = $("<input>");
        $(".modal-body").append($temp);
        $temp.val(link).select();
        document.execCommand("copy");
        $temp.remove();
        $('#fb').html('<span class="fa fa-checked">Copied</span>');
        setTimeout(function () {
          $('#fb').html('');
        }, 3000);
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
      fetchTeam(){
        this.callWithToken({
        parameters: {
          id: this.$route.params.id, // clients team id
        },
        action: this.getTeam,
      }).then(err=>{
        this.currentTeam = this.team;
      });
    },
    ...mapActions('projects/getTeam', [
      'getTeam',
      'resetState'
    ]),
      ...mapActions('userCredentials', [
          'callWithToken'
      ]),
      ...mapActions('roles', [
          'updatePermissions',
          'resetState',
      ]),
      upload_by(id){
        let source = 'ME';
        this.team.forEach((tem)=>{
          if(tem.Id === id){
            source = tem.first_name+' '+tem.last_name;
          }
        });
        return source;
      },


      deleteFile(id){
        this.$emit('delete',id);
      },
      shareWith(id){
        this.$emit('share', id);
      },
      imageLink(member){
           if(!member.profile_thumbnail){
               return require('@/assets/img/user.svg');
           }
           return this.$API + 'img/thumbnails/'+ member.profile_thumbnail;
       },

// src="../../../assets/img/1.jpeg"


    beforeClose(done) {
      // emit('reloadStore');
      this.$_$closeModal();
      	//   done();
      	// this.$router.reload();

    },
    reloadStore(type, id) {
	//   this.$emit('reloadStore', type, id);
      	 const args = {
            Id: this.member.Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.gtDev,
              reloadArgs: args
		  })

    },

  }
};
</script>



<style scoped>
    .team-tr{
        padding-top: 15px !important;
        padding-left: 15px !important;
        padding-right: 15px;
        color: #453F3F;
        font-family: Montserrat;
        font-size: 14px;
        height: 50px;
        cursor: pointer;
        background-attachment: fixed;
    }
    .team-tr:hover{
        background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
        box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
        color: #fff;
        border-radius: 5px;
        background-attachment: fixed;
    }
    /*.tr-txt{*/
        /*color: #453F3F;*/
        /*font-family: Montserrat;*/
        /*font-size: 14px;*/
    /*}*/
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
    .olf {
        height: 200px;
        overflow-y: auto;
        margin-bottom: 20px;
    }
    .share{
        color: #453F3F;
        font-size: 12px;
        font-family: Montserrat;
        padding-left: 10px;
        padding-top: 5px;
    }
    .top--2-1{
        padding: 20px 100px;
        text-align: center;
        color: #a7a7a7;
        font-size: 20px;
        border-right: 1px solid rgba(214,218,229,0.34);
    }
    .top--2-2{
        padding: 20px 100px;
        text-align: center;
        color: #a7a7a7;
        font-size: 20px;
    }
    .top{
        border-top: 1px solid rgba(214,218,229,0.34);
        border-bottom: 1px solid rgba(214,218,229,0.34);
        margin-top: 35px;
    }
    .top-1{
        border-right: 1px solid rgba(214,218,229,0.34);
        padding: 37px;
    }
    .top-2{
        padding: 20px;
        font-size: 12px;
        color: #453F3F;
        font-weight: 500;
        border-right: 1px solid rgba(214,218,229,0.34);
    }
    .top-3{
        color: #453F3F;
        font-size: 14px;
        padding-left: 12px;
        padding-top: 12px;
    }
    .top-4{
        padding-top: 23px;
    }
    .paystack{
        color: #413E3E;
        font-size: 17px;
        font-family: Montserrat;
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .crt{
        color: #8C8989;
        font-size: 12px;
        font-family: montserrat;
    }
    .f-v-img{
        height: 40px;
        width: 40px;
    }
    .link {
      font-size: 40px;
    }
    #fb {
      margin-left: 25px;
    }


/*.img-class{*/
  /*height: 100%;*/
  /*width: 100%;*/
/*}*/
/*.wrapper {*/
/*position: relative;*/
/*margin-top: 30px;*/
/*height: 100%;*/
/*width: 100%;*/
/*border-radius: 10px;*/
/*}*/

/*!**/
/**  The .navi properties are for styling only*/
/**  These properties can be changed or removed*/
/**!*/
/*.navi {*/
/*height: 100%;*/

/*}*/


/*!**/
/**  Position the #infoi element in the top-right*/
/**  of the .wrapper element*/
/**!*/
/*#infoi {*/
/*position: absolute;*/
/*top: 30%;*/
/*right: 45%;*/

/*!**/
/**  Styling only, the below can be changed or removed*/
/**  depending on your use case*/
/**!*/
/*height: 20px;*/
/*padding: 10px 10px;*/
/*}*/

  /*.blue-grey{*/
    /*background-color: #3369da;*/
    /*color: #fff;*/
  /*}*/

</style>
