<template>
    <div class="wrapper">
        <div class="control-box">
            <div class="panel-item control-panel-heading">CONTROL PANEL</div>
            <div class="panel-item slidecontainer">
                <input type="range" min="1" max="100" value="50" class="slider" id="myRange">
            </div>
            <div class="steps-heading">STEP: X</div>
            <div class="step-buttons-container">
                <button id="stepBackButton">
                    <img v-bind:src="arrowBackIcon" id="arrowBackIcon">
                </button>
                <button id="stepForwardButton">
                    <img v-bind:src="arrowForwardIcon" id="arrowForwardIcon">
                </button>
            </div>
            <div class="layer-heading">LAYER: Y</div>
            <div class="layer-buttons-container">
                <button id="layerBackButton">
                    <img v-bind:src="LayerBackIcon" id="LayerBackIcon">
                </button>
                <button id="layerForwardButton">
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
    grid-template-rows: repeat(6, 1fr);
    position: relative;
    padding: 5px;
    align-items: center;
}

.slider {
    margin: 0;
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 30px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}

/* The slider handle (use -webkit- (Chrome, Opera, Safari, Edge) and -moz- (Firefox) to override default look) */
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 30px; /* Slider handle height */
    background: #297244; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

.slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 30px; /* Slider handle height */
    background: #297244; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

.step-buttons-container, .layer-buttons-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
}

#stepBackButton, #stepForwardButton, #layerBackButton, #layerForwardButton {
    border: none;
    cursor: pointer;
    width: 100%;
    height: 30px;
    background: #d3d3d3;
    opacity: 0.7;
    transition: opacity .2s;
    /* padding: 5px 30px; */

    display: flex;
    justify-content: center;
    align-items: center;
    /* flex-grow: 1; */
}

#stepBackButton:hover, #stepForwardButton:hover, #layerBackButton:hover, #layerForwardButton:hover {
    opacity: 1; /* Fully shown on mouse-over */
}
</style>
