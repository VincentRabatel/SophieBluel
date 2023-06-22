// --------------- //
// EDIT MODE LOGIC //
// --------------- //

import * as api from '../services/api.js'
import * as storage from '../services/storage.js';

import { openModal } from "./modal.js";


// ----------------------- //
// EDIT MODE ELEMENTS INIT //
// ----------------------- //
// Initialize edit mode if user logged in, this function is called in index.js
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
		editModeElements.forEach(element => {
			element.classList.remove("edit-hidden");
		});

	} else {
		editModeElements.forEach(element => {
			element.classList.add("edit-hidden");
		});
	}
}


// ----------- //
// EDIT BUTTON //
// ----------- //
function initEditButton(){
	// Get 'publish' button element
	const editButtonElement = document.querySelector(".edit-button");

	// Create event listener for 'edit' button
	editButtonElement.addEventListener('click', openModal, false);
}


// -------------- //
// PUBLISH BUTTON //
// -------------- //
function initPublishButton(){
	// Get 'publish' button element
	const publishButtonElement = document.querySelector(".publish-button");

	// Create event listener for top bar 'publish' button
	publishButtonElement.addEventListener('click', publishProjects, false);
}

// This function is called when clicking on the 'publish' button
async function publishProjects(){
	const projects = storage.getProjects();
	const projectsEdited = storage.getProjectsEdited();

	// We prepare two array of projects to add and to delete before to use the api
	const projectsToAdd = [];
	const projectsToDelete = [];

	// To fill 'projectsToAdd' we check for every projects in 'projectsEdited'
	// if it already exists in 'projects'  
	for(let i = 0; i < projectsEdited.length; i++){
		if(containsProject(projects, projectsEdited[i]) == false){
			projectsToAdd.push(projectsEdited[i]);
		}
	}

	// To fill 'projectsToDelete' we check for every projects in 'projects'
	// if it already DOESN'T exist in 'projects'
	for(let i = 0; i < projects.length; i++){
		if(containsProject(projectsEdited, projects[i]) == false){
			projectsToDelete.push(projects[i]);
		}
	}

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

	// TODO list
	// - reset log in status and log in infos
	// - reload the page and exit edit mode

	window.alert("Publishing done !");
}

// Returns true if the given project exists in the array
function containsProject(list, project) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].title === project.title) {
			return true;
        }
    }

    return false;
}

// Returns true if the projects are the same and fals if there is any differences
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