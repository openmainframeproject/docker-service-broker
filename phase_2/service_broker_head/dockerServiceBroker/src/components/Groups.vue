<template>
  <div>
     <modal v-if="showModal"> 
      <div slot="body">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title"> {{ modalGroup.name }} </h3>
            </div>
            <div class="panel-body">
              <p><span class="badge alert-info"> Description: </span> {{ modalGroup.description }} </p>
              <hr>
              <div v-for="field in JSON.parse(modalGroup.fields)">
              <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> {{ field.label }} </label> <input v-model="field.value" style="display:inline;float:right" type="input" :placeholder="field.placeholder" :name="field.name">
            </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
       <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
       <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">
         Submit
       </button>
      </div>
    </modal>
    <h3 class="text-center">Groups</h3>
    <div class="search-wrapper">
    <input style="text-align:center;border-radius:10px;" type="text" v-model="search" placeholder="Search groups..."/>
  </div>
    <hr/>
    <div class="col-sm-12" v-for="group in filteredList.slice(0,6)">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ group.name }} </h3>
        </div>
        <div class="panel-body">
          <p><span class="badge alert-info"> Description: </span> {{ group.description }} </p>
          <hr>
          <div class="col-sm-12">
          <span style="margin:auto;">
          <div class="col-sm-4" v-for="service in group.services.slice(0,3)">
            <div class="panel panel-default">
              <div class="panel-heading">
                <h3 class="panel-title"> {{ service.name }} </h3>
              </div>
              <div class="panel-body">
                <p><span class="badge alert-info"> Description: </span> {{ service.description }} </p>
                <p><span class="badge alert-info"> Version: </span> {{ service.version }} </p>
                <hr>
                <p><button style="float:left" @click="populateModal(service)" class="btn btn-info log">Launch Service</button></p>
                <p><button style="float:right;" class="btn btn-info log">Modify Service</button></p>
              </div>
            </div>
          </div>
        </span>
        </div>
          <hr>
          <p><button style="float:left" @click="populateModal(group)" class="btn btn-info log">Launch Group</button></p>
          <p><button style="float:right;" class="btn btn-info log">Modify Group</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getGroups, startGroup } from '../../utils/apiInterface';
import Modal from './Modal';
export default {
  name: 'groups',
  data() {
    return {
      showModal:false,
      groups: [],
      search: '',
      modalGroup: '',
    };
  },
  components:{
    Modal
  },
  methods: {
    // isLoggedIn() {
    //   return isLoggedIn();
    // },
    closeModal(){
      this.showModal=false;
    },
    populateModal(group){
      this.modalGroup = group;
      this.showModal=true;
    },
    submitAndClose(){
      startGroup(this.modalGroup);
      this.showModal=false;
      this.modalGroup='';
      location.reload();
    },
    getGroup() {
      const thisClass = this;
      function set(data){
        thisClass.groups =data.data;
      }
      getGroups().then(set);

    },
  },
  mounted() {
    this.getGroup();
  },
  computed: {
    filteredList() {
      return this.groups.filter(group => {
        return (group.name.toLowerCase()+" "+group.description.toLowerCase()).includes(this.search.toLowerCase())
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>