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
      <!-- <button @click="zoomed">Zoomed</button> -->
    </div>
    <svg id="treeSVG" ref="treeSvg" :width="svgWidth"></svg>
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
      svgWidth: 100,
      svgHeight: 100,
      initialTransform: null,
      zoom: d3.zoom().on('zoom', this.zoomed),
      zoomInIcon: require('../assets/icons/zoom_in.svg'),
      zoomOutIcon: require('../assets/icons/zoom_out.svg'),
      resetZoomIcon: require('../assets/icons/restart_alt.svg'),
      recievedTreeData: '', // workinprogress
      treeData: {
        'name': 'Root',
        'children': [
          {
            'name': 'Child 1',
            'children': [
              {
                'name': 'Child 1.1',
                'children': [
                  { 'name': 'Child 1.1.1' },
                  { 'name': 'Child 1.1.2',
                    'children': [
                      { 'name': 'Child 1.1.2.1' },
                      { 'name': 'Child 1.1.2.2' }
                    ]
                  }
                ]
              },
              { 'name': 'Child 1.2',
                'children': [
                  { 'name': 'Child 1.1.2.1' },
                  { 'name': 'Child 1.1.2.2' }
                ]
              }
            ]
          },
          {
            'name': 'Child 2',
            'children': [
              { 'name': 'Child 2.1' },
              { 'name': 'Child 2.2' }
            ]
          }
        ]
      }
    }
  },
  props: {
    newTreeData: {
      type: String
    }
  },
  watch: {
    newTreeData () {
      console.log('newTreeData in TreeDiagram.vue:', this.newTreeData)
      this.treeData = JSON.parse(this.newTreeData)
      this.createTreeDiagram()
    }
  },
  methods: {

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
      // Clear the previous tree
      d3.select(this.$refs.treeSvg).selectAll('*').remove()
      // Set the dimensions and margins of the diagram
      const margin = { top: 10, right: 10, bottom: 10, left: 10 }
      const treeContainerWidth = d3.select('#tree-diagram').node().getBoundingClientRect().width
      const treeContainerHeight = d3.select('#tree-diagram').node().getBoundingClientRect().height

      // Append the svg object to the body of the page
      // Moves the svg group to the top left margin
      const svg = d3
        .select(this.$refs.treeSvg)
        .attr('width', treeContainerWidth)
        .attr('height', treeContainerHeight)
        .append('g')
        .call(d3.zoom().on('zoom', (event) => {
          g.attr('transform', event.transform)
        }))

      const g = svg.append('g')

      // Global variables for node IDs and animation duration
      let i = 0
      let duration = 750
      let root

      // ****************** Zoom section ***************************
      // Initialize initialTransform
      this.initialTransform = d3.zoomIdentity.translate(margin.left, 0)
      // Apply initial transform
      svg.call(this.zoom.transform, this.initialTransform)

      // update function
      const update = (source) => {
        // Remove existing nodes and links
        g.selectAll('.link').remove()
        g.selectAll('.link-text').remove()
        g.selectAll('.node').remove()

        // Assigns the x and y position for the nodes
        const treeData = treemap(root)

        // Compute the new tree layout.
        const nodes = treeData.descendants()
        const links = treeData.descendants().slice(1)

        // Normalize for fixed-depth.
        nodes.forEach((d) => {
          d.y = d.depth * 220 + 20
        })

        // Dynamically calculate the width based on the tree depth and node/link sizes
        const maxDepth = Math.max(...nodes.map(d => d.depth))
        const dynamicWidth = margin.left + margin.right + (220 + 20) * maxDepth

        // Update the SVG width attribute
        this.svgWidth = dynamicWidth < treeContainerWidth ? treeContainerWidth + 10 : dynamicWidth
        console.log('this.svgWidth:', this.svgWidth)

        // ****************** Links section ***************************

        // Update the links...
        const link = svg.selectAll('path.link').data(links, (d) => d.id)

        // Enter any new links at the parent's previous position.
        const linkEnter = link
          .enter()
          .insert('path', 'g')
          .attr('class', 'link')
          .attr('d', (d) => {
            const o = { x: source.x0, y: source.y0 }
            return diagonal(o, o)
          })

        // UPDATE
        const linkUpdate = linkEnter.merge(link)

        // Transition back to the parent element position
        linkUpdate
          .transition()
          .duration(duration)
          .attr('d', (d) => diagonal(d, d.parent))
          .style('fill', 'none')
          .style('stroke', '#ccc')
          .style('stroke-width', '5px')

        // Remove any exiting links
        // const linkExit =
        link
          .exit()
          .transition()
          .duration(duration)
          .attr('d', (d) => {
            const o = { x: source.x, y: source.y }
            return diagonal(o, o)
          })
          .remove()

        // ****************** Link Text section ***************************

        // Update the link text...
        const linkText = svg.selectAll('g.link-text').data(links, (d) => d.id)

        // Enter any new link texts at the parent's previous position.
        const linkTextEnter = linkText
          .enter()
          .append('g')
          .attr('class', 'link-text')
          .attr('transform', (d) => {
            const midpoint = {
              x: (d.x + d.parent.x) / 2,
              y: (d.y + d.parent.y) / 2
            }
            return 'translate(' + midpoint.y + ',' + midpoint.x + ')'
          })

        linkTextEnter
          .append('text')
          .attr('dy', '.35em')
          .attr('text-anchor', 'middle')
          .text((d) => `${d.data.name} → ${d.parent.data.name}`)

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
            const midpoint = {
              x: (d.x + d.parent.x) / 2,
              y: (d.y + d.parent.y) / 2
            }
            return 'translate(' + midpoint.y + ',' + midpoint.x + ')'
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
        const node = svg
          .selectAll('g.node')
          .data(nodes, (d) => d.id || (d.id = ++i))

        // Enter any new modes at the parent's previous position.
        const nodeEnter = node
          .enter()
          .append('g')
          .attr('class', 'node')
          .attr(
            'transform',
            (d) => 'translate(' + d.y + ',' + source.x0 + ')'
          )
          .on('click', click)

        // Define the filter with colored shadow
        // const svg = d3.select('svg');
        const defs = svg.append('defs')

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
          .attr('rx', 10) // Set rounded corners
          .attr('ry', 10) // Set rounded corners
          .style('fill', d => {
            if (d.data.name.length > 4) {
              return '#ff5858'
            } else if (d._children) {
              return 'lightsteelblue'
            } else if (d.children) {
              return '#ccc'
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
            if (d.data.name.length > 10) {
              return '#ff5858'
            } else if (d._children) {
              return 'lightsteelblue'
            } else if (d.children) {
              return '#ccc'
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

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal (s, d) {
          const path = `M ${s.y} ${s.x}
                  C ${(s.y + d.y) / 2} ${s.x},
                    ${(s.y + d.y) / 2} ${d.x},
                    ${d.y} ${d.x}`

          return path
        }

        // Toggle children on click.
        function click (event, d) {
          if (d.children) {
            d._children = d.children
            d.children = null
          } else {
            d.children = d._children
            d._children = null
          }
          update(d)
        }
      }
      // Create a tree layout and set the size
      const treemap = d3.tree().size([treeContainerHeight, treeContainerWidth])

      root = d3.hierarchy(this.treeData, (d) => d.children)
      root.x0 = treeContainerHeight / 2
      root.y0 = 20

      if (root.children) {
        root.children.forEach(collapse)
      }

      update(root)
      this.resetZoom()

      // Collapse the node and all its children
      function collapse (d) {
        if (d.children) {
          d._children = d.children
          d._children.forEach(collapse)
          d.children = null
        }
      }
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
