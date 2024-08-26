<template>
  <div class="output-window">
     <div class="tree-diagram-container">
       <TreeDiagram class="tree-diagramm" :newTreeData="this.treeData"></TreeDiagram>
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
      treeData: ''
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
