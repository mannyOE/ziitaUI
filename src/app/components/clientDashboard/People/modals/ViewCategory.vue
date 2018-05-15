<template>

    <el-dialog :visible="show"
      width="40%" 
      :show-close="false" 
      :before-close="beforeClose"  class="ele_Dialogue">
        <div slot="title">
          <button type="button" class="close" @click.stop="$_$closeModal">×</button>
        </div>

         <!--Modal content-->
        <div class="container-fluid">
         <h3 class="text-center">{{ category.category_name }}</h3>
         <p class="text-center">Skills</p>
            <p class="tags text-center">
                <span v-if="category.skills" v-for="(skill, index) in category.skills">{{ skill }}
                    <!--<i class="ion-ios-close"></i>-->
                </span>
                <span v-else>
                    No Skills
                </span>
            </p>
            <br>
            <!--<p class="text-center"><button class="btn btn-default">Save</button></p>-->
        </div>
    </el-dialog>
</template> 

<script>


export default {
  name: 'view-category',
  props: ['show', 'category'],
  methods:{
  beforeClose(done) {
      this.$_$closeModal()
      done();
    }
  }
};
</script>

<style scoped>
p.tags {
    margin-top: 4%;
}


p.tags span {
    background: #eae7e7;
    margin: 0px 3px;
    padding: 6px;
    border-radius: 5px;
    box-shadow: 0 2px 15px rgba(0,0,0,0.07);
}
button.btn.btn-default.sav-btn-category {
    padding: 7px 50px;
    color: #3379b7;
}
</style>