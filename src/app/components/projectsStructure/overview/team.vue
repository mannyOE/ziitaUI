<template id="">
  <div class=" col-md-12 m-t-50">
    <h5 class="m-b-20">PROJECT TEAM</h5>
    <div class="table100 ver2 m-b-110 col-md-12 team">
      <div class="table100-head">
        <table>
          <thead>
            <tr class="row100 head">
              <th class="cell100 column1">Basic Info</th>
              <th class="cell100 column2">Id</th>
              <th class="cell100 column3">Role</th>
              <th class="cell100 column4">Date Joined</th>
            </tr>
          </thead>
        </table>
      </div>

      <div class="table100-body js-pscroll">
        <table>
          <tbody>
            <tr class="row100 body" v-for="a in team" @click="openDevDetails(a)">
              <td class="cell100 column1">
                <div class="col-md-2 m-r-5">
                  <img :src="imageLink(a)" class="img" alt="">
                </div>
                <div class="col-md-8">
                  {{a.first_name+' '+a.last_name}} <br> <small>{{a.Email}}</small>
                </div>
              </td>
              <td class="cell100 column2"># {{a.Id}}</td>
              <td class="cell100 column3">{{$_$getUserTypeName(a.type) }}</td>
              <td class="cell100 column4">{{convert_to_date(a.created_time)}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  export default {
    props: ['team'],
    data() {
      return {

      }
    },
    mounted(){

    },
    computed: {

    },

    methods: {
      imageLink(member){
           if(!member.profile_thumbnail){
               return require('@/assets/img/user.svg');
           }
           return this.$API + 'img/thumbnails/'+ member.profile_thumbnail;
       },
       openDevDetails(member){
         this.$emit('showModal', member);
       },
       convert_to_date(date){
             if(!date)
                 return "--";
           return new Date(Number(date)).toGMTString();
       },
    }
  }
</script>

<style scoped>
  .table100-body table tbody tr:hover td{
    	background: linear-gradient(225.5deg, #84E289 0%, #326ADA 100%);
      background-attachment:fixed;
      color: #fff;
      cursor: pointer;
  }
  .img {
    border-radius: 100%;
    height: 40px;
    width: 40px;
  }
</style>
