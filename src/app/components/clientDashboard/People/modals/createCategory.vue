<template>

    <el-dialog :visible="show"
      width="40%" 
      :show-close="false"  class="ele_Dialogue">
        <div slot="title">
          <button type="button" class="close" @click.stop="closeMe">×</button>
        </div>

         <!--Modal content-->
        <form class="container-fluid" @submit.prevent="addCategory">
            <BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
            
            <label for="">Name</label>
            <input name="name"
                v-model="category.name"
                v-validate="'required|min:2'"
                type="text" 
                class="form-control" 
                :class="{'input': true, 'is-danger': errors.has('name') }">

            <FieldError>
                {{ errors.first('name') || fieldErrors.category_name }}
            </FieldError>
            <br>
              <!-- <input type="text" list="cars" class="form-control" />
              <datalist id="cars">
                <option v-if="skillLoading">lOADING ... </option>
                <option v-else-if="skills" 
                    v-for="(skill, index) in skills"
                    :key="index" 
                    @click.stop="skillClicked(index, skill)">{{ skill.name }}<i class="ion-android-done-all icon" v-if="isSkillChosen(skill)"></i></option>
                <option v-else>No Skills Yet</option>
                <option>Audi</option>
              </datalist> -->
            <label for="">Skills</label>
            <!-- <p>Please select some skills</p> -->
            <input type="text" v-model="category.search" class="form-control" placeholder="Search For Skills">
            <span>
            <p v-if="false">Search for some thing</p>
            <p class="tags" v-else>
                <span v-if="skillLoading">Loading...</span>

                <span class="skill-load" v-else-if="skills"
                    v-for="(skill, index) in filterSkills"
                    :key="index"  
                    @click="skillClicked(index, skill)" >
                    {{ skill.name}}
                    <i class="ion-android-done-all icon" v-if="isSkillChosen(skill)"></i>
                </span>
                <span v-else>No Skills Available</span>
            </p>
            </span>
            <br>
            <p class="text-right">
                <button v-if="!loading" class="btn btn-default sav-btn-category">
                    Save
                </button>
                <LoadingButton v-else buttonclass="btn btn-default sav-btn-category">Saving...</LoadingButton>
            </p>
          
        </form>
    </el-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { modalShow } from '@/app/helpers'

export default {
  name: 'add-category-modal',
  props: ['show','selectedCategory'],
  data() {

        return {
          category: {
            issearch:true,
              name: '',
              skill: '',
              search: '',
              skills: [],
              Id: null
          },
      };  
      

  },
    destroyed () {
        this.$_$destroyedHook()
    },
  mounted () {
      this.fetchSkills()
  },
  watch: {
    'show': {

        handler: function (val, old) {
            
            if (val === true) {
              // handle the modal opening
                // modalShow.true(this)
                this.fetchSkills();
                if(this.selectedCategory){
                    this.category.skills = this.selectedCategory.skills;
                    this.category.name = this.selectedCategory.name;
                    this.category.search = "";
                    this.category.Id = this.selectedCategory.Id;
                }else{
                    this.category.skills = [];
                    this.category.name = '';
                    this.category.search = '';
                    this.category.Id = null;
                }
            } else {
              // handle modal closing
            //   modalShow.false(this);
            }
        },
        deep: true
    },
    'category.skill': {
        handler: function (val, old) {
          this.search = v.toLowerCase().trim();
            if (val) {
              // handle the modal opening
                this.addSkill()
            }
        },
        deep: true
    },
  },
  computed: {
      ...mapGetters('categories/add', [
          'success',
          'error',
          'fieldErrors',
          'loading',
      ]),
      ...mapGetters('categories/skills', [
          'skills',
      ]),
      ...mapGetters('categories/skills', {
          skillLoading: 'loading',
      }),
      ...mapGetters('userCredentials', {
          userData: 'user',
      }),
      filterSkills : function(){
         // return this.skills = false
         var self = this;
        return this.skills.filter((skill) =>{
           // return this.skill = false
          if (skill.name.toLowerCase().indexOf(self.category.search.toLowerCase()) > -1 || self.category.search.toLowerCase() == "") {
             return true;
             this.issearch = false
          }

          if(self.isSkillChosen(skill)){
              return true;
          }

          // else{
          //  this.skill.style.display = "none";
          // }

        });

       },
  },
  methods: {

      ...mapActions('categories/add', [
          'createCategory',
          'resetState',
      ]),
      ...mapActions('categories/skills', [
          'getSkills',
      ]),
      ...mapActions('userCredentials', [
          'callWithToken',
      ]),
      fetchSkills () {
        this.callWithToken({
            parameters: {
            },
            action: this.getSkills,
        });
      },
      clearFields() {
          this.category = {
              name: '',
              skill: '',
              skills: [],
          }

      },
      isSkillChosen (skill) {
          const chosenSkills = this.category.skills
          return chosenSkills.includes(skill.name)
      },
      skillClicked (index, skill) {
          if (this.isSkillChosen(skill)) {
            //   remove skill if already added
            this.removeSkill(skill.name)
          } else {
            //   add skill to category
            this.addSkill(skill.name)
          }
      },
      addSkill(skillName) {
          this.category.skills.push(skillName)
      },
      removeSkill(index, skillName) {
          const chosenSkills = this.category.skills
          // remove 1st occurence of skill name by index
          chosenSkills.splice(chosenSkills.indexOf(skillName), 1)
      },

    addCategory() {
        this.$validator.validateAll().then(result => {
            if (result) {
            // eslint-disable-next-line
            // Set arguments for endpoint
                let args = {
                    category_name: this.category.name,
                    skills: this.category.skills,
                    teamId: this.userData.team_Id,
                }

                if(this.category.Id){
                    args.Id = this.category.Id;
                }
                debugger;
                const self = this;
                this.callWithToken({
                  parameters: args,
                  action: this.createCategory,
                })
                .then(function (status) {
                    debugger;
                    if (status) {
                      // Reload categories on success
                        self.reloadStore()
                        self.closeMe();
                    } else {
                        console.log(status);
                    }
                });
                return;
            }
        });
    },
    reloadStore() {
      this.$emit('reloadStore', 'createCategory')
    },
    beforeClose(done) {
          this.closeMe();
      this.$_$closeModal();

    //   done();
    },
    closeMe(){
        this.$emit("closeAddCategory")
    }
  }
};
</script>

<style scoped>
p.tags {
    margin-top: 4%;
    height: 200px;
    overflow-y: auto;
    overflow-x: hidden;
}

.skill-load{
    width: 80px; height: 40px; display: inline-block; margin-top: 5px; overflow: hidden; position: relative; white-space: nowrap;
}

.skill-load .icon{
    position: absolute;
    top: 0px;
    right: 0px;
}

p.tags span {
    background: #e8e8e8;
    margin: 0px 3px;
    padding: 7px;
    font-size: 13px;
    cursor: pointer;
    border-radius: 1px;
    -webkit-box-shadow: 0 2px 15px rgba(0,0,0,0.07);
    box-shadow: 0 2px 15px rgba(0,0,0,0.07);
}


p.tags .icon {
    color: #7ed321;
    font-size: 16px;
}
button.btn.btn-default.sav-btn-category {
    padding: 7px 50px;
    color: #3379b7;
}
.meow{
  display: none;
}
</style>