/*************************** LOG IN STATUS ***************************/
// Check the loggin status
export function checkLogInStatus(){
	const logInStatus = window.localStorage.getItem("logInStatus");
	return logInStatus;
}



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
		console.log("Publish button clicked !");
	}, false);
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

function openModal(){
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

// Get modal window's 'previous' button element => USELESS RIGHT NOW //
// function getModalPreviousButtonElement(){
//     const previousButtonElement = document.querySelector(".back-button"); //console.log(previousButtonElement);
//     return previousButtonElement;
// }



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

// Get modal window's 'close' button element => USELESS RIGHT NOW
// function getModalCloseButtonElement(){
//     const closeButtonElement = document.querySelector(".close-button"); //console.log(closeButtonElement);
//     return closeButtonElement;
// }



/************************** ADD PROJECT BUTTON **************************/
// Initialize 'add project' modal button
function initModalAddProjectButton(){
	// Get modal window's 'add project' button element
    const addProjectButton = document.querySelector('input[value="Ajouter une photo"]'); console.log(addProjectButton);

    addProjectButton.addEventListener('click', function(){
		//console.log("'Add project' button clicked !");
		// TO DO
    }, false);
}



/************************** DELETE GALLERY BUTTON **************************/
// Initialize 'delete gallery' modal button
function initModalDeleteGalleryButton(){
	// Get modal window's 'delete gallery' button element
    const deleteGalleryButton = document.querySelector('input[value="Supprimer la galerie"]'); console.log(deleteGalleryButton);

    deleteGalleryButton.addEventListener('click', function(){
		//console.log("'Delete gallery' button clicked !");
		// TO DO
    }, false);
}


/*************************** MODAL GALLERY ***************************/
export function initModalGallery(){
	const projectsJSON = window.localStorage.getItem("projects");	// to do : maybe this should be
	const projects = JSON.parse(projectsJSON);						// a function

	projects.forEach(project => {
		modalGallery.appendChild(createModalGalleryProject(project));
	})
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

	newProjectElement.appendChild(newProjectImg);
	newProjectElement.appendChild(newProjectElementEdit);

	return newProjectElement;
}

// Clear all local storage (for debug)
//clearLocalStorage();
function clearLocalStorage(){
	window.localStorage.clear();
}