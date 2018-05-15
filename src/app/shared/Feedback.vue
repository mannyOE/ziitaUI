<template>
    <li class="dropdown" @click.prevent="toggleNotificationBox" :class="{ 'open': openNotifications }">
        <a data-toggle="dropdown">
            <i class="ion-chatbubble-working"></i>
            <span class="nav-notif "></span>
        </a>
        <div class="dropdown-menu">
            <div class="triangle"></div>
            <div class="notification-header">
                <b>Feedback Form</b>
            </div>
            <div class="notification-list">

            <div class="notification" style="padding-top: 15px">
                <div>
                    <!-- <div>
                        <label class="label" for="subject">Subject</label>
                    <p :class="{ 'control': true }">
                        <input 
                            v-model="user.subject"
                            class="form-control" 
                            name="first name" 
                            style="width:100%; float:right"
                            type="text" 
                            placeholder="Subject">
                    </p>
                    </div> -->

                    <!-- <label class="label" for="feedback">Feedback</label> -->
                    <p :class="{ 'control': true }">
                        <textarea name="feedback" id="" cols="30" rows="10" v-validate="'required|min:2'" 
                            v-model="user.feedback"
                            class="form-control" 
                            :class="{'textarea': true, 'is-danger': errors.has('feedback') }" 
                            style="width:100%"
                            placeholder="Feedback"></textarea>
                        
                        <FieldError>
                            {{ errors.first('feedback') }}
                        </FieldError>
                    </p>

                    <input v-if="!loading" type="submit" @click="submit" 
                        style="width:50%; float:right"
                        class="btn auth-form-btn" value="Submit">
                    <LoadingButton v-else buttonclass="btn auth-form-btn">Sending...</LoadingButton>
                </div>
            </div>
            </div>
        </div>
    </li>

</template>
<script>
import{mapGetters, mapActions, mapMutations} from 'vuex'
    export default {
        name: "NotificationComponent",
        data() {
            return {
                openNotifications: false,
                 user: {
                    name: '',
                    email: '',
                    subject: '',
                    feedback: '',
                },
            };
        },
        computed:{
             ...mapGetters("userCredentials", {userData: "user"}),        
             ...mapGetters('feedback', ['loading']),


        },

        methods: {
            ...mapActions('feedback', ['sendFeedback']),

            toggleNotificationBox() {
                if (!this.openNotifications) {
                    this.openNotifications = true;
                    return true;
                }
                // this.openNotifications = false;
                // return false;
            },
            clearFields () {
            this.user = {
                name: '',
                email: '',
                subject: ' ',
                feedback: '',
            };
        },
            submit(){
                
                this.$validator.validateAll().then(result => {
                    debugger;
                
                if (result) { 

                let args = {
                        name: this.userData.first_name + ' ' + this.userData.last_name,
                        email: this.userData.Email,
                        // subject: this.user.subject,
                        feedback: this.user.feedback,
                    }
                    const self = this;
                    
                    this.sendFeedback(args)
                    .then(function (status) {
                        debugger;
                        if (status.status === 200 ) {
                            self.clearFields()
                            self.$show_notification(status.data.message );
                            self.openNotifications = false;
                        } else {
                            self.$show_notification(status.message, "error");
//                            self.clearFields()
//                            self.redirectLogin()
                        }
                    });
                    return;
                }
                })
            }
        }
    }
</script>

<style scoped>
.triangle {
    left: 221px;

}
</style>
