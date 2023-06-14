import { 
	getProjectsFromStorage, setProjectsToStorage,
	getProjectsDisplayedFromStorage, setProjectsDisplayedToStorage,
	getProjectsEditedFromStorage, setProjectsEditedToStorage,
	getCategoriesFromStorage, setCategoriesToStorage
	} from "../hooks/storage.js";

/**************************** MODAL WINDOW *****************************/
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
	initModalDeleteGalleryButton();

    // Modal window second step
    initModalAddProject();
    initModalValidateButton();
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

        // Modal window is at 'add project (form is complete)' step
        case 3:

            // TODO : back to main page, with the main gallery updated

            modalTitle.innerText = "Ajout photo"
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


/************************ PREVIOUS MODAL BUTTON *************************/
// Initialize top 'previous' modal button
function initModalPreviousButton(){
	// Get modal window's 'previous' button element
    const previousButton = document.querySelector(".back-button"); //console.log(previousButtonElement);

    previousButton.addEventListener('click', function(){
        //console.log("'Previous button' clicked !");
        modalId -= 1;
        updateModalContent();
    }, false);
}


/************************** CLOSE MODAL BUTTON **************************/
// Initialize top 'close' modal button
function initModalCloseButton(){
	// Get modal window's 'close' button element
    const closeButton = document.querySelector(".close-button"); //console.log(closeButtonElement);

    closeButton.addEventListener('click', function(){
        //console.log("'Close button' clicked !");
        closeModal();
    }, false);
}


/************************** MODAL ADD PROJECT **************************/
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

// Initialize 'validate project' modal button
function initModalValidateButton(){
    validateProjectButton.addEventListener('click', function(){

        // TODO
        
    }, false);
}


/************************** NEW PROJECT FORM **************************/
function initNewProjectForm(){
    initNewProjectPictureInput();
    iniNewProjectTitleInput();
    initNewProjectCategoryInput();
}

// Initialize 'new project picture' input
function initNewProjectPictureInput(){
    const newPictureInput = document.querySelector("#newPicture");
    const newPictureInputDefault = document.querySelector(".input-file-default");
    const newPictureInputImg = document.querySelector(".input-file-img");
    showElement(newPictureInputDefault);
    hideElement(newPictureInputImg);

    newPictureInput.addEventListener('change', function(){
        const newFile = newPictureInput.files[0]; //console.log(newFile);
        newPictureInputImg.src = URL.createObjectURL(newFile);

        showElement(newPictureInputImg);
        hideElement(newPictureInputDefault);

        checkNewProjectValidity();
    }, false);
}

// Initialize 'new project title' input
function iniNewProjectTitleInput(){
    const newTitleInput = document.querySelector("#newTitle");

    newTitleInput.addEventListener('input', function(){
        checkNewProjectValidity();
    }, false);
}

// Initialize 'new project category' input
function initNewProjectCategoryInput(){
    // Get the category input element
    const newCategoryInput = document.querySelector("#category");
    
    // Fetch categories in the local storage
	const categories = getCategoriesFromStorage();

    // Fill the category input with the one option for each category
    categories.forEach(category => {
        const newOption = document.createElement("option");
        newOption.value = category.name;
        newOption.innerText = category.name;

        newCategoryInput.appendChild(newOption);
    })
}

function checkNewProjectValidity(){
    const newPictureInput = document.querySelector("#newPicture"); console.log(newPictureInput.files[0]);
    const newTitleInput = document.querySelector("#newTitle")

    if(newPictureInput.files[0] && newTitleInput.value){
        //console.log("New project is valid");

        validateProjectButton.classList.remove("rnd-green-button--locked");
    } else {
        //console.log("New project isn't valid yet");

        validateProjectButton.classList.add("rnd-green-button--locked");
    }
}

/************************ DELETE GALLERY BUTTON **************************/
// Initialize 'delete gallery' modal button
function initModalDeleteGalleryButton(){
    deleteGalleryButton.addEventListener('click', function(){
		//console.log("'Delete gallery' button clicked !");

		// Empty the local storage
        setProjectsEditedToStorage("");

		clearModalGallery();
    }, false);
}


/*************************** MODAL GALLERY ***************************/
// Initialize the modal gallery from the local storage data
export function initModalGallery(){
	// Get the 'projects' array from the local storage
	const projects = getProjectsFromStorage();

	// Create HTML for every project in 'projects'
	projects.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})

	// Set the 'projectsEdited' array in the local storage for the first time,
    // that will be used during edit mode
    setProjectsEditedToStorage(projects);
}


// Update the modal gallery from the local storage data
function updateModalGallery(){
	// Get the 'projectsEdited' array from the local storage
	const projectsEdited = getProjectsEditedFromStorage();

	clearModalGallery();

	// Create HTML for every project in 'projectsEdited'
	projectsEdited.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})
}


function deleteModalGalleryProject(projectIdToDelete){
	console.log("Delete project number " + projectIdToDelete + " during edit mode");

	// Get the 'projectsEdited' array from the local storage
	const projectsEdited = getProjectsEditedFromStorage();

	// Filter the project array with the project to delete
	const newProjectsEdited = projectsEdited.filter(project => project.id != projectIdToDelete);

	// Update the local storage with the new project array
    setProjectsEditedToStorage(newProjectsEdited);

	updateModalGallery();
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