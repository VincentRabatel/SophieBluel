import { Project } from "../data/project.js";
import { Category } from "../data/category.js";

import * as api from '../hooks/api.js'
import * as storage from '../hooks/storage.js';

import { openModal } from "./modal.js";

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
		publishProjects();
	}, false);
}

function publishProjects(){
	const projectsEdited = storage.getProjectsEdited();
	console.log("Publishing this new list of projects :"); console.log(projectsEdited);

	storage.storeProjects(projectsEdited);

	storage.deleteProjectsEdited();
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