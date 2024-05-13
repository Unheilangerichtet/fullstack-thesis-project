<template>
  <div>
    <h1>Hello!</h1>
    <button @click="doSomething()">Click Me!</button>
  </div>
</template>

<script>
import InputService from '../services/InputService'
export default {
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
