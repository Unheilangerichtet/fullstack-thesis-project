<template>
  <div>
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
    <div id="diagram-legend">
      <!-- <div></div> -->
      <svg class="legend-svg"><circle cx="15" cy="15" r="10" id="circle-1"></circle></svg>
      <div>nodes with children</div>
      <svg class="legend-svg"><circle cx="15" cy="15" r="10" id="circle-2"></circle></svg>
      <div>nodes with collapsed children</div>
      <svg class="legend-svg"><circle cx="15" cy="15" r="10" id="circle-3"></circle></svg>
      <div>nodes without children</div>
      <svg class="legend-svg"><circle cx="15" cy="15" r="10" id="circle-4"></circle></svg>
      <div>searched word</div>
    </div>
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
      circleIcon: require('../assets/icons/circle-icon.svg'),
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
  width: 39,15%;
  height: 600px;
  overflow:hidden;
}

#output-window {
  width: 60,85%;
}

#diagram-legend {
  display: flex;
  align-items: center;
  height: 30px;
  width: 100%;
  justify-content: flex-end;
  position: relative;
  margin-left: auto;
}

.legend-svg {
  width: 30px;
  height: 30px;
  margin-right: 2px;
}

#diagram-legend div {
  margin-right: 25px;
  line-height: 30px;
  color: #232323;
  font-size: 12px;
  font-weight: 600;
}

#circle-1 {
  fill: #232323;
}
#circle-2 {
  fill: #070087;
}
#circle-3 {
  fill: #870A00;
}
#circle-4 {
  fill: #00883A;
}
.legend-svg {
  width: 30px;
  height: 30px;
}
</style>
