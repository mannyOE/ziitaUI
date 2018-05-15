<template>
  <span>
    <!-- <p class="proj-type-z-united com-son">
      <img :src="require('@/assets/img/zeedas-png.png')" />
    </p>
    <h3 class="text-center">Coming Soon Now On Zeedas...</h3> -->

    <LoadingBar v-if="loading"/>
    <FetchError v-else-if="error">{{ error }}</FetchError>

    <h3 v-else-if="!hireables || !hireables.length && !loading" 
        class="text-center no-projects" 
        style="margin-top: 100px;" >
        <i class="icon ion-ios-list-outline"></i>
        <br/>No Users Available.
    </h3> 

    <div v-else class="row">
      <div class="col-md-3">
        <div class="well search-Part">
          <label for="">SPECIALITY</label>
          <p class="tags">
              <span v-for="(type, index) in $_$userTypes"
                v-if="type.name !== 'Client'"
                :key="index" 
                @click.stop="setTypeFilter(type.value)">
                  {{ type.name }}
                  <i class="ion-android-done-all icon" v-if="isTypeChosen(type.value)"></i>
              </span>
              <span @click.stop="setTypeFilter(null)">
                  All
                  <i class="ion-android-done-all icon" v-if="isTypeChosen(null)"></i>
              </span>
          </p>

          <label for="">SKILLS</label>
          <p class="tags">
              <b v-if="skillLoading">loading...</b>
              <span v-else-if="skills.length" 
                  v-for="(skill, index) in skills"
                  :key="index" 
                  @click.stop="setSkillFilter(skill)">
                  {{ skill.name }}
                  <i class="ion-android-done-all icon" v-if="isSkillChosen(skill)"></i>
              </span>
              <b v-else>No Skills Available</b>
          </p>
         <button class="btn btn-default btn-block">Search</button>
        </div>
      </div>
      <div class="col-md-9">
        <BannerError v-if="hireError || selectError">{{ hireError || selectErrorMsg }}</BannerError>
        <BannerSuccess v-else-if="hireSuccess" :exempt="true">Hire Request Sent</BannerSuccess>
        <div class="col-md-4" 
          v-for="(person, index) in filteredHireables" 
          :key="index"
          @click.stop="selectPerson(person.Id)">
          <div class="people active" :class="{ 'person-selected': isActivePerson(person.Id) }">
              <div class="person-img">
              <img :src="require('@/assets/img/1.jpeg')" >
              </div>
              <div class="people-card">
              <h3>{{ person.first_name }} {{ person.last_name }}</h3>
              <h5>{{ $_$getUserTypeName(person.type) }}</h5>
              </div>
             
          </div>
          
        </div>

        <h3 v-if="!filteredHireables || !filteredHireables.length" 
            class="text-center no-projects" 
            style="margin-top: 100px;" >
            <br/>No Match Found.
        </h3> 
      </div>
      <div v-if="filteredHireables.length">
        <button v-if="!hireLoading" 
            class="btn btn-default pull-right" 
            @click.stop="hirePerson()">
            Hire
        </button>
        <LoadingButton v-else buttonclass="btn btn-primary pull-right">Hiring...</LoadingButton>
      </div>
    </div>
  </span>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'hire-talent-form',
  props: [],
  data () {
    return {
      selectedPerson: null,
      skillFilters: [],
      typeFilter: null,
      selectError: false,
      selectErrorMsg: 'Please choose one user to hire',
    }
  },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters('users/unhired', [
        'hireables',
        'loading',
        'error',
      ]),
      ...mapGetters('categories/skills', [
          'skills',
      ]),
      ...mapGetters('categories/skills', {
          skillLoading: 'loading',
      }),
        ...mapGetters('userCredentials', [
            'user',
        ]),
      ...mapGetters('team/hireUser', {
        hireLoading: 'loading',
        hireError: 'error',
        hireSuccess: 'success',
      }),
      filteredHireables () {
        let filtered = this.hireables;
        
        // filter by type
        if (this.typeFilter !== null) {
          filtered = this.hireables.filter((person) => {
            return person.type === this.typeFilter;
          });
        }

        // filter skills
        if (this.skillFilters.length) {
          filtered = filtered.filter((person) => {
            // get a list of matches for all skills in filter
            let skillsMatch = this.skillFilters.map((skill) => {
              // if person's skill set includes on of filters
              return person.skills ? person.skills.includes(skill) : false
            })
            // add person if one of the skills matched filter
            return skillsMatch.includes(true);
          });
        }

        return filtered;
      }
    },
    methods: {
      ...mapActions('team/hireUser', {
        hireUser: 'hireUser',
      }),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),

      isActivePerson (personId) {
        return this.selectedPerson === personId;
      },

      setTypeFilter (type) {
        this.typeFilter = type;
      },

      setSkillFilter (skill) {
        if (this.skillFilters.includes(skill)) {
          // if skill is already there, remove
          this.skillFilters.splice(this.skillFilters.indexOf(skill), 1);
        } else {
          // add new skill to filter
          this.skillFilters.push(skill);
        }
      },

      isActivePerson (personId) {
        return this.selectedPerson === personId;
      },

      isSkillChosen (skill) {
        return this.skillFilters.includes(skill);
      },

      isTypeChosen (type) {
        return this.typeFilter === type;
      },

      selectPerson (personId) {
        if (!this.isActivePerson(personId)) {
          // add new
          this.selectedPerson = personId;
        } else {
          // unselect person
          this.selectedPerson = null;
        }
      },

      hirePerson () {
        const functionArgs = {
          userId: this.selectedPerson,
          team_id: this.user.Id,
        }
        const self = this;

        if (this.selectedPerson !== null) {
          this.selectError = false;
          self.callWithToken({
            parameters: functionArgs,
            action: self.hireUser,
          })
        } else {
          this.selectError = true;
        }
      },
  }
};
</script>

<style scoped>
.com-son img{
  height: 45px;
  width: 45px;
  margin-top: 7%;
}
.person-selected {
    box-shadow: 0 11px 27px 0 rgba(0, 0, 0, 0.13);
    border-radius: 1px;
    border: 1px solid #3469da;
    text-align: center;
}
.well.search-Part button {
    margin-top: 14%;
}

.well.search-Part label {
    color: #fff !important;
    margin-top: 7%;
}

.well.search-Part {
    border: none;
    background: #3369da;
    color: #fff !important;
}
p.tags {
    margin-top: 4%;
}


p.tags span {    
    background: rgba(0,0,0,0.3);
    margin: 0px 3px;
    padding: 6px;
    cursor: pointer;
    border-radius: 5px;
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
</style>
