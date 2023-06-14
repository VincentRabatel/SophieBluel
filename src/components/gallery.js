import { getProjectsFromAPI, getCategoriesFromAPI } from "../hooks/fetch.js";
import { 
	getProjectsFromStorage, setProjectsToStorage,
	getProjectsDisplayedFromStorage, setProjectsDisplayedToStorage,
	getProjectsEditedFromStorage, setProjectsEditedToStorage,
	getCategoriesFromStorage, setCategoriesToStorage
	} from "../hooks/storage.js";

/**************************** HTML FETCH ****************************/
const galleryElement = document.querySelector(".gallery");
const filtersElement = document.querySelector(".filters");

// ----------------------------------- //
// First initialisation of the gallery // => TODO : check if project/categories list exist in the localStorage first
// ----------------------------------- //
export async function initGallery(){
	// First 'projects' fetch from the API
	const projects = await getProjectsFromAPI();

	// Store the project array in the local storage
	setProjectsToStorage(projects);
	setProjectsDisplayedToStorage(projects);

	// Generate the gallery with the list of projects
	createGallery(projects);


	// First 'categories' fetch from the API
	const categories = await getCategoriesFromAPI();

	// Store the categories array in the local storage
	setCategoriesToStorage(categories);

	// Generate the filters buttons with an array of categories
	createFilters(categories);
}


// ------------------------------ //
// Update the gallery when needed // => TODO use the local storage
// ------------------------------ // => TODO use the map() function
export async function updateGallery(projects){
	emptyGallery();

	for(let project of projects){
		createProjectElement(project);
	}
}


// Generate the gallery with an array of projects
function createGallery(projects){
	for(let project of projects){
		createProjectElement(project);
	}
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
// Filters buttons logic // => TO DO : use filter() 
// --------------------- //

// This function is called when clicking on a filter button //
function filterGallery(filterCategoryId){
	const projects = getProjectsFromStorage();
	const projectsDisplayed = getProjectsDisplayedFromStorage();

	// Check if a different filter is activated
	if (projects != projectsDisplayed) {
		// If the filter 'all' is activated
		if (filterCategoryId === 0) {
			console.log("Filtering the gallery with all projects");
			// Empty the displayed project array
			projectsDisplayed.splice(0,projectsDisplayed.length);

			// Refill the displayed projects array with new projects
			for(let project of projects){
				projectsDisplayed.push(project);
			}

		// If it's another filter
		} else {
			console.log("Filtering the gallery with projects of the category number \"" + "\" and id == " + filterCategoryId);
			// Empty the displayed project array
			projectsDisplayed.splice(0,projectsDisplayed.length);

			// Refill the displayed projects array with new projects
			for(let project of projects){
				if(project.categoryId == filterCategoryId){
					projectsDisplayed.push(project);
				}
			}
		}
	} else {
		console.log("Gallery is already correctly filtered");
		return;
	}

	updateFilterButtonsColor(filterCategoryId);

	setProjectsDisplayedToStorage(projectsDisplayed);

	updateGallery(projectsDisplayed);
}

// Generate all filters buttons with an array of categories
function createFilters(categories){
	// Create the first filter for all projects
	const filterAll = createFilterButton(0, "Tous");
	//filters.push(filterAll); // DEPRECATED ?

	// Create filters depending of the backend categories 
	for(let category of categories){
		const filter = createFilterButton(category.id, category.name);
		//filters.push(filter); // DEPRECATED ?
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
	const categories = getCategoriesFromStorage();

	for(let i = 0; i <= categories.length - 1; i++){
		//console.log("Updading the button with the id " + i + " compared to selected id of " + selectedID);
		let filter = document.getElementById("filter-" + i.toString());

		if(i == selectedID){
			filter.classList.add("selected");
		} else {
			filter.classList.remove("selected");
		}
	}
}

// Get rid of everything in the gallery //
function emptyGallery() {
	galleryElement.innerHTML = "";
}