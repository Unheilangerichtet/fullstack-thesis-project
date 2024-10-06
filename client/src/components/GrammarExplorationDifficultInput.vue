<template>
  <div>
    <div class="extra-box">
      <div class="excercise-input-box-heading">{{ excerciseInputBoxHeading }}</div>
        <textarea
          type="text"
          id="exercise-input"
          v-model="exerciseInput"
          name="exercise input"
          placeholder="Enter words that are reachable with one production"
        ></textarea>
        <div class="send-input-button-box">
          <button class="send-input-button" @click="sendExerciseInput()">
            {{ inputButtonText }}
          </button>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GrammarExplorationDifficultInput',
  data () {
    return {
      excerciseInputBoxHeading: 'Words of next Layer',
      inputButtonText: 'SEND INPUT',
      exerciseInput: '',
      isExerciseModeValid: false,
      currentExercisedepth: 1
    }
  },
  props: {
    nodeNamesByDepth: {
      type: Array,
      required: false
    }
  },
  watch: {
    nodeNamesByDepth () {
      console.log('nodeNamesByDepth in GED!')
    }
  },
  components: {
    // needed?
  },
  computed: {
    // needed?
  },
  methods: {
    sendExerciseInput () {
      let depth = this.currentExercisedepth
      console.log(depth)
      console.log('nodeNamesByDepth in GED:', this.nodeNamesByDepth)
      const resultIsCorrect = this.isInputCorrect(this.exerciseInput, this.nodeNamesByDepth[depth])
      if (resultIsCorrect) {
        this.$emit('correct-input', 1)
      } else {
        alert('the input was wrong')
      }
      ++this.currentExercisedepth
    },
    isInputCorrect (str1, array2) {
      const array1 = str1.split(',').map(word => word.trim())
      const set1 = new Set(array1)
      const set2 = new Set(array2.map(word => word.trim()))
      console.log('Set1: Input Set', Array.from(set1))
      console.log('Set2: Solution Set', Array.from(set2))
      return set1.size === set2.size && [...set1].every(value => set2.has(value))
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
