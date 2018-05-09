<template>
  <nav class="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent " color-on-scroll="400">
      <div class="container">
          <div class="dropdown button-dropdown">
              <a href="#pablo" class="dropdown-toggle" id="navbarDropdown" data-toggle="dropdown">
                  <span class="button-bar"></span>
                  <span class="button-bar"></span>
                  <span class="button-bar"></span>
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a class="dropdown-header">Dropdown header</a>
                  <a class="dropdown-item" href="#">Action</a>
                  <a class="dropdown-item" href="#">Another action</a>
                  <a class="dropdown-item" href="#">Something else here</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">Separated link</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#">One more separated link</a>
              </div>
          </div>
          <div class="navbar-translate">
              <router-link class="navbar-brand" :to="{name: 'home'}" rel="tooltip" title="CRM Tool" data-placement="bottom">
                  Central Station
              </router-link>
              <button class="navbar-toggler navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-bar bar1"></span>
                  <span class="navbar-toggler-bar bar2"></span>
                  <span class="navbar-toggler-bar bar3"></span>
              </button>
          </div>
          <div class="collapse navbar-collapse justify-content-end" id="navigation" data-nav-image="/static/img/blurred-image-1.jpg">
              <ul class="navbar-nav">
                  <!-- <li class="nav-item" :class="{'active': routeName=='homePage'}">
                    <router-link :to="{name: 'home'}" class="nav-link">
                      <i class="now-ui-icons objects_globe"></i>
                      <p>Home</p>
                    </router-link>
                  </li> -->
                  <li class="nav-item" :class="{'active':routeName==='signup'}">
                      <router-link :to="{name: 'signup'}" class="nav-link">
                          <i class="now-ui-icons users_circle-08"></i>
                        <p>Create Account here</p>
                      </router-link>
                  </li>
                  <li class="nav-item" :class="{'active':routeName==='login'}">
                      <router-link :to="{name: 'login'}" class="nav-link">
                        <i class="now-ui-icons emoticons_satisfied"></i>
                        <p>Login Here</p>
                      </router-link>
                  </li>
              </ul>
          </div>
      </div>
  </nav>
</template>

<script type="text/javascript">
/* eslint-disable */
    export default {
      mounted() {

      },
      computed: {
        routeName() {
          return this.$route.name
        }
      }
    }
</script>
