import axios from 'axios';

// const baseUrl = "http://148.100.108.170:3000";
const baseUrl = "http://localhost:3000";

export {isAdmin, isAuthed, getUsers, removeUser, addUser, getServices, removeService, removeFromGroup, startGroup, addToGroup, addGroup, deleteGroup, addService, getActiveServices, getGroups, startService, stopService, switchDatabase, stopSwarm, startSwarm};

function getCookie(cookiename) 
  {
  var cookiestring=RegExp(""+cookiename+"[^;]+").exec(document.cookie);
  return decodeURIComponent(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,"") : "");
  }

function getServices(){
	return axios.get(baseUrl+'/getServices', {
	    params: {
	      authString: getCookie("auth")
	    }
	})
}


function getActiveServices(){
	return axios.get(baseUrl+'/getActiveServices', {
	    params: {
	      authString: getCookie("auth")
	    }
	})
}

function getGroups(){
	return axios.get(baseUrl+'/getGroups', {
	    params: {
	      authString: getCookie("auth")
	    }
	})
}

function addGroup(group){
	group.auth = getCookie("auth")
	alert("Group added!");
	return axios.post(baseUrl+'/addGroup', 
	    group);
}

function startGroup(group){
	group.auth = getCookie("auth")
	alert("Group Launched!");
	return axios.post(baseUrl+'/startGroup', 
	    group);
}

function addService(service){
	service.auth = getCookie("auth")
	// service.fields=JSON.parse(service.fields)
	alert("Service Added!");
	return axios.post(baseUrl+'/addService', 
	    service);
}

function removeService(service){
	service.auth = getCookie("auth")
	alert("Service removed!");
	return axios.post(baseUrl+'/removeService', 
	    service);
}

function getUsers(){
	return axios.get(baseUrl+'/getUsers', {
	    params: {
	      authString: getCookie("auth")
	    }
	})
}

function addUser(user){
	user.auth = getCookie("auth")
	alert("User Added!");
	return axios.post(baseUrl+'/addUser', 
	    user);
}

function removeUser(user){
	user.auth = getCookie("auth")
	alert("User removed!");
	return axios.post(baseUrl+'/removeUser', 
	    user);
}

function addToGroup(data){
	data.auth = getCookie("auth")
	alert("Added!");
	return axios.post(baseUrl+'/addToGroup', 
	    data);
}

function removeFromGroup(data){
	data.auth = getCookie("auth")
	alert("Removed!");
	return axios.post(baseUrl+'/removeFromGroup', 
	    data);
}


function deleteGroup(group){
	group.auth = getCookie("auth")
	alert("Your group is currently terminating.");
	return axios.post(baseUrl+'/deleteGroup', 
	    group);
}

function startService(service){
	service.auth = getCookie("auth")
	// service.fields=JSON.parse(service.fields)
	alert("Your service is currently launching.");
	return axios.post(baseUrl+'/startService', 
	    service);
	
}

function stopService(service){
	service.auth = getCookie("auth")
	service.fields=JSON.parse(service.fields);
	alert("Your service is currently terminating.");
	return axios.post(baseUrl+'/endService', 
	    service);
}

function isAdmin(){
	return axios.get(baseUrl+'/isAdmin', {
	    params: {
	      auth: getCookie("auth")
	    }
	})
}

function isAuthed(){
	return axios.get(baseUrl+'/isAuthed', {
	    params: {
	      auth: getCookie("auth")
	    }
	})
}

function startSwarm(){

}

function stopSwarm(){

}

function switchDatabase(){

}

