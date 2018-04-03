<template>
	<div>
		<app-nav></app-nav>
		<modal></modal>
              <activeServices></activeServices>
		      <services></services>
          <groups></groups>



	</div>
</template>

<script>
import { isAuthed } from '../../utils/apiInterface';
import AppNav from './AppNav';
import Services from './Services';
import activeServices from './ActiveServices';
import groups from './Groups';
export default {
  name: 'admin',
  components: {
    AppNav,
    Services,
    activeServices,
    groups,
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