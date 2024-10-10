// import Api from '@/services/Api'

export default {
  isInputValid (variables, alphabet, productions, startsymbol, word) {
    // check if variables are valid
    const variableValidity = this.areVariablesValid(variables)
    console.log(variableValidity)
    // check if alphabet is valid
    const alphabetValidity = this.isAlphabetValid(alphabet)
    console.log(alphabetValidity)
    // check if productions are valid
    const productionsValidity = this.areProductionsValid(productions)
    console.log(productionsValidity)
    // check if startsymbol is valid
    const startsymbolValidity = this.isStartsymbolValid(startsymbol)
    console.log(startsymbolValidity)
    // check if word is valid
    const wordValidity = this.isWordValid(word, alphabet)
    console.log(wordValidity)
  },

  areVariablesValid (variables) {
    if (variables === '') {
      return [false, 'the variables are missing!']
    }
    const regex = /[^,\s][^,]*[^,\s]*/g
    const variableArray = variables.match(regex) || []
    for (let variable in variableArray) {
      if (!(variable.length === 1)) {
        return {
          status: false,
          message: `the variable '${variable}' is not valid, it is to long! variables must be of length 1`
        }
      }
    }
    return {
      // validity; true
      status: true,
      message: 'the variables are valid!'
    }
  },

  isAlphabetValid (alphabet) {
    if (alphabet === '') {
      return [false, 'the alphabet is missing!']
    }
    const regex = /[^,\s][^,]*[^,\s]*/g
    const alphabetArray = alphabet.match(regex) || []
    for (let letter of alphabetArray) {
      if (letter.length !== 1) {
        return {
          status: false,
          message: `the letter '${letter}' is not valid, it is to long! letters must be of length 1`
        }
      }
    }
    return {
      status: true,
      message: 'the alphabet is valid!'
    }
  },

  areProductionsValid (productions) {
    if (productions === '') {
      return [false, 'the productions are missing!']
    }
    productions = productions.replace(/\s+/g, '')
    const rules = productions.split(',').map((rule) => rule.split('->'))
    for (let rule of rules) {
      if (rule[0] === '' || rule[1] === '' || rule[0] === rule[1]) {
        return {
          status: false,
          message: `The rule "${rule}" is not valid!`
        }
      }
      if (rule[0].length > rule[1].length) {
        return {
          status: false,
          message: `The production '${rule[0]}'->'${rule[1]}' is not valid! productions from Typ 1 Grammars cannot have a left side which is longer then the right side!`
        }
      }
    }
    return {
      status: true,
      message: 'The productions are valid!'
    }
  },

  isStartsymbolValid (startsymbol) {
    if (startsymbol === '') {
      return [false, 'the startsymbol is missing']
    } else if (startsymbol.length !== 1) {
      return {
        status: false,
        message: `the startsymbol '${startsymbol}' is not valid! startsymbols must be of length 1`
      }
    }
    return {
      status: true,
      message: 'the startsymbol is valid!'
    }
  },

  isWordValid (word, alphabet) {
    if (word === '') {
      return {
        status: false,
        message: 'the word is missing!'
      }
    }
    for (let char of word) {
      if (!alphabet.includes(char)) {
        return {
          status: false,
          message: `the word '${word}' is not valid, the alphabet does not contain the letter '${char}'`
        }
      }
    }
    return {
      status: true,
      message: `the word "${word}" is valid!`
    }
  },

  formatProductionInput (input) {
    return input
      .replace(/\s+/g, '')
      .replace(/(->[^,]*(?=->|$))/g, '$1,')
      .replace(/,+$/, '')
  },

  formatVariablesInput (input) {
    return input
      .replace(/\s+/g, '') // Remove all spaces and newlines
      .replace(/,+/g, ',') // Ensure no multiple consecutive commas
      .replace(/^,|,$/g, '') // Remove any leading or trailing commas
      // .toUpperCase() // Convert everything to uppercase
      // .replace(/[^A-Z,]/g, '') // Remove anything that is not an uppercase letter or a comma
  },

  formatAlphabet (input) {
    return input
      .replace(/\s+/g, '') // Remove all spaces and newlines
      .replace(/,+/g, ',') // Ensure no multiple consecutive commas
      .replace(/^,|,$/g, '') // Remove any leading or trailing commas
  },

  formatWord (input) {
    return input
      .replace(/\s+/g, '') // Remove all spaces and newlines
  }
}
