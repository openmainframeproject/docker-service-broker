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
              <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> Name </label> <input v-model="modalService.name" style="display:inline;float:right" type="input" :placeholder="Name" :name="modalService.name">
            </div>
              <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> Description </label> <input v-model="modalService.description" style="display:inline;float:right" type="input" :placeholder="Description" :name="modalService.description">
            </div>
            <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> Version </label> <input v-model="modalService.version" style="display:inline;float:right" type="input" :placeholder="Version" :name="modalService.version">
            </div>
            <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> Command </label> <input v-model="modalService.command" style="display:inline;float:right" type="input" :placeholder="command" :name="modalService.command">
            </div>
            <div id="container" style="display:block; height:3rem;">
              <label style="display:inline;float:left"> Docker Compose File </label>
                <input style="float:right;width:30px" type="file" @change="processFile" accept="application/x-yaml">
            </div>
            <strong style="text-align: center">Fields</strong>
            <div>
            <span style="float:left">ParamName</span><span style="float:right;padding-left:2rem">Visible?</span><span style="float:right;">ParamValue</span>
          </div>
            <hr>
            <div>
            <div id="container" style="display:block; height:3rem;" v-for="field in modalService.fields">
             <input v-model="field.label" style="display:inline;float:left" type="input" >
             <input v-model="field.display" type="checkbox" style="display:inline;float:right; margin-left:2rem;"> 
             <input v-model="field.value" style="display:inline;float:right" type="input" >
            </div>
          </div>
          <button @click="addAnother()" style="float:left; margin-right:.5rem;">+ Add Field</button>
            </div>
          </div>
        </div>
      <div slot="footer">
       <button type="button" class="btn btn-outline-info" @click="closeServiceModal()"> Close </button>
       <button type="button" class="btn btn-primary" data-dismiss="modal" @click="submitAndCloseService()">
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
      modalService:{"name":"", "description":"", "fields":[], "version":"", "command":"", "composeFile":""},
      showServiceModal:false,
      showGroupModal:false
    }
  },
  methods:{
    closeServiceModal(){
      this.showServiceModal=false;
      this.modalService={"name":"", "description":"", "fields":[], "version":"", "command":""}
    },
    populateServiceModal(){
      this.showServiceModal=true;
    },
    submitAndCloseService(){
      addService(this.modalService);
      this.showServiceModal=false;
      this.modalService={"name":"", "description":"", "fields":[], "version":"", "command":""};
      // location.reload();
    },
    closeGroupModal(){
      this.showGroupModal=false;
      this.modalGroup={"name":"", "description":""}
    },
    processFile(event){
      var input = event.target;
      if (input.files && input.files[0]){
        var reader = new FileReader();
        reader.onload = (e) => {
          this.modalService.composeFile = e.target.result
        }
        reader.readAsDataURL(input.files[0])
      }
    },
    addAnother(){
      this.modalService.fields.push({"label":"", "value":"", "display":false})
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