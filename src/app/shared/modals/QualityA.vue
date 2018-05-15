<template>
    <el-dialog :visible="show" width="45%"
               :show-close="false"
               :before-close="beforeClose" class="person-c" >

        <div slot="title" style="margin-bottom: 10px;">
            <button type="button"  @click.stop="beforeClose">&times;</button>
        </div>
        <!-- Modal content-->

        <div class="row" align=center >
            <div class="col-xs-12" >
                <div class="row" >
                    <div class="col-xs-3" >
                        <img src="../../../assets/img/1.jpeg" class="img-pm" >
                    </div>
                    <div class="col-xs-5" >
                        <p class="text-left" ><b class="pm-name">Rossetta Rodgers</b><br>
                            <small class="pm-email" >jennings.wunsch@yahoo.com</small><br>
                            <small class="quality" >Quality Assurance</small>
                        </p>
                    </div>
                    <div class="col-xs-4" >
                        <div class="row" >
                            <div class="col-xs-12" >
                                <div class="status" >
                                    <div class="row" >
                                        <div class="col-xs-8" >
                                            <p class="online">ONLINE</p>
                                        </div>
                                        <div class="col-xs-4" >
                                            <div class="oval" ></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12" style="margin-top: 17px;">
                                <div class="row" >

                                    <div class="col-xs-3 col-xs-offset-3"  align=center >
                                        <div class="oval-1" >
                                            <i class="ion-ios-telephone-outline" ></i>
                                        </div>
                                    </div>
                                    <div class="col-xs-2 col-xs-offset-1" align=center >
                                        <div class="oval-1" >
                                            <i class="ion-ios-chatbubble-outline"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-xs-12 top-2" >
                        <div class="row" >
                            <div class="col-xs-6" @click="viewWork" >
                                <div class="part" >
                                    <p>WORK SUMMARY</p>
                                </div>
                            </div>
                            <div class="col-xs-6" @click="viewHrsSpnt" >
                                <div class="part" >
                                    <p>HOURS SPENT</p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-xs-12" v-if="workSum" style="margin-top: 50px;" >
                        <div class="row" >
                            <div class="col-xs-12" style="border-bottom: 1px dashed #d6dae5;">
                                <div class="row" >
                                    <div class="col-xs-4" >
                                        <img src="../../../assets/img/document.svg" class="ico-img" >
                                        <p><b class="no" >80</b><br>
                                            <small class="task" >ISSUES RAISED</small></p>
                                    </div>
                                    <div class="col-xs-4" >
                                        <img src="../../../assets/img/document.svg" class="ico-img" >
                                        <p><b class="no" >80</b><br>
                                            <small class="task" >TASKS ASSIGNED</small></p>
                                    </div>
                                    <div class="col-xs-4" >
                                        <img src="../../../assets/img/flag.svg" class="ico-img" >
                                        <p><b class="no" >80</b><br>
                                            <small class="task" >TASKS COMPLETED</small></p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12" style="margin-top: 20px;">
                                <div class="row" >
                                    <div class="col-xs-4" >
                                        <img src="../../../assets/img/document-delete.svg" class="ico-img" >
                                        <p><b class="no" >80</b><br>
                                            <small class="task" >TOTAL REJECTIONS</small></p>
                                    </div>
                                    <div class="col-xs-4" >
                                        <img src="../../../assets/img/time-reverse.svg" class="ico-img" >
                                        <p><b class="no" >80</b><br>
                                            <small class="task" >MISSED DEADLINES </small></p>
                                    </div>
                                    <div class="col-xs-4" >
                                        <img src="../../../assets/img/flask.svg" class="ico-img" >
                                        <p><b class="no" >80</b><br>
                                            <small class="task" >TASKS TESTED</small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="hoursSpent" class="col-xs-12 top-3"  >
                        <div class="row" >
                            <div class="col-xs-5" >
                                <p ><b class="number" >1028</b><br>
                                    <small class="hrs">HOURS SPENT</small>
                                </p>
                            </div>
                            <div class="col-xs-2" >
                                <img src="../../../assets/img/stopwatch.svg" class="clock" >
                            </div>
                            <div class="col-xs-5" >
                                <p><b class="number" >5</b><br>
                                    <small class="hrs">HOURS SPENT TODAY</small>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </el-dialog>
