<template>
  <div class="well config-personal" id="personal-details_repo">
            
      <div class="well config-light-well repo-marg">
         <h4> Connect To An Exsisting Repo</h4>
         <div class="row">
             
             <div class="col-md-8">
              <label for="">URL</label>
                 <input type="text" class="form-control">
                 
             </div>
             <div class="col-md-4">
               <label for=""></label>
                 <button class="btn btn-default">ADD</button>
             </div>
         </div>
     </div>
     <div class="well config-light repo-marg">
         <h4>Or Create A New Repo</h4>
         <div class="row">
             
             <div class="col-md-8">
              <label for="">Name Of New Repo</label>
                 <input type="text" class="form-control">
                 
             </div>
             <div class="col-md-4">
               <label for=""></label>
                 <button class="btn btn-default">CREATE REPO</button>
             </div>
         </div>
     </div>
     
  </div>   
 
</template>
 <script>
    export default{
      name:'edit-repo',
    }
  </script>
  <style scoped>
    .well.config-light-well {
    border: none;
    box-shadow: none;
    border-radius: 1px;
}
    .well.config-light-well {
    border: none;
    background: #fff;
    box-shadow: none;
    border-radius: 1px;
}
div#personal-details_config {
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
  </style>