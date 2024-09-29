<template>
  <div id="tree-diagram">
    <div class="zoom-buttons">
      <button @click="zoomIn">
        <img v-bind:src="zoomInIcon" id="zoomInIcon">
      </button>
      <button @click="zoomOut">
        <img v-bind:src="zoomOutIcon" id="zoomOutIcon">
      </button>
      <button @click="resetZoom">
        <img v-bind:src="resetZoomIcon" id="resetZoomIcon">
      </button>
    </div>
    <svg id="treeSVG" ref="treeSvg" :width="svgWidth" :height="svgHeight"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'TreeDiagram',
  mounted () {
    console.log('createTreeDiagram')
  },
  data () {
    return {
      i: 0, // work in progress
      duration: 750, // work in progress
      g: null, // work in progress
      root: null, // work in progress
      marginX: 220, // Default horizontal margin
      marginY: 200, // Default vertical margin
      svgWidth: 100,
      svgHeight: 100,
      initialTransform: null,
      zoom: d3.zoom().on('zoom', this.zoomed),
      zoomInIcon: require('../assets/icons/zoom_in.svg'),
      zoomOutIcon: require('../assets/icons/zoom_out.svg'),
      resetZoomIcon: require('../assets/icons/restart_alt.svg'),
      recievedTreeData: ''
    }
  },
  props: {
    newTreeData: {
      type: String
    },
    word: '',
    layerChange: 0
  },
  watch: {
    newTreeData () {
      console.log('newTreeData in TreeDiagram.vue:', this.newTreeData)
      this.treeData = JSON.parse(this.newTreeData)
      this.createTreeDiagram()
    },
    word () {
      console.log('recievedWord: ', this.word)
    },
    layerChange () {
      this.onLayerChange()
    }
  },
  computed: {
    margin () {
      return {x: this.marginX, y: this.marginY}
    }
  },
  methods: {
    onLayerChange () {
      console.log('layerChange Value', this.layerChange)
      if (this.layerChange === 1) {

      } else {

      }
      // change layer based on 'layerChange' value
      // if 'layerChange' == -1 then go a layer back, else go a layer forward
    },
    zoomed (event) {
      d3.select(this.$refs.treeSvg).select('g').attr('transform', event.transform)
    },
    zoomIn () {
      d3.select(this.$refs.treeSvg).call(this.zoom.scaleBy, 1.1)
    },
    zoomOut () {
      d3.select(this.$refs.treeSvg).call(this.zoom.scaleBy, 0.9)
    },
    resetZoom () {
      d3.select(this.$refs.treeSvg).call(this.zoom.transform, this.initialTransform)
    },

    createTreeDiagram () {
      this.clearTree()
      this.initializeZoom()

      this.margin = { top: 10, right: 10, bottom: 10, left: 10 }
      this.treeContainerWidth = d3.select('#tree-diagram').node().getBoundingClientRect().width
      this.treeContainerHeight = d3.select('#tree-diagram').node().getBoundingClientRect().height

      this.svg = d3
        .select(this.$refs.treeSvg)
        .attr('width', this.treeContainerWidth)
        .attr('height', this.treeContainerHeight)
        .attr('background', 'red')
        .append('g')

      this.root = d3.hierarchy(this.treeData, (d) => d.children)
      this.root.x0 = this.treeContainerHeight / 2
      this.root.y0 = 100

      if (this.root.children) {
        this.root.children.forEach(this.collapse)
      }

      this.update(this.root)
      this.resetZoom()
    },

    update (source) {
      const treeData = d3.tree().nodeSize([60, 50])(this.root)
      const duration = this.duration
      const margin = this.margin

      const extreHeight = d3.select(this.$refs.treeSvg).select('g').node().getBBox().height
      this.svgHeight = 600 + extreHeight

      const nodes = treeData.descendants()
      const links = treeData.descendants().slice(1)

      // Properly adjust vertical (x) and horizontal (y) positioning with margins
      const initialSpacing = 180 // Default spacing that d3 uses for vertical positioning
      nodes.forEach((d) => {
        console.log('marginX', this.marginX)
        console.log('marginY', this.marginY)
        d.y = d.depth * this.marginX // Horizontal spacing (x-axis)
        d.x = (d.x / initialSpacing) * this.marginY // Adjust vertical spacing (y-axis)
        console.log('d.y', d.y)
        console.log('d.x', d.x)
      })

      // Calculate the maximum and minimum x positions to center the tree vertically
      const minX = Math.min(...nodes.map(d => d.x))
      const maxX = Math.max(...nodes.map(d => d.x))
      const treeHeight = maxX - minX

      // Update the width of the SVG dynamically based on tree depth
      const maxDepth = Math.max(...nodes.map(d => d.depth))
      const dynamicWidth = margin.left + margin.right + this.marginX * (maxDepth + 1)
      this.svgWidth = dynamicWidth < this.treeContainerWidth ? this.treeContainerWidth + 10 : dynamicWidth

      // Center the tree vertically and shift to the right
      const verticalShift = (this.treeContainerHeight - treeHeight) / 2 - minX
      const horizontalShift = 20 // Add some margin to the left
      console.log('verticalShift', verticalShift)
      console.log('horizontalShift', horizontalShift)

      nodes.forEach(d => {
        d.x += verticalShift // Center the tree vertically
        d.y += horizontalShift // Shift the tree to the right
        console.log('d.y after shift', d.y)
        console.log('d.x after shift', d.x)
      })

      // ****************** Links section ***************************

      // Update the links...
      const link = this.svg.selectAll('path.link').data(links, (d) => d.id)

      // Enter any new links at the parent's previous position.
      const linkEnter = link
        .enter()
        .insert('path', 'g')
        .attr('class', 'link')
        .attr('d', (d) => {
          const o = { x: source.x0, y: source.y0 }
          return this.diagonal(o, o)
        })

      // UPDATE
      const linkUpdate = linkEnter.merge(link)

      // Transition back to the parent element position
      linkUpdate
        .transition()
        .duration(duration)
        .attr('d', (d) => this.diagonal(d, d.parent))
        .style('fill', 'none')
        .style('stroke', '#ccc')
        .style('stroke-width', '5px')

        // Remove any exiting links
      link
        .exit()
        .transition()
        .duration(duration)
        .attr('d', (d) => {
          const o = { x: source.x, y: source.y }
          return this.diagonal(o, o)
        })
        .remove()

        // ****************** Link Text section ***************************

        // Update the link text...
      const linkText = this.svg.selectAll('g.link-text').data(links, (d) => d.id)

      // Enter any new link texts at the parent's previous position.
      const linkTextEnter = linkText
        .enter()
        .append('g')
        .attr('class', 'link-text')
        .attr('transform', (d) => {
          console.log('d', d.y, d.x)
          console.log('d.parent', d.parent.y, d.parent.x)
          const midpoint = {
            x: (d.x + d.parent.x) / 2,
            y: (d.y + d.parent.y) / 2
          }
          if (Number.isNaN(midpoint.y)) {
            console.log('NOT A NUMBER!', typeof midpoint.y)
          }
          // return 'translate(' + midpoint.y + ',' + midpoint.x + ')'
          return `translate(${midpoint.y}, ${midpoint.x})`
        })

      linkTextEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('text-anchor', 'middle')
        .text((d) => `${d.parent.data.name} → ${d.data.name}`)

        // Adding a white rectangle behind the text for better readability
      linkTextEnter
        .insert('rect', 'text')
        .attr('x', function () {
          return -this.nextSibling.getBBox().width / 2
        })
        .attr('y', -10)
        .attr('width', function () {
          return this.nextSibling.getBBox().width
        })
        .attr('height', 20)
        .style('fill', 'rgba(255, 255, 255, 0.8)')

        // UPDATE
      const linkTextUpdate = linkTextEnter.merge(linkText)

      // Transition back to the parent element position
      linkTextUpdate
        .transition()
        .duration(duration)
        .attr('transform', (d) => {
          console.log('d', d.y, d.x)
          console.log('d.parent', d.parent.y, d.parent.x)
          const midpoint = {
            x: (d.x + d.parent.x) / 2,
            y: (d.y + d.parent.y) / 2
          }
          if (Number.isNaN(midpoint.y)) {
            console.log('NOT A NUMBER!', typeof midpoint.y)
          }
          // return 'translate(' + midpoint.y + ',' + midpoint.x + ')'
          return `translate(${midpoint.y}, ${midpoint.x})`
        })

        // Remove any exiting link texts
      linkText
        .exit()
        .transition()
        .duration(duration)
        .attr(
          'transform',
          (d) => 'translate(' + source.y + ',' + source.x + ')'
        )
        .remove()

        // ****************** Nodes section ***************************

        // Update the nodes...
      const node = this.svg
        .selectAll('g.node')
        .data(nodes, (d) => d.id || (d.id = ++this.i))

        // Enter any new modes at the parent's previous position.
      const nodeEnter = node
        .enter()
        .append('g')
        .attr('class', 'node')
        .attr(
          'transform',
          (d) => 'translate(' + d.y + ',' + source.x0 + ')'
        )
        .on('click', this.click)

        // Define the filter with colored shadow
        // const svg = d3.select('svg');
      const defs = this.svg.append('defs')

      const filter = defs.append('filter')
        .attr('id', 'drop-shadow')
        .attr('height', '130%')

        // Translate output of the shadow to the right and downwards with 5px
      filter.append('feOffset')
        .attr('in', 'SourceAlpha')
        .attr('dx', 4)
        .attr('dy', 4)
        .attr('result', 'offsetShadow')

        // Use feFlood to set the shadow color
      filter.append('feFlood')
        .attr('flood-color', '#888888') // Set shadow color here
        .attr('flood-opacity', 0.9) // Set shadow opacity here
        .attr('result', 'floodedShadow')

        // Use feComposite to combine the shadow color with the offset
      filter.append('feComposite')
        .attr('in', 'floodedShadow')
        .attr('in2', 'offsetShadow')
        .attr('operator', 'in')
        .attr('result', 'coloredShadow')

        // Merge the colored shadow with the original graphic
      const feMerge = filter.append('feMerge')

      feMerge.append('feMergeNode')
        .attr('in', 'coloredShadow')
      feMerge.append('feMergeNode')
        .attr('in', 'SourceGraphic')

        // Add Square for the nodes
      nodeEnter
        .append('rect')
        .attr('class', 'node')
        .attr('width', 1e-6)
        .attr('height', 1e-6)
        .attr('x', -25)
        .attr('y', -25)
        .attr('rx', 10)
        .attr('ry', 10)
        .style('fill', d => {
          if (d.data.name.length > this.word.length) {
            return '#ff5858'
          } else if (d._children) {
            return 'lightsteelblue'
          } else if (d.children) {
            return '#ccc'
          } else if (this.word === d.data.name) {
            return 'lightgreen'
          } else {
            return 'darkorange'
          }
        })
        .attr('filter', 'url(#drop-shadow)')

        // Add labels for the nodes inside the squares
      nodeEnter
        .append('text')
        .attr('dy', '.35em')
        .attr('x', 0)
        .attr('y', 0)
        .attr('text-anchor', 'middle')
        .style('font-size', '18px')
        .text((d) => d.data.name)
        .attr('cursor', 'pointer')

        // UPDATE
      const nodeUpdate = nodeEnter.merge(node)

      // Transition to the proper position for the node
      nodeUpdate
        .transition()
        .duration(duration)
        .attr('transform', (d) => 'translate(' + d.y + ',' + d.x + ')')

        // Update the node attributes and style
      nodeUpdate
        .select('rect.node')
        .attr('width', function (d) { return Math.max(50, this.nextSibling.getBBox().width + 10) })
        .attr('height', 50)
        .attr('x', function (d) { return -Math.max(25, (this.nextSibling.getBBox().width + 10) / 2) })
        .attr('rx', 10) // Set rounded corners
        .attr('ry', 10) // Set rounded corners
        .style('fill', d => {
          if (d.data.name.length > this.word.length) {
            return '#ff5858'
          } else if (d._children) {
            return 'lightsteelblue'
          } else if (d.children) {
            return '#ccc'
          } else if (this.word === d.data.name) {
            return 'lightgreen'
          } else {
            return 'darkorange'
          }
        })
        .attr('cursor', 'pointer')
        .style('box-shadow', '0 3px 10px #00000033')

        // Remove any exiting nodes
      const nodeExit = node
        .exit()
        .transition()
        .duration(duration)
        .attr(
          'transform',
          (d) => 'translate(' + source.y + ',' + source.x + ')'
        )
        .remove()

      // On exit reduce the node squares size to 0
      nodeExit.select('rect').attr('width', 1e-6).attr('height', 1e-6)

      // On exit reduce the opacity of text labels
      nodeExit.select('text').style('fill-opacity', 1e-6)

      // Preserve the zoom state after updating nodes
      d3.select(this.$refs.treeSvg).call(this.zoom.scaleBy, 1)

      // Store the old positions for transition.
      nodes.forEach((d) => {
        d.x0 = d.x
        d.y0 = d.y
      })
    },

    diagonal (s, d) {
      const path = `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`

      return path
    },

    click (event, d) {
      if (d.children) {
        d._children = d.children
        d.children = null
      } else {
        d.children = d._children
        d._children = null
      }
      console.log(d.ancestors()[1])
      console.log(d.ancestors()[1].children)
      this.update(d)
    },

    collapse (d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(this.collapse)
        d.children = null
      }
    },

    clearTree () {
      d3.select(this.$refs.treeSvg).selectAll('*').remove()
    },

    initializeZoom () {
      this.initialTransform = d3.zoomIdentity.translate(10, 0)
      d3.select(this.$refs.treeSvg).select('g').call(this.zoom.transform, this.initialTransform)
    }

  }
}
</script>

<style scoped>

#tree-diagram {
  width: 100%;
  height: 100%;
  overflow: scroll;
  box-sizing: border-box;
}

.node rect {
  box-shadow: 0 3px 10px #00000033;
  z-index: 100;
}

.node rect:hover {
  box-shadow: 0 3px 10px #00000033;
  opacity: 50%;
}

path {
  fill: none;
  stroke: #ccc;
  stroke-width: 3px;
}

svg#treeSVG {
  display: block;
  min-width: 100.1%;
  min-width: 100.1%;
}

.zoom-buttons {
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  flex-direction: row;
  z-index: 10;
}

.zoom-buttons button {
  margin: 5px 5px;
  padding: 5px 10px;
  background-color: #2e814c;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 3px 3px 1px rgb(0 0 0 / 0.2);
}

.zoom-buttons button:hover {
  background-color: #2e814c;
}

.zoom-buttons button:active {
  transform: translate(3px, 3px);
  box-shadow: 0 0 1px rgb(0 0 0 / 0.2);
  color: rgba(255, 255, 255, 0.651);
}

</style>