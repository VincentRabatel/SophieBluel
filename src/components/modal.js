import { Project } from "../data/project.js";
import { Category } from "../data/category.js";

import * as api from '../services/api.js';
import * as storage from '../services/storage.js';

import { updateGallery } from "./gallery.js";

// ------------ //
// MODAL WINDOW //
// ------------ //
// Get HTML main elements
const modal = document.querySelector(".modal-container");
const modalTitle = document.querySelector(".modal-title");
const modalGallery = document.querySelector(".modal-galery");
const modalAddProject = document.querySelector(".modal-add-project");

const addProjectButton = document.querySelector('input[value="Ajouter une photo"]');
const deleteGalleryButton = document.querySelector('input[value="Supprimer la galerie"]');
const validateProjectButton = document.querySelector('input[value="Valider"]');

export function initModal(){
    initModalPreviousButton();
    initModalCloseButton();
	
    // Modal window first step
	initModalGallery();
	initModalAddProjectButton();
	initModalClearGalleryButton();

    // Modal window second step
    initModalAddProject();
    initNewProjectForm();
}

export function openModal(){
    modalId = 1;
    updateModalContent();
}

function closeModal(){
    modalId = 0;
    updateModalContent();
}

// This variable is used to track the modal current state
let modalId = 0;

// Update the modal window's content depending of 'modalId' variable
function updateModalContent(){
    switch(modalId){
        // Modal window is closed
        case 0:
            hideElement(modal);
            break;

        // Modal window is at 'modal gallery' step
        case 1:
            showElement(modal);
            showElement(modalGallery);
            showElement(addProjectButton);
            showElement(deleteGalleryButton);

            hideElement(modalAddProject);
            hideElement(validateProjectButton);
            modalTitle.innerText = "Galerie Photo";
            break;
    
        // Modal window is at 'add project (form is empty)' step
        case 2:
            showElement(modalAddProject);
            showElement(validateProjectButton);

            hideElement(modalGallery);
            hideElement(addProjectButton);
            hideElement(deleteGalleryButton);
            modalTitle.innerText = "Ajout photo";
            break;

        default:
            window.alert("We shouldn't be here");
    }
}


function showElement(element){
    element.classList.remove("edit-hidden");
}

function hideElement(element){
    element.classList.add("edit-hidden");
}



// ---------------------------- //
// PREVIOUS MODAL WINDOW BUTTON //
// ---------------------------- //
// Initialize top 'previous' modal button
function initModalPreviousButton(){
	// Get modal window's 'previous' button element
    const previousButton = document.querySelector(".back-button");

    previousButton.addEventListener('click', function(){
        //console.log("'Previous button' clicked !");
        modalId -= 1;
        updateModalContent();
    }, false);
}



// ------------------------- //
// CLOSE MODAL WINDOW BUTTON //
// ------------------------- //
// Initialize top 'close' modal button
function initModalCloseButton(){
	// Get modal window's 'close' button element
    const closeButton = document.querySelector(".close-button");

    closeButton.addEventListener('click', function(){
        //console.log("'Close button' clicked !");
        closeModal();
    }, false);
}



// ------------------ //
// ADD PROJECT BUTTON //
// ------------------ //
function initModalAddProject(){
    hideElement(modalAddProject);
}

// Initialize 'add project' modal button
function initModalAddProjectButton(){
    addProjectButton.addEventListener('click', function(){
		//console.log("'Add project' button clicked !");
		modalId += 1;
        updateModalContent();
    }, false);
}



// ---------------- //
// NEW PROJECT FORM //
// ---------------- //
function initNewProjectForm(){
    // Inputs initializations
    initNewProjectPictureInput();
    initNewProjectTitleInput();
    initNewProjectCategoryInput();

    const newProjectForm = document.querySelector(".new-project-form");

    newProjectForm.addEventListener("submit", function (event) {
        // Disable default behaviour of the web browser
        event.preventDefault();

        const newProjectId = storage.getAvailableIdInProjectsEdited();
        const newProjectTitle = event.target.querySelector("[name=title]").value;

        const newProjectImageFile = event.target.querySelector("[name=picture]").files[0];

        // The function URL.revokeObjectURL() is used to tell 
        // the browser to not keep the ObjectURL in memory anymore
        //URL.revokeObjectURL(newProjectImageBlobURL);

        const newProjectImageBlob = new Blob([newProjectImageFile], {type: "image/png"}),
            url = URL.createObjectURL(newProjectImageBlob),
            img = new Image();
        
        const newProjectImageBlobURL = url.toString();

        const newUserId = storage.getLogInInfos().userId;

        const newCategoryName = event.target.querySelector("[name=category]").value;
        const newCategoryId = storage.getCategoryId(newCategoryName);
        const newCategory = new Category(newCategoryId, newCategoryName);

        // Create the newProject object from the form      
        const newProject = new Project(
            newProjectId,
            newProjectTitle,
            newProjectImageBlobURL,
            newCategoryId,
            newUserId,
            newCategory
        );

        console.log(newProject)

        // Store the new project in 'projectEdited'
        storage.addProjectInProjectsEdited(newProject);

        // Get the full 'projectEdited' array to update the gallery
        const newProjectsEdited = storage.getProjectsEdited();

        updateGallery(newProjectsEdited, null);
        updateModalGallery(newProjectsEdited);

        closeModal();

        // TODO
        resetNewProjectForm();
    })
}

