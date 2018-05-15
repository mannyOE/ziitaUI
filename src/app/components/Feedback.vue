<template>
    <div class="container animated slideInDown" style="margin-top: 50px; margin-bottom: 50px;">
        <div class="row">
            <div class="col-md-1"></div>
            <div class="col-md-5 col-md-offset-3 signup-well well">
                <div class="auth-header">
                    <img :src="require('@/assets/img/zeedas-png.png')" alt="Zeedas" width="100px" height="100px" class="login-signup-logo" />
                    <h4 class="title">Feedback Form</h4>
                </div>
                <div class="spacer">
                    <div class="space"></div>
                </div>
                <div class="content auth-form">
                    <form @submit.prevent="validateBeforeSubmit">

                        <BannerError v-if="error" :exempt="true">{{ error }}</BannerError>
                        <BannerError v-else-if="success" :exempt='true'> {{ successMsg}}</BannerError>

                        <div class="row">
                            <!-- This Is where we use the validation with vee validate -->
                            <div class="col-md-12">
                                  <label class="label" for="name">Full Name</label>
                                    <p :class="{ 'control': true }">
                                        <input v-validate="'required|min:2'" 
                                            v-model="user.name"
                                            class="form-control" 
                                            :class="{'input': true, 'is-danger': errors.has('name') }" 
                                            name="name" 
                                            type="text" 
                                            placeholder="First Name">
                                       
                                        <FieldError>
                                            {{ errors.first('name') || fieldErrors.first_name }}
                                        </FieldError>
                                    </p>
                            </div>


                            <div class="col-md-12" >
                                 <label class="label" for="email">Email</label>
                                    <p :class="{ 'control': true }">
                                        <input v-validate="'required|email'" 
                                            v-model="user.email"
                                            class="form-control" 
                                            :class="{'input': true, 'is-danger': errors.has('email') }" 
                                            name="email" 
                                            type="text" 
                                            placeholder="Email">

                                        <FieldError>
                                            {{ errors.first('email') || fieldErrors.Email }}
                                        </FieldError>
                                    </p>
                            </div>

                             <div class="col-md-12">
                                  <label class="label" for="subject">Subject</label>
                                    <p :class="{ 'control': true }">
                                        <input 
                                            v-model="user.subject"
                                            class="form-control" 
                                            name="first name" 
                                            type="text" 
                                            placeholder="Subject">
                                    </p>
                            </div>

                             <div class="col-md-12">
                                  <label class="label" for="feedback">Feedback</label>
                                    <p :class="{ 'control': true }">
                                        <textarea name="" id="" cols="30" rows="10" v-validate="'required|min:2'" 
                                            v-model="user.feedback"
                                            class="form-control" 
                                            :class="{'input': true, 'is-danger': errors.has('feedback') }" 
                                            placeholder="Feedback"></textarea>
                                       
                                        <FieldError>
                                            {{ errors.first('feedback') || fieldErrors.feedback }}
                                        </FieldError>
                                    </p>
                            </div>
                          
                        </div>
                        <div class="text-center">
                            <input v-if="!loading" type="submit" class="btn auth-form-btn" value="Submit">
                            <LoadingButton v-else buttonclass="btn auth-form-btn">Sending...</LoadingButton>
                            
                        </div>
                        
                    </form>
                </div>
            </div>
            <div class="">
                <!-- <div class="well auth-emphasis">
                    <img :src="require('@/assets/img/692.jpg')" alt="Zeedas" width="100px" height="100px" class="img-responsive" />
                </div> -->
            </div>
            <!-- <div class="col-md-3"></div> -->
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { redirectLoginNoBack, redirectHome } from '@/app/helpers';

export default {
    name: 'signup',
    props: ['teamId', 'type', 'inviteId'],
    components: {
        // Error,
    }, 
    destroyed () {
        this.$_$destroyedHook()
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                subject: '',
                feedback: '',
            },
        };
    },

    computed: {
        ...mapGetters('register', [
            'error',
            'fieldErrors',
            'loading',
            'single',
            'successMsg',
            'success'
        ]),
        ...mapGetters('feedback', ['loading']),
        isUserClient() {
            const clientType = this.$_$userTypesObject.client.id
            return this.user.userType === clientType
        },

    },
    methods: {
        ...mapActions('feedback', ['sendFeedback']),
        ...mapActions("userCredentials", ["callWithToken", ]),
        clearFields () {
            this.user = {
                name: '',
                email: '',
                subject: '',
                feedback: '',
            };
        },

        validateBeforeSubmit() {
            this.$validator.validateAll().then(result => {
                    debugger;
                
                if (result) { 
                    let args = {
                        name: this.user.name,
                        email: this.user.email,
                        subject: this.user.subject,
                        feedback: this.user.feedback,
                    }
                    const self = this;
                    
                    this.sendFeedback(args)
                    .then(function (status) {

                        if (status.status === 200 ) {
                            self.clearFields()
                            self.$show_notification(status.data.message );
                        } else {
                            self.$show_notification(status.message, "error");
//                            self.clearFields()
//                            self.redirectLogin()
                        }
                    });
                    return;
                } else {
                    this.$show_notification('Please enter a Feedback before submiting')
                }
            });
        },
    },
};

</script>
<style scoped>
.col-md-4.signup-well.well {
    background: white;
    box-shadow: 0 2px 15px rgba(0,0,0,0.16);
    border-radius: 1px;
    padding: 32px;
}
</style>
