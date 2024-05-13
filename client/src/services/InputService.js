import Api from '@/services/Api'

// Export an object that has a register method to it
export default {
  sendInput () {
    console.log('Input function in service was called!')
    return Api().get('/input')
  }
}