// Initialize new project 'picture' input
function initNewProjectPictureInput(){
    const newPictureInput = document.querySelector("#newPicture");
    const newPictureInputDefault = document.querySelector(".input-file-default");
    const newPictureInputImg = document.querySelector(".input-file-img");

    showElement(newPictureInputDefault);
    hideElement(newPictureInputImg);

    // Check if there is a change in the 'new project picture' input
    newPictureInput.addEventListener('change', function(){
        const newFile = newPictureInput.files[0];
        newPictureInputImg.src = URL.createObjectURL(newFile);

        showElement(newPictureInputImg);
        hideElement(newPictureInputDefault);

        checkNewProjectValidity();
    }, false);
}

// Initialize new project 'title' input
function initNewProjectTitleInput(){
    const newTitleInput = document.querySelector("#newTitle");

    // Check if there is a change in the 'new project title' input
    newTitleInput.addEventListener('input', function(){
        checkNewProjectValidity();
    }, false);
}

// Initialize new project 'category' input
function initNewProjectCategoryInput(){
    // Get the category input element
    const newCategoryInput = document.querySelector("#category");
    
    // Fetch categories in the local storage
	const categories = storage.getCategories();

    // Fill the category input with the one option for each category
    categories.forEach(category => {
        const newOption = document.createElement("option");
        newOption.value = category.name;
        newOption.innerText = category.name;

        newCategoryInput.appendChild(newOption);
    })
}

// Check if the 'Validate' input is valid, i.e. if there is a valid picture and title
function checkNewProjectValidity(){
    const newPictureInput = document.querySelector("#newPicture");
    const newTitleInput = document.querySelector("#newTitle")

    if(newPictureInput.files[0] && newTitleInput.value){
        validateProjectButton.disabled = false;
        validateProjectButton.classList.remove("rnd-green-button--locked");
    } else {
        validateProjectButton.disabled = true;
        validateProjectButton.classList.add("rnd-green-button--locked");
    }
}

// Reset the new project form after a new project is added
function resetNewProjectForm(){
    // TODO
}



// ---------------------- //
// MODAL WINDOW'S GALLERY //
// ---------------------- //

// Initialize the modal gallery from the local storage data
export function initModalGallery(){
    const projects = storage.getProjectsEdited() ?? storage.getProjects();

	// Create HTML elements for every project in 'projects'
	projects.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})

	// Store the 'projectsEdited' array in the local storage for the first time,
    // it will be the only array used during edit mode
    storage.storeProjectsEdited(projects);
}


// Update the modal gallery from the local storage data
function updateModalGallery(projects){
	clearModalGallery();

	// Create HTML for every project in 'projectsEdited'
	projects.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})
}


function clearModalGallery(){
	// Empty the modal gallery HTML element
	modalGallery.innerHTML = "";
}


function createModalGalleryProject(project){
	// Create container element
	const newProjectElement = document.createElement("figure");
	newProjectElement.classList.add("modal-gallery-project");

	// Create back image element
	const newProjectImg = document.createElement("img");
	newProjectImg.src = project.imageUrl;

	// Create edit element
	const newProjectElementEdit = document.createElement("span");
	newProjectElementEdit.innerText = "éditer";

	// Create 'Delete Project' button
	newProjectElement.appendChild(createDeleteButton(project.id));

	newProjectElement.appendChild(newProjectImg);
	newProjectElement.appendChild(newProjectElementEdit);

	return newProjectElement;
}


function createDeleteButton(projectId){
	// Create delete button background element
	const newDeleteButton = document.createElement("div");
	newDeleteButton.classList.add("delete-icon-bkg");

	// Create delete button icon element
	const newDeleteButtonIcon = document.createElement("i");
	newDeleteButtonIcon.classList.add("fa-solid", "fa-trash-can");

	newDeleteButton.addEventListener('click', function(){
		//console.log("'Delete project' button clicked !");
		deleteModalGalleryProject(projectId);
	}, false);

	newDeleteButton.appendChild(newDeleteButtonIcon);

	return newDeleteButton;
}


async function deleteModalGalleryProject(projectIdToDelete){
    /* OLD
	// Get the 'projectsEdited' array from the local storage
	const projectsEdited = storage.getProjectsEdited();

	// Filter the project array with the project to delete
	const newProjectsEdited = projectsEdited.filter(project => project.id != projectIdToDelete);

	// Update the local storage with the new project array
    storage.storeProjectsEdited(newProjectsEdited);

    updateGallery(newProjectsEdited, null);
	updateModalGallery(newProjectsEdited);
    */

    await api.deleteProject(projectIdToDelete);
    
    const projects = await api.getProjects();

    storage.storeProjects(projects); // TEMP

    updateModalGallery(projects);
    updateGallery(projects, null);
}



// ----------------------------- //
// DELETE MODAL WINDOW'S GALLERY //
// ----------------------------- //

// TODO : apply clearModalGallery() to clearGallery()

// Initialize 'delete gallery' modal button
function initModalClearGalleryButton(){
    deleteGalleryButton.addEventListener('click', function(){
		//console.log("'Delete gallery' button clicked !");

		// Empty the local storage
        storage.storeProjectsEdited("");

		clearModalGallery();
    }, false);
}