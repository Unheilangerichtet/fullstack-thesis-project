<template>
  <div class="button-container">
    <div class="row exercise-selector-heading"> EXERCISE MODE</div>
    <!-- First row: "Path" and "Tree" buttons -->
    <div class="row row-1">
      <button
        :class="{ active: selectedOption === 'path' }"
        @click="selectOption('path')"
        class="button-left-top">{{  pathModeBtnTxt }}</button>
      <button
        :class="{ active: selectedOption === 'tree' }"
        @click="selectOption('tree')"
        class="button-right-top">{{ treeModeBtnTxt }}</button>
    </div>

    <!-- Second row: "Guided" and "Free" buttons -->
    <div class="row row-2">
      <button
        :class="{ active: selectedMode === 'guided' }"
        @click="selectMode('guided')"
        class="button-left-bottom">{{ guidedModeBtnTxt }}</button>
      <button
        :class="{ active: selectedMode === 'free' }"
        @click="selectMode('free')"
        class="button-right-bottom">{{ freeModeBtnTxt }}</button>
    </div>

    <!-- Third row: "Start" button -->
    <div class="row row-3">
      <button
        title="start the exercise"
        class="start-button"
        @click="startExercise"
        :disabled="(!selectedOption || !selectedMode) || !isInputValid">START</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedOption: null, // stores 'path' or 'tree'
      selectedMode: null, // stores 'guided' or 'free'
      guidedModeBtnTxt: 'GUIDED',
      freeModeBtnTxt: 'FREE',
      pathModeBtnTxt: 'PATH',
      treeModeBtnTxt: 'TREE'
    }
  },
  props: {
    isInputValid: false
  },
  methods: {
    selectOption (option) {
      this.selectedOption = option // set selected option (path/tree)
    },
    selectMode (mode) {
      this.selectedMode = mode // set selected mode (guided/free)
    },
    startExercise () {
      if (this.selectedOption && this.selectedMode && this.isInputValid) {
        const exp = this.selectedMode.concat('-', this.selectedOption)
        this.$emit('exercise-mode', exp)
        console.log('layer info test', 'ExerciseSelector')
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
  background-color: #4f4f4f;
  margin: 5px;
  padding: 7px;
  display: grid;
  grid-template-rows: 20% 30% 30% 20%;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  align-items: stretch;
  justify-items: stretch;
}

.row {
  display: flex;
  /* gap: 10px; */
}
.row-1 {
  margin-bottom: 4px;
}
.row-2 {
  margin-top: 4px;
}

button {
  /* padding: 10px 20px; */
  border: none;
  /* border-radius: 5px; */
  cursor: pointer;
  font-size: medium;
  background-color: #919191;
  transition: background-color 0.3s ease;
  width: 50%;
  height: 100%;
}

.button-right-top {
  border-top-right-radius: 6px;
}
.button-left-top {
  border-top-left-radius: 6px;
}
.button-right-bottom {
  border-bottom-right-radius: 6px;
}
.button-left-bottom {
  border-bottom-left-radius: 6px;
}

button.active {
  background-color: #2e814c; /* Active state color */
  color: white;
}

.row-3 {
  margin-top: 8px;
  background-color: white;
  border-radius: 5px;
}

button:hover {
  background-color: rgb(54, 150, 97);
}

button.start-button {
  width: 100%;
  height: 100%;
  border-radius: 3px;
  background-color: #2e814c;
  color: white;
  font-weight: bold;
}

button.start-button:hover:enabled {
  background-color: white;
  color: #2e814c
}

button.start-button:active {
  /* transform: translateY(4px);
  font-size: medium; */
  font-size: small;
  transition: all 0.2s;
}

button.start-button:disabled {
  background-color: #2e814c80;
  cursor: not-allowed;
}
</style>
