<template>
  <div class="multi-select-grid">
    <div class="row multi-select-heading">SELECT CORRECT WORDS</div>
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
        class="start-button" @click="start">SEND INPUT</button>
    </div>

    <!-- Overlay -->
    <div v-if="isPopupVisible" class="overlay" @click="closePopup"></div>
    <!-- Pop-up Window -->
    <div v-if="isPopupVisible" class="popup">
      <p class="popup-message">Your input was incorrect. Please try again or skip.</p>
      <div class="popup-buttons">
        <button class="popup-btn try-again" @click="tryAgain">Try Again</button>
        <button class="popup-btn skip" @click="skip">Skip</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttons: [],
      selectedButtons: [],
      multiSelectHeading: 'SELECT CORRECT WORDS',
      currentExercisedepth: 1,
      isPopupVisible: false
    }
  },
  props: {
    nodeNamesByDepth: {
      type: Array,
      required: false
    },
    grammarValue: {
      type: Array, // [startsymbolValue, alphabetValue, variablesValue, productionsValue]
      required: false
    },
    wordValue: {
      type: String,
      required: false
    }
  },
  watch: {
    grammarValue () {
      console.log('grammarValue in GEE:', this.grammarValue)
    },
    nodeNamesByDepth () {
      this.generateButtons()
      console.log('nodeNamesByDepth in GrExpEasy!')
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
      const correctWords = this.nodeNamesByDepth[this.currentExercisedepth]
      if (correctWords.length !== this.selectedButtons.length) return false
      return correctWords.sort().every((value, index) => value === this.selectedButtons.sort()[index])
    },
    start () {
      const result = this.isSelectionCorrect()
      if (result) {
        this.$emit('correct-input', 1)
        this.selectedButtons = []
        this.currentExercisedepth++
        this.generateButtons()
      } else {
        this.openPopup()
      }
      // alert(`You selected: ${this.selectedButtons.join(', ')} \n your selection is ${result}`)
    },
    findMinMaxLength () {
      const nodeNames = this.nodeNamesByDepth[this.currentExercisedepth]
      let minLength = this.wordValue.length
      let maxLength = 0
      nodeNames.forEach(name => {
        const length = name.length
        if (length < minLength) minLength = length
        if (length > maxLength) maxLength = length
      })
      console.log('minLength, maxLength', minLength, maxLength)
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
      const numRandomWords = Math.max(Math.floor(this.nodeNamesByDepth[this.currentExercisedepth].length / 2), 2)
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

        if (!this.nodeNamesByDepth[this.currentExercisedepth].includes(randomString)) {
          result.push(randomString)
          attempts++
        }
      }
      return result
    },
    generateButtons () {
      const correctWords = this.nodeNamesByDepth[this.currentExercisedepth]
      console.log('correctWords:', correctWords)
      const randomWords = this.generateRandomStrings()
      console.log('randomWords', randomWords)

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
    openPopup () {
      this.isPopupVisible = true
    },
    closePopup () {
      this.isPopupVisible = false
    },
    tryAgain () {
      this.selectedButtons = []
      this.generateButtons()
      // alert('You chose to try again!')
      this.closePopup()
    },
    skip () {
      this.$emit('correct-input', 1)
      this.selectedButtons = []
      this.currentExercisedepth++
      this.generateButtons()
      // alert('You chose to skip!')
      this.closePopup()
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
    max-width: 100%; /* Fixed width for the scrollable area */
    max-height: 100%; /* Fixed height to restrict space */
    overflow-y: scroll; /* Enable vertical scrolling */
    border: 2px solid  var(--lmu-gray);
    border-radius: 3px;
    background-color: var(--lmu-light-gray); /* Container background color */
    padding: 3px;
}

.my-grid {
    position: relative;
    display: grid;
    /* grid-template-columns: repeat(2, 100%); */
    gap: 5px;
    overflow: hidden;
    max-height: 100%;
}

.button {
    padding: 5px;
    border: 2px solid  var(--lmu-gray);
    border-radius: 5px;
    background-color: #ccc;
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

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Pop-up Container */
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border: 2px solid #ccc;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  opacity: 0;
  animation: fadeIn 0.3s forwards;
}

/* Animation for fade-in effect */
@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

/* Pop-up Message */
.popup-message {
  font-size: 16px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

/* Pop-up Buttons */
.popup-buttons {
  display: flex;
  justify-content: space-around;
}

.popup-btn {
  width: 100px;
  padding: 10px;
  font-size: 14px;
  cursor: pointer;
  border: none;
  background-color: #333;
  color: white;
  transition: background-color 0.2s ease;
}

/* Try Again Button */
.popup-btn.try-again {
  background-color: #4CAF50; /* Green for try again */
}

.popup-btn.try-again:hover {
  background-color: #45a049;
}

/* Skip Button */
.popup-btn.skip {
  background-color: #f44336; /* Red for skip */
}

.popup-btn.skip:hover {
  background-color: #e53935;
}

</style>
