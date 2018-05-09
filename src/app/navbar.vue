<template>

  <nav class="navbar navbar-expand-lg bg-primary fixed-top">
      <div class="container">
          <div class="navbar-translate">
              <a class="navbar-brand" href="http://demos.creative-tim.com/now-ui-kit/index.html"
              data-toggle="tooltip" data-placement="bottom" title="Tooltip on left" data-container="body" data-animation="true" data-delay="100">
                  Central
              </a>
              <button class="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-bar bar1"></span>
                  <span class="navbar-toggler-bar bar2"></span>
                  <span class="navbar-toggler-bar bar3"></span>
              </button>
          </div>
          <div class="collapse navbar-collapse justify-content-end" id="navigation" data-nav-image="/static/img/blurred-image-1.jpg">
              <ul class="navbar-nav">
                  <li class="nav-item">
                      <router-link class="nav-link" :to="{name:'signup'}">
                          <i class="now-ui-icons arrows-1_cloud-download-93"></i>
                          <p>Signup</p>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link class="nav-link" :to="{name:'login'}">
                          <i class="users_single-02 files_paper"></i>
                          <p>Login</p>
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link btn btn-neutral" href="https://www.creative-tim.com/product/now-ui-kit-pro" target="_blank">
                          <i class="now-ui-icons arrows-1_share-66"></i>
                          <p>Upgrade to PRO</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" rel="tooltip" title="Follow us on Twitter" data-placement="bottom" href="https://twitter.com/CreativeTim" target="_blank">
                          <i class="fa fa-twitter"></i>
                          <p class="d-lg-none d-xl-none">Twitter</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" rel="tooltip" title="Like us on Facebook" data-placement="bottom" href="https://www.facebook.com/CreativeTim" target="_blank">
                          <i class="fa fa-facebook-square"></i>
                          <p class="d-lg-none d-xl-none">Facebook</p>
                      </a>
                  </li>
                  <li class="nav-item">
                      <a class="nav-link" rel="tooltip" title="Follow us on Instagram" data-placement="bottom" href="https://www.instagram.com/CreativeTimOfficial" target="_blank">
                          <i class="fa fa-instagram"></i>
                          <p class="d-lg-none d-xl-none">Instagram</p>
                      </a>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
</template>

<script type="text/javascript">
 /* eslint-disable */
    export default {
      methods: {
        routeName() {
          return this.$route.name
        }
      }
    }
</script>
