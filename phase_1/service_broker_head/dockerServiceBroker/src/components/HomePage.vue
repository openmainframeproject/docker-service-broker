<template>
  <div>
  <modal></modal>
  <app-nav></app-nav>
  <activeServices></activeServices>
  <services></services>
</div>
</template>

<script>
import { isAuthed } from '../../utils/apiInterface';
import AppNav from './AppNav';
import Services from './Services';
import activeServices from './ActiveServices';
export default {
  name: 'homepage',
  components: {
    AppNav,
    Services,
    activeServices,
  },
  data(){
  },
  methods:{
    isLoggedIn() {
      isAuthed().then(function(data){
        if (!data.data.auth){
          window.location.href="/";
        }
      });
    },
  },
  created(){
    this.isLoggedIn();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>