import axios from 'axios';

const baseUrl = "http://localhost:3000";

export {isAuthed, getServices, getActiveServices, getGroups, startService, stopService, switchDatabase, stopSwarm, startSwarm};

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


function startService(service){
	service.auth = getCookie("auth")
	service.fields=JSON.parse(service.fields)
	alert("Your service is currently launching.");
	return axios.post(baseUrl+'/startService', 
	    service);
	
}

function startGroup(group){
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

