<template>
  <div class="output-window" id="output-window">
    <div class="output-window-heading">{{outputTxt}}</div>
     <div class="tree-diagram-container">
        <TreeDiagram
          ref="treeDiagram"
          class="tree-diagramm"
          :newTreeData="this.treeData"
          :word="receivedWord"
          @node-names-by-depth="handleNodeNamesByDepth"
          @path-to-word="handlePathToWord"
        />
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
      relationsArray: [],
      treeData: '',
      outputTxt: 'OUTPUT'
    }
  },
  props: {
    receivedData: {
      type: Object,
      required: false // was true when working
    },
    receivedWord: {
      type: String,
      required: false
    },
    exerciseMode: {
      type: String,
      required: false
    }
  },
  watch: {
    receivedData () {
      this.onPropChange()
    },
    exerciseMode () {
      this.handleExerciseModeChange()
    }
  },
  methods: {
    handleNodeNamesByDepth (nodeNamesByDepth) {
      console.log('nodeNamesByDepth in OutputWindow.vue')
      this.$emit('node-names-by-depth', nodeNamesByDepth)
    },
    handleLayerChange (direction) {
      this.$refs.treeDiagram.onLayerChange(direction)
    },
    handleExerciseModeChange () {
      console.log('handleExerciseModeChange in OutputWindow')
      this.$refs.treeDiagram.onExerciseModeChange(this.exerciseMode)
    },
    onPropChange () {
      const outputWindowDiv = document.getElementById('output-window')
      if (this.receivedData.result === true) {
        outputWindowDiv.classList.add('output-window-true-styles')
        outputWindowDiv.classList.remove('output-window-false-styles')
      } else {
        outputWindowDiv.classList.add('output-window-false-styles')
        outputWindowDiv.classList.remove('output-window-true-styles')
      }
      // create a array of objects where each element represents a child,parent pair
      this.relationsArray = JSON.parse(this.receivedData.relations).map(pair => {
        const [child, parent] = pair.split(',')
        return { child, parent }
      })
      this.relationsArray.push({child: 'S', parent: null})
      this.relationsArray = this.removeDuplicateChildren(this.relationsArray)
      // create hierarchy structure
      const root = d3.stratify()
        .id(d => d.child)
        .parentId(d => d.parent)(this.relationsArray)
      console.log('root:', root)

      // Convert stratified structure to hierarchical structure
      const hierarchyData = d3.hierarchy(root)

      function convertToTree (node) {
        const children = node.children ? node.children.map(convertToTree) : []
        return {
          name: node.data.id,
          children: children.length ? children : undefined
        }
      }

      const treeDataObject = convertToTree(hierarchyData)

      this.treeData = JSON.stringify(treeDataObject, null, 2)

      console.log('treeData:', this.treeData)

      this.$emit('new-tree-data', this.treeData)
    },

    removeDuplicateChildren (pairs) {
      const seenChildren = new Set()
      const uniquePairs = []
      for (let i = 0; i < pairs.length; i++) {
        const child = pairs[i].child
        const parent = pairs[i].parent
        if (!seenChildren.has(child)) {
          uniquePairs.push({ child, parent })
          seenChildren.add(child)
        }
      }
      console.log('uniquePairs', uniquePairs)
      return uniquePairs
    }
  },
  components: { TreeDiagram }
}
</script>

<style>
.output-window {
    width: 60%;
    margin: 10px;

    border: 2px solid var(--lmu-gray);
    border-radius: 3px;
    box-shadow: inset 0 0 10px 5px rgba(0, 0, 0, 0.2);
}

.output-window-true-styles {
  border: 2px solid rgb(0, 136, 58,0.5);
  border-radius: 3px;
  box-shadow: inset 0 0 10px 5px rgba(0, 136, 58, 0.2);
}

.output-window-false-styles {
  border: 2px solid rgb(224, 41, 65,0.5);
  border-radius: 3px;
  box-shadow: inset 0 0 10px 5px rgba(224, 41, 65, 0.2);
}

.output-window-heading {
    position: absolute;
    width: 100px;
    height: 25px;
    background-color: var(--lmu-gray);

    border: 2px solid var(--lmu-gray);
    border-bottom-right-radius: 3px;

    display: grid;
    align-items: center;
    color: white;
    font-weight: bold;
    z-index: 10;
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
