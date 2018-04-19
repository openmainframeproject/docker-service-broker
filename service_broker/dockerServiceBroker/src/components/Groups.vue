<template>
  <div>
    <modal v-if="showModal"> <!-- Services Modal -->
      <div slot="body" v-for="service in modalGroup.services">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title"> {{ service.name }} </h3>
            </div>
            <div class="panel-body">
              <p><span class="badge alert-info"> Description: </span> {{ service.description }} </p>
              <hr>
              <div v-for="field in service.fields">
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
                <p style="text-align:center;margin:auto"><button @click="removeFromG(service,group)" class="btn btn-info log">Remove From Group</button></p>
              </div>
            </div>
          </div>
        </span>
        </div>
          <hr>
          <p><button style="float:left" @click="populateModal(group)" class="btn btn-info log">Launch Group</button></p>
          <p><button style="float:right;" v-show="isAdmin" @click="delGroup(group)" class="btn btn-info log">Delete Group</button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { removeFromGroup, getGroups, startGroup, deleteGroup } from '../../utils/apiInterface';
import Modal from './Modal';
export default {
  name: 'groups',
  data() {
    return {
      showModal:false,
      groups: [],
      search: '',
      modalGroup: '',
      iterCounter: 0,
      modalService: '',
      isDone:true,
      isAdmin:false
    };
  },
  components:{
    Modal
  },
  methods: {
    closeModal(){
      this.showModal=false;
    },
    isAd(){
      this.isAdmin=document.location.href.indexOf("admin")>0
    },
    populateModal(group){
      for (var i=0;i<group.services.length;i++){
        group.services[i].fields=JSON.parse(group.services[i].fields);
      }
      this.modalGroup=group;
      this.showModal=true;
    },
    submitAndClose(){
      startGroup(this.modalGroup);
      this.showGroupModal=false;
      this.modalGroup='';
      // setTimeout(location.reload.bind(location), 500);;
    },
    delGroup(group){
      deleteGroup(group);
      setTimeout(location.reload.bind(location), 500);;
    },
     removeFromG(service,group){
      removeFromGroup({"group_id":group.ID, "service_id":service.ID});
      alert("Removed!");
      setTimeout(location.reload.bind(location), 500);;
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
    this.isAd()
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