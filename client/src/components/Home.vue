<template>
  <div id="home-div">
    <Header @change-language="onChangeLanguage"></Header>
    <Content :language="this.language"></Content>
    <Tiles></Tiles>
    <Info></Info>
  </div>
</template>

<script>
import InputService from '../services/InputService'
import Header from './Header.vue'
import Content from './Content.vue'
import Tiles from './Tiles.vue'
import Info from './Info.vue'

export default {
  name: 'Home',
  components: {Header, Content, Tiles, Info},
  data () {
    return {
      language: ''
    }
  },
  methods: {
    async doSomething () {
      const response = await InputService.sendInput()
      console.log(response.data.message)
    },
    onChangeLanguage (newLanguage) {
      this.language = newLanguage
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #F5F5F5;
}
:root {
  --lmu-green: #00883A;
  --lmu-gray: #232323;
  --lmu-light-gray: #F5F5F5;
}
</style>
