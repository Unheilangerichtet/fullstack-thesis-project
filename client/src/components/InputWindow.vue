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
          <!-- &#x3A3; => Sigma -->
          <div class="grammar-box-heading">{{ inputBoxTxt }}</div>
          <textarea
            v-model="startsymbolValue"
            type="text"
            id="startsymbol"
            name="startsymbol"
            placeholder="Enter Startsymbol, for exp. S..."
          ></textarea>
          <textarea
            v-model="alphabetValue"
            type="text"
            id="alphabet"
            name="alphabet"
            placeholder="Enter Alphabet / Terminal Symbols..."
          ></textarea>
          <textarea
            v-model="variablesValue"
            type="text"
            id="variables"
            name="variables"
            placeholder="Enter Variables / Nonterminal Symbols..."
          ></textarea>
          <textarea
            v-model="productionsValue"
            type="text"
            id="productions"
            name="productions"
            placeholder="Enter Productions, for exp. S->A,A->B..."
          ></textarea>
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
        <button @click="solutionFunction()" class="solution-button">
          {{ solutionButtonTxt }}
        </button>
      </div>
      <div class="grid-item guided-exercise-box">
        <button class="guided-exercise-button">{{ guidedExerciseButtonTxt }}</button>
      </div>
      <div class="grid-item free-exercise-box">
        <button class="free-exercise-button">{{ freeExerciseButtonTxt }}</button>
      </div>
      <ControlPanel class="control-panel-wrapper"></ControlPanel>
      <div class="grid-item extra-box-wrapper">
        <div class="extra-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
import ControlPanel from './ControlPanel.vue'
import CalculationService from '../services/CalculationService'
import InputService from '../services/InputService'

export default {
  name: 'InputWindow',
  data () {
    return {
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
      solutionButtonTxt: 'SOLUTION',
      guidedExerciseButtonTxt: 'GUIDED EXERCISE',
      freeExerciseButtonTxt: 'FREE EXERCISE',
      expGrammar1txt: 'abc Grammar',
      expGrammar2txt: 'Even-Length Palindrome Grammar',
      expGrammar3txt: 'Balanced Parenthesis',
      expGrammar4txt: 'Simple Arithmetic Expressions',
      expGrammar5txt: 'Binary Numbers',
      expGrammar6txt: 'start & end with a'
    }
  },
  props: {
    language: String
  },
  watch: {
    language () {
      this.onLanguageChange()
    }
  },
  components: { ControlPanel },
  methods: {

    onLanguageChange () {
      console.log('InputWindow: onLanguageChange() was called!') // Debugging
      switch (this.language) {
        case 'DE':
          this.inputTxt = 'EINGABE'
          this.expGrammarTxt = 'BEISPIEL GRAMMATIKEN'
          this.inputBoxTxt = 'GRAMMATIK & WORT'
          this.solutionButtonTxt = 'LÖSUNG'
          this.guidedExerciseButtonTxt = 'GEFÜHRTE ÜBUNG'
          this.freeExerciseButtonTxt = 'FREIE ÜBUNG'
          this.expGrammar1txt = 'abc Grammatik'
          this.expGrammar2txt = 'Palidrome gerader Länge'
          this.expGrammar3txt = 'ausgewogene Klammern'
          this.expGrammar4txt = 'einfache Arithmetische Ausdrücke'
          this.expGrammar5txt = 'binärzahlen'
          this.expGrammar6txt = 'startet & endet mit a'
          break
        case 'EN':
          this.inputTxt = 'INPUT'
          this.expGrammarTxt = 'EXAMPLE GRAMMARS'
          this.inputBoxTxt = 'GRAMMAR & WORD'
          this.solutionButtonTxt = 'SOLUTION'
          this.guidedExerciseButtonTxt = 'GUIDED EXERCISE'
          this.freeExerciseButtonTxt = 'FREE EXERCISE'
          this.expGrammar1txt = 'abc Grammar'
          this.expGrammar2txt = 'Even-Length Palindrome Grammar'
          this.expGrammar3txt = 'Balanced Parenthesis'
          this.expGrammar4txt = 'Simple Arithmetic Expressions'
          this.expGrammar5txt = 'Binary Numbers'
          this.expGrammar6txt = 'start & end with a'
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
}

.grammar-box-heading {
  padding: 5px 15px;
}

.grammar-box,
.word-box {
  padding: 5px;
  display: flex;
  flex-direction: column;
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
.word-box,
.extra-box {
  background-color: #2e814c;
  border: 2px solid #2e814c;
  border-radius: 3px;
  height: 100%;
}

.guided-exercise-button,
.free-exercise-button,
.guided-exp-button,
.exp-grammar-button,
.solution-button {
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
}

.guided-exercise-button,
.free-exercise-button,
.guided-exp-button {
  background-color: #4f4f4f;
  border: 2px solid #4f4f4f;
  border-radius: 3px;
}

button:hover {
  opacity: 90%;
}

.guided-exercise-button:hover,
.free-exercise-button:hover,
.guided-exp-button:hover,
.exp-grammar-button:hover,
.solution-button:hover {
  background-color: white;
  color: black;
  font-weight: bold;
  font-size: large;
  transition: all 0.2s;
}
.guided-exercise-button:active,
.free-exercise-button:active,
.guided-exp-button:active,
.exp-grammar-button:active,
.solution-button:active {
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

.exp-grammars-box {
  grid-area: 1 / 1 / 2 / 7;
}

.grammar-box-wrapper {
  grid-area: 2 / 1 / 8 / 7;
}

.solution-box {
  grid-area: 8 / 1 / 9 / 7;
}

.guided-exercise-box {
  grid-area: 9 / 1 / 10 / 7;
}

.free-exercise-box {
  grid-area: 10 / 1 / -1 / 7;
}

.control-panel-wrapper {
  grid-area: 1 / 7 / 6 / -1;
}

.extra-box-wrapper {
  grid-area: 6 / 7 / -1 / -1;
}

.grid-item {
  padding: 5px;
}
</style>
