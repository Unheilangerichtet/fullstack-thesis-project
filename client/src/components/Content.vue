<template>
  <div class="content-window">
    <InputWindow></InputWindow>
    <OutputWindow></OutputWindow>
  </div>
</template>

<script>
import InputWindow from './InputWindow.vue'
import OutputWindow from './OutputWindow.vue'

export default {
  name: 'Content',
  components: {InputWindow, OutputWindow},
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>
.content-window {
  display: flex;
  width: 100%;
  height: 600px;
}
</style>
