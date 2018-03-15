import Vue from 'vue';
import Router from 'vue-router';
import Services from '@/components/Services';
import ActiveServices from '@/components/ActiveServices';
import HomePage from '@/components/HomePage';
import Login from '@/components/Login';

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/dashboard',
      name: 'homepage',
      component: HomePage
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },

  ]
})
