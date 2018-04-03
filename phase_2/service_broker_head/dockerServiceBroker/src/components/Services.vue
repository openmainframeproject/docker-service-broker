<template>
  <div>
     <modal v-if="showModal"> 
      <div slot="body">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title"> {{ modalService.name }} </h3>
            </div>
            <div class="panel-body">
              <p><span class="badge alert-info"> Description: </span> {{ modalService.description }} </p>
              <hr>
              <div v-for="field in JSON.parse(modalService.fields)">
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
    <h3 class="text-center">Services Available</h3>
    <div class="search-wrapper">
    <input style="text-align:center;border-radius:10px;" type="text" v-model="search" placeholder="Search services..."/>
  </div>
    <hr/>
    <div class="col-sm-4" v-for="service in filteredList.slice(0,6)">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ service.name }} </h3>
        </div>
        <div class="panel-body">
          <p><span class="badge alert-info"> Description: </span> {{ service.description }} </p>
          <p><span class="badge alert-info"> Version: </span> {{ service.version }} </p>
          <hr>
          <p><button style="float:left" @click="populateModal(service)" class="btn btn-info log">Launch Service</button></p>
          <p><button style="float:right;" @click="addGroup(service)" class="btn btn-info log">Add to Group</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { addToGroup, getGroups, getServices, startService } from '../../utils/apiInterface';
import Modal from './Modal';
export default {
  name: 'services',
  data() {
    return {
      showModal:false,
      services: [],
      search: '',
      modalService: '',
      groups:""
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
    addGroup(service){
      var string=""
      for (var i=0;i<this.groups.length;i++){
        var group = this.groups[i];
        string+=group.ID+" - "+group.name+"\n"
      }
      string+="Pick a group ID:"
      var groupID = prompt(string)
      addToGroup({"group_id":groupID, "service_id":service.ID})
    },
    populateModal(service){
      this.modalService = service;
      this.showModal=true;
    },
    submitAndClose(){
      startService(this.modalService);
      this.showModal=false;
      this.modalService='';
      location.reload();
    },
    getServ() {
      const thisClass = this;
      function set(data){
        thisClass.services=data.data;
      }
      getServices().then(set);
    },
    getGr() {
      const thisClass = this;
      function set(data){
        thisClass.groups=data.data;
      }
      getGroups().then(set);
    },

  },
  mounted() {
    this.getServ();
    this.getGr();
  },
  computed: {
    filteredList() {
      return this.services.filter(serv => {
        return (serv.name.toLowerCase()+" "+serv.description.toLowerCase()).includes(this.search.toLowerCase())
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>