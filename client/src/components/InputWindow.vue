<template>
  <div class="input-window-wrapper">
    <div class="input-window">
      <Grammar
        id="grammar-component"
        ref="grammarComponent"
        @solution-request="handleSolutionRequest"
        @grammar-and-word-validity="handleIsGrammarInputValid"
        :language="language"
      />
      <ExerciseSelector
        class="exercise-selector-component"
        @exercise-mode="enableExerciseInput"
        :isGrammarInputValid="isGrammarInputValid"
        :language="language"
      />
      <ControlPanel
        ref="controlPanel"
        class="grid-item control-panel-wrapper"
        @layer-change="handleLayerChange"
        :language="language"
      />
      <div
      class="input-placeholder"
      v-show="inputWindowState.isPlaceholderVisible"
      >
      Select a gamemode and a difficulty to start a game.
      </div>
      <GrammarExplorationDifficultInput
        class="grid-item grammar-exploration-difficult-component"
        ref="grExpDif"
        v-show="inputWindowState.isGrammarExplorationDifficultVisible"
        @correct-input="handleCorrectInput"
        @game-state-change="handleGameStateChange"
        :disabled=!isExerciseModeValid
        :language="language"
        :nodeNamesByDepth="nodeNamesByDepth"
        :gameState="gameState.grExpDif"
        :wordValue="wordValue"
      />
      <GrammarExplorationEasyInput
        class="grid-item grammar-exploration-easy-component"
        ref="grExpEasy"
        v-show="inputWindowState.isGrammarExplorationEasyVisible"
        @correct-input="handleCorrectInput"
        @game-state-change="handleGameStateChange"
        :language="language"
        :nodeNamesByDepth="nodeNamesByDepth"
        :grammarValue="grammarValue"
        :wordValue="wordValue"
        :gameState="gameState.grExpEasy"
      />
      <FindPathDifficultInput
        class="grid-item find-path-difficult-component"
        ref="findPathDif"
        v-show="inputWindowState.isFindPathDifficultVisible"
        @correct-input="handleCorrectInput"
        @game-state-change="handleGameStateChange"
        :language="language"
        :nodeNamesByDepth="nodeNamesByDepth"
        :pathToWord="pathToWord"
        :optimalAlternativePaths="optimalAlternativePaths"
        :notOptimalAlternativePaths="notOptimalAlternativePaths"
        :grammarValue="grammarValue"
        :wordValue="wordValue"
        :gameState="gameState.findPathDif"
      />
      <FindPathEasyInput
        class="grid-item find-path-easy-component"
        ref="findPathEasy"
        v-show="inputWindowState.isFindPathEasyVisible"
        @correct-input="handleCorrectInput"
        @game-state-change="handleGameStateChange"
        :language="language"
        :nodeNamesByDepth="nodeNamesByDepth"
        :pathToWord="pathToWord"
        :optimalAlternativePaths="optimalAlternativePaths"
        :notOptimalAlternativePaths="notOptimalAlternativePaths"
        :grammarValue="grammarValue"
        :wordValue="wordValue"
        :gameState="gameState.findPathEasy"
      />
      <div class="grid-item tutorial-button-box">
        <router-link
          :to="{ path: '/info', hash: '#info-section-7' }"
          custom
          v-slot="{ navigate }"
        >
          <button class="tutorial-button" @click="navigate">
            {{ tutorialButtonTxt }}
          </button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ControlPanel from './ControlPanel.vue'
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
      tutorialButtonTxt: 'GUIDE',
      isExerciseModeValid: false,
      exerciseMode: '',
      exerciseInput: '',
      currentExercisedepth: 1,
      isGrammarInputValid: false,
      grammarValue: [], // [startsymbolValue, alphabetValue, variablesValue, productionsValue]
      wordValue: '',
      nodeNamesByDepth: [],
      pathToWord: [],
      optimalAlternativePaths: [],
      notOptimalAlternativePaths: [],
      gameState: {
        grExpEasy: false,
        grExpDif: false,
        findPathEasy: false,
        findPathDif: false
      },
      inputWindowState: {
        isGrammarExplorationEasyVisible: false,
        isGrammarExplorationDifficultVisible: false,
        isFindPathEasyVisible: false,
        isFindPathDifficultVisible: false,
        isPlaceholderVisible: true
      }
    }
  },
  props: {
    language: String,
    exerciseData: {
      type: Object,
      reqired: false
    }
  },
  watch: {
    exerciseData () {
      this.nodeNamesByDepth = this.exerciseData.nodeNamesByDepth
      this.pathToWord = this.exerciseData.pathToWord
      this.optimalAlternativePaths = this.exerciseData.optimalAlternativePaths
      this.notOptimalAlternativePaths = this.exerciseData.notOptimalAlternativePaths
    }
  },
  computed: {
    isPlaceholderVisible () {
      return !(
        this.gameState.grExpDif ||
        this.gameState.grExpEasy ||
        this.gameState.findPathDif ||
        this.gameState.findPathEasy
      )
    }
  },
  methods: {
    handleGameStateChange (game) {
      switch (game) {
        case 'findPathDif':
          this.gameState.findPathDif = false
          this.inputWindowState.isFindPathDifficultVisible = false
          this.inputWindowState.isPlaceholderVisible = true
          break
        case 'findPathEasy':
          this.gameState.findPathEasy = false
          this.inputWindowState.isFindPathEasyVisible = false
          this.inputWindowState.isPlaceholderVisible = true
          break
        case 'grExpDif':
          this.gameState.grExpDif = false
          this.inputWindowState.isGrammarExplorationDifficultVisible = false
          this.inputWindowState.isPlaceholderVisible = true
          break
        case 'grExpEasy':
          this.gameState.grExpEasy = false
          this.inputWindowState.isGrammarExplorationEasyVisible = false
          this.inputWindowState.isPlaceholderVisible = true
          break
        default:
          console.log(`game-state-change on unknown game: ${game}`)
      }
    },
    handleCorrectInput (direction) {
      this.$refs.controlPanel.layerButtonsFunction(direction)
    },
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
      return set1.size === set2.size && [...set1].every(value => set2.has(value))
    },
    async enableExerciseInput (difficulty, gamemode) {
      await this.solutionFunction()
      const mode = `${gamemode}_${difficulty}`
      switch (mode) {
        case 'find-the-path_easy':
          this.inputWindowState = {
            isGrammarExplorationEasyVisible: false,
            isGrammarExplorationDifficultVisible: false,
            isFindPathEasyVisible: true,
            isFindPathDifficultVisible: false,
            isPlaceholderVisible: false
          }
          this.gameState = { findPathEasy: true, findPathDif: false, grExpEasy: false, grExpDif: false }
          break
        case 'find-the-path_difficult':
          this.inputWindowState = {
            isGrammarExplorationEasyVisible: false,
            isGrammarExplorationDifficultVisible: false,
            isFindPathEasyVisible: false,
            isFindPathDifficultVisible: true,
            isPlaceholderVisible: false
          }
          this.gameState = { findPathEasy: false, findPathDif: true, grExpEasy: false, grExpDif: false }
          break
        case 'grammar-exploration_easy':
          // this.$refs.grExpEasy.startNewGame() // Work in progress
          this.inputWindowState = {
            isGrammarExplorationEasyVisible: true,
            isGrammarExplorationDifficultVisible: false,
            isFindPathEasyVisible: false,
            isFindPathDifficultVisible: false,
            isPlaceholderVisible: false
          }
          this.gameState = { findPathEasy: false, findPathDif: false, grExpEasy: true, grExpDif: false }
          break
        case 'grammar-exploration_difficult':
          this.inputWindowState = {
            isGrammarExplorationEasyVisible: false,
            isGrammarExplorationDifficultVisible: true,
            isFindPathEasyVisible: false,
            isFindPathDifficultVisible: false,
            isPlaceholderVisible: false
          }
          this.gameState = { findPathEasy: false, findPathDif: false, grExpEasy: false, grExpDif: true }
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

    chooseExpGrammar () {
      this.toggleDropdown = !this.toggleDropdown
    },

    async solutionFunction () {
      try {
        // get Grammar & Word values form Grammar.vue component
        const grammar = this.$refs.grammarComponent
        const startsymbolValue = grammar.getStartsymbolValue()
        const alphabetValue = grammar.getAlphabetValue()
        const variablesValue = grammar.getVariableaValue()
        const productionsValue = grammar.getProductionsValue()
        const wordValue = grammar.getWordValue()

        this.grammarValue = [startsymbolValue, alphabetValue, variablesValue, productionsValue]
        this.wordValue = wordValue

        const result = await InputService.sendInput(productionsValue, startsymbolValue, wordValue)

        this.$emit('result-data', result, startsymbolValue)
        this.$emit('word', wordValue)
      } catch (error) {
        console.log('Error:', error)
      }
    },

    async handleSolutionRequest (variablesValue, alphabetValue, productionsValue, startsymbolValue, wordValue) {
      this.grammarValue = [startsymbolValue, alphabetValue, variablesValue, productionsValue]
      this.wordValue = wordValue
      try {
        const result = await InputService.sendInput(productionsValue, startsymbolValue, wordValue)
        const startsymbol = this.$refs.grammarComponent.getStartsymbolValue()
        this.$emit('result-data', result, startsymbol)
        this.$emit('word', wordValue)
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
.find-path-easy-component,
.input-placeholder {
  grid-area: 5 / 7 / 10 / -1;
}

.grid-item {
  padding: 5px;
}

.input-placeholder {
  display: flex;
  flex-direction: column;
  padding: 5px;
  background-color: var(--lmu-gray);
  border: 2px solid var(--lmu-gray);
  border-radius: 5px;
  margin: 5px;
  /* height: 100%; */
  justify-content: center;
  padding: 20px;
  color: var(--lmu-light-gray);
  font-size: 20px
}
</style>
