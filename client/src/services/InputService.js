import Api from '@/services/Api'

// Export an object that has a register method to it
export default {
  async sendInput (productionsValue, startsymbolValue, wordValue) {
    const data = {
      startSymbol: String(startsymbolValue),
      productions: String(productionsValue),
      word: String(wordValue)
    }

    try {
      const response = await Api().post('/input', data)
      console.log('Result from server:', response.data)
      return response.data
    } catch (error) {
      console.error('An error has occurred:', error)
      throw error
    }
  }
}
