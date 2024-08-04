<template>
  <div class="content-window">
    <InputWindow id="input-window" @result-data="handleDataSend"/>
    <OutputWindow id="output-window" :receivedData="dataFromInput"/>
  </div>
</template>

<script>
import InputWindow from './InputWindow.vue'
import OutputWindow from './OutputWindow.vue'

export default {
  name: 'Content',
  components: {InputWindow, OutputWindow},
  data () {
    return {
      dataFromInput: ''
    }
  },
  methods: {
    handleDataSend (data) {
      console.log('Content.vue has recieved data')
      this.dataFromInput = data
    }
  }
}
</script>

<style>
.content-window {
  display: flex;
  width: 100%;
  height: 600px;
}

#input-window {
  width: 40%;
}

#output-window {
  width: 60%;
}
</style>
