import * as api from '../services/api.js'

// ---------------------------------------------------- //
// Gallery's variables to store projects and categories //
// ---------------------------------------------------- //
let projects = [];
let categories = [];

export async function refreshGalleryProjects(){
	projects = await api.getProjects();
}

export async function refreshGalleryCategories(){
	categories = await api.getCategories();
}

// ----------------------------------- //
// First initialisation of the gallery //
// ----------------------------------- //
const galleryElement = document.querySelector(".gallery");

// This function is called in index.js
export async function initGallery(){
	projects = await api.getProjects();

	// Generate the gallery with the list of projects
	createGallery();
}

// Generate the gallery with an array of projects
function createGallery(){
	for(let project of projects){
		createProjectElement(project);
	}
}

// Create a project HTML element for the gallery
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


// ------------------------------ //
// Update the gallery when needed //
// ------------------------------ //
export function updateGallery(projects, filterId){
	emptyGallery();

	for(let project of filterProjects(projects, filterId)){
		createProjectElement(project);
	}
}

// Empty the gallery HTML element
export function emptyGallery() {
	galleryElement.innerHTML = "";
}


// ----------------------------------- //
// First initialisation of the filters //
// ----------------------------------- //
const filtersElement = document.querySelector(".filters");

// This function is called in index.js
export async function initFilters(){
	categories = await api.getCategories();

	// Generate the filters buttons with an array of categories
	createFilters(categories);

	updateFiltersButtonsColor(0);
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
function createFilterButton(filterId, name){
	// Create HTML
	const newFilterButtonElement = document.createElement('input');
	newFilterButtonElement.id = "filter-" + filterId.toString();
	newFilterButtonElement.type = "button";
	newFilterButtonElement.value = name;

	// Add CSS
	newFilterButtonElement.classList.add("filter");
	
	// Add event listnener
	newFilterButtonElement.addEventListener('click', function(){
		updateGallery(projects, filterId);
		updateFiltersButtonsColor(filterId);
	}, false);

	filtersElement.appendChild(newFilterButtonElement);

	return newFilterButtonElement;
}


// --------------------- //
// Filters buttons logic //
// --------------------- //
let lastFilterId = 0;
function filterProjects(projects, filterId){
	let projectsFiltered;

	// If we pass 'null' here we keep the filter unchanged
	if (filterId === null) {
		filterId = lastFilterId;
	}

	// If it's the 'all' filter
	if (filterId === 0) {
		projectsFiltered = projects;

	// If it's another filter
	} else {
		projectsFiltered = projects.filter(project => project.categoryId == filterId);
	}

	lastFilterId = filterId;
	
	return projectsFiltered;
}

// Update filters buttons colors when clicked
function updateFiltersButtonsColor(selectedID){
	for(let i = 0; i <= categories.length; i++){
		let filter = document.getElementById("filter-" + i.toString());

		if(i == selectedID){
			filter.classList.add("selected");
		} else {
			filter.classList.remove("selected");
		}
	}
}