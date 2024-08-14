<template>
  <div>
    <Header @change-language="onChangeLanguage"></Header>
    <Content :language="this.language"></Content>
  </div>
</template>

<script>
import InputService from '../services/InputService'
import Header from './Header.vue'
import Content from './Content.vue'

export default {
  name: 'Home',
  components: {Header, Content},
  data () {
    return {
      language: ''
    }
  },
  methods: {
    async doSomething () {
      console.log('doSomething called!')
      const response = await InputService.sendInput()
      console.log(response.data.message)
    },
    onChangeLanguage (newLanguage) {
      this.language = newLanguage
    }
  }
}
</script>

<style scoped></style>
