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
          vaidity: false,
          message: `the variable ${variable} is not valid, it is to long! variables must be of length 1`
        }
      }
    }
    return {
      validity: true,
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
          validity: false,
          message: `the letter ${letter} is not valid, it is to long! letters must be of length 1`
        }
      }
    }
    return {
      validity: true,
      message: 'the alphabet is valid!'
    }
  },

  areProductionsValid (productions) {
    if (productions === '') {
      return [false, 'the productions are missing!']
    }
    const rules = productions.split(',').map((rule) => rule.split('->'))
    for (let rule of rules) {
      if (rule[0] === '' || rule[1] === '' || rule[0] === rule[1]) {
        return [false, `The rule "${rule}" is not valid!`]
      }
      if (rule[0].length > rule[1].length) {
        return [
          false,
          `The rule ${rule} is not valid! productions from Typ 1 Grammars cannot have a left side which is longer then the right side!`
        ]
      }
    }
    return [true, 'The productions are valid!']
  },

  isStartsymbolValid (startsymbol) {
    if (startsymbol === '') {
      return [false, 'the startsymbol is missing']
    } else if (startsymbol.length !== 1) {
      return [
        false,
        `the startsymbol "${startsymbol}" is not valid! startsymbols must be of length 1`
      ]
    }
    return [true, 'the startsymbol is valid!']
  },

  isWordValid (word, alphabet) {
    if (word === '') {
      return [false, 'the word is missing!']
    }
    for (let char of word) {
      if (!alphabet.includes(char)) {
        return [
          false,
          `the word "${word}" is not valid! the alphabet does not contain ${char}!`
        ]
      }
    }
    return [true, `the word "${word}" is valid!`]
  }
}
