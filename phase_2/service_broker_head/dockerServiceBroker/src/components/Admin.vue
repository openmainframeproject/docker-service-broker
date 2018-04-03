<template>
	<div>
		<app-nav></app-nav>
    <button class="btn btn-danger log" @click='populateGroupModal()'>Add Group</button>
        <button class="btn btn-danger log" @click='populateServiceModal()'>Add Service</button>
		<modal v-if="showServiceModal"> 
      <div slot="body">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title"> New Service </h3>
            </div>
            <div class="panel-body">
              <label style="display:inline;float:left"> Name </label> <input v-model="modalService.name" style="display:inline;float:right" type="input" :placeholder="Name" :name="modalService.name">
              <label style="display:inline;float:left"> Description </label> <input v-model="modalService.description" style="display:inline;float:right" type="input" :placeholder="Description" :name="modalService.description">
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
    <modal v-if="showGroupModal"> 
      <div slot="body">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title"> New Group </h3>
            </div>
            <div class="panel-body">
              <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> Name </label> <input v-model="modalGroup.name" style="display:inline;float:right" type="input" :placeholder="Name" :name="modalGroup.name">
            </div>
              <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> Description </label> <input v-model="modalGroup.description" style="display:inline;float:right" type="input" :placeholder="Description" :name="modalGroup.description">
            </div>
            </div>
          </div>
        </div>
      <div slot="footer">
       <button type="button" class="btn btn-outline-info" @click="closeGroupModal()"> Close </button>
       <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndCloseGroup()">
         Submit
       </button>
      </div>
    </modal>
    <activeServices></activeServices>
		<services></services>
    <groups></groups>
	</div>
</template>

<script>
import { isAuthed, addService, addGroup } from '../../utils/apiInterface';
import AppNav from './AppNav';
import Services from './Services';
import activeServices from './ActiveServices';
import groups from './Groups';
import Modal from './Modal';
export default {
  name: 'admin',
  components: {
    AppNav,
    Services,
    activeServices,
    groups,
    Modal
  },
  data(){
    return {
      modalGroup:{"name":"", "description":""},
      modalService:'',
      showServiceModal:false,
      showGroupModal:false
    }
  },
  methods:{
    closeServiceModal(){
      this.showServiceModal=false;
    },
    populateServiceModal(service){
      this.modalService = service;
      this.showServiceModal=true;
    },
    submitAndCloseService(){
      addService(this.modalService);
      this.showServiceModal=false;
      this.modalService='';
      location.reload();
    },
    closeGroupModal(){
      this.showGroupModal=false;
    },
    populateGroupModal(){
      this.showGroupModal=true;
    },
    submitAndCloseGroup(){
      addGroup(this.modalGroup);
      this.showGroupModal=false;
      this.modalGroup={"name":"", "description":""};
      location.reload();
    },
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