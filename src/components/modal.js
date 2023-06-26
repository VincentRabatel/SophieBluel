import * as api from '../services/api.js';
import { updateGallery, emptyGallery } from "./gallery.js";

// ---------------------------------------- //
// First initialization of the modal window //
// ---------------------------------------- //

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

    newProjectForm.addEventListener("submit", async function (event) {
        // Disable default behaviour of the web browser
        event.preventDefault();
       
        // Get new project informations
        const imageFile = event.target.querySelector("[name=picture]").files[0];
        const imageBlob = new Blob([imageFile], {type: "image/png"});
    
        const title = event.target.querySelector("[name=title]").value;
        
        const categoryName = event.target.querySelector("[name=category]").value;
        const categoryId = await getCategoryId(categoryName);

        // Build the form data to be send to the API
        const projectData = new FormData();

        projectData.append("image", imageBlob);
        projectData.append("title", title);
        projectData.append("category", categoryId);

        // Post the new project
        await api.postProject(projectData);
        
        // Get the updated projects list to update the gallery
        const projects = await api.getProjects();

        updateModalGallery(projects);
        updateGallery(projects, null);

        closeModal();

        // TODO
        resetNewProjectForm();
    })
}

// Initialize new project 'picture' input
function initNewProjectPictureInput(){
    const newPictureInput = document.querySelector("#newPicture"); // TODO : find another way to query this
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
async function initNewProjectCategoryInput(){
    // Get the category input element
    const newCategoryInput = document.querySelector("#category");
    
    // Fetch categories from the API
	const categories = await api.getCategories();

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

async function getCategoryId(name){
	const categories = await api.getCategories();
	
	let categoryId;

	categories.forEach(category => {
		//console.log("Trying category : " + category.name + " and name " + name);
		if(category.name == name){
			categoryId = parseInt(category.id);
		}
	});

	return categoryId;
}



// ---------------------- //
// MODAL WINDOW'S GALLERY //
// ---------------------- //

// Initialize the modal gallery with data from the API
export async function initModalGallery(){
    const projects = await api.getProjects();

	// Create HTML elements for every project in 'projects'
	projects.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})
}


// Update the modal gallery with a new array of projects
function updateModalGallery(projects){
	emptyModalGallery();

	// Create HTML for every project in 'projectsEdited'
	projects.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})
}

// Empty the modal gallery HTML element
function emptyModalGallery(){
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
		deleteModalGalleryProject(projectId);
	}, false);

	newDeleteButton.appendChild(newDeleteButtonIcon);

	return newDeleteButton;
}


async function deleteModalGalleryProject(projectIdToDelete){
    await api.deleteProject(projectIdToDelete);
    
    const projects = await api.getProjects();

    updateModalGallery(projects);
    updateGallery(projects, null);
}



// ----------------------------- //
// DELETE MODAL WINDOW'S GALLERY //
// ----------------------------- //

// Initialize 'delete gallery' modal button
function initModalClearGalleryButton(){
    deleteGalleryButton.addEventListener('click', function(){
		clearModalGallery();
    }, false);
}

// Clear the gallery and the modal gallery of every project when clicking on button
async function clearModalGallery(){
    const projects = await api.getProjects();

    for(let i = 0; i < projects.length + 1 ; i++){
        await api.deleteProject(i);
        console.log("del" + i)
    }

    emptyGallery();
    emptyModalGallery();
}