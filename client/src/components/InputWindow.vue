<template>
  <div class="input-window-wrapper">
    <div class="input-window">
      <Grammar
        id="grammar-component"
        @solution-request="handleSolutionRequest"
        @grammar-and-word-validity="handleIsGrammarInputValid"
        :language="language"
      >
      </Grammar>
      <ExerciseSelector
        class="exercise-selector-component"
        @exercise-mode="enableExerciseInput"
        :isGrammarInputValid="isGrammarInputValid"
        :language="language"
      >
      </ExerciseSelector>
      <ControlPanel
        ref="controlPanel"
        class="grid-item control-panel-wrapper"
        @layer-change="handleLayerChange"
        :language="language"
      >
      </ControlPanel>
      <GrammarExplorationDifficultInput
        class="grid-item grammar-exploration-difficult-component"
        v-show="showGrammarExplorationDifficultInput"
        :disabled=!isExerciseModeValid
        :language="language"
      >
      </GrammarExplorationDifficultInput>
      <GrammarExplorationEasyInput
        class="grid-item grammar-exploration-easy-component"
        v-show="showGrammarExplorationEasyInput"
        :language="language"
      >
      </GrammarExplorationEasyInput>
      <FindPathDifficultInput
        class="grid-item find-path-difficult-component"
        v-show="showFindPathDifficultInput"
        :language="language"
      >
      </FindPathDifficultInput>
      <FindPathEasyInput
        class="grid-item find-path-easy-component"
        v-show="showFindPathEasyInput"
        :language="language"
      >
      </FindPathEasyInput>
      <div class="grid-item tutorial-button-box">
        <button class="tutorial-button">{{ tutorialButtonTxt }}</button>
      </div>
    </div>
  </div>
</template>

<script>
import ControlPanel from './ControlPanel.vue'
import CalculationService from '../services/CalculationService'
import InputService from '../services/InputService'
import ExerciseSelector from './ExerciseSelector.vue'
import GrammarExplorationEasyInput from './GrammarExplorationEasyInput.vue'
import GrammarExplorationDifficultInput from './GrammarExplorationDifficultInput.vue'
import FindPathDifficultInput from './FindPathDifficultInput.vue'
import FindPathEasyInput from './FindPathEasyInput.vue'
import Grammar from './Grammar.vue'

