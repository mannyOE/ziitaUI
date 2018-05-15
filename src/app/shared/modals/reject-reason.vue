<template>
    <div >
  <!-- sds    {{accepting}}  -->
        <!-- Modal content-->
        <!--   <div slot="title">
            <button type="button" class="close" @click="closeModal()">&times;</button>
          </div>   -->
            <!-- <h4 class="modal-title"></h4> -->
              <div class="modal-body" >
            <!-- {{module}} -->
                <div class="row">


                <!-- {{method.method_test}}                          -->
<!--  -->
     <!--  <el-tab-pane

{}
       v-for="(method, index) in module.method"
          :key="index"
          align="left"
        :label="method.method_name "
         >
           -->
        <!-- <div class="modules-wrppwer-side"> -->
        <div class="row tests">
          <label style="margin-left: 35px;">Tests</label>
          <div class="pull-right" style="margin-top: -10px; margin-right: 15px;">
            <select class="form-control" style="width: 100px;" v-model="filter"
            @change="filterTests">
              <option value="all">All</option>
              <option v-for="(opt, index) in statusOptions" :value="index">{{opt}}</option>
            </select>
          </div>
          <label class="pull-right" style="margin-right: 5px;">Sort Tests: </label>
        </div>
           <div class="row">
              <div class="col-md-12" >


                            <table class="col-md-12">
                                <thead >
                                <tr style="text-indent: 30px; height: 50px;">
                                    <th>
                                        Test Case
                                    </th>
                                    <th>
                                      Expected Outcome
                                    </th>
                                    <th>
                                      Status
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr class="team-tr" v-for="(mod, dura) in current">
                                  <td>{{mod.case}}</td>
                                  <td> <div style="width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{mod.acceptance|| '--'}}</div> </td>
                                  <td><select  :style="{color: '#000', width: 100+'px'}" :disabled="done"
                                    class="form-control" :id="mod._id" @change="changeState(dura, mod._id)">
                                    <option v-for="(opt, index) in statusOptions"
                                    :value="opt"
                                    :selected="mod.status === index"
                                    >{{opt}}</option>
                                  </select></td>
                                </tr>
                                <tr class="team-tr" v-if="current.length < 1">
                                  <td colspan="3" class="text-center">No Tests in this category! </td>
                                </tr>

                                </tbody>
                            </table>


                      </div>
                   <!--    <div class="col-md-12">
                          <div class="form-group">
                              <p>Issue</p>
                              <textarea rows="2" v-model="reason" class="form-control"></textarea>
                            </div>
                      </div>
                      <div class="col-md-12">
                        <div class="form-group">
                          <p>Extend Time (hours)</p>
                          <input type="number" min="1" placeholder="Extend Time"  name="extend" v-model="extended_time">
                        </div>
                      </div> -->
           </div>
         <!-- </div> -->

     <!-- </div> -->
      <!-- </el-tab-pane> -->
  <!-- </el-tabs>  -->


                    </div>
                    </div>

                    <!-- </div> -->
                </div>
          </div>

 <!--          <div class="modal-footer" align=center>
 <button type="button" class="btn btn-success" @click="accept_module" v-if="!isLoading">Done</button>
   <LoadingButton v-else buttonclass="btn btn-default">Loading...</LoadingButton>
 <button type="button" class="btn btn-warning" @click="reject_module" v-if="!reject"   >Reject </button>
   <LoadingButton v-else buttonclass="btn btn-default">Rejecting...</LoadingButton>
          </div>
          </div>


   </div>
 </div> -->
</template>
<script>
   import { mapActions, mapGetters } from "vuex";

