// ------------------------------------ //
// localStorage get and store functions //
// ------------------------------------ //

// Store and return login infos as a bool
const logInStatusStorageId = "logInStatus";

export function storeLogInStatus(logInStatus){
	window.localStorage.setItem(logInStatusStorageId, logInStatus);
}

export function getLogInStatus(){
	const logInStatus = window.localStorage.getItem(logInStatusStorageId);
	return logInStatus;
}

export function clearLogInStatus(){
	window.localStorage.removeItem(logInStatusStorageId);
}


// Store and return login infos as Object { userId: , token: }
const logInInfosStorageId = "logInInfos";

export function storeLogInInfos(logInInfos){
	window.localStorage.setItem(logInInfosStorageId, JSON.stringify(logInInfos));
}

export function getLogInInfos(){
	const logInInfos = JSON.parse(window.localStorage.getItem(logInInfosStorageId));

	return logInInfos;
}

export function clearLogInInfos(){
	window.localStorage.removeItem(logInInfosStorageId);
}