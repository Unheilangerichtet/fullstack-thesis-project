<template>
  <div id="grammar-component-wrapper">
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
      <button
        class="solution-button"
        @click="clickShowSolution()"
        :disabled="!isInputValid"
        title="input grammar & word first">
        {{ solutionButtonTxt }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Grammar',
  data () {
    return {
      toggleDropdown: false,
      grammarValue: '',
      startsymbolValue: '',
      alphabetValue: '',
      variablesValue: '',
      productionsValue: '',
      wordValue: '',
      expGrammarTxt: 'EXAMPLE GRAMMARS',
      inputBoxTxt: 'GRAMMAR & WORD',
      solutionButtonTxt: 'SHOW SOLUTION',
      expGrammar1txt: 'abc Grammar',
      expGrammar2txt: 'Even-Length Palindrome Grammar',
      expGrammar3txt: 'Balanced Parenthesis',
      expGrammar4txt: 'Simple Arithmetic Expressions',
      expGrammar5txt: 'Binary Numbers',
      expGrammar6txt: 'start & end with a',
      startsymbolTextareaHeader: 'STARTSYMBOL',
      alphabetTextareaHeader: 'ALPHABET',
      variablesTextareaHeader: 'VARIABLES',
      productionsTextareaHeader: 'PRODUCTIONS',
      wordTextareaHeader: 'WORD'
    }
  },
  props: {
    language: String
  },
  watch: {
    isInputValid () {
      this.$emit('grammar-and-word-validity', this.isInputValid)
    },
    language () {
      this.onLanguageChange()
    }
  },
  computed: {
    isInputValid () {
      if (this.startsymbolValue && this.alphabetValue && this.variablesValue && this.productionsValue && this.wordValue) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    clickShowSolution () {
      this.$emit('solution-request', this.variablesValue, this.alphabetValue, this.productionsValue, this.startsymbolValue, this.wordValue)
    },
    chooseExpGrammar () {
      this.toggleDropdown = !this.toggleDropdown
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
    },
    checkInputValidity () {
      return !this.startsymbolValue ||
             !this.alphabetValue ||
             !this.variablesValue ||
             !this.productionsValue ||
             !this.wordValue
    },
    onLanguageChange () {
      console.log('InputWindow: onLanguageChange() was called!') // Debugging
      switch (this.language) {
        case 'DE':
          this.expGrammarTxt = 'BEISPIEL GRAMMATIKEN'
          this.solutionButtonTxt = 'ZEIGE LÖSUNG'
          this.expGrammar1txt = 'abc Grammatik'
          this.expGrammar2txt = 'Palidrome gerader Länge'
          this.expGrammar3txt = 'ausgewogene Klammern'
          this.expGrammar4txt = 'einfache Arithmetische Ausdrücke'
          this.expGrammar5txt = 'binärzahlen'
          this.expGrammar6txt = 'startet & endet mit a'
          this.startsymbolTextareaHeader = 'STARTSYMBOL'
          this.alphabetTextareaHeader = 'ALPHABET'
          this.variablesTextareaHeader = 'VARIABLEN'
          this.productionsTextareaHeader = 'PRODUKTIONEN'
          this.wordTextareaHeader = 'WORT'
          break
        case 'EN':
          this.expGrammarTxt = 'EXAMPLE GRAMMARS'
          this.solutionButtonTxt = 'SHOW SOLUTION'
          this.expGrammar1txt = 'abc Grammar'
          this.expGrammar2txt = 'Even-Length Palindrome Grammar'
          this.expGrammar3txt = 'Balanced Parenthesis'
          this.expGrammar4txt = 'Simple Arithmetic Expressions'
          this.expGrammar5txt = 'Binary Numbers'
          this.expGrammar6txt = 'start & end with a'
          this.startsymbolTextareaHeader = 'STARTSYMBOL'
          this.alphabetTextareaHeader = 'ALPHABET'
          this.variablesTextareaHeader = 'VARIABLES'
          this.productionsTextareaHeader = 'PRODUCTIONS'
          this.wordTextareaHeader = 'WORD'
          break
      }
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
#grammar-component-wrapper {
  display: grid;
  grid-template-rows: 1fr 6fr 1fr;
}
.dropdown {
  height: 100%;
  position: relative;
}
.dropdown a {
  display: block;
  text-decoration: none;
  padding: 10px 15px;
}
.dropdown a:hover {
  background-color: var(--lmu-green);
}
.exp-grammar-button,
.solution-button {
  border: none;
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: var(--lmu-gray);
  border: 2px solid var(--lmu-gray);
  border-radius: 3px;
  font-weight: bold;
}
.exp-grammar-button:hover,
.solution-button:hover {
  background-color: var(--lmu-light-gray);
  color: var(--lmu-green);
  transition: all 0.2s;
}
.exp-grammar-button:active,
.solution-button:enabled:active,
.send-input-button:active {
  transform: translateY(4px);
  font-size: medium;
  transition: all 0.2s;
}
.dropdown-content {
  position: absolute;
  background-color: rgba(46, 129, 76, 0.85);
  width: 100%;
}
.solution-button:disabled {
  cursor: not-allowed;
  background-color: #2e814c80;
  border: none;
}

/* ------------ Grammar Box ------------ */
.grammar-box,
.word-box {
  display: flex;
  flex-direction: column;
  background-color: var(--lmu-gray);
  border: 2px solid var(--lmu-gray);
  border-radius: 3px;
  height: 100%;
  padding: 5px;
}
#alphabet,
#variables,
#startsymbol,
#productions,
#word {
  color: black;
  resize: none;
  margin: 3px;
}
.textarea-header {
  font-size: small;
}

.exp-grammars-box {
  grid-area: 1 / 1 / 2 / -1; /* First row */
}

.grammar-box-wrapper {
  grid-area: 2 / 1 / 3 / -1; /* Second row */
}

.solution-box {
  grid-area: 3 / 1 / 4 / -1; /* Third row */
}

</style>
