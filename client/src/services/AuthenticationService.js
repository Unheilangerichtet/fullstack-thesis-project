import Api from '@/services/Api';

//Export an object that has a register method to it
export default {
  register(credentials) {
    return Api().post('register', credentials);
  },
};

/* 
This is how the method can be called from another file, if it is imported:

AuthenticationService.register({
  email: 'maxmustermann@gmail.com',
  password: 'password123'
})
*/
