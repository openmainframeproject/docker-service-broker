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
              <div v-for="field in modalService.fields">
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
          <p><button style="width:100%;" @click="populateModal(service)" class="btn btn-info log">Launch Service</button></p>
          <p><button style="float:right;" @click="addGroup(service)" class="btn btn-info log">Add to Group</button></p>
          <p><button style="float:left" @click="deleteService(service)" class="btn btn-info log">Delete Service</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeService, addToGroup, getGroups, getServices, startService } from '../../utils/apiInterface';
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
      var string="Groups:\n"
      for (var i=0;i<this.groups.length;i++){
        var group = this.groups[i];
        string+=group.name+"\n"
      }
      string+="-----\n"
      string+="Pick a group:"
      var groupName = prompt(string)
      var groupID=-1
      for (var i=0;i<this.groups.length;i++){
        if (groupName===this.groups[i].name){
          groupID=this.groups[i].ID
        }
      }
      if (groupID!=-1){
      addToGroup({"group_id":groupID, "service_id":service.ID})
      alert("Added!");
      setTimeout(location.reload.bind(location), 1000);
      }else{
        alert("No such group.")
      }
    },
    deleteService(service){
      if (confirm("Are you sure you want to delete this service?")){
        removeService(service);
        setTimeout(location.reload.bind(location), 1000);
      }else{
        return;
      }

    },
    populateModal(service){
      var res = JSON.parse(service.fields);
      if (Object.prototype.toString.call(res) === "[object Object]"){
        service.fields=[res];        
      }else{
        service.fields=res;
      }
      this.modalService = service;
      this.showModal=true;
    },
    submitAndClose(){
      startService(this.modalService);
      this.showModal=false;
      this.modalService='';
      setTimeout(location.reload.bind(location), 1000);;
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
