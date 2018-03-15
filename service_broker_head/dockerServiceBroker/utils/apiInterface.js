import axios from 'axios';

const baseUrl = "http://148.100.98.185:3000";

export {isAuthed, getServices, getActiveServices, startService, stopService, modifyService, switchDatabase, stopSwarm, startSwarm};

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
function startService(service){
	alert(JSON.stringify(service) +"\n STARTED");
}

function stopService(service){
	alert(JSON.stringify(service)+"\n STOPPED");
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

