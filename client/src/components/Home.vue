<template>
  <div>
    <Header></Header>
    <Content></Content>
  </div>
</template>

<script>
import InputService from '../services/InputService'
import Header from './Header.vue'
import Content from './Content.vue'

export default {
  name: 'Home',
  components: {Header, Content},
  methods: {
    async doSomething () {
      console.log('doSomething called!')
      const response = await InputService.sendInput()
      console.log(response.data.message)
    }
  }
}
</script>

<style scoped></style>
