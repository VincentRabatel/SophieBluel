/**************************** MODAL WINDOW *****************************/
// Get HTML main elements
const modal = document.querySelector(".modal-container"); //console.log(modal);
const modalGallery = document.querySelector(".modal-galery"); //console.log(modalGallery);

let modalId = 0;

export function initModal(){
    initModalPreviousButton();
    initModalCloseButton();
	
	initModalGallery();
	initModalAddProjectButton();
	initModalDeleteGalleryButton();
}

export function openModal(){
	showElement(modal);
    modalId = 1;
}

function closeModal(){
    hideElement(modal);
    modalId = 0;
}

function nextModal(){
	// to do
    modalId += 1;
}

function previousModal(){
    // to do
    modalId -= 1;
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
        previousModal();
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


/************************** ADD PROJECT BUTTON **************************/
// Initialize 'add project' modal button
function initModalAddProjectButton(){
	// Get modal window's 'add project' button element
    const addProjectButton = document.querySelector('input[value="Ajouter une photo"]'); //console.log(addProjectButton);

    addProjectButton.addEventListener('click', function(){
		//console.log("'Add project' button clicked !");
		// TO DO
    }, false);
}



/************************** DELETE GALLERY BUTTON **************************/
// Initialize 'delete gallery' modal button
function initModalDeleteGalleryButton(){
	// Get modal window's 'delete gallery' button element
    const deleteGalleryButton = document.querySelector('input[value="Supprimer la galerie"]'); //console.log(deleteGalleryButton);

    deleteGalleryButton.addEventListener('click', function(){
		//console.log("'Delete gallery' button clicked !");

		// Empty the local storage
		window.localStorage.setItem("projectsEditMode", "");

		clearModalGallery();
    }, false);
}


/*************************** MODAL GALLERY ***************************/
// Initialize the modal gallery from the local storage data
export function initModalGallery(){
	// Get the 'projects' array from the local storage
	const projectsJSON = window.localStorage.getItem("projects");					// to do : maybe this should be
	const projects = JSON.parse(projectsJSON);										// a function

	// Create HTML for every project in 'projects'
	projects.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})

	// Set the 'projectsEditMode' array in the local storage, that will be used during edit mode
	window.localStorage.setItem("projectsEditMode", JSON.stringify(projects));
}


// Update the modal gallery from the local storage data
function updateModalGallery(){
	// Get the 'projectsEditMode' array from the local storage
	const projectsEditModeJSON = window.localStorage.getItem("projectsEditMode");	// to do : maybe this should be
	const projectsEditMode = JSON.parse(projectsEditModeJSON);						// a function

	clearModalGallery();

	// Create HTML for every project in 'projectEditMode'
	projectsEditMode.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})
}


function deleteModalGalleryProject(projectIdToDelete){
	console.log("Delete project number " + projectIdToDelete + " during edit mode");

	// Get the 'projectsEditMode' array from the local storage
	const projectsEditModeJSON = window.localStorage.getItem("projectsEditMode");	// to do : maybe this should be
	const projectsEditMode = JSON.parse(projectsEditModeJSON);						// a function

	// Filter the project array with the project to delete
	const newProjectsEditMode = projectsEditMode.filter(project => project.id != projectIdToDelete);

	// Update the localStorage with the new project array
	window.localStorage.setItem("projectsEditMode", JSON.stringify(newProjectsEditMode));

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