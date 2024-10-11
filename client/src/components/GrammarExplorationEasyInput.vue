<template>
  <div class="multi-select-grid">
    <div class="row multi-select-heading">{{ inputHeading }}</div>
    <div class="scrollable-container">
      <div class="my-grid" id="buttonGrid">
        <div
          class="button"
          v-for="button in buttons"
          :key="button.id"
          :data-value="button.value"
          :class="{ selected: isSelected(button.label) }"
          @click="toggleSelect(button.label)"
        >
          {{ button.label }}
        </div>
      </div>
    </div>
    <div class="row row-3">
      <button
        class="start-button" @click="start()">{{ inputButtonText }}</button>
    </div>
    <Popup
      ref="popup"
      @popup-btn-1="handlePopupBtn1"
      @popup-btn-2="handlePopupBtn2"
    />
  </div>
</template>

<script>
import Popup from './Popup.vue'
export default {
  name: 'GrammarExplorationEasyInput',
  components: {Popup},
  data () {
    return {
      inputHeading: 'SELECT CORRECT WORDS',
      inputButtonText: 'SEND INPUT',
      buttons: [],
      selectedButtons: [],
      currentExerciseDepth: 1,
      isPopupVisible: false
    }
  },
  props: {
    nodeNamesByDepth: [],
    grammarValue: [],
    wordValue: '',
    gameState: false,
    language: ''
  },
  watch: {
    gameState () {
      if (this.gameState) this.generateButtons()
    },
    language () {
      this.onLanguageChange()
    }
  },
  methods: {
    toggleSelect (label) {
      const index = this.selectedButtons.indexOf(label)
      if (index === -1) {
        this.selectedButtons.push(label)
      } else {
        this.selectedButtons.splice(index, 1)
      }
    },
    isSelected (label) {
      return this.selectedButtons.includes(label)
    },
    isSelectionCorrect () {
      const correctWords = this.nodeNamesByDepth[this.currentExerciseDepth]
      if (correctWords.length !== this.selectedButtons.length) return false
      return correctWords.sort().every((value, index) => value === this.selectedButtons.sort()[index])
    },
    resetGameState () {
      this.$emit('game-state-change', 'grExpEasy')
      this.buttons = []
      this.selectedButtons = []
      this.currentExerciseDepth = 1
    },
    start () {
      if (!this.gameState) {
        this.$refs.popup.createOneBtnPopup(
          'There is no active Game running',
          'OK'
        )
      } else if (this.isSelectionCorrect()) {
        this.$emit('correct-input', 1)
        if (this.nodeNamesByDepth[this.currentExerciseDepth].includes(this.wordValue)) {
          this.$refs.popup.createOneBtnPopup(
            `Congratulations, you fully explored the grammar until finding the word '${this.wordValue}'!`,
            'OK'
          )
          this.resetGameState()
        } else {
          this.selectedButtons = []
          ++this.currentExerciseDepth
          this.generateButtons()
        }
      } else {
        this.$refs.popup.createTwoBtnPopup(
          `Your Selection was wrong! Try Again or Skip to the next Layer`,
          'Try Again',
          'Skip'
        )
      }
    },
    handlePopupBtn1 () {
      this.selectedButtons = []
    },
    handlePopupBtn2 () {
      this.selectedButtons = []
      ++this.currentExerciseDepth
      if (this.nodeNamesByDepth[this.currentExerciseDepth]) {
        this.generateButtons()
      } else {
        this.$refs.popup.createOneBtnPopup(
          `Congratulations, you fully explored the grammar until finding the word '${this.wordValue}'!`,
          'OK'
        )
        this.resetGameState()
      }
      this.$emit('correct-input', 1)
    },
    findMinMaxLength () {
      const nodeNames = this.nodeNamesByDepth[this.currentExerciseDepth]
      let minLength = this.wordValue.length
      let maxLength = 0
      nodeNames.forEach(name => {
        const length = name.length
        if (length < minLength) minLength = length
        if (length > maxLength) maxLength = length
      })
      return { minLength: minLength, maxLength: maxLength }
    },
    processGrammarValues () {
      const startSymbol = this.grammarValue[0]
      const alphabet = this.grammarValue[1]
      const variables = this.grammarValue[2]

      const alphabetArray = alphabet
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '')
      const variablesArray = variables
        .split(',')
        .map(item => item.trim())
        .filter(item => item !== '' && item !== startSymbol)

      const combinedArray = [...alphabetArray, ...variablesArray]
      return combinedArray
    },
    generateRandomStrings () {
      const numRandomWords = Math.max(Math.floor(this.nodeNamesByDepth[this.currentExerciseDepth].length / 2), 2)
      const chars = this.processGrammarValues()
      const { minLength, maxLength } = this.findMinMaxLength()
      const result = []
      const maxAttempts = 100
      let attempts = 0
      while (result.length < numRandomWords && attempts < maxAttempts) {
        const randomlength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength
        let randomString = ''

        for (let j = 0; j < randomlength; j++) {
          const randomIndex = Math.floor(Math.random() * chars.length)
          randomString += chars[randomIndex]
        }

        if (!this.nodeNamesByDepth[this.currentExerciseDepth].includes(randomString)) {
          result.push(randomString)
          attempts++
        }
      }
      return result
    },
    generateButtons () {
      const correctWords = this.nodeNamesByDepth[this.currentExerciseDepth]
      const randomWords = this.generateRandomStrings()

      this.buttons = []
      let idCounter = 1

      correctWords.forEach(word => {
        this.buttons.push({
          id: idCounter++,
          label: word,
          value: true
        })
      })

      randomWords.forEach(word => {
        this.buttons.push({
          id: idCounter++,
          label: word,
          value: false
        })
      })

      this.shuffleArray(this.buttons)
    },
    shuffleArray (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
    },
    onLanguageChange () {
      switch (this.language) {
        case 'EN':
          this.inputHeading = 'SELECT CORRECT WORDS'
          this.inputButtonText = 'SEND INPUT'
          break
        case 'DE':
          this.inputHeading = 'WÄHLE DIE KORREKTEN WÖRTER AUS'
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
.multi-select-heading {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--lmu-light-gray);
}
.multi-select-grid {
    display: grid;
    grid-template-rows: auto 1fr auto;
    align-items: center;
    justify-content: center;
    margin: 5px;
    background-color: var(--lmu-gray);
    border-radius: 3px;
    padding: 7px;
    max-width: 100%;
    max-height: 100%;
}

.scrollable-container {
    min-height: 100%;
    max-width: 100%;
    max-height: 100%;
    overflow-y: scroll;
    border-radius: 3px;
    background-color: var(--lmu-light-gray);
    padding: 3px;
}

.my-grid {
    position: relative;
    display: grid;
    gap: 5px;
    overflow: hidden;
    max-height: 100%;
}

.button {
    padding: 5px;
    border-radius: 5px;
    background-color: #c4c4c4;
    color: var(--lmu-gray);
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    transition: background-color 0.3s ease;
}

.button.selected {
    background-color: var(--lmu-green);
    color: white;
}

.start-button {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 3px;
    background-color: var(--lmu-green);
    color: var(--lmu-light-gray);
    font-size: large;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.start-button:hover {
    background-color: #218838;
}

.row-3 {
  margin-top: 6px;
}

</style>
