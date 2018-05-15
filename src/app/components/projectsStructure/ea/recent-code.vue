<!--STEP 5 of 5-->


<template>

<span>
    <div class="well fsystem">
        <div class="container-fluid" style="height:400px; overflow-y:auto">
            <table class="table">
                <tbody>

                <tr v-for="(file, index) in module.recent_files">
                    <td class="text-left " @click="addFile(file.path)"
                       >
                        <i  class="ion-document"></i>
                        <b class="pointer"> {{ file.path}}</b></td>
                        <td>  {{ lastWorkedOn(file.time)}}</td>

                </tr>
                   </tr>
                   <tr v-if="!module.recent_files || module.recent_files.length<1" >
                    <td  colspan="2" align="center">
                        <div class="rectangle-19">
                          There are No Recent files in this module
                        </div>
                       </td>

                </tr>


                </tbody>

            </table>
        </div>

          <showcode :isLoading="isLoading"  :code="code" @closeTestModal="closeTestModal" :show_test_modal.sync="show_test_modal"
            >
        </showcode>


    </div>
  </span>
</template>
<script>
   import { mapActions, mapGetters } from "vuex";
   import moment from 'moment';
import showcode from './view-code.vue'


    export default {
        // name: "fileSystem-modal",
        props: ["module"],
        components: {showcode},

        data()
    {

        return {
            show_test_modal:false,
            code:'',
            isLoading:true,

        }
    },
    destroyed()
    {
        this.$_$destroyedHook()
    }
    ,
    computed: {

    ...
        mapGetters('categories', [
            'categories',
            'loading',
            'error',
        ])

    ,


    }
  ,
    methods: {

          ...mapActions('team', [
          'getClientTeam',
        ]),
             closeTestModal(){
      // this.fetchModules()
      this.show_test_modal =false;
    }
    ,
        lastWorkedOn(time){
                return this.$moment(parseInt(time)).format('MMMM Do YYYY, h:mm:ss a');
            },
    ...
        mapActions('modules/all', [
            'getModules',
            'getDevRepository',
            'readRepository',
            'resetState'
        ]),
    ...
        mapActions('userCredentials', [
            'callWithToken',
        ])
    ,
        addFile(path)
        {
            // var p = path.split("/");
            // var path = p.splice(0,1).join("/");
               this.isLoading = true;
            const self = this;
             this.show_test_modal = true;
            this.callWithToken({
                parameters: {
                    file_path: path,
                    module_Id: this.module.Id
                },
                action: this.readRepository
            }).then(state =>  {
                if(state.status){
                    // alert(state.content)
                    this.code = state.content;

                }else{
                       self.$show_notification(state.message,'error',1000)
                    self.show_files = [];
                }

                this.isLoading = false;
                // debugger;


            });
        }
    }
    }
    ;
</script>
<style scoped>
    select.form-control.selected-person {
        background: #326ada;
        color: #fff;
        font-size: 14px;
        border-radius: 5px !important;
        border: none !important;
    }

    .well.tebas i {
        color: #326ada;

        font-size: 16px;
        /*border-right: 1px solid #ddd;*/

    }
p.text-right.next-button {
    margin-top: 4%;
    text-align: right !important;
}

p.text-right.next-button .btn-success {
    border: none !important;
    color: #fff;
    padding: 8px 48px;
}

p.text-right.next-button button {
    font-size: 12px;
    font-weight: 900;
    color: #3469da;
    padding: 7px 40px;
    border: 1px solid #3469da !important;
}
    .selectbg {
        background: #f5f5f5;
    }

    .table tr {
        padding: 5px;
    }

    .pointer {
        cursor: default;;
    }

    .well.tebas {
    box-shadow: 0 2px 15px rgba(0,0,0,0.18);
    background: rgb(255, 255, 255);
    padding: 6px 15px;
    border: 0px solid #ddd;
    margin-top: 10%;
    min-height: 50px;
}

    .cursor {
        cursor: pointer;
    }

    td.text-left i {
        font-size: 26px !important;
        color: #7097e8;
    }

    .well.file-well {
        padding: 2px 7px;
        margin-bottom: 1px;
        border: none;
        border-radius: 1px;
        box-shadow: none;
        height: 31px;
    }

    .well.file-well i {
        float: right;
        position: absolute;
        right: 3px;
        top: -5px;
    }

    b {
        margin-left: 2%;
    }

    td.text-left {
        font-size: 15px;
        /* margin-top: -1% !important; */
    }
    p.dedicated-file {
        background: #4573dd;
        /* position: absolute; */
        margin-top: -3%;
        padding: 6px;
        color: #fff;
        width: 24%;
        font-size: 12px;
    }
    .well.fsystem {
        background: #fff;
        border: none;
        box-shadow: none !important;
    }
    .rectangle-19 {
	height: 74px;
	width: 448px;
	border: 1px dashed #979797;
	border-radius: 3px;
  margin-top: 20px;
  line-height: 74px;

	background-color: #FFFFFF;
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

    .btn-default:after {
      content: "\F125";
      font-family: "Ionicons" !important;
      background: #439cfa !important;
      position: absolute;
      right: 15%;
      /*bottom: 63%;*/
      font-size: 16px;
      font-weight: 100 !important;
      color: #ddd;
    }

    .btn-defaultFinish:after {
      content: "" !important;
      font-family: "Ionicons" !important;
      background: #439cfa !important;
      position: absolute;
      right: 15%;
      /*bottom: 63%;*/
      font-size: 16px;
      font-weight: 100 !important;
      color: #ddd;
    }

    .btn-back {
      color: #439cfa !important;
      margin-top: -3% !important;
      margin-left: 58% !important;
      position: relative !important;
      border: 1px solid #439cfa !important;
      padding: 6px 42px !important;
    }
    .btn-back:after {
      content: "\F124";
      font-family: "Ionicons" !important;
      background: white !important;
      position: absolute;
      right: 75%;
      /*bottom: 20%;*/
      font-size: 16px;
      font-weight: 100 !important;
      color: #439cfa;
    }





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
