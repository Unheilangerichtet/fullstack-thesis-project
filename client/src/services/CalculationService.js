export default {
  areVariablesValid (variables) {
    if (variables === '') {
      return {
        status: false,
        messageEN: 'Variables are missing!',
        messageDE: 'Variablen fehlen!'
      }
    }
    const regex = /[^,\s][^,]*[^,\s]*/g
    const variableArray = variables.match(regex) || []
    for (let variable of variableArray) {
      if (variable.length !== 1) {
        return {
          status: false,
          messageEN: `Variable '${variable}' is invalid! Variables must be single characters.`,
          messageDE: `Variable '${variable}' ist ungültig! Variablen müssen Einzelzeichen sein.`
        }
      }
    }
    return {
      status: true,
      messageEN: 'Variables are valid!',
      messageDE: 'Variablen sind gültig!'
    }
  },

  isAlphabetValid (alphabet) {
    if (alphabet === '') {
      return {
        status: false,
        messageEN: 'Alphabet is missing!',
        messageDE: 'Alphabet fehlt!'
      }
    }
    const regex = /[^,\s][^,]*[^,\s]*/g
    const alphabetArray = alphabet.match(regex) || []
    for (let letter of alphabetArray) {
      if (letter.length !== 1) {
        return {
          status: false,
          messageEN: `Symbol '${letter}' is invalid! Alphabet symbols must be single characters.`,
          messageDE: `Symbol '${letter}' ist ungültig! Alphabetzeichen müssen Einzelzeichen sein.`
        }
      }
    }
    return {
      status: true,
      messageEN: 'Alphabet is valid!',
      messageDE: 'Alphabet ist gültig!'
    }
  },

  areProductionsValid (productions, alphabet, variables) {
    if (productions === '') {
      return {
        status: false,
        messageEN: 'Productions are missing!',
        messageDE: 'Produktionen fehlen!'
      }
    }
    productions = productions.replace(/\s+/g, '')
    const rules = productions.split(',').map(rule => rule.split('->'))

    const validSymbols = new Set([...alphabet.split(','), ...variables.split(',')])

    for (let rule of rules) {
      if (!rule[0] || !rule[1]) {
        return {
          status: false,
          messageEN: `Invalid rule format! Use "X->Y" format.`,
          messageDE: `Ungültiges Regelformat! Verwende "X->Y" Format.`
        }
      }
      if (rule[0].length > rule[1].length) {
        return {
          status: false,
          messageEN: `Production '${rule[0]}->${rule[1]}' is invalid! Left side cannot be longer than right side in Type 1 grammars.`,
          messageDE: `Produktion '${rule[0]}->${rule[1]}' ist ungültig! Die linke Seite darf bei Typ-1-Grammatiken nicht länger als die rechte sein.`
        }
      }
      for (let symbol of rule[0] + rule[1]) {
        if (!validSymbols.has(symbol)) {
          return {
            status: false,
            messageEN: `Symbol '${symbol}' in production '${rule[0]}->${rule[1]}' is not in alphabet or variables.`,
            messageDE: `Symbol '${symbol}' in Produktion '${rule[0]}->${rule[1]}' ist nicht im Alphabet oder den Variablen enthalten.`
          }
        }
      }
    }
    return {
      status: true,
      messageEN: 'Productions are valid!',
      messageDE: 'Produktionen sind gültig!'
    }
  },

  isStartsymbolValid (startsymbol) {
    if (startsymbol === '') {
      return {
        status: false,
        messageEN: 'Start symbol is missing!',
        messageDE: 'Startsymbol fehlt!'
      }
    } else if (startsymbol.length !== 1) {
      return {
        status: false,
        messageEN: `Start symbol '${startsymbol}' must be a single character!`,
        messageDE: `Startsymbol '${startsymbol}' muss ein einzelnes Zeichen sein!`
      }
    }
    return {
      status: true,
      messageEN: 'Start symbol is valid!',
      messageDE: 'Startsymbol ist gültig!'
    }
  },

  isWordValid (word, alphabet) {
    if (word === '') {
      return {
        status: false,
        messageEN: 'Word is missing!',
        messageDE: 'Wort fehlt!'
      }
    }
    for (let char of word) {
      if (!alphabet.includes(char)) {
        return {
          status: false,
          messageEN: `Word contains invalid character '${char}'!`,
          messageDE: `Wort enthält ungültiges Zeichen '${char}'!`
        }
      }
    }
    if (word.length > 8) {
      return {
        status: false,
        messageEN: 'Word is too long! Maximum length is 8 characters due to algorithm complexity.',
        messageDE: 'Wort ist zu lang! Maximale Länge ist 8 Zeichen wegen Algorithmus-Komplexität.'
      }
    }
    return {
      status: true,
      messageEN: `Word "${word}" is valid!`,
      messageDE: `Wort "${word}" ist gültig!`
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
