<template>
  <span>
    <div class="containerrr">



     <div class="row">
       <div class="col-md-10" >
           <h3 class="projects-overview-title">Category</h3>
       </div>
       <div class="col-md-2" align="right" >
           <AuthenticatedField v-show="check_permission('manageCategory')">
            <div class="create-new-category">
              <i class="ion-android-add" @click.stop="openAddCategory"></i>
            </div>
          </AuthenticatedField>
       </div>
       <div class="col-md-10 ">
          <div class="row">

              <LoadingBar v-if="loading"/>
              <FetchError v-else-if="error">{{ error }}</FetchError>

              <h3 v-else-if="!categories || !categories.length && !loading"
                  class="text-center no-projects"
                  style="margin-top: 100px;" >
                  <i class="icon ion-ios-list-outline"></i>
                  <br/>No categories.
              </h3>

            <div class="col-md-4" v-else v-for="(category, index) in categories" :key="index">
              <div class="well categorized-well">
                <h3>{{ category.category_name }}</h3>
                <p class="shill">Skills</p>
                <small class="theskills" >
                    HTML, CSS, Javascript
                </small>
                <!--<p>{{ catDate(category) | savageMoment("calendar", 'Do MMMM YYYY') }}</p>-->
                <p class="text-right" style="margin-top: +30px !important;margin-bottom: 20px !important; color: #4a4a4a !important;">
                    <el-tooltip class="item" effect="light" content="View Category" placement="bottom">
                  <i class="icon-i ion-ios-eye-outline" @click="openViewCategory(category)"></i>
                </el-tooltip>
                  <AuthenticatedField :pm="true">
                      <el-tooltip class="item" effect="light" content="Edit Category" placement="bottom">
                    <i class="icon-i ion-edit" @click="editCategory(category)"></i>
                  </el-tooltip>
                    <el-tooltip class="item" effect="light" content="Delete category" placement="bottom">
                    <i class="icon-i ion-ios-trash-outline"  @click.stop="removeCategory(category.Id, index)"></i>
                  </el-tooltip>
                  </AuthenticatedField>
                </p>

              </div>
            </div>

      </div>
       </div>
     </div>

    </div>
    <CategoryModal :show.sync="showAddCategoryModal" :selectedCategory="activeCategory"  @closeAddCategory="closeAddCategory" @reloadStore="reloadStore">
    </CategoryModal>
    <ViewCategoryModal :show.sync="showCategoryModal" :category="activeCategory" @close="closeViewCategory">
    </ViewCategoryModal>
  </span>

</template>

<script>
 import CategoryModal from './modals/createCategory';
 import ViewCategoryModal from './modals/ViewCategory';
 import { mapGetters, mapActions } from "vuex";

export default {
 name: "category",
 components: {
   CategoryModal,
   ViewCategoryModal,
  },
  data(){
    return{
      showAddCategoryModal: false,
      showCategoryModal: false,
      activeCategory: {}}
  },
  mounted () {
      this.callWithToken({
        parameters: {
          teamId: this.user.team_Id, // clients team id
        },
        action: this.getCategories,
      });
  },
  destroyed () {
    this.$_$destroyedHook(['remResetState'])
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters('categories', [
      'categories',
      'loading',
      'error'
    ]),
      ...mapGetters('userCredentials', [
          'user','permissions'
      ]),
    ...mapGetters('categories/remove', {
      deleteLoading: 'loading',
    }),
  },
  methods: {
    ...mapActions('categories', [
      'getCategories',
      'resetState'
    ]),
    ...mapActions('categories/remove', {
      deleteCategory: 'deleteCategory',
      remResetState:  'resetState',
    }),
    ...mapActions('userCredentials', [
      'callWithToken',
    ]),
      catDate (cat) {
          let date = new Date(parseInt(cat.created_time))
          return date
      },
     openAddCategory() {
            this.activeCategory = null;
            this.showAddCategoryModal = true;
        },
      closeAddCategory() {
          this.showAddCategoryModal = false;
      },
      openViewCategory(category) {
        this.activeCategory = category;
        this.showCategoryModal = true;
      },
      editCategory(category){
        category.name=category.category_name;
        this.activeCategory = category;
        debugger;
        // console.log("category selected",category);
        this.showAddCategoryModal=true;
      },
      closeViewCategory() {
        this.showCategoryModal = false;
      },
      check_permission(rule){
      var state = false;
      this.permissions.forEach((perm)=>{
        if(perm.Permission === rule){
          state = true;
        }
      })
      return state;
    },
      removeCategory (id, index) {
        const functionArgs = {
            id: id, // id
            index: index, // index in array
          }
        const self = this;

        this.$confirm('Are you sure you want to delete this category?', 'Warning', {
          confirmButtonText: 'Yes, I\'m sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
        .then(() => {
            self.callWithToken({
              parameters: functionArgs,
              action: self.deleteCategory,
            })
            .then(function (status) {
                if(status) {
                    self.reloadStore('deleteCategory', id);
                } else {
                }
            });
        })
        .catch(() => {});
      },

      reloadStore (type, id) {
          const args = {
            teamId: this.user.team_Id, // clients team id
          }
          this.$_$cheekyReloadStore({
              vm: this,
              type: type,
              authenticate: this.callWithToken,
              loadId: id,
              reloadAction: this.getCategories,
              reloadArgs: args
          })
      },
  }
}
</script>
<style scoped="true">
    .icon-i{
        border-radius: 100% !important;
        border: 1px solid #cfcccc;
        padding: auto !important;
        background: #fff;
    }
h3.projects-overview-title {
    margin-top: 6%;
    margin-bottom: 3%;
    color: #73a5d8;
}
.well.categorized-well h3{
    font-size: 18px;
    color: #4a4a4a !important;
}
.well.categorized-well .shill{
    height: 19px;
    width: 50px;
    color: #4A4A4A;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.12px;
    line-height: 19px;
    /*text-align: right;*/

}
.well.categorized-well .theskills{
    color: #9B9B9B !important;
    font-size: 14px;
    font-weight: 500;
    letter-spacing: 0.12px;

}
.well.categorized-well i {
    font-size: 20px;
    padding: 0px 7px;
    margin-top: +20px !importantss;
    cursor: pointer;
}
.well.categorized-well {
    width: 250px !important;
    background: #fff !important;
    box-shadow: 0 10px 30px 0 rgba(50,106,218,0.1);
    border: none;
    padding: 4px 27px;
    border-radius: 3px;
}
.create-new-category {
  /*position: fixed;*/
  /*bottom: 5%;*/
  /*right: 3%;*/
  /*box-shadow: 0 2px 15px rgba(0,0,0,0.15);*/
    margin-top: +45px !important;
    margin-left: -65px !important;
}

.create-new-category i {
    background: #FF346F;
    box-shadow: 1px 10px 30px 0 rgba(255,52,111,0.2);
    border-radius: 50%;
    padding: 11px 17px;
    font-size: 20px;
    color: #fff;
    cursor: pointer;
}
</style>
