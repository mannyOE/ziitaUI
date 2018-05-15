<!--moduledetails-->

<template>
  <div class="seived-module">
  <!--<p class="steps-modules">Step 1 0f 5</p>-->
    <div class="well creat-modules">
      <!-- <label for="">MODULE TEST CASES</label> -->
      <!-- {{testCases}} -->
      <!-- <div class="row" align="right"> -->
      <!-- {{module.test}} -->
      <!-- </div> -->
        <div class="col-xs-12" >
            <div class="row">
                <div class="col-md-5">
                    <input name="test_name"
                           v-validate="'required|min:2'"
                           type="text"
                           v-model="test.case"
                           class="form-control" style="border: 1px solid rgba(50,106,218,0.3) !important;"
                           :class="{'input': true, 'is-danger': errors.has('test_name') }"
                           placeholder="Test Case">


                </div>
                <div class="col-md-5">
                    <input name="test_acceptance"
                           v-validate="'required|min:2'"
                           v-model="test.acceptance"
                           type="text" style="border: 1px solid rgba(50,106,218,0.3) !important;"
                           class="form-control"
                           :class="{'input': true, 'is-danger': errors.has('test_acceptance') }"
                           placeholder="Test Acceptance">

                </div>
                <div class="col-md-2">
                    <button class="add-methods btn btn-primary" @click="addTest()">Add</button>
                </div>

                <div class=" tab">
                    <div class="col-xs-10 col-xs-offset-1" >
                        <div class="row" v-if="module.test">
                            <div class="col-xs-12" >
                                <div class="row" >
                                    <div class="col-xs-5" >Case</div>
                                    <div class="col-xs-5" >Acceptance</div>
                                    <div class="col-xs-2" >Action</div>
                                </div>
                            </div>
                            <div class="col-xs-12" v-for="(_test,index) in module.test">
                                <div class="row" >
                                    <div class="col-xs-5" >
                                        <p class="case-text" >{{_test.case}}</p>
                                    </div>
                                    <div class="col-xs-5" >
                                        <p class="case-text" >
                                            {{_test.acceptance}}
                                        </p>
                                    </div>
                                    <div class="col-xs-2 text-center" >
                                        <i style="font-size: 20px;" class="ion-ios-trash-outline" @click="module.test.splice(index,1)" ></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div  v-else>
                            <br>
                            <span>There are no test cases</span>

                        </div>
                        <!--<table class="table " v-if="module.test">-->
                            <!--<thead>-->
                            <!--<th>Case</th>-->
                            <!--<th>Acceptance</th>-->

                            <!--</thead>-->
                            <!--<tbody class="">-->

                            <!--<tr v-for="(_test,index) in module.test">-->
                                <!--<td><p style="word-break:break-all" class="case-text">{{_test.case}}</p></td>-->
                                <!--<td><p style="word-break:break-all" class="case-text">{{_test.acceptance}}</p></td>-->
                                <!--<td> <i class="fa fa-trash" @click="module.test.splice(index,1)" style="cursor:pointer"></i> </td>-->
                            <!--</tr>-->
                            <!--</tbody>-->
                        <!--</table>-->


                    </div>

                </div>

            </div>

        </div>


    </div>
      <div class="col-xs-12" style="padding-top: 10px !important" >
          <div class="row" >
              <div class="col-xs-10" >
                  <button class="btn btn-back" @click.stop="goBack" style="background: #fff !important; color: #326ada !important;" >
                      BACK
                  </button>
              </div>
              <div class="col-xs-2" >
                  <p class="text-right next-buttontwo">

                      <button class="btn btn-default but" @click="nextStep" >
                          NEXT
                      </button>
                  </p>
              </div>
          </div>
      </div>

      <!--<div class="fortifift">-->

       <!--<div class="dotbar">-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
         <!--<span class="dotbar-item&#45;&#45;filled"></span>-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->
         <!--<span class="dotbar-item&#45;&#45;empty"></span>-->

       <!--</div>-->


     <!--</div>-->
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
export default {
  name: "module-details",
  props:['module'],
  components: {
  },
  data() {
    return {
      test: {
        case: "",
        acceptance: "",
      },
      testCases:[]
    };
  },
  mounted () {
      this.callWithToken({
        parameters: {
          teamId: this.user.Id, // clients team id
        },
        action: this.getCategories,
      });
      // this.testCases.concat(this.moduleTestCase);
      if(this.module.test.length>0){
        this.canAddTest = true;
      }
      // console.log(this.categories + 'madasdasd')
  },
  computed:{
    // canAddTest(){
    //   var result;
    //   if( !this.module.test || this.module.test.length<1){
    //     result = false;
    //   }
    //   else if(this.module.test.length>0){
    //     result = true
    //   }
    //   return result;
    // }
  },
  methods: {
    showTestForm(){
      this.canAddTest=true
    },
     goBack () {
        this.$emit('back')
    },
    nextStep()
    {
      // this.testCases.concat(this.moduleTestCase);
      // this.module.test.
     this.$emit('next');
     this.testCases = [];
     return
    },
    addTest(){
      var self = this;
      self.$validator.validateAll()
      .then(result=>{
        if(result){
          if(!self.module.test){
            self.module.test =[];

          }
          self.module.test.push(self.test);
          self.test = {};
        }
      })
    }
  },
  // computed: {
  //   ...mapGetters("projects/byid", ["project"]),
  //   developers() {
  //     return this.project.team.developers;
  //   },
  //   ...mapGetters("clients/team", ["team"]),
  //   ...mapGetters("projects", ["modules"])
  // }
};
</script>

