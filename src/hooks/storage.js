// ---------------------------------- //
// localStorage get and set functions //
// ---------------------------------- //

const projectsStorageId = "projects";

// Return a list of all published projects from localStorage
export function getProjectsFromStorage(){
	const projectsJSON = window.localStorage.getItem(projectsStorageId);
	const projects = JSON.parse(projectsJSON);

    return projects;
}

// Store a new list of published projects in the localStorage
export function setProjectsToStorage(projects){
	window.localStorage.setItem(projectsStorageId, JSON.stringify(projects));
}



const projectsDisplayedStorageId = "projectsDisplayed";

// Return a list of all displayed projects in the main gallery (a filter might be is applied)
export function getProjectsDisplayedFromStorage(){
	const projectsDisplayedJSON = window.localStorage.getItem(projectsDisplayedStorageId);	// To do : rename displayedProject to
	const projectsDisplayed = JSON.parse(projectsDisplayedJSON);							// projectsDisplayed in other js scripts

    return projectsDisplayed;
}

// Store a new list of displayed projects in the localStorage
export function setProjectsDisplayedToStorage(projectsDisplayed){
	window.localStorage.setItem(projectsDisplayedStorageId, JSON.stringify(projectsDisplayed));
}



const projectsEditedStorageId = "projectsEdited";

// Return a list of all projects of the Edit Mode (not yet published)
export function getProjectsEditedFromStorage(){
	const projectsEditedJSON = window.localStorage.getItem(projectsEditedStorageId);	// To do : rename projectsEditMode to
	const projectsEdited = JSON.parse(projectsEditedJSON);                              // projectsEdited in other js scripts

    return projectsEdited;
}

// Store a new list of edited projects in the localStorage (not yet published)
export function setProjectsEditedToStorage(projectsEdited){
	window.localStorage.setItem(projectsEditedStorageId, JSON.stringify(projectsEdited));
}



const categoriesStorageId = "categories";

// Return a list of all categories from the local Storage 
export function getCategoriesFromStorage(){
	const categoriesJSON = window.localStorage.getItem(categoriesStorageId);
	const categories = JSON.parse(categoriesJSON);

    return categories;
}

// Store a new list of catgeories in the localStorage
export function setCategoriesToStorage(categories){
	window.localStorage.setItem(categoriesStorageId, JSON.stringify(categories));
}