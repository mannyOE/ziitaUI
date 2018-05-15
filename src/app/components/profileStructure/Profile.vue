<template>
    <div id="home" class="tab-pane fade animated fadeInUp" :class="{'active in': routeName === 'profile'}">
        <div class="col-md-8">
            <div class="well personal-well opned " data-toggle="collapse" data-target="#personal-details" aria-expanded="false">
                <p class="person f-weight-6">Personal Details</p>
                <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
            </div>
            <UpdateProfileForm/>
        <HideField>
            <!-- SkillSet -->
            <span id="skillset-block" >
            <div class="well personal-well opned" data-toggle="collapse" data-target="#skill-set">
                <p class="person f-weight-6">Skillset</p>
                <i class="icon ion-ios-arrow-right step-size18 float-right" id="icon-change"></i>
            </div>

            <div class="skill-set well collapse" id="skill-set">
                <div class="row">
                    <div class="col-md-5">
                        <label for="">SKILL SET</label>
                        <select type="text" class="form-control">
                            <option value="none">Choose Your Skill</option>
                            <option value="">ReactJs</option>
                            <option value="">VueJs</option>
                            <option value="">EmberJs</option>
                            <option value="">NodeJs</option>
                            <option value="">KnockoutJs</option>
                            <option value="">Html</option>
                            <option value="">Css</option>
                            <option value="">Sass</option>
                            <option value="">Less</option>
                            <option value="">Add my skillset</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label for="">PROFICIENCY</label>
                        <select type="text" class="form-control">
                            <option value="">1</option>
                            <option value="">2</option>
                            <option value="">3</option>
                            <option value="">4</option>
                            <option value="">5</option>
                            <option value="">6</option>
                            <option value="">7</option>
                            <option value="">8</option>
                            <option value="">9</option>
                            <option value="">Add my Proficiency</option>
                        </select>
                    </div>
                    <div class="col-md-3 ">
                        <br>
                        <button class="btn btn-default">Add</button>

                    </div>
                </div>
                <div class="output-table">
                    <table class="table table-hover ">
                        <thead>
                            <tr>
                                <th class="text-center">Skill</th>
                                <th class="text-center">Proficiency</th>
                                <th class="text-center">Option</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="text-center">Node Js</td>
                                <td class="text-center">1</td>
                                <td class="text-center option">
                                    <i class="fa fa-edit"></i>
                                    <i class="fa fa-close"></i>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">Angular Js</td>
                                <td class="text-center">1</td>
                                <td class="text-center option">
                                    <i class="fa fa-edit"></i>
                                    <i class="fa fa-close"></i>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">React Js</td>
                                <td class="text-center">3</td>
                                <td class="text-center option">
                                    <i class="fa fa-edit"></i>
                                    <i class="fa fa-close"></i>
                                </td>
                            </tr>
                            <tr>
                                <td class="text-center">Ember Js</td>
                                <td class="text-center">3</td>
                                <td class="text-center option">
                                    <i class="fa fa-edit"></i>
                                    <i class="fa fa-close"></i>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            </span>
        </HideField>
        </div>
        <!-- <vue-toast ref="toast" /> -->
    </div>
</template>

<script>
import { mapGetters , mapActions, mapMutations} from 'vuex';
import UpdateProfileForm from '@/app/shared/forms/updateProfile';

export default {
    name: 'Profile',
    components: {
        UpdateProfileForm,
    },
    computed: {
        routeName() {
            return this.$route.name;
         },
        // ...mapGetters('auth',[
        //   'id',
        //   'user',
        //   'userType'
        // ]),
        // data() {
        // return {
        // user: {
        //     firstName:'',
        //     lastName:'',
        //     email:'',
        //     phone:''
        //     },
        // };
        //  data() {
        // return {
        //     user: {
        //         type: 'default',
        //         firstName: '',
        //         lastName: '',
        //         email: '',
        //         bio: '',
        //     },
        // };


    },

    // methods: {
    //     ...mapMutations(['editUser']),
    //     ...mapActions('user' ['editUser' ]),
    //     checkUser,

    //     submit() {
    //     const toast = this.$refs.toast;
    //     const self = this;
    // //  console.log(this.user, "login");

    //     return this.editUser(user)
    //     .then(data => {
    //       if (data) {
    //         toast.showToast("Save Was Successfull", {
    //           theme: "success",
    //           time: 3000
    //         });
    //          console.log("login");
    //         self.showCreateBtn = true;
    //       }

    //     })
    //     .catch(error => {
    //       console.log("Cant Save Changes", error);
    //       if (error) {
    //         toast.showToast("Cant Save Changes ,Email Has Been Previously Used", {
    //           theme: "error",
    //           time: 3000
    //         });

    //       }
    //       return null;
    //     });
    // },
     //    }
    //   }
     methods: {
        // ...mapActions({
        //     editUser: "auth/editUser"
        // }),
        // checkUser,
        submit() {
          console.log('Happy Happy sis');
        },
    },
    }

</script>

<style>

</style>
