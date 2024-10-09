<template>
  <div>
    <div class="extra-box">
      <div class="excercise-input-box-heading">{{ excerciseInputBoxHeading }}</div>
        <textarea
          type="text"
          id="exercise-input"
          v-model="exerciseInput"
          name="exercise input"
          placeholder="Enter words that are reachable with one production"
        ></textarea>
        <div class="send-input-button-box">
          <button class="send-input-button" @click="sendExerciseInput()">
            {{ inputButtonText }}
          </button>
        </div>
        <Popup
          ref="popup"
          @popup-btn-1="handlePopupBtn1"
          @popup-btn-2="handlePopupBtn2"
        />
    </div>
  </div>
</template>

<script>
import Popup from './Popup.vue'

export default {
  name: 'GrammarExplorationDifficultInput',
  components: {Popup},
  data () {
    return {
      excerciseInputBoxHeading: 'WORDS OF NEXT LAYER',
      inputButtonText: 'SEND INPUT',
      exerciseInput: '',
      isExerciseModeValid: false,
      currentExerciseDepth: 1,
      popup: this.$refs.popup
    }
  },
  props: {
    nodeNamesByDepth: [],
    language: '',
    wordValue: '',
    gameState: false
  },
  watch: {
    language () {
      this.onLanguageChange()
    }
  },
  methods: {
    resetGameState () {
      this.$emit('game-state-change', 'grExpDif')
      this.exerciseInput = ''
      this.currentExerciseDepth = 1
    },
    sendExerciseInput () {
      let depth = this.currentExerciseDepth
      if (!this.gameState) {
        this.$refs.popup.createOneBtnPopup(
          'There is no active Game running',
          'OK'
        )
      } else if (this.isInputCorrect()) {
        this.$emit('correct-input', 1)
        ++this.currentExerciseDepth
        if (this.nodeNamesByDepth[depth].includes(this.wordValue)) {
          this.$refs.popup.createOneBtnPopup(
            `Congratulations, you fully explored the grammar until finding the word '${this.wordValue}'!`,
            'OK'
          )
          this.resetGameState()
        }
      } else {
        this.$refs.popup.createTwoBtnPopup(
          `Your Input was wrong! Try Again or Skip to the next Layer`,
          'Try Again',
          'Skip'
        )
      }
    },
    isInputCorrect () {
      const input = this.exerciseInput
      const solution = this.nodeNamesByDepth[this.currentExerciseDepth]
      const inputArray = input.split(',').map(word => word.trim())
      const inputSet = new Set(inputArray)
      const solutionSet = new Set(solution.map(word => word.trim()))
      return inputSet.size === solutionSet.size && [...inputSet].every(value => solutionSet.has(value))
    },
    handlePopupBtn1 () {
      document.getElementById('exercise-input').value = ''
    },
    handlePopupBtn2 () {
      document.getElementById('exercise-input').value = ''
      ++this.currentExerciseDepth
      this.$emit('correct-input', 1)
    },
    onLanguageChange () {
      switch (this.language) {
        case 'EN':
          this.excerciseInputBoxHeading = 'WORDS OF NEXT LAYER'
          this.inputButtonText = 'SEND INPUT'
          break
        case 'DE':
          this.excerciseInputBoxHeading = 'WÖRTER DER NÄCHSTEN SCHICHT'
          this.inputButtonText = 'INPUT SENDEN'
          break
        default:
          console.log('unknown language!')
      }
    }
  }
}
</script>

<style scoped>

.extra-box{
  display: flex;
  flex-direction: column;
  padding: 5px;
  background-color: var(--lmu-green);
  border: 2px solid var(--lmu-green);
  border-radius: 3px;
  height: 100%;
}

.excercise-input-box-heading{
  padding: 5px 5px;
  font-size: medium;
}

.send-input-button {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: var(--lmu-gray);
  border: 2px solid var(--lmu-gray);
  border-radius: 3px;
  font-weight: bold;
}

.send-input-button:hover {
  background-color: var(--lmu-light-gray);
  color: var(--lmu-green);
  transition: all 0.2s;
}

.send-input-button:hover {
  background-color: var(--lmu-light-gray);
  color: var(--lmu-gray);
  transition: all 0.2s;
}

.send-input-button:active {
  transform: translateY(4px);
  font-size: medium;
  transition: all 0.2s;
}

</style>
