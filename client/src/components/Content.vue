<template>
  <div>
    <div class="content-window">
      <InputWindow
        id="input-window"
        @word="handleWordSend"
        @result-data="handleDataSend"
        @layer-change="handleLayerChange"
        @exercise-mode="handleExerciseMode"
        :language="language"
        :exerciseData="exerciseData"
        />
      <OutputWindow
        ref="outputWindow"
        id="output-window"
        :receivedWord="wordFromInput"
        :receivedData="dataFromInput"
        :exerciseMode="exerciseMode"
        :startsymbol="startsymbol"
        @node-names-by-depth="handleNodeNamesByDepth"
        @exercise-data="handleExerciseData"
      />
    </div>
    <div id="diagram-legend">
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
      dataFromInput: {
        type: Object,
        required: false
      },
      wordFromInput: '',
      startsymbol: '',
      layerChange: 0,
      exerciseMode: '',
      nodeNamesByDepth: [],
      exerciseData: {
        type: Object,
        required: false
      }
    }
  },
  props: {
    language: String
  },
  methods: {
    handleExerciseData (exerciseData) {
      this.exerciseData = exerciseData
    },
    handleNodeNamesByDepth (nodeNamesByDepth) {
      this.nodeNamesByDepth = nodeNamesByDepth
    },
    handleDataSend (data, startsymbol) {
      this.dataFromInput = data
      this.startsymbol = startsymbol
      console.log('Content.vue: this.startsymbol', this.startsymbol)
    },
    handleWordSend (word) {
      this.wordFromInput = word
    },
    handleLayerChange (direction) {
      this.$refs.outputWindow.handleLayerChange(direction)
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
