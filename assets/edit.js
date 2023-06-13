import { openModal } from "./modal.js";

/*************************** LOG IN STATUS ***************************/
// Check the loggin status
export function checkLogInStatus(){
	const logInStatus = window.localStorage.getItem("logInStatus");
	return logInStatus;
}



/***************************** EDIT MODE ******************************/
// Initialize edit mode if user logged in
export function initEditMode(){
	initPublishButton();
	initEditButton();
	
	const editModeElements = fetchEditModeElements();
	updateEditModeElements(true, editModeElements);
}

// Return all HTML elements affected by Edit Mode status
function fetchEditModeElements(){
	const editModeElements = document.querySelectorAll(".edit-block");
	return editModeElements;
}

// Update CCS classes of Edit Mode elements depending of Log in status 
function updateEditModeElements(logInStatus, editModeElements){
	if(logInStatus == true){
		//console.log("Logged in !");
		editModeElements.forEach(element => {
			showElement(element);
		});

	} else {
		//console.log("User not logged in yet");
		editModeElements.forEach(element => {
			hideElement(element);
		});
	}
}

function showElement(element){
    element.classList.remove("edit-hidden");
}

function hideElement(element){
    element.classList.add("edit-hidden");
}



/**************************** EDIT TOP BAR *****************************/
function initPublishButton(){
	// Get 'publish' button element
	const publishButtonElement = document.querySelector(".publish-button"); //console.log(publishButtonElement);

	// Create event listener for top bar 'publish' button
	publishButtonElement.addEventListener('click', function(){
		console.log("Publish button clicked !");
	}, false);
}



/**************************** EDIT BUTTON ******************************/
function initEditButton(){
	// Get 'publish' button element
	const editButtonElement = document.querySelector(".edit-button"); //console.log(editButtonElement);

	// Create event listener for 'edit' button
	editButtonElement.addEventListener('click', function(){
		//console.log("Edit button clicked !");
		openModal();
	}, false);
}