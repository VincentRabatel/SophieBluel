import * as storage from '../services/storage.js';

import { openModal } from "./modal.js";

// ----------------------- //
// EDIT MODE ELEMENTS INIT //
// ----------------------- //
// Initialize edit mode if user logged in, this function is called in index.js
export function initEditMode(){
	initPublishButton();
	initEditButton();
}

export function openEditMode(){
	const editModeElements = fetchEditModeElements();

	editModeElements.forEach(element => {
		element.classList.remove("edit-hidden");
	});
}

function closeEditMode(){
	const editModeElements = fetchEditModeElements();

	editModeElements.forEach(element => {
		element.classList.add("edit-hidden");
	});
}

// Return all HTML elements affected by Edit Mode status
function fetchEditModeElements(){
	const editModeElements = document.querySelectorAll(".edit-block");
	return editModeElements;
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

	// Publish what ?

	// Reset log in status and log in infos
	storage.clearLogInInfos();
	storage.clearLogInStatus();

	// Close edit mode
	closeEditMode();

	window.alert("Publishing done !");
}


// ------- //
// Backlog //
// ------- //
/*
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
*/