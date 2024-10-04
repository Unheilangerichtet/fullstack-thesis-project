<template>
  <div class="multi-select-grid">
    <div class="row multi-select-heading">SELECT CORRECT WORDS</div>
    <div class="scrollable-container">
      <div class="my-grid" id="buttonGrid">
        <div
          class="button"
          v-for="button in buttons"
          :key="button.value"
          :data-value="button.value"
          :class="{ selected: isSelected(button.value) }"
          @click="toggleSelect(button.value)"
        >
          {{ button.label }}
        </div>
      </div>
    </div>
    <div class="row row-3">
      <button
        class="start-button" @click="start">SEND INPUT</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      buttons: [
        { value: 1, label: 'word 1' },
        { value: 2, label: 'word 2' },
        { value: 3, label: 'word 3' },
        { value: 4, label: 'word 4' },
        { value: 5, label: 'word 5' },
        { value: 6, label: 'word 6' },
        { value: 7, label: 'word 7' },
        { value: 8, label: 'word 8' },
        { value: 9, label: 'word 9' },
        { value: 10, label: 'word 10' },
        { value: 11, label: 'word 11' },
        { value: 12, label: 'word 12' },
        { value: 2, label: 'word 2' },
        { value: 3, label: 'word 3' },
        { value: 4, label: 'word 4' },
        { value: 5, label: 'word 5' },
        { value: 6, label: 'word 6' },
        { value: 7, label: 'word 7' },
        { value: 8, label: 'word 8' },
        { value: 9, label: 'word 9' },
        { value: 10, label: 'word 10' },
        { value: 11, label: 'word 11' }
      ],
      selectedButtons: [],
      multiSelectHeading: 'SELECT CORRECT WORDS'
    }
  },
  methods: {
    toggleSelect (value) {
      const index = this.selectedButtons.indexOf(value)
      if (index === -1) {
        this.selectedButtons.push(value)
      } else {
        this.selectedButtons.splice(index, 1)
      }
    },
    isSelected (value) {
      return this.selectedButtons.includes(value)
    },
    start () {
      alert(`You selected: ${this.selectedButtons.join(', ')}`)
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
    /* grid-template-rows: 20% 70% 10%; */
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
</style>