</template>

<script>
    export default {
        name: "quality-a",
        props: ['show'],
        data(){
            return{
                hoursSpent: true,
                workSum: false,
            }
        },
        methods:{
            viewWork(){
                this.workSum = true;
                this.hoursSpent = false;
            },
            viewHrsSpnt(){
                this.hoursSpent = true;
                this.workSum =false;
            },
            beforeClose() {

                this.$_$closeModal();


            },

        }
    }
</script>

<style scoped>

    .task{
        margin-bottom: 20px;
        color: #8C8989;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        text-align: center;
    }
    .no{
        margin-top: 20px;
        color: #453F3F;
        font-family: Montserrat;
        font-size: 24px;
        font-weight: 500;
        line-height: 31px;
        text-align: center;
    }
    .ico-img{
        height: 20px;
        margin: auto;
    }
    .person-c{
        box-shadow: 0 22px 20px 8px rgba(111,150,254,0.1);
        border-radius: 3px;
        padding: 35px;
    }
    .img-pm{
        height: 80px;
        width: 80px;
        border: 1px solid grey;
        border-radius : 100%;
    }
    .pm-name{
        height: 22px;
        width: 134px;
        color: #413E3E;
        font-family: Montserrat;
        font-size: 17px;
        font-weight: bold;
        line-height: 22px;
    }
    .pm-email{
        height: 20px;
        width: 212px;
        color: #8C8989;
        font-family: Montserrat;
        font-size: 15px;
        line-height: 20px;
        margin-top: -20px;
    }
    .quality{
        height: 20px;
        width: 128px;
        color: #453F3F;
        font-family: Montserrat;
        font-size: 15px;
        line-height: 20px;
    }
    .status{
        background-color: #84E289;
        border: 1px solid #84e289;
        border-radius: 3px;
        height: 44px;
        width: 130px;
        padding: 14px 27px;
        box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.1), 0 4px 9px 0 rgba(132,226,137,0.4);
    }
    .status:hover{
        box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
        transform: scale(1.005);
        transition: .2s ease-in-out all;
        cursor: pointer;
    }
    .online {
        height: 16px;
        width: 47px;
        color: #FFFFFF;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
    }
    .oval{
        box-sizing: border-box;
        border-radius: 100%;
        height: 11.89px;
        width: 11.89px;
        border: 3px solid #FFFFFF;
        box-shadow: 0 11px 25px -3px rgba(255,73,73,0.5);

    }
    .oval-1{
        border: 1px solid #D6DAE5;
        border-radius: 100%;
        height: 30px;
        width: 30px;
        padding: 3px;
        font-size: 18px;
        color: #7a7a7a;
        text-align: center;
    }
    .top-2{
        margin-top: 55px;
        border-top: 1px solid rgba(214,218,229,0.34);
        border-bottom: 1px solid rgba(214,218,229,0.34);
    }
    .part{
        color: #453F3F;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        text-align: center;
        height: 74px;
        width: 262px;
        border-radius: 3px;
        padding: 24px;
    }
    .part:hover{
        background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
        box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
        color: #fff;
    }
    .part .active{
        background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
        box-shadow: 0 13px 35px -3px rgba(111,150,254,0.1);
        color: #fff;
    }
    .top-3{
        margin-top: 100px;
        margin-bottom: 100px;
    }
    .clock{
        width: 47px;
        height: 50px;
    }
    .number{
        height: 31px;
        width: 52px;
        color: #453F3F;
        font-family: Montserrat;
        font-size: 24px;
        font-weight: 500;
        line-height: 31px;
        text-align: center;
    }
    .hrs {
        height: 1.56%;
        width: 9.24%;
        color: #8C8989;
        font-family: Montserrat;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;
        text-align: center;
    }
</style>