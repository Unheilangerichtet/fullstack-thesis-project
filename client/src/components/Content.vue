<template>
  <div class="content-window">
    <InputWindow id="input-window" @word="handleWordSend" @result-data="handleDataSend" @layer-change="handleLayerChange" :language="this.language"/>
    <OutputWindow ref="outputWindow" id="output-window" :receivedWord="wordFromInput" :receivedData="dataFromInput"/>
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
      dataFromInput: '',
      wordFromInput: '',
      layerChange: 0
    }
  },
  props: {
    language: String
  },
  methods: {
    handleDataSend (data) {
      console.log('Content.vue has recieved data')
      this.dataFromInput = data
    },
    handleWordSend (word) {
      console.log('Content.vue has recieved word')
      this.wordFromInput = word
    },
    handleLayerChange (direction) {
      this.$refs.outputWindow.handleLayerChange(direction)
      console.log('handleLayerChange in Content.vue activated')
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
