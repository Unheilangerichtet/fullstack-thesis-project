<template>
  <div class="output-window">
     <div class="tree-diagram-container">
       <TreeDiagram class="tree-diagramm"></TreeDiagram>
     </div>
  </div>
</template>

<script>
import TreeDiagram from './TreeDiagram.vue'
import * as d3 from 'd3'
export default {
  name: 'OutputWindow',
  data () {
    return {
      relationsArray: ''
    }
  },
  props: {
    receivedData: {
      type: Object,
      required: true
    }
  },
  watch: {
    receivedData () {
      this.onPropChange()
    }
  },
  methods: {
    onPropChange () {
      // create a array of objects where each element represents a child,parent pair
      this.relationsArray = JSON.parse(this.receivedData.relations).map(pair => {
        const [child, parent] = pair.split(',')
        return { child, parent }
      })
      // create a hierarchy from the array of child-parent pairs.
      const root = d3.stratify()
        .id(d => d.child)
        .parentId(d => d.parent)(this.relationsArray)
      console.log('root:', root)
    }
  },
  components: { TreeDiagram }
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

.test-paragraph {
  color: black;
}
.tree-diagram-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.tree-diagram {
  width: 100%;
  height: 100%;
}

</style>