<style scoped>
    .seived-module{
        /*width: 750px;*/
        height: 420px !important;
    }
    .btn.btn-default.but{
        border: none;
        background: #326ada;
        color: #fff;
        /*font-family: Montserrat;*/
        /*border-radius: 8px !important;*/
    }
    .btn.btn-default.but:hover{
        box-shadow: 0 10px 20px 0 rgba(50,106,218,0.2) !important;
    }
tr{
  padding: 10px !important;
}
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

input#test-input {
  width: 100%;
  float: left;
  margin-right: 5px;
}

.case-text{
    color: #9B9B9B;
    /*font-family: Montserrat;*/
    font-size: 12px;
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
button.add-methods.btn.btn-primary {
    color: #fff !important;
    font-size: 12px;
    border: 1px solid #FF346F !important;
    padding: 8px 30px;
    border-radius: 3px;
    background-color: #FF346F;
    text-transform: uppercase;

}
button.add-methods.btn.btn-primary:hover, button.add-methods.btn.btn-primary:focus, button.add-methods.btn.btn-primary:active{
    box-shadow: 0 10px 20px 0 rgba(50,106,218,0.2) !important;
    color: #fff !important;
    border: 1px solid #FF346F !important;
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
  margin-bottom: 5%;
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
.fortifift button {
    background: #3369da;
    color: #fff !important;
    font-size: 13px;
    font-weight: 900 !important;
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
  border: 1px solid #326ada;
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
  padding: 15px;
  line-height: 1.42857143;
  vertical-align: to;
  /*border-top: 1px solid #eaeaea;*/
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
  height: 350px !important;
    /*width: 800px;*/
    /*overflow-y: scroll;*/
}
    .tab{
        height: 270px !important;
        overflow-y: auto ;
        width: 100%;
    }
    .tab:hover::-webkit-scrollbar{
        width: 5px;
        transition: all 1s ease;
    }
    .tab::-webkit-scrollbar {
        width: 0px;

        transition: all 1s ease;
    }
    .tab::-webkit-scrollbar-thumb {
        border-radius: 50px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
        background-color: #848484;
        transition: all 1s ease;
        /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
    }
    .tab::-webkit-scrollbar-track {
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
        border-radius: 50px;

        transition: all 1s ease;
    }

.creat-modules input {
  margin-bottom: 4%;
  box-shadow: none !important;
    height: 35px;
    width: 200px !important;
    border: 1px solid rgba(50,106,218,0.3) !important;
    border-radius: 3px !important;
}

.creat-modules textarea {
  max-width: 100%;
  margin-bottom: 4%;
  height: 115px;
  resize: none;
  box-shadow: none !important;
  border-radius: 5px;
  border: 2px solid #dee9f2;
}
.creat-modules label{
  font-weight: 900;
  color: #8a8989 !important;
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

/*/////////////////////////////////////////////////////////////////*/
/*//////////////////////////////////////////////////////////////////*/
/*/////////////////////////////////////////////////////////////////*/



/* altering materialpapers input textarea & etc */
textarea, textarea.form-control, input.form-control, input[type="text"], input[type="password"], input[type="email"], input[type="number"], .form-control[type="text"], .form-control[type="password"], .form-control[type="email"], .form-control[type="tel"], .form-control[contenteditable],
select, select.form-control {;
  width: 100% !important;
  font-size: 14px !important;
}

select.form-control {
  -webkit-appearance: none !important;
}
.el-dialog__body {
  padding: 30px 0px !important;
}

.el-tabs--left .el-tabs__active-bar, .el-tabs--left .el-tabs__nav-wrap::after {
  left: auto !important;
  right: auto !important;
}

.el-tabs--left .el-tabs__active-bar, .el-tabs--right .el-tabs__active-bar {
  width: 4px !important;
}

.el-tabs--left .el-tabs__item {
  text-align: left !important;
}

.el-tabs__active-bar {
  background-color: #409EFF !important;
}

.el-tabs__nav-wrap::after {
  background-color: #ffffff !important;
}

.module-info-msg p {
  font-size: 11px !important;
}

.error-text {
  font-size: 12px !important;
}

.creat-modules input {
  border: 1px solid #d0d0d0 !important;
  margin-bottom: 6% !important;
}


.creat-modules textarea {
  border: 1px solid #d0d0d0 !important;
  margin-bottom: 6% !important;
}

.form-control {
  border: 1px solid #d0d0d0 !important;
}

.form-control.methodStructure {
  margin-bottom: 20% !important;
}

.btn {
  border-radius: 2px !important;
}


.modules-wrppwer-side {
  padding-bottom: 2% !important;
}

.el-tabs__content {
  box-shadow: 0 50px 80px rgba(0, 0, 0, 0.10) !important;
  padding-bottom: 2% !important;
}

.el-dialog__body {
  padding: 0px 0px 0px 0px !important;
}

.fortifift {
  margin-top: 4.5% !important;
  position: absolute !important;
  margin-left: 96% !important;
}

.fortifift button {
  background: #439cfa !important;
}

textarea.form-control {
  height: 160px !important;
}

.el-tabs--left .el-tabs__header {
  margin-top: 50px;
}

.steps-orange {
  color: #ff9800 !important;
  margin-top: -25% !important;
  margin-bottom: 50% !important;
}

.is-danger {
  color: #bd3b3be6 !important;
}

button.close {
  font-weight: 900 !important;
  color: #000 !important;
  font-size: 25px !important;
}

/*.btn-default:after {*/
  /*content: "\F125";*/
  /*font-family: "Ionicons" !important;*/
  /*background: #439cfa !important;*/
  /*position: absolute;*/
  /*right: 15%;*/
  /*!*bottom: 63%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #ddd;*/
/*}*/

/*.btn-defaultFinish:after {*/
  /*content: "" !important;*/
  /*font-family: "Ionicons" !important;*/
  /*background: #439cfa !important;*/
  /*position: absolute;*/
  /*right: 15%;*/
  /*!*bottom: 63%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #ddd;*/
/*}*/

.btn-back {
  color: #326ada !important;
  /*margin-top: -3% !important;*/
  /*margin-left: 58% !important;*/
  position: relative !important;
  border: 1px solid #326ada !important;
  padding: 6px 42px !important;
    /*font-family: Montserrat;*/
    background: #fff !important;
    border-radius: 8px;
}
/*.btn-back:after {*/
  /*content: "\F124";*/
  /*font-family: "Ionicons" !important;*/
  /*background: white !important;*/
  /*position: absolute;*/
  /*right: 75%;*/
  /*!*bottom: 20%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #439cfa;*/
/*}*/





.is-active:after {
  content: "\F120";
  font-family: "Ionicons" !important;
  position: relative;
  left: 20%;
  /*bottom: 20%;*/
  font-size: 16px;
  font-weight: 100 !important;
  color: #409EFF;
}

.el-tabs__item {
  margin-right: 80px !important;
  width: 80px !important;
  max-width: 80px !important;
}

.fortifift button.btn-back {
  background: white !important;
}

.next-buttonone button {
  margin-top: -20% !important;
  padding: 8px 40px !important;
}

.next-buttontwo button {
  /*margin-top: -20% !important;*/
  padding: 8px 40px !important;
  /*margin-right: 28% !important;*/
}

.next-buttonthree button {
  /*margin-top: -20% !important;*/
  padding: 8px 30px !important;
  margin-right: 28% !important;
}

.close {
  opacity: .3;
}

button {
  box-shadow: none !important;
}


.text-center.hide-nomethdf p {
  padding-bottom: 0% !important;
}





.el-tabs__item {
  color: #767676 !important;
}

.text-center.hide-nomethdf p:before {
  top: 21.3% !important;
}





.well.methods-well {
  padding: 0px 0px 0px !important;
  width: 250px !important;
}
.well {
  border-radius: 2px !important;
  margin-bottom: 0px !important;

}

.well.textcase-well {
  background: #f9fcff !important;
  border: 1px solid #439cfa !important;
}

.well.textcase-well button[data-v-215a5bb9] {
  background: #439cfa !important;
}

.methodsN-header {
  padding: 10px 10px 3% !important;
  border-bottom: 1px dashed rgb(212, 212, 212) !important;
}

.methodsN-header button {
  color: #409EFF !important;
  border: 1px solid #409EFF !important;
  margin-top: 0% !important;
  padding: 4px 20px !important;
}

button.btn.btn-info.btn-case {
  color: #409EFF !important;
  border: 1px solid #409EFF !important;
}

button.btn.btn-info.btn-case b {
  font-size: 9px !important;
  margin-right: 5px !important;
  padding: 1px 5px !important;
}

.pretty .state label:before {
  border-color: #409EFF !important;
}

.pretty input:checked~.state.p-primary label:after, .pretty.p-toggle .state.p-primary label:after{
  background-color: #409EFF !important;
}


.col-md-4.ruller-for-module {
  padding-left: 35px !important;
}

.col-lg-1, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-md-1, .col-md-10, .col-md-11, .col-md-12, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-sm-1, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-xs-1, .col-xs-10, .col-xs-11, .col-xs-12, .col-xs-2, .col-xs-3, .col-xs-4, .col-xs-5, .col-xs-6, .col-xs-7, .col-xs-8, .col-xs-9{
  padding-right: 40px !important;
}

.btn-defaultTwo {
  color: #333;
  background-color: #fff;
  border-color: #ccc;
}

.btn-defaultTwoTwo {
  color: #8a8989;
  background-color: #f9fcff;
  border-color: #ccc;
  margin-top: -50px;
}

p.nonresuable-msg {
  width: 200px !important;
}

p.text-right.next-button button {
  color: #409EFF !important;
  border: 1px solid #409EFF !important;
}

.col-md-2.step-strange.step-strangeTwo {
  padding-right: 15px !important;
}


.el-input-number {
  width: 320px  !important;
}

.el-date-editor.el-input, .el-date-editor.el-input__inner {
  width: 320px !important;
}

.el-date-picker.has-sidebar.has-time {
  width: 334px !important;
  left: 535px !important;
}

.el-picker-panel [slot=sidebar], .el-picker-panel__sidebar {
  display: none !important;
}

.el-date-picker .el-picker-panel__content {
  width: 334px !important;
}

.el-picker-panel [slot=sidebar]+.el-picker-panel__body, .el-picker-panel__sidebar+.el-picker-panel__body {
  margin-left: 0px !important;
}

.el-picker-panel__content {
  margin: 0px !important;
}

.el-popper[x-placement^=bottom] .popper__arrow {
  left: 10.7% !important;
  top: 28% !important;
  border-bottom-color: #fff !important;
}

.el-date-picker__time-header {
  display: none !important;
}

.well.creat-modulesv {
  padding: 0px 0px 185px 42px !important;
}


.el-date-picker.has-sidebar.has-time {
  top: 28% !important;
  left: 63% !important;
  position: fixed !important;
  transform-origin: 0px !important;
}

.el-date-picker.has-sidebar.has-time:after {
  content: "\f107";
  font-family: "Ionicons" !important;
  background: transparent !important;
  position: absolute;
  left: -2%;
  top: 3%;
  font-size: 16px;
  font-weight: 100 !important;
  color: transparent;
}

.el-date-picker__header-label {
  font-size: 14px;
  font-weight: 900;
}

.kolo {
  height: 300px !important;
  overflow-y: auto !important;
  width: 660px !important;
}

.kolo .col-md-6 .col-md-12{
  padding-right: 9px !important;
  padding-left: 9px !important;

}

.well.proj-type-wellfsd {
  border: 1px solid #ddd !important;
  padding: 0px 0px 0px 0px !important;
  box-shadow: 0px !important;
  width: 250px  !important;
}

.well.proj-type-wellfsd .row {
  margin-top: 10px !important;
}

.well.proj-type-wellfsd small {
  font-size: 13px !important;
  color: #8a8a8a !important;
  font-weight: 600 !important;
}

.well.tebas {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.18) !important;
  height: 30px !important;
}

.well.fsystem input{
  width: 470px !important;
}

.well.fsystem .col-md-8{
  padding-left: 4px !important;
}

.well.fsystem .row{
  margin-left: 0px !important;
}

.well.fsystem label{
  font-weight: 900 !important;
}

.table>thead>tr>th {
  vertical-align: top !important;
}

/*.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {*/
  /*padding: 0px !important;*/
  /*vertical-align: middle !important;*/
/*}*/

.table>caption+thead>tr:first-child>td, .table>caption+thead>tr:first-child>th, .table>colgroup+thead>tr:first-child>td, .table>colgroup+thead>tr:first-child>th, .table>thead:first-child>tr:first-child>td, .table>thead:first-child>tr:first-child>th{
  width: 100px !important;
}

label {
  color: #439cfa !important;
}

.el-dialog__wrapper {
  background-color: rgba(67, 156, 250, 0.27) !important;
}



.el-tabs__item:visited {
  color: red !important;
}

td.text-left i {
  font-size: 26px !important;
  color: #409EFF !important;
}

p.dedicated-file{
  background: #409EFF !important;
}

.well.tebas i{
  color: #409EFF !important;
}





.el-picker-panel__icon-btn {
  color: #fff !important;
  background-color: #90949d !important;
  width: 20px !important;
  height: 20px !important;
  display: block !important;
  margin-right: 10px !important;
  line-height: 20px !important;
  /*position: absolute !important;*/
  /*left: 50% !important;*/
  /*-webkit-transform: translateX(-50%) !important;*/
  /*transform: translateX(-50%) !important;*/
  border-radius: 50% !important;
}


.modal-body{
  padding: 15px 0px 0px !important;
}

.form-control:focus {
  border-color: #439cfa !important;
  border: 2px solid #439cfa !important;
}

</style>