export default {

props: ["show_reason_modal","method","isLoading","done"],

data(){
  return {
    reason :'',
    rejecting : false,
    extended_time:'',
    showing:null,
    statusOptions: ['Untested','Passed', 'Failed'],
    test_state: null,
    filter: '',

  }
}
,
methods:{

               ...mapActions('categories', [
        'getCategories',
    ]),
             ...mapActions('userCredentials', [
        'callWithToken',
    ]),
    closeModal(){
      this.$emit("closeReasonModal");
    } ,
    changeState(index, id){
      var current = document.getElementById(id).value;
      if (current === "Untested") {
        this.method.method_test[index].status = 0;
      }
      if (current === "Passed") {
        this.method.method_test[index].status = 1;
      }
      if (current === "Failed") {
        this.method.method_test[index].status = 2;
      }
      this.$emit("updateChart");
    },
    pass(method_index,test_index){
      var method = this.module.method[method_index];
      if(method.method_test[test_index].status==0)
        this.module.method[method_index].method_test[test_index].status = 1;
      else if(method.method_test[test_index].status==1)
         this.module.method[method_index].method_test[test_index].status = 2;
         else if(method.method_test[test_index].status==2)
         this.module.method[method_index].method_test[test_index].status = 1;
    },
      ...mapActions('modules/reject', {
          rejectModule: 'rejectModule',
          rejectReset: 'resetState',
      }),
       ...mapActions('modules/accept', {
          acceptModule: 'acceptModule',
          // rejectReset: 'resetState',
      }),
      ...mapActions('modules/add',{
        createModule:'createModule'
      }),
      reject_module(){

           var self = this;
        this.$confirm('Are you sure you want to reject this module?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
          self.setUncheckedToFailed();
            self.callWithToken({

                parameters: {extended_time:self.extended_time,reason:self.reason,module_Id:self.module.Id,Id:self.module.developer_Id, method : self.module.method},
                action: self.rejectModule,
            })
            .then(function (status) {
                if(status) {
                     self.$emit("closeReasonModal");
                } else {
                }
            });
        })


      },
      filterTests(){
        
        if(this.filter === 'all'){
          var selected = this.method.method_test;
          this.showing = selected;
        }else{
          var selected = this.method.method_test.filter(e=>e.status === Number(filter));
          this.showing = selected;
        }
      },

      accept_module(){
            var self = this;
        // this.$confirm('Are you sure you want to accept this module?', 'Warning', {
        //   confirmButtonText: 'Yes, I\'m sure',
        //   cancelButtonText: 'Cancel',
        //   type: 'warning'
        // })
        // .then(() => {
        //   // return;
        //   self.setUncheckedToFailed();
      // this.$emit("saveTests");

        // })
      },
      setUncheckedToFailed(){
        var self = this;
        for(var i=0; i<self.module.method.length;i++){
          for(var x = 0 ; x <self.module.method[i].method_test.length; x++){
            // console.log(self.module.method[i].method_test.length)
              if(self.module.method[i].method_test[x].status==0)
                self.module.method[i].method_test[x].status=2;
          }
        }
      }

},
mounted(){



},
 created(){
        // this.selectedMethod=
          // debugger;

   },
    computed:
{
        isComplete(){
          if(this.method.completed === 0){
            return false;
          }
          return true;
        },
        current(){
          if(this.showing == null){
            return this.method.method_test;
          }else{
            return this.showing;
          }
        },
      ...mapGetters('modules/all', [
        'modules',
        'loading',
        'error',
      ]),
       ...mapGetters('modules/reject', {
        // 'modules',
        'reject':'loading',
        // 'error',
      }),

         ...mapGetters('modules/accept', {
        // 'modules',
        'accepting':'loading',
        // 'error',
      }),

         ...mapGetters('userCredentials', [
            'user',
        ]),
       ... mapGetters('categories', [
             'categories',
              'loading',
                'error',
                ]
                ),
    }
    }





</script>

<style scoped>
.developer-in-list .profile-picture img {
  width: 35px;
  height: 35px;
  border-radius: 100%;
  border: solid 1px #326ada;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2) !important;
}
#myModald .modal-dialog {
    width: 880px !important;
}
.input-ans-overview {
    background: #F0F5F9;
    padding: 6px 13px 1px;
    margin-bottom: 30px;
}
input#test-input {
  width: 100%;
  float: left;
  margin-right: 5px;
}


.nav-wrap {
  background: #326ada;
  padding: 11px 0px;
  border-radius: 8px;
  margin-bottom: 3%;
}


.btn.btn-md.bg-pink.btn-input-params {
    border-radius: 50%;
}
.output-image {
  display: block;
  margin-bottom: 13%;
  margin-top: 13%;
  text-align: -webkit-center;
}

.float-right {
  float: right;
}

.person {
  display: inline-block;
  font-weight: 600;
}


