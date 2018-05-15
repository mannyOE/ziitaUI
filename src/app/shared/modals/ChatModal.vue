<template>
    <modal
            v-show.sync="show"
            title="Title"
            intro="bouneIn"
            outro="bounceOut"
            @close="closeModal"
            class="modal-dialog modal-lg project-chat-modal">

        <!-- HEADER -->
        <div slot="modal-header">
            <!--<h3 style="padding: 10px; text-align: center; color: #728EAA">Create Project</h3>-->
            <!--<BannerError :show.sync="error">{{ error }}</BannerError>-->
        </div>

        <!-- BODY -->
        <div slot="modal-body" class="modal-body">
            <div class="chat-box">
                <div class="chat-head">
                    <button class="submit submit-md-x beside" @click.prevent="closeModal">BACK</button>
                    <div class="chat-title beside">CHAT</div>
                    <div class="beside row">
                        <div class="col-md-3">
                            <img :src="require('@/assets/img/1.jpeg')" class="avatar-chat" height="40">
                        </div>
                        <div class="col-md-9 proj-mngr-head">
                            <p class="proj-name">{{projectManager.name}}</p>
                            <p class="proj-address">Project Associate</p>
                        </div>
                    </div>
                    <div class="help-title beside">HELP</div>
                    <div class="fa fa-question-circle beside help-icon"></div>
                </div>
                <div class="chat-body">
                    <div v-bind:class="{
                        'client-chat': user.id !== message.sender,
                        'proj-mngr-chat': user.id === message.sender
                    }" v-for="message in chat.messages">
                        <div class="inside-chat-left" v-show="user.id === message.sender">
                            <img :src="require('@/assets/img/1.jpeg')" class="avatar-chat-x" height="30">
                        </div>
                        <div class="chat-txt">{{ message.message }}</div>
                        <div class="chat-txt-date">{{ message.createdAt | date }}</div>

                        <div class="inside-chat-right" v-show="user.id !== message.sender">
                            <img :src="require('@/assets/img/1.jpeg')" class="avatar-chat-x" height="30">
                        </div>
                    </div>
                </div>
                <form @submit.prevent="send">
                    <input v-model="message.message" type="text" placeholder="Type a message" class="chat-bottom">
                </form>
            </div>
        </div>

        <!-- FOOTER -->
        <div slot="modal-footer">
            <!--<button slot="modal-cancel" type="button" @click="closeModal" class="btnCancel">Cancel</button>-->
            <!--<LoadingBtn v-if="loading" btnclass="btnCreate">
                Creating Wardrobe...
            </LoadingBtn>
            <button v-else type="submit" @click.prevent="submit" class="btnCreate">
                Create Wardrobe
            </button>-->
        </div>


    </modal>
</template>

<script>
    // import LightModal from 'light-modal-vue'
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: 'chatmodal',
        props: ['show', 'projectManager'],
        components: {
            // modal: LightModal,
        },
        created() {
            this.joinSocketRoom({
                socket: this.$dmsSocket,
                participants: ['59bba6125252410701f35d29', this.projectManager.id]
            });
        },
        data () {
            return {
            };
        },
        computed: {
            message() {
                return {
                    type: 'message',
                    sender: this.user.id,
                    message: ''
                }
            },
            ...mapGetters('projects/add', [
                'chat',
            ]),
            ...mapGetters('auth', [
                'user',
            ])
        },
        updated() {
            const elem = this.$el.querySelector('.chat-body');
            elem.scrollTop = elem.clientHeight;
        },
        methods: {
            closeModal() {
                this.$emit('close');
            },
            submit() {
                this.$router.push({ name: 'create-project' });
            },
            ...mapActions('projects/add', [
                'joinSocketRoom',
                'sendMessage'
            ]),
            send() {
                this.message.createdAt = new Date();
                this.sendMessage({
                    socket: this.$dmsSocket,
                    message: this.message
                });
                this.message.message = '';
            }
        }
    }
</script>

<style scoped>
    .project-chat-modal .modal-footer, .project-chat-modal .modal-header {
        display: none;
    }

    .project-chat-modal .chat-body {
        overflow-y: scroll;
        max-height: 300px;
        width: 100%;
    }
</style>