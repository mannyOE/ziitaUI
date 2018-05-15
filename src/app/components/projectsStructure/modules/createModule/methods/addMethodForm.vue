<!--STEP 1 of 5-->


<template>
    <div class="meth">
      <!-- {{newMethod.input_params}} -->
    <div class="methodsadd" >
        <div class="creat-modules animated fadeIn" id="caret-modules">
          <form onsubmit="return false">
          <div class="row">
              <div class="col-md-7">
                    <label >METHOD NAME</label>
                    <input type="text" style="border: 1px solid rgba(50,106,218,0.3) !important;"
                        class="form-control"
                        :class="{'input': true, 'is-danger': errors.has('name') }"
                        placeholder="Add a method name"
                        v-validate="'required|min:2'"
                        name="name"
                        id="method-name"
                        v-model="newMethod.method_name">

                    <FieldError>
                        {{ errors.first('name') }}
                    </FieldError>
                    <label for="">DESCRIPTION</label>
                    <textarea type="text"
                        class="form-control" style="border: 1px solid rgba(50,106,218,0.3) !important;"
                        placeholder="What will this method do?"
                        v-validate="'required|min:2'"
                        name="action"
                        :class="{'input': true, 'is-danger': errors.has('action') }"
                        v-model="newMethod.method_action">
                    </textarea>

                    <FieldError>
                        {{ errors.first('action') }}
                    </FieldError>
                     <label for="">INPUT PARAMETERS</label><br>
                            <div v-for="(param, index) in inparams"  class="pretty p-default">
                              <!-- {{inputParamChecked(param)}} -->
                                <input :checked="newMethod.input_params.includes(param)" type="checkbox" @click="addInPutParam(param)" />
                                <div class="state p-primary">
                                    <label style="color: #9B9B9B !important;font-weight: 500;
        letter-spacing: 0px; font-size: 12px !important;"> &nbsp;{{param}}</label>
                                </div>
                            </div>
                            <br>
                            <textarea placeholder="Method Structure" @blur="editInput=false"  v-if="editInput==true" v-model="newMethod.input_value" class="form-control methodStructure"  >

                            </textarea>
                            <button  v-if="editInput==true" class="btn btn-defaultTwoTwo pull-right" @click="editInput=false">okay</button>
                            <br  v-if="editInput==false">
                             <pre  @click="editInput=true" v-if="editInput==false && newMethod.input_value"><code class="html" >{{newMethod.input_value}}</code></pre>
                    <label for="">OUTPUT PARAMETERS</label><br>
                               <div v-for="(param, index) in outparams"  class="pretty p-default">
                                <input type="checkbox" name="optradio" :checked="newMethod.output_params[0]==param" @click="addOutPutParam(param)" />
                                <div class="state p-primary">
                                    <label style="color: #9B9B9B !important;
       letter-spacing: 0px; font-weight: 500;
        font-size: 12px !important;"> &nbsp;{{param}}</label>
                                </div>
                            </div>
                           <br>


                   <div class="well textcase-well">
                       <label for="">CASE</label>
                       <input type="text" class="form-control"v-model="methodTest.case"
                        placeholder="Case" style="border: 1px solid rgba(50,106,218,0.3) !important;"
                        id="test-input">
                        <label for="">ACCEPTED RESULT</label>
                        <input type="text"
                        class="form-control" style="border: 1px solid rgba(50,106,218,0.3) !important;"
                        v-model="methodTest.acceptance"
                        placeholder="Accepted Result"
                        id="test-input">
                        <p class="text-right"><button class="btn a-case" @click="addTestcase">Add Case</button></p>
                   </div>

              </div>
              <div class="col-md-4 ruller-for-module">
                    <p class="nonresuable-msg">You can have multiple methods bound to one Module</p>
                  <div class="well methods-well">
                      <div class="methodsN-header">
                          <p>Methods</p>
                           <!--<span class="text-right"><button class="btn btn-defaultTwoTwo" @click.stop="$emit('openMethodsForm')">ADD</button></span>-->
                      </div>
                      <p class="text-center" v-if="methodsf"><small class="text-center c-labl">No Methods Yet</small></p>
                      <div class="methodsN-filled" v-else v-for="(method, index) in module.method" >
                          <p>{{ method.method_name }}<i @click="deleteMethod(method)" class="text-right ion-ios-trash-outline" style="font-size: 18px;"></i></p>
                      </div>
                  </div>
                  <div class="well methods-well">
                      <div class="methodsN-header">
                          <p><b>{{ newMethod.method_test.length }}</b> Test Case(s)</p>
                           <!--<span class="text-right"><button class="btn btn-defaultTwoTwo">ADD</button></span>-->
                          <!-- <p class="text-right"></p> -->
                      </div>
                      <p class="text-center" v-if="newMethod.method_test.length == 0"><small class="text-center c-labl">No Test Case Yet</small></p>
                      <span class="methodsN-filleda" v-else v-for="(test, index) in newMethod.method_test" >
                          <button class="btn btn-info btn-case" @click="selected=test"><b>{{ index + 1 }}</b> {{ test.case }} </button>

                      </span>
                     <!--   <tr >
                                <td></td>
                                <td></td>
                                <td>{{ test.acceptance }}</td>
                            </tr> -->
                  </div>
                   <div class="well methods-well">
                    <div class="methodsN-header">
                          <p>About Case(s) <small></small></p>
                          <span class="text-right"><button class="btn btn-defaulbtn-defaultTwoTwotTwo" @click="selected=''">CLOSE</button></span>
                          <!-- <p class="text-right"></p> -->
                      </div>
                      <div class="methodsN-headerf">
                          <p>Case: <b>{{ selected.case || '' }}</b></p>
                         <p>Acceptance: <b>{{ selected.acceptance || ''}}</b></p>
                          <!-- <p class="text-right"></p> -->
                      </div>

                     <!--   <tr >
                                <td></td>
                                <td></td>
                                <td>{{ test.acceptance }}</td>
                            </tr> -->
                  </div>

              </div>


          </div>

           <!--  <div align="center" class="text-center">METHOD PARAMETERS ( String | Object | Number | List | Function | Boolean )</div>
            <hr>
             -->
