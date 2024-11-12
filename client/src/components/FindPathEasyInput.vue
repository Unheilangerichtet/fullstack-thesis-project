<template>
  <div class="multi-select-grid">
    <div class="row multi-select-heading"> {{ inputHeading }}</div>
    <div class="scrollable-container">
      <div class="my-grid" id="buttonGrid">
        <div
          class="button"
          v-for="button in buttons"
          :key="button.label"
          :data-value="button.label"
          :class="{ selected: isSelected(button.label) }"
          @click="toggleSelect(button.label)"
        >
          {{ button.label }}
        </div>
      </div>
    </div>
    <div class="row row-3">
      <button
        class="start-button" @click="start">{{ inputBtnTxt }}</button>
    </div>
    <Popup
      ref="popup"
      @popup-btn-1="handlePopupBtn1"
      @popup-btn-2="handlePopupBtn2"
      @popup-btn-3="handlePopupBtn3"
    />
  </div>
</template>

<script>
import Popup from './Popup.vue'

export default {
  name: 'FindPathEasyInput',
  components: {Popup},
  data () {
    return {
      currentExercisedepth: 1,
      buttons: [],
      selectedButton: '',
      inputHeading: 'SELECT NEXT WORDS',
      inputBtnTxt: 'SEND INPUT'
    }
  },
  props: {
    language: '',
    wordValue: '',
    grammarValue: [],
    pathToWord: [],
    nodeNamesByDepth: [],
    optimalAlternativePaths: [],
    notOptimalAlternativePaths: [],
    gameState: false
  },
  watch: {
    nodeNamesByDepth () {
      this.currentExercisedepth = 1
      this.generateButtons()
    },
    language () {
      this.onLanguageChange()
    }
  },
  methods: {
    toggleSelect (label) {
      this.selectedButton = label
    },
    isSelected (label) {
      return this.selectedButton === label
    },
    resetGameState () {
      this.$emit('game-state-change', 'findPathEasy')
      this.buttons = []
      this.selectedButton = ''
      this.currentExercisedepth = 1
    },
    start () {
      if (!this.gameState) {
        this.$refs.popup.createOneBtnPopup(
          'There is no active Game running',
          'OK'
        )
      } else if (this.isInputCorrect()) {
        this.$emit('correct-input', 1)
        if (this.selectedButton === this.wordValue) {
          this.$refs.popup.createOneBtnPopup(
            `Congratulations, you found the path to '${this.wordValue}'!`,
            'OK'
          )
        } else {
          this.selectedButton = ''
          this.currentExercisedepth++
          this.generateButtons()
        }
      } else if (this.isSelectionNotOptimal()) {
        this.$refs.popup.createTwoBtnPopup(
          `Your Input was wrong! \n '${this.selectedButton}' is not on an optimal Path to '${this.wordValue}'`,
          'Try Again',
          'Skip'
        )
      } else {
        this.$refs.popup.createTwoBtnPopup(
          'Your Input was wrong!',
          'Try Again',
          'Skip'
        )
      }
    },
    handlePopupBtn1 () {
      this.selectedButton = ''
    },
    handlePopupBtn2 () {
      this.$emit('correct-input', 1)
      this.selectedButton = ''
      this.currentExercisedepth++
      if (this.nodeNamesByDepth[this.currentExercisedepth]) {
        this.generateButtons()
      } else {
        this.$refs.popup.createOneBtnPopup(
          `Congratulations, you found the path to the word '${this.wordValue}'!`,
          'OK'
        )
        this.resetGameState()
      }
    },
    handlePopupBtn3 () {
      this.resetGameState()
    },
    generateButtons () {
      const selection = this.nodeNamesByDepth[this.currentExercisedepth]
      this.buttons = []
      selection.forEach(word => {
        if (!this.hasDuplicateSuffix(word)) {
          if (word === this.wordValue) {
            this.buttons.push({
              label: word,
              value: true
            })
          } else {
            this.buttons.push({
              label: word,
              value: false
            })
          }
        }
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
          this.inputHeading = 'SELECT NEXT WORDS'
          this.inputBtnTxt = 'SEND INPUT'
          break
        case 'DE':
          this.inputHeading = 'WÄHLE NÄCHSTES WORT AUS'
          this.inputBtnTxt = 'INPUT SENDEN'
          break
        default:
          console.log('unknown language!')
      }
    },

    isInputCorrect () {
      if (this.selectedButton === this.pathToWord[this.currentExercisedepth]) {
        return true
      }
      for (const optAltPath of this.optimalAlternativePaths) {
        if (optAltPath[this.currentExercisedepth] !== undefined) {
          const baseName = this.getBaseName(optAltPath[this.currentExercisedepth])
          if (this.selectedButton === baseName) {
            return true
          }
        }
      }
      return false
    },

    isSelectionNotOptimal () {
      for (const notOptAltPath of this.notOptimalAlternativePaths) {
        const baseName = this.getBaseName(notOptAltPath[this.currentExercisedepth])
        if (this.selectedButton === baseName) {
          return true
        }
      }
      return false
    },

    getBaseName (name) {
      return name.replace(/\s*\(duplicate(\s*\d+)?\)$/, '').trim()
    },

    hasDuplicateSuffix (name) {
      return /\(duplicate(\s*\d+)?\)$/.test(name)
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
    /* padding: 10px 20px; */
    width: 100%;
    height: 100%;
    /* margin: 5px; */
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
