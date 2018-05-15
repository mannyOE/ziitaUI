<template>
  <div class="">
    <div class="row">
      <div class=" col-md-5">
        <p class="files">{{filtered.length}} MODULES</p>
      </div>
      <!-- {{modules}} -->
      <div class="col-md-6">
        <select class="form-control s-box" id="sort" v-model="filter_by" style="width: 140px;" name="">
          <option value="0">All</option>
          <option value="1">Completed</option>
          <option value="2">Not Completed</option>
        </select>
      </div>
    </div>
    <div class="creat-modules">
      <div class="my-table-row" v-for="(each, index) in filtered" :key="index"
      :class="{'active': showing === index}" @click="sendSelected(each, index)">
        <div class="col-md-9  ite">
          <p class="item">{{each.module_name}}</p>
        </div>
        <div class="col-md-3  ite">
          <p class="item">{{each.test.length}}</p>
        </div>
      </div>
      <div class="my-table-row active" v-if="filtered.length < 1">
        <div class="col-md-12  ite">
          <p class="item">No Modules Found in this Category</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script type="text/javascript">
  export default {
    props: ['modules'],
    data() {
      return {
        activeItem: "",
        statusOptions: ['Passed', 'Failed', 'Untested', 'Retest','Pending'],
        showing: 0,
        filter_by: '0',
      }
    },
    mounted() {


    },
    methods: {
      sendSelected(mods, id){
        this.showing = id;
        this.$emit('push', mods);

      },
      setScroll(len){

      },
      filterModules(){
        var total;
        var seti = [];
        if(this.filter_by === '0'){
          return this.modules;
        }
        if(this.filter_by === '1'){
          this.modules.forEach((ech)=>{
            total = this.modules.length;

            seti.push(ech.filter(e=>e.status === 3));
            // if(ech.filter(e=>e.status === 3).length === total){
            // }
          });
          return seti;
        }
        if(this.filter_by === '2'){
          this.modules.forEach((ech)=>{
            total = this.modules.length;
            seti.push(ech.filter(e=>e.status !== 3));
            // if(ech.filter(e=>e.status === 3).length !== total){
            // }
          });
          return seti;
        }
      },
      setSelected(modules){
        this.selected = modules;
      },
    },
    computed: {
      filtered(){
        if(this.modules.length !=0){
          if(this.filter_by === '0'){
            return this.modules;
          }

          if(this.filter_by === '1'){
            return this.modules.filter(e=>e.status === 3);
          }

          if(this.filter_by === '2'){
            return this.modules.filter(e=>e.status !== 3);
          }

        }else{
          return [];
        }
        // console.log(this.filtered);
      }
    }
  }
</script>

<style scoped>
  li {
    width: 100%;
    padding: 15px 15px;
    border: 0.5px solid #000;
    font-size: 15px;
    cursor: pointer;
  }
  li:hover {
    background-color: #cce7e7;
  }
  .isActive {
    color: #5bc0de;
    display: block;
  }
  .activ {
    display: none;
  }
  .my-table-row{
   height: 50px !important;
    /* width: 100% !important; */
    background-attachment: fixed;
    cursor: pointer;
    border-radius: 3px;
    border-top: 1px solid #D8D8D8;
    color: #4A4A4A;
  }
  .my-table-row:hover, .active{
    box-shadow: 0 10px 30px 0 rgba(50,106,218,0.1), 0 2px 4px 0 rgba(0,0,0,0.5);
    background-attachment: fixed;
    background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
    color: #fff;
  }
  .item {
    margin-top: 15px;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .files {
    margin: 27px 44px auto 3px;
    width: 100%;
    color: #9B9B9B;
    font-size: 12px;
  }
  .s-box {
    margin: 19px auto 35px auto;
  }
  .bolo {
    height: 550px;
    overflow-y: scroll;
  }

  .ite {
    font-size: 12px;	font-weight: 500;	line-height: 16px;
  }
  .creat-modules {
    height: 400px;
    overflow-y: auto;
  }
  .creat-modules:hover::-webkit-scrollbar{
      width: 5px;
      transition: all 1s ease;
  }
  .creat-modules::-webkit-scrollbar {
      width: 0px;

      transition: all 1s ease;
  }
  .creat-modules::-webkit-scrollbar-thumb {
      border-radius: 50px;
      /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); */
      background-color: #848484;
      transition: all 1s ease;
      /*background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, .2) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .2) 50%, rgba(255, 255, 255, .2) 75%, transparent 75%, transparent);*/
  }
  .creat-modules::-webkit-scrollbar-track {
      -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.1);
      border-radius: 50px;

      transition: all 1s ease;
  }





</style>
