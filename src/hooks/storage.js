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
	const newProjects = addNewItem(project, projects);

	storeProjects(newProjects);
}

// Completely delete the 'projects' list from the localStorage // => NEVER USED FOR NOW
export function deleteProjects(){
	window.localStorage.removeItem(projectsStorageId);
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

// Add a new project to the 'projectsEdited' array
export function addProjectInProjectsEdited(project){
	const projectsEdited = getProjectsEdited();
	const newProjectsEdited = addNewItem(project, projectsEdited);

	storeProjectsEdited(newProjectsEdited);
}

// Completely delete the 'projectsEdited' list from the localStorage
export function deleteProjectsEdited(){
	window.localStorage.removeItem(projectsEditedStorageId);
}

// Return the first available id in the 'projectsEdited' array
export function getAvailableIdInProjectsEdited(){
	const projectsEdited = getProjectsEdited();
	const availableId = getAvailableId(projectsEdited);

	return availableId;
}



// ------------------------------------------------ //
// The 'categories' array is storing all categories //
// ------------------------------------------------ //
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
	const newCategories = addNewItem(category, categories);

	storeCategories(newCategories);
}

// Completely delete the 'categories' list from the localStorage // => NEVER USED FOR NOW
export function deleteCategories(){
	window.localStorage.removeItem(categoriesStorageId);
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
	let newArr = arr;
	let availableId = getAvailableId(arr);

	newArr.splice(availableId - 1, 0, item);

	return newArr;
}

// Generic function to find an available .id in an array
function getAvailableId(arr){
	for(let id = 1; id < arr.length + 1; id++){
		// If there is an available OR if we reach the end of the list
		if(!arr[id] || id != arr[id].id - 1){
			//console.log("Available id is : " + parseInt(id + 1))
			return parseInt(id + 1);
		}
	}
}