<template>
    <div class="output-window">
        <div class="output-window-heading">OUTPUT</div>
        <!-- <tree :data="tree" node-text="name" layoutType="circular"></tree> -->
    </div>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style>
.output-window {
    width: 60%;
    margin: 7px;

    border: 2px solid #4F4F4F;
    border-radius: 3px;
}

.output-window-heading {
    position: relative;
    width: 100px;
    height: 25px;
    background-color: #4F4F4F;

    border: 2px solid #4F4F4F;
    border-bottom-right-radius: 3px;

    display: grid;
    align-items: center;
    color: white
}
</style>