export default {
  name: 'InputWindow',
  components: {
    ControlPanel,
    ExerciseSelector,
    GrammarExplorationEasyInput,
    GrammarExplorationDifficultInput,
    FindPathDifficultInput,
    FindPathEasyInput,
    Grammar
  },
  data () {
    return {
      showExerciseInputBox: true,
      toggleDropdown: false,
      grammarValue: '',
      startsymbolValue: '',
      alphabetValue: '',
      variablesValue: '',
      productionsValue: '',
      wordValue: '',
      tutorialButtonTxt: 'TUTORIAL',
      excerciseInputBoxHeading: 'EXERCISE INPUT',
      inputButtonText: 'SEND INPUT',
      isExerciseModeValid: false,
      exerciseMode: '',
      exerciseInput: '',
      currentExercisedepth: 1,
      showGrammarExplorationEasyInput: false,
      showGrammarExplorationDifficultInput: true,
      showFindPathDifficultInput: false,
      showFindPathEasyInput: false,
      isGrammarInputValid: Boolean
    }
  },
  props: {
    language: String,
    nodeNamesByDepth: []
  },
  watch: {
    language () {
      this.onLanguageChange()
    },
    nodeNamesByDepth () {
      console.log('nodeNamesByDepth were recieved in the Input Window!', this.nodeNamesByDepth)
    }
  },
  computed: {
  },
  methods: {
    handleIsGrammarInputValid (validity) {
      this.isGrammarInputValid = validity
    },
    sendExerciseInput () {
      if (this.exerciseMode === 'free-tree') {
        this.freeTreeExercise()
      }
    },
    freeTreeExercise () {
      let depth = this.currentExercisedepth
      const resultIsCorrect = this.isInputCorrect(this.exerciseInput, this.nodeNamesByDepth[depth])
      if (resultIsCorrect) {
        this.$refs.controlPanel.layerButtonsFunction(1)
      } else {
        alert('the input was wrong')
      }
      ++this.currentExercisedepth
    },
    isInputCorrect (str1, array2) {
      const array1 = str1.split(',').map(word => word.trim())
      const set1 = new Set(array1)
      const set2 = new Set(array2.map(word => word.trim()))
      console.log('Set1: Input Set', Array.from(set1))
      console.log('Set2: Solution Set', Array.from(set2))
      return set1.size === set2.size && [...set1].every(value => set2.has(value))
    },
    async enableExerciseInput (difficulty, gamemode) {
      await this.solutionFunction()
      const mode = `${gamemode}_${difficulty}`
      switch (mode) {
        case 'find-the-path_easy':
          this.showGrammarExplorationEasyInput = false
          this.showGrammarExplorationDifficultInput = false
          this.showFindPathEasyInput = true
          this.showFindPathDifficultInput = false
          break
        case 'find-the-path_difficult':
          this.showGrammarExplorationEasyInput = false
          this.showGrammarExplorationDifficultInput = false
          this.showFindPathEasyInput = false
          this.showFindPathDifficultInput = true
          break
        case 'grammar-exploration_easy':
          this.showGrammarExplorationEasyInput = true
          this.showGrammarExplorationDifficultInput = false
          this.showFindPathEasyInput = false
          this.showFindPathDifficultInput = false
          break
        case 'grammar-exploration_difficult':
          this.showGrammarExplorationEasyInput = false
          this.showGrammarExplorationDifficultInput = true
          this.showFindPathEasyInput = false
          this.showFindPathDifficultInput = false
          break
        default:
          console.log('unknown exercise mode:', mode)
      }
      this.exerciseMode = mode
      this.isExerciseModeValid = true
      this.$emit('exercise-mode', mode)
    },
    handleLayerChange (direction) {
      this.$emit('layer-change', direction)
    },

    onLanguageChange () {
      switch (this.language) {
        case 'DE':
          this.excerciseInputBoxHeading = 'ÜBUNG EINGABE'
          this.inputButtonText = 'EINGABE SENDEN'
          break
        case 'EN':
          this.excerciseInputBoxHeading = 'EXERCISE INPUT'
          this.inputButtonText = 'SEND INPUT'
          break
      }
    },

    chooseExpGrammar () {
      this.toggleDropdown = !this.toggleDropdown
    },

    async solutionFunction () {
      try {
        CalculationService.isInputValid(this.variablesValue, this.alphabetValue, this.productionsValue, this.startsymbolValue, this.wordValue)
        const result = await InputService.sendInput(this.productionsValue, this.startsymbolValue, this.wordValue)
        this.$emit('result-data', result)
        this.$emit('word', this.wordValue)
        console.log('result:', result)
      } catch (error) {
        console.log('Error:', error)
      }
    },

    async handleSolutionRequest (variablesValue, alphabetValue, productionsValue, startsymbolValue, wordValue) {
      try {
        CalculationService.isInputValid(variablesValue, alphabetValue, productionsValue, startsymbolValue, wordValue)
        const result = await InputService.sendInput(productionsValue, startsymbolValue, wordValue)
        this.$emit('result-data', result)
        this.$emit('word', wordValue)
        console.log('result:', result)
      } catch (error) {
        console.log('Error:', error)
      }
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  font-size: medium;
  color: white;
}
textarea {
  font-size: 15px;
}
a {
  cursor: pointer;
}
div {
  cursor: default;
}
textarea {
  outline: none;
  resize: none;
  color: black;
  flex-grow: 1;
}

.tutorial-button-box {
  width: 100%;
  height: 100%;
}

.tutorial-button{
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
}

.tutorial-button{
  background-color: var(--lmu-gray);
  border: 2px solid var(--lmu-gray);
  border-radius: 3px;
  font-weight: bold;
}

.tutorial-button:hover {
  background-color: var(--lmu-light-gray);
  color: var(--lmu-gray);
  transition: all 0.2s;
}

.tutorial-button:active{
  transform: translateY(4px);
  font-size: medium;
  transition: all 0.2s;
}

.input-window-wrapper {
  font-weight: bold;
  display: flex;
  flex-direction: column;

  width: 40%;
  border-radius: 3px;
  background-color: var(--lmu-light-gray);
}

.input-window {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  position: relative;
  padding: 5px;
  height: 100%;
}

.exercise-selector-component {
  padding: 5xp;
  grid-area: 1 / 7 / 5 / -1;
}

#grammar-component {
  grid-area: 1 / 1 / 9 / 7;
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
  height: 100%;
}

.tutorial-button-box {
  grid-area: 10 / 7 / -1 / -1;
}

.control-panel-wrapper {
  grid-area: 9 / 1 / -1 / 7;
}

.grammar-exploration-difficult-component,
.grammar-exploration-easy-component,
.find-path-difficult-component,
.find-path-easy-component {
  grid-area: 5 / 7 / 10 / -1;
}

.grid-item {
  padding: 5px;
}
</style>
