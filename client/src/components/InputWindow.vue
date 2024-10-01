<template>
  <div class="input-window-wrapper">
    <div class="input-window-heading">{{inputTxt}}</div>
    <div class="input-window">
      <div class="grid-item exp-grammars-box">
        <div class="dropdown">
          <button class="exp-grammar-button" @click="chooseExpGrammar()">{{ expGrammarTxt }}</button>
          <div class="dropdown-content" v-if="toggleDropdown">
            <a @click="fillExp(1)">{{ expGrammar1txt }}</a>
            <a @click="fillExp(2)">{{ expGrammar2txt }}</a>
            <a @click="fillExp(3)">{{ expGrammar3txt }}</a>
            <a @click="fillExp(4)">{{ expGrammar4txt }}</a>
            <a @click="fillExp(5)">{{ expGrammar5txt }}</a>
            <a @click="fillExp(6)">{{ expGrammar6txt }}</a>
          </div>
        </div>
      </div>
      <div class="grid-item grammar-box-wrapper">
        <div class="grammar-box">
          <div class="textarea-header"> {{ startsymbolTextareaHeader }}</div>
          <textarea
            v-model="startsymbolValue"
            type="text"
            id="startsymbol"
            name="startsymbol"
            placeholder="Enter Startsymbol, for exp. S..."
          ></textarea>
          <div class="textarea-header"> {{ alphabetTextareaHeader }}</div>
          <textarea
            v-model="alphabetValue"
            type="text"
            id="alphabet"
            name="alphabet"
            placeholder="Enter Alphabet / Terminal Symbols..."
          ></textarea>
          <div class="textarea-header"> {{ variablesTextareaHeader }}</div>
          <textarea
            v-model="variablesValue"
            type="text"
            id="variables"
            name="variables"
            placeholder="Enter Variables / Nonterminal Symbols..."
          ></textarea>
          <div class="textarea-header"> {{ productionsTextareaHeader }}</div>
          <textarea
            v-model="productionsValue"
            type="text"
            id="productions"
            name="productions"
            placeholder="Enter Productions, for exp. S->A,A->B..."
          ></textarea>
          <div class="textarea-header"> {{ wordTextareaHeader }}</div>
          <textarea
            v-model="wordValue"
            type="text"
            id="word"
            name="word"
            placeholder="Enter word, for exp. 'abc'..."
          ></textarea>
        </div>
      </div>
      <div class="grid-item solution-box">
        <button @click="solutionFunction()" class="solution-button" :disabled="isSolutionButtonDisabled" title="input grammar & word first">
          {{ solutionButtonTxt }}
        </button>
      </div>
      <div class="grid-item info-button-1-box">
        <button class="info-button-1">{{ infoButton1Txt }}</button>
      </div>
      <div class="grid-item info-button-2-box">
        <button class="info-button-2">{{ infoButton2Txt }}</button>
      </div>
      <ExerciseSelector class="exercise-selector-component" :isInputValid="this.isInputValid" @exercise-mode="enableExerciseInput"></ExerciseSelector>
      <ControlPanel ref="controlPanel" class="control-panel-wrapper" @layer-change="handleLayerChange"></ControlPanel>
      <div class="grid-item extra-box-wrapper" v-show="showExerciseInputBox" :disabled=!isExerciseModeValid>
        <div class="extra-box" :class="{disabled: !this.isExerciseModeValid}">
          <div class="excercise-input-box-heading" :disabled=!isExerciseModeValid>{{ excerciseInputBoxHeading }}</div>
          <textarea
            type="text"
            id="exercise-input"
            v-model="exerciseInput"
            name="exercise input"
            placeholder="Enter words that are reachable with one production"
            :disabled=!isExerciseModeValid
          ></textarea>
          <div class="send-input-button-box">
            <button class="send-input-button" @click="sendExerciseInput()" :disabled=!isExerciseModeValid>
              {{ inputButtonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ControlPanel from './ControlPanel.vue'
import CalculationService from '../services/CalculationService'
import InputService from '../services/InputService'
import ExerciseSelector from './ExerciseSelector.vue'

export default {
  name: 'InputWindow',
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
      inputTxt: 'INPUT',
      expGrammarTxt: 'EXAMPLE GRAMMARS',
      inputBoxTxt: 'GRAMMAR & WORD',
      solutionButtonTxt: 'SHOW SOLUTION',
      infoButton1Txt: 'INFO BUTTON 1',
      infoButton2Txt: 'INFO BUTTON 2',
      expGrammar1txt: 'abc Grammar',
      expGrammar2txt: 'Even-Length Palindrome Grammar',
      expGrammar3txt: 'Balanced Parenthesis',
      expGrammar4txt: 'Simple Arithmetic Expressions',
      expGrammar5txt: 'Binary Numbers',
      expGrammar6txt: 'start & end with a',
      excerciseInputBoxHeading: 'EXERCISE INPUT',
      inputButtonText: 'SEND INPUT',
      startsymbolTextareaHeader: 'STARTSYMBOL',
      alphabetTextareaHeader: 'ALPHABET',
      variablesTextareaHeader: 'VARIABLES',
      productionsTextareaHeader: 'PRODUCTIONS',
      wordTextareaHeader: 'WORD',
      isInputValid: false,
      isExerciseModeValid: false,
      exerciseMode: '',
      exerciseInput: '',
      currentExercisedepth: 1
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
    isSolutionButtonDisabled () {
      this.isInputValid = this.checkInputValidity
    },
    nodeNamesByDepth () {
      console.log('nodeNamesByDepth were recieved in the Input Window!', this.nodeNamesByDepth)
    }
  },
  components: { ControlPanel, ExerciseSelector },
  computed: {
    isSolutionButtonDisabled () {
      return !this.startsymbolValue ||
             !this.alphabetValue ||
             !this.variablesValue ||
             !this.productionsValue ||
             !this.wordValue
    }
  },
  methods: {
    sendExerciseInput () {
      if (this.exerciseMode === 'guided-tree') {
        this.guidedTreeExercise()
      }
    },
    guidedTreeExercise () {
      let depth = this.currentExercisedepth
      const result = this.isInputCorrect(this.exerciseInput, this.nodeNamesByDepth[depth])
      if (result) {
        this.$refs.controlPanel.layerButtonsFunction(1) // go one layer forward
      } else {
        alert('the input was wrong')
      }
      ++this.currentExercisedepth
      // Implement the Logic for the Exercise Mode guided-path
    },
    isInputCorrect (str1, array2) {
      const array1 = str1.split(',').map(word => word.trim())
      const set1 = new Set(array1)
      const set2 = new Set(array2.map(word => word.trim()))
      console.log('Set1: Input Set', Array.from(set1))
      console.log('Set2: Solution Set', Array.from(set2))
      return set1.size === set2.size && [...set1].every(value => set2.has(value))
    },
    async enableExerciseInput (mode) {
      await this.solutionFunction()
      console.log('exercise-mode', mode)
      console.log('layer info test', 'InputWindow')
      this.exerciseMode = mode
      this.isExerciseModeValid = true
      this.$emit('exercise-mode', mode)
    },
    checkInputValidity () {
      return !this.startsymbolValue ||
             !this.alphabetValue ||
             !this.variablesValue ||
             !this.productionsValue ||
             !this.wordValue
    },
    handleLayerChange (direction) {
      this.$emit('layer-change', direction)
    },
    onLanguageChange () {
      console.log('InputWindow: onLanguageChange() was called!') // Debugging
      switch (this.language) {
        case 'DE':
          this.inputTxt = 'EINGABE'
          this.expGrammarTxt = 'BEISPIEL GRAMMATIKEN'
          this.inputBoxTxt = 'GRAMMATIK & WORT'
          this.solutionButtonTxt = 'ZEIGE LÖSUNG'
          this.infoButton1Txt = 'INFO KNOPF 1'
          this.infoButton2Txt = 'INFO KNOPF 2'
          this.expGrammar1txt = 'abc Grammatik'
          this.expGrammar2txt = 'Palidrome gerader Länge'
          this.expGrammar3txt = 'ausgewogene Klammern'
          this.expGrammar4txt = 'einfache Arithmetische Ausdrücke'
          this.expGrammar5txt = 'binärzahlen'
          this.expGrammar6txt = 'startet & endet mit a'
          this.excerciseInputBoxHeading = 'ÜBUNG EINGABE'
          this.inputButtonText = 'EINGABE SENDEN'
          this.startsymbolTextareaHeader = 'STARTSYMBOL'
          this.alphabetTextareaHeader = 'ALPHABET'
          this.variablesTextareaHeader = 'VARIABLEN'
          this.productionsTextareaHeader = 'PRODUKTIONEN'
          this.wordTextareaHeader = 'WORT'
          break
        case 'EN':
          this.inputTxt = 'INPUT'
          this.expGrammarTxt = 'EXAMPLE GRAMMARS'
          this.inputBoxTxt = 'GRAMMAR & WORD'
          this.solutionButtonTxt = 'SHOW SOLUTION'
          this.infoButton1Txt = 'INFO BUTTON 1'
          this.infoButton2Txt = 'INFO BUTTON 2'
          this.expGrammar1txt = 'abc Grammar'
          this.expGrammar2txt = 'Even-Length Palindrome Grammar'
          this.expGrammar3txt = 'Balanced Parenthesis'
          this.expGrammar4txt = 'Simple Arithmetic Expressions'
          this.expGrammar5txt = 'Binary Numbers'
          this.expGrammar6txt = 'start & end with a'
          this.excerciseInputBoxHeading = 'EXERCISE INPUT'
          this.inputButtonText = 'SEND INPUT'
          this.startsymbolTextareaHeader = 'STARTSYMBOL'
          this.alphabetTextareaHeader = 'ALPHABET'
          this.variablesTextareaHeader = 'VARIABLES'
          this.productionsTextareaHeader = 'PRODUCTIONS'
          this.wordTextareaHeader = 'WORD'
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

    fillExp (value) {
      switch (value) {
        case 1:
          // abc Grammar
          this.startsymbolValue = 'S'
          this.alphabetValue = 'a,b,c'
          this.variablesValue = 'S,A,B,C'
          this.productionsValue = 'S->A,S->B,S->C,S->SA,S->SB,S->SC,A->a,B->b,C->c'
          this.wordValue = 'abc'
          break
        case 2:
          // Even-Length Palindrome Grammar
          this.startsymbolValue = 'S'
          this.alphabetValue = 'a,b'
          this.variablesValue = 'S'
          this.productionsValue = 'S->aSb,S->bSa,S->ba,S->ab'
          this.wordValue = 'babab'
          break
        case 3:
          // Balanced Parenthesis:
          this.startsymbolValue = 'S'
          this.alphabetValue = '(,)'
          this.variablesValue = 'S'
          this.productionsValue = 'S->(S),S->SS,S->()'
          this.wordValue = '(()())'
          break
        case 4:
          // Simple Arithmetic Expressions
          this.startsymbolValue = 'E'
          this.alphabetValue = 'a,+,*,(,)'
          this.variablesValue = 'E'
          this.productionsValue = 'S->S+S,S->S*S,S->(S),S->a'
          this.wordValue = '(a+a)*a'
          break
        case 5:
          // Binary Numbers
          this.startsymbolValue = 'S'
          this.alphabetValue = '0,1'
          this.variablesValue = 'S'
          this.productionsValue = 'S->0S,S->1S,S->0,S->1'
          this.wordValue = '101010'
          break
        case 6:
          // Strings starting and ending with the Symbol 'a'
          this.startsymbolValue = 'S'
          this.alphabetValue = 'a,b'
          this.variablesValue = 'S,V'
          this.productionsValue = 'S->aVa,V->Va,V->Vb,V->a,V->b'
          this.wordValue = 'ababa'
          break
      }
      this.chooseExpGrammar()
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
  outline: none;
  resize: none;
  color: black;
  flex-grow: 1;
}

.grammar-box-heading ,
.excercise-input-box-heading{
  padding: 5px 5px;
  font-size: medium;
}

.extra-box{
  display: flex;
  flex-direction: column;
  padding: 5px;
}

.grammar-box,
.word-box {
  display: flex;
  flex-direction: column;
  padding: 5px;
}

#alphabet,
#variables,
#startsymbol,
#productions,
#word {
  flex-grow: 1;
  color: black;
  resize: none;
  margin: 3px;
}
#word {
  flex-grow: 1;
  color: black;
  resize: none;
}

.grammar-box,
.word-box {
  background-color: #2e814c;
  border: 2px solid #2e814c;
  border-radius: 3px;
  height: 100%;
}

.info-button-1,
.info-button-2,
.guided-exp-button,
.exp-grammar-button,
.solution-button,
.send-input-button {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
}
.exp-grammar-button,
.solution-button {
  background-color: #2e814c;
  border: 2px solid #2e814c;
  border-radius: 3px;
  font-weight: bold;
}

.info-button-1,
.info-button-2,
.guided-exp-button,
.send-input-button {
  background-color: #4f4f4f;
  border: 2px solid #4f4f4f;
  border-radius: 3px;
  font-weight: bold;
}

.send-input-bubox {
  margin-top: 5px;
}

button:hover {
  opacity: 90%;
}

.exp-grammar-button:hover,
.solution-button:enabled:hover,
.send-input-button:hover {
  background-color: white;
  color: #2e814c;
  transition: all 0.2s;
}

.info-button-1:hover,
.info-button-2:hover,
.send-input-button:hover {
  background-color: white;
  color: #4f4f4f;
  transition: all 0.2s;
}

.info-button-1:active,
.info-button-2:active,
.guided-exp-button:active,
.exp-grammar-button:active,
.solution-button:enabled:active,
.send-input-button:active {
  transform: translateY(4px);
  font-size: medium;
  transition: all 0.2s;
}

.dropdown {
  height: 100%;
  position: relative;
}

.dropdown-content {
  position: absolute;
  background-color: #2e814c;
  width: 100%;
}

.dropdown a {
  display: block;
  text-decoration: none;
  padding: 10px 15px;
}
.dropdown a:hover {
  background-color: #297244;
}

.input-window-wrapper {
  font-weight: bold;
  display: flex;
  flex-direction: column;

  width: 40%;
  margin: 7px;
  border: 2px solid #4f4f4f;
  border-radius: 3px;
  background-color: white;
}

.input-window {
  flex-grow: 1;
  display: grid;
  grid-template-columns: repeat(10, 10%);
  grid-template-rows: repeat(10, 10%);
  position: relative;
  padding: 5px;
}

.input-window-heading {
  width: 100px;
  height: 25px;
  background-color: #4f4f4f;
  border: 2px solid #4f4f4f;
  border-bottom-right-radius: 3px;
  display: grid;
  align-items: center;
}

.exercise-selector-component {
  padding: 5xp;
  grid-area: 3 / 7 / 7 / -1;
}

.exp-grammars-box {
  grid-area: 1 / 1 / 2 / 7;
}

.grammar-box-wrapper {
  grid-area: 2 / 1 / 8 / 7;
}

.solution-box {
  grid-area: 8 / 1 / 9 / 7;
}

.info-button-1-box {
  grid-area: 9 / 1 / 10 / 7;
}

.info-button-2-box {
  grid-area: 10 / 1 / -1 / 7;
}

.control-panel-wrapper {
  grid-area: 1 / 7 / 3 / -1;
}

.extra-box-wrapper {
  grid-area: 7 / 7 / -1 / -1;
}

.grid-item {
  padding: 5px;
}

.textarea-header {
  font-size: small;
}

.solution-button:disabled {
  cursor: not-allowed;
  background-color: #2e814c80;
  border: none;
}

.extra-box {
  background-color: #2e814c;
  border: 2px solid #2e814c;
  border-radius: 3px;
  height: 100%;
}

.extra-box-wrapper:disabled,
.extra-box:disabled,
.excercise-input-box-heading:disabled,
#exercise-input:disabled,
.send-input-button:disabled {
  cursor: not-allowed;
  opacity: 30%;
}

.extra-box.disabled {
  cursor: not-allowed;
  background-color: #2e814c80;
  border: none;
}
</style>
