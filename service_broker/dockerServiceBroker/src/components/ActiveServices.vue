<template>
  <div style="width:100%;display:inline-block">
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
          <div style="display:block; height:3rem;">
          <label style="display:inline;float:left"> {{ field.label}} </label> <input :value="field.value" style="display:inline;float:right" type="input" disabled :placeholder="field.placeholder" :name="field.name">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div slot="footer">
   <button type="button" class="btn btn-outline-info" @click="closeModal()"> Close </button>
   <!-- <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndClose()">
     Submit
   </button> -->
  </div>
</modal>
    <h3 class="text-center">Active Services</h3>
    <div class="search-wrapper">
    <input style="text-align:center;border-radius:10px;" type="text" v-model="search" placeholder="Search services..."/>
  </div>
    <hr/>
    <div class="col-sm-4" v-for="service in filteredList">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title"> {{ service.name }} </h3>
        </div>
        <div class="panel-body">
          <p><span class="badge alert-info"> ID: </span> {{ service.ID }} </p>
          <div v-if="service.status==='Running'">
          <p><span class="badge alert-success"> Status: </span> {{ service.status }} </p>
          </div>
          <div v-else-if="service.status==='Down'">
            <p><span class="badge alert-danger"> Status: </span> {{ service.status }} </p>
          </div>
          <div v-else>
            <p><span class="badge alert-info"> Status: </span> {{ service.status }} </p>
          </div>
          <p><span class="badge alert-info"> Uptime: </span> {{ service.uptime }} </p>
          <p><span class="badge alert-info"> Version: </span> {{ service.version }} </p>
          <div v-for="field in service.fields">
		
              <div v-show="field.display" id="container" style="display:block; height:3rem;">
              <p><span class="badge alert-info">{{ field.label }} </span> {{ field.value }} </p>
              </div>
          </div>
          <hr>
          <p><button style="float:left" @click="sService(service)" class="btn btn-info log">Stop Service</button></p>
          <p><button style="float:right;" @click="details(service)" class="btn btn-info log">Details</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActiveServices, modifyService, stopService } from '../../utils/apiInterface';
import Modal from "./Modal";
export default {
  name: 'activeServices',
  data() {
    return {
      showModal: false,
      services: [],
      displayFields:{},
      search: '',
      modalService: {},
    };
  },
  components:{
    Modal
  },
  methods: {
    // isLoggedIn() {
    //   return ();
    // },

    sService(service){
    	if (confirm("Are you sure you want to stop the service?")){
    		stopService(service);
        setTimeout(location.reload.bind(location), 1000);
    	}else{
    		return;
    	}

    },
    details(service){
      this.modalService = service;
      this.displayFields = service.fields;
      this.showModal=true;
    },
    closeModal(){
      this.showModal=false;
    },
    getAServices() {
      const thisClass = this;
      function set(data){
	     for (var i=0;i<data.data.length;i++){
    		var res = JSON.parse(data.data[i].fields);
          if (Object.prototype.toString.call(res) === '[object Object]'){
            data.data[i].fieldsOld=data.data[i].fields;
            data.data[i].fields = [res];
          }else if( Object.prototype.toString.call(res) === '[object Array]'){
            data.data[i].fieldsOld=data.data[i].fields;
            data.data[i].fields = res;
          }else{
            data.data[i].fields = null;
          }
	       }
        thisClass.services = data.data;
        console.log(data.data);
      }
      getActiveServices().then(set);

    },
  },
  computed: {
    filteredList() {
      return this.services.filter(serv => {
        if (serv.fields!=null){
          return (serv.name.toLowerCase()+" "+serv.description.toLowerCase()+" "+serv.fieldsOld).includes(this.search.toLowerCase())
        }else{
          return (serv.name.toLowerCase()+" "+serv.description.toLowerCase()).includes(this.search.toLowerCase())
        }
        
      })
    }
  },
  mounted() {
    this.getAServices();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
