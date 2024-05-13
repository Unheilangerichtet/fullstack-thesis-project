<template>
  <div class="input-window-wrapper">
    <div class="input-window-heading">INPUT</div>
    <div class="input-window">
      <div class="grid-item exp-grammars-box">
        <div class="dropdown">
          <button class="exp-grammar-button" @click="chooseExpGrammar()">
            EXAMPLE GRAMMARS
          </button>
          <div class="dropdown-content" v-if="toggleDropdown">
            <a href="">Exp_1</a>
            <a href="">Exp_2</a>
            <a href="">Exp_3</a>
            <a href="">Exp_4</a>
            <a href="">Exp_5</a>
            <a href="">Exp_6</a>
          </div>
        </div>
      </div>
      <div class="grid-item grammar-box-wrapper">
        <div class="grammar-box">
          <div class="grammar-box-heading">GRAMMAR</div>
          <textarea
            type="text"
            id="grammar"
            name="grammar"
            placeholder="Enter grammar..."
          ></textarea>
        </div>
      </div>
      <div class="grid-item word-box-wrapper">
        <div class="word-box">
          <div class="grammar-box-heading">WORD</div>
          <textarea
            type="text"
            id="word"
            name="word"
            placeholder="Enter word..."
          ></textarea>
        </div>
      </div>
      <div class="grid-item solution-box">
        <button @click="solutionFunction()" class="solution-button">
          SOLUTION
        </button>
      </div>
      <div class="grid-item guided-exercise-box">
        <button class="guided-exercise-button">GUIDED EXERCISE</button>
      </div>
      <div class="grid-item free-exercise-box">
        <button class="free-exercise-button">FREE EXERCISE</button>
      </div>
      <div class="grid-item guided-exp-box">
        <button class="guided-exp-button">GUIDED EXAMPLE</button>
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

export default {
  name: 'InputWindow',
  data () {
    return {
      toggleDropdown: false
    }
  },
  components: { ControlPanel },
  methods: {
    chooseExpGrammar () {
      if (this.toggleDropdown === false) {
        this.toggleDropdown = true
      } else {
        this.toggleDropdown = false
      }
    },
    solutionFunction () {
      console.log('solutionFunction called!')
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

#grammar {
  flex-grow: 1;
  color: black;
  resize: none;
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
  background-color: #f0f2e8;
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
  grid-area: 2 / 1 / 5 / 7;
}

.word-box-wrapper {
  grid-area: 5 / 1 / 7 / 7;
}

.solution-box {
  grid-area: 7 / 1 / 8 / 7;
}

.guided-exercise-box {
  grid-area: 8 / 1 / 9 / 7;
}

.free-exercise-box {
  grid-area: 9 / 1 / 10 / 7;
}

.guided-exp-box {
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
