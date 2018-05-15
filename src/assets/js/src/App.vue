<template>
  <div id="stwidgxx988exxxxt6109" draggable="false">
    <MainContent :toggled.sync="toggled" @widgetMoved="widgetMoving = true" @stoppedMoving="widgetMoving = false" @close="close"/>
    <Toggle :isToggled.sync="toggled" @toggled="toggle" :widgetMoved="widgetMoving"/>
  </div>
</template>

<script>
import MainContent from './components/content/content.vue'
import Toggle from './components/toggle.vue'
import Test from './components/test.vue'

export default {
  name: 'app',
  data () {
    return {
      toggled: false,
      widgetMoving: false,
    }
  },
  components: {
    MainContent,
    Toggle,
    Test,
  },
  mounted () {
  },
  methods: {
    toggle () {
      this.toggled = !this.toggled;
    },
    close () {
      this.toggled = false;
    },
  }
}
</script>

<style>
@import "./style/styles.css";
@import "./style/media.css";
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
