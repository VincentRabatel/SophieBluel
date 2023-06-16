import { Project } from "../data/project.js";
import { Category } from "../data/category.js";

import * as api from '../hooks/api.js'
import * as storage from '../hooks/storage.js';

/**************************** HTML FETCH ****************************/
const galleryElement = document.querySelector(".gallery");
const filtersElement = document.querySelector(".filters");

// ----------------------------------- //
// First initialisation of the gallery //
// ----------------------------------- //
export async function initGallery(){
	// Get the 'projects' list from the localStorage and fetch the API if null
	const projects = storage.getProjects() ?? await api.getProjects();

	// Store the project array in the local storage
	storage.storeProjects(projects);
	storage.storeProjectsDisplayed(projects);

	// Generate the gallery with the list of projects
	createGallery(projects);


	// Get the 'categories' list from the localStorage and fetch the API if null
	const categories = storage.getCategories() ?? await api.getCategories();

	// Store the categories array in the local storage
	storage.storeCategories(categories);

	// Generate the filters buttons with an array of categories
	createFilters(categories);

	updateFilterButtonsColor(0);
}


// ------------------------------ //
// Update the gallery when needed //
// ------------------------------ //
export async function updateGallery(projects, filterId){
	emptyGallery(); // TODO : check if a project is already there, and change only if needed

	for(let project of filterProjects(projects, filterId)){
		createProjectElement(project);
	}

	storage.storeProjectsDisplayed(projects);
}


// Generate the gallery with an array of projects
function createGallery(projects){
	for(let project of projects){
		createProjectElement(project);
	}
}


// Filter the gallery (when clicking on a filter button)
function filterGallery(filterId){
	const projects = storage.getProjectsEdited() ?? storage.getProjects();

	updateFilterButtonsColor(filterId);

	updateGallery(projects, filterId); // PROBLEM : this is calling the filterProject() twice
}


// Get rid of everything in the gallery
function emptyGallery() {
	galleryElement.innerHTML = "";
}


// Create a project HTML element
function createProjectElement(project){
	// Create HTML
	const newProjectElement = document.createElement('figure');
	const newProjectElementImg = document.createElement('img');
	const newProjectElementCaption = document.createElement('figcaption');

	newProjectElementImg.src = project.imageUrl;
	newProjectElementCaption.innerText = project.title;

	newProjectElement.appendChild(newProjectElementImg);
	newProjectElement.appendChild(newProjectElementCaption);


	galleryElement.appendChild(newProjectElement);
}


// --------------------- //
// Filters buttons logic //
// --------------------- //

let lastFilterId = 0;
function filterProjects(projects, filterId){
	let projectsFiltered;

	// If we pass 'null' here we keep the filter unchanged
	if (filterId === null) {
		//console.log("Filter the gallery but no change in the filter id");
		filterId = lastFilterId;
	}

	// If it's the 'all' filter
	if (filterId === 0) {
		//console.log("Filter the gallery with all projects");
		projectsFiltered = projects;

	// If it's another filter
	} else {
		//console.log("Filter the gallery with projects of the category \"" + storage.getCategories()[filterId - 1].name + "\" and id == " + filterId);
		projectsFiltered = projects.filter(project => project.categoryId == filterId);
	}

	lastFilterId = filterId;
	
	return projectsFiltered;
}

// Generate all filters buttons with an array of categories
function createFilters(categories){
	// Create the first filter for all projects
	createFilterButton (0, "Tous");

	// Create filters depending of the backend categories 
	for(let category of categories){
		createFilterButton(category.id, category.name);
	}
}

// Create filter button HTML element
function createFilterButton(id, name){
	// Create HTML
	const newFilterButtonElement = document.createElement('input');
	newFilterButtonElement.id = "filter-" + id.toString();
	newFilterButtonElement.type = "button";
	newFilterButtonElement.value = name;

	// Add CSS
	newFilterButtonElement.classList.add("filter");
	
	// Add event listnener
	newFilterButtonElement.addEventListener('click', function(){
		filterGallery(id);
	}, false);

	filtersElement.appendChild(newFilterButtonElement);

	return newFilterButtonElement;
}

// Update filters buttons colors when clicked
function updateFilterButtonsColor(selectedID){
	const categories = storage.getCategories();

	for(let i = 0; i <= categories.length; i++){
		//console.log("Updading the button with the id " + i + " compared to selected id of " + selectedID);
		let filter = document.getElementById("filter-" + i.toString());

		if(i == selectedID){
			filter.classList.add("selected");
		} else {
			filter.classList.remove("selected");
		}
	}
}