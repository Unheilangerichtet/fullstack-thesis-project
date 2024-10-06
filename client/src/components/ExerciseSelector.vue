<template>
  <div class="button-container">
    <div class="row exercise-selector-heading">{{ exerciseSelectorHeading }}</div>

    <div class="row row-1">
      <button
        :class="{ active: selectedGamemode === 'find-the-path' }"
        @click="selectGamemode('find-the-path')"
        class="path-mode-button">{{  pathModeBtnTxt }}</button>
    </div>
    <div class="row row-2">
      <button
        :class="{ active: selectedGamemode === 'grammar-exploration' }"
        @click="selectGamemode('grammar-exploration')"
        class="grammar-exploration-mode-button">{{ grammarExplorationButtonTxt }}</button>
    </div>

    <div class="row exercise-selector-heading">{{ selectDifficultyTxt }}</div>

    <div class="row row-3">
      <button
        :class="{ active: selectedDifficulty === 'easy' }"
        @click="selectDifficulty('easy')"
        class="easy-mode-button">{{ guidedModeBtnTxt }}</button>
      <button
        :class="{ active: selectedDifficulty === 'difficult' }"
        @click="selectDifficulty('difficult')"
        class="difficult-mode-button">{{ freeModeBtnTxt }}</button>
    </div>

    <div class="row row-4">
      <button
        title="start the exercise"
        class="start-button"
        @click="startExercise"
        :disabled="(!selectedGamemode || !selectedDifficulty) || !this.isGrammarInputValid">START</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExerciseSelector',
  data () {
    return {
      selectedGamemode: null,
      selectedDifficulty: null,
      exerciseSelectorHeading: 'SELECT GAMEMODE',
      guidedModeBtnTxt: 'EASY',
      freeModeBtnTxt: 'DIFFICULT',
      pathModeBtnTxt: 'FIND THE PATH',
      grammarExplorationButtonTxt: 'GRAMMAR EXPLORATION',
      selectDifficultyTxt: 'SELECT DIFFICULTY'
    }
  },
  props: {
    isGrammarInputValid: {
      type: Boolean,
      required: false
    },
    language: {
      type: String,
      required: false
    }
  },
  watch: {
    language () {
      this.onLanguageChange()
    }
  },
  methods: {
    selectGamemode (gamemode) {
      this.selectedGamemode = gamemode // (path/tree)
    },
    selectDifficulty (difficulty) {
      this.selectedDifficulty = difficulty // (guided/free)
    },
    startExercise () {
      if (this.selectedGamemode && this.selectedDifficulty) {
        this.$emit('exercise-mode', this.selectedDifficulty, this.selectedGamemode)
      }
    },
    onLanguageChange () {
      switch (this.language) {
        case 'DE':
          this.exerciseSelectorHeading = 'SPIELMODUS'
          this.guidedModeBtnTxt = 'EINFACH'
          this.freeModeBtnTxt = 'SCHWER'
          this.pathModeBtnTxt = 'FINDE DEN PFAD'
          this.grammarExplorationButtonTxt = 'GRAMMATIK ERKUNDUNG'
          this.selectDifficultyTxt = 'SCHWIERIGKEITSSTUFE'
          break
        case 'EN':
          this.exerciseSelectorHeading = 'SELECT GAMEMODE'
          this.guidedModeBtnTxt = 'EASY'
          this.freeModeBtnTxt = 'DIFFICULT'
          this.pathModeBtnTxt = 'FIND THE PATH'
          this.grammarExplorationButtonTxt = 'GRAMMAR EXPLORATION'
          this.selectDifficultyTxt = 'SELECT DIFFICULTY'
          break
        default:
          console.log('unknown language!')
      }
    }
  }
}
</script>

<style scoped>
.exercise-selector-heading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.button-container {
  background-color: var(--lmu-gray);
  margin: 5px;
  padding: 7px;
  display: grid;
  grid-template-rows: 15% 15% 15% 15% 20% 20%;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  align-items: stretch;
  justify-items: stretch;
}
.row {
  display: flex;
}
.row-1 {
  margin-bottom: 4px;
}
.row-2 {
  width: 100%;
}
.row-3 {
  margin-top: 4px;
}
.row-1 button,
.row-2 button {
  border: none;
  cursor: pointer;
  font-size: medium;
  background-color: #919191;
  transition: background-color 0.3s ease;
  width: 100%;
  height: 100%;
}

.row-3 button,
.row-4 button {
  border: none;
  cursor: pointer;
  font-size: medium;
  background-color: #919191;
  transition: background-color 0.3s ease;
  width: 50%;
  height: 100%;
}

.grammar-exploration-mode-button {
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
}
.path-mode-button {
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.difficult-mode-button {
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
}
.easy-mode-button {
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

button.active {
  background-color: var(--lmu-green); /* Active state color */
  color: var(--lmu-light-gray);
}

.row-4 {
  margin-top: 8px;
  background-color: var(--lmu-light-gray);
  border-radius: 5px;
}

button:hover {
  background-color: rgb(54, 150, 97);
}

button.start-button {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: var(--lmu-green);
  color: var(--lmu-light-gray);
  font-weight: bold;
}

button.start-button:hover:enabled {
  background-color: white;
  color: var(--lmu-green);
}

button.start-button:active {
  font-size: small;
  transition: all 0.2s;
}

button.start-button:disabled {
  background-color: #2e814c80;
  cursor: not-allowed;
}
</style>
