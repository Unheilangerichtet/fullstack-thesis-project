<template>
  <div class="content-window">
    <InputWindow
      id="input-window"
      @word="handleWordSend"
      @result-data="handleDataSend"
      @layer-change="handleLayerChange"
      @exercise-mode="handleExerciseMode"
      :language="this.language"
      :node-names-by-depth="this.nodeNamesByDepth"/>
    <OutputWindow
      ref="outputWindow"
      id="output-window"
      :receivedWord="wordFromInput"
      :receivedData="dataFromInput"
      :exerciseMode="exerciseMode"
      @node-names-by-depth="handleNodeNamesByDepth"/>
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
      layerChange: 0,
      exerciseMode: '',
      nodeNamesByDepth: []
    }
  },
  props: {
    language: String
  },
  methods: {
    handleNodeNamesByDepth (nodeNamesByDepth) {
      this.nodeNamesByDepth = nodeNamesByDepth
    },
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
    },
    handleExerciseMode (mode) {
      this.exerciseMode = mode
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
