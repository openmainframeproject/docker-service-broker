<template>
  <div>
  <app-nav></app-nav>
  <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> Login </h3>
        </div>
        <div class="panel-body">
          <label style="display:block;margin:1em">Username: &nbsp;<input style="border-radius: 10px" v-model="username" type="input" name="username"></label>
          <label style="display:block;margin:1em">Password: &nbsp;<input style="border-radius: 10px" v-model="password" type="password" name="password"></label>
          <hr>
          <p><button style="float:right;" @click="login()" class="btn btn-info log">Login</button></p>
        </div>
  </div>
</div>
</template>

<script>
import { isAuthed, getActiveServices } from '../../utils/apiInterface';
import AppNav from './AppNav';
export default {
  name: 'login',
  data() {
    return{
      username: "",
      password: "",
      auth: false,
    }
  },
  components: {
    AppNav,
  },
  methods:{
    login(){
      document.cookie="auth="+btoa(this.username+":"+this.password)+";"
      const thisClass = this;
      function set(data){
        thisClass.auth = data.data.auth;
      }
      isAuthed().then(set).then(function(){
        if (thisClass.auth){
        window.location.href="/dashboard";
      }else{
        alert("Invalid Auth Attempt");
        window.location.href="/";
      }
      });
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>