.col-blue {
  color: #728eaa;
}

.personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.well.filter button {
  color: #728eaa;
  font-weight: 500;
}

/*.allItems{
    display: none;
}*/

.well.filter input {
  margin-bottom: 7%;
}

.filter {
  background: #326ada;
  margin-top: 13%;
  color: white;
  border-radius: 1px;
  font-weight: 300 !important;
  z-index: 1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.client-personal-details {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.personal-password {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.deactivate-acc {
  background: white;
  padding: 60px;
  margin-top: -2%;
  z-index: -1;
  border: 0px solid white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1) !important;
}

.form-control:focus {
  border-color: #326ada;
  border: 2px solid #326ada !important;
  outline: 0;
  box-shadow: none !important;
}

.form-control {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 2px solid #dee9f2;
  border-radius: 4px;
  /* -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075); */
  /* box-shadow: inset 0 1px 1px rgba(0,0,0,.075); */
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.personal-details button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.client-personal-details button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.personal-password button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}
.tab-pane ul.nav {
  margin-top: 1% !important;
}
.tab-content {
    margin-top: 9%;
}

td.text-center.option i {
  margin-left: 11px;
}

.output-table {
  margin-top: 14%;
}

.filled {
  color: #6a86a5;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > tfoot > tr > td,
.table > tfoot > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  padding: 10px;
  line-height: 1.42857143;
  vertical-align: to;
  border-top: 1px solid #eaeaea;
}



.float-left {
  border: 2px solid #3484f5;
  border-radius: 50%;
  padding: 13px 18px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}

.float-left-second {
  border: 2px solid #39cc39;
  border-radius: 50%;
  padding: 13px 18px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
}



.txt-small {
  font-size: 13px;
  margin-left: 3px;
  font-weight: 100;
}

.tests {
  /* padding: 0px 0 14px 70px; */
  /* border-top: 1px solid #D8D8D8; */
  border-bottom: 1px solid #D8D8D8;
  width: 104%;
  color: #4A4A4A;
  /* margin: 0px 0 0 -14px;
  font-size: 14px;*/
  height: 35px;
  padding-left: 40px;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  font-weight: 600;

}



.f-s-12 {
  font-size: 12px;
}


.icon-change {
  /*animation: turndeg;
    animation-duration: 2px;*/
  transform: rotate(90deg);
  transition: all 0.3s ease;
}

/*@keyframes turndeg{
    from{transform: rotate(90deg)};
    to{transform: rotate(180deg)};
}*/

.switch {
  position: relative;
  display: inline-block;
  width: 54px;
  height: 26px;
}

.switch input {
  display: none;
}
.el-tabs__item {
  width: 100px !important;
  text-align: left !important;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 4px;
  bottom: 5px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #4ae650;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */

.slider.round {
  border-radius: 50px;
}

.slider.round:before {
  border-radius: 50%;
}

.available button {
  background: #3eca44;
  padding: 8px 28px;
  font-size: 11px;
  color: white;
}


.btn-danger {
  background: #ff0000;
}

.f-weight-3 {
  font-weight: 300;
}

.f-weight-6 {
  font-weight: 400;
}

.f-weight-7 {
  font-weight: 500;
}






.creat-modules {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.creat-modules input {
  margin-bottom: 12px;
  box-shadow: none !important;
  border-radius: 5px;
  border: 2px solid #dee9f2 !important;
}

.creat-modules textarea {
  max-width: 100%;
  margin-bottom: 3%;
  height: 115px;
  resize: none;
  box-shadow: none !important;
  border-radius: 5px;
  border: 2px solid #dee9f2 !important;
}

.modules {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.modules hr {
  background: #326ada;
  height: 2px;
  border-top: none;
  width: 50%;
}

.modules h3 {
  font-weight: 500;
  margin-top: -2%;
}

.modules p {
  font-size: 10px;
}

.nav-module > li > a {
  background: transparent;
  border-right: 1px solid #dee9f2;
  color: black;
  font-size: 12px;
  font-weight: 400;
}

.next-button button {
  padding: 8px 50px;
  margin-top: 2%;
  color: #6a86a5;
  font-weight: 600;
}

.nav-module > li.active > a,
.nav-module > li.active > a:focus,
.nav-module > li.active > a:hover {
  border-right: 3px solid #326ada !important;
  font-weight: 500;
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

.output-depend {
  background: transparent;
  border: none;
  box-shadow: none;
  border-radius: 1px;
}

.f-size-12 {
  font-size: 12px;
}

.hr {
  background: #326ada;
  height: 2px;
  margin-top: 0.6%;
  border-top: none;
  width: 7%;
}

.output-text-click {
  border-bottom: 1px solid #ccc;
  text-align: justify;
  margin-top: 0.321em;
  width: 100%;

  /* IE special */
  width: 100%;
  -ms-text-justify: distribute-all-lines;
  text-justify: distribute-all-lines;
}

.output-text-click:after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 0;
  font-size: 0;
  line-height: 0;
}

.output-text-click p {
  display: inline-block;
  margin-top: 0.321em;
  margin-bottom: 0% !important;
  padding-bottom: 0px !important;

  /* ie 7*/
  *display: inline;
  *zoom: 1;
  *text-align: left;
}

.text-nav {
  display: inline-block;
  vertical-align: baseline;

  /* ie 7*/
  *display: inline;
  *zoom: 1;
  *text-align: right;
}

.text-nav i {
  color: red;
}
.float-icon-add-module {
    position: fixed;
    bottom: 5%;
    left: 35%;
    font-size: 25px !important;
    cursor: pointer;
    /* height: 50px; */
    background: #326ada;
    font-weight: 900;
    padding: 5px 16px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.23);
    box-shadow: 0 2px 15px rgba(0,0,0,0.23);
    border-radius: 100%;
    color: white;
    z-index: 1000;
    /* width: 50px; */
}

button.accordion {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  border: none;
  text-align: left;
  outline: none;
  font-size: 15px;
  transition: 0.4s;
}

button.accordion.active,
button.accordion:hover {
  background-color: #ccc;
}
.btn-fab {
    box-shadow: 0 2px 15px rgba(0, 0, 0, 0.17);
    border-radius: 60px !important;
    position: fixed;
    bottom: 24%;
    right: 2%;
}
button.accordion:after {
  content: "\002B";
  color: #777;
  font-weight: bold;
  float: right;
  margin-left: 5px;
}

button.accordion.active:after {
  content: "\2212";
}
.team-tr{
    padding-top: 15px !important;
    padding-left: 15px !important;
    padding-right: 15px;
    color: #453F3F;
    font-family: Montserrat;
    font-size: 14px;
    height: 50px;
    text-indent: 30px;
    background-attachment: fixed;
}
.team-tr:hover{
    background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
    box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
    color: #fff;
    border-radius: 5px;
    background-attachment: fixed;
}
.asing {
  background: white;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0);
  border: 0px solid white;
  border-radius: 1px;
  color: black;
}

.asing i {
  font-size: 24px;
  font-weight: 900;
  border-radius: 50%;
  padding: 6px 12px;
  color: black;
  border: 2px solid #326ada;
}

.asing h4 {
  margin-top: 6%;
  font-weight: 300;
}

.asing p {
  font-size: 13px;
}

.asing button {
  border-radius: 1px;
  font-weight: 300;
  padding: 9px 45px;
}

.outsource-dev-modal {
  position: fixed;
  max-height: 500px;
  height: 500px;
  overflow-y: scroll;
  width: 70%;
  z-index: 1000 !important;
  background: white;
  display: none;
  border-radius: 1px;
  padding: 19px;
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.12);
  top: 10%;
  left: 20%;
}

.outsource-dev-modal img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
}

.outsource-dev-modal button {
  border-radius: 1px;
  font-weight: 300;
}

.outsource-dev-modal i {
  cursor: pointer;
}

.media i {
  border-radius: 50%;
  font-weight: 300;
  background: white;
  color: #326ada;
  font-size: 20px;
}

.f-size-13 {
  font-size: 13px;
  font-weight: 100;
}

.nav-module hr {
  background: #326ada;
  height: 2px;
  border-top: none;
  width: 100%;
  margin-top: 0px;
  margin-bottom: 15px;
}


/* .nav-side-nav {
    /* position: fixed; */

/* left: 20px;
    height: 200px;
} */
</style>
