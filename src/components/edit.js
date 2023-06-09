import * as storage from '../services/storage.js';

import { openModal } from "./modal.js";

// ------------------------------------ //
// Initialization of Edit Mode elements //
// ------------------------------------ //
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
// Edit button //
// ----------- //
function initEditButton(){
	// Get 'publish' button element
	const editButtonElement = document.querySelector(".edit-button");

	// Create event listener for 'edit' button
	editButtonElement.addEventListener('click', openModal, false);
}


// -------------- //
// Publish button //
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

	// Reset login status and login infos
	storage.clearLogInInfos();
	storage.clearLogInStatus();

	// Close edit mode
	closeEditMode();

	window.alert("Publishing done !");
}


// ---------------------- //
// Login & logout nav tab //
// ---------------------- //
export function initLoginNavTab(logInStatus){
	const loginNavTab = document.querySelector(".login-nav-tab");

	if (logInStatus){
		loginNavTab.innerText = "logout";

		loginNavTab.addEventListener('click', function(event) {
			event.preventDefault();

			// Reset login status and login infos
			storage.clearLogInInfos();
			storage.clearLogInStatus();
	
			// Close edit mode
			closeEditMode();

			initLoginNavTab(false);
		})

	} else {
		loginNavTab.innerText = "login";

		loginNavTab.addEventListener('click', function(event) {
			event.preventDefault();

			// Move to the login page
			window.location = "login.html";
		})
	}
}