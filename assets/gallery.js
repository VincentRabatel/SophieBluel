/**************************** HTML FETCH ****************************/
const galleryElement = document.querySelector(".gallery");
const filtersElement = document.querySelector(".filters");

/************************** PROJECTS FETCH **************************/
async function fetchProjects(){
	//console.log("Fetching projects form the API...");
	const projectsResponse = await fetch("http://localhost:5678/api/works");
	const projects = await projectsResponse.json(); //console.log(projects);
	
	return projects;
}

/************************** CATEGORIES FETCH **************************/
async function fetchCategories(){
	//console.log("Fetching categories form the API...");
	const categoriesResponse = await fetch("http://localhost:5678/api/categories");
	const categories = await categoriesResponse.json(); //console.log(categories);

	return categories;
}


// ----------------------------------- //
// First initialisation of the gallery // => TODO save to local storage
// ----------------------------------- //
export async function initGallery(){
	/* TODO : only fetch projects if there is nothing in the localStorage
	// Try to find a project list in localStorage
	const projectsJSON = localStorage.getItem("projects");	//console.log(projectsJSON);
	const projects = JSON.parse(projectsJSON);

	if(projects === null){
		
	}
	*/

	// First 'projects' fetch from the API
	const projects = await fetchProjects();

	// Store the project array in the local storage
	window.localStorage.setItem("projects", JSON.stringify(projects));
	window.localStorage.setItem("displayedProjects", JSON.stringify(projects));

	// Generate the gallery with an array of projects
	createGallery(projects);


	// First 'categories' fetch from the API
	const categories = await fetchCategories();

	// Store the project array in the local storage
	window.localStorage.setItem("categories", JSON.stringify(categories));

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

	window.localStorage.setItem("displayedProjects", JSON.stringify(projects));
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
	const projects = JSON.parse(localStorage.getItem("projects"));						//console.log(projects);
	const displayedProjects = JSON.parse(localStorage.getItem("displayedProjects"));	//console.log(displayedProjects);

	// Check if a different filter is activated
	if (projects != displayedProjects) {
		// If the filter 'all' is activated
		if (filterCategoryId === 0) {
			console.log("Filtering the gallery with all projects");
			// Empty the displayed project array
			displayedProjects.splice(0,displayedProjects.length);

			// Refill the displayed projects array with new projects
			for(let project of projects){
				displayedProjects.push(project);
			}

		// If it's another filter
		} else {
			console.log("Filtering the gallery with projects of the category number \"" + "\" and id == " + filterCategoryId);
			// Empty the displayed project array
			displayedProjects.splice(0,displayedProjects.length);

			// Refill the displayed projects array with new projects
			for(let project of projects){
				if(project.categoryId == filterCategoryId){
					displayedProjects.push(project);
				}
			}
		}
	} else {
		console.log("Gallery is already correctly filtered");
		return;
	}

	updateFilterButtonsColor(filterCategoryId);

	updateGallery(displayedProjects);
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
	const categories = JSON.parse(localStorage.getItem("categories"));	
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

/*
// Category class
class Category {
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

// Project class
class Project {
    constructor(id, title, imageUrl, categoryId, userId, category) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.categoryId = categoryId;
        this.userId = userId;
        this.category = category;
    }
}
*/