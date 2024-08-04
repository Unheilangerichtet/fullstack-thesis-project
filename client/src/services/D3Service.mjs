import * as d3 from 'd3'

function createD3Hierarchy (input) {
  // Parse the relations string into an array of relations
  const relationsArray = JSON.parse(input.relations)

  // Parse the relations array into an csv string
  let relationsCSV = relationsArray.join('\n')

  // firstRowCSV adds the names of the colums and the parent node !!! TODO: Parent Node must be changeable !!!
  const firstRowCSV = 'child,parent\nS,\n'
  relationsCSV = firstRowCSV.concat(relationsCSV)

  const links = d3.csvParse(relationsCSV)
  links.forEach((node) => {
    if (node.parent === '') {
      node.parent = null
    }
  })

  let childColumn = links.columns[0]
  let parentColumn = links.columns[1]

  const myRoot = d3
    .stratify()
    .id((d) => d[childColumn])
    .parentId((d) => d[parentColumn])(links)

  myRoot.each((d) => {
    delete d.parent
    delete d.data
    delete d.height
    delete d.depth
  })

  console.log('relationsArray:', relationsArray) // Debugging
  console.log(`relationsCSV:\n${relationsCSV}`) // Debugging
  console.log('links:', links) // Debugging
  // console.log('myRoot String:', JSON.stringify(myRoot, null, 2))

  return myRoot
}

// Example usage:
const input = {
  result: true,
  relations:
    '["ababa,aVaba","aVba,aVa","aaaba,aVaba","aVa,S","aVbba,aVba","aabba,aVbba","abaaa,aVaaa","aabaa,aVbaa","aVaa,aVa","aaa,aVa","aba,aVa","aVaaa,aVaa","abaa,aVaa","aVaba,aVba","aaba,aVba","abbaa,aVbaa","aaaaa,aVaaa","aaaa,aVaa","abba,aVba","abbba,aVbba","aVbaa,aVaa"]'
}

const hierarchyTree = createD3Hierarchy(input)
console.log(JSON.stringify(hierarchyTree, null, 2)) // Debugging
