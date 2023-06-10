/*************************** LOG IN STATUS ***************************/
// Check the loggin status
export function checkLogInStatus(){
	const logInStatus = window.localStorage.getItem("logInStatus");
	return logInStatus;
}

/***************************** EDIT MODE ******************************/
// Initialize edit mode
export function initEditMode(){
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
// Get 'publish' button element
const publishButtonElement = document.querySelector(".publish-button"); //console.log(publishButtonElement);

// Create event listener for top bar 'publish' button
publishButtonElement.addEventListener('click', function(){
    console.log("Publish button clicked !");
}, false);


/**************************** EDIT BUTTON ******************************/
const editButtonElement = document.querySelector(".edit-button"); //console.log(editButtonElement);

editButtonElement.addEventListener('click', function(){
    //console.log("Edit button clicked !");
    const modal = document.querySelector(".modal-container");
    showElement(modal);
}, false);

// Clear all local storage (for debug)
//clearLocalStorage();
function clearLocalStorage(){
	window.localStorage.clear();
}


/**************************** MODAL WINDOW *****************************/
// Get HTML main elements
const modal = document.querySelector(".modal-container"); //console.log(modal);
const modalGallery = document.querySelector(".modal-galery"); //console.log(modalGallery);

let modalId = 0;

export function initModal(){
    initModalPreviousButtonElement();
    initModalCloseButtonElement();
	initModalGallery();

    openModal();
}

function openModal(){

    modalId = 1;
}

function closeModal(){
    hideElement(modal); // TO RE-CONNECT

    modalId = 0;
}

function nextModal(){

    modalId += 1;
}

function previousModal(){
    
    modalId -= 1;
}



/************************ PREVIOUS MODAL BUTTON *************************/
// Initialize top 'previous' modal button
function initModalPreviousButtonElement(){
    const previousButton = document.querySelector(".back-button"); //console.log(previousButtonElement);

    previousButton.addEventListener('click', function(){
        //console.log("Previous button clicked !");
        previousModal();
    }, false);
}

// Get top 'previous' modal button => USELESS RIGHT NOW //
// function getModalPreviousButtonElement(){
//     const previousButtonElement = document.querySelector(".back-button"); //console.log(previousButtonElement);
//     return previousButtonElement;
// }



/************************** CLOSE MODAL BUTTON **************************/
// Initialize top 'close' modal button
function initModalCloseButtonElement(){
    const closeButton = document.querySelector(".close-button"); //console.log(closeButtonElement);

    closeButton.addEventListener('click', function(){
        //console.log("Close button clicked !");
        closeModal();
    }, false);
}

// Get top 'close' modal button => USELESS RIGHT NOW
// function getModalCloseButtonElement(){
//     const closeButtonElement = document.querySelector(".close-button"); //console.log(closeButtonElement);
//     return closeButtonElement;
// }



/*************************** MODAL GALLERY ***************************/
export function initModalGallery(){
	const projectsJSON = window.localStorage.getItem("projects");
	const projects = JSON.parse(projectsJSON);

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