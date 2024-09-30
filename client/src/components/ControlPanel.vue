<template>
    <div class="wrapper">
        <div class="control-box">
            <div class="layer-heading">LAYER</div>
            <div class="layer-buttons-container">
                <button id="layerBackButton" @click="layerButtonsFunction('back')">
                    <img v-bind:src="LayerBackIcon" id="LayerBackIcon">
                </button>
                <button id="layerForwardButton" @click="layerButtonsFunction('forward')">
                    <img v-bind:src="LayerForwardIcon" id="LayerForwardIcon">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ControlPanel',
  data () {
    return {
      arrowForwardIcon: require('../assets/icons/arrow_forward.svg'),
      arrowBackIcon: require('../assets/icons/arrow_back.svg'),
      LayerForwardIcon: require('../assets/icons/double_arrow_forward.svg'),
      LayerBackIcon: require('../assets/icons/double_arrow_back.svg')

    }
  },
  methods: {
    layerButtonsFunction (direction) {
      (direction === 'back') ? this.$emit('layer-change', -1) : this.$emit('layer-change', 1)
    }
  }
}
</script>

<style>
.wrapper {
    padding: 5px;
}
.control-box {
    background-color:#4F4F4F;
    border: 2px solid #4F4F4F;
    border-radius: 3px;
    height: 100%;

    display: grid;
    grid-template-rows: 40% 60%;
    position: relative;
    padding: 5px;
    align-items: center;
}

.layer-buttons-container {
    grid-area: 1 / 0 / 2 / 1;
    height: 100%;
    display: flex;
    justify-content: space-between;
}

#layerBackButton {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
}

#layerForwardButton {
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
}

#layerBackButton, #layerForwardButton {
    border: none;
    cursor: pointer;
    width: 100%;
    height: 100%;
    background: #d3d3d3;
    opacity: 0.7;
    transition: opacity .2s;
    /* padding: 5px 30px; */

    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-grow: 1; */
}

#layerBackButton:hover, #layerForwardButton:hover {
    opacity: 1
}
</style>
