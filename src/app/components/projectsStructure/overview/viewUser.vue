<template>
    <el-dialog :visible="show" width="35%"
               :show-close="false"
               :before-close="beforeClose" class="viewdialog">


        <div role="dialog" aria-labelledby="View User" aria-describedby="View User">
            <div>
                <button type="button" class="close" @click.stop="beforeClose">×</button>
                <div class="top" >
                    <div class="row" >
                        <div class="col-xs-3" ></div>
                        <div class="col-xs-5" >
                            <p><b class="rose">Rosetta Rodgers</b><br>
                                <small class="jen">jenning.wunsch@yahoo.com</small><br><br>
                                <small class="quality">Quality Assurance</small>
                            </p>

                        </div>
                        <div class="col-xs-4" >
                            <div class="row">
                                <div class="col-xs-12" >
                                    <div class="rect" >
                                        <div class="row" >
                                            <div class="col-xs-4" >
                                                <p>Online</p>
                                            </div>
                                            <div class="col-xs-4" >
                                                <div class="oval" ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xs-12" >
                                    <div class="row" >
                                        <div class="col-xs-6" >
                                            <div class="oval-1" >

                                            </div>
                                        </div>
                                        <div class="col-xs-6" >
                                            <div class="oval-1" >

                                            </div>
                                        </div>
                                    </div>
                                </div>
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
        name: "view-user",
        methods:{
            beforeClose(done) {
                this.$emit('close');
                // this.$emit('messageSet', this.message)
                done();
            },
        }
    }
</script>

<style scoped>
.viewdialog{
    margin: auto;
}
    .rose{
        color: #413E3E;
        font-size: 17px;
        font-family: "Halis GR";
    }
    .jen{
        color: #8C8989;
        font-size: 15px;
        font-family: "Halis GR";
    }
    .quality{
        color: #453F3F;
        font-size: 15px;
        font-family: "Halis GR";
    }
    .rect{
        box-shadow: inset 0 1px 3px 0 rgba(0,0,0,0.1), 0 4px 9px 0 rgba(132,226,137,0.4);
        height: 44px;
        width: 130px;
        background: #84e289;
        border-radius: 3px;
        padding: 15px 25px;
        text-align: center;
        color: #fff;
        font-size: 12px;
        font-family: halis gr;
    }
.oval {
    box-sizing: border-box;
    height: 1.16%;
    width: 0.83%;
    border: 3px solid #FFFFFF;
    box-shadow: 0 11px 25px -3px rgba(255,73,73,0.5);
}
    .oval-1{
        border: 1px solid #D6DAE5;
        height: 31px;
        width: 31px;
        border-radius: 100%;
    }
</style>