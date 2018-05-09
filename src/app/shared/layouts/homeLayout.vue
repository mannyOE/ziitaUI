<template>
  <div class="">
    <body class="login-page sidebar-collapse">
        <!-- Navbar -->
      <navbar/>
      <router-view/>
    </body>
  </div>
</template>

<script type="text/javascript">
 /* eslint-disable */
import navbar from '@/app/shared/navbar.vue'
export default {
  name: 'home-layout',
  components: {
    navbar
  }
}
</script>