<!--             <div class="row">
                <div class="col-md-12">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12">

                                <input type="text"
                                    class="form-control"
                                    v-model="newMethod.input_params"
                                    placeholder="Input parameters"
                                    id="test-input">

                            </div>

                            <div class="col-md-12">

                                <input type="text"
                                    class="form-control"
                                    v-model="newMethod.output_params"
                                    placeholder="Expected output"
                                    id="test-input">

                            </div>

                        </div>
                    </div>
                </div> -->


            <!-- <div align="center" class="text-center">METHOD TESTCASES</div>

            <div class="row">
                <div class="col-md-12">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-5">

                                <input type="text" class="form-control"v-model="methodTest.case"
                        placeholder="Case"
                        id="test-input">

                            </div>

                            <div class="col-md-5">

                                <input type="text"
                                    class="form-control"
                                    v-model="methodTest.acceptance"
                                    placeholder="Accepted Result"
                                    id="test-input">

                            </div>

                            <div class="col-md-2">
                                <div class="btn btn-md bg-pink btn-input-params" @click="addTestcase">
                                    <i class="ion-plus"></i>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <hr>
                <div class="col-md-12">
                    <table class="table table-responsive">
                        <thead>
                            <tr>
                                <td>SN</td>
                                <td>Case</td>
                                <td>Accepted Result</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(test, index) in newMethod.method_test" >
                                <td>{{ index + 1 }}</td>
                                <td>{{ test.case }}</td>
                                <td>{{ test.acceptance }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
                <p class="text-right next-button">
                    <button type="submit" class="btn btn-default" @click="$emit('closeMethodsForm')">Close Form</button>
                    <button type="submit" class="btn btn-default" @click="saveMethod">Save</button>
                </p>
        </div> -->
        </form>
    </div>

    </div>
    <!--<p class="text-right next-button">-->
        <!--<button type="submit" class="btn btn-defaultTwo" @click="$emit('closeMethodsForm')">MINIMIZE </button>-->
        <!--<button v-if="!selectedMethod" type="submit" class="btn btn-success" @click="saveMethod">SAVE</button>-->
         <!--<button v-else type="submit" class="btn btn-success" @click="updateMethod(newMethod)">UPDATE</button>-->
    <!--</p>-->

        <div class="col-md-12">
                 <div class="row" style="margin-top: 10px !important" >
                      <p class="text-right next-button">
                    <button type="submit" class="btn btn-defaultTwo" @click="$emit('closeMethodsForm')">MINIMIZE </button>
                    <button v-if="!selectedMethod" type="submit" class="btn btn-success" @click="saveMethod">ADD METHOD</button>
                     <button v-else type="submit" class="btn btn-success" @click="updateMethod(newMethod)">UPDATE</button>
                  </p>
                 </div>
              </div>
    </div>
</template>
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/ace/1.3.0/ace.js"></script>
<script>
import { mapGetters } from "vuex"
var index;
export default {
  name: "module-methods",
  props: ["show","selectedMethod"],
  components: {
  },
  data() {
    return {
        isAbout:false,
        editInput:false,
        selected:'',
      methodTest: {
          case: '',
          acceptance: '',
      },
    };
  },
  computed: {
     // methods(){
     //      if(this.module.methods === null){
     //        return true
     //      }
     //      else{
     //        return false
     //      }
     //  },
     newMethod(){
      var d = {
        method_name: '',
        method_action: '',
        input_params:[],
        output_params:[],
        method_test: [],
        aboutCase:'',
        aboutAcceptance:'',

      };
      if(this.selectedMethod){

         try{
           index=this.module.method.indexOf(this.selectedMethod);
            return this.selectedMethod;
         }
         catch(ex){
          return d;
         }
      }
      return d;
     },
        methodsf(){
        console.log(JSON.stringify(this.module.method) + 'sdfsdfsdfs')
          if(JSON.stringify(this.module.method) == undefined){
            return true
          }
          else{
            return false
          }
      },
       ...mapGetters('modules', {
          module: "module"
      })
       ,
       outparams(){
        return [
        'String',
        'Object',
        'Number',
        'List',
        'Function',
        'Array',
        'Boolean'


        ]


       },
       inparams(){
        return [
        'String',
        'Object',
        'Number',
        'Array',
        'Boolean'


        ]


       }

  },
  methods: {

    addTestcase() {
      if (this.methodTest.case && this.methodTest.acceptance) {
        this.newMethod.method_test.push({
            case: this.methodTest.case,
            acceptance: this.methodTest.acceptance,
        });
        this.methodTest = {
          case: '',
          acceptance: '',
        };
      }
    },
    addInPutParam(param){
      this.editInput=true;
        var index = this.newMethod.input_params.indexOf(param);
        if(index==-1)
          this.newMethod.input_params.push(param);
        else
          this.newMethod.input_params.splice(index,1)
        debugger;
    },
    addOutPutParam(param){
      this.newMethod.output_params=[];
        this.newMethod.output_params.push(param);
        debugger
    },
    clearFields () {
        this.newMethod = {
            method_name: '',
            method_action: '',
            input_params: '',
            output_params: '',
            method_test: [],
        }
        this.methodTest = {
            case: '',
            acceptance: '',
        }
    },
    deleteMethod(method){
      var index = this.module.method.indexOf(method);
      this.module.method.splice(index);
    },
    aboutCase(test){

        this.selectedCase = test.case
        // this.aboutSn = test.index + 1

        // debugger;
        this.selectedAcceptance = test.acceptance
        debugger;
        this.isAbout = true
    },
    saveMethod() {
        this.$validator.validateAll().then(result => {
            if (result) {
                const method = this.newMethod
                $('form')[0].reset()
                this.$emit('saveMethod', method)
                this.methodTest = {}
                return
            }
        });
    },
     updateMethod(method) {

                $('form')[0].reset()
                this.$emit('updateMethod', method,index)
                this.selectedMethod='';
                this.selectedCase = ''
                this.selectedAcceptance = ''
                this.newMethod = ''
                this.methodTest = {}

                debugger;
                return


}
    },
  // },
};


</script>

<style scoped>
    .meth{
        height: 420px !important;
    }
    .btn.a-case{
        border-radius: 3px;
        background-color: #326ada;
        color: #fff !important;
        border: 1px solid #326ada !important;
    }
    .btn.a-case:hover{
        box-shadow: 0 10px 20px 0 rgba(50,106,218,0.2);
        color: #fff !important;
        border: 1px solid #326ada !important;
    }
    .c-labl{
        color: #9B9B9B !important;
        /*font-family: Montserrat !important;*/
        font-size: 12px !important;
    }
    .methodsadd{
        height: 350px;
        width: 800px;
        overflow-y: scroll;
        overflow-x: hidden !important;
    }
    .methodsadd:hover::-webkit-scrollbar{
        width: 5px;
        transition: all 1s ease;
    }
    .methodsadd::-webkit-scrollbar {
        width: 0px;

        transition: all 1s ease;
    }
    .methodsadd::-webkit-scrollbar-thumb {
        border-radius: 50px;
        /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
        background-color: #848484;
        transition: all 1s ease;
        /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
    }
    .methodsadd::-webkit-scrollbar-track {
        -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
        border-radius: 50px;

        transition: all 1s ease;
    }
.creat-modules input {
  margin-bottom: 4%;
  /*box-shadow: none !important;*/
  border-radius: 5px;
  font-size: 13px;
    border: 1px solid rgba(50,106,218,0.3) !important;
}
.methodsN-header {
    /*padding-bottom: 7%;*/
    color: #4A4A4A !important;
    /*font-family: Montserrat;*/
    font-size: 12px;
    font-weight: 600;
    border-bottom: 2px dotted #ddd;
}
/*.well.textcase-well button {*/
    /*background: none;*/
    /*font-size: 12px;*/
    /*padding: 7px 30px;*/
    /*text-transform: uppercase;*/
    /*margin-top: 3%;*/
    /*!*font-family: Montserrat;*!*/
    /*border: 1px solid #326ada;*/
    /*color: #326ada !important;*/
/*}*/

.methodsN-header button {
    float: right;
    color: #326ada;
    font-size: 11px;
    padding: 4px 15px;
    margin-top: -2%;
    border: 1px solid #326ada;
    background: transparent;
}
.methodsN-header {
    padding: 0px 9px 3%;
 padding-bottom: 7%;
    border-bottom: 2px dotted #d4d4d4;
}
.methodsN-filled i {
    float: right;
}

.methodsN-filled p {
    margin: 0px;
        font-size: 12px;
    font-weight: 500;
}
.methodsN-headerf p {
    font-size: 13px;
    padding: 0px 13px;
}
.methodsN-filled {
    padding: 8px 10px 6px !important;
    /* margin: 0px !important; */
    border-bottom: 1px solid #ddd;
}
.well.methods-well {
    padding: 17px 0px 0px;
    background: #fff;
    border: 1px solid #dadada;
    box-shadow: none !important;
}
.methodsN-header p {
    /* float: left; */
    display: inline;
    font-weight: 600;
    font-size: 13px;
}
p.nonresuable-msg {
    color: #4A4A4A !important;
    /*font-family: Montserrat;*/
    font-size: 12px;
    font-weight: 600;
    line-height: 1.6em;
    margin-bottom: 15%;
}
/*.col-md-4.ruller-for-module {*/
    /*border-left: 1px solid #ddd;*/
    /*padding-left: 20px;*/
/*}*/
/*.col-md-4.ruller-for-module:before {*/
    /*content: "\f3d2";*/
    /*font-family: "Ionicons" !important;*/
    /*background: white;*/
    /*position: absolute;*/
    /*left: -4%;*/
    /*top: 23%;*/
    /*font-size: 26px;*/
    /*font-weight: 100 !important;*/
    /*color: #ddd;*/
/*}*/
.creat-modules textarea {
  max-width: 100%;
  margin-bottom: 4%;
  height: 115px;
  resize: none;
  font-size: 13px !important;
  /*box-shadow: none !important;*/
  border-radius: 5px;
  border: 2px solid #dee9f2;
}
.creat-modules label{
    color: #4A4A4A !important;
    /*font-family: Montserrat;*/
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;

}
button.btn.btn-info.btn-case b {
    background: #cecece;
    border-radius: 50%;
    padding: 1px 4px;
    color: #fff;
    font-size: 10px;
    /* float: left; */
    /* position: absolute; */
    /* top: 59%; */
}

button.btn.btn-info.btn-case{
    background: transparent;
    color: #3369da;
    border: 1px solid #3369da;
    padding: 3px 7px;
    margin-left: 6px;
    margin-top: 6px;
    margin-bottom: 4px;
    font-size: 12px;
    font-weight: 600;
    border-radius: 1px;
}

.pretty .state label:before {
   border-color: #3369da;
}

.pretty .state label:after, .pretty .state label:before {
    content: '';
    width: calc(1em + 4px) !important;
    height: calc(1em + 4px) !important;
    display: block;
    box-sizing: border-box;
    border-radius: 0;
    border: 1px solid transparent;
    z-index: 0;
    position: absolute;
    left: 0px;
    top: calc((0% - (100% - 1.2em)) - 8%) !important;
    background-color: transparent;
}
/*.well.textcase-well {*/
    /*margin-top: 8%;*/
    /*background: transparent;*/
    /*border: 1px solid #428bca;*/
    /*border-radius: 1px;*/
    /*box-shadow: none !important;*/
/*}*/

 .next-button{
     margin-top: 10px !important;
 }
p.text-right.next-button {
    /*margin-top: 4%;*/
    text-align: right !important;
}

p.text-right.next-button .btn-success {
    border: none !important;
    color: #fff !important;
    padding: 8px 48px;
    background: #326ada;
    border: #326ada;
}

p.text-right.next-button button {
    font-size: 12px;
    font-weight: 600;
    color: #326ada;
    padding: 7px 40px;
    border: 1px solid #326ada;
}

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

/*.creat-modules input {*/
  /*border: 1px solid #d0d0d0 !important;*/
  /*margin-bottom: 6% !important;*/
/*}*/


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
  font-weight: 600 !important;
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
  color: #439cfa !important;
  margin-top: -3% !important;
  margin-left: 58% !important;
  position: relative !important;
  border: 1px solid #439cfa !important;
  padding: 6px 42px !important;
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





/*.is-active:after {*/
  /*content: "\F120";*/
  /*font-family: "Ionicons" !important;*/
  /*position: relative;*/
  /*left: 20%;*/
  /*!*bottom: 20%;*!*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: #409EFF;*/
/*}*/

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
  margin-right: 28% !important;
}

