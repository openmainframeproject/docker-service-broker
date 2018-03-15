<template>
  <div>
  <modal></modal>
  <app-nav></app-nav>
  <activeServices></activeServices>
  <services></services>
</div>
</template>

<script>
import { getActiveServices } from '../../utils/apiInterface';
import AppNav from './AppNav';
import Services from './Services';
import activeServices from './ActiveServices';
export default {
  name: 'homepage',
  components: {
    AppNav,
    Services,
    activeServices,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>