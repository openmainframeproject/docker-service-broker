<template>
  <nav class="navbar navbar-default">
    <div class="navbar-header">
      <router-link to="/" class="navbar-brand"> MicroServices Controller</router-link>
    </div>
    <ul class="nav navbar-nav navbar-right">
      <li>
        <button class="btn btn-danger log" v-show="isLogged" @click="dashboard()">Dashboard</button>
        <button class="btn btn-danger log" v-show="isLogged" @click="handleLogout()">Log out</button>
        <button class="btn btn-info log" v-show="!isLogged" @click="handleLogin()">Log In</button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { isAuthed } from '../../utils/apiInterface';

export default {
  name: 'app-nav',
  data() {
      return{
        isLogged: false,
      }
  },
  methods: {
    handleLogout(){
      document.cookie="auth=;"
      window.location.href="/";
    },
    handleLogin(){
      window.location.href="/";
    },
    dashboard(){
      window.location.href="/dashboard";
    },
    isLoggedIn() {
      const thisClass = this;
      function set(data){
        thisClass.isLogged=data.data.auth;
      }
      var j=isAuthed().then(set);
    },
  },
  mounted(){
      this.isLoggedIn();
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar-right { margin-right: 0px !important}

.log {
  margin: 5px 10px 0 0;
}
</style>
