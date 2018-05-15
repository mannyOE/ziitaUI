<template>
  <div class="well config-personal" id="personal-details_config">
      <div class="well config-light-well">
          <div class="row">
              <div class="col-md-4">
                  <p>CONFIG NAME</p>
              </div>
              <div class="col-md-8">
                  <input type="text" class="form-control">
              </div>
          </div>
      </div>
      <label for="">CONFIG FILE</label>
      <input type="text" placeholder="UPLOAD" class="form-control">
      <label for="">IMAGE</label>
      <select name="" id="" class="form-control">
          <option value="">Ubuntu</option>
          <option value="">Cent OS</option>
          <option value="">Fedora</option>
      </select>
       <label for="">VERSION</label>
      <select name="" id="" class="form-control">
          <option value="">-- Version --</option>
          <option value="">1.9.0</option>
      </select>
      <div class="button-layered-configuration">
           <button class="btn btn-default">Test</button> <router-link :to="{ name: 'configuration2'}"><button class="btn btn-primary">Save</button></router-link>
      </div>
     
  </div>     
 
</template>
 <script>
    export default{
      name:'server-config',
    }
  </script>