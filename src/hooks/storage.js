// ------------------------------------ //
// localStorage get and store functions //
// ------------------------------------ //

import { Project } from "../data/project.js";
import { Category } from "../data/category.js";

// ------------------------------------------------------ //
// The 'projects' array is storing all PUBLISHED projects //
// ------------------------------------------------------ //
const projectsStorageId = "projects";

// Return a list of all published projects from localStorage
export function getProjects(){
	const projectsJSON = window.localStorage.getItem(projectsStorageId);
	const projects = JSON.parse(projectsJSON);

    return projects;
}

// Store a new list of published projects in the localStorage
export function storeProjects(projects){
	window.localStorage.setItem(projectsStorageId, JSON.stringify(projects));
}

// Add a new Category to the categories array // => NEVER USED FOR NOW
export function addProjectInProjects(project){
	const projects = getProjects();
	addNewItem(project, projects);
}

// Return the first available id in the 'projects' array // => NEVER USED FOR NOW
export function getAvailableIdInProjects(){
	const projects = getProjects();
	const availableId = getAvailableId(projects);

	return availableId;
}



// -------------------------------------------------------------------- //
// The 'projectsEdited' array is storing all projects BEFORE PUBLISHING //
// -------------------------------------------------------------------- //
const projectsEditedStorageId = "projectsEdited";

// Return a list of all projects of the Edit Mode (not yet published)
export function getProjectsEdited(){
	const projectsEditedJSON = window.localStorage.getItem(projectsEditedStorageId);
	const projectsEdited = JSON.parse(projectsEditedJSON);

    return projectsEdited;
}

// Store a new list of edited projects in the localStorage (not yet published)
export function storeProjectsEdited(projectsEdited){
	window.localStorage.setItem(projectsEditedStorageId, JSON.stringify(projectsEdited));
}

// Add a new Category to the categories array // => NEVER USED FOR NOW
export function addProjectInProjectsEdited(project){
	const projectsEdited = getProjectsEdited();
	addNewItem(project, projectsEdited);
}

// Return the first available id in the 'projectsEdited' array
export function getAvailableIdInProjectsEdited(){
	const projectsEdited = getProjectsEdited();
	const availableId = getAvailableId(projectsEdited);

	return availableId;
}



// ----------------------------------------------- //
// The 'categorie' array is storing all categories //
// ----------------------------------------------- //
const categoriesStorageId = "categories";

// Return a list of all categories from the local Storage 
export function getCategories(){
	const categoriesJSON = window.localStorage.getItem(categoriesStorageId);
	const categories = JSON.parse(categoriesJSON);

    return categories;
}

// Store a new list of catgeories in the localStorage
export function storeCategories(categories){
	window.localStorage.setItem(categoriesStorageId, JSON.stringify(categories));
}

// Add a new Category to the categories array // => NEVER USED FOR NOW
export function addCategory(category){
	const categories = getCategories();
	addNewItem(categorie, categories);
}

// Return the first available id in the 'categories' array // => NEVER USED FOR NOW
export function getAvailableIdInCategories(){
	const categories = getCategories();
	const availableId = getAvailableId(categories);

	return availableId;
}

export function getCategoryName(id){
	// TODO ?
}

export function getCategoryId(name){
	//console.log("Testing all categories to find the if ID of category : " + name);
	const categories = getCategories();
	
	let categoryId;

	categories.forEach(category => {
		//console.log("Trying category : " + category.name + " and name " + name);
		if(category.name == name){
			categoryId = parseInt(category.id);
		}
	});

	return categoryId;
}



// ------------- //
// Log in status //
// ------------- //
const logInStatusStorageId = "logInStatus";

export function checkLogInStatus(){
	const logInStatus = window.localStorage.getItem(logInStatusStorageId);
	return logInStatus;
}


// ----------------- //
// Generic functions //
// ----------------- //
// Generic function to add a item to an array
function addNewItem(item, arr){
	// TODO
}

// Generic function to find an available .id in an array
function getAvailableId(arr){
	for(let id = 1; id < arr.length + 1; id++){
		// If there is an available OR if we reach the end of the list
		if(id != arr[id].id - 1 || !arr[id]){
			//console.log("Available id is : " + parseInt(id + 1))
			return parseInt(id + 1);
		}
	}
}