.next-buttonthree button {
  /*margin-top: -20% !important;*/
  padding: 8px 30px !important;
  margin-right: 28% !important;
}

.close {
  opacity: .3;
}

/*button {*/
  /*box-shadow: none !important;*/
/*}*/


.text-center.hide-nomethdf p {
  padding-bottom: 0% !important;
}





.el-tabs__item {
  color: #767676 !important;
}

.text-center.hide-nomethdf p:before {
  top: 21.3% !important;
}


button.add-methods.btn.btn-primary {
  border: 1px solid #439cfa !important;
  color: #439cfa !important;
}




.well.methods-well {
  padding: 0px 0px 0px !important;
  width: 250px !important;
}
.well {
  border-radius: 2px !important;
  margin-bottom: 40px !important;

}

.well.textcase-well {
  background: none !important;
  border: none !important;
    padding: 0px !important;
    margin-top: 8%;
}

/*.well.textcase-well button[data-v-215a5bb9] {*/
    /*background: none;*/
    /*font-size: 12px;*/
    /*padding: 7px 30px;*/
    /*text-transform: uppercase;*/
    /*margin-top: 3%;*/
    /*!*font-family: Montserrat;*!*/
    /*border: 1px solid #326ada;*/
    /*color: #326ada !important;*/
/*}*/

