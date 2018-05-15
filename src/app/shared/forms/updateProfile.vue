<template>
    <form @submit.prevent="validateBeforeSubmit" 
        class="personal-details well collapse" 
        id="personal-details" 
        aria-expanded="false" 
        style="height: 120px;">

        <BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
        <BannerSuccess v-else-if="success" :exempt="true">{{ successMsg }}</BannerSuccess>

        <div class="row">
            <div class="col-md-6">
                <label for="">FIRST NAME</label>

                <input v-validate="'min:2'"  
                    v-model="user.firstName"
                    class="form-control" 
                    :class="{'input': true, 'is-danger': errors.has('first name') }" 
                    name="first name" 
                    type="text">
                <FieldError>
                    {{ errors.first('first name') }}
                </FieldError>
            </div>
            <div class="col-md-6">
                <label for="">LAST NAME</label>

                <input v-validate="'min:2'"  
                    v-model="user.lastName"
                    class="form-control" 
                    :class="{'input': true, 'is-danger': errors.has('last name') }" 
                    name="last name" 
                    type="text">
                <FieldError>
                    {{ errors.first('last name') }}
                </FieldError>
            </div>
        </div>
        <label for="">E-MAIL</label>
        <input v-validate="'email'"  
            v-model="user.email"
            class="form-control" 
            :class="{'input': true, 'is-danger': errors.has('email') }" 
            name="email" 
            type="text">
        <FieldError>
            {{ errors.first('email') }}
        </FieldError>
        
        <!--Developer specific field-->
        <AuthenticatedField :developer="true">
            <label for="">PHONE NUMBER</label>
            <input v-validate="'integer'"  
                v-model="user.phone"
                class="form-control" 
                :class="{'input': true, 'is-danger': errors.has('phone') }" 
                name="phone" 
                type="text"
                placeholder="Your Phone Number">
            <FieldError>
                {{ errors.first('phone') }}
            </FieldError>
        </AuthenticatedField>
        
        <!--Client specific field-->
        <AuthenticatedField :client="true">
            <label for="">Team Name</label>
            <input v-validate="'min:2'"  
                v-model="user.teamName"
                class="form-control" 
                :class="{'input': true, 'is-danger': errors.has('team name') }" 
                name="team name" 
                type="text">
            <FieldError>
                {{ errors.first('team name') }}
            </FieldError>
        </AuthenticatedField>

        <p class="text-right">
            <button v-if="!loading" class="btn btn-default" type="submit">Save</button>
            <LoadingButton v-else buttonclass="btn btn-default">Saving...</LoadingButton>
        </p>
    </form>
</template>

<script>
import { mapActions , mapGetters } from 'vuex';

export default {
    name: "update-profile-form",
    computed: {
        routeName() {
        return this.$route.name;
        },
        ...mapGetters('users/updateProfile', [
            'error',
            'success',
            'successMsg',
            'loading',
        ]),
        ...mapGetters('userCredentials', {
            userData: 'user',
        }),
    },
    data() {
        return {
            user: {
                firstName:"",
                lastName: "",
                email: "",
                phone: "",
                title: "",
            },
        };
    },
    mounted(){
        this.user.firstName = this.userData.first_name;
        this.user.lastName = this.userData.last_name;
        this.user.email = this.userData.Email;
        this.user.teamName = this.userData.team_name
    },
    destroyed () {
        this.$_$destroyedHook()
    },
    methods: {
        ...mapActions('users/updateProfile', [
            'updateProfile',
            'resetState',
        ]),
        ...mapActions('userCredentials', [
            'callWithToken',
        ]),
        ...mapActions('auth', [
            'getUser',
        ]),
        clearFields() {
            // this.user = {
                // firstName:"",
                // lastName: "",
                // email: "",
                // phone: "",
                // teamName: "",
            // };
        },
        validateBeforeSubmit() {
            this.$validator.validateAll().then(result => {
                if (result) {
                // eslint-disable-next-line
                // Set arguments for endpoint
                let args = {
                    userId: this.userData.Id,
                    first_name: this.user.firstName || undefined,
                    last_name: this.user.lastName || undefined,
                    Email: this.user.email || undefined,
                    team_name: this.user.teamName || undefined,
                    phone: this.user.phone || undefined,
                }

                const self = this;
                this.callWithToken({
                    parameters: args,
                    action: this.updateProfile,
                })
                .then(function (status) {
                    if (status) {
                        self.clearFields()
                        // Refresh user
                        self.callWithToken({
                            parameters: {},
                            action: self.getUser,
                        })
                        .then( status => {
                            if (status) {
                            // Got user
                            }
                        })
                    } else {
                    }
                });
                return;
                }
            });
        },
    }
};


</script>

<style>

</style>
