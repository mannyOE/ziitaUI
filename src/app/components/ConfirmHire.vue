<template>
    <section class="content-body">
        <div class="container">
            <div class="row" align="center">

                <LoadingBar v-if="loading"/>
                <FetchError v-else-if="error">{{ error }}</FetchError>
                
                <div v-else-if="success">
                    <i class="ion-android-done-all success-icon"></i>
                    You've been hired!
                </div>

            </div>
        </div>
    </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'confirm-hire',
    props: ['teamId', 'userId', 'type'],
    components: {
    },
    data() {
        return {
        };
    },
    mounted () {
        const self = this;

        this.callWithToken({
          parameters: {
            userId: this.userId,
            teamId: this.teamId,
          },
          action: this.confirmHire,
        });
    },
    destroyed () {
      this.$_$destroyedHook()
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters('team/hireUser', [
        'success',
        'loading',
        'error',
      ]),
        ...mapGetters('userCredentials', [
            'user',
        ]),
    },
    methods: {
      ...mapActions('team/hireUser', [
        'confirmHire',
        'resetState'
      ]),
      ...mapActions('userCredentials', [
        'callWithToken',
      ]),
    },
};
</script>

<style scoped>
.success-icon {
    color: #7ed321;
    font-size: 244px;
}
</style>