.methodsN-header {
  padding: 10px 10px 3% !important;
  border-bottom: 1px dashed rgb(212, 212, 212) !important;
}

.methodsN-header button {
  color: #326ada !important;
  border: 1px solid #326ada !important;
  margin-top: 0% !important;
  padding: 4px 20px !important;
}

button.btn.btn-info.btn-case {
  color: #326ada !important;
  border: 1px solid #326ada !important;
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
  color: #326ada;
  background-color: #fff;
  border-color: #326ada;
  margin-top: -50px;
}

p.nonresuable-msg {
  width: 200px !important;
}

p.text-right.next-button button {
  color: #326ADA !important;
  border: 1px solid #326ada !important;
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

/*.el-date-picker.has-sidebar.has-time:after {*/
  /*content: "\f107";*/
  /*font-family: "Ionicons" !important;*/
  /*background: transparent !important;*/
  /*position: absolute;*/
  /*left: -2%;*/
  /*top: 3%;*/
  /*font-size: 16px;*/
  /*font-weight: 100 !important;*/
  /*color: transparent;*/
/*}*/

.el-date-picker__header-label {
  font-size: 14px;
  font-weight: 600;
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
  font-weight: 600 !important;
}

.table>thead>tr>th {
  vertical-align: top !important;
}

.table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
  padding: 0px !important;
  vertical-align: middle !important;
}

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
