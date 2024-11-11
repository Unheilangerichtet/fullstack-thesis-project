<template>
  <div class="output-window" id="output-window">
    <div class="output-window-heading">{{outputTxt}}</div>
     <div class="tree-diagram-container">
        <TreeDiagram
          ref="treeDiagram"
          class="tree-diagramm"
          :newTreeData="this.treeData"
          :relationsProductionsMap="relationsProductionsMap"
          :word="receivedWord"
          @exercise-data="handleExerciseData"
          />
        </div>
  </div>
</template>

<script>
import TreeDiagram from './TreeDiagram.vue'
import * as d3 from 'd3'
export default {
  name: 'OutputWindow',
  components: { TreeDiagram },
  data () {
    return {
      relationsArray: [],
      treeData: '',
      outputTxt: 'OUTPUT',
      relationsProductionsMap: [],
      duplicatesCounter: 1
    }
  },
  props: {
    receivedData: {
      type: Object,
      required: false
    },
    receivedWord: {
      type: String,
      required: false
    },
    exerciseMode: {
      type: String,
      required: false
    },
    startsymbol: {
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
    handleExerciseData (exerciseData) {
      this.$emit('exercise-data', exerciseData)
    },
    handleNodeNamesByDepth (nodeNamesByDepth) {
      this.$emit('node-names-by-depth', nodeNamesByDepth)
    },
    handleLayerChange (direction) {
      this.$refs.treeDiagram.onLayerChange(direction)
    },
    handleExerciseModeChange () {
      this.$refs.treeDiagram.onExerciseModeChange()
    },
    onPropChange () {
      this.duplicatesCounter = 1
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
      if (this.startsymbol) {
        this.relationsArray.push({child: this.startsymbol, parent: null})
      }

      console.table('this.relationsArray', this.relationsArray)

      this.relationsArray = this.altHierarchy(this.relationsArray)

      this.relationsArray = this.markDuplicates(this.relationsArray)

      // create hierarchy structure
      const root = d3.stratify()
        .id(d => d.child)
        .parentId(d => d.parent)(this.relationsArray)

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
      this.$emit('new-tree-data', this.treeData)
      this.relationsProductionsMap = this.receivedData.catalog
    },

    markDuplicates (pairs) {
      const seenChildren = new Set()
      const uniquePairs = []
      for (let i = 0; i < pairs.length; i++) {
        let child = pairs[i].child
        let parent = pairs[i].parent
        if (!seenChildren.has(child)) {
          uniquePairs.push({ child, parent })
          seenChildren.add(child)
        } else {
          child += ` (duplicate ${this.duplicatesCounter})`
          this.duplicatesCounter++
          uniquePairs.push({child, parent})
        }
      }
      return uniquePairs
    },

    altHierarchy (relationsArray) {
      const flatData = relationsArray.map((relation, index) => ({
        id: `${relation.child}-${relation.parent}`,
        name: relation.child,
        parentId: relation.parent
      }))
      const idLookup = {}
      flatData.forEach(node => {
        idLookup[node.name] = node.id
      })
      flatData.forEach(node => {
        node.parentId = idLookup[node.parentId] || null
      })

      const allParents = new Set(flatData.map(d => d.parentId))
      const allChildren = new Set(flatData.map(d => d.name))
      const rootName = [...allParents].find(parent => !allChildren.has(parent))

      if (rootName && !flatData.some(d => d.id === rootName)) {
        flatData.push({ id: rootName, name: rootName, parentId: null })
      }

      const root = d3.stratify()
        .id(d => d.id)
        .parentId(d => d.parentId)(flatData)

      let result = this.getNdesByDepth(root)
      result = result.map(relation => ({
        ...relation,
        parent: relation.parent === 'null' ? null : relation.parent
      }))
      return result
    },

    getNdesByDepth (root) {
      const sortedFlatData = []
      root.each(node => {
        const child = node.id.split('-')[0]
        const parent = node.id.split('-')[1] || null
        sortedFlatData.push({ child: child, parent: parent, depth: node.depth })
      })
      return sortedFlatData.sort((a, b) => a.depth - b.depth)
    }
  }
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
