// Get HTML elements
const galleryElement = document.querySelector(".gallery");
const filtersElement = document.querySelector(".filters");


/************************** PROJECTS FETCH **************************/
const projectsResponse = await fetch("http://localhost:5678/api/works");
const projects = await projectsResponse.json(); //console.log(projects);
let displayedProjects = projects;

function generateGallery(projects){
	for(let project of projects){
		createProjectElement(project);
	}
}

generateGallery(projects);


// Create a project HTML element //
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


/************************** CATEGORIES FETCH **************************/
const categoriesResponse = await fetch("http://localhost:5678/api/categories");
const categories = await categoriesResponse.json(); //console.log(categories);
const filters = [];

function generateFilters(categories){
	// Create the first filter for all projects
	const filterAll = createFilterButton(0, "Tous");
	filters.push(filterAll);

	// Create filters depending of the backend categories 
	for(let category of categories){
		const filter = createFilterButton(category.id, category.name);
		filters.push(filter);
	}
}

generateFilters(categories);


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


/*************************** FILTERS BUTTONS ***************************/
// TO DO : use filter() ? 
// This function is called when clicking on a filter button //
function filterGallery(filterCategoryId){
	displayedProjects = [];

	if(filterCategoryId === 0) {
		//console.log("Filtering the gallery with all projects");
		displayedProjects = projects;

	} else {
		//console.log("Filtering the gallery with projects of the category \"" + categories[filterCategoryId - 1].name + "\" with the id " + categories[filterCategoryId - 1].id);
		for(let project of projects){
			if(project.categoryId == filterCategoryId){
				displayedProjects.push(project);
			}
		}
	}

	updateFilterButtonsColor(filterCategoryId);

	emptyGallery();
	updateGallery(displayedProjects);
}

function updateFilterButtonsColor(selectedID){
	for(let i = 0; i <= filters.length - 1; i++){
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

// Update the gallery with a new array of projects //
function updateGallery(projects) {
	for(let project of projects){
		createProjectElement(project);
	}
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