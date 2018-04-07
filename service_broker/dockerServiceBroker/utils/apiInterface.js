import axios from 'axios';

const baseUrl = "http://148.100.98.185:3000";

export {isAuthed, getServices, removeFromGroup, startGroup, addToGroup, addGroup, deleteGroup, addService, getActiveServices, getGroups, startService, stopService, switchDatabase, stopSwarm, startSwarm};

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
	data.auth = getCookie("auth")
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
	return axios.post(baseUrl+'/stopService', 
	    service);
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
