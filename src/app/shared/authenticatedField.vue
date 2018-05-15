<template>
    <span v-if="isUserAuthenticated">
        <slot/>
    </span>
</template>
<script>
import { mapGetters } from 'vuex';

export default {
  name: "autthenticated-field",
  props: ['client', 'pm', 'developer', 'notAuthenticated'],
  data() {
    return {
    };

  },
  computed: {
      ...mapGetters('userCredentials', [
          'isClientAuth',
          'isAuth',
          'isProjectManagerAuth',
          'isDeveloperAuth',
      ]),

      ...mapGetters('Admin', [
          'adminRoles',
      ]),


      isUserAuthenticated() {
          let callables = []

          if (this.client) {
              callables.push(this.isClientAuth)
          }
          if (this.pm) {
              callables.push(this.isProjectManagerAuth)
          }
          if (this.developer) {
              callables.push(this.isDeveloperAuth)
          }
          if (this.notAuthenticated) {
            //   Only unauthenticated users should see it
              return !this.isAuth
          } else if (callables.length) {
              return callables[0] || callables[1] || callables[2]
          } else {
              return this.isAuth
          }
      }
  },
  methods: {

  },
  
}

</script>
<style scoped>
</style>
