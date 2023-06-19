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
	const publishButtonElement = document.querySelector(".publish-button");

	// Create event listener for top bar 'publish' button
	publishButtonElement.addEventListener('click', function(){
		publishProjects();
	}, false);
}

async function publishProjects(){
	const projects = storage.getProjects();
	console.log("Checking this old list of projects :"); console.log(projects);
	const projectsEdited = storage.getProjectsEdited();
	console.log("Publishing this new list of projects :"); console.log(projectsEdited);

	for(let i = 0; i < projectsEdited.length; i++){
		//console.log(projects[i].id)

		// Do we have a new project at the end of the list ?
		if(!projects[i] && projectsEdited[i]){
			await api.postProject(projectsEdited[i]);
		}

		// Do we have a new project somewhere in the middle of the list ?
		else if(compareProjects(projects[i], projectsEdited[i]) == false){
			// console.log("Comparing project : " + projects[i].title); //console.log(projects[i]);
			// console.log("with project edited : " + projectsEdited[i].title); //console.log(projectsEdited[i]);
			// console.log("RESULT : " + compareProjects(projects[i], projectsEdited[i]));

			await api.deleteProject(projects[i].id);
			await api.postProject(projectsEdited[i]);
		}
	}

	//storage.storeProjects(projectsEdited);

	//storage.deleteProjectsEdited();
}

// Return true if the projects are the same and fals if there is any differences
function compareProjects(projectA, projectB){

	if(projectA.id != projectB.id){
		return false;
	} else if(projectA.title != projectB.title){
		return false;
	} else if(projectA.imageUrl != projectB.imageUrl) {
		return false;
	}

	return true;
}


/**************************** EDIT BUTTON ******************************/
function initEditButton(){
	// Get 'publish' button element
	const editButtonElement = document.querySelector(".edit-button");

	// Create event listener for 'edit' button
	editButtonElement.addEventListener('click', function(){
		//console.log("Edit button clicked !");
		openModal();
	}, false);
}