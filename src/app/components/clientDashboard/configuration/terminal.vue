<template>
  <div class="well config-personal marg-2" id="personal-details_config2">
      <div class="well config-light-well">
          <div class="row">
              <div class="col-md-4">
                  <!-- <p>CONFIG NAME</p> -->
              </div>
              <div class="col-md-8">
                  <input type="text" class="form-control">
              </div>
          </div>
      </div>
      <textarea name="" id="server-config" class="form-control" v-model="terminal"></textarea>
      <div class="button-layered-configuration">
           <!-- <button class="btn btn-default" v-show="false">Test</button> <button @click="$emit('next')" class="btn btn-primary">Save</button> -->
      </div>
     
  </div>     
 
</template>
 <script>
    export default{
      name:'server-config2',
      props: ["bash"],
      data(){
        return {
            terminal: this.bash
        }
    }
    }
  </script>
  <style>
    .well.config-light-well {
    border: none;
    box-shadow: none;
    border-radius: 1px;
}
textarea#server-config {
    height: 250px !important;
    background: #000;
    color: #04c504;
    font-family: monospace !important;
    font-size: 13px;
    text-align: left !important;
    resize: none;
    border: none !important;
    margin-bottom: 4%;
    padding: 13px;
}
.button-layered-configuration button {
    padding: 7px 66px;
    border-radius: 1px;
}
.button-layered-configuration {
    text-align: center;
    margin-top: 8%;
}
.well.config-light-well {
    border: none;
    box-shadow: none;
    border-radius: 1px;
}
div#personal-details_config2 {
    background: #fff;
    padding: 36px;
    border: none;
    border-radius: 1px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
}
.button-layered-configuration button {
    padding: 7px 66px;
    border-radius: 1px;
}
.button-layered-configuration {
    text-align: center;
    margin-top: 8%;
}
.well.config-well {
    background: #fff;
    border: none;
    padding: 18px 24px 10px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.10);
}
.well.config-well i {
    float: right;
    margin-top: -7%;
    font-size: 21px;
}
div#personal-details_repo {
    background: #fff;
    border: none;
    padding: 38px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.12);
}
.repo-marg button {
    width: 100%;
    color: #3369da;
}
.repo-marg{
    margin-top: 3%;
}
.marg-2{
  margin-top: 4%;
  }
  </style>
