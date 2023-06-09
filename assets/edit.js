/*************************** LOG IN STATUS ***************************/
// First check when loading the page
checkLogInStatus();

// Check the loggin status
function checkLogInStatus(){
	const logInStatus = window.localStorage.getItem("logInStatus");
	const editModeblocks = fetchEditModeObjects();

	updateEditModeBlocks(logInStatus, editModeblocks);
}

// Return all HTML blocks affected by Edit Mode status
function fetchEditModeObjects(){
	const editModeblocks = document.querySelectorAll(".edit-block");
	return editModeblocks;
}

// Update CCS classes of Edit Mode blocks depending of Log in status 
function updateEditModeBlocks(logInStatus, editModeblocks){
	if(logInStatus == "true"){
		//console.log("Logged in !");
		editModeblocks.forEach(block => {
			block.classList.remove("edit-hidden");
		});

	} else {
		//console.log("User not logged in yet");
		editModeblocks.forEach(block => {
			block.classList.add("edit-hidden");
		});
	}
}

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
export function initModalGallery(projects){
	projects.forEach(project => {
		//projectImagesURLs.push(project.imageUrl);

		modalGallery.appendChild(initModalGalleryProject(project));
	})
}


function initModalGalleryProject(project){
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


/**************************** EDIT TOP BAR *****************************/
// Get 'publish' button element
const publishButtonElement = document.querySelector(".publish-button"); console.log(publishButtonElement);

// Create event listener for top bar 'publish' button
publishButtonElement.addEventListener('click', function(){
    console.log("Publish button clicked !");
}, false);

function showElement(element){
    element.classList.remove("edit-hidden");
}

function hideElement(element){
    element.classList.add("edit-hidden");
}


/**************************** EDIT BUTTON ******************************/
const editButtonElement = document.querySelector(".edit-button"); console.log(editButtonElement);

editButtonElement.addEventListener('click', function(){
    //console.log("Edit button clicked !");
    const modal = document.querySelector(".modal-container");
    showElement(modal);
}, false);