/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Input from '@/components/Input';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/input',
      name: 'input',
      component: Input,
    },
  ],
  // mode: 'history', -> use this to remove /#/ from the url
});
