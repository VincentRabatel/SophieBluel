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
	publishButtonElement.addEventListener('click', publishProjects, false);
}

async function publishProjects(){
	const projects = storage.getProjects();
	const projectsEdited = storage.getProjectsEdited();

	// We prepare two array of projects to add and to delete before to use the api
	const projectsToAdd = [];
	const projectsToDelete = [];

	// To fill 'projectsToAdd', we check for every projects of 'projectsEdited'
	// if it already exists in 'projects'  
	for(let i = 0; i < projectsEdited.length; i++){
		if(containsProject(projects, projectsEdited[i]) == false){
			projectsToAdd.push(projectsEdited[i]);
		}

	}

	// To fill 'projectsToDelete', we check for every projects of 'projects'
	// if it already DOESN'T exist in 'projects'
	for(let i = 0; i < projects.length; i++){
		if(containsProject(projectsEdited, projects[i]) == false){
			projectsToDelete.push(projects[i]);
		}
	}

	//console.log(projectsToAdd);
	//console.log(projectsToDelete);

	// Call the api for every project to add to the database
	for(let i = 0; i < projectsToAdd.length; i++){
		await api.postProject(projectsToAdd[i]);
	}

	// Call the api for every project to delete from the database
	for(let i = 0; i < projectsToDelete.length; i++){
		await api.deleteProject(projectsToDelete[i].id);
	}

	// Reset the local storage after database update
	const newProjects = await api.getProjects(); console.log(newProjects);

	storage.storeProjects(newProjects);
	storage.storeProjectsEdited(newProjects);

	// Reset login status
	storage.storeLogInStatus(false);

	window.alert("Publishing done !");
}

function containsProject(list, project) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].title === project.title) {
			return true;
        }
    }

    return false;
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