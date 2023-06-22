import * as api from '../services/api.js'
import * as storage from '../services/storage.js';

// ----------------------------------- //
// First initialisation of the gallery //
// ----------------------------------- //
const galleryElement = document.querySelector(".gallery");

export async function initGallery(){
	// TODO : problem when reloading the page using the 'projectsEdited' array
	// because blob urls of image files won't load the image correctly

	// Get the 'projects' list from the localStorage and fetch the API if null
	const projects = /* await storage.getProjectsEdited() ?? await storage.getProjects() ?? */ await api.getProjects();

	// Store the project array in the local storage
	storage.storeProjects(projects);

	// Generate the gallery with the list of projects
	createGallery(projects);
}

// Generate the gallery with an array of projects
function createGallery(projects){
	for(let project of projects){
		createProjectElement(project);
	}
}


// ------------------------------ //
// Update the gallery when needed //
// ------------------------------ //
export async function updateGallery(projects, filterId){
	emptyGallery();

	for(let project of filterProjects(projects, filterId)){
		createProjectElement(project);
	}
}

// Empty the gallery HTML element
export function emptyGallery() {
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



// ----------------------------------- //
// First initialisation of the filters //
// ----------------------------------- //
const filtersElement = document.querySelector(".filters");

export async function initFilters(){
	// Get the 'categories' list from the localStorage and fetch the API if null
	const categories = storage.getCategories() ?? await api.getCategories();

	// Store the categories array in the local storage
	storage.storeCategories(categories);

	// Generate the filters buttons with an array of categories
	createFilters(categories);

	updateFilterButtonsColor(0);
}

// Filters buttons logic
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
	newFilterButtonElement.addEventListener('click', async function(){
		const projects = /* storage.getProjectsEdited() ?? storage.getProjects() ?? */ await api.getProjects();

		updateGallery(projects, filterId);
		updateFilterButtonsColor(filterId);
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