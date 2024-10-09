<template>
  <div id="tree-diagram">
    <svg id="treeSVG" ref="treeSvg"></svg>
  </div>
</template>

<script>
import * as d3 from 'd3'

export default {
  name: 'TreeDiagram',
  data () {
    return {
      i: 0, // for node IDs
      duration: 750,
      root: null,
      marginX: 220,
      marginY: 200,
      svgWidth: 100,
      svgHeight: 100,
      initialTransform: 1,
      zoom: d3.zoom().on('zoom', this.zoomed),
      recievedTreeData: '',
      maxDepth: 0,
      pathToWord: []
    }
  },
  props: {
    newTreeData: {
      type: String
    },
    word: ''
  },
  watch: {
    newTreeData () {
      this.treeData = JSON.parse(this.newTreeData)
      this.createTreeDiagram()
    }
  },
  methods: {
    onExerciseModeChange () {
      const nodeNamesByDepth = this.getNodeNamesByDepth()
      const pathToWord = this.findPathToWord(this.root, this.word)

      const exerciseData = {
        pathToWord: this.pathToWord,
        nodeNamesByDepth: nodeNamesByDepth
      }
      this.$emit('exercise-data', exerciseData)
      this.$emit('path-to-word', pathToWord)
      this.$emit('node-names-by-depth', nodeNamesByDepth)
    },
    getNodeNamesByDepth () {
      const nodes = d3.hierarchy(this.treeData, (d) => d.children).descendants()
      const nodesByDepth = {}
      nodes.forEach(node => {
        if (!nodesByDepth[node.depth]) {
          nodesByDepth[node.depth] = []
        }
        nodesByDepth[node.depth].push(node.data.name)
      })
      return Object.values(nodesByDepth)
    },
    onLayerChange (direction) {
      const nodes = this.root.descendants()
      const maxDepth = Math.max(...nodes.map(d => d.depth))
      if (direction === -1) {
        nodes.forEach(d => {
          if (d.depth === (maxDepth - 1)) {
            if (d.children) {
              d._children = d.children
              d.children = null
            }
          } else if (d.depth < (maxDepth - 1)) {
            if (d._children) {
              d.children = d._children
              d._children = null
            }
          }
        })
      } else if (direction === 1) {
        nodes.forEach(d => {
          if (d.depth <= maxDepth + 1) {
            if (d._children) {
              d.children = d._children
              d._children = null
            }
          } else {
            if (d.children) {
              d._children = d.children
              d.children = null
            }
          }
        })
      }
      this.update(this.root)
    },
    zoomed (event) {
      d3.select(this.$refs.treeSvg).select('g').attr('transform', event.transform)
    },
    resetZoom () {
      d3.select(this.$refs.treeSvg).transition().duration(200).call(this.zoom.transform, this.initialTransform)
    },
    createTreeDiagram () {
      d3.select(this.$refs.treeSvg).selectAll('*').remove()
      d3.select(this.$refs.treeSvg).call(this.zoom).on('dblclick.zoom', null)

      this.treeContainerWidth = d3.select('#tree-diagram').node().getBoundingClientRect().width
      this.treeContainerHeight = d3.select('#tree-diagram').node().getBoundingClientRect().height

      this.svg = d3
        .select(this.$refs.treeSvg)
        .attr('width', this.treeContainerWidth)
        .attr('height', this.treeContainerHeight)
        .append('g')

      this.root = d3.hierarchy(this.treeData, (d) => d.children)
      this.root.x0 = this.treeContainerHeight / 2
      this.root.y0 = 100

      this.pathToWord = this.findPathToWord(this.root, this.word)
      const nodeNamesByDepth = this.getNodeNamesByDepth()
      // const pathToWord = this.findPathToWord(this.root, this.word)

      const exerciseData = {
        pathToWord: this.pathToWord,
        nodeNamesByDepth: nodeNamesByDepth
      }
      this.$emit('exercise-data', exerciseData)

      if (this.root.children) {
        this.collapse(this.root)
      }

      this.update(this.root)
      // this.resetZoom()
    },
    update (source) {
      const treeData = d3.tree().nodeSize([60, 50])(this.root)
      const duration = this.duration
      const nodes = treeData.descendants()
      const links = treeData.descendants().slice(1)

      // Properly adjust vertical (x) and horizontal (y) positioning with margins
      const initialSpacing = 180
      nodes.forEach((d) => {
        d.y = d.depth * this.marginX + 30
        d.x = (d.x / initialSpacing) * this.marginY
      })

      // Calculate the maximum and minimum x positions to center the tree vertically
      const minX = Math.min(...nodes.map(d => d.x))
      const maxX = Math.max(...nodes.map(d => d.x))
      const treeHeight = maxX - minX

      // Update the width of the SVG dynamically based on tree depth
      const maxDepth = Math.max(...nodes.map(d => d.depth))
      this.maxDepth = maxDepth

      // Center the tree vertically and shift to the right
      const verticalShift = (this.treeContainerHeight - treeHeight) / 2 - minX

      nodes.forEach(d => {
        d.x += verticalShift // Center the tree vertically
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
        .style('stroke', d => {
          return this.pathToWord.includes(d.parent.data.name) && this.pathToWord.includes(d.data.name) ? '#2e814c90' : '#ccc'
        })
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
          const midpoint = {
            x: (d.x + d.parent.x) / 2,
            y: (d.y + d.parent.y) / 2
          }
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
          const midpoint = {
            x: (d.x + d.parent.x) / 2,
            y: (d.y + d.parent.y) / 2
          }
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
            return '#070087'
          } else if (d.children) {
            return '#232323'
          } else if (this.word === d.data.name) {
            return '#00883A'
          } else {
            return '#870A00'
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
        .style('font-weight', '600')
        .style('fill', '#f5f5f5')
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
        .attr('rx', 50) // Set rounded corners
        .attr('ry', 50) // Set rounded corners
        .style('fill', d => {
          if (d.data.name.length > this.word.length) {
            return '#ff5858'
          } else if (d._children) {
            return '#070087'
          } else if (d.children) {
            return '#232323'
          } else if (this.word === d.data.name) {
            return '#00883A'
          } else {
            return '#870A00'
          }
        })
        .attr('cursor', 'pointer')
        .style('box-shadow', '0 3px 10px #232323')

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
      this.update(d)
    },
    collapse (d) {
      if (d.children) {
        d._children = d.children
        d._children.forEach(this.collapse)
        d.children = null
      }
    },
    findPathToWord (root, word) {
      const path = []
      function traverse (node) {
        path.push(node.data.name)
        if (node.data.name === word) {
          return true
        }
        if (node.children) {
          for (const child of node.children) {
            if (traverse(child)) {
              return true
            }
          }
        }
        path.pop()
        return false
      }
      traverse(root)
      return path
    }
  }
}
</script>

<style scoped>

#tree-diagram {
  width: 100%;
  height: 100%;
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
  min-width: 100%;
  min-width: 100%;
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
