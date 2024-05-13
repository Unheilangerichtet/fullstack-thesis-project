<template>
  <button @click="sendInput2">Send Grammar</button>
</template>

<script>
// import InputService from '@/services/InputService';
// import axios from 'axios';

export default {
  data () {}
  // methods: {
  //   async sendInput() {
  //     try {
  //       const response = await InputService.sendInput({
  //         grammar: 'this is a grammar: G=({A,B}, {a,b}, P, S)',
  //         word: 'this is a word: w=abc',
  //       });
  //       console.log('response: ', response);
  //     } catch (error) {
  //       this.error = error.response.data.error;
  //     }
  //   },
  //   async sendInput2() {
  //     const response = await axios.get('http://localhost:8081/login');
  //     console.log(response);
  //   },
  // },
  // onMounted() {
  //   this.sendInput2();
  // },
}
</script>

<style></style>
