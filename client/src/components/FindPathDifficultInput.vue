<template>
  <div>
    <div class="extra-box">
      <div class="excercise-input-box-heading">{{ inputHeading }}</div>
        <textarea
          type="text"
          id="exercise-input"
          v-model="exerciseInput"
          name="exercise input"
          :placeholder="placeholderTxt"
        ></textarea>
        <div class="send-input-button-box">
          <button class="send-input-button" @click="sendExerciseInput()">
            {{ inputBtnTet }}
          </button>
        </div>
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
  name: 'FindPathDifficultInput',
  components: {Popup},
  data () {
    return {
      inputHeading: 'WRITE NEXT WORD',
      inputBtnTet: 'SEND INPUT',
      isExerciseModeValid: false,
      exerciseInput: '',
      currentExerciseDepth: 1,
      placeholderTxt: `Enter the next word on the path to the searched word`,
      placeholderTxtGerman: `Gib das nächste Wort auf dem Weg zum gesuchten Wort ein`
    }
  },
  props: {
    language: '',
    wordValue: '',
    grammarValue: [],
    pathToWord: [],
    nodeNamesByDepth: [],
    gameState: false
  },
  watch: {
    language () {
      this.onLanguageChange()
    }
  },
  methods: {
    newGame () {
      this.exerciseInput = ''
      this.currentExerciseDepth = 1
    },
    resetGameState () {
      this.$emit('game-state-change', 'findPathDif')
      this.exerciseInput = ''
      this.currentExerciseDepth = 1
    },
    sendExerciseInput () {
      if (!this.gameState) {
        this.$refs.popup.createOneBtnPopup(
          'There is no active Game running',
          'OK'
        )
      } else if (this.isInputCorrect()) {
        this.$emit('correct-input', 1)
        this.exerciseInput = ''
        ++this.currentExerciseDepth
        if (this.exerciseInput === this.wordValue) {
          this.$refs.popup.createOneBtnPopup(
            `Congratulations, you found the path to '${this.wordValue}'!`,
            'OK'
          )
          this.resetGameState()
        }
      } else {
        this.$refs.popup.createTwoBtnPopup(
          'Your Input was wrong!',
          'Try Again',
          'Skip'
        )
      }
    },
    isInputCorrect () {
      return (this.exerciseInput === this.pathToWord[this.currentExerciseDepth])
    },
    handlePopupBtn1 () {
      this.exerciseInput = ''
    },
    handlePopupBtn2 () {
      this.exerciseInput = ''
      ++this.currentExerciseDepth
      if (!this.pathToWord[this.currentExerciseDepth]) {
        this.$refs.popup.createOneBtnPopup(
          `Congratulations, you found the path to '${this.wordValue}'!`,
          'OK'
        )
        this.resetGameState()
      }
      this.$emit('correct-input', 1)
    },
    onLanguageChange () {
      switch (this.language) {
        case 'EN':
          this.inputHeading = 'WRITE NEXT WORD'
          this.inputBtnTxt = 'SEND INPUT'
          this.placeholderTxt = 'Enter the next sentinalform on the path to the searched word'
          break
        case 'DE':
          this.inputHeading = 'SCHREIBE DAS NÄCHSTE WORT AUF DEM PFAD'
          this.inputBtnTxt = 'INPUT SENDEN'
          this.placeholderTxt = 'Gib das nächste Satzform auf dem Weg zum gesuchten Wort ein'
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
