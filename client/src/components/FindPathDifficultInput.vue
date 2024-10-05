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
  name: 'FindPathDifficultInput',
  data () {
    return {
      excerciseInputBoxHeading: 'EXERCISE INPUT',
      inputButtonText: 'SEND INPUT',
      isExerciseModeValid: false
    }
  },
  props: {
    // needed?
  },
  watch: {
    // needed?
  },
  components: {
    // needed?
  },
  computed: {
    // needed?
  },
  methods: {
    sendExerciseInput () {
      // Implement Logic
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
