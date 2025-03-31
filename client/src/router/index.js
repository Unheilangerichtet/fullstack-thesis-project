/* eslint-disable */

import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import Info from '@/components/Info';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/info',
      name: 'Info',
      component: Home,
    }
  ],
  
  /* 
  When clicking on Tiles or the Guide Button, this function is used to create an scrolling effect that brings
  the User to the clicked on info section in a smoth scrolling motion instead of directly jumping to that section
  */
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      // Use custom slow scroll to hash element
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          slowScrollToHash(to.hash, 1000); // 1000ms for slower scroll
          resolve({ x: 0, y: 0 });
        }, 200);
      });
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Helper function for slow scrolling
function slowScrollToHash(hash, duration) {
  const target = document.querySelector(hash);
  if (!target) return;

  const targetPosition = target.getBoundingClientRect().top;
  const startPosition = window.scrollY;
  const startTime = performance.now();

  function scrollAnimation(currentTime) {
    const timeElapsed = currentTime - startTime;
    const run = easeInOutQuad(timeElapsed, startPosition, targetPosition, duration);

    window.scrollTo(0, run);

    if (timeElapsed < duration) {
      requestAnimationFrame(scrollAnimation);
    }
  }

// Easing function for smooth scroll
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}

requestAnimationFrame(scrollAnimation);